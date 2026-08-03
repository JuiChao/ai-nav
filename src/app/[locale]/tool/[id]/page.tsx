import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AI_TOOLS } from '@/data/tools';
import { CATEGORIES } from '@/data/categories';
import ToolDetailContent from './tool-detail-content';
import { TRANSLATIONS } from '@/i18n/translations';
import type { Locale } from '@/i18n/translations';

export const dynamic = 'force-static';
export const dynamicParams = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

// 静态生成所有工具详情页路由
export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  const locales = ['zh', 'en'];
  
  for (const locale of locales) {
    for (const tool of AI_TOOLS) {
      params.push({ locale, id: tool.id });
    }
  }
  return params;
}

// 动态生成每个页面的专属 SEO Meta 标签
export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const tool = AI_TOOLS.find((t) => t.id === id);
  const isEn = locale === 'en';
  
  if (!tool) {
    return { title: 'Tool Not Found' };
  }

  const category = CATEGORIES.find((c) => c.id === tool.category);
  const categoryName = isEn ? category?.nameEn : category?.name;
  const toolName = isEn && tool.nameEn ? tool.nameEn : tool.name;
  const toolDesc = isEn && tool.descriptionEn ? tool.descriptionEn : tool.description;
  const freeText = tool.isFree ? (isEn ? 'Free to use.' : '免费使用。') : '';
  const descSuffix = isEn ? 'Learn about features and pricing.' : '了解详情、功能特色和使用方式。';
  
  return {
    title: `${toolName} - ${categoryName ?? 'AI Tools'}`,
    description: `${toolName} - ${toolDesc}. ${freeText} ${descSuffix}`,
    keywords: [...tool.tags, toolName, categoryName ?? 'AI', isEn ? 'AI tools' : 'AI工具'],
    alternates: {
      canonical: `${siteUrl}/${locale}/tool/${tool.id}`,
      languages: {
        'zh-CN': `${siteUrl}/zh/tool/${tool.id}`,
        'en': `${siteUrl}/en/tool/${tool.id}`,
      }
    },
    openGraph: {
      title: `${toolName} - ${toolDesc}`,
      description: `${toolDesc}`,
      url: `${siteUrl}/${locale}/tool/${tool.id}`,
      type: 'article',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${toolName} | ${isEn ? 'AI Nav' : 'AI 导航'}`,
      description: toolDesc,
      images: ['/og-image.png'],
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  const tool = AI_TOOLS.find((t) => t.id === id);
  const isEn = locale === 'en';

  if (!tool) {
    notFound();
  }

  const category = CATEGORIES.find((c) => c.id === tool.category);
  const categoryName = (isEn ? category?.nameEn : category?.name) ?? 'AI 工具';
  const toolName = isEn && tool.nameEn ? tool.nameEn : tool.name;
  const toolDesc = isEn && tool.descriptionEn ? tool.descriptionEn : tool.description;

  // 获取同分类的相关工具（排除自身，最多取 4 个）
  const relatedTools = AI_TOOLS
    .filter((t) => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  // SoftwareApplication 结构化数据
  const appSchema: any = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: toolName,
    description: toolDesc,
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    url: tool.url,
  };

  if (tool.isFree) {
    appSchema.offers = {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/OnlineOnly',
    };
  }

  const homeLabel = TRANSLATIONS[locale as Locale]['tool.breadcrumb.home'] || 'Home';

  // BreadcrumbList 结构化数据
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${siteUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: categoryName,
        item: `${siteUrl}/${locale}/category/${tool.category}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: `${siteUrl}/${locale}/tool/${tool.id}`,
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
