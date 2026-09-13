import { AiTool } from '@/types';

export type RichData = Pick<AiTool, 'features' | 'featuresEn' | 'useCases' | 'useCasesEn' | 'pros' | 'prosEn' | 'cons' | 'consEn'>;

export const RICH_CONTENT_MAP: Record<string, RichData> = {
  // ─── AI 对话与大模型 ───
  'chatgpt': {
    features: ['Max Reasoning 深度多步推理模式，自动构建解题思维链与验证步骤', '原生计算机与应用自主控制（Operator/OS Agent），可自动跨应用完成任务', '无缝集成的多模态画布与高级数据交互分析 (Advanced Data Analysis)'],
    featuresEn: ['Max Reasoning mode for autonomous chain-of-thought and verification', 'Native OS & App Operator Agent for end-to-end task automation', 'Seamlessly integrated multimodal canvas and Advanced Data Analysis'],
    useCases: ['复杂架构设计、代码排查与跨学科深度科研论证', '企业级海量非结构化数据清洗、统计分析与可视化报表', '全能型跨领域智能办公搭档与高阶创意生成'],
    useCasesEn: ['Complex architectural design, code debugging, and scientific research', 'Enterprise unstructured data cleaning, statistical modeling, and visualization', 'All-around interdisciplinary executive assistant and creative generation'],
    pros: ['全网综合能力与智能体基座生态的绝对领头羊', '长短记忆管理完善，多轮对话上下文连贯度极高', '支持语音、视觉与屏幕感知的毫秒级实时交互'],
    prosEn: ['Undisputed industry benchmark for general intelligence and agent ecosystems', 'Sophisticated long-term memory management and contextual coherence', 'Sub-second real-time voice, vision, and screen perception'],
    cons: ['高级推理与团队版订阅门槛较高', '在高度垂直冷门领域仍偶有事实幻觉'],
    consEn: ['Higher subscription barrier for premium reasoning and team tiers', 'Occasional hallucinations in extremely niche vertical domains']
  },
  'claude': {
    features: ['50万 Token 工业级超长上下文窗口，无损理解超大技术代码库与卷宗', 'Artifacts UI 独立交互沙盒，即时预览与交互运行 React/HTML/SVG', '业内公认最高的自然语言亲和度与顶级代码逻辑严密性'],
    featuresEn: ['500k-token industrial-grade context window with zero-loss recall', 'Artifacts interactive UI sandbox for real-time React/HTML/SVG execution', 'Industry-acknowledged highest natural writing nuance and elite coding rigor'],
    useCases: ['整本专著、技术白皮书与数百页法律金融卷宗深度研读对比', '专业前端界面原型设计、组件重构与端到端代码生成', '撰写高情商、措辞考究的商业文书、品牌公关与深度评论'],
    useCasesEn: ['Analyzing full books, technical specs, and 100+ page legal/financial filings', 'Professional frontend UI prototyping, component refactoring, and code generation', 'Crafting nuanced business communications, PR narratives, and in-depth essays'],
    pros: ['超长篇幅文本逻辑闭环极强，毫无“大海捞针”盲区', '代码初次运行成功率在各大评测中名列前茅', '拒绝有害指令的安全性极高，极少胡言乱语'],
    prosEn: ['Unmatched coherence across long context with flawless recall', 'Highest first-run code compilation rate across major benchmarks', 'Exceptional safety guardrails and minimal hallucination'],
    cons: ['未集成原生实时全网搜索引擎', '部分地区直接访问具有网络环境门槛'],
    consEn: ['Lacks native real-time web search engine integration', 'Region-specific network access limitations apply']
  },
  'gemini': {
    features: ['原生多模态深度融合网络，音视频和图像与文本同源理解', '深度嵌入 Google Workspace 全家桶 (Gmail, Docs, Drive, Cloud)', '极速吞吐与 200万 Token 超大上下文（Gemini Pro / Flash-Lite）'],
    featuresEn: ['Native multimodal fusion architecture processing video, audio, and text simultaneously', 'Native integration across Google Workspace (Gmail, Docs, Drive, GCP)', 'Ultra-high token throughput and up to 2M context window (Pro / Flash-Lite)'],
    useCases: ['小时级视频录像智能检索、关键事件提取与精彩集锦生成', '与谷歌云环境联动的企业级文档知识问答与事实核查', '超高并发场景下的低成本高响应 API 自动化处理管线'],
    useCasesEn: ['Searching hour-long video feeds, extracting key timestamps and highlights', 'Enterprise document search and fact-checking grounded in Google Cloud', 'Cost-effective high-concurrency API automation pipelines'],
    pros: ['与安卓及谷歌办公生态数据互通毫无阻碍', '长视频理解能力在业内具备不可替代的优势', 'Flash 系列模型延迟极低，性价比极高'],
    prosEn: ['Frictionless interoperability with Android and Google productivity suite', 'Unrivaled video understanding capabilities in the market', 'Sub-second latency with class-leading price-to-performance ratio'],
    cons: ['中文创意写作的情感色彩偶显机械', '复杂工程级重构代码深度稍逊于专用编程模型'],
    consEn: ['Chinese creative tone can occasionally feel mechanical', 'Complex architectural code refactoring slightly trails specialized models']
  },
  'deepseek': {
    features: ['革新性 MoE 架构与全栈自研推理后训练，综合性能比肩国际闭源旗舰', 'DeepSeek-Coder 专化代码模型，在算法与系统底层优化上表现强劲', '极致的推理定价，推动全球 AI 调用成本步入平民化时代'],
    featuresEn: ['Innovative MoE architecture with advanced post-training reasoning rivaling closed-source flagships', 'Specialized DeepSeek-Coder model excelling in systems and algorithm engineering', 'Radical cost efficiency democratizing global high-end LLM inference'],
    useCases: ['个人开发者与中小团队的核心主力 Copilot 与代码审查伙伴', '企业海量数据清洗、RAG 知识库问答与私有化低成本部署', '理工科高难度数学推导、逻辑论证与算法竞赛刷题'],
    useCasesEn: ['Core everyday Copilot and code review companion for independent developers', 'Enterprise high-volume RAG knowledge retrieval and private self-hosted deployment', 'STEM mathematical derivation, logical theorem proving, and competitive programming'],
    pros: ['同等评测性能下性价比冠绝全行业', '中文语义理解深刻，公文与技术写作极为地道', '开源权重生态繁荣，本地微调与部署极度便捷'],
    prosEn: ['Unbeatable cost-to-intelligence ratio across the entire market', 'Profound nuance in Chinese context and technical literature', 'Thriving open-weights ecosystem with straightforward self-hosting'],
    cons: ['多模态生成管线相对闭源巨头生态仍处于扩展期', '高峰期网页端免费算力偶有排队拥堵'],
    consEn: ['Multimodal pipelines are still expanding compared to legacy giants', 'Peak-hour free web interface occasionally experiences server queuing']
  },
  'perplexity': {
    features: ['AI 驱动的搜索革新体验，所有答案均带有可点击的实时权威引用出处', 'Pro 深度调研模式，多步自主拆解问题并检索数十个异构信息源', '支持自由切换底层推理模型（GPT, Claude, Sonar, DeepSeek）'],
    featuresEn: ['AI-native search engine where every assertion is backed by verifiable web citations', 'Pro Deep Research mode that autonomously decomposes multi-step research queries', 'Ability to seamlessly toggle between frontier underlying models (GPT, Claude, Sonar, DeepSeek)'],
    useCases: ['学术论文文献回溯、行业深度研报起草与背景调查', '消费品购买决策全网横评与避坑指北', '规避大模型“幻觉”的严格事实核查与新闻热点追踪'],
    useCasesEn: ['Academic literature backtracking, industry whitepaper drafting, and diligence', 'Consumer buying decisions, product head-to-head comparisons, and buyer guides', 'Zero-hallucination fact verification and live global breaking news synthesis'],
    pros: ['彻底治愈大模型“一本正经胡说八道”，信息可溯源', '界面极致极简无广告，比传统搜索引擎检索效率提升数倍', '知识库 Space 功能支持团队协作管理内部参考资料'],
    prosEn: ['Solves LLM hallucination through strict source traceability', 'Ad-free, distraction-free interface delivering 10x faster information retrieval', 'Spaces feature enables team-wide document curation and shared knowledge bases'],
    cons: ['不适合用于纯虚构小说创作或长篇开放式情感交流', '高级深度搜索每日免费配额有限'],
    consEn: ['Unsuited for fictional storytelling or unstructured companion chat', 'Limited daily free quota for Pro deep searches']
  },
  'kimi': {
    features: ['3万亿参数级 MoE 大模型架构，专精长上下文语义无损检索与复杂逻辑分析', '超快的文件、网页与跨格式文档秒级极速解析引擎', '内置专业搜索与结构化长篇研报生成助手'],
    featuresEn: ['3-trillion-parameter scale MoE architecture engineered for lossless long-context retrieval', 'High-throughput document and multi-URL real-time parsing engine', 'Built-in research synthesis mode for structured long-form reports'],
    useCases: ['投行与财务分析师多份数百页年报、财报的并排交叉比对', '法律从业者快速提取诉讼卷宗关键条款与证据链条', '科研人员快速通读数十篇同领域前沿英文预印本论文'],
    useCasesEn: ['Cross-analyzing dozens of multi-hundred-page annual and financial reports', 'Extracting critical clauses and evidence chains from legal filings', 'Rapidly skimming and synthesizing dozens of academic arXiv preprints'],
    pros: ['中文超长文本领域经过实战检验的统治级表现', '直接上传大体积 PDF 或网页链接解析速度快且排版完整', '国内直连低延迟，交互体验丝滑'],
    prosEn: ['Proven powerhouse in Chinese ultra-long document comprehension', 'Fast ingestion of large PDFs and URLs with accurate formatting preservation', 'Ultra-low latency domestic connection in China with smooth UX'],
    cons: ['英文语境下的长文本文学性创作稍逊于原生英文模型', '目前暂未内置直接生图与视频编辑能力'],
    consEn: ['English creative prose slightly trails native western models', 'Does not offer native direct image or video generation tools']
  },
  'doubao': {
    features: ['字节跳动自研豆包大模型，多模态交互流畅，响应速度快', '集成智能体创建、音色克隆与丰富生活办公助手角色', '支持桌面端、移动端与浏览器插件跨端无缝协同'],
    featuresEn: ['ByteDance self-developed Doubao model with fluid multimodal interaction and rapid latency', 'Built-in custom agent builder, voice cloning, and daily productivity roles', 'Seamless synchronization across desktop, mobile, and browser extension'],
    useCases: ['日常办公邮件润色、短视频脚本策划与社媒文案生成', '口语对练、外语翻译与知识问答启蒙', '轻量级个人专属 AI 伴侣与自动化任务助手机'],
    useCasesEn: ['Work email drafting, short-form video scripting, and social content generation', 'Spoken language practice, translation, and interactive tutoring', 'Personalized everyday AI companions and lightweight workflow assistants'],
    pros: ['完全免费无门槛，对中文用户极为友好', '语音合成自然度极高，具备极佳的拟人感', '生态工具链更新迅速，功能模块丰富接地气'],
    prosEn: ['Completely free with zero entry barrier for Chinese users', 'Incredibly natural-sounding speech synthesis with human tone', 'Rapidly iterating product ecosystem with highly practical utility'],
    cons: ['处理深层底层编程与复杂系统架构推演能力一般', '对极高精度的企业级严谨学术推理相对有限'],
    consEn: ['Modest performance in low-level engineering and complex system architecture', 'Less specialized for mission-critical rigorous academic tasks']
  },
  'tongyi-qianwen': {
    features: ['阿里云千问 2.5 / 3.0 旗舰开源与商业模型矩阵，支持万亿级参数推理', '文档阅读与长达千万字级别上下文处理能力', '深度融合阿里云企业算力生态与百炼模型服务平台'],
    featuresEn: ['Alibaba Cloud Qwen flagship series supporting trillion-parameter reasoning', 'Massive document reading and multi-million token context parsing', 'Seamless enterprise integration with Alibaba Cloud Bailian AI platform'],
    useCases: ['企业知识管理、政企智能客服与私有数据安全大模型定制', '复杂数据表格自动化汇总、统计公式编写与报表转换', '学术文献多语言互译与专业术语精准释义'],
    useCasesEn: ['Enterprise knowledge bases, intelligent customer service, and private fine-tuning', 'Complex tabular data processing, spreadsheet formula generation, and reporting', 'Multilingual academic translation with high domain accuracy'],
    pros: ['开源社区评测多项榜单领跑，模型泛化与代码能力全面', '在工业制造、商业财经与本土化企业服务中经验深厚', '免费版额度慷慨，企业接入稳定可靠'],
    prosEn: ['Consistently tops international open-source leaderboards across code and math', 'Deep domain expertise in enterprise, financial, and industrial workflows', 'Generous free access with rock-solid enterprise cloud infrastructure'],
    cons: ['消费端品牌营销与大众趣味玩法声量稍弱', '网页端复杂图表可视化交互体验仍有打磨空间'],
    consEn: ['Consumer-facing viral appeal is less prominent than pure consumer apps', 'Web interface data visualization features could be more intuitive']
  },

  // ─── 图像生成与设计 ───
  'midjourney': {
    features: ['V8.2 业界标杆级渲染引擎，原生 2K 分辨率与电影级光影质感', '精准的角色一致性保持 (--cref) 与风格特征迁移 (--sref)', '完善的局部重绘 (Inpainting)、画面外扩 (Zoom/Pan) 与网页端画板'],
    featuresEn: ['V8.2 industry-gold-standard rendering engine with native 2K and cinematic lighting', 'Precise character consistency (--cref) and aesthetic style references (--sref)', 'Full Inpainting, Outpainting (Zoom/Pan), and a modern web canvas interface'],
    useCases: ['高端商业广告视觉海报、电商主图与高端产品概念渲染', '游戏原画设定、影视概念美术与分镜脚本绘制', '建筑空间概念设计、室内软装与时尚服饰灵感探索'],
    useCasesEn: ['High-end advertising key visuals, e-commerce key visuals, and product 3D concepts', 'Video game concept art, film storyboarding, and world-building', 'Architectural conceptual rendering, interior design, and fashion prototyping'],
    pros: ['艺术审美表现力与质感毫无争议位居全网第一梯队', '提示词无需繁琐复杂语法即可生成惊艳杰作', '社群生态成熟，优秀提示词与风格灵感随处可得'],
    prosEn: ['Undisputed industry benchmark for artistic fidelity, texture, and aesthetics', 'Produces jaw-dropping results without requiring complex prompt engineering', 'Vibrant global creative community with abundant inspiration and prompt libraries'],
    cons: ['纯付费服务无免费试用，月费成本对于轻度用户偏高', '对画面中复杂长英文字母与精确排版的渲染偶尔失真'],
    consEn: ['Zero free tier; monthly subscription can be steep for hobbyists', 'Complex typography and dense text rendering can still produce spelling artifacts']
  },
  'stable-diffusion': {
    features: ['100% 开源且可本地私有化部署，数据安全性与隐私保护达到极致', 'ControlNet 深度控制技术，精准指定人物骨骼姿态、线稿上色与构图', '海量开源 LoRA 模型与 Checkpoint，涵盖二次元、真人摄影与 3D 渲染'],
    featuresEn: ['100% open-source and self-hostable for maximum privacy and compliance', 'ControlNet integration for precise pose estimation, lineart coloring, and depth control', 'Vast open-source LoRA and checkpoint ecosystem covering anime, photo-realism, and 3D'],
    useCases: ['电商模特一键换装、无侵权商用背景合成与批量自动化产图', '漫画分镜批量稳定输出与特定主角 IP 形象长期固化', '企业自建专属私有模型资产与本地设计渲染自动化管线'],
    useCasesEn: ['Virtual model apparel replacement, commercial product staging, and batch rendering', 'Consistent comic book panel generation and proprietary IP mascot production', 'Enterprise-grade on-premise generative design and automation pipelines'],
    pros: ['无任何内容审查限制，创作者拥有最高程度的自由裁量权', '完全零软件订阅费用，长期大规模产图成本无限趋近于零', '通过 ComfyUI 可搭建高度工业化、流水线级的全自动工作流'],
    prosEn: ['Completely uncensored creative freedom with absolute local control', 'Zero recurring software licensing fees; zero marginal generation cost locally', 'ComfyUI node-based architecture allows for complex industrial automation'],
    cons: ['本地运行需要高性能专业独立显卡 (推荐 16GB+ 显存)', '安装配置与模型调参门槛高，普通小白学习曲线极其陡峭'],
    consEn: ['Demands high-end local GPU hardware (16GB+ VRAM recommended)', 'Steep learning curve for environment setup, model checkpoints, and parameter tuning']
  },
  'flux': {
    features: ['Black Forest Labs (原 SD 核心团队) 打造的下一代开源与商业图像底座', '突破性的文字渲染能力，可在海报中精准书写任何英文短语与排版', '极高的解剖学准确度，彻底终结手指扭曲与肢体畸变难题'],
    featuresEn: ['Next-gen foundation model by Black Forest Labs (original Stable Diffusion team)', 'Breakthrough typography capabilities rendering accurate text, signage, and logos', 'Unprecedented anatomical precision, virtually eliminating distorted hands and anatomy'],
    useCases: ['带有清晰标语、Logo 和海报排版的商业平面广告设计', '需要极致真实皮肤毛孔与微表情的超写实人像摄影', '作为下一代设计应用与独立工具的底层图像生成 API'],
    useCasesEn: ['Commercial graphic design requiring crisp typography, branding, and layout', 'Hyper-realistic portraiture with authentic skin texture and micro-expressions', 'Underlying image generation engine for modern design platforms and APIs'],
    pros: ['画面真实感逼真到肉眼难辨，摄影级虚化与光学景深极佳', '开源版本与云端 API 双线并进，商业友好度极高', '对复杂提示词遵循度接近 100%'],
    prosEn: ['Indistinguishable photographic realism with authentic optical depth of field', 'Available both as open-weights and cloud APIs with commercial flexibility', 'Near-perfect fidelity in following complex, multi-element prompts'],
    cons: ['本地全量参数运行对算力要求苛刻', '开源微调生态的成熟度仍在快速爬坡积累中'],
    consEn: ['Full-parameter local execution requires hefty compute hardware', 'Fine-tuning tooling and LoRA ecosystem are still actively maturing']
  },
  'ideogram': {
    features: ['专注于图像内文字渲染的先锋工具，支持复杂图文混排与排版设计', '深度优化的风格预设（3D渲染、复古海报、动漫、潮流T恤等）', '智能 Magic Prompt 自动扩充与语义润色能力'],
    featuresEn: ['Pioneer in image typography, effortlessly rendering complex textual layouts', 'Curated artistic presets (3D render, vintage poster, anime, streetwear merch, etc.)', 'Magic Prompt system for automatic prompt expansion and aesthetic tuning'],
    useCases: ['品牌 Logo、徽标、文字文化衫与潮流周边设计', '社交媒体营销海报、活动宣传物料与书籍封面设计', '无需 Photoshop 二次加工的图文直出商业设计'],
    useCasesEn: ['Apparel typography, custom merch, stickers, and brand logo concepts', 'Social media ad creative, event flyers, and book cover design', 'Turnkey ready-to-use graphics without requiring secondary Photoshop editing'],
    pros: ['文字拼写正确率在同类工具中表现卓越', '免费用户每日享有基础生成额度，试错成本低', '设计感极强，色彩搭配天然具备商业落地水准'],
    prosEn: ['Industry-leading text accuracy with minimal spelling blunders', 'Generous daily free tier allowing risk-free experimentation', 'Naturally stylish graphic aesthetic ready for instant commercial deployment'],
    cons: ['在纯自然风景与复杂写实人体摄影方面略逊于 Midjourney', '高级分辨率下载需要付费会员'],
    consEn: ['Photorealistic landscapes and complex human anatomy trail Midjourney slightly', 'High-res exports and private generations require a paid plan']
  },

  // ─── 视频创作 ───
  'veo': {
    features: ['Google DeepMind 顶级电影级视频生成模型，支持 1080P/4K 高清输出', '原生声画同步技术，视频画面与自然环境音效、对话同步生成', '精准镜头机位运动控制（推拉摇移、航拍与环绕运镜）'],
    featuresEn: ['Google DeepMind premier cinematic video model supporting 1080P/4K outputs', 'Native audio-visual synchrony generating synchronized dialogue and ambient soundscapes', 'Cinematic camera trajectory controls (pan, tilt, zoom, dolly, and drone tracking)'],
    useCases: ['高端影视概念视效预览、预告片样片制作与动态故事板', '商业品牌广告 TVC、汽车展演与奢品动态视觉呈现', '短剧与网大高质量转场镜头与微电影创作'],
    useCasesEn: ['High-concept visual previewing, trailer proof-of-concepts, and animatics', 'Commercial brand TVCs, automotive showcases, and luxury dynamic visuals', 'High-production short-form cinematic transitions and narrative film shorts'],
    pros: ['电影级色彩与光影，真实物理动力学运动极少崩溃变形', '镜头时长与动作连贯度大幅超越传统逐帧生成工具', '背靠 Google 算力，云端生成渲染稳定性极佳'],
    prosEn: ['Exceptional cinematic color grading and authentic physical motion dynamics', 'Significantly longer shot durations with temporal coherence throughout', 'Backed by Google TPUs, ensuring enterprise-grade rendering reliability'],
    cons: ['目前仍处于白名单邀请或定向企业服务阶段', '单次渲染消耗算力资源大，生成等待耗时相对较长'],
    consEn: ['Limited availability currently via enterprise waitlist and Google Cloud access', 'Heavy compute consumption results in longer rendering wait times']
  },
  'kling': {
    features: ['快手自研顶级视频大模型，支持文生视频与图生视频长达数分钟连续生成', '首创动作笔刷与骨骼动作捕捉驱动技术，角色动作幅度大且不崩坏', '电影级 1080P 高清画质与复杂光影重构能力'],
    featuresEn: ['Kuaishou self-developed flagship video model generating long, coherent video sequences', 'Pioneering Motion Brush and pose-driven animation handling large, complex body movements', '1080P cinematic resolution with natural lighting and fluid temporal transitions'],
    useCases: ['国风短剧、古装玄幻及现代都市短视频短剧批量制作', '电商静态商品图一键生成动态展示视频与模特换装走秀', '社交媒体爆款特效、舞蹈翻跳与表情包趣味视频生成'],
    useCasesEn: ['Episodic web drama production, historical fantasy, and urban narrative shorts', 'Transforming flat e-commerce product photos into dynamic runway video showcases', 'Viral social media video effects, dance choreography transfer, and creative content'],
    pros: ['大幅度肢体动作连贯性极强，极少出现“多手多脚”失真', '界面操作简便，首尾帧控制与运镜调整功能极为成熟', '对中文文化要素与东方审美特征理解深刻'],
    prosEn: ['Superb handling of fast, expansive body kinematics with minimal deformation', 'Intuitive UI featuring first/last frame pinning and mature camera presets', 'Deep native understanding of Asian aesthetics, cultural nuances, and idioms'],
    cons: ['高峰期云端生成队列排队时间偏长', '免费赠送的日常点数较少，高频创作者需充值订阅'],
    consEn: ['Peak-hour cloud rendering queues can take several minutes', 'Free daily credits deplete quickly for high-frequency creators']
  },
  'runway': {
    features: ['Gen-4.5 旗舰引擎与全新 Media Router 智能模型路由架构', '专业级摄像机运镜控制（Pan, Tilt, Zoom, Roll）与多笔刷运动笔刷', '集成了视频画质增强、慢动作补帧、绿幕抠图与音频音效生成全套套件'],
    featuresEn: ['Gen-4.5 flagship generation with new Media Router smart routing architecture', 'Director-grade camera controls (Pan, Tilt, Zoom, Roll) and multi-region Motion Brush', 'Integrated post-production suite: upscaling, motion smoothing, and in-canvas audio'],
    useCases: ['好莱坞及专业影视工作室视效后期预演与虚拟制片', '音乐 MV、先锋艺术短片与时尚前卫视觉设计', '营销团队快速产出多画幅社媒推广视频'],
    useCasesEn: ['Professional VFX pre-visualization and virtual film production', 'Music videos, avant-garde short films, and high-fashion visual narratives', 'Digital marketing teams producing responsive multi-aspect video ad campaigns'],
    pros: ['影视行业专业用户认可度最高，全流程后期工具链完备', '镜头运动符合真实摄影机光学变焦与平移规律', '支持自定义微调模型，方便品牌统一视觉风格'],
    prosEn: ['Highest credibility among professional film, television, and agency editors', 'Camera trajectories adhere to real-world optical lens focal dynamics', 'Custom voice and style fine-tuning enables brand visual uniformity'],
    cons: ['积分消耗速度极快，长期商业制作成本昂贵', '对于初学者而言各类专业参数设置相对复杂'],
    consEn: ['Credit consumption is rapid, making sustained commercial production expensive', 'Advanced parameter arrays present a learning curve for newcomers']
  },

  // ─── 编程与智能体 ───
  'cursor': {
    features: ['AI 原生全自动编程 IDE，直接基于 VS Code 深度定制，键位与扩展 100% 兼容', 'Cursor Composer 支持跨文件、全代码库级别的自主功能编写与自动重构', 'Cursor Router 自动根据任务难度智能调度最佳推理模型'],
    featuresEn: ['AI-native IDE built directly on VS Code, retaining 100% extension and keybinding compatibility', 'Cursor Composer for multi-file, codebase-wide autonomous feature building and refactoring', 'Cursor Router dynamically selects optimal frontier models based on prompt complexity'],
    useCases: ['从零脚手架极速构建全栈 Web 应用或移动端原型', '接手数十万行无文档遗留代码库，快速梳理逻辑与排查隐蔽 Bug', '将复杂的自然语言产品需求文档直接转换为可运行代码模块'],
    useCasesEn: ['Scaffolding and shipping production-grade full-stack apps and prototypes in hours', 'Navigating massive, undocumented legacy codebases to trace logic and isolate bugs', 'Translating complex PRDs and natural language specs into modular, tested code'],
    pros: ['对全局工程上下文的索引理解极为精准，代码建议不再局限于单文件', 'Tab 键多行预测与内联 Diff 审查交互流畅自然', '支持无缝配置私有 API Key 或企业自建模型'],
    prosEn: ['Pinpoint understanding of whole-repo context; recommendations go far beyond single files', 'Tab multi-line autocomplete and inline diff review are unmatched in responsiveness', 'Flexible support for custom enterprise endpoints and personal API keys'],
    cons: ['深度依赖云端大模型服务，弱网环境下生产力大打折扣', 'Pro 订阅费用按月扣除，过度依赖容易导致基础编码基本功退化'],
    consEn: ['Heavily reliant on cloud inference; offline functionality is severely limited', 'Pro subscription is recurring; potential risk of developer complacency on fundamentals']
  },
  'claude-code': {
    features: ['Anthropic 官方出品的终端原生 Agent，直接运行于开发者的命令行环境中', '具备读写本地文件、执行测试命令、检查 Git 状态并自主排查错误闭环能力', '基于最新的 Claude 3.7 / 3.5 顶尖编码大模型底座'],
    featuresEn: ['Official Anthropic terminal-native coding agent living directly inside the CLI', 'Autonomously edits files, runs test suites, checks git diffs, and self-corrects build errors', 'Powered by frontier Claude 3.7 / 3.5 Sonnet coding intelligence'],
    useCases: ['在终端内自动运行单元测试并修复报错代码，实现无人值守除虫', '大规模项目依赖升级、重构与架构迁移工程', '快速阅读排查服务端后台日志并提出针对性修复补丁'],
    useCasesEn: ['Autonomously executing unit test suites and iteratively fixing failing tests', 'Large-scale repo modernization, dependency upgrades, and code migration', 'Terminal-based log diagnosis and generating surgical pull request patches'],
    pros: ['免去复制粘贴代码的繁琐流程，Agent 直接在项目目录内落地生效', '极高的问题诊断准确率与遵循项目既定代码规范的自觉性', '轻量灵活，无缝集成到现有的 CI/CD 与自动化脚本中'],
    prosEn: ['Eliminates copy-pasting code; changes are executed and verified in-situ', 'Superb diagnosis precision while strictly honoring project coding conventions', 'Lightweight and effortlessly integrable into custom CI/CD terminal workflows'],
    cons: ['依赖终端命令行交互，对不习惯 CLI 的初级开发者有一定心理门槛', '自动执行 Shell 命令时需开发者保持警惕审核权限'],
    consEn: ['Terminal-only workflow presents a barrier for developers reliant on GUIs', 'Requires vigilance when authorizing autonomous terminal script executions']
  },
  'windsurf': {
    features: ['Codeium 推出的革命性 Agentic IDE，引入 Cascade 协同执行引擎', '实时跟踪开发者敲击动作与意图，实现本地编辑与云端智能体无缝合流', '深度的工程上下文感知能力，能够同时调用终端命令与代码树修改'],
    featuresEn: ['Revolutionary Agentic IDE by Codeium powered by the proprietary Cascade engine', 'Real-time developer intent tracking blending local typing with cloud autonomous agency', 'Deep codebase intelligence capable of synchronizing terminal commands with AST modifications'],
    useCases: ['人机协同结对编程，快速实现复杂业务逻辑模块', '自动化生成全覆盖单元测试用例与接口文档', '跨语言工程转换与大型前端框架版本升级'],
    useCasesEn: ['Collaborative pair programming to implement intricate multi-layered business logic', 'Automated generation of comprehensive unit test suites and API documentation', 'Cross-language codebase translation and modern frontend framework migrations'],
    pros: ['Cascade 协同面板交互直观，执行步骤每一步清晰可见可回滚', '免费版额度相较同类产品更为友好，体验极为轻快', '基于 VS Code 生态改造，迁移零成本'],
    prosEn: ['Cascade interface renders every agent reasoning step completely transparent and rollable', 'Generous free tier compared to competitors, with snappy overall performance', 'Frictionless migration path due to native VS Code architecture under the hood'],
    cons: ['高峰时期云端模型响应存在微小延迟', '高级自动化工具链自定义配置选项相对 Cursor 稍少'],
    consEn: ['Slight latency during peak cloud inference demand', 'Fewer granular advanced configuration knobs compared to mature Cursor tooling']
  },
  'v0': {
    features: ['Vercel 打造的生成式 UI 设计神器，直接基于 Tailwind CSS 和 React/Next.js 产出生产级前端', '支持设计稿截图一键还原为像素级响应式代码', '内置即时预览与在线沙盒，支持一键复制代码或推送至 GitHub/CodeSandbox'],
    featuresEn: ['Generative UI platform by Vercel producing production-ready Tailwind CSS & React/Next.js code', 'Screenshot-to-code capability translating visual wireframes into responsive layouts', 'Live interactive sandbox preview with 1-click code copying and GitHub integration'],
    useCases: ['产品经理与独立全栈开发者极速构建高保真前端原型', '复杂数据大屏、SaaS 仪表盘与管理后台页面的批量生成', '将 Figma 或草图快速转化为符合现代工程规范的干净组件'],
    useCasesEn: ['Product managers and full-stack devs building high-fidelity interactive prototypes in minutes', 'Rapid layout of complex SaaS dashboards, analytics grids, and admin panels', 'Turning Figma screen mocks or sketches into clean, maintainable modular code'],
    pros: ['生成的代码结构极其优雅，完全符合 Vercel 现代前端最佳实践', '支持通过对话多轮迭代微调局部组件与交互细节', '无需任何复杂的本地前端环境配置，浏览器即开即用'],
    prosEn: ['Generated code is remarkably clean and adheres to modern React/Tailwind best practices', 'Supports conversational multi-turn refinement for pinpoint UI styling adjustments', 'Zero local tooling setup required; 100% cloud-based instant feedback'],
    cons: ['主要专精于前端 UI 与展示层，后端数据库与复杂业务逻辑需自填', '免费版生成次数有限，商业深度定制需购买高级配额'],
    consEn: ['Specialized strictly in frontend UI/UX; backend business logic must be written manually', 'Free generation quota is limited for extensive design exploration']
  },

  // ─── 效率与研究 ───
  'notebooklm': {
    features: ['以用户专属资料为核心的纯真实溯源 AI 知识库，坚决不编造事实', '革命性的 Audio Overview 播客生成功能，将枯燥论文转化为生动双人对谈音频', '深度整合 Google Gemini 最新推理技术，支持代码分析与多文档关联挖掘'],
    featuresEn: ['Source-grounded research notebook with zero hallucination beyond uploaded sources', 'Revolutionary Audio Overview transforming dry documents into engaging two-host podcasts', 'Grounded in Google Gemini with advanced code analysis and cross-document synthesis'],
    useCases: ['学生与科研人员快速消化数十篇专业学术论文与教材章节', '企业团队构建专属产品说明书、培训文档与内部政策答疑中枢', '内容创作者将长篇研究报告一键转录为生动播客音频直接发布'],
    useCasesEn: ['Students and academics digesting dozens of technical journals and textbook chapters', 'Enterprises building private product manuals, onboarding wikis, and policy Q&A', 'Podcasters and creators turning dense research papers into ready-to-air spoken podcasts'],
    pros: ['回答中的每一句话都附带原文档行号引用，完全免除核查烦恼', '音频对谈生动自然、呼吸起伏极度拟真，堪称 AI 语音交互奇迹', '免费使用，支持上传多种格式 (PDF, Google Docs, 网页, YouTube 视频)'],
    prosEn: ['Every single claim is directly annotated with exact source citations for instant verification', 'Mind-bogglingly natural conversational podcast audio with breath pauses and banter', '100% free to use, accepting PDFs, Google Docs, raw text, and YouTube URLs'],
    cons: ['无法回答脱离所上传资料之外的通用开放式常识问题', '对于单次上传资料总容量与文件数量仍有上限限制'],
    consEn: ['Strictly restricted to provided sources; cannot answer generic external trivia', 'Imposes total file size and count thresholds per notebook workspace']
  },
  'gamma': {
    features: ['AI 驱动的下一代幻灯片与网页排版引擎，一句话生成成套精美 PPT', '摆脱传统幻灯片古板尺寸限制，支持卡片式自适应流式排版与嵌套多媒体', '支持一键快速切换全套设计主题、配色方案与排版字体'],
    featuresEn: ['Next-generation AI presentation builder creating complete polished decks from single prompts', 'Breaks free from rigid 16:9 slide constraints with adaptive responsive web cards', 'One-click global aesthetic transformation across color palettes, fonts, and card styling'],
    useCases: ['初创团队商业计划书 (BP)、融资路演与产品发布会宣讲材料制作', '职场人季度总结汇报、项目立项评审与技术方案分享', '在线课程教学讲义、知识科普长图文与互动微网站制作'],
    useCasesEn: ['Startup pitch decks, investor presentations, and executive roadshows', 'Quarterly business reviews, project proposals, and technical briefing decks', 'Online course lectures, interactive long-form knowledge cards, and microsites'],
    pros: ['几分钟内即可搞定传统制作需要半天的排版与配图工作', '生成的幻灯片支持像网页一样直接分享互动链接，且自适应手机端阅读', '内置大量现代科技感版式，彻底告别粗制滥造的模板拼凑感'],
    prosEn: ['Compresses half a day of slide drafting and image hunting into under 3 minutes', 'Shares as responsive interactive web links looking immaculate on mobile devices', 'Sleek, contemporary layouts that eliminate the dated feel of generic PowerPoint templates'],
    cons: ['深度定制极其复杂的专属企业品牌规范时灵活度不如传统 PPT', '导出为 PDF 或 PPTX 格式时部分交互动效会降级为静态内容'],
    consEn: ['Fine-grained pixel-level tweaking is less flexible than raw PowerPoint canvas', 'Exporting to PDF or offline PPTX flattens interactive dynamic web widgets']
  },
  'suno': {
    features: ['输入文字歌词或风格描述，秒级生成包含人声演唱与完整配器的专业级单曲', '支持流行、摇滚、爵士、电子、古典、嘻哈等数十种全球主流音乐流派', 'v4 引擎大幅提升人声咬字清晰度、编曲层次感与动态范围'],
    featuresEn: ['Generate full radio-ready songs with vocals and instrumentation from simple text prompts', 'Vast musical repertoire spanning Pop, Rock, EDM, Jazz, Orchestral, Hip-Hop, and more', 'v4 audio engine dramatically elevating lyrical pronunciation clarity and dynamic range'],
    useCases: ['短视频博主、影视剪辑师与广告制作人快速生成无版权纠纷的原声配乐 (BGM)', '音乐人快速验证编曲灵感、旋律动机与歌词小样 (Demo)', '普通用户为生日、节日、婚礼等纪念日定制独一无二的专属主题歌曲'],
    useCasesEn: ['Content creators, indie filmmakers, and marketers generating royalty-free custom soundtracks', 'Songwriters generating quick arrangement demos, melody hooks, and musical motifs', 'Everyday users composing customized personalized songs for birthdays, weddings, and celebrations'],
    pros: ['人声表现力震撼，真假音转换、唱腔颤音极度拟真', '操作零乐理门槛，人人都能成为拥有顶级乐队的“金牌制作人”', '支持对已有歌曲进行续写延展、风格替换与自定义歌词填词'],
    prosEn: ['Astounding vocal emotion with believable vibrato, breath control, and stylistic range', 'Requires zero music theory knowledge to produce professional-grade tracks', 'Robust feature set for extending song sections, swapping genres, and custom lyric writing'],
    cons: ['偶尔会出现歌词漏字或由于语速过快产生的含糊发音', '免费生成曲目仅供非商用，商业授权需付费订阅会员'],
    consEn: ['Occasional lyrical slurring or missed phrases on rapid vocal tempos', 'Free tier creations are strictly non-commercial; monetization requires active subscription']
  },
  'elevenlabs': {
    features: ['全球顶尖 AI 语音合成与超逼真克隆平台，细腻还原人类呼吸、叹气与情感起伏', '支持跨 30+ 种语言的自然发音与母语级口音转换', '独家 AI 声音设计器，支持通过文字描述凭空创造全新音色'],
    featuresEn: ['World-class AI voice synthesis and cloning capturing human breath, pauses, and emotional nuances', 'Flawless pronunciation and localized native accents across 30+ international languages', 'Voice Design studio allowing users to synthesize completely novel character voices from text prompts'],
    useCases: ['有声书朗诵、纪录片旁白配音与播客内容自动化生产', '出海营销视频多语言本地化配音与自动唇形同步 (Dubbing)', '游戏 NPC、虚拟主播与交互式 AI Agent 实时语音对话'],
    useCasesEn: ['Audiobook narration, documentary voiceovers, and automated podcast publishing', 'Multilingual global marketing localization with synchronized automated dubbing', 'Interactive video game NPC voicing, virtual streamers, and real-time agent speech'],
    pros: ['目前全行业情感最丰富、最难分辨真伪的语音合成天花板', '仅需几十秒清晰音频样本即可实现高保真度的克隆声音', '提供低延迟流式 API，完美契合实时人机通话场景'],
    prosEn: ['Unrivaled emotional depth and human authenticity, setting the global TTS benchmark', 'High-fidelity voice cloning achievable from just 30-60 seconds of clean reference audio', 'Low-latency streaming API tailored perfectly for real-time conversational agents'],
    cons: ['按字符配额计费，大规模有声书制作成本需要精打细算', '克隆他人音色具有严格的合规与反欺诈安全审核机制'],
    consEn: ['Character-based usage meters require careful budget planning on massive projects', 'Strict identity verification and anti-spoofing policies govern custom voice cloning']
  }
};

