'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import type { BilingualBlogPost } from '@/lib/blog';
import './BlogArticle.css';

interface BlogArticleProps {
  post: BilingualBlogPost;
}

/**
 * 博客文章详情组件
 * 渲染文章的完整内容，支持简易 Markdown（标题、列表、表格、粗体）
 */
function BlogArticle({ post }: BlogArticleProps) {
  const { locale, t } = useLocale();
  const title = locale === 'en' ? post.titleEn : post.title;
  const content = locale === 'en' ? post.contentEn : post.content;
  const category = locale === 'en' ? post.categoryEn : post.category;
  const readTime = locale === 'en' ? post.readTimeEn : post.readTime;

  return (
    <article className="blog-article" id={`blog-${post.slug}`}>
      <Link href="/" className="blog-article__back">
        <ArrowLeft size={16} />
        {t('blog.backToList')}
      </Link>

      <header className="blog-article__header">
        <div className="blog-article__meta">
          <span className="blog-article__category">
            <Tag size={12} />
            {category}
          </span>
          <span className="blog-article__date">
            <Calendar size={12} />
            {post.date}
          </span>
          <span className="blog-article__read-time">
            <Clock size={12} />
            {readTime} {t('blog.minRead')}
          </span>
        </div>
        <h1 className="blog-article__title">{title}</h1>
      </header>

      <div
        className="blog-article__content"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
      />
    </article>
  );
}

/**
 * 简易 Markdown 渲染
 * NOTE: 仅用于渲染受信任的本地博客内容，非用户输入，因此 dangerouslySetInnerHTML 安全
 */
function renderMarkdown(md: string): string {
  const lines = md.split('\n');
  let html = '';
  let inTable = false;
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 跳过一级标题（页面已有 h1）
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      continue;
    }

    // 表格行
    if (line.startsWith('|')) {
      if (!inTable) {
        if (inList) { html += '</ul>'; inList = false; }
        html += '<div class="blog-table-wrap"><table>';
        inTable = true;
      }
      // 跳过分隔行
      if (line.includes('---')) continue;
      const cells = line.split('|').filter(c => c.trim() !== '');
      const isHeader = i + 1 < lines.length && lines[i + 1].includes('---');
      const tag = isHeader ? 'th' : 'td';
      html += '<tr>' + cells.map(c => `<${tag}>${applyInline(c.trim())}</${tag}>`).join('') + '</tr>';
      continue;
    } else if (inTable) {
      html += '</table></div>';
      inTable = false;
    }

    // 标题
    if (line.startsWith('## ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h2>${applyInline(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith('### ')) {
      if (inList) { html += '</ul>'; inList = false; }
      html += `<h3>${applyInline(line.slice(4))}</h3>`;
      continue;
    }

    // 列表项
    if (line.startsWith('- ')) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${applyInline(line.slice(2))}</li>`;
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      if (!inList) { html += '<ul class="blog-ol">'; inList = true; }
      html += `<li>${applyInline(line.replace(/^\d+\.\s/, ''))}</li>`;
      continue;
    }

    if (inList) { html += '</ul>'; inList = false; }

    // 水平线
    if (line.trim() === '---') {
      html += '<hr />';
      continue;
    }

    // 空行或段落
    if (line.trim() === '') continue;
    html += `<p>${applyInline(line)}</p>`;
  }

  if (inTable) html += '</table></div>';
  if (inList) html += '</ul>';

  return html;
}

/** 行内 Markdown（粗体、链接、代码） */
function applyInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}

export default BlogArticle;
