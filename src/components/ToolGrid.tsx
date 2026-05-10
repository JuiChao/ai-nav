import type { AiTool } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import ToolCard from './ToolCard';
import './ToolGrid.css';

interface ToolGridProps {
  tools: AiTool[];
  title?: string;
  subtitle?: string;
}

/**
 * 工具网格布局组件
 * 自适应响应式网格，展示工具卡片列表
 */
function ToolGrid({ tools, title, subtitle }: ToolGridProps) {
  const { t } = useLocale();

  if (tools.length === 0) {
    return (
      <div className="tool-grid__empty" id="tool-grid-empty">
        <span className="tool-grid__empty-icon">🔍</span>
        <h3>{t('grid.empty.title')}</h3>
        <p>{t('grid.empty.description')}</p>
      </div>
    );
  }

  return (
    <section className="tool-grid" id="tool-grid">
      {(title || subtitle) && (
        <div className="tool-grid__header">
          {title && <h2 className="tool-grid__title">{title}</h2>}
          {subtitle && <p className="tool-grid__subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="tool-grid__list">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}

export default ToolGrid;
