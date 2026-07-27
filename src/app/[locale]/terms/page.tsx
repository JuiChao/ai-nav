import type { Metadata } from 'next';
import TermsContent from './terms-content';
import type { Locale } from '@/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'Terms of Service | AI Nav' : '服务条款 - Terms of Service | AI 导航',
    description: isEn 
      ? 'Terms of Service for AI Nav (958000.xyz), including usage conditions, intellectual property, and disclaimers.' 
      : 'AI 导航 (958000.xyz) 的服务条款，包括使用条件、知识产权、免责声明等。',
    alternates: { 
      canonical: `${siteUrl}/${locale}/terms`,
      languages: {
        'zh-CN': `${siteUrl}/zh/terms`,
        'en': `${siteUrl}/en/terms`,
      }
    },
    openGraph: {
      title: isEn ? 'Terms of Service - AI Nav' : '服务条款 - Terms of Service | AI 导航',
      description: isEn ? 'AI Nav Terms of Service and usage conditions.' : 'AI 导航的服务条款与使用条件。',
      url: `${siteUrl}/${locale}/terms`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
    },
  };
}

export default function TermsPage() {
  return <TermsContent />;
}
