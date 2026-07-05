'use client';

import Link from 'next/link';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import type { AiTool } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import Header, { Footer } from '@/components/Header';
import './tool-detail.css';

interface ToolDetailContentProps {
  tool: AiTool;
}

export default function ToolDetailContent({ tool }: ToolDetailContentProps) {
  const { locale, t } = useLocale();

  const displayName = (locale === 'en' && tool.nameEn) ? tool.nameEn : tool.name;
  const description = locale === 'en' ? tool.descriptionEn : tool.description;
  const tags = locale === 'en' ? tool.tagsEn : tool.tags;

  return (
    <div className="app">
      <Header totalCount={0} />

      <main className="tool-detail">
        <div className="tool-detail__container">
          <Link href="/" className="tool-detail__back">
            <ArrowLeft size={16} />
            <span>{t('tool.back')}</span>
          </Link>

          <div className="tool-detail__card">
            <div className="tool-detail__header">
              <div className="tool-detail__icon-wrapper">
                <span className="tool-detail__icon" role="img" aria-label={displayName}>
                  {tool.icon}
                </span>
              </div>
              <div className="tool-detail__title-section">
                <h1 className="tool-detail__title">{displayName}</h1>
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

            <div className="tool-detail__content">
              <h2>{t('tool.about')}</h2>
              <p className="tool-detail__description">{description}</p>
              
              <div className="tool-detail__tags-section">
                <h3>{t('tool.tags')}</h3>
                <div className="tool-detail__tags">
                  {tags.map((tag) => (
                    <span key={tag} className="tool-card__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

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
        </div>
      </main>

      <Footer />
    </div>
  );
}
