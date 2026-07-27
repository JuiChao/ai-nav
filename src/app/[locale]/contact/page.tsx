import type { Metadata } from 'next';
import ContactContent from './contact-content';
import type { Locale } from '@/i18n/translations';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn ? 'Contact Us | AI Nav' : '联系我们 - Contact Us | AI 导航',
    description: isEn 
      ? 'Contact the AI Nav team for tool submissions, advertising, or general inquiries. Email: admin@958000.xyz' 
      : '联系 AI 导航团队：提交 AI 工具、广告合作、一般咨询。Email: admin@958000.xyz',
    alternates: { 
      canonical: `${siteUrl}/${locale}/contact`,
      languages: {
        'zh-CN': `${siteUrl}/zh/contact`,
        'en': `${siteUrl}/en/contact`,
      }
    },
    openGraph: {
      title: isEn ? 'Contact AI Nav' : '联系我们 - Contact | AI 导航',
      description: isEn ? 'Contact the AI Nav team.' : '联系 AI 导航团队：提交工具、广告合作、咨询。',
      url: `${siteUrl}/${locale}/contact`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
