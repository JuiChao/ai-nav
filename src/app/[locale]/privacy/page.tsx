import type { Metadata } from 'next';
import PrivacyContent from './privacy-content';
import type { Locale } from '@/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'Privacy Policy | AI Nav' : '隐私政策 - Privacy Policy | AI 导航',
    description: isEn 
      ? 'Learn how AI Nav collects, uses, and protects your personal data. Includes our Cookie and AdSense policies.' 
      : '了解 AI 导航 (958000.xyz) 如何收集、使用和保护您的个人数据。包含 Cookie 和 Google AdSense 广告政策说明。',
    alternates: { 
      canonical: `${siteUrl}/${locale}/privacy`,
      languages: {
        'zh-CN': `${siteUrl}/zh/privacy`,
        'en': `${siteUrl}/en/privacy`,
      }
    },
    openGraph: {
      title: isEn ? 'Privacy Policy - AI Nav' : '隐私政策 - Privacy Policy | AI 导航',
      description: isEn ? 'Learn how AI Nav protects your data.' : '了解 AI 导航如何保护您的个人数据。',
      url: `${siteUrl}/${locale}/privacy`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
    },
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
