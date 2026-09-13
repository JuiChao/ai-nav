'use client';

import Link from '@/components/LocalizedLink';
import { ExternalLink, ArrowLeft, ChevronRight } from 'lucide-react';
import type { AiTool } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import Header, { Footer } from '@/components/Header';
import './tool-detail.css';
import './rich-content.css';

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
                  {displayName} {t('tool.seoText', { tags: tags.join(locale === 'en' ? ', ' : '、') })}
                </p>
              </section>

              <section className="tool-detail__rich-content">
                {locale === 'en' ? (
                  <>
                    <h2>Expert Review: Is {displayName} Worth It?</h2>
                    {tool.features && tool.featuresEn && tool.featuresEn.length > 0 ? (
                      <>
                        <h3>Key Features</h3>
                        <ul>
                          {tool.featuresEn.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        
                        <div className="tool-detail__pros-cons">
                          <div className="tool-detail__pros">
                            <h4>Pros</h4>
                            <ul>
                              {tool.prosEn?.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                          </div>
                          <div className="tool-detail__cons">
                            <h4>Cons</h4>
                            <ul>
                              {tool.consEn?.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                          </div>
                        </div>

                        <h3>Best For</h3>
                        <ul>
                          {tool.useCasesEn?.map((u, i) => <li key={i}>{u}</li>)}
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>{displayName} is a prominent tool in the <strong>{categoryName}</strong> space, specialized in {tags.join(', ')}.</p>
                        <p>It helps professionals streamline their workflow by providing features aligned with {tool.descriptionEn}.</p>
                      </>
                    )}

                    <h3>Pricing Model</h3>
                    <p>
                      {tool.isFree 
                        ? `${displayName} is completely free to use.` 
                        : (tool.hasFreeTrial 
                            ? `${displayName} offers a free trial or freemium tier.` 
                            : `${displayName} requires a paid subscription.`)
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <h2>独家评测：{displayName} 值得使用吗？</h2>
                    {tool.features && tool.features.length > 0 ? (
                      <>
                        <h3>🚀 核心功能特色</h3>
                        <ul>
                          {tool.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        
                        <div className="tool-detail__pros-cons">
                          <div className="tool-detail__pros">
                            <h4>✅ 优势与亮点</h4>
                            <ul>
                              {tool.pros?.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                          </div>
                          <div className="tool-detail__cons">
                            <h4>❌ 局限性与不足</h4>
                            <ul>
                              {tool.cons?.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                          </div>
                        </div>

                        <h3>🎯 适用场景与目标受众</h3>
                        <ul>
                          {tool.useCases?.map((u, i) => <li key={i}>{u}</li>)}
                        </ul>
                      </>
                    ) : (
                      <>
                        <p>{displayName} 是一款在 <strong>{categoryName}</strong> 领域表现突出的 AI 工具，其主要擅长于 {tags.join('、')}。</p>
                        <p>这是一款帮助提升效率的工具，主要解决了以下需求：{tool.description}。</p>
                      </>
                    )}

                    <h3>💰 定价模式</h3>
                    <p>
                      {tool.isFree 
                        ? `${displayName} 目前完全免费，适合所有用户零门槛体验。` 
                        : (tool.hasFreeTrial 
                            ? `${displayName} 提供了免费试用版或基础免费额度，允许您在正式订阅前进行深度体验。` 
                            : `${displayName} 为纯付费订阅模式，主要面向追求高稳定性和高阶功能的专业级用户。`)
                      }
                    </p>
                  </>
                )}
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
