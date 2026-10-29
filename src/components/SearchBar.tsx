'use client';

import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
}

/**
 * 奖项级交互搜索栏组件
 * 支持全局 ⌘K / Ctrl+K 聚焦快捷键、丝滑清空与动态结果计数
 */
function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  const { t } = useLocale();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMac, setIsMac] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      const isApple = /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || navigator.platform || '');
      setIsMac(isApple);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        const target = e.target as HTMLElement | null;
        if (target && target.tagName === 'INPUT' && target !== inputRef.current) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onChange('');
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onChange]);

  return (
    <div className="search-bar" id="search-bar">
      <div className="search-bar__inner">
        <Search className="search-bar__icon" size={18} aria-hidden="true" />
        <input
          ref={inputRef}
          id="search-input"
          type="text"
          className="search-bar__input"
          placeholder={t('search.placeholder')}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          spellCheck={false}
          aria-label={t('search.placeholder')}
        />
        {!value && (
          <kbd className="search-bar__kbd" title={isMac ? "Press ⌘K to search" : "Press Ctrl+K to search"}>
            <span className="search-bar__kbd-cmd">{isMac ? '⌘' : 'Ctrl '}</span>K
          </kbd>
        )}
        {value && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            aria-label={t('search.clear')}
          >
            <X size={14} />
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
