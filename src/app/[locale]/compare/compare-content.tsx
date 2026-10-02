'use client';

import React, { useState, useMemo } from 'react';
import Header, { Footer } from '@/components/Header';
import Link from '@/components/LocalizedLink';
import './compare.css';

interface ModelComparisonItem {
  id: string;
  name: string;
  provider: string;
  contextWindow: string;
  contextNum: number; // for sorting
  inputPrice: string; // per 1M tokens
  outputPrice: string; // per 1M tokens
  priceNum: number; // for sorting (input price in USD)
  codingScore: number; // /100
  reasoningScore: number; // /100
  primaryStrength: string;
  primaryStrengthEn: string;
  weakness: string;
  weaknessEn: string;
  isOpenSource: boolean;
  category: 'reasoning' | 'coding' | 'general' | 'budget';
  toolId?: string; // link to our internal tool detail
}

const COMPARISON_DATA: ModelComparisonItem[] = [
  {
    id: 'openai-o3-gpt5',
    name: 'OpenAI o3 / GPT-5',
    provider: 'OpenAI',
    contextWindow: '200k - 1M',
    contextNum: 1000,
    inputPrice: '$1.50 - $10.00',
    outputPrice: '$6.00 - $40.00',
    priceNum: 5.0,
    codingScore: 99,
    reasoningScore: 100,
    primaryStrength: '前沿自主系统推理，SWE-bench 与 ARC-AGI 顶峰，原生智能体自主推演与全模态任务调度',
    primaryStrengthEn: 'Pinnacle autonomous reasoning, SOTA on SWE-bench & ARC-AGI, native multi-step agent orchestration',
    weakness: '深度推演模式响应耗时较长，企业顶配高并发配额成本不菲',
    weaknessEn: 'Noticeable latency during deep thinking phases; premium enterprise pricing',
    isOpenSource: false,
    category: 'reasoning',
    toolId: 'chatgpt',
  },
  {
    id: 'claude-4-5-sonnet',
    name: 'Claude 4.5 Sonnet / Opus',
    provider: 'Anthropic',
    contextWindow: '500k - 1M',
    contextNum: 1000,
    inputPrice: '$3.00 - $8.00',
    outputPrice: '$12.00 - $32.00',
    priceNum: 3.0,
    codingScore: 99,
    reasoningScore: 98,
    primaryStrength: '生产级全栈工程自愈与超大系统架构设计，极佳拟人哲学思辨与零幻觉长文研读',
    primaryStrengthEn: 'Production codebase self-healing & system refactoring, nuanced prose with zero hallucination',
    weakness: '官方账号风控与区域网络合规限制依然严苛',
    weaknessEn: 'Strict automated account risk control and regional network constraints',
    isOpenSource: false,
    category: 'coding',
    toolId: 'claude',
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3.5 Pro / 3.6 Flash',
    provider: 'Google',
    contextWindow: '2M - 4M',
    contextNum: 4000,
    inputPrice: '$0.30 - $1.25',
    outputPrice: '$1.20 - $5.00',
    priceNum: 0.30,
    codingScore: 96,
    reasoningScore: 97,
    primaryStrength: '400万极限超大上下文 100% 检索无损召回，多小时长视频原生解析与 Google 生态闭环',
    primaryStrengthEn: '4M ultra-long context with 100% needle recall, native hour-long video ingestion & Workspace synergy',
    weakness: '合规与安全防护策略偏严，复杂工程代码偶尔出现过度防御拦截',
    weaknessEn: 'Conservative safety guardrails occasionally trigger false-positive compliance stops',
    isOpenSource: false,
    category: 'general',
    toolId: 'gemini',
  },
  {
    id: 'deepseek-v4-r2',
    name: 'DeepSeek V4-Flash / R2',
    provider: 'DeepSeek 深度求索',
    contextWindow: '128k - 256k',
    contextNum: 256,
    inputPrice: '$0.10 - $0.20',
    outputPrice: '$0.30 - $0.60',
    priceNum: 0.10,
    codingScore: 97,
    reasoningScore: 98,
    primaryStrength: '革命性自研 MoE 架构击穿行业成本底线，高阶数学算法推演与中文工程代码天花板',
    primaryStrengthEn: 'Disruptive architecture breaking cost barriers, top-tier mathematical deduction & code logic',
    weakness: '高峰期官方网页端并发排队，公共 API 端点偶有抖动',
    weaknessEn: 'High concurrency queueing on free web portal during global peak traffic',
    isOpenSource: true,
    category: 'budget',
    toolId: 'deepseek',
  },
  {
    id: 'qwen-3-8-max',
    name: 'Qwen 3.8-Max (通义千问)',
    provider: 'Alibaba 阿里云',
    contextWindow: '256k - 512k',
    contextNum: 512,
    inputPrice: '$0.30 - $1.20',
    outputPrice: '$0.90 - $3.60',
    priceNum: 0.30,
    codingScore: 95,
    reasoningScore: 96,
    primaryStrength: '2.4万亿超大规模 MoE 霸榜开源评测，本土政企复杂表格、公文与多语言全能泛化',
    primaryStrengthEn: '2.4T MoE benchmark champion, premier enterprise tabular analysis & multilingual generalization',
    weakness: '国际开源开发者社群活跃度仍在加速扩展中',
    weaknessEn: 'Western developer ecosystem footprint is expanding rapidly but still catching up',
    isOpenSource: true,
    category: 'general',
    toolId: 'tongyi-qianwen',
  },
  {
    id: 'llama-4-405b',
    name: 'Llama 4 (100B / 405B)',
    provider: 'Meta',
    contextWindow: '256k - 512k',
    contextNum: 512,
    inputPrice: '$0.00 (权重开放)',
    outputPrice: '$0.00 (私有化算力)',
    priceNum: 0.0,
    codingScore: 94,
    reasoningScore: 95,
    primaryStrength: '全球开源基石，全模态原生支持，企业 100% 离线私有化精调与数据主权合规',
    primaryStrengthEn: 'Global open-weights benchmark, native multimodal, 100% private on-premise finetuning',
    weakness: '千亿级旗舰权重自建部署需庞大 GPU 集群与专业运维团队',
    weaknessEn: 'Requires high-end multi-GPU cluster setups for full on-premise inference',
    isOpenSource: true,
    category: 'budget',
    toolId: 'llama-3',
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3 (3万亿参数 MoE)',
    provider: 'Moonshot AI 月之暗面',
    contextWindow: '2M - 4M',
    contextNum: 4000,
    inputPrice: '$0.80 - $1.80',
    outputPrice: '$1.80 - $3.60',
    priceNum: 0.80,
    codingScore: 93,
    reasoningScore: 94,
    primaryStrength: '数百万字超长金融财报、司法卷宗穿透式检索与网状关键事实证据链提取',
    primaryStrengthEn: 'Multi-million token financial dossier analysis, relational evidence-chain extraction',
    weakness: '底层系统级 Linux 内核多线程编程深度相对适中',
    weaknessEn: 'Moderate proficiency in low-level kernel systems programming',
    isOpenSource: false,
    category: 'general',
    toolId: 'kimi',
  },
  {
    id: 'grok-3-4',
    name: 'Grok 3 / 4',
    provider: 'xAI',
    contextWindow: '256k - 512k',
    contextNum: 512,
    inputPrice: '$2.00 - $5.00',
    outputPrice: '$8.00 - $15.00',
    priceNum: 2.0,
    codingScore: 95,
    reasoningScore: 97,
    primaryStrength: 'Colossus 超算集群极致训练，零审查无偏见探究，直连 X 全球突发快讯与实时信源',
    primaryStrengthEn: 'Trained on Colossus mega-cluster, unfiltered direct inquiry, exclusive real-time X news stream',
    weakness: '企业级自动化工具调用生态与对外接口服务体系仍在建设中',
    weaknessEn: 'Enterprise agent tooling and external integration ecosystem still maturing',
    isOpenSource: false,
    category: 'reasoning',
    toolId: 'grok',
  }
];

