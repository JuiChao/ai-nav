/**
 * UI 文案翻译字典
 * 集中管理所有界面文案的中英翻译，组件通过 t(key) 获取当前语言对应文案
 */

export type Locale = 'zh' | 'en';

/** 翻译字典结构 */
type TranslationDict = Record<string, string>;

const zh: TranslationDict = {
  // Header
  'header.title': 'AI 导航',
  'header.subtitle': '发现 {count}+ 款优质 AI 工具',
  'header.langSwitch': 'EN',

  // Hero
  'hero.badge': '每周更新 · 精选 AI 工具导航',
  'hero.title.line1': '发现最好用的',
  'hero.title.line2': 'AI 工具',
  'hero.description': '精心收录各领域优质 AI 工具，帮你快速找到提升效率的最佳方案。从对话助手到视频创作，一站式探索 AI 的无限可能。',

  // Stats
  'stats.tools': 'AI 工具',
  'stats.categories': '工具分类',
  'stats.featured': '热门推荐',

  // Search
  'search.placeholder': '搜索 AI 工具、功能或标签...',
  'search.resultCount': '找到 {count} 个工具',
  'search.clear': '清除搜索',

  // Tool Card
  'tool.free': '免费',
  'tool.freeTrial': '免费试用',
  'tool.featured': '🔥 热门',

  // Tool Grid
  'grid.featured.title': '🔥 热门推荐',
  'grid.featured.subtitle': '最受欢迎的 AI 工具精选',
  'grid.all.title': '全部工具',
  'grid.all.subtitle': '探索全部收录的 AI 工具',
  'grid.filtered.count': '共 {count} 个工具',
  'grid.empty.title': '未找到匹配的工具',
  'grid.empty.description': '试试其他关键词或切换分类',

  // Ad
  'ad.cta': '了解更多',
  'ad.label': '广告',
  'ad.sidebarLabel': '推广',
  'ad.sidebarCta': '了解详情',

  // Footer
  'footer.copyright': 'AI 导航 © 2026',
  'footer.slogan': '收录优质 AI 工具，助你高效工作',
};

const en: TranslationDict = {
  // Header
  'header.title': 'AI Nav',
  'header.subtitle': 'Discover {count}+ Quality AI Tools',
  'header.langSwitch': '中文',

  // Hero
  'hero.badge': 'Updated Weekly · Curated AI Tool Directory',
  'hero.title.line1': 'Discover the Best',
  'hero.title.line2': 'AI Tools',
  'hero.description': 'A curated collection of top AI tools across all domains. Find the perfect solution to boost your productivity — from chatbots to video creation, explore the limitless possibilities of AI.',

  // Stats
  'stats.tools': 'AI Tools',
  'stats.categories': 'Categories',
  'stats.featured': 'Featured',

  // Search
  'search.placeholder': 'Search AI tools, features or tags...',
  'search.resultCount': '{count} tools found',
  'search.clear': 'Clear search',

  // Tool Card
  'tool.free': 'Free',
  'tool.freeTrial': 'Free Trial',
  'tool.featured': '🔥 Hot',

  // Tool Grid
  'grid.featured.title': '🔥 Featured',
  'grid.featured.subtitle': 'Most popular AI tools',
  'grid.all.title': 'All Tools',
  'grid.all.subtitle': 'Explore our full collection of AI tools',
  'grid.filtered.count': '{count} tools',
  'grid.empty.title': 'No tools found',
  'grid.empty.description': 'Try different keywords or categories',

  // Ad
  'ad.cta': 'Learn More',
  'ad.label': 'Ad',
  'ad.sidebarLabel': 'Sponsored',
  'ad.sidebarCta': 'Learn More',

  // Footer
  'footer.copyright': 'AI Nav © 2026',
  'footer.slogan': 'Curated AI tools to boost your productivity',
};

export const TRANSLATIONS: Record<Locale, TranslationDict> = { zh, en };
