import { MetadataRoute } from 'next';
import { AI_TOOLS } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];

  // 为每个工具添加一条 sitemap 记录
  AI_TOOLS.forEach((tool) => {
    routes.push({
      url: `${baseUrl}/tool/${tool.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  });
  // 为每个分类添加一条 sitemap 记录
  CATEGORIES.forEach((category) => {
    routes.push({
      url: `${baseUrl}/category/${category.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });
  });

  return routes;
}