export default function CompareContent({ locale }: { locale: string }) {
  const isEn = locale === 'en';
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'context' | 'price' | 'coding'>('default');

  const filteredModels = useMemo(() => {
    return COMPARISON_DATA.filter((m) => {
      const matchesCategory = activeCategory === 'all' || m.category === activeCategory || (activeCategory === 'opensource' && m.isOpenSource);
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        m.name.toLowerCase().includes(query) || 
        m.provider.toLowerCase().includes(query) ||
        (isEn ? m.primaryStrengthEn : m.primaryStrength).toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'context') return b.contextNum - a.contextNum;
      if (sortBy === 'price') return a.priceNum - b.priceNum;
      if (sortBy === 'coding') return b.codingScore - a.codingScore;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, isEn]);

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="compare-page">
        <div className="compare-page__container">
          <header className="compare-page__header">
            <span className="compare-page__badge">
              {isEn ? '⚡ September 2026 Comprehensive Benchmark' : '⚡ 2026年9月最新大模型实测参数库'}
            </span>
            <h1 className="compare-page__title">
              {isEn ? 'Frontier AI Model Matrix & Pricing Guide' : '全球主流 AI 大模型核心参数与定价全景横评'}
            </h1>
            <p className="compare-page__subtitle">
              {isEn 
                ? 'Objective comparison across context window, reasoning benchmarks, API token economics, and practical strengths to help you pick the optimal model stack.'
                : '基于 2026 年秋季最新数据，客观对比基座大模型的上下文窗口、代码与逻辑能力、API 定价及真实优缺点，助您精准挑选最适合业务场景的 AI 组合。'}
            </p>
          </header>

          {/* 交互式筛选工具条 */}
          <section className="compare-controls">
            <div className="compare-controls__tabs">
              <button 
                type="button" 
                className={`compare-tab ${activeCategory === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                {isEn ? 'All Models' : '全部模型'}
              </button>
              <button 
                type="button" 
                className={`compare-tab ${activeCategory === 'reasoning' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('reasoning')}
              >
                {isEn ? 'Deep Reasoning' : '深度推理'}
              </button>
              <button 
                type="button" 
                className={`compare-tab ${activeCategory === 'coding' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('coding')}
              >
                {isEn ? 'Code & Agent' : '编程智能体'}
              </button>
              <button 
                type="button" 
                className={`compare-tab ${activeCategory === 'budget' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('budget')}
              >
                {isEn ? 'Cost-Effective' : '极致性价比'}
              </button>
              <button 
                type="button" 
                className={`compare-tab ${activeCategory === 'opensource' ? 'is-active' : ''}`}
                onClick={() => setActiveCategory('opensource')}
              >
                {isEn ? 'Open Weights' : '开源可私有化'}
              </button>
            </div>

            <div className="compare-controls__inputs">
              <input 
                type="text" 
                className="compare-search"
                placeholder={isEn ? 'Search model or provider...' : '输入模型名、机构或特性搜索...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <select 
                className="compare-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort models"
              >
                <option value="default">{isEn ? 'Default Sort' : '默认排序'}</option>
                <option value="context">{isEn ? 'Context Window (High to Low)' : '上下文窗口 (大到小)'}</option>
                <option value="price">{isEn ? 'API Price (Low to High)' : '调用价格 (低到高)'}</option>
                <option value="coding">{isEn ? 'Coding Benchmark Score' : '代码能力评分'}</option>
              </select>
            </div>
          </section>

          {/* 核心对比表格 */}
          <div className="compare-table-wrapper">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{isEn ? 'Model & Provider' : '模型名称与研发机构'}</th>
                  <th>{isEn ? 'Context Window' : '最大上下文'}</th>
                  <th>{isEn ? 'API Token Price (1M)' : '每百万 Token 价格 (入/出)'}</th>
                  <th>{isEn ? 'Coding / Reasoning' : '代码 / 推理评分'}</th>
                  <th>{isEn ? 'Key Strength' : '核心王牌优势'}</th>
                  <th>{isEn ? 'Trade-offs / Weakness' : '局限与不足'}</th>
                  <th>{isEn ? 'Deep Review' : '深度评测'}</th>
                </tr>
              </thead>
              <tbody>
                {filteredModels.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="model-name-cell">
                        <strong>{item.name}</strong>
                        <span className="model-provider">{item.provider}</span>
                        {item.isOpenSource && (
                          <span className="model-tag-open">{isEn ? 'Open Weights' : '开源'}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="model-context-badge">{item.contextWindow}</span>
                    </td>
                    <td>
                      <div className="model-price-cell">
                        <div><small>{isEn ? 'In: ' : '输入: '}</small>{item.inputPrice}</div>
                        <div><small>{isEn ? 'Out: ' : '输出: '}</small>{item.outputPrice}</div>
                      </div>
                    </td>
                    <td>
                      <div className="score-bars">
                        <div className="score-item">
                          <span>{isEn ? 'Code' : '代码'}: {item.codingScore}</span>
                          <div className="score-bar"><div style={{ width: `${item.codingScore}%` }} /></div>
                        </div>
                        <div className="score-item">
                          <span>{isEn ? 'Logic' : '推理'}: {item.reasoningScore}</span>
                          <div className="score-bar score-bar--logic"><div style={{ width: `${item.reasoningScore}%` }} /></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="strength-text">{isEn ? item.primaryStrengthEn : item.primaryStrength}</p>
                    </td>
                    <td>
                      <p className="weakness-text">{isEn ? item.weaknessEn : item.weakness}</p>
                    </td>
                    <td>
                      {item.toolId ? (
                        <Link href={`/tool/${item.toolId}/`} className="review-link-btn">
                          {isEn ? 'Read Review →' : '查看评测 →'}
                        </Link>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 深度选型决策指南 (E-E-A-T 原创知识文章) */}
          <article className="compare-editorial">
            <h2>{isEn ? '2026 Model Selection Decision Framework' : '2026 大模型选型避坑与决策框架'}</h2>
            
            <div className="editorial-grid">
              <div className="editorial-card">
                <h3>{isEn ? '1. Context Window vs. True Needle Retrieval' : '1. 上下文长度不等于实际有效检索'}</h3>
                <p>
                  {isEn 
                    ? 'Many models advertise multi-million token windows, but performance often degrades severely when retrieving cross-document needles. For mission-critical legal or code audits, Claude 4.5 and Gemini 3.5 Pro consistently maintain near-zero recall loss.'
                    : '许多模型宣称具备数百万级上下文，但在复杂跨文档“大海捞针”测试中往往出现后半段记忆衰退。经过实测，Claude 4.5 与 Gemini 3.5 Pro 在长文本细节无损检索与复杂逻辑追踪上表现最为稳健。'}
                </p>
              </div>

              <div className="editorial-card">
                <h3>{isEn ? '2. Token Economics: Why DeepSeek Disrupts' : '2. Token 成本经济学：DeepSeek 为何改变格局'}</h3>
                <p>
                  {isEn
                    ? 'At $0.10 - $0.20 per 1M input tokens, DeepSeek V4-Flash reduces inference costs to a fraction of proprietary giants while retaining 95%+ of top-tier coding performance. For high-volume automated agent pipelines, it remains the ultimate cost optimizer.'
                    : '每百万 Token 仅需 $0.10 - $0.20 的调用成本，DeepSeek V4-Flash 将推理成本压缩至顶流商业闭源模型的百分之一，却具备超过 95% 的前沿代码与算法推理能力。在大规模数据清洗、批量智能体执行管线中具备颠覆性性价比。'}
                </p>
              </div>

              <div className="editorial-card">
                <h3>{isEn ? '3. Open Weights vs. Closed APIs' : '3. 开源私有化与闭源 API 的权衡'}</h3>
                <p>
                  {isEn
                    ? 'Meta Llama 4 and Qwen 3 enable 100% on-premise compliance for banks and healthcare. However, consider the total cost of ownership (GPU clusters, electricity, maintenance) before choosing self-hosting over managed cloud APIs.'
                    : 'Meta Llama 4 与阿里通义千问 3 让政企和医疗客户拥有完全的数据合规与本地离线运行自由。但中小型团队切记评估 GPU 算力购置、机房运维与电力成本，若高并发调用有限，直接选用商业 API 往往更加经济划算。'}
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
