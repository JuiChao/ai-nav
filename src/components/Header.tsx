import { Sparkles, Globe, Heart, Languages } from 'lucide-react';
import { useLocale } from '../i18n/LocaleContext';
import './Header.css';

/**
 * 顶部导航栏组件
 * 包含品牌标识、语言切换和外部链接
 */
function Header({ totalCount }: { totalCount: number }) {
  const { t, toggleLocale } = useLocale();

  return (
    <header className="header" id="header">
      <div className="header__inner">
        <div className="header__brand">
          <Sparkles className="header__logo" size={28} />
          <div>
            <h1 className="header__title">{t('header.title')}</h1>
            <p className="header__subtitle">
              {t('header.subtitle', { count: totalCount })}
            </p>
          </div>
        </div>

        <nav className="header__nav">
          <button
            className="header__nav-link"
            onClick={() => {
              const el = document.getElementById('blog-list');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('blog.nav')}
          </button>
          <button
            className="header__lang-btn"
            onClick={toggleLocale}
            aria-label="Switch language"
            title="Switch language"
          >
            <Languages size={16} />
            <span>{t('header.langSwitch')}</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="header__link"
            aria-label="GitHub"
          >
            <Globe size={20} />
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <p className="footer__text">
          Made with <Heart size={14} className="footer__heart" /> · {t('footer.copyright')}
        </p>
        <p className="footer__text footer__text--muted">
          {t('footer.slogan')}
        </p>
      </div>
    </footer>
  );
}
