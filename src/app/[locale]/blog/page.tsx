import type { Metadata } from 'next';
import BlogIndexContent from './blog-index-content';
import { TRANSLATIONS } from '@/i18n/translations';
import type { Locale } from '@/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'AI Insights & Guides - Blog | AI Nav' : 'AI 资讯与深度指南 - Blog | AI 导航',
    description: isEn 
      ? 'Explore in-depth articles, industry trends, and practical engineering guides about artificial intelligence.' 
      : '探索关于人工智能的深度文章、行业趋势与实用工程指南。AI Nav 博客为您带来最新的 AI 行业洞察。',
    alternates: { 
      canonical: `${siteUrl}/${locale}/blog`,
      languages: {
        'zh-CN': `${siteUrl}/zh/blog`,
        'en': `${siteUrl}/en/blog`,
      }
    },
    openGraph: {
      title: isEn ? 'AI Insights & Guides - AI Nav Blog' : 'AI 资讯与深度指南 - AI Nav Blog',
      description: isEn ? 'Explore in-depth articles, industry trends, and practical engineering guides.' : '探索关于人工智能的深度文章、行业趋势与实用工程指南。',
      url: `${siteUrl}/${locale}/blog`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const homeLabel = TRANSLATIONS[locale as Locale]['tool.breadcrumb.home'] || 'Home';
  const blogLabel = TRANSLATIONS[locale as Locale]['nav.blog'] || 'Blog';

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
        name: blogLabel,
        item: `${siteUrl}/${locale}/blog`,
      },
    ],
  };

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === 'en' ? 'AI Nav Blog' : 'AI 导航博客',
    description: locale === 'en' ? 'Explore in-depth articles about artificial intelligence.' : '探索关于人工智能的深度文章与工程指南。',
    url: `${siteUrl}/${locale}/blog`,
  };

  return (
    <>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
        />
      </head>
      <BlogIndexContent />
    </>
  );
}
