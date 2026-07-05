import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AI_TOOLS } from '@/data/tools';
import ToolDetailContent from './tool-detail-content';

export const dynamic = 'force-static';
export const dynamicParams = false;

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
    return {
      title: 'Tool Not Found | AI Nav',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';
  
  return {
    title: `${tool.name} - ${tool.description} | AI Nav`,
    description: tool.description,
    keywords: [...tool.tags, tool.name, 'AI工具', 'AI Navigation'],
    alternates: {
      canonical: `${siteUrl}/tool/${tool.id}`,
    },
    openGraph: {
      title: `${tool.name} | AI Nav`,
      description: tool.description,
      url: `${siteUrl}/tool/${tool.id}`,
      type: 'article',
    }
  };
}

export default async function ToolPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = AI_TOOLS.find((t) => t.id === id);

  if (!tool) {
    notFound();
  }

  // 为每个工具单独生成深度的 JSON-LD 结构化数据
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    url: tool.url,
    offers: {
      '@type': 'Offer',
      price: tool.isFree ? '0' : (tool.hasFreeTrial ? '0' : 'Contact'),
      priceCurrency: 'USD',
    },
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <ToolDetailContent tool={tool} />
    </>
  );
}
