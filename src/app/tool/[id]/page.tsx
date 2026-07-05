import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AI_TOOLS } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';
import ToolDetailContent from './tool-detail-content';

export const dynamic = 'force-static';
export const dynamicParams = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

// 静态生成所有工具详情页路由
export function generateStaticParams() {
  return AI_TOOLS.map((tool) => ({
    id: tool.id,
  }));
}

// 动态生成每个页面的专属 SEO Meta 标签
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const tool = AI_TOOLS.find((t) => t.id === id);
  
  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  const category = CATEGORIES.find((c) => c.id === tool.category);
  const categoryName = category?.name ?? 'AI 工具';
  
  return {
    title: `${tool.name} - ${categoryName}`,
    description: `${tool.name} - ${tool.description}。${tool.isFree ? '免费使用。' : ''}了解详情、功能特色和使用方式。`,
    keywords: [...tool.tags, tool.name, categoryName, 'AI工具', 'AI导航'],
    alternates: {
      canonical: `${siteUrl}/tool/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} - ${tool.description}`,
      description: `${tool.description}。标签：${tool.tags.join('、')}`,
      url: `${siteUrl}/tool/${tool.id}`,
      type: 'article',
      siteName: 'AI 导航',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} | AI 导航`,
      description: tool.description,
      images: ['/og-image.png'],
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = AI_TOOLS.find((t) => t.id === id);

  if (!tool) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.id === tool.category);
  const categoryName = category?.name ?? 'AI 工具';

  // 获取同分类的相关工具（排除自身，最多取 4 个）
  const relatedTools = AI_TOOLS
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  // SoftwareApplication 结构化数据
  const appSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    url: tool.url,
    offers: {
      '@type': 'Offer',
      price: tool.isFree ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
    },
  };

  // BreadcrumbList 结构化数据
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `${siteUrl}/#category-${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: tool.name,
        item: `${siteUrl}/tool/${tool.id}`,
      },
    ],
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <ToolDetailContent
        tool={tool}
        categoryName={categoryName}
        categoryId={tool.category}
        relatedTools={relatedTools}
      />
    </>
  );
}
