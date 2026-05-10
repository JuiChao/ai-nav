import {
  Grid3X3,
  MessageCircle,
  ImageIcon,
  Video,
  Headphones,
  PenTool,
  Code,
  Zap,
  Palette,
  BarChart3,
} from 'lucide-react';
import type { CategoryId } from '../types';
import { useLocale } from '../i18n/LocaleContext';
import { CATEGORIES } from '../data/categories';
import './CategoryNav.css';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onCategoryChange: (category: CategoryId) => void;
}

/**
 * 图标名称到 Lucide 组件的映射
 * NOTE: 使用显式映射而非动态导入，以确保 Tree Shaking 有效
 */
const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  'grid': Grid3X3,
  'message-circle': MessageCircle,
  'image': ImageIcon,
  'video': Video,
  'headphones': Headphones,
  'pen-tool': PenTool,
  'code': Code,
  'zap': Zap,
  'palette': Palette,
  'bar-chart-3': BarChart3,
};

/**
 * 分类导航组件
 * 横向可滚动的分类选项卡，根据当前语言显示中文或英文名称
 */
function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const { locale } = useLocale();

  return (
    <nav className="category-nav" id="category-nav" aria-label="Tool categories">
      <div className="category-nav__list">
        {CATEGORIES.map((category) => {
          const IconComponent = ICON_MAP[category.icon];
          const isActive = activeCategory === category.id;
          const displayName = locale === 'en' ? category.nameEn : category.name;
          const displayDesc = locale === 'en' ? category.descriptionEn : category.description;

          return (
            <button
              key={category.id}
              id={`category-${category.id}`}
              className={`category-nav__item ${isActive ? 'category-nav__item--active' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              title={displayDesc}
              aria-pressed={isActive}
            >
              {IconComponent && <IconComponent size={18} />}
              <span>{displayName}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default CategoryNav;
