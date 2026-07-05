'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';
import Header, { Footer } from '@/components/Header';
import { AI_TOOLS } from '@/data/tools';
import './tool/[id]/tool-detail.css';

/**
 * 自定义 404 页面
 * 降低跳出率，引导用户回到有价值的页面
 */
export default function NotFound() {
  const { t } = useLocale();

  // 展示热门工具作为引导
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
                      <h3>{tool.name}</h3>
                      <p>{tool.description}</p>
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
