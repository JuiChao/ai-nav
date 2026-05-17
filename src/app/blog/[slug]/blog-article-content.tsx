'use client';

import Header, { Footer } from '@/components/Header';
import BlogArticle from '@/components/BlogArticle';
import type { BilingualBlogPost } from '@/lib/blog';
import { AI_TOOLS } from '@/data/tools';

interface BlogArticleContentProps {
  post: BilingualBlogPost;
}

/**
 * 博客文章详情页客户端壳组件
 * 包裹 Header/Footer 和 BlogArticle，提供页面结构
 */
function BlogArticleContent({ post }: BlogArticleContentProps) {
  return (
    <div className="app">
      <Header totalCount={AI_TOOLS.length} />
      <BlogArticle post={post} />
      <Footer />
    </div>
  );
}

export default BlogArticleContent;
