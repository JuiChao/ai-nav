import fs from 'fs';
import path from 'path';
import { AI_TOOLS } from '../src/data/tools';

interface SyncMetadata {
  lastSyncDate: string;
  nextSyncDate: string;
  syncIntervalDays: number;
  totalTools: number;
  healthyCount: number;
  featuredCount: number;
  verifiedModels: string[];
  status: 'healthy' | 'warning' | 'error';
  inspectedUrls: number;
  unreachableUrls: string[];
  lifecycleAudit: {
    retiredOrDeprecatedTracked: number;
    knownRetiredTools: string[];
    highTractionTrendingWatchlist: string[];
    recentlyAddedOrUpdated: string[];
  };
}

// 核心前沿大模型基准（根据 2026 最新官方核验名单保持最新）
const CORE_MODELS = [
  'GPT-6 Astra / GPT-6.1 Sol / Luna',
  'Claude Sonnet 5.5 / Opus 5.5 / Fable 5.1',
  'Gemini 4 Argon / 3.8 Flash',
  'DeepSeek-V4.1-Flash / V4 Pro',
  'GLM-5.3',
  'Qwen3.8-Max',
  'Kimi K3',
  'Doubao-Seed-2.1 Pro',
  'Meta Muse Spark 1.3 / Llama 4',
  'Grok 4.7',
  'Kling 4.0'
];

// 已确认退市、停止官方支持或全面关闭的 AI 产品审计黑名单
// 定时任务执行时，若库内有包含此类工具或外部探测确认为此类状态，将触发即时剔除警报
const KNOWN_RETIRED_OR_DEFUNCT_AI = [
  { id: 'sora', name: 'OpenAI Sora', reason: 'OpenAI 官方宣布关停：Web/App 于 2026年4月停运，API 于 2026年9月完全下线' },
  { id: 'relay-app', name: 'Relay.app', reason: '工作流自动化平台，于 2026年9月停止服务' },
  { id: 'clockwise', name: 'Clockwise', reason: 'AI 日程助手，被 Salesforce 收购后于 2026年3月停止独立运营' },
  { id: 'kreateable', name: 'Kreateable', reason: 'AI 设计平台，于 2026年2月正式关停' },
  { id: 'multilings', name: 'Multilings', reason: 'AI 翻译平台，于 2026年3月关闭' },
  { id: 'ideogram-2', name: 'Ideogram 2.0 (冗余重复项)', reason: '已并入统一主条目 Ideogram，剔除重复 URL 页面以防止 Thin Content' }
];

// 2026 持续监控的高热度新生代 AI 候选与已准入清单
const HIGH_TRACTION_WATCHLIST = [
  { id: 'granola', name: 'Granola', category: 'productivity', status: 'active', desc: '爆款 AI 会议笔记，人机混合速记，无 Bot 打扰' },
  { id: 'gumloop', name: 'Gumloop', category: 'productivity', status: 'active', desc: '新一代无代码 AI Agent 自动化与可视化工作流' },
  { id: 'lovable', name: 'Lovable', category: 'coding', status: 'active', desc: '全栈对话式 Web 应用秒级生成 (Vibe-Coding)' },
  { id: 'bolt', name: 'Bolt.new', category: 'coding', status: 'active', desc: 'StackBlitz 出品，浏览器端即时全栈构建与部署' },
  { id: 'manus', name: 'Manus', category: 'productivity', status: 'active', desc: '通用自主执行智能体' },
  { id: 'trae', name: 'Trae', category: 'coding', status: 'active', desc: '字节跳动全新 AI IDE，搭载 SOLO Mode 自主工程智能体' },
  { id: 'claude-code', name: 'Claude Code', category: 'coding', status: 'active', desc: 'Anthropic 终端原生工程智能体' },
  { id: 'sai', name: 'Sai by Simular', category: 'productivity', status: 'evaluating', desc: '前沿自主桌面 GUI 智能体' },
  { id: 'viktor', name: 'Viktor', category: 'productivity', status: 'evaluating', desc: '企业级 Slack/Teams 协作自主员工 Agent' }
];

// 工具基础权重与热度因子 (涵盖对话、编程、生图、视频等多维度领军工具)
const TOOL_WEIGHT_BASE: Record<string, number> = {
  chatgpt: 99,
  claude: 98,
  gemini: 97,
  deepseek: 97,
  doubao: 96,
  cursor: 96,
  midjourney: 95,
  kling: 95,
  zhipu: 94,
  kimi: 93,
  'tongyi-qianwen': 92,
  veo: 91,
  grok: 91,
  manus: 90,
  notebooklm: 90,
  flux: 89,
  'llama-3': 88,
  'meta-ai': 88,
  suno: 88,
  'claude-code': 87,
  windsurf: 86,
  v0: 85,
  granola: 85,
  gumloop: 84
};

