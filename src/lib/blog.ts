import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

/**
 * 博客文章的结构化类型
 * frontmatter 来自 Markdown 文件头部的 YAML 元数据
 */
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  date: string;
  author: string;
  category: string;
  /** 文章图标 emoji */
  icon: string;
  /** 阅读时间（分钟），根据字数自动估算 */
  readTime: number;
  /** Markdown 正文内容（不含 frontmatter） */
  content: string;
}

/**
 * 双语博客文章结构
 * 合并中英文 Markdown 的数据，用于列表展示和详情渲染
 */
export interface BilingualBlogPost {
  slug: string;
  /** 中文标题 */
  title: string;
  /** 英文标题 */
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: string;
  categoryEn: string;
  date: string;
  icon: string;
  readTime: number;
  readTimeEn: number;
  /** 中文正文 */
  content: string;
  /** 英文正文 */
  contentEn: string;
}

const BLOG_DIR = path.join(process.cwd(), 'blog');

/**
 * 估算文章阅读时间
 * 中文按 400 字/分钟，英文按 200 词/分钟
 */
function estimateReadTime(content: string, locale: 'zh' | 'en'): number {
  if (locale === 'zh') {
    // 中文：统计字符数（排除空白和标点）
    const charCount = content.replace(/[\s\p{P}]/gu, '').length;
    return Math.max(1, Math.ceil(charCount / 400));
  }
  // 英文：统计单词数
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * 从文件名推断 slug
 * 例如：01-chatgpt-complete-guide-2026.md → chatgpt-complete-guide-2026
 * NOTE: 去掉序号前缀（如 01-），保留有意义的 URL 部分
 */
function filenameToSlug(filename: string): string {
  const base = filename.replace(/\.md$/, '');
  return base.replace(/^\d+-/, '');
}

/**
 * 文章图标映射
 * HACK: Markdown frontmatter 不便存储 emoji，这里根据文件名匹配
 * 后续可以在 frontmatter 中添加 icon 字段来替代
 */
const ICON_MAP: Record<string, string> = {
  'chatgpt-complete-guide-2026': '🤖',
  'deepseek-china-open-source-ai': '🔬',
  'ai-image-generation-comparison-2026': '🎨',
  'ai-coding-tools-comparison-2026': '💻',
  'ai-video-generation-comparison-2026': '🎬',
};

/**
 * 读取单个 Markdown 文件，解析 frontmatter 和正文
 */
function readMarkdownFile(filePath: string, locale: 'zh' | 'en'): BlogPost {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const filename = path.basename(filePath);
  const slug = filenameToSlug(filename);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    keywords: data.keywords || [],
    date: data.date || '',
    author: data.author || '',
    category: data.category || '',
    icon: ICON_MAP[slug] || '📄',
    readTime: estimateReadTime(content, locale),
    content,
  };
}

/**
 * 获取所有双语博客文章列表
 * 以中文目录为基准，匹配对应的英文文件
 */
export function getAllBlogPosts(): BilingualBlogPost[] {
  const zhDir = path.join(BLOG_DIR, 'zh');
  const enDir = path.join(BLOG_DIR, 'en');

  if (!fs.existsSync(zhDir)) return [];

  const zhFiles = fs.readdirSync(zhDir)
    .filter((f) => f.endsWith('.md'))
    .sort();

  return zhFiles.map((filename) => {
    const zhPost = readMarkdownFile(path.join(zhDir, filename), 'zh');
    const enFilePath = path.join(enDir, filename);
    const enPost = fs.existsSync(enFilePath)
      ? readMarkdownFile(enFilePath, 'en')
      : null;

    return {
      slug: zhPost.slug,
      title: zhPost.title,
      titleEn: enPost?.title || zhPost.title,
      description: zhPost.description,
      descriptionEn: enPost?.description || zhPost.description,
      category: zhPost.category,
      categoryEn: enPost?.category || zhPost.category,
      date: zhPost.date,
      icon: zhPost.icon,
      readTime: zhPost.readTime,
      readTimeEn: enPost?.readTime || zhPost.readTime,
      content: zhPost.content,
      contentEn: enPost?.content || zhPost.content,
    };
  });
}

/**
 * 根据 slug 获取单篇双语文章
 * 用于文章详情页的 generateStaticParams 和页面渲染
 */
export function getBlogPostBySlug(slug: string): BilingualBlogPost | null {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

/**
 * 获取所有文章的 slug 列表
 * 用于 Next.js generateStaticParams 静态生成
 */
export function getAllBlogSlugs(): string[] {
  const zhDir = path.join(BLOG_DIR, 'zh');
  if (!fs.existsSync(zhDir)) return [];

  return fs.readdirSync(zhDir)
    .filter((f) => f.endsWith('.md'))
    .map(filenameToSlug);
}
