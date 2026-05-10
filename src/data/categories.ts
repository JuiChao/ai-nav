import type { Category } from '../types';

/**
 * AI 工具分类列表
 * 每个分类包含唯一 ID、中英文名称、图标标识和简短描述
 */
export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: '全部工具',
    nameEn: 'All Tools',
    icon: 'grid',
    description: '浏览全部 AI 工具',
    descriptionEn: 'Browse all AI tools',
  },
  {
    id: 'chatbot',
    name: 'AI 对话',
    nameEn: 'AI Chat',
    icon: 'message-circle',
    description: '智能对话与问答助手',
    descriptionEn: 'Smart conversation & Q&A assistants',
  },
  {
    id: 'image',
    name: '图像生成',
    nameEn: 'Image',
    icon: 'image',
    description: 'AI 图像生成与编辑',
    descriptionEn: 'AI image generation & editing',
  },
  {
    id: 'video',
    name: '视频创作',
    nameEn: 'Video',
    icon: 'video',
    description: 'AI 视频生成与编辑',
    descriptionEn: 'AI video generation & editing',
  },
  {
    id: 'audio',
    name: '音频处理',
    nameEn: 'Audio',
    icon: 'headphones',
    description: 'AI 语音合成与音频处理',
    descriptionEn: 'AI speech synthesis & audio processing',
  },
  {
    id: 'writing',
    name: '写作助手',
    nameEn: 'Writing',
    icon: 'pen-tool',
    description: 'AI 写作与文案生成',
    descriptionEn: 'AI writing & copywriting',
  },
  {
    id: 'coding',
    name: '编程开发',
    nameEn: 'Coding',
    icon: 'code',
    description: 'AI 编程辅助与代码生成',
    descriptionEn: 'AI coding assistants & code generation',
  },
  {
    id: 'productivity',
    name: '效率工具',
    nameEn: 'Productivity',
    icon: 'zap',
    description: '提升工作效率的 AI 工具',
    descriptionEn: 'AI tools to boost productivity',
  },
  {
    id: 'design',
    name: 'UI/UX 设计',
    nameEn: 'Design',
    icon: 'palette',
    description: 'AI 设计与创意工具',
    descriptionEn: 'AI design & creative tools',
  },
  {
    id: 'data',
    name: '数据分析',
    nameEn: 'Data',
    icon: 'bar-chart-3',
    description: 'AI 数据分析与可视化',
    descriptionEn: 'AI data analysis & visualization',
  },
];
