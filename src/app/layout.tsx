import type { Metadata } from 'next';
import { LocaleProvider } from '@/i18n/LocaleContext';
import GoogleAdSenseScript from '@/components/google-adsense-script';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

/** 全站默认 SEO 元数据 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'AI 导航 - Best AI Tools Directory | 发现最好用的 AI 工具',
    template: '%s | AI 导航',
  },
  description:
    'AI 导航 - 精选 79+ 款优质 AI 工具导航站，涵盖 ChatGPT、Claude、Midjourney、Suno 等热门 AI 工具。覆盖对话、图像、视频、音频、编程、写作等领域，帮你快速发现最好用的 AI 工具。Best curated AI tools directory.',
  keywords: [
    'AI工具', 'AI工具大全', 'AI导航', '人工智能',
    'ChatGPT', 'Claude', 'Midjourney', 'Gemini',
    'AI tools', 'AI directory', 'best AI tools',
    'AI写作', 'AI绘画', 'AI视频', 'AI编程',
  ],
  openGraph: {
    title: 'AI 导航 - 发现最好用的 AI 工具',
    description: '精选收录 79+ 款各领域优质 AI 工具，一站式探索 AI 的无限可能。',
    type: 'website',
    url: siteUrl,
    siteName: 'AI 导航 | AI Nav',
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
    title: 'AI 导航 - 发现最好用的 AI 工具',
    description: '精选收录 79+ 款各领域优质 AI 工具，一站式探索 AI 的无限可能。',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
};

/**
 * 根布局
 * 包裹 LocaleProvider，为全站提供多语言能力
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'AI 导航',
              alternateName: 'AI Nav',
              url: siteUrl,
              description: '精选优质 AI 工具导航站，涵盖对话、图像、视频、音频、编程、写作等领域。',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: `${siteUrl}/?q={search_term_string}`,
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'AI 工具大全',
              description: '收录 79+ 款精选 AI 工具，涵盖对话、图像、视频、编程等 9 大类别。',
              url: siteUrl,
              isPartOf: {
                '@type': 'WebSite',
                name: 'AI 导航',
                url: siteUrl,
              },
            }),
          }}
        />
      </head>
      <body>
        <GoogleAdSenseScript />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
