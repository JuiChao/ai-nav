'use client';

import { createContext, useContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { TRANSLATIONS } from './translations';
import type { Locale } from './translations';

interface LocaleContextValue {
  locale: Locale;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children, initialLocale }: { children: ReactNode; initialLocale: Locale }) {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /zh/blog

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === initialLocale) return;
    
    // Replace the current locale in the pathname
    // e.g. /zh/blog -> /en/blog
    // If pathname is just "/" or empty, redirect to "/{newLocale}"
    const newPath = pathname ? pathname.replace(/^\/(zh|en)/, `/${newLocale}`) : `/${newLocale}`;
    router.push(newPath);
  }, [initialLocale, pathname, router]);

  const toggleLocale = useCallback(() => {
    setLocale(initialLocale === 'zh' ? 'en' : 'zh');
  }, [initialLocale, setLocale]);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      let text = TRANSLATIONS[initialLocale]?.[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [initialLocale]
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale: initialLocale, toggleLocale, setLocale, t }),
    [initialLocale, toggleLocale, setLocale, t]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return ctx;
}

export type { Locale };
