const fs = require('fs');
const path = require('path');
const googleTrends = require('google-trends-api');

// 我们将所有主要 AI 大模型放入候选名单
const candidates = [
  { id: 'chatgpt', keyword: 'ChatGPT' },
  { id: 'claude', keyword: 'Claude AI' },
  { id: 'gemini', keyword: 'Google Gemini' },
  { id: 'kimi', keyword: 'Kimi' },
  { id: 'zhipu', keyword: 'ChatGLM' },
  { id: 'ernie', keyword: '文心一言' },
  { id: 'doubao', keyword: '豆包' },
  { id: 'spark', keyword: '讯飞星火' },
  { id: 'deepseek', keyword: 'DeepSeek' }
];

// 基准词，用于跨组比对和归一化 (使用最热门的 ChatGPT)
const baseline = candidates[0];

async function fetchTrend(keywordList) {
  try {
    const res = await googleTrends.interestOverTime({
      keyword: keywordList,
      startTime: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 过去7天
    });
    return JSON.parse(res);
  } catch (err) {
    console.error('Error fetching trends for', keywordList, err);
    return null;
  }
}

async function main() {
  console.log('Starting Google Trends analysis...');
  const scores = {};
  
  // 第一组: 基准词 + 后4个词
  const group1 = [baseline.keyword, ...candidates.slice(1, 5).map(c => c.keyword)];
  console.log('Fetching group 1:', group1);
  const res1 = await fetchTrend(group1);
  
  // 第二组: 基准词 + 剩下4个词
  const group2 = [baseline.keyword, ...candidates.slice(5, 9).map(c => c.keyword)];
  console.log('Fetching group 2:', group2);
  const res2 = await fetchTrend(group2);

  if (!res1 || !res2) {
    console.error('Failed to fetch data from Google Trends. Aborting.');
    process.exit(1);
  }

  // 辅助函数：计算某一组数据中各个关键词的平均热度
  function calculateAverages(trendData, keywordList) {
    const timelineData = trendData.default.timelineData;
    const sums = new Array(keywordList.length).fill(0);
    let count = 0;
    
    for (const data of timelineData) {
      if (data.hasData) {
        for (let i = 0; i < data.value.length; i++) {
          sums[i] += data.value[i];
        }
        count++;
      }
    }
    
    return sums.map(sum => (count > 0 ? sum / count : 0));
  }

  const avg1 = calculateAverages(res1, group1);
  const avg2 = calculateAverages(res2, group2);

  // 提取基准词的平均得分，用于跨组归一化
  const baselineScore1 = avg1[0];
  const baselineScore2 = avg2[0];
  
  if (baselineScore1 === 0 || baselineScore2 === 0) {
    console.error('Baseline score is 0. Data might be incomplete.');
    process.exit(1);
  }

  // 计算第二组相对于第一组的缩放比例
  const scale = baselineScore1 / baselineScore2;

  // 记录得分
  scores[baseline.id] = baselineScore1;

  for (let i = 1; i < group1.length; i++) {
    const candidate = candidates.find(c => c.keyword === group1[i]);
    scores[candidate.id] = avg1[i];
  }

  for (let i = 1; i < group2.length; i++) {
    const candidate = candidates.find(c => c.keyword === group2[i]);
    scores[candidate.id] = avg2[i] * scale;
  }

  console.log('Calculated Scores:', scores);

  const sortedCandidates = candidates.map(c => ({
    id: c.id,
    score: scores[c.id] || 0
  })).sort((a, b) => b.score - a.score);

  console.log('Ranking:', sortedCandidates);

  // 选取排名前 6 的作为动态热门推荐
  const topIds = sortedCandidates.slice(0, 6).map(c => c.id);
  // 为了确保智谱清言一定在热门中，如果它不在前6，强制加入
  if (!topIds.includes('zhipu')) {
    topIds.push('zhipu');
  }
  console.log('Top models to feature:', topIds);

  // 更新 src/data/tools.ts
  const toolsFilePath = path.join(__dirname, '../src/data/tools.ts');
  let toolsContent = fs.readFileSync(toolsFilePath, 'utf-8');

  // 我们使用简单的正则或者字符串替换来更新 isFeatured 字段。
  // 为了安全，针对这些 candidate id，我们强制设置其 isFeatured
  for (const c of candidates) {
    const isTop = topIds.includes(c.id);
    
    // 正则匹配: 找到 id: 'xxx', 及其后面的属性，直到匹配到 isFeatured 或者 }
    // 一种更稳妥的办法是将整个 tools.ts 解析或直接用正则暴力替换。
    // 因为这是静态规范的代码，我们可以寻找 id: 'xxx' 的代码块。
    
    const idPattern = new RegExp(`id:\\s*'${c.id}'[\\s\\S]*?isFree:\\s*(true|false)`, 'g');
    
    toolsContent = toolsContent.replace(idPattern, (match) => {
      // 匹配到 id 后，并且找到了 isFree 这一行
      // 我们在这一行后面统一替换或追加 isFeatured
      return match; 
    });
  }

  // 上面的正则比较脆弱，采用另一种通用的方式：
  // 1. 清理全部大模型候选人的 isFeatured 字段
  // 2. 为 Top ID 重新添加 isFeatured
  
  // 辅助替换函数
  function updateFeatured(content, id, feature) {
    // 匹配对象块：从 id 开始直到该对象结束的 }
    const blockRegex = new RegExp(`(id:\\s*'${id}',[\\s\\S]*?)(},?)`, 'g');
    return content.replace(blockRegex, (match, body, tail) => {
       // 清除旧的 isFeatured 字段及其前面的空白符
       let newBody = body.replace(/\s*isFeatured:\s*(true|false),?/g, '');
       
       if (feature) {
          // 清理尾部空白并添加新字段
          newBody = newBody.trimEnd();
          if (!newBody.endsWith(',')) {
              newBody += ',';
          }
          newBody += '\n    isFeatured: true,\n  ';
       }
       return newBody + tail;
    });
  }

  let newContent = toolsContent;
  for (const c of candidates) {
    const isTop = topIds.includes(c.id);
    newContent = updateFeatured(newContent, c.id, isTop);
  }

  // 修复因为删除导致的空行问题（可选）
  newContent = newContent.replace(/,\s+isFeatured:/g, ',\n    isFeatured:');

  fs.writeFileSync(toolsFilePath, newContent, 'utf-8');
  console.log('Successfully updated tools.ts with trending data!');
}

main().catch(console.error);
