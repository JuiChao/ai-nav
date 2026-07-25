'use client';

import Link from 'next/link';
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
                  {displayName} {t('tool.seoText', { tags: tags.join('、') })}
                </p>
              </section>

              <section className="tool-detail__rich-content">
                {locale === 'en' ? (
                  <>
                    <h2>Why Use {displayName}?</h2>
                    <p>{displayName} is one of the leading tools in the <strong>{categoryName}</strong> space. Whether you are a beginner looking to explore new capabilities or a professional aiming to streamline your workflow, {displayName} offers a robust set of features. By leveraging advanced AI models, it helps users save time and achieve better results.</p>
                    
                    <h3>Key Features</h3>
                    <ul>
                      <li><strong>Advanced AI Capabilities:</strong> Built with state-of-the-art algorithms to deliver high-quality outputs.</li>
                      <li><strong>User-Friendly Interface:</strong> Designed to be intuitive so you can focus on your tasks without a steep learning curve.</li>
                      <li><strong>Tag Highlights:</strong> Optimized for {tags.slice(0, 3).join(', ')}.</li>
                    </ul>

                    <h3>Pricing Model</h3>
                    <p>
                      {tool.isFree 
                        ? `${displayName} is completely free to use, making it an excellent choice for anyone looking to get started without financial commitment.` 
                        : (tool.hasFreeTrial 
                            ? `While ${displayName} is a premium service, it offers a free trial or a freemium tier, allowing you to test its capabilities before subscribing.` 
                            : `${displayName} requires a paid subscription, which is tailored for professionals who need reliable, enterprise-grade AI features.`)
                      }
                    </p>
                  </>
                ) : (
                  <>
                    <h2>为什么选择 {displayName}？</h2>
                    <p>{displayName} 是 <strong>{categoryName}</strong> 领域的领先工具之一。无论您是想要探索新功能的初学者，还是旨在简化工作流程的专业人士，{displayName} 都提供了一套强大的功能。通过利用先进的 AI 模型，它可以帮助用户节省时间并取得更好的成果。</p>
                    
                    <h3>核心功能与优势</h3>
                    <ul>
                      <li><strong>先进的 AI 能力：</strong> 采用最先进的算法构建，提供高质量的生成结果和反馈。</li>
                      <li><strong>用户友好的界面：</strong> 直观的设计使您可以专注于手头的任务，而无需经历陡峭的学习曲线。</li>
                      <li><strong>领域优化：</strong> 在 {tags.slice(0, 3).join('、')} 方面表现尤为突出。</li>
                    </ul>

                    <h3>定价模式</h3>
                    <p>
                      {tool.isFree 
                        ? `${displayName} 是完全免费的工具，非常适合想要零成本入门和体验的用户。` 
                        : (tool.hasFreeTrial 
                            ? `虽然 ${displayName} 是一项高级服务，但它提供免费试用或免费基础版（Freemium），允许您在订阅前充分测试其功能。` 
                            : `${displayName} 需要付费订阅，专为需要可靠、企业级 AI 服务的专业人士量身定制。`)
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
