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
    id: 'openai-gpt-6-astra',
    name: 'GPT-6 Astra / Sol',
    provider: 'OpenAI',
    contextWindow: '1M',
    contextNum: 1000,
    inputPrice: '$2.50',
    outputPrice: '$10.00',
    priceNum: 2.5,
    codingScore: 99,
    reasoningScore: 100,
    primaryStrength: 'OpenAI 官方旗舰基座，复杂科学、深度代码重构与系统级智能体（Agent）推演天花板',
    primaryStrengthEn: 'OpenAI flagship model for advanced reasoning, complex coding, and autonomous multi-agent workflows',
    weakness: '高深度推演模式响应耗时较长，高阶 API 定价高昂',
    weaknessEn: 'Longer latency during deep reasoning phases; higher API token pricing tier',
    isOpenSource: false,
    category: 'reasoning',
    toolId: 'chatgpt',
  },
  {
    id: 'claude-sonnet-5-5',
    name: 'Claude Sonnet 5.5 / Opus 5.5',
    provider: 'Anthropic',
    contextWindow: '1M',
    contextNum: 1000,
    inputPrice: '$3.00 - $15.00',
    outputPrice: '$15.00 - $75.00',
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
    id: 'gemini-3-8-flash',
    name: 'Gemini 3.8 Flash / 3.1 Pro',
    provider: 'Google',
    contextWindow: '1M - 2M',
    contextNum: 2000,
    inputPrice: '$0.75 (优惠期)',
    outputPrice: '$3.75',
    priceNum: 0.75,
    codingScore: 97,
    reasoningScore: 97,
    primaryStrength: '官方最新稳定版 Flash，长跨度软件工程与自主智能体优化，原生多模态音视频同源处理与 Workspace 贯通',
    primaryStrengthEn: 'Latest stable Flash engineered for long-horizon software engineering, autonomous agents, and native audio/video',
    weakness: '合规与安全防护策略偏严，复杂工程代码偶尔出现过度防御拦截',
    weaknessEn: 'Conservative safety guardrails occasionally trigger false-positive compliance stops',
    isOpenSource: false,
    category: 'general',
    toolId: 'gemini',
  },
  {
    id: 'deepseek-v4-1-flash',
    name: 'DeepSeek-V4.1-Flash / Pro',
    provider: 'DeepSeek 深度求索',
    contextWindow: '1M',
    contextNum: 1000,
    inputPrice: '$0.15 (非高峰) / $0.30',
    outputPrice: '$0.60 (非高峰) / $1.20',
    priceNum: 0.15,
    codingScore: 97,
    reasoningScore: 98,
    primaryStrength: '100万 Token 超大窗口，颠覆性 MoE 极致性价比击穿行业底线，高阶数学算法推演与中文工程代码天花板',
    primaryStrengthEn: '1M token context, unrivaled token cost efficiency ($0.15/1M), pinnacle math and code reasoning',
    weakness: '高峰时段官方网页端免费算力排队较多，公共 API 偶有并发波动',
    weaknessEn: 'High concurrency queueing on free web portal during global peak traffic',
    isOpenSource: true,
    category: 'budget',
    toolId: 'deepseek',
  },
  {
    id: 'qwen-3-8-max',
    name: 'Qwen3.8-Max (通义千问)',
    provider: 'Alibaba 阿里云',
    contextWindow: '1M',
    contextNum: 1000,
    inputPrice: '$0.30 - $1.20',
    outputPrice: '$0.90 - $3.60',
    priceNum: 0.30,
    codingScore: 96,
    reasoningScore: 96,
    primaryStrength: '2.4万亿参数 Sparse MoE 架构，原生支持文本/图像/视频全模态，政企复杂表格与本土化知识问答极佳',
    primaryStrengthEn: '2.4T parameter Sparse MoE, native multimodal (text/image/video), premier enterprise tabular analysis',
    weakness: '欧美海外开发者生态社区活跃度仍在追赶',
    weaknessEn: 'Western developer ecosystem footprint is expanding rapidly but still catching up',
    isOpenSource: true,
    category: 'general',
    toolId: 'tongyi-qianwen',
  },
  {
    id: 'zhipu-glm-5-3',
    name: 'GLM-5.3 (智谱清言)',
    provider: 'Zhipu AI 智谱',
    contextWindow: '1M',
    contextNum: 1000,
    inputPrice: '$1.20 - $1.40',
    outputPrice: '$4.00 - $4.40',
    priceNum: 1.20,
    codingScore: 96,
    reasoningScore: 97,
    primaryStrength: 'Always-on 全时思维链推理，学术科研、网络安全漏洞探测与复杂系统级 Agent 自主规划',
    primaryStrengthEn: 'Always-on deep reasoning, autonomous agentic workflows, cybersecurity analysis & STEM logic',
    weakness: '全时深度推演导致日常简短闲聊偶有额外延迟',
    weaknessEn: 'Mandatory deep thinking introduces slight response latency for trivial queries',
    isOpenSource: true,
    category: 'reasoning',
    toolId: 'zhipu',
  },
  {
    id: 'llama-4-maverick',
    name: 'Llama 4 Maverick / Scout',
    provider: 'Meta',
    contextWindow: '1M - 10M',
    contextNum: 10000,
    inputPrice: '$0.00 (权重开放)',
    outputPrice: '$0.00 (私有化算力)',
    priceNum: 0.0,
    codingScore: 95,
    reasoningScore: 95,
    primaryStrength: '全球开源基石，Scout 版支持极限千万级（10M）上下文，Maverick 原生图文多模态，企业 100% 离线私有化部署',
    primaryStrengthEn: 'Global open standard: Scout supports up to 10M context, Maverick native multimodal, 100% self-hosted privacy',
    weakness: '本地多专家 MoE 架构自建部署对 GPU 显存拓扑与推理框架优化要求极高',
    weaknessEn: 'Requires high-end multi-GPU cluster setups for full on-premise MoE inference',
    isOpenSource: true,
    category: 'budget',
    toolId: 'llama-3',
  },
  {
    id: 'kimi-k3',
    name: 'Kimi K3 (2.8万亿参数)',
    provider: 'Moonshot AI 月之暗面',
    contextWindow: '1M',
    contextNum: 1000,
    inputPrice: '$0.80 - $1.80',
    outputPrice: '$1.80 - $3.60',
    priceNum: 0.80,
    codingScore: 94,
    reasoningScore: 95,
    primaryStrength: '基于全新 KDA 与 AttnRes 架构，2.8万亿原生多模态长文本，金融财报与超长司法卷宗穿透式检索',
    primaryStrengthEn: 'Built on novel KDA & AttnRes architecture, 2.8T multimodal parameters, ultra-long dossier analysis',
    weakness: '底层操作系统内核级多线程系统编程深度相对适中',
    weaknessEn: 'Moderate proficiency in low-level kernel systems programming',
    isOpenSource: false,
    category: 'general',
    toolId: 'kimi',
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
                    ? 'While Llama 4 Scout scales up to 10M tokens and Gemini 3.8 Flash supports 2M tokens, performance often degrades when retrieving fine-grained needles across massive multi-modal documents. In empirical audits, Claude Sonnet 5.5 and Gemini 3.8 Flash consistently demonstrate leading needle recall and logical grounding.'
                    : '虽然 Llama 4 Scout 支持最高千万级（10M）上下文，Gemini 3.8 Flash 支持 200 万上下文，但在超大跨文档“大海捞针”测试中，很多模型会出现注意力稀释。实测表明，Claude Sonnet 5.5 与 Gemini 3.8 Flash 在复杂多模态长文本无损检索与关键事实推演上表现最为稳健。'}
                </p>
              </div>

              <div className="editorial-card">
                <h3>{isEn ? '2. Token Economics: Why DeepSeek Disrupts' : '2. Token 成本经济学：DeepSeek 为何改变格局'}</h3>
                <p>
                  {isEn
                    ? 'At $0.15 per 1M input tokens during off-peak hours (and $0.003 with context cache hits), DeepSeek-V4.1-Flash brings frontier reasoning costs to an all-time low while retaining top-tier coding performance. For high-volume automated agent loops, it is an essential cost optimizer.'
                    : '在非高峰时段每百万 Token 仅需 $0.15 的输入成本（命中缓存甚至低至 $0.003），DeepSeek-V4.1-Flash 展现出颠覆性的推理成本优势，同时保持了行业顶尖的代码工程与算法能力，为大规模自动化智能体和后台批处理流水线节约极高预算。'}
                </p>
              </div>

              <div className="editorial-card">
                <h3>{isEn ? '3. Open Weights vs. Closed APIs' : '3. 开源私有化与闭源 API 的权衡'}</h3>
                <p>
                  {isEn
                    ? 'Meta Llama 4 Maverick / Scout and Alibaba Qwen3.8-Max enable 100% on-premise compliance for banks and healthcare. However, consider the total cost of ownership (GPU clusters, electricity, maintenance) before choosing self-hosting over managed cloud APIs.'
                    : 'Meta Llama 4 (Maverick / Scout) 与阿里 Qwen3.8-Max 让政企和金融客户拥有完全的数据合规与本地离线运行自由。但中小型团队切记评估 GPU 算力购置、集群运维与电力开销，若并发需求有限，直接选用商业 API 往往更加经济省心。'}
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
