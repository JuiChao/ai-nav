import type { Metadata } from 'next';
import AboutContent from './about-content';
import type { Locale } from '@/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'About Us | AI Nav' : '关于我们 - About Us | AI 导航',
    description: isEn 
      ? 'AI Nav is your premier platform for discovering the best AI tools. Learn about our mission and team.' 
      : 'AI 导航是您发现最佳人工智能工具的首选平台。了解我们的使命、愿景与团队。',
    alternates: { 
      canonical: `${siteUrl}/${locale}/about/`,
      languages: {
        'zh-CN': `${siteUrl}/zh/about/`,
        'en': `${siteUrl}/en/about/`,
      }
    },
    openGraph: {
      title: isEn ? 'About AI Nav' : '关于 AI 导航 - About AI Nav',
      description: isEn ? 'Discover the best AI tools with AI Nav.' : 'AI 导航是您发现最佳人工智能工具的首选平台。',
      url: `${siteUrl}/${locale}/about/`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
