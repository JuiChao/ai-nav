import { useState } from 'react';
import { Zap } from 'lucide-react';
import './App.css';

import Header, { Footer } from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryNav from './components/CategoryNav';
import ToolGrid from './components/ToolGrid';
import AdBanner from './components/AdBanner';
import AdSidebar from './components/AdSidebar';
import BlogList from './components/BlogList';
import BlogArticle from './components/BlogArticle';

import { useLocale } from './i18n/LocaleContext';
import { useToolFilter } from './hooks/useToolFilter';
import { AD_SLOTS } from './data/ads';
import { CATEGORIES } from './data/categories';
import { BLOG_POSTS, type BlogPost } from './data/blog-posts';

/**
 * AI 导航主应用
 * 提供搜索、分类筛选、工具展示、博客文章和广告位功能，支持中英双语
 */
function App() {
  const { locale, t } = useLocale();
  /** 当前选中的博客文章（null 表示不在文章详情页） */
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const {
    searchQuery,
    activeCategory,
    filteredTools,
    featuredTools,
    handleSearch,
    handleCategoryChange,
    totalCount,
  } = useToolFilter();

  /** 获取当前分类的显示名称 */
  const activeItem = CATEGORIES.find((c) => c.id === activeCategory);
  const activeCategoryName = locale === 'en'
    ? (activeItem?.nameEn ?? 'All Tools')
    : (activeItem?.name ?? '全部工具');

  /** 横幅广告 */
  const bannerAd = AD_SLOTS.find((ad) => ad.position === 'banner');
  /** 内联广告 */
  const inlineAd = AD_SLOTS.find((ad) => ad.position === 'inline');
  /** 是否处于搜索或筛选模式 */
  const isFiltering = searchQuery.trim() !== '' || activeCategory !== 'all';

  /** 进入文章详情时滚动到顶部 */
  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedPost(null);
  };

  // 文章详情页独立渲染
  if (selectedPost) {
    return (
      <div className="app">
        <Header totalCount={totalCount} />
        <BlogArticle post={selectedPost} onBack={handleBackToList} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="app">
      <Header totalCount={totalCount} />

      {/* 英雄区域 */}
      <section className="hero" id="hero">
        <div className="hero__badge">
          <Zap size={14} />
          {t('hero.badge')}
        </div>
        <h2 className="hero__title">
          {t('hero.title.line1')}
          <br />
          {t('hero.title.line2')}
        </h2>
        <p className="hero__description">
          {t('hero.description')}
        </p>
        <div className="hero__search">
          <SearchBar
            value={searchQuery}
            onChange={handleSearch}
            resultCount={filteredTools.length}
          />
        </div>
      </section>

      {/* 统计数据 */}
      <div className="stats" id="stats">
        <div className="stats__item">
          <div className="stats__number">{totalCount}+</div>
          <div className="stats__label">{t('stats.tools')}</div>
        </div>
        <div className="stats__item">
          <div className="stats__number">{CATEGORIES.length - 1}</div>
          <div className="stats__label">{t('stats.categories')}</div>
        </div>
        <div className="stats__item">
          <div className="stats__number">{featuredTools.length}</div>
          <div className="stats__label">{t('stats.featured')}</div>
        </div>
      </div>

      {/* 主内容 */}
      <main className="main">
        <div className="main__category-section">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>

        {bannerAd && (
          <div className="main__ad-banner">
            <AdBanner ad={bannerAd} />
          </div>
        )}

        {/* 博客文章列表 — 位于广告横幅之后、工具列表之前的显眼位置 */}
        {!isFiltering && (
          <div className="main__blog-section">
            <BlogList posts={BLOG_POSTS} onSelectPost={handleSelectPost} />
          </div>
        )}

        <div className="main__content">
          <div className="main__tools">
            {!isFiltering && featuredTools.length > 0 && (
              <ToolGrid
                tools={featuredTools}
                title={t('grid.featured.title')}
                subtitle={t('grid.featured.subtitle')}
              />
            )}

            {!isFiltering && inlineAd && (
              <div className="main__inline-ad">
                <AdBanner ad={inlineAd} />
              </div>
            )}

            <ToolGrid
              tools={filteredTools}
              title={isFiltering ? activeCategoryName : t('grid.all.title')}
              subtitle={
                isFiltering
                  ? t('grid.filtered.count', { count: filteredTools.length })
                  : t('grid.all.subtitle')
              }
            />

          </div>

          <AdSidebar ads={AD_SLOTS} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
