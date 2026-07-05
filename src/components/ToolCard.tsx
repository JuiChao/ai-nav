'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import type { AiTool } from '@/types';
import { useLocale } from '@/i18n/LocaleContext';
import './ToolCard.css';

interface ToolCardProps {
  tool: AiTool;
  index?: number;
}

const CHAR_DELAY = 90; // 单字打字机延迟（毫秒），原版 130ms，此处调为 90ms 让翻页和浏览更流畅

/**
 * 完整复刻 Mimo 风格的工具展示卡片组件
 * 
 * 特色动效：
 * 1. 采用 Mimo 独创的 5 种雅致纸质暖色背景，按 index 循环分配。
 * 2. 滚动入场打字机效果：当卡片进入视口时，标题字符开始逐个显示，并尾随闪烁光标。
 * 3. 打字播放完成后，光标转换为 1 秒的无限呼吸闪烁。
 */
function ToolCard({ tool, index }: ToolCardProps) {
  const { locale, t } = useLocale();
  const [isIntersected, setIsIntersected] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const displayName = (locale === 'en' && tool.nameEn) ? tool.nameEn : tool.name;
  const description = locale === 'en' ? tool.descriptionEn : tool.description;
  const tags = locale === 'en' ? tool.tagsEn : tool.tags;

  // 使用 Array.from 完美兼容中英文字符、表情符号等 Unicode 字符的分割
  const chars = Array.from(displayName);

  // 1. 分配 Mimo 雅致背景色 (1 到 5)
  const bgIndex = index !== undefined 
    ? index 
    : (tool.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 5);
  const bgClass = `tool-card--bg-${(bgIndex % 5) + 1}`;

  // 2. 视口交叉监听
  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    // 支持 IntersectionObserver 的浏览器进行按需触发，否则直接显示全部字符
    if (!('IntersectionObserver' in window)) {
      setIsIntersected(true);
      setTypedCount(chars.length);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [chars.length]);

  // 3. 驱动打字机逻辑
  useEffect(() => {
    if (!isIntersected) return;
    if (typedCount >= chars.length) return;

    const timer = setTimeout(() => {
      setTypedCount((prev) => prev + 1);
    }, CHAR_DELAY);

    return () => clearTimeout(timer);
  }, [isIntersected, typedCount, chars.length]);

  const isDone = typedCount >= chars.length;

  return (
    <Link
      href={`/tool/${tool.id}`}
      className={`tool-card ${bgClass} ${tool.isFeatured ? 'tool-card--featured' : ''}`}
      id={`tool-${tool.id}`}
    >
      <div className="tool-card__header">
        <span className="tool-card__icon" role="img" aria-label={displayName}>
          {tool.icon}
        </span>
        <div className="tool-card__badges">
          {tool.isFree && <span className="tool-card__badge tool-card__badge--free">{t('tool.free')}</span>}
          {!tool.isFree && tool.hasFreeTrial && (
            <span className="tool-card__badge tool-card__badge--trial">{t('tool.freeTrial')}</span>
          )}
          {tool.isFeatured && (
            <span className="tool-card__badge tool-card__badge--hot">{t('tool.featured')}</span>
          )}
        </div>
      </div>

      {/* 滚动入场打字机效果标题 */}
      <h3 className="tool-card__name" ref={nameRef}>
        <span className="tool-card__chars">
          {chars.map((char, i) => (
            <span key={i} className={`char ${i < typedCount ? 'is-typed' : ''}`}>
              {char}
            </span>
          ))}
        </span>
        {isIntersected && (
          <span className={`cursor ${isDone ? 'is-done' : ''}`} aria-hidden="true" />
        )}
      </h3>

      <p className="tool-card__description">{description}</p>

      <div className="tool-card__tags">
        {tags.map((tag) => (
          <span key={tag} className="tool-card__tag">
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default ToolCard;
