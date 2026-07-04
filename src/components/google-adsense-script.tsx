'use client';

import Script from 'next/script';

interface GoogleAdSenseScriptProps {
  publisherId?: string;
}

/**
 * Google AdSense 全局脚本加载组件
 * 
 * @param props.publisherId 可选的 Google AdSense 发布商 ID (如 ca-pub-xxxxxxxxxxxxxxx)
 * @returns 注入的 Script 脚本组件或 null
 */
export default function GoogleAdSenseScript({ publisherId }: GoogleAdSenseScriptProps) {
  const client = 'ca-pub-8921283801578142';

  // 如果没有配置发布商 ID，或者在非生产环境（开发环境）下，不加载 AdSense 真实脚本，避免无效请求
  if (!client || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
