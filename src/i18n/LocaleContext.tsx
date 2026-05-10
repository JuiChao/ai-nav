import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { TRANSLATIONS } from './translations';
import type { Locale } from './translations';

const LOCALE_STORAGE_KEY = 'ai-nav-locale';

/**
 * 检测用户首选语言
 * 优先级：localStorage > navigator.language > 默认 en
 * zh 开头的语言代码（zh-CN, zh-TW, zh-HK 等）匹配中文
 */
function detectLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'zh' || stored === 'en') return stored;

  const browserLang = navigator.language || '';
  return browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

interface LocaleContextValue {
  locale: Locale;
  /** 切换语言 */
  toggleLocale: () => void;
  /** 设置指定语言 */
  setLocale: (locale: Locale) => void;
  /**
   * 获取翻译文案
   * @param key 翻译键名
   * @param vars 插值变量，如 { count: 10 }
   */
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * 语言上下文 Provider
 * 包裹在 App 外层，为所有组件提供多语言能力
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'zh' ? 'en' : 'zh');
  }, [locale, setLocale]);

  /**
   * 翻译函数
   * 支持 {key} 形式的变量插值
   */
  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let text = TRANSLATIONS[locale][key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [locale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, toggleLocale, setLocale, t }),
    [locale, toggleLocale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * 获取当前语言环境的 Hook
 * 必须在 LocaleProvider 内部使用
 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}

export type { Locale };
