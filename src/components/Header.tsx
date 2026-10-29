'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/LocalizedLink';
import { useLocale } from '@/i18n/LocaleContext';
import { Menu, X, Sparkles, Globe, ChevronDown, Layers, FileText, BarChart3 } from 'lucide-react';
import './Header.css';

/**
 * 完整复刻顶级艺术奖项水准（Awwwards / Webby）的顶部导航栏组件
 * 支持桌面级毛玻璃吸顶悬浮、精巧下拉菜单与全功能移动端抽屉
 */
function Header({ totalCount }: { totalCount: number }) {
  const { locale, setLocale, t } = useLocale();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 监听滚动赋予 Header 吸顶精细投影与深度
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 路由跳转时自动关闭移动端菜单
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // 移动端菜单打开时锁定页面背景滚动
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // 按 Escape 键快速关闭移动端菜单
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Create alternate language paths with proper trailing slash
  const ensureSlash = (p: string) => (p.endsWith('/') ? p : `${p}/`);
  const zhPath = ensureSlash(pathname.replace(/^\/[a-z]{2}/, '/zh') || '/zh');
  const enPath = ensureSlash(pathname.replace(/^\/[a-z]{2}/, '/en') || '/en');

  const isCompare = pathname.includes('/compare');
  const isBlog = pathname.includes('/blog');

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} id="header">
      <div className="header__inner">
        {/* 左侧 Logo */}
        <Link href="/" className="header__logo-link" onClick={closeMobileMenu}>
          <div className="header__logo-wrapper">
            <span className="header__logo-icon" aria-hidden="true">✦</span>
            <span className="header__logo-text">{t('header.title')}</span>
            <span className="header__logo-badge">PRO</span>
          </div>
        </Link>

        {/* 顶部中央/右侧导航条 */}
        <div className="header__bar">
          <nav className="header__nav" aria-label="Main navigation">
            {/* 产品下拉菜单 */}
            <div className="header__nav-dropdown">
              <button
                type="button"
                className="header__nav-link header__nav-dropdown-trigger"
                aria-haspopup="menu"
                aria-expanded="false"
              >
                <span>{t('nav.product')}</span>
                <ChevronDown className="header__nav-caret" size={13} aria-hidden="true" />
              </button>
              <div className="header__nav-menu" role="menu">
                <Link className="header__nav-menu-item" href="/#hero" role="menuitem">
                  <span>{t('nav.navProductItem')}</span>
                  <span className="header__count-badge">{totalCount}</span>
                </Link>
                <Link className="header__nav-menu-item" href="/#ai-finder" role="menuitem">
                  <span>{locale === 'en' ? 'AI Finder Wizard' : 'AI 选型向导'}</span>
                  <span className="header__new-badge">NEW</span>
                </Link>
              </div>
            </div>
            
            <Link className="header__nav-link" href="/#category-nav">
              {t('stats.categories')}
            </Link>
            <Link className={`header__nav-link ${isCompare ? 'header__nav-link--active' : ''}`} href="/compare">
              <span>{locale === 'en' ? 'Model Matrix' : '模型横评'}</span>
              <span className="header__sparkle-dot" aria-hidden="true" />
            </Link>
            <Link className={`header__nav-link ${isBlog ? 'header__nav-link--active' : ''}`} href="/blog">
              {locale === 'en' ? 'Insights Blog' : '深度资讯'}
            </Link>
          </nav>

          {/* 语言切换下拉菜单 */}
          <div className="header__lang header__nav-dropdown">
            <button
              type="button"
              className="header__lang-trigger header__nav-dropdown-trigger"
              aria-label="Language"
              aria-haspopup="menu"
              aria-expanded="false"
            >
              <Globe className="header__lang-icon" size={16} />
              <span className="header__lang-label">{locale === 'en' ? 'EN' : '中'}</span>
              <ChevronDown className="header__nav-caret" size={12} aria-hidden="true" />
            </button>
            <div className="header__nav-menu header__lang-menu" role="menu">
              <a
                href={zhPath}
                className={`header__nav-menu-item header__lang-option ${locale === 'zh' ? 'is-active' : ''}`}
                onClick={() => setLocale('zh')}
                role="menuitem"
              >
                <span>简体中文</span>
                {locale === 'zh' && <span className="header__lang-check">✓</span>}
              </a>
              <a
                href={enPath}
                className={`header__nav-menu-item header__lang-option ${locale === 'en' ? 'is-active' : ''}`}
                onClick={() => setLocale('en')}
                role="menuitem"
              >
                <span>English</span>
                {locale === 'en' && <span className="header__lang-check">✓</span>}
              </a>
            </div>
          </div>

          {/* 移动端汉堡切换按钮 */}
          <button
            type="button"
            className="header__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 移动端背景遮罩 */}
      {mobileMenuOpen && (
        <div
          className="header__mobile-backdrop"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* 移动端全功能滑出导航抽屉 */}
      <div className={`header__mobile-drawer ${mobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!mobileMenuOpen}>
        <div className="header__mobile-drawer-inner">
          <div className="header__mobile-nav-group">
            <span className="header__mobile-group-title">{locale === 'en' ? 'EXPLORE' : '探索发现'}</span>
            <Link href="/" className="header__mobile-link" onClick={closeMobileMenu}>
              <Sparkles size={16} />
              <span>{t('header.title')} ({totalCount})</span>
            </Link>
            <Link href="/#category-nav" className="header__mobile-link" onClick={closeMobileMenu}>
              <Layers size={16} />
              <span>{t('stats.categories')}</span>
            </Link>
            <Link href="/compare" className="header__mobile-link" onClick={closeMobileMenu}>
              <BarChart3 size={16} />
              <span>{locale === 'en' ? 'Frontier Model Matrix 2026' : '2026 前沿大模型全景横评'}</span>
            </Link>
            <Link href="/blog" className="header__mobile-link" onClick={closeMobileMenu}>
              <FileText size={16} />
              <span>{locale === 'en' ? 'AI Insights & Guides' : 'AI 深度资讯与指南'}</span>
            </Link>
          </div>

          <div className="header__mobile-nav-group">
            <span className="header__mobile-group-title">{locale === 'en' ? 'LANGUAGE' : '语言切换'}</span>
            <div className="header__mobile-lang-row">
              <a
                href={zhPath}
                className={`header__mobile-lang-btn ${locale === 'zh' ? 'is-active' : ''}`}
                onClick={() => {
                  setLocale('zh');
                  closeMobileMenu();
                }}
              >
                简体中文
              </a>
              <a
                href={enPath}
                className={`header__mobile-lang-btn ${locale === 'en' ? 'is-active' : ''}`}
                onClick={() => {
                  setLocale('en');
                  closeMobileMenu();
                }}
              >
                English
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="header__divider" aria-hidden="true"></div>
    </header>
  );
}

export default Header;

export function Footer() {
  const { t, locale } = useLocale();

  return (
    <footer className="footer" id="footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-sparkle">✦</span>
              <span className="footer__logo-text">AI Nav</span>
            </div>
            <p className="footer__tagline">
              {locale === 'en'
                ? 'Curated intelligence atelier & benchmark matrix for modern builders.'
                : '全球前沿人工智能工具目录与基座大模型客观评测智库。'}
            </p>
          </div>

          <div className="footer__nav-cols">
            <div className="footer__col">
              <h4 className="footer__col-title">{locale === 'en' ? 'Navigation' : '主要导航'}</h4>
              <Link className="footer__col-link" href="/">{locale === 'en' ? 'All AI Tools' : '全部 AI 工具'}</Link>
              <Link className="footer__col-link" href="/compare">{locale === 'en' ? 'Model Matrix' : '大模型横评'}</Link>
              <Link className="footer__col-link" href="/blog">{locale === 'en' ? 'Editorial Blog' : '深度资讯'}</Link>
            </div>

            <div className="footer__col">
              <h4 className="footer__col-title">{locale === 'en' ? 'Transparency' : '透明度与信任'}</h4>
              <Link className="footer__col-link" href="/about">{t('footer.about') || 'About Us'}</Link>
              <Link className="footer__col-link" href="/contact">{t('footer.contact') || 'Contact'}</Link>
              <Link className="footer__col-link" href="/terms">{t('footer.agreement') || 'Terms of Service'}</Link>
              <Link className="footer__col-link" href="/privacy">{t('footer.privacy') || 'Privacy Policy'}</Link>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">{t('footer.copyright')}</span>
          <span className="footer__made">Crafted with precision &amp; architectural elegance</span>
        </div>
      </div>
    </footer>
  );
}
