import type { Metadata } from 'next';
import { LocaleProvider } from '@/i18n/LocaleContext';
import GoogleAdSenseScript from '@/components/google-adsense-script';
import type { Locale } from '@/i18n/translations';
import '../globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: isEn ? 'AI Nav - Best AI Tools Directory' : 'AI 导航 - Best AI Tools Directory | 发现最好用的 AI 工具',
      template: isEn ? '%s | AI Nav' : '%s | AI 导航',
    },
    description: isEn 
      ? 'Discover 79+ curated AI tools including ChatGPT, Claude, Midjourney, and more.' 
      : 'AI 导航 - 精选 79+ 款优质 AI 工具导航站，涵盖 ChatGPT、Claude、Midjourney、Suno 等热门 AI 工具。覆盖对话、图像、视频、音频、编程、写作等领域，帮你快速发现最好用的 AI 工具。Best curated AI tools directory.',
    keywords: [
      'AI工具', 'AI工具大全', 'AI导航', '人工智能',
      'ChatGPT', 'Claude', 'Midjourney', 'Gemini',
      'AI tools', 'AI directory', 'best AI tools',
      'AI写作', 'AI绘画', 'AI视频', 'AI编程',
    ],
    openGraph: {
      title: isEn ? 'AI Nav - Best AI Tools Directory' : 'AI 导航 - 发现最好用的 AI 工具',
      description: isEn ? 'Discover 79+ curated AI tools.' : '精选收录 79+ 款各领域优质 AI 工具，一站式探索 AI 的无限可能。',
      type: 'website',
      url: `${siteUrl}/${locale}/`,
      siteName: isEn ? 'AI Nav' : 'AI 导航 | AI Nav',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'AI 导航 - Best AI Tools Directory',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEn ? 'AI Nav - Best AI Tools Directory' : 'AI 导航 - 发现最好用的 AI 工具',
      description: isEn ? 'Discover 79+ curated AI tools.' : '精选收录 79+ 款各领域优质 AI 工具，一站式探索 AI 的无限可能。',
      images: ['/og-image.png'],
      creator: '@jui_chao',
      site: '@jui_chao',
    },
    alternates: {
      canonical: `${siteUrl}/${locale}/`,
      languages: {
        'zh-CN': `${siteUrl}/zh/`,
        'en': `${siteUrl}/en/`,
      },
    },
    icons: {
      icon: '/favicon.svg',
      apple: '/favicon.svg',
    },
    generator: 'Next.js',
    applicationName: isEn ? 'AI Nav' : 'AI 导航',
    appleWebApp: {
      title: isEn ? 'AI Nav' : 'AI 导航',
      statusBarStyle: 'default',
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  return (
    <html lang={locale === 'en' ? 'en' : 'zh-CN'} data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: locale === 'en' ? 'AI Nav' : 'AI 导航',
              alternateName: locale === 'en' ? 'AI Navigation' : 'AI Nav',
              url: `${siteUrl}/${locale}`,
              description: locale === 'en' ? 'Curated AI Tools Directory' : '精选优质 AI 工具导航站，涵盖对话、图像、视频、音频、编程、写作等领域。',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/${locale}/?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body>
        <GoogleAdSenseScript />
        <LocaleProvider initialLocale={typedLocale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
