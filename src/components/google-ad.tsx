'use client';

import { useEffect, useRef } from 'react';
import { Megaphone } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';
import './google-ad.css';

interface GoogleAdProps {
  /** 广告位 ID (数字串) */
  slot: string;
  /** 广告位置类型，决定预留的最小高度 */
  position: 'banner' | 'inline' | 'sidebar';
  /** 广告展现格式 */
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  /** 是否支持自适应宽度 */
  responsive?: boolean;
  /** 外部样式 */
  className?: string;
  /** 自定义 CSS 样式 */
  style?: React.CSSProperties;
}

/**
 * Google AdSense 广告单元展示组件
 * 支持开发环境占位图显示，并且在生产环境通过优雅的 useEffect 触发 adsbygoogle 渲染。
 */
export default function GoogleAd({
  slot,
  position,
  format = 'auto',
  responsive = true,
  className = '',
  style,
}: GoogleAdProps) {
  const { t } = useLocale();
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PID;
  const isDev = process.env.NODE_ENV !== 'production';

  useEffect(() => {
    // 仅在生产环境且配置了发布商 ID 时初始化广告
    if (isDev || !publisherId || initialized.current) return;

    try {
      // 确认页面上存在对应的广告元素且 adsbygoogle 脚本已加载
      if (typeof window !== 'undefined') {
        const adsbygoogle = (window as any).adsbygoogle || [];
        adsbygoogle.push({});
        initialized.current = true;
      }
    } catch (error) {
      console.error('Google AdSense 初始化失败:', error);
    }
  }, [isDev, publisherId]);

  // 1. 如果是开发模式，显示设计精美的玻璃质感广告占位符，支持悬浮动效，增强开发体验
  if (isDev) {
    return (
      <div className={`google-ad-container google-ad-container--${position} ${className}`} style={style}>
        <div className="google-ad-placeholder">
          <Megaphone className="google-ad-placeholder__icon" size={24} />
          <div className="google-ad-placeholder__title">
            {t('google.ad.dev_mode', { slot })}
          </div>
          <div className="google-ad-placeholder__details">
            Position: {position} | Format: {format} | Responsive: {String(responsive)}
          </div>
        </div>
      </div>
    );
  }

  // 2. 如果生产环境下未配置发布商 ID 或广告位 ID，则静默不渲染任何组件，避免影响整体布局
  if (!publisherId || !slot) {
    return null;
  }

  return (
    <div
      className={`google-ad-container google-ad-container--${position} ${className}`}
      style={style}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '100%', ...style }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
