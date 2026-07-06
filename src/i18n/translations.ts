/**
 * UI 文案翻译字典
 * 集中管理所有界面文案的中英翻译
 */

export type Locale = 'zh' | 'en';

type TranslationDict = Record<string, string>;

const zh: TranslationDict = {
  // Header & Nav
  'header.title': 'AI Nav',
  'header.subtitle': '发现 {count}+ 款优质 AI 工具',
  'nav.product': '产品',
  'nav.blog': '博客',
  'nav.join': '加入我们',
  'nav.about': '关于',
  'nav.navProductItem': 'AI 导航站',

  // Hero
  'hero.title': 'AI Navigation',
  'hero.subtitle': '精选全网最热门的 AI 工具，覆盖对话、绘画、视频、编程等领域，一站发现无限可能。',
  'hero.terminalCmd': 'npm install -g @ai-nav/cli',

  // Stats
  'stats.tools': 'AI 工具',
  'stats.categories': '工具分类',
  'stats.featured': '热门推荐',

  // Search
  'search.placeholder': '输入关键词搜索 AI 工具...',
  'search.resultCount': '找到 {count} 个工具',
  'search.clear': '清除搜索',

  // Tool Card
  'tool.free': '免费',
  'tool.freeTrial': '免费试用',
  'tool.featured': '热门',

  // Tool Grid
  'grid.featured.title': '🔥 热门推荐',
  'grid.featured.subtitle': '最受欢迎的 AI 工具精选',
  'grid.all.title': '全部工具',
  'grid.all.subtitle': '探索全部收录的 AI 工具',
  'grid.filtered.count': '共 {count} 个工具',
  'grid.empty.title': '未找到匹配的工具',
  'grid.empty.description': '试试其他关键词或切换分类',

  // Tool Detail
  'tool.back': '返回首页',
  'tool.about': '关于',
  'tool.tags': '标签',
  'tool.visit': '直达官网',
  'tool.related': '相关推荐',
  'tool.breadcrumb.home': '首页',
  'tool.seoText': '是一款备受关注的 AI 工具，核心特色包括 {tags} 等。适合希望提升效率的用户探索使用。',

  // 404
  'notFound.title': '页面未找到',
  'notFound.description': '您访问的页面不存在或已被移除。',
  'notFound.backHome': '返回首页',
  'notFound.popular': '热门工具推荐',

  // Footer
  'footer.copyright': 'Copyright © 2026 AI Nav. All Rights Reserved.',
  'footer.agreement': '服务协议',
  'footer.privacy': '隐私政策',
  'footer.cookie': 'Cookie 偏好设置',

  // Ads
  'ad.cta': '了解更多',
  'ad.label': '赞助商广告',
  'ad.sidebarLabel': '赞助商链接',
  'ad.sidebarCta': '立即前往',
  'google.ad.placeholder': 'Google 广告位 (未配置 Publisher ID)',
  'google.ad.dev_mode': '开发模式占位符 (Slot ID: {slot})',
};

const en: TranslationDict = {
  // Header & Nav
  'header.title': 'AI Nav',
  'header.subtitle': 'Discover {count}+ Quality AI Tools',
  'nav.product': 'Products',
  'nav.blog': 'Blog',
  'nav.join': 'Join Us',
  'nav.about': 'About',
  'nav.navProductItem': 'AI Nav Station',

  // Hero
  'hero.title': 'AI Navigation',
  'hero.subtitle': 'Curated collection of the best AI tools across chat, art, video, coding and more — explore the future in one place.',
  'hero.terminalCmd': 'npm install -g @ai-nav/cli',

  // Stats
  'stats.tools': 'AI Tools',
  'stats.categories': 'Categories',
  'stats.featured': 'Featured',

  // Search
  'search.placeholder': 'Search AI tools, features or tags...',
  'search.resultCount': '{count} tools found',
  'search.clear': 'Clear',

  // Tool Card
  'tool.free': 'Free',
  'tool.freeTrial': 'Free Trial',
  'tool.featured': 'Hot',

  // Tool Grid
  'grid.featured.title': '🔥 Featured Tools',
  'grid.featured.subtitle': 'Most popular AI tools',
  'grid.all.title': 'All Tools',
  'grid.all.subtitle': 'Explore all curated AI tools',
  'grid.filtered.count': '{count} tools',
  'grid.empty.title': 'No tools found',
  'grid.empty.description': 'Try other keywords or change category',

  // Tool Detail
  'tool.back': 'Back to Home',
  'tool.about': 'About',
  'tool.tags': 'Tags',
  'tool.visit': 'Visit Website',
  'tool.related': 'Related Tools',
  'tool.breadcrumb.home': 'Home',
  'tool.seoText': 'is a highly regarded AI tool, with key features including {tags}. Ideal for users looking to boost productivity.',

  // 404
  'notFound.title': 'Page Not Found',
  'notFound.description': 'The page you are looking for does not exist or has been removed.',
  'notFound.backHome': 'Back to Home',
  'notFound.popular': 'Popular Tools',

  // Footer
  'footer.copyright': 'Copyright © 2026 AI Nav. All Rights Reserved.',
  'footer.agreement': 'Terms of Service',
  'footer.privacy': 'Privacy Policy',
  'footer.cookie': 'Cookie Preferences',

  // Ads
  'ad.cta': 'Learn More',
  'ad.label': 'Sponsored Ad',
  'ad.sidebarLabel': 'Sponsored Links',
  'ad.sidebarCta': 'Go Now',
  'google.ad.placeholder': 'Google AdSense (Publisher ID not configured)',
  'google.ad.dev_mode': 'Dev Mode Placeholder (Slot ID: {slot})',
};

export const TRANSLATIONS: Record<Locale, TranslationDict> = { zh, en };
