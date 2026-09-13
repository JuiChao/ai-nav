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
      // 保留 hash 锚点（例如 /#hero）
      const [path, hash] = href.split('#');
      const cleanPath = path === '/' ? '' : path.replace(/\/+$/, '');
      const hashPart = hash ? `#${hash}` : '';
      localizedHref = `/${locale}${cleanPath}/${hashPart}`;
    }
  }

  return <Link href={localizedHref} {...props} />;
}
