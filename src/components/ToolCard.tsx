'use client';

import React from 'react';
import Link from '@/components/LocalizedLink';
import type { AiTool } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import { ArrowUpRight } from 'lucide-react';
import './ToolCard.css';

interface ToolCardProps {
  tool: AiTool;
  index?: number;
}

/**
 * 顶级艺术奖项水准的 AI 工具卡片
 * 特色：
 * 1. 独创 5 种日本/北欧宣纸质感暖色底色，按索引自然分配。
 * 2. 视口交互打字机动态字符入场。
 * 3. 悬浮时微倾斜物理提拉、微光掠影与外链折角箭头滑出。
 */
function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const { locale, t } = useLocale();

  const displayName = (locale === 'en' && tool.nameEn) ? tool.nameEn : tool.name;
  const description = locale === 'en' ? tool.descriptionEn : tool.description;
  const tags = locale === 'en' ? tool.tagsEn : tool.tags;

  // 分配雅致背景色 (1 到 5)
  const bgIndex = index !== undefined 
    ? index 
    : (tool.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5);
  const bgClass = `tool-card--bg-${(bgIndex % 5) + 1}`;

  return (
    <Link
      href={`/tool/${tool.id}`}
      prefetch={false}
      className={`tool-card ${bgClass} ${tool.isFeatured ? 'tool-card--featured' : ''}`}
      id={`tool-${tool.id}`}
      style={{ '--card-index': index } as React.CSSProperties}
    >
      <div className="tool-card__header">
        <div className="tool-card__icon-box">
          <span className="tool-card__icon" role="img" aria-label={displayName}>
            {tool.icon}
          </span>
        </div>
        <div className="tool-card__header-right">
          <div className="tool-card__badges">
            {tool.isFree && (
              <span className="tool-card__badge tool-card__badge--free">
                <span className="tool-card__badge-dot" />
                {t('tool.free')}
              </span>
            )}
            {!tool.isFree && tool.hasFreeTrial && (
              <span className="tool-card__badge tool-card__badge--trial">
                {t('tool.freeTrial')}
              </span>
            )}
            {tool.isFeatured && (
              <span className="tool-card__badge tool-card__badge--hot">
                ✦ {t('tool.featured')}
              </span>
            )}
          </div>
          <span className="tool-card__arrow-btn" aria-hidden="true">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      <h3 className="tool-card__name">
        {displayName}
      </h3>

      <p className="tool-card__description">{description}</p>

      <div className="tool-card__tags">
        {tags.map((tag) => (
          <span key={tag} className="tool-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default ToolCard;
