import type { AdSlot } from '../types';

/**
 * 广告位示例数据
 * 实际项目中应从广告后台动态加载
 */
export const AD_SLOTS: AdSlot[] = [
  {
    id: 'banner-top',
    position: 'banner',
    title: '🚀 探索 AI 新时代',
    titleEn: '🚀 Explore the AI Era',
    description: '使用我们的企业 AI 解决方案，提升 10 倍工作效率。立即免费试用！',
    descriptionEn: 'Boost your productivity 10x with our enterprise AI solutions. Try it free!',
    linkUrl: '#',
    sponsor: '示例广告商',
    sponsorEn: 'Sample Advertiser',
  },
  {
    id: 'sidebar-1',
    position: 'sidebar',
    title: '📢 广告位招租',
    titleEn: '📢 Ad Space Available',
    description: '在这里展示您的 AI 产品，精准触达 AI 爱好者和专业人士。',
    descriptionEn: 'Showcase your AI product here. Reach AI enthusiasts and professionals.',
    linkUrl: '#',
    sponsor: '联系我们投放广告',
    sponsorEn: 'Contact Us for Ads',
  },
  {
    id: 'sidebar-2',
    position: 'sidebar',
    title: '🎓 AI 课程推荐',
    titleEn: '🎓 AI Courses',
    description: '零基础入门 AI，从 ChatGPT 到 Stable Diffusion 全面掌握 AI 工具。',
    descriptionEn: 'Learn AI from scratch — master ChatGPT, Stable Diffusion, and more.',
    linkUrl: '#',
    sponsor: 'AI 学院',
    sponsorEn: 'AI Academy',
  },
  {
    id: 'inline-1',
    position: 'inline',
    title: '💼 AI 人才招聘',
    titleEn: '💼 AI Talent Hiring',
    description: '正在寻找 AI 工程师？在这里发布您的职位，覆盖百万 AI 从业者。',
    descriptionEn: 'Looking for AI engineers? Post your openings here and reach millions.',
    linkUrl: '#',
    sponsor: 'AI 招聘平台',
    sponsorEn: 'AI Jobs Platform',
  },
];
