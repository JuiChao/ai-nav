import { Clock, Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import type { BlogPost } from '../data/blog-posts';
import './BlogList.css';

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

/**
 * 博客文章列表组件
 * 以卡片形式展示所有博客文章摘要
 */
function BlogList({ posts, onSelectPost }: BlogListProps) {
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
            <button
              key={post.id}
              className="blog-card"
              onClick={() => onSelectPost(post)}
              id={`blog-card-${post.id}`}
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
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default BlogList;
