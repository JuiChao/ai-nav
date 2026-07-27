'use client';

import Link, { LinkProps } from 'next/link';
import { useLocale } from '@/i18n/LocaleContext';
import { AnchorHTMLAttributes } from 'react';

type LocalizedLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>;

export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { locale } = useLocale();
  
  let localizedHref = href;
  
  if (typeof href === 'string') {
    if (href.startsWith('/')) {
      localizedHref = `/${locale}${href === '/' ? '' : href}`;
    }
  }

  return <Link href={localizedHref} {...props} />;
}
