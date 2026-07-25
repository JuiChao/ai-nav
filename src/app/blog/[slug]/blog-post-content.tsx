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

  // Simple Markdown renderer for headings, paragraphs, lists, hr
  const renderContent = (rawText: string) => {
    const lines = rawText.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = (key: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`ul-${key}`}>
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const formatInline = (text: string) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`([^`]+)`/g, '<code>$1</code>');
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList(`blank-${index}`);
        return;
      }

      if (trimmed.startsWith('# ')) {
        flushList(`h1-${index}`);
        elements.push(<h1 key={index}>{trimmed.replace('# ', '')}</h1>);
      } else if (trimmed.startsWith('## ')) {
        flushList(`h2-${index}`);
        elements.push(<h2 key={index}>{trimmed.replace('## ', '')}</h2>);
      } else if (trimmed.startsWith('### ')) {
        flushList(`h3-${index}`);
        elements.push(<h3 key={index}>{trimmed.replace('### ', '')}</h3>);
      } else if (trimmed.startsWith('---')) {
        flushList(`hr-${index}`);
        elements.push(<hr key={index} />);
      } else if (trimmed.startsWith('- ')) {
        currentList.push(trimmed.replace('- ', ''));
      } else {
        flushList(`p-${index}`);
        elements.push(
          <p key={index} dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} />
        );
      }
    });

    flushList('end');
    return elements;
  };

  return (
    <div className="app">
      <Header totalCount={100} />
      <main className="blog-page">
        <div className="blog-post__container">
          <nav className="blog-post__breadcrumb" aria-label="Breadcrumb">
            <Link href="/">{locale === 'en' ? 'Home' : '首页'}</Link>
            <ChevronRight size={14} />
            <Link href="/blog">{locale === 'en' ? 'Blog' : '博客'}</Link>
            <ChevronRight size={14} />
            <span>{title}</span>
          </nav>

          <header className="blog-post__header">
            <h1 className="blog-post__title">{title}</h1>
            <div className="blog-post__meta">
              <span className="blog-card__category">{post.category}</span>
              <span>•</span>
              <time>{post.date}</time>
              <span>•</span>
              <span>By {post.author}</span>
              <span>•</span>
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
