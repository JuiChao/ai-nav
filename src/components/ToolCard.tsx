import { ExternalLink } from 'lucide-react';
import type { AiTool } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import './ToolCard.css';

interface ToolCardProps {
  tool: AiTool;
}

/**
 * 工具卡片组件
 * 展示单个 AI 工具的信息，根据语言切换描述、标签和徽章文案
 */
function ToolCard({ tool }: ToolCardProps) {
  const { locale, t } = useLocale();
  const displayName = (locale === 'en' && tool.nameEn) ? tool.nameEn : tool.name;
  const description = locale === 'en' ? tool.descriptionEn : tool.description;
  const tags = locale === 'en' ? tool.tagsEn : tool.tags;

  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`tool-card ${tool.isFeatured ? 'tool-card--featured' : ''}`}
      id={`tool-${tool.id}`}
    >
      <div className="tool-card__header">
        <span className="tool-card__icon" role="img" aria-label={tool.name}>
          {tool.icon}
        </span>
        <div className="tool-card__badges">
          {tool.isFree && <span className="tool-card__badge tool-card__badge--free">{t('tool.free')}</span>}
          {!tool.isFree && tool.hasFreeTrial && (
            <span className="tool-card__badge tool-card__badge--trial">{t('tool.freeTrial')}</span>
          )}
          {tool.isFeatured && (
            <span className="tool-card__badge tool-card__badge--hot">{t('tool.featured')}</span>
          )}
        </div>
      </div>

      <h3 className="tool-card__name">
        {displayName}
        <ExternalLink size={14} className="tool-card__link-icon" />
      </h3>

      <p className="tool-card__description">{description}</p>

      <div className="tool-card__tags">
        {tags.map((tag) => (
          <span key={tag} className="tool-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export default ToolCard;
