import HomePageContent from './home-page-content';

/**
 * 首页（服务端组件）
 * 渲染 AI 导航主页面
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';
  
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: locale === 'en' ? 'AI Tools Directory' : 'AI 工具大全',
    description: locale === 'en' ? 'Curated AI tools directory.' : '精选优质 AI 工具导航站',
    url: `${siteUrl}/${locale}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: locale === 'en' ? 'What is this site?' : '这个网站是做什么的？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'en' ? 'This is a curated directory of the best AI tools.' : '这是一个精选优质 AI 工具的导航网站。',
        },
      },
      {
        '@type': 'Question',
        name: locale === 'en' ? 'Are these tools free?' : '这些工具免费吗？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: locale === 'en' ? 'Many are free or offer free trials, which we indicate on each tool.' : '许多工具是免费的或提供免费试用，我们会在每个工具中注明。',
        },
      },
    ],
  };

  return (
    <>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </head>
      <HomePageContent />
    </>
  );
}
