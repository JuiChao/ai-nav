'use client';

import { useState, useEffect } from 'react';
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

      {/* 2026 前沿大模型矩阵高光引流横幅 - 彰显网站原创深度技术评测与独家分析价值 */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 1.5rem', padding: '0 1rem' }}>
        <Link
          href="/compare"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.9rem 1.25rem',
            background: 'linear-gradient(90deg, rgba(37,99,235,0.08) 0%, rgba(147,51,234,0.08) 100%)',
            border: '1px solid rgba(37,99,235,0.25)',
            borderRadius: '12px',
            textDecoration: 'none',
            color: 'var(--color-text)',
            fontSize: '0.92rem',
            fontWeight: 600,
            boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span style={{ fontSize: '1.25rem' }}>🔥</span>
            <span>
              {locale === 'en'
                ? 'Frontier AI Model Matrix 2026: Benchmark, Context & Pricing Comparison (GPT-6, Claude 5.5, Gemini 3.8, DeepSeek, GLM-5.3)'
                : '2026 前沿 AI 大模型全景横评矩阵：客观对比 GPT-6、Claude 5.5、Gemini 3.8、GLM-5.3、DeepSeek 核心参数与定价值'}
            </span>
          </div>
          <span style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
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
      <section className="home-seo-content" style={{ marginTop: '20px', marginBottom: '20px' }}>
        <div className="home-seo-content__inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 700, margin: 0 }}>
              {locale === 'en' ? 'Latest AI Insights & Articles' : '最新 AI 深度资讯与指南'}
            </h2>
            <Link href="/blog" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
              {locale === 'en' ? 'View All →' : '查看全部 →'}
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                style={{
                  padding: '20px',
                  background: 'var(--color-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary)', padding: '3px 8px', borderRadius: '12px', fontWeight: 600 }}>
                    {post.category}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', margin: '10px 0 8px', fontWeight: 600, color: 'var(--color-text)' }}>
                    {locale === 'en' ? post.titleEn : post.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-dim)', lineHeight: 1.5, margin: 0 }}>
                    {locale === 'en' ? post.summaryEn : post.summary}
                  </p>
                </div>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--color-text-dim)', display: 'flex', justifyContent: 'space-between' }}>
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
          <div style={{
            marginTop: '32px',
            padding: '24px',
            background: 'var(--color-bg)',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '1.2rem' }}>🛡️</span>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text)' }}>
                {locale === 'en' ? 'AI Nav Editorial Transparency & Review Integrity' : 'AI 导航编审委员会：编辑透明度与独立性声明'}
              </h3>
            </div>
            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-dim)', lineHeight: 1.6, margin: '0 0 16px' }}>
              {locale === 'en'
                ? 'To ensure high-value utility for our users and comply with Google Quality Rater guidelines, every tool in our directory undergoes hands-on testing. We strictly do not accept paid compensation to alter tool rankings, pros, cons, or benchmark conclusions.'
                : '为确保为全球用户提供具备实质性独特价值的信息与决策服务，本站收录的所有 AI 工具均由具备实战工程经验的编辑团队亲自进行提示词测试、功能验证与优缺点梳理。我们坚守客观中立原则，杜绝低质套壳工具收录，绝不接受任何篡改客观评价的付费刷榜行为。'}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '0.85rem', color: 'var(--color-text-dim)', paddingTop: '12px', borderTop: '1px solid var(--color-border)' }}>
              <span>✅ {locale === 'en' ? 'Verified 2026 ground-truth data' : '2026 官方前沿数据实时校准'}</span>
              <span>🔄 {locale === 'en' ? 'Automated 5-day link reachability audit' : '每 5 天自动化存活巡检与退市清洗'}</span>
              <span>⚖️ {locale === 'en' ? 'Independent benchmark methodology' : '多维度客观跑分与定价值体系'}</span>
              <Link href="/about" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>
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
