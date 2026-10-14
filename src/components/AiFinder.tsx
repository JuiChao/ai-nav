'use client';

import { useState } from 'react';
import Link from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/LocaleContext';
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';
import './AiFinder.css';

interface Recommendation {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  taglineEn: string;
  reason: string;
  reasonEn: string;
  url: string;
}

const RECOMMENDATION_RULES: Record<string, Recommendation[]> = {
  'dev-code-free': [
    { id: 'deepseek', name: 'DeepSeek (V4.1-Flash)', icon: '🐋', tagline: '高性价比开源推理模型', taglineEn: 'High-value open reasoning LLM', reason: '代码与算法能力极强，免费提供高阶思维链推理', reasonEn: 'Outstanding code and algorithm performance with free reasoning chains', url: '/tool/deepseek' },
    { id: 'trae', name: 'Trae', icon: '⚡', tagline: '字节跳动全新 AI IDE', taglineEn: 'ByteDance AI IDE with SOLO Mode', reason: '内置 SOLO Mode 自主工程智能体，现阶段完全免费体验', reasonEn: 'Autonomous engineering agent mode, currently free to use', url: '/tool/trae' },
    { id: 'openhands', name: 'OpenHands', icon: '👐', tagline: '开源自主软件开发 Agent', taglineEn: 'Open-source autonomous developer agent', reason: '支持连接本地与容器环境，适合开源极客深入二次开发', reasonEn: 'Connects to local/container sandboxes for full developer autonomy', url: '/tool/openhands' },
  ],
  'dev-code-pro': [
    { id: 'cursor', name: 'Cursor (v3.23)', icon: '🖱️', tagline: '行业第一梯队 AI 原生 IDE', taglineEn: 'Industry gold standard AI-native IDE', reason: 'Composer 跨文件自动重构 + Cursor Router 智能调度最佳模型', reasonEn: 'Composer multi-file refactoring and intelligent model routing', url: '/tool/cursor' },
    { id: 'claude-code', name: 'Claude Code', icon: '⌨️', tagline: 'Anthropic 终端原生 Agent', taglineEn: 'Anthropic CLI native coding agent', reason: '基于 Claude 5.5，直接在命令行跑测试并闭环修 Bug', reasonEn: 'Terminal-native agent that runs tests and fixes bugs autonomously', url: '/tool/claude-code' },
    { id: 'github-copilot', name: 'GitHub Copilot', icon: '🤖', tagline: '微软 GitHub 官方全套开发套件', taglineEn: 'Official Microsoft GitHub developer suite', reason: '无缝融入 VS Code / JetBrains，企业级代码合规与安全保障', reasonEn: 'Seamless IDE integration with enterprise compliance and security', url: '/tool/github-copilot' },
  ],
  'create-image-free': [
    { id: 'flux', name: 'FLUX.1', icon: '⚡', tagline: '开源顶级图像生成模型', taglineEn: 'Frontier open-source image model', reason: '开源社区顶尖画质，解剖结构和光影细节甚至超越闭源平台', reasonEn: 'Top-tier open-source quality with realistic human anatomy and lighting', url: '/tool/flux' },
    { id: 'ideogram', name: 'Ideogram 2.0', icon: '💡', tagline: '文字海报设计神器', taglineEn: 'Typography and graphic layout leader', reason: '生成图片中文字拼写准确率业内第一，提供免费日常点数', reasonEn: 'Industry-best in-image text spelling with free daily generation tier', url: '/tool/ideogram' },
    { id: 'krea', name: 'Krea AI', icon: '🖌️', tagline: '实时画布渲染平台', taglineEn: 'Real-time canvas generation platform', reason: '画笔落下瞬间生成高保真草图，极佳的灵感碰撞工具', reasonEn: 'Instant real-time rendering as you draw, perfect for ideation', url: '/tool/krea' },
  ],
  'create-image-pro': [
    { id: 'midjourney', name: 'Midjourney (V8.2)', icon: '🎨', tagline: '商业视觉与艺术审美天花板', taglineEn: 'Gold standard for aesthetic commercial art', reason: '独创摄影级光影质感与角色一致性控制（--cref），设计工作室标配', reasonEn: 'Cinematic texture, artistic taste, and reliable character consistency', url: '/tool/midjourney' },
    { id: 'gpt-image-2', name: 'GPT Image 2', icon: '🖼️', tagline: 'OpenAI 原生复杂语义遵循', taglineEn: 'OpenAI native complex prompt fidelity', reason: '深度理解几十行超长 Prompt，对细节元素安排极其忠实', reasonEn: 'Unrivaled comprehension of multi-paragraph detailed scene prompts', url: '/tool/gpt-image-2' },
  ],
  'work-write-free': [
    { id: 'doubao', name: '豆包 (Seed-2.1 Pro)', icon: '🫘', tagline: '3.82亿用户国民级助手', taglineEn: '382M MAU leading consumer AI', reason: '中文语感极度自然，支持多 Agent 自定义与音色克隆', reasonEn: 'Flawless native Chinese prose, voice cloning, and custom agent ecosystem', url: '/tool/doubao' },
    { id: 'kimi', name: 'Kimi (K3)', icon: '🌙', tagline: '长文本与深度研报速读', taglineEn: 'Long context and research reading', reason: '支持上百万字中文长文不丢失要点，自动提取结构化大纲', reasonEn: 'Processes multi-million-token Chinese texts with high recall', url: '/tool/kimi' },
    { id: 'mita', name: '秘塔写作猫', icon: '🐱', tagline: '专业中文润色与学术校对', taglineEn: 'Chinese copywriting and academic proofing', reason: '对中文语法、标点与文风进行深度优化，提供权威引用溯源', reasonEn: 'Deep grammatical checking, style enhancement, and cited references', url: '/tool/mita' },
  ],
  'work-write-pro': [
    { id: 'chatgpt', name: 'ChatGPT (GPT-6 Astra)', icon: '🤖', tagline: '全能旗舰与系统级任务接管', taglineEn: 'Frontier reasoning and always-on agents', reason: '集成 Dots 全天候智能体与高级数据分析（ADA），处理复杂商业分析', reasonEn: 'Dots autonomous agents and ADA data analysis for complex business tasks', url: '/tool/chatgpt' },
    { id: 'claude', name: 'Claude (Sonnet 5.5)', icon: '🧠', tagline: '逻辑推演与高拟真人类行文', taglineEn: 'Logical nuance and human-like prose', reason: '行文优雅温润，长程逻辑不崩塌，学术研报与商业白皮书首选', reasonEn: 'Unmatched prose quality, minimal hallucination, ideal for whitepapers', url: '/tool/claude' },
    { id: 'notion-ai', name: 'Notion AI', icon: '📝', tagline: '全生命周期知识库协同', taglineEn: 'Full-lifecycle workspace AI', reason: '深度融入个人与团队笔记，随时随地就地扩写、总结并整理代办', reasonEn: 'Embedded directly into your workspace for in-place generation and synthesis', url: '/tool/notion-ai' },
  ],
  'video-media-pro': [
    { id: 'kling', name: '可灵 AI (Kling 4.0)', icon: '🎥', tagline: '长时高动态 4K HDR 视频', taglineEn: '2-minute continuous 4K HDR video', reason: '支持长达 2 分钟连续生成，动作笔刷与运镜稳定性全球领先', reasonEn: 'Up to 2-minute cinematic video with industry-leading motion brush', url: '/tool/kling' },
    { id: 'veo', name: 'Google Veo 3.1', icon: '🎬', tagline: 'Google 电影级视频大模型', taglineEn: 'Google cinematic video powerhouse', reason: '深度遵循光学摄影变焦规律，原生生成 4K 高画质电影镜头', reasonEn: 'Adheres to physical camera optics, native 4K film-grade shots', url: '/tool/veo' },
    { id: 'suno', name: 'Suno (v6)', icon: '🎵', tagline: '全轨编曲 AI 音乐工作台', taglineEn: 'Full-track AI music studio 2.0', reason: '支持分轨导出与人声多风格定制，获主流唱片公司正版授权', reasonEn: 'Stem splitting, multi-genre vocal customization, fully licensed', url: '/tool/suno' },
  ]
};

