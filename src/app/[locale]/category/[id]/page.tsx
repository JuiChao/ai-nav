import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/data/categories';
import HomePageContent from '@/app/[locale]/home-page-content';
import type { Locale } from '@/i18n/translations';

export const dynamic = 'force-static';
export const dynamicParams = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

// 静态生成所有分类路由
export function generateStaticParams() {
  const params: { locale: string; id: string }[] = [];
  const locales = ['zh', 'en'];
  
  for (const locale of locales) {
    for (const category of CATEGORIES) {
      params.push({ locale, id: category.id });
    }
  }
  return params;
}

// 动态生成每个分类页面的专属 SEO Meta 标签
export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);
  const isEn = locale === 'en';
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const categoryName = isEn ? category.nameEn : category.name;
  const title = isEn ? `${categoryName} - Discover Best AI Tools | AI Nav` : `${categoryName} - 发现最新最热的 AI 工具 | AI 导航`;
  const description = isEn ? `Explore the best curated ${categoryName} AI tools.` : `精选全网最热门的 ${categoryName} AI 工具。探索并发现提升效率与创造力的最新 ${categoryName} 平台与应用。`;
  
  return {
    title,
    description,
    keywords: [categoryName, isEn ? 'AI tools' : 'AI工具', isEn ? 'AI Nav' : 'AI导航', category.nameEn, '人工智能'],
    alternates: {
      canonical: `${siteUrl}/${locale}/category/${category.id}/`,
      languages: {
        'zh-CN': `${siteUrl}/zh/category/${category.id}/`,
        'en': `${siteUrl}/en/category/${category.id}/`,
      }
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/category/${category.id}/`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);

  if (!category) {
    notFound();
  }

  return (
    <>
      <HomePageContent initialCategory={id} />
    </>
  );
}
