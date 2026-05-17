import { getAllBlogPosts } from '@/lib/blog';
import HomePageContent from './home-page-content';

/**
 * 首页（服务端组件）
 * 在构建时读取博客文章 Markdown 数据，传递给客户端组件渲染
 */
export default function HomePage() {
  const blogPosts = getAllBlogPosts();

  return <HomePageContent blogPosts={blogPosts} />;
}
