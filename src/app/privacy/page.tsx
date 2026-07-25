import type { Metadata } from 'next';
import PrivacyContent from './privacy-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export const metadata: Metadata = {
  title: '隐私政策 - Privacy Policy | AI 导航',
  description: '了解 AI 导航 (958000.xyz) 如何收集、使用和保护您的个人数据。包含 Cookie 和 Google AdSense 广告政策说明。',
  alternates: { canonical: `${siteUrl}/privacy` },
  openGraph: {
    title: '隐私政策 - Privacy Policy | AI 导航',
    description: '了解 AI 导航如何保护您的个人数据。',
    url: `${siteUrl}/privacy`,
    type: 'website',
    siteName: 'AI 导航',
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
