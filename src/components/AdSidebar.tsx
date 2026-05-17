'use client';

import { ExternalLink, Megaphone } from 'lucide-react';
import type { AdSlot } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import './AdSidebar.css';

interface AdSidebarProps {
  ads: AdSlot[];
}

/**
 * 侧边栏广告组件
 * 在桌面端显示于工具列表右侧，移动端隐藏
 */
function AdSidebar({ ads }: AdSidebarProps) {
  const { locale, t } = useLocale();
  const sidebarAds = ads.filter((ad) => ad.position === 'sidebar');

  if (sidebarAds.length === 0) return null;

  return (
    <aside className="ad-sidebar" id="ad-sidebar">
      <div className="ad-sidebar__label">
        <Megaphone size={12} />
        <span>{t('ad.sidebarLabel')}</span>
      </div>

      {sidebarAds.map((ad) => {
        const title = locale === 'en' ? ad.titleEn : ad.title;
        const description = locale === 'en' ? ad.descriptionEn : ad.description;
        const sponsor = locale === 'en' ? ad.sponsorEn : ad.sponsor;

        return (
          <a
            key={ad.id}
            href={ad.linkUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="ad-sidebar__card"
            id={`ad-${ad.id}`}
          >
            <h4 className="ad-sidebar__title">{title}</h4>
            <p className="ad-sidebar__description">{description}</p>
            <span className="ad-sidebar__cta">
              {t('ad.sidebarCta')} <ExternalLink size={12} />
            </span>
            <span className="ad-sidebar__sponsor">{sponsor}</span>
          </a>
        );
      })}
    </aside>
  );
}

export default AdSidebar;
