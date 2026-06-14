'use client';

import { useState } from 'react';
import { useLocale } from '@/i18n/LocaleContext';
import './Terminal.css';

/**
 * 完整复刻 Mimo 风格的 Terminal 命令行组件
 */
function Terminal() {
  const { t } = useLocale();
  const [isCopied, setIsCopied] = useState(false);
  const cmdText = t('hero.terminalCmd');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(cmdText);
      } else {
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = cmdText;
        textArea.style.position = 'fixed';
        textArea.style.top = '-1000px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (err) {
      console.error('Copy failed: ', err);
    }
  };

  return (
    <div
      className="terminal"
      role="presentation"
    >
      <span className="terminal__cmd">
        <span className="terminal__prompt">&gt;_</span>
        {cmdText}
      </span>
      <button
        className={`terminal__copy ${isCopied ? 'is-copied' : ''}`}
        type="button"
        onClick={handleCopy}
        aria-label="Copy Command"
      >
        <svg
          className="terminal__copy-icon terminal__copy-icon--copy"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          className="terminal__copy-icon terminal__copy-icon--check"
          viewBox="0 0 18 18"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M4 9.5 L7.5 13 L14 5.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span className="terminal__copy-tooltip" aria-hidden="true">
          {isCopied ? '已复制' : '复制'}
        </span>
      </button>
    </div>
  );
}

export default Terminal;
