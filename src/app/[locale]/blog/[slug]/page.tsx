import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BLOG_POSTS } from '@/data/blog';
import BlogPostContent from './blog-post-content';
import { TRANSLATIONS } from '@/i18n/translations';
import type { Locale } from '@/i18n/translations';

export const dynamic = 'force-static';
export const dynamicParams = false;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  const locales = ['zh', 'en'];
  
  for (const locale of locales) {
    for (const post of BLOG_POSTS) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const isEn = locale === 'en';

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = isEn && post.titleEn ? post.titleEn : post.title;
  const summary = isEn && post.summaryEn ? post.summaryEn : post.summary;

  return {
    title: `${title} | ${isEn ? 'AI Nav Blog' : 'AI 导航博客'}`,
    description: summary,
    alternates: {
      canonical: `${siteUrl}/${locale}/blog/${post.slug}`,
      languages: {
        'zh-CN': `${siteUrl}/zh/blog/${post.slug}`,
        'en': `${siteUrl}/en/blog/${post.slug}`,
      }
    },
    openGraph: {
      title,
      description: summary,
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      type: 'article',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const isEn = locale === 'en';

  if (!post) {
    notFound();
  }

  const title = isEn && post.titleEn ? post.titleEn : post.title;
  const summary = isEn && post.summaryEn ? post.summaryEn : post.summary;
  
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
      {
        '@type': 'ListItem',
        position: 3,
        name: title,
        item: `${siteUrl}/${locale}/blog/${post.slug}`,
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: summary,
    author: {
      '@type': 'Organization',
      name: post.author || 'AI Nav Editorial Team',
    },
    datePublished: post.date,
    url: `${siteUrl}/${locale}/blog/${post.slug}`,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>
      <BlogPostContent post={post} />
    </>
  );
}
