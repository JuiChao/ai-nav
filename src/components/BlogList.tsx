'use client';

import Link from 'next/link';
import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import type { BilingualBlogPost } from '@/lib/blog';
import './BlogList.css';

interface BlogListProps {
  posts: BilingualBlogPost[];
}

/**
 * 博客文章列表组件
 * 以卡片形式展示所有博客文章摘要，使用 Next.js Link 导航到文章详情页
 */
function BlogList({ posts }: BlogListProps) {
  const { locale, t } = useLocale();

  return (
    <section className="blog-list" id="blog-list">
      <div className="blog-list__header">
        <BookOpen size={24} />
        <div>
          <h2 className="blog-list__title">{t('blog.title')}</h2>
          <p className="blog-list__subtitle">{t('blog.subtitle')}</p>
        </div>
      </div>
      <div className="blog-list__grid">
        {posts.map((post) => {
          const title = locale === 'en' ? post.titleEn : post.title;
          const desc = locale === 'en' ? post.descriptionEn : post.description;
          const category = locale === 'en' ? post.categoryEn : post.category;
          const readTime = locale === 'en' ? post.readTimeEn : post.readTime;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
              id={`blog-card-${post.slug}`}
            >
              <div className="blog-card__icon">{post.icon}</div>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className="blog-card__category">{category}</span>
                  <span className="blog-card__date">
                    <Calendar size={11} />
                    {post.date}
                  </span>
                  <span className="blog-card__read-time">
                    <Clock size={11} />
                    {readTime} {t('blog.minRead')}
                  </span>
                </div>
                <h3 className="blog-card__title">{title}</h3>
                <p className="blog-card__desc">{desc}</p>
                <span className="blog-card__cta">
                  {t('blog.readMore')} <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default BlogList;
