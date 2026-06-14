'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';
import './Header.css';

/**
 * 完整复刻 Mimo 风格的顶部导航栏组件
 */
function Header({ totalCount }: { totalCount: number }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="header" id="header">
      <div className="header__inner">
        {/* 左侧 Logo */}
        <Link href="/" className="header__logo-link">
          <div className="header__logo-wrapper">
            <span className="header__logo-icon">✦</span>
            <span className="header__logo-text">{t('header.title')}</span>
          </div>
        </Link>

        {/* 顶部中央/右侧导航条 */}
        <div className="header__bar">
          <nav className="header__nav" aria-label="Main navigation">
            {/* 产品下拉菜单 */}
            <div className="header__nav-dropdown">
              <button type="button" className="header__nav-link header__nav-dropdown-trigger">
                <span>{t('nav.product')}</span>
                <svg
                  className="header__nav-caret"
                  width="1em"
                  height="1em"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M16 22 6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"
                  />
                </svg>
              </button>
              <div className="header__nav-menu" role="menu">
                <Link className="header__nav-menu-item" href="#hero" role="menuitem">
                  {t('nav.navProductItem')} ({totalCount})
                </Link>
              </div>
            </div>
            
            <a className="header__nav-link" href="#category-nav">
              {t('stats.categories')}
            </a>
          </nav>

          {/* 语言切换下拉菜单 */}
          <div className="header__lang header__nav-dropdown">
            <button type="button" className="header__lang-trigger header__nav-dropdown-trigger" aria-label="Language">
              <svg
                className="header__lang-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <svg
                className="header__nav-caret"
                width="1em"
                height="1em"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M16 22 6 12l1.4-1.4 8.6 8.6 8.6-8.6L26 12z"
                />
              </svg>
            </button>
            <div className="header__nav-menu header__lang-menu" role="menu">
              <button
                type="button"
                className={`header__nav-menu-item header__lang-option ${locale === 'zh' ? 'is-active' : ''}`}
                onClick={() => setLocale('zh')}
                role="menuitem"
              >
                简体中文
              </button>
              <button
                type="button"
                className={`header__nav-menu-item header__lang-option ${locale === 'en' ? 'is-active' : ''}`}
                onClick={() => setLocale('en')}
                role="menuitem"
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="header__divider" aria-hidden="true"></div>
    </header>
  );
}

export default Header;

/**
 * 完整复刻 Mimo 风格的页脚组件
 */
export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <span>{t('footer.copyright')}</span>
        <span className="footer__sep">|</span>
        <a className="footer__link" href="#service-agreement">
          {t('footer.agreement')}
        </a>
        <span className="footer__sep">|</span>
        <a className="footer__link" href="#privacy-policy">
          {t('footer.privacy')}
        </a>
        <span className="footer__sep">|</span>
        <button className="footer__btn" type="button">
          {t('footer.cookie')}
        </button>
      </div>
    </footer>
  );
}
