'use client';

import { ExternalLink, Megaphone } from 'lucide-react';
import type { AdSlot } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import './AdBanner.css';

interface AdBannerProps {
  ad: AdSlot;
}

/**
 * 横幅广告组件
 * 用于页面顶部或内容区域的大幅广告展示，根据语言切换文案
 */
function AdBanner({ ad }: AdBannerProps) {
  const { locale, t } = useLocale();
  const title = locale === 'en' ? ad.titleEn : ad.title;
  const description = locale === 'en' ? ad.descriptionEn : ad.description;
  const sponsor = locale === 'en' ? ad.sponsorEn : ad.sponsor;

  return (
    <a
      href={ad.linkUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="ad-banner"
      id={`ad-${ad.id}`}
    >
      <div className="ad-banner__content">
        <div className="ad-banner__text">
          <h3 className="ad-banner__title">{title}</h3>
          <p className="ad-banner__description">{description}</p>
        </div>
        <span className="ad-banner__cta">
          {t('ad.cta')} <ExternalLink size={14} />
        </span>
      </div>
      <div className="ad-banner__sponsor">
        <Megaphone size={12} />
        <span>{t('ad.label')} · {sponsor}</span>
      </div>
    </a>
  );
}

export default AdBanner;
