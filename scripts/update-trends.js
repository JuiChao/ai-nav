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
