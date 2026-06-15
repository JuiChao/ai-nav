import type { Metadata } from 'next';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import { LocaleProvider } from '@/i18n/LocaleContext';
import GoogleAdSenseScript from '@/components/google-adsense-script';
import './globals.css';

/**
 * 使用 next/font 加载 Inter 和 Noto Sans SC 字体
 * NOTE: 双字体方案确保中英文都有最佳呈现
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto',
});

/** 全站默认 SEO 元数据 */
export const metadata: Metadata = {
  title: {
    default: 'AI 导航 - 发现最好用的 AI 工具',
    template: '%s | AI 导航',
  },
  description:
    'AI 导航 - 精选优质 AI 工具导航站，涵盖对话、图像、视频、音频、编程、写作等领域，帮你快速发现最好用的 AI 工具。',
  keywords: ['AI工具', '人工智能', 'ChatGPT', 'Midjourney', 'AI导航', 'AI工具大全'],
  openGraph: {
    title: 'AI 导航 - 发现最好用的 AI 工具',
    description: '精选收录各领域优质 AI 工具，一站式探索 AI 的无限可能。',
    type: 'website',
  },
  icons: {
    icon: '/favicon.svg',
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
    <html lang="zh-CN" className={`${inter.variable} ${notoSansSC.variable}`} data-scroll-behavior="smooth">
      <body>
        <GoogleAdSenseScript />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
