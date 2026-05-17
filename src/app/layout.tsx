import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LocaleProvider } from '@/i18n/LocaleContext';
import './globals.css';

/**
 * 使用 next/font 加载 Inter 字体
 * NOTE: 替代原 CSS @import 方式，避免 FOUT（无样式文本闪烁）
 */
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
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
    <html lang="zh-CN" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
