import type { Metadata } from 'next';
import CompareContent from './compare-content';

export const dynamic = 'force-static';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';

export function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  const title = isEn 
    ? 'Frontier AI Model Matrix & Pricing Comparison 2026 | AI Nav' 
    : '2026 全球主流 AI 大模型核心参数、跑分与定价全景横评 | AI 导航';
  const description = isEn
    ? 'Interactive comparison matrix of 2026 frontier AI models (OpenAI o3/GPT-5, Claude 4.5, Gemini 3.5/3.6, DeepSeek V4/R2, Llama 4, Qwen 3, Kimi K3, Grok 3/4). Filter by context window, token economics, coding benchmarks, and multimodal trade-offs.'
    : '2026 年最新前沿 AI 大模型全景横向参数对比工具。实时对比 OpenAI o3/GPT-5、Claude 4.5、Gemini 3.5/3.6、DeepSeek V4/R2、Llama 4、Qwen 3、Kimi K3 等顶尖基座模型的上下文窗口、API 定价、逻辑推理、代码能力与多模态优缺点。';

  return {
    title,
    description,
    keywords: [
      '大模型对比', 'AI模型横评', '大模型价格对比', '上下文窗口', 'OpenAI o3', 'GPT-5', 'Claude 4.5', 'Gemini 3.5', 'DeepSeek V4', 'Llama 4', 'Qwen 3', 'Kimi K3',
      'AI model comparison', 'LLM benchmark matrix', 'LLM pricing', 'token cost', 'DeepSeek V4', 'Claude 4.5', 'GPT-5', 'o3',
    ],
    alternates: {
      canonical: `${siteUrl}/${locale}/compare/`,
      languages: {
        'zh-CN': `${siteUrl}/zh/compare/`,
        'en': `${siteUrl}/en/compare/`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/compare/`,
      type: 'website',
      siteName: isEn ? 'AI Nav' : 'AI 导航',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <CompareContent locale={locale} />;
}
