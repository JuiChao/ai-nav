import type { Metadata } from 'next';
import BlogIndexContent from './blog-index-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export const metadata: Metadata = {
  title: 'AI 资讯与深度指南 - Blog | AI 导航',
  description: '探索关于人工智能的深度文章、行业趋势与实用工程指南。AI Nav 博客为您带来最新的 AI 行业洞察。',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: 'AI 资讯与深度指南 - AI Nav Blog',
    description: '探索关于人工智能的深度文章、行业趋势与实用工程指南。',
    url: `${siteUrl}/blog`,
    type: 'website',
    siteName: 'AI 导航',
  },
};

export default function BlogPage() {
  return <BlogIndexContent />;
}
