import type { Metadata } from 'next';
import AboutContent from './about-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export const metadata: Metadata = {
  title: '关于我们 - About Us | AI 导航',
  description: 'AI 导航是您发现最佳人工智能工具的首选平台。了解我们的使命、愿景与团队。',
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: '关于 AI 导航 - About AI Nav',
    description: 'AI 导航是您发现最佳人工智能工具的首选平台。',
    url: `${siteUrl}/about`,
    type: 'website',
    siteName: 'AI 导航',
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
