'use client';

import { Search, X } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

/**
 * 搜索栏组件
 * 支持实时搜索并显示结果数量
 */
function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  const { t } = useLocale();

  return (
    <div className="search-bar" id="search-bar">
      <div className="search-bar__inner">
        <Search className="search-bar__icon" size={20} />
        <input
          id="search-input"
          type="text"
          className="search-bar__input"
          placeholder={t('search.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
        />
        {value && (
          <button
            className="search-bar__clear"
            onClick={() => onChange('')}
            aria-label={t('search.clear')}
          >
            <X size={16} />
          </button>
        )}
      </div>
      {value && (
        <span className="search-bar__count">
          {t('search.resultCount', { count: resultCount })}
        </span>
      )}
    </div>
  );
}

export default SearchBar;
