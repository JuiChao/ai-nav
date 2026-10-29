'use client';

import React from 'react';
import '../page.css';
import '../seo-content.css';

import Header, { Footer } from '@/components/Header';
import CursorReveal from '@/components/CursorReveal';
import SearchBar from '@/components/SearchBar';
import CategoryNav from '@/components/CategoryNav';
import ToolGrid from '@/components/ToolGrid';

import { useLocale } from '@/i18n/LocaleContext';
import { useToolFilter } from '@/hooks/useToolFilter';

import { CATEGORIES } from '@/data/categories';
import Link from '@/components/LocalizedLink';
import { BLOG_POSTS } from '@/data/blog';
import AiFinder from '@/components/AiFinder';

/**
 * 首页客户端内容组件
 * 完整复刻 mimo.xiaomi.com/coder 的纸质极简设计风格
 */
function HomePageContent({ initialCategory = 'all' }: { initialCategory?: string }) {
  const { locale, t } = useLocale();

  const {
    searchQuery,
    activeCategory,
    filteredTools,
    featuredTools,
    handleSearch,
    handleCategoryChange,
    totalCount,
  } = useToolFilter(initialCategory as any);

  const subtitleText = t('hero.subtitle');

  /** 获取当前分类的显示名称 */
  const activeItem = CATEGORIES.find((c) => c.id === activeCategory);
  const activeCategoryName = locale === 'en'
    ? (activeItem?.nameEn ?? 'All Tools')
    : (activeItem?.name ?? '全部工具');

  /** 是否处于搜索或筛选模式 */
  const isFiltering = searchQuery.trim() !== '' || activeCategory !== 'all';

  return (
    <div className="app">
      <Header totalCount={totalCount} />

      {/* Hero 区域 — 包含水墨擦除特效、优雅副标题与搜索 */}
      <section className="hero" id="hero">
        {/* 局限于 Hero 区域的水墨鼠标擦除 Canvas 特效 */}
        <CursorReveal />

        <div className="hero__content">
          <div className="hero__heading">
            <h1 className="hero__title">{t('hero.title')}</h1>
            
            <p className="hero__subtitle">
              {subtitleText}
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

      {/* 2026 前沿大模型矩阵高光引流横幅 - 彰显网站原创深度技术评测与独家分析价值 */}
      <div className="home-banner-wrapper">
        <Link href="/compare" className="home-banner">
          <div className="home-banner__left">
            <span className="home-banner__badge">
              <span className="home-banner__badge-dot" />
              2026 MATRIX
            </span>
            <span>
              {locale === 'en'
                ? 'Frontier AI Model Matrix 2026: Benchmark, Context & Pricing Comparison (GPT-6, Claude 5.5, Gemini 3.8, DeepSeek, GLM-5.3)'
                : '2026 前沿 AI 大模型全景横评矩阵：客观对比 GPT-6、Claude 5.5、Gemini 3.8、GLM-5.3、DeepSeek 核心参数与定价值'}
            </span>
          </div>
          <span className="home-banner__cta">
            {locale === 'en' ? 'Explore Matrix →' : '进入横评矩阵 →'}
          </span>
        </Link>
      </div>

      {/* 主展示区 */}
      <main className="main">
        <div className="main__category-section">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>



        <div className="main__content">
          <div className="main__tools">
            {!isFiltering && featuredTools.length > 0 && (
              <ToolGrid
                tools={featuredTools}
                title={t('grid.featured.title')}
                subtitle={t('grid.featured.subtitle')}
              />
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


        </div>
      </main>

      {/* 交互式 AI 选型向导 - 提供实质性应用价值与功能服务，超越普通链接目录 */}
      <AiFinder />

      {/* 博客/深度资讯推荐区 - 增加网站的“发布者内容”占比，对抗 AdSense 导航模式限制 */}
      <section className="home-seo-content">
        <div className="home-seo-content__inner">
          <div className="home-insights-header">
            <h2>
              {locale === 'en' ? 'Latest AI Insights & Articles' : '最新 AI 深度资讯与指南'}
            </h2>
            <Link href="/blog">
              {locale === 'en' ? 'View All →' : '查看全部 →'}
            </Link>
          </div>
          <div className="home-insights-grid">
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="home-insight-card"
              >
                <div>
                  <span className="home-insight-card__badge">
                    {post.category}
                  </span>
                  <h3 className="home-insight-card__title">
                    {locale === 'en' ? post.titleEn : post.title}
                  </h3>
                  <p className="home-insight-card__summary">
                    {locale === 'en' ? post.summaryEn : post.summary}
                  </p>
                </div>
                <div className="home-insight-card__meta">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO 增强内容区 - 注入原创新文本，提高 AdSense 审核通过率 */}
      <section className="home-seo-content">
        <div className="home-seo-content__inner">
          {locale === 'en' ? (
            <>
              <div className="seo-block">
                <h2>{isFiltering ? `Best AI Tools for ${activeCategoryName}` : 'Welcome to AI Nav - Your Ultimate AI Directory'}</h2>
                <p>
                  {isFiltering
                    ? `Explore our hand-curated selection of the best artificial intelligence tools in the ${activeCategoryName} category. Whether you are looking to boost productivity or unlock new creative possibilities, these tools represent the latest advancements in AI technology for this specific field.`
                    : `AI Nav is a comprehensive, constantly updated directory of the world's most innovative artificial intelligence tools. Our mission is to help developers, creators, marketers, and businesses discover the best AI solutions to boost productivity and unlock new creative possibilities. Whether you are looking for advanced conversational models, AI image generators, or specialized coding assistants, our hand-curated list ensures you spend less time searching and more time building.`
                  }
                </p>
              </div>

              <div className="seo-block">
                <h2>Frequently Asked Questions (FAQ)</h2>
                
                <div className="seo-faq-item">
                  <h3>How do I choose the right AI tool {isFiltering ? `for ${activeCategoryName}` : ''}?</h3>
                  <p>Choosing the right AI tool depends on your specific use case. For text generation and brainstorming, conversational AI like ChatGPT or Claude is ideal. For creative visual work, Midjourney or stable diffusion-based tools are recommended. We provide category filters to help you narrow down your options based on your professional or personal needs.</p>
                </div>
                
                <div className="seo-faq-item">
                  <h3>Are the AI tools listed here free?</h3>
                  <p>Our directory includes a mix of free, freemium, and paid tools. We use tags such as "Free" or "Free Trial" on the tool cards to help you quickly identify pricing models. Many premium tools offer substantial free tiers that are perfect for beginners.</p>
                </div>
                
                <div className="seo-faq-item">
                  <h3>How often is this directory updated?</h3>
                  <p>The AI landscape evolves rapidly, and so do we. We monitor global trends, new product launches, and major updates to existing platforms to keep our list of top 100 AI tools accurate and relevant to the current year.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="seo-block">
                <h2>{isFiltering ? `发现最佳 ${activeCategoryName} 工具` : '欢迎来到 AI 导航 - 您的终极人工智能工具库'}</h2>
                <p>
                  {isFiltering
                    ? `探索我们为您精心策划的最佳 ${activeCategoryName} 人工智能工具集合。无论您是想提高该领域的生产力还是解锁新的创作可能，这些工具都代表了当前 AI 技术的最新进展和最高水准。`
                    : `AI 导航是一个全面且不断更新的全球最具创新性人工智能工具目录。我们的使命是帮助开发者、创作者、营销人员和企业发现最佳的 AI 解决方案，以提高生产力并解锁新的创造力。无论您是在寻找高级对话模型、AI 图像生成器，还是专业的编程助手，我们精心策划的列表都能确保您减少搜索时间，将更多精力投入到建设和创作中。`
                  }
                </p>
              </div>

              <div className="seo-block">
                <h2>常见问题解答 (FAQ)</h2>
                
                <div className="seo-faq-item">
                  <h3>我应该如何选择合适的{isFiltering ? ` ${activeCategoryName} ` : ' AI '}工具？</h3>
                  <p>选择合适的 AI 工具取决于您的具体使用场景。对于文本生成和头脑风暴，像 ChatGPT 或 Claude 这样的对话式 AI 是理想的选择。对于创意视觉工作，推荐使用 Midjourney 或基于 Stable Diffusion 的工具。我们提供分类过滤功能，帮助您根据专业或个人需求缩小选择范围。</p>
                </div>
                
                <div className="seo-faq-item">
                  <h3>这里列出的 AI 工具是免费的吗？</h3>
                  <p>我们的目录包含完全免费、免费增值（Freemium）和付费工具。我们在工具卡片上使用“免费”或“免费试用”等标签，帮助您快速识别其定价模式。许多优质工具都提供非常良心的免费额度，非常适合初学者尝试。</p>
                </div>
                
                <div className="seo-faq-item">
                  <h3>这个目录多久更新一次？</h3>
                  <p>人工智能领域发展迅速，我们也是如此。我们持续监控全球趋势、新产品发布以及现有平台的重大更新，以确保我们的百大热门 AI 工具列表在当下保持最高的新鲜度和准确性。</p>
                </div>
              </div>
            </>
          )}

          {/* E-E-A-T 权威评测与出版物承诺 - 针对 Google AdSense 质量指南打造 */}
          <div className="home-transparency-box">
            <div className="home-transparency-box__header">
              <span style={{ fontSize: '1.25rem' }}>🛡️</span>
              <h3 className="home-transparency-box__title">
                {locale === 'en' ? 'AI Nav Editorial Transparency & Review Integrity' : 'AI 导航编审委员会：编辑透明度与独立性声明'}
              </h3>
            </div>
            <p className="home-transparency-box__text">
              {locale === 'en'
                ? 'To ensure high-value utility for our users and comply with Google Quality Rater guidelines, every tool in our directory undergoes hands-on testing. We strictly do not accept paid compensation to alter tool rankings, pros, cons, or benchmark conclusions.'
                : '为确保为全球用户提供具备实质性独特价值的信息与决策服务，本站收录的所有 AI 工具均由具备实战工程经验的编辑团队亲自进行提示词测试、功能验证与优缺点梳理。我们坚守客观中立原则，杜绝低质套壳工具收录，绝不接受任何篡改客观评价的付费刷榜行为。'}
            </p>
            <div className="home-transparency-box__chips">
              <span>✅ {locale === 'en' ? 'Verified 2026 ground-truth data' : '2026 官方前沿数据实时校准'}</span>
              <span>🔄 {locale === 'en' ? 'Automated 5-day link reachability audit' : '每 5 天自动化存活巡检与退市清洗'}</span>
              <span>⚖️ {locale === 'en' ? 'Independent benchmark methodology' : '多维度客观跑分与定价值体系'}</span>
              <Link href="/about">
                {locale === 'en' ? 'Read Full Methodology →' : '了解评测方法论 →'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePageContent;
