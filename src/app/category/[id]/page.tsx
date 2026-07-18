import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CATEGORIES } from '@/data/categories';
import HomePageContent from '@/app/home-page-content';

export const dynamic = 'force-static';
export const dynamicParams = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

// 静态生成所有分类路由
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    id: category.id,
  }));
}

// 动态生成每个分类页面的专属 SEO Meta 标签
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const category = CATEGORIES.find((c) => c.id === id);
  
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const categoryName = category.name;
  const title = `${categoryName} - 发现最新最热的 AI 工具 | AI 导航`;
  const description = `精选全网最热门的 ${categoryName} AI 工具。探索并发现提升效率与创造力的最新 ${categoryName} 平台与应用。`;
  
  return {
    title,
    description,
    keywords: [categoryName, 'AI工具', 'AI导航', category.nameEn, '人工智能'],
    alternates: {
      canonical: `${siteUrl}/category/${category.id}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/category/${category.id}`,
      type: 'website',
      siteName: 'AI 导航',
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

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
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