export default function AiFinder() {
  const { locale } = useLocale();
  const isEn = locale === 'en';

  const [role, setRole] = useState<'dev' | 'create' | 'work'>('work');
  const [task, setTask] = useState<'write' | 'code' | 'image' | 'video'>('write');
  const [budget, setBudget] = useState<'free' | 'pro'>('free');

  // 根据当前组合动态匹配推荐
  const key = `${role}-${task}-${budget}`;
  const fallbackKey = task === 'code' ? (budget === 'free' ? 'dev-code-free' : 'dev-code-pro')
    : task === 'image' ? (budget === 'free' ? 'create-image-free' : 'create-image-pro')
    : task === 'video' ? 'video-media-pro'
    : (budget === 'free' ? 'work-write-free' : 'work-write-pro');

  const recommendations = RECOMMENDATION_RULES[key] || RECOMMENDATION_RULES[fallbackKey] || RECOMMENDATION_RULES['work-write-free'];

  return (
    <section className="ai-finder" id="ai-finder">
      <div className="ai-finder__container">
        <div className="ai-finder__header">
          <div className="ai-finder__badge">
            <Sparkles size={16} />
            <span>{isEn ? 'Interactive Decision Engine' : 'AI 选型智能向导'}</span>
          </div>
          <h2 className="ai-finder__title">
            {isEn ? 'Find the Perfect AI Stack for Your Workflow' : '3 步智能匹配：为您定制专属 AI 生产力组合'}
          </h2>
          <p className="ai-finder__subtitle">
            {isEn 
              ? 'Tell us your role and requirements. Our algorithmic decision tree recommends vetted tools with transparent trade-offs.' 
              : '告别信息过载与重复订阅。选择您的核心需求与预算，算法引擎将为您即时推导经过真机实测的最佳工具搭配。'}
          </p>
        </div>

        <div className="ai-finder__controls">
          {/* Step 1: 身份/角色 */}
          <div className="ai-finder__control-group">
            <label className="ai-finder__label">
              <span className="ai-finder__step">1</span>
              {isEn ? 'Your Primary Role' : '您的职业/身份'}
            </label>
            <div className="ai-finder__options">
              {[
                { id: 'work', label: isEn ? 'Office & Business' : '职场 / 运营 / 综合', icon: '💼' },
                { id: 'dev', label: isEn ? 'Software & Tech' : '开发者 / 软件工程师', icon: '💻' },
                { id: 'create', label: isEn ? 'Creator & Designer' : '创意 / 设计 / 影视', icon: '🎨' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`ai-finder__btn ${role === item.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setRole(item.id as any);
                    if (item.id === 'dev') setTask('code');
                    if (item.id === 'create') setTask('image');
                    if (item.id === 'work') setTask('write');
                  }}
                >
                  <span className="ai-finder__btn-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: 核心需求 */}
          <div className="ai-finder__control-group">
            <label className="ai-finder__label">
              <span className="ai-finder__step">2</span>
              {isEn ? 'Core Task Focus' : '核心任务需求'}
            </label>
            <div className="ai-finder__options">
              {[
                { id: 'write', label: isEn ? 'Writing & Strategy' : '撰写 / 研报 / 决策', icon: '📝' },
                { id: 'code', label: isEn ? 'Coding & Debugging' : '编程 / 架构 / 修复', icon: '⚡' },
                { id: 'image', label: isEn ? 'Image & Graphic Design' : '生图 / 平面海报', icon: '🖼️' },
                { id: 'video', label: isEn ? 'Video & Audio Production' : '视频生成 / 音乐配音', icon: '🎬' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`ai-finder__btn ${task === item.id ? 'is-active' : ''}`}
                  onClick={() => setTask(item.id as any)}
                >
                  <span className="ai-finder__btn-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: 预算 */}
          <div className="ai-finder__control-group">
            <label className="ai-finder__label">
              <span className="ai-finder__step">3</span>
              {isEn ? 'Budget Preference' : '预算偏好'}
            </label>
            <div className="ai-finder__options">
              {[
                { id: 'free', label: isEn ? 'Free / Open Source First' : '完全免费 / 开源优先', icon: '🌱' },
                { id: 'pro', label: isEn ? 'Professional / Paid Flagship' : '专业商用 / 旗舰付费', icon: '💎' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`ai-finder__btn ${budget === item.id ? 'is-active' : ''}`}
                  onClick={() => setBudget(item.id as any)}
                >
                  <span className="ai-finder__btn-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 动态推荐结果卡片 */}
        <div className="ai-finder__results">
          <div className="ai-finder__results-header">
            <h3>
              {isEn ? '🎯 Recommended Optimal Stack for You:' : '🎯 为您推荐的最佳工具组合：'}
            </h3>
            <span className="ai-finder__results-meta">
              {isEn ? 'Based on verified 2026 testing benchmarks' : '基于 2026 最新官方实测评测库匹配'}
            </span>
          </div>

          <div className="ai-finder__grid">
            {recommendations.map((item, index) => (
              <div key={item.id} className="ai-finder__card">
                <div className="ai-finder__card-top">
                  <div className="ai-finder__card-badge">
                    <span>Rank #{index + 1}</span>
                  </div>
                  <span className="ai-finder__card-icon">{item.icon}</span>
                  <h4 className="ai-finder__card-name">{item.name}</h4>
                  <p className="ai-finder__card-tagline">{isEn ? item.taglineEn : item.tagline}</p>
                </div>

                <div className="ai-finder__card-body">
                  <div className="ai-finder__reason">
                    <CheckCircle2 size={15} className="ai-finder__check-icon" />
                    <span>{isEn ? item.reasonEn : item.reason}</span>
                  </div>
                </div>

                <div className="ai-finder__card-footer">
                  <Link href={item.url} className="ai-finder__detail-link">
                    <span>{isEn ? 'Read In-Depth Review' : '阅读深度评测报告'}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* 快速直达比较矩阵 */}
          <div className="ai-finder__footer-bar">
            <span>
              {isEn 
                ? 'Want to inspect exact token pricing, context windows, and latency?' 
                : '需要查看各模型的具体 Token 定价、上下文窗口与技术细节？'}
            </span>
            <Link href="/compare" className="ai-finder__compare-btn">
              <span>{isEn ? 'Open Full Model Matrix 2026 →' : '进入 2026 全景模型横评矩阵 →'}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