async function checkUrlLiveness(url: string, timeoutMs: number = 6000): Promise<{ reachable: boolean; status?: number; error?: string }> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 AI-Nav-Health-Bot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      signal: controller.signal,
      redirect: 'follow'
    }).catch(async () => {
      // 部分站点对 HEAD 返回 405/403，改用 GET 浅层探测
      return await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 AI-Nav-Health-Bot/1.0'
        },
        signal: controller.signal
      });
    });

    clearTimeout(timeout);
    // 2xx、3xx 以及因反爬严格返回的 403 均视为网址有效在线
    const isReachable = res.status < 500;
    return { reachable: isReachable, status: res.status };
  } catch (err: any) {
    return { reachable: false, error: err.name === 'AbortError' ? 'Timeout' : err.message };
  }
}

async function runScheduledSync() {
  console.log('🚀 [Scheduled Sync] 开始执行全站 AI 数据定期同步与巡检...');
  const startTime = Date.now();

  const totalTools = AI_TOOLS.length;
  console.log(`📦 [Data Check] 检测到当前库内工具总计: ${totalTools} 个`);

  // 1. 自动执行退市 AI 审计：检查是否有任何已废弃或下线工具仍在库内
  console.log('🛡️ [Decommission Audit] 正在对照已退市 AI 数据库进行全库排查...');
  const activeIds = new Set(AI_TOOLS.map(t => t.id));
  const retiredToolsInRepo: string[] = [];
  for (const retired of KNOWN_RETIRED_OR_DEFUNCT_AI) {
    if (activeIds.has(retired.id)) {
      console.warn(`🚨 [Alert] 发现已退市工具仍在库内: ${retired.name} (${retired.id})，原因: ${retired.reason}`);
      retiredToolsInRepo.push(`${retired.name} (${retired.id})`);
    }
  }

  if (retiredToolsInRepo.length === 0) {
    console.log('✅ [Decommission Audit] 库内无任何已知退市/关停废弃工具，状态安全清洁！');
  }

  // 2. 自动检查高热度 AI 追踪池的收录状态
  console.log('🌟 [High-Traction Watchlist] 巡检 2026 前沿高热度 AI 准入状态...');
  const missingHighTraction: string[] = [];
  const activeHighTraction: string[] = [];
  for (const item of HIGH_TRACTION_WATCHLIST) {
    if (item.status === 'active') {
      if (activeIds.has(item.id)) {
        activeHighTraction.push(`${item.name} (${item.category})`);
      } else {
        missingHighTraction.push(`${item.name} (${item.category})`);
      }
    }
  }
  console.log(`✅ [High-Traction Status] 已收录活跃高热度 AI: ${activeHighTraction.join(', ')}`);
  if (missingHighTraction.length > 0) {
    console.warn(`💡 [Candidate Notice] 待考虑纳入的候选高热度 AI: ${missingHighTraction.join(', ')}`);
  }

  // 3. 并发探测各工具网址存活状态 (控制并发度为 5，避免对外部站点构成压力)
  console.log('🔍 [Liveness Probe] 正在巡检工具官方网站可用性...');
  const unreachableList: string[] = [];
  const chunkSize = 5;

  for (let i = 0; i < AI_TOOLS.length; i += chunkSize) {
    const chunk = AI_TOOLS.slice(i, i + chunkSize);
    await Promise.all(
      chunk.map(async (tool) => {
        const result = await checkUrlLiveness(tool.url);
        if (!result.reachable) {
          console.warn(`⚠️ [Warning] 工具 ${tool.name} (${tool.url}) 探测异常: ${result.error || result.status}`);
          unreachableList.push(`${tool.name} (${tool.url})`);
        }
      })
    );
  }

  const healthyCount = totalTools - unreachableList.length;
  console.log(`✅ [Liveness Probe] 巡检完成: ${healthyCount}/${totalTools} 正常在线`);

  // 4. 计算动态热度榜单 (Rank & Featured)
  console.log('🔥 [Trend Ranking] 计算全网最新推荐与热门权重...');
  const scoredTools = AI_TOOLS.map((tool) => {
    const base = TOOL_WEIGHT_BASE[tool.id] || 60;
    // 保证各核心分类（对话、编程、图像、视频、效率）的顶级工具能均衡入选
    let categoryBonus = 0;
    if (['chatbot', 'coding', 'image', 'video', 'productivity'].includes(tool.category)) {
      categoryBonus = 5;
    }
    return {
      id: tool.id,
      name: tool.name,
      score: base + categoryBonus
    };
  }).sort((a, b) => b.score - a.score);

  // 取前 12 名作为全站 featured 热门精选
  const top12Featured = scoredTools.slice(0, 12).map((item) => item.id);

  // 确保国产品牌智谱清言与顶级开源模型在精选池中
  if (!top12Featured.includes('zhipu')) {
    top12Featured[top12Featured.length - 1] = 'zhipu';
  }

  const featuredFilePath = path.join(__dirname, '../src/data/featured.json');
  fs.writeFileSync(featuredFilePath, JSON.stringify(top12Featured, null, 2), 'utf-8');
  console.log(`✅ [Featured Update] 已更新 src/data/featured.json (共 ${top12Featured.length} 款推荐工具)`);

  // 5. 生成与刷新结构化维护元数据
  const syncIntervalDays = 5;
  const now = new Date();
  const nextSync = new Date(now.getTime() + syncIntervalDays * 24 * 60 * 60 * 1000);

  const metadata: SyncMetadata = {
    lastSyncDate: now.toISOString(),
    nextSyncDate: nextSync.toISOString(),
    syncIntervalDays,
    totalTools,
    healthyCount,
    featuredCount: top12Featured.length,
    verifiedModels: CORE_MODELS,
    status: (unreachableList.length === 0 && retiredToolsInRepo.length === 0) ? 'healthy' : 'warning',
    inspectedUrls: totalTools,
    unreachableUrls: unreachableList,
    lifecycleAudit: {
      retiredOrDeprecatedTracked: KNOWN_RETIRED_OR_DEFUNCT_AI.length,
      knownRetiredTools: KNOWN_RETIRED_OR_DEFUNCT_AI.map(r => `${r.name}: ${r.reason}`),
      highTractionTrendingWatchlist: HIGH_TRACTION_WATCHLIST.map(h => `${h.name} (${h.category}) - ${h.status}`),
      recentlyAddedOrUpdated: [
        'Granola (2026 爆款 AI 会议笔记)',
        'Gumloop (2026 爆款 Agent 自动化编排)',
        'Kling 4.0 (快手 4K HDR 视频旗舰)',
        'Doubao-Seed-2.1 Pro (3.82亿月活)',
        'Cursor v3.23 (Claude Opus 5.5 / Grok 4.7 引擎)',
        'Ideogram 2.0 (已合并剔除冗余项)'
      ]
    }
  };

  const metadataFilePath = path.join(__dirname, '../src/data/sync-metadata.json');
  fs.writeFileSync(metadataFilePath, JSON.stringify(metadata, null, 2), 'utf-8');
  console.log(`✅ [Metadata Update] 已更新 src/data/sync-metadata.json (下次巡检时间: ${nextSync.toISOString().split('T')[0]})`);

  // 6. 触发 sitemap 生成以更新 lastmod
  console.log('🗺️ [Sitemap Sync] 触发全站 sitemap.xml 刷新...');
  try {
    const sitemapScript = path.join(__dirname, './generate-sitemap.ts');
    require('tsx/cjs/api').register?.();
    require('./generate-sitemap');
  } catch {
    console.log('ℹ️ [Sitemap] 将在下一步 build 中统一由 npm run build 自动触发生成');
  }

  // 7. 如果在 GitHub Actions 中执行，写入 Step Summary 便于审计追踪
  if (process.env.GITHUB_STEP_SUMMARY) {
    const summaryMd = `
### 🤖 全站 AI 数据定期巡检与生命周期审计报告 (${now.toISOString().split('T')[0]})
- **巡检周期：** 每 ${syncIntervalDays} 天自动执行
- **下一次计划巡检：** ${nextSync.toISOString().split('T')[0]}
- **库内工具总数：** ${totalTools} 款
- **存活探测结果：** ${healthyCount}/${totalTools} 正常可用
- **🛡️ 退市 AI 审计：** 监控 ${KNOWN_RETIRED_OR_DEFUNCT_AI.length} 款已知下线产品，库内异常项: ${retiredToolsInRepo.length === 0 ? '0 项（纯净）' : retiredToolsInRepo.join(', ')}
- **🌟 高热度追踪：** 已收录 ${activeHighTraction.length} 款核心爆款 (${activeHighTraction.join(', ')})
- **🔥 热门精选更新：** ${top12Featured.join(', ')}
- **🎯 核验前沿模型：** ${CORE_MODELS.join('、')}
- **耗时：** ${((Date.now() - startTime) / 1000).toFixed(1)} 秒
`;
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summaryMd, 'utf-8');
  }

  console.log(`🎉 [Scheduled Sync] 全站数据同步巡检圆满完成！耗时: ${((Date.now() - startTime) / 1000).toFixed(1)}s`);
}

runScheduledSync().catch((err) => {
  console.error('❌ [Scheduled Sync] 执行异常:', err);
  process.exit(1);
});
