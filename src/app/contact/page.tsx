import type { Metadata } from 'next';
import ContactContent from './contact-content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export const metadata: Metadata = {
  title: '联系我们 - Contact Us | AI 导航',
  description: '联系 AI 导航团队：提交 AI 工具、广告合作、一般咨询。Email: admin@958000.xyz',
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: '联系我们 - Contact | AI 导航',
    description: '联系 AI 导航团队：提交工具、广告合作、咨询。',
    url: `${siteUrl}/contact`,
    type: 'website',
    siteName: 'AI 导航',
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
