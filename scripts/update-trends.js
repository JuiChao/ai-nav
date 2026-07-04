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
  { id: 'deepseek', keyword: 'DeepSeek' },
  { id: 'yuanbao', keyword: '腾讯元宝' },
  { id: 'mistral', keyword: 'Mistral AI' },
  { id: 'groq', keyword: 'Groq' },
  { id: 'grok', keyword: 'xAI Grok' },
  { id: 'llama-3', keyword: 'Llama 3' }
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
  
  // 辅助函数：计算某一组数据中各个关键词的平均热度
  function calculateAverages(trendData, keywordList) {
    const timelineData = trendData.default.timelineData;
    const sums = new Array(keywordList.length).fill(0);
    
    timelineData.forEach(item => {
      item.value.forEach((val, idx) => {
        sums[idx] += val;
      });
    });
    
    return sums.map(sum => sum / (timelineData.length || 1));
  }

  // 动态将除了 baseline 以外的所有候选人按 4 个一组切分 (Google Trends API 一次最多 5 个词)
  const otherCandidates = candidates.slice(1);
  const chunkCount = Math.ceil(otherCandidates.length / 4);
  let globalBaselineAvg = null;

  for (let i = 0; i < chunkCount; i++) {
    const chunkCandidates = otherCandidates.slice(i * 4, (i + 1) * 4);
    const keywordList = [baseline.keyword, ...chunkCandidates.map(c => c.keyword)];
    
    console.log(`Fetching group ${i + 1}:`, keywordList);
    const res = await fetchTrend(keywordList);
    if (!res) {
       console.error(`Failed to fetch data for group ${i + 1}. Aborting.`);
       process.exit(1);
    }

    const avgs = calculateAverages(res, keywordList);
    const currentBaselineAvg = avgs[0];

    // 以第一组的 baseline 作为全局标准
    if (i === 0) {
      globalBaselineAvg = currentBaselineAvg;
      scores[baseline.id] = currentBaselineAvg;
    }

    // 计算缩放比例，使得各组分数在同一尺度下
    const scale = (globalBaselineAvg > 0 && currentBaselineAvg > 0) ? (globalBaselineAvg / currentBaselineAvg) : 1;

    // 记录本组其它模型的分数
    chunkCandidates.forEach((c, idx) => {
      scores[c.id] = avgs[idx + 1] * scale;
    });
  }

  console.log('Calculated Scores:', scores);

  const sortedCandidates = candidates.map(c => ({
    id: c.id,
    score: scores[c.id] || 0
  })).sort((a, b) => b.score - a.score);

  console.log('Ranking:', sortedCandidates);

  // 选取排名前 12 的作为动态热门推荐
  const topIds = sortedCandidates.slice(0, 12).map(c => c.id);
  // 为了确保智谱清言一定在热门中，如果它不在前12，强制加入
  if (!topIds.includes('zhipu')) {
    topIds.push('zhipu');
  }
  console.log('Top models to feature:', topIds);

  // 覆写 src/data/featured.json
  const fs = require('fs');
  const path = require('path');
  const targetFile = path.join(__dirname, '../src/data/featured.json');
  
  fs.writeFileSync(targetFile, JSON.stringify(topIds, null, 2), 'utf8');
  console.log(`Successfully updated featured.json`);
}

main().catch(console.error);
