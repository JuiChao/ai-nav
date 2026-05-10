/**
 * AI 工具导航网站的核心类型定义
 */

/** 支持的语言 */
export type Locale = 'zh' | 'en';

/** AI 工具数据结构 */
export interface AiTool {
  id: string;
  name: string;
  /** 英文名称（仅中国工具需要，国际工具中英文名一致可省略） */
  nameEn?: string;
  description: string;
  /** 英文描述 */
  descriptionEn: string;
  url: string;
  icon: string;
  category: CategoryId;
  tags: string[];
  /** 英文标签 */
  tagsEn: string[];
  /** 是否免费 */
  isFree: boolean;
  /** 是否有免费试用 */
  hasFreeTrial?: boolean;
  /** 是否热门推荐 */
  isFeatured?: boolean;
}

/** 工具分类 ID */
export type CategoryId =
  | 'all'
  | 'chatbot'
  | 'image'
  | 'video'
  | 'audio'
  | 'writing'
  | 'coding'
  | 'productivity'
  | 'design'
  | 'data';

/** 分类信息 */
export interface Category {
  id: CategoryId;
  name: string;
  /** 英文分类名 */
  nameEn: string;
  icon: string;
  description: string;
  /** 英文描述 */
  descriptionEn: string;
}

/** 广告位数据 */
export interface AdSlot {
  id: string;
  position: 'banner' | 'sidebar' | 'inline';
  title: string;
  /** 英文标题 */
  titleEn: string;
  description: string;
  /** 英文描述 */
  descriptionEn: string;
  imageUrl?: string;
  linkUrl: string;
  sponsor: string;
  /** 英文赞助商名 */
  sponsorEn: string;
}
