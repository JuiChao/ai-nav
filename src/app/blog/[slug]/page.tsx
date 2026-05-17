import type { Metadata } from 'next';
import { getAllBlogSlugs, getBlogPostBySlug } from '@/lib/blog';
import BlogArticleContent from './blog-article-content';
import { notFound } from 'next/navigation';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 静态生成所有博客文章路由
 * Next.js 静态导出模式下必须预生成所有动态路由
 */
export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * 为每篇文章生成独立的 SEO 元数据
 * NOTE: 使用中文标题和描述作为默认，搜索引擎会根据 hreflang 选择语言
 */
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: '文章未找到' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

/**
 * 博客文章详情页（服务端组件）
 * 在构建时读取 Markdown 文章内容，传递给客户端组件渲染
 */
export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticleContent post={post} />;
}
