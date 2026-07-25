'use client';

import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import Header, { Footer } from '@/components/Header';
import { useLocale } from '@/i18n/LocaleContext';
import type { BlogPost } from '@/data/blog';
import '../blog.css';

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { locale } = useLocale();

  const title = locale === 'en' ? post.titleEn : post.title;
  const content = locale === 'en' ? post.contentEn : post.content;

  // Enhanced Markdown renderer
  const renderContent = (rawText: string) => {
    const lines = rawText.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentUl: string[] = [];
    let currentOl: string[] = [];

    const flushUl = (key: string) => {
      if (currentUl.length > 0) {
        elements.push(
          <ul key={`ul-${key}`}>
            {currentUl.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        currentUl = [];
      }
    };

    const flushOl = (key: string) => {
      if (currentOl.length > 0) {
        elements.push(
          <ol key={`ol-${key}`}>
            {currentOl.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ol>
        );
        currentOl = [];
      }
    };

    const flushAll = (key: string) => {
      flushUl(key);
      flushOl(key);
    };

    const formatInline = (text: string) => {
      return text
        // Code first (to protect asterisks inside code)
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Links [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushAll(`blank-${index}`);
        return;
      }

      // Skip top-level H1 (already rendered in header)
      if (trimmed.startsWith('# ') && !trimmed.startsWith('## ')) {
        flushAll(`h1-${index}`);
        return; // Skip duplicate H1
      }

      if (trimmed.startsWith('### ')) {
        flushAll(`h3-${index}`);
        elements.push(<h3 key={index}>{trimmed.replace('### ', '')}</h3>);
      } else if (trimmed.startsWith('## ')) {
        flushAll(`h2-${index}`);
        elements.push(<h2 key={index}>{trimmed.replace('## ', '')}</h2>);
      } else if (trimmed.startsWith('---')) {
        flushAll(`hr-${index}`);
        elements.push(<hr key={index} />);
      } else if (trimmed.startsWith('- ')) {
        flushOl(`ol-before-ul-${index}`);
        currentUl.push(trimmed.replace('- ', ''));
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushUl(`ul-before-ol-${index}`);
        currentOl.push(trimmed.replace(/^\d+\.\s/, ''));
      } else if (trimmed.startsWith('> ')) {
        flushAll(`bq-${index}`);
        elements.push(
          <blockquote key={index} dangerouslySetInnerHTML={{ __html: formatInline(trimmed.replace('> ', '')) }} />
        );
      } else {
        flushAll(`p-${index}`);
        elements.push(
          <p key={index} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        );
      }
    });

    flushAll('end');
    return elements;
  };

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="blog-page">
        <div className="blog-post__container">
          <nav className="blog-post__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{locale === 'en' ? 'Home' : '首页'}</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/blog">{locale === 'en' ? 'Blog' : '博客'}</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page">{title}</span>
          </nav>

          <header className="blog-post__header">
            <h1 className="blog-post__title">{title}</h1>
            <div className="blog-post__meta">
              <span className="blog-card__category">{post.category}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={post.date}>{post.date}</time>
              <span aria-hidden="true">•</span>
              <span>By {post.author}</span>
              <span aria-hidden="true">•</span>
              <span>{post.readTime}</span>
            </div>
          </header>

          <article className="blog-post__content">
            {renderContent(content)}
          </article>

          <div style={{ marginTop: '40px' }}>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', textDecoration: 'none' }}>
              <ArrowLeft size={16} />
              <span>{locale === 'en' ? 'Back to Blog' : '返回文章列表'}</span>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
