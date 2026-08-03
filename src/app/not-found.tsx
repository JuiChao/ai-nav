'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from '@/components/LocalizedLink';
import { useLocale, LocaleProvider } from '@/i18n/LocaleContext';
import Header, { Footer } from '@/components/Header';
import { AI_TOOLS } from '@/data/tools';
import './[locale]/tool/[id]/tool-detail.css';

function NotFoundContent() {
  const { locale, t } = useLocale();
  const isEn = locale === 'en';

  const popularTools = AI_TOOLS.filter((t) => t.isFeatured).slice(0, 4);

  return (
    <div className="app">
      <Header totalCount={AI_TOOLS.length} />
      
      <main className="tool-detail">
        <div className="tool-detail__container">
          <div className="tool-detail__card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{t('notFound.title')}</h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
              {t('notFound.description')}
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: 'var(--color-text)',
                color: 'var(--color-bg)',
                borderRadius: '8px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              {t('notFound.backHome')}
            </Link>
          </div>

          {popularTools.length > 0 && (
            <section className="tool-detail__related">
              <h2>{t('notFound.popular')}</h2>
              <div className="tool-detail__related-grid">
                {popularTools.map((tool) => (
                  <Link key={tool.id} href={`/tool/${tool.id}`} className="tool-detail__related-card">
                    <span className="tool-detail__related-icon">{tool.icon}</span>
                    <div>
                      <h3>{isEn && tool.nameEn ? tool.nameEn : tool.name}</h3>
                      <p>{isEn && tool.descriptionEn ? tool.descriptionEn : tool.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/**
 * 自定义 404 页面
 * 降低跳出率，引导用户回到有价值的页面
 */
export default function NotFound() {
  const pathname = usePathname();
  const [detectedLocale, setDetectedLocale] = useState<'zh' | 'en'>('zh');

  useEffect(() => {
    if (pathname && pathname.startsWith('/en')) {
      setDetectedLocale('en');
    }
  }, [pathname]);

  return (
    <html lang={detectedLocale === 'en' ? 'en' : 'zh-CN'}>
      <head>
        <title>{detectedLocale === 'en' ? 'Page Not Found - AI Nav' : '页面未找到 - AI 导航'}</title>
        <meta name="description" content={detectedLocale === 'en' ? 'The page you are looking for does not exist.' : '您寻找的页面不存在。'} />
      </head>
      <body>
        <LocaleProvider initialLocale={detectedLocale}>
          <NotFoundContent />
        </LocaleProvider>
      </body>
    </html>
  );
}