/**
 * 为任意未在专属评测池中的长尾工具提供智能且结构化的专家选型建议
 * 确保全站 100% 的页面具备实质性独特附加价值，杜绝被判定为 Thin Content
 */
export function getToolRichData(tool: AiTool): RichData {
  if (RICH_CONTENT_MAP[tool.id]) {
    return RICH_CONTENT_MAP[tool.id];
  }

  const tagStr = tool.tags.join('、');
  const tagStrEn = tool.tagsEn.join(', ');

  return {
    features: [
      `深度聚焦于 ${tool.category} 细分赛道，具备完善的针对性功能模块`,
      `专注于 ${tagStr} 相关技术与业务场景的效能优化`,
      `提供简洁直观的操作流，降低传统业务流中的重复劳动与学习成本`
    ],
    featuresEn: [
      `Specialized tool in the ${tool.category} domain with targeted functional features`,
      `Optimized specifically for ${tagStrEn} workflows and use cases`,
      `Intuitive user interface designed to minimize repetitive overhead and learning friction`
    ],
    useCases: [
      `需要针对 ${tool.name} 专长领域进行针对性生产力提效的专业人士`,
      `日常任务涉及 ${tagStr} 并寻求轻量化、高响应解决方案的用户`,
      `探索在现有工作流程中低成本整合 AI 辅助能力的团队`
    ],
    useCasesEn: [
      `Professionals looking for specialized efficiency boosts in ${tool.category}`,
      `Users seeking reliable, streamlined solutions for ${tagStrEn}`,
      `Teams exploring cost-effective AI integration into their existing operational stack`
    ],
    pros: [
      `垂类场景适配度高，专注解决单一核心痛点`,
      `无需复杂冗余的学习成本，开箱即用体验良好`,
      tool.isFree ? '完全免费开放，零试错成本' : '具备清晰的阶梯定价或试用模式，适合按需选用'
    ],
    prosEn: [
      `High domain specialization focused on solving core workflow pain points`,
      `Straightforward onboarding with minimal cognitive overhead`,
      tool.isFree ? 'Completely free with zero adoption barrier' : 'Clear tiered pricing or trial options for flexible adoption'
    ],
    cons: [
      `相较全能型基座模型，在跨领域综合泛化能力上相对垂直单一`,
      `部分高阶协作或专属定制功能需依赖网络环境或高级版本支持`
    ],
    consEn: [
      `More domain-specialized compared to general-purpose foundation models`,
      `Advanced collaboration features may depend on network connectivity or premium plans`
    ]
  };
}
