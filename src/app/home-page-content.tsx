'use client';

import { useState, useEffect } from 'react';
import './page.css';

import Header, { Footer } from '@/components/Header';
import CursorReveal from '@/components/CursorReveal';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';
import ToolGrid from '@/components/ToolGrid';
import AdBanner from '@/components/AdBanner';
import AdSidebar from '@/components/AdSidebar';

import { useLocale } from '@/i18n/LocaleContext';
import { useToolFilter } from '@/hooks/useToolFilter';
import { AD_SLOTS } from '@/data/ads';
import { CATEGORIES } from '@/data/categories';

/**
 * 首页客户端内容组件
 * 完整复刻 mimo.xiaomi.com/coder 的纸质极简设计风格
 */
function HomePageContent() {
  const { locale, t } = useLocale();

  const {
    searchQuery,
    activeCategory,
    filteredTools,
    featuredTools,
    handleSearch,
    handleCategoryChange,
    totalCount,
  } = useToolFilter();

  // ─── Hero 副标题打字机动效 ───
  const subtitleText = t('hero.subtitle');
  const [subTyped, setSubTyped] = useState(0);
  const subChars = Array.from(subtitleText);

  // 当语言切换或初次挂载时重置并开始打字
  useEffect(() => {
    setSubTyped(0);
  }, [locale]);

  useEffect(() => {
    if (subTyped >= subChars.length) return;
    const timer = setTimeout(() => {
      setSubTyped((prev) => prev + 1);
    }, 45); // 稍微快一点的打字速度，提升首屏入场感
    return () => clearTimeout(timer);
  }, [subTyped, subChars.length]);

  const isSubDone = subTyped >= subChars.length;

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

  return (
    <div className="app">
      <Header totalCount={totalCount} />

      {/* Hero 区域 — 包含水墨擦除特效、打字机副标题、Terminal 极客命令行与搜索 */}
      <section className="hero" id="hero">
        {/* 局限于 Hero 区域的水墨鼠标擦除 Canvas 特效 */}
        <CursorReveal />

        <div className="hero__content">
          <div className="hero__heading">
            <h1 className="hero__title">{t('hero.title')}</h1>
            
            {/* 逐字吐出的副标题 + 闪烁光标 */}
            <p className={`hero__subtitle ${isSubDone ? 'is-done' : ''}`}>
              {subChars.slice(0, subTyped).map((char, index) => (
                <span key={index} className="char is-typed">
                  {char}
                </span>
              ))}
              <span className="type-caret" aria-hidden="true" />
            </p>
          </div>
          {/* SearchBar 搜索输入框 */}
          <div className="hero__search">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              resultCount={filteredTools.length}
            />
          </div>
        </div>
      </section>

      {/* 数据指示器 */}
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

      {/* 主展示区 */}
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

export default HomePageContent;
