import type { Metadata } from 'next';
import TermsContent from './terms-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export const metadata: Metadata = {
  title: '服务条款 - Terms of Service | AI 导航',
  description: 'AI 导航 (958000.xyz) 的服务条款，包括使用条件、知识产权、免责声明等。',
  alternates: { canonical: `${siteUrl}/terms` },
  openGraph: {
    title: '服务条款 - Terms of Service | AI 导航',
    description: 'AI 导航的服务条款与使用条件。',
    url: `${siteUrl}/terms`,
    type: 'website',
    siteName: 'AI 导航',
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
