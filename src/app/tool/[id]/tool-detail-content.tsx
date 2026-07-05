'use client';

import Link from 'next/link';
import { ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import type { AiTool } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import Header, { Footer } from '@/components/Header';
import './tool-detail.css';

interface ToolDetailContentProps {
  tool: AiTool;
  categoryName: string;
  categoryId: string;
  relatedTools: AiTool[];
}

export default function ToolDetailContent({ tool, categoryName, categoryId, relatedTools }: ToolDetailContentProps) {
  const { locale, t } = useLocale();

  const displayName = (locale === 'en' && tool.nameEn) ? tool.nameEn : tool.name;
  const description = locale === 'en' ? tool.descriptionEn : tool.description;
  const tags = locale === 'en' ? tool.tagsEn : tool.tags;

  return (
    <div className="app">
      <Header totalCount={0} />

      <main className="tool-detail">
        <div className="tool-detail__container">

          {/* 面包屑导航 */}
          <nav className="tool-detail__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{t('tool.breadcrumb.home')}</Link>
            <ChevronRight size={14} />
            <span>{categoryName}</span>
            <ChevronRight size={14} />
            <span aria-current="page">{displayName}</span>
          </nav>

          <div className="tool-detail__card">
            <div className="tool-detail__header">
              <div className="tool-detail__icon-wrapper">
                <span className="tool-detail__icon" role="img" aria-label={displayName}>
                  {tool.icon}
                </span>
              </div>
              <div className="tool-detail__title-section">
                <h1 className="tool-detail__title">{displayName}</h1>
                <div className="tool-detail__meta">
                  <span className="tool-detail__category">{categoryName}</span>
                  <div className="tool-detail__badges">
                    {tool.isFree && <span className="tool-card__badge tool-card__badge--free">{t('tool.free')}</span>}
                    {!tool.isFree && tool.hasFreeTrial && (
                      <span className="tool-card__badge tool-card__badge--trial">{t('tool.freeTrial')}</span>
                    )}
                    {tool.isFeatured && (
                      <span className="tool-card__badge tool-card__badge--hot">{t('tool.featured')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="tool-detail__content">
              <section>
                <h2>{t('tool.about')}</h2>
                <p className="tool-detail__description">{description}</p>
                {/* SEO 内容增强：自动生成基于标签的补充文字 */}
                <p className="tool-detail__seo-text">
                  {displayName} {t('tool.seoText', { tags: tags.join('、') })}
                </p>
              </section>
              
              <section className="tool-detail__tags-section">
                <h3>{t('tool.tags')}</h3>
                <div className="tool-detail__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="tool-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </section>

              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="tool-detail__cta"
              >
                <span>{t('tool.visit')}</span>
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

          {/* 相关推荐 - 内部链接网络 */}
          {relatedTools.length > 0 && (
            <section className="tool-detail__related">
              <h2>{t('tool.related')}</h2>
              <div className="tool-detail__related-grid">
                {relatedTools.map((rt) => {
                  const rtName = (locale === 'en' && rt.nameEn) ? rt.nameEn : rt.name;
                  const rtDesc = locale === 'en' ? rt.descriptionEn : rt.description;
                  return (
                    <Link key={rt.id} href={`/tool/${rt.id}`} className="tool-detail__related-card">
                      <span className="tool-detail__related-icon">{rt.icon}</span>
                      <div>
                        <h3>{rtName}</h3>
                        <p>{rtDesc}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <Link href="/" className="tool-detail__back">
            <ArrowLeft size={16} />
            <span>{t('tool.back')}</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
