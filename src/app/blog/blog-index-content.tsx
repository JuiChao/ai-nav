'use client';

import Link from 'next/link';
import Header, { Footer } from '@/components/Header';
import { useLocale } from '@/i18n/LocaleContext';
import { BLOG_POSTS } from '@/data/blog';
import './blog.css';

export default function BlogIndexContent() {
  const { locale } = useLocale();

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="blog-page">
        <div className="blog-page__container">
          <header className="blog-page__header">
            <h1 className="blog-page__title">
              {locale === 'en' ? 'AI Insights & Guides' : 'AI 资讯与深度指南'}
            </h1>
            <p className="blog-page__subtitle">
              {locale === 'en'
                ? 'Explore in-depth articles, industry trends, and practical guides on artificial intelligence.'
                : '探索关于人工智能的深度文章、行业趋势与实用工程指南。'}
            </p>
          </header>

          <div className="blog-grid">
            {BLOG_POSTS.map((post) => {
              const title = locale === 'en' ? post.titleEn : post.title;
              const summary = locale === 'en' ? post.summaryEn : post.summary;

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{post.category}</span>
                    <span aria-hidden="true">•</span>
                    <time dateTime={post.date}>{post.date}</time>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="blog-card__title">{title}</h2>
                  <p className="blog-card__summary">{summary}</p>
                  <div className="blog-card__footer">
                    <span>By {post.author}</span>
                    <span>{locale === 'en' ? 'Read More →' : '阅读全文 →'}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
