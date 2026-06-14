'use client';

import { useRef, useEffect } from 'react';
import './CursorReveal.css';

/**
 * 完整复刻 MiMo 风格的鼠标水墨擦除背景效果组件
 * 
 * 实现原理：
 * 1. 底层是一张丰富色彩的背景图（比如古风水墨画）。
 * 2. 顶层是一个 Canvas 遮罩层，初始用纯色 #FCFAF8 填满覆盖。
 * 3. 鼠标在 Hero 区域移动时，沿着轨迹生成带随机生命周期和随机大小的 stamp（粒子）。
 * 4. 利用 Canvas 32段正弦波叠加抖动算法，生成不规则毛糙的水墨粒子羽化笔迹。
 * 5. 使用 destination-out 混合模式擦除顶层遮罩，露出底图。
 * 6. 在 requestAnimationFrame 循环中，每次重绘底色（极低 Alpha）以实现缓缓闭合自愈，直到 stamps 队列清空时自动暂停以节省性能。
 */

const MASK_RGB = '252, 250, 248'; // 对应 #FCFAF8
const R_START = 8;
const R_END = 128;
const R_VARY = 0.45;
const LIFETIME = 520; // ms
const STAMP_STEP = 12; // 粒子间距
const MAX_STAMPS = 160;

interface Stamp {
  x: number;
  y: number;
  born: number;
  seed: number;
  rmax: number;
}

function CursorReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stampsRef = useRef<Stamp[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const runningRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const hero = document.getElementById('hero');
    if (!hero) return;

    // 仅在有鼠标指针的设备上执行
    const canHover = window.matchMedia('(hover: hover)').matches;
    if (!canHover) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    // 重新计算并渲染 Canvas 大小
    const resize = () => {
      const rect = hero.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgb(${MASK_RGB})`;
      ctx.fillRect(0, 0, w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    // 添加单个水墨擦除 stamp
    const addStamp = (x: number, y: number) => {
      const stamps = stampsRef.current;
      if (stamps.length >= MAX_STAMPS) {
        stamps.shift();
      }
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
      });
    };

    // 沿鼠标运动路径插值添加 stamp，保证快速划过时不出现断点
    const stampAlong = (x: number, y: number) => {
      const lastPos = lastPosRef.current;
      if (!lastPos) {
        addStamp(x, y);
      } else {
        const dx = x - lastPos.x;
        const dy = y - lastPos.y;
        const dist = Math.hypot(dx, dy);
        const steps = Math.max(1, Math.ceil(dist / STAMP_STEP));
        for (let i = 1; i <= steps; i++) {
          addStamp(lastPos.x + (dx * i) / steps, lastPos.y + (dy * i) / steps);
        }
      }
      lastPosRef.current = { x, y };
    };

    // 核心算法：生成带 32 分段正弦波叠加抖动的水墨粒子羽化边缘
    const carveInk = (x: number, y: number, r: number, alpha: number, seed: number) => {
      const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r);
      g.addColorStop(0, `rgba(0, 0, 0, ${0.95 * alpha})`);
      g.addColorStop(0.55, `rgba(0, 0, 0, ${0.88 * alpha})`);
      g.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = g;
      ctx.beginPath();
      
      const segs = 32;
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2;
        // 叠加三组不同频率的正弦波，模拟墨迹在宣纸纤维中渗透扩散的随机毛糙感
        const wob =
          0.78 +
          0.14 * Math.sin(a * 3 + seed) +
          0.08 * Math.sin(a * 7 + seed * 2.1) +
          0.05 * Math.sin(a * 13 + seed * 0.7);
        const rr = r * wob;
        const px = x + Math.cos(a) * rr;
        const py = y + Math.sin(a) * rr;
        
        if (i === 0) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
      ctx.fill();
    };

    // 动效自愈循环
    const loop = () => {
      const now = performance.now();
      const stamps = stampsRef.current;

      // 1. 先将 Canvas 整体用源覆盖模式 (source-over) 重新覆上一层极淡的底色 (模拟墨迹褪去自愈)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgb(${MASK_RGB})`;
      ctx.fillRect(0, 0, w, h);

      // 2. 将擦除笔触设为 destination-out 混合模式，把之前画过且还在生命周期内的 stamp 重新擦掉
      ctx.globalCompositeOperation = 'destination-out';
      for (let i = stamps.length - 1; i >= 0; i--) {
        const stamp = stamps[i];
        const t = (now - stamp.born) / LIFETIME;
        if (t >= 1) {
          stamps.splice(i, 1);
          continue;
        }

        // easeOutCubic 扩大特效
        const ease = 1 - Math.pow(1 - t, 3);
        const r = R_START + (stamp.rmax - R_START) * ease;
        const alpha = 1 - t * t; // 慢慢淡出

        carveInk(stamp.x, stamp.y, r, alpha, stamp.seed);
      }

      // 3. 如果依然有活跃 stamp，继续循环，否则自动暂停
      if (stamps.length > 0) {
        requestAnimationFrame(loop);
      } else {
        runningRef.current = false;
      }
    };

    // 开启循环
    const startLoop = () => {
      if (!runningRef.current) {
        runningRef.current = true;
        requestAnimationFrame(loop);
      }
    };

    // 鼠标事件监听
    const handleMouseEnter = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      lastPosRef.current = { x, y };
      stampAlong(x, y);
      startLoop();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      stampAlong(x, y);
      startLoop();
    };

    const handleMouseLeave = () => {
      lastPosRef.current = null;
    };

    hero.addEventListener('mouseenter', handleMouseEnter);
    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      hero.removeEventListener('mouseenter', handleMouseEnter);
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="cursor-reveal" aria-hidden="true">
      {/* 底层：水墨山水绚彩画背景 */}
      <div className="cursor-reveal__bg" />
      {/* 顶层：Canvas 遮罩 */}
      <canvas ref={canvasRef} className="cursor-reveal__overlay" />
    </div>
  );
}

export default CursorReveal;
