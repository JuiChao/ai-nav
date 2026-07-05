import type { NextConfig } from 'next';

/**
 * Next.js 配置
 * 使用静态导出模式，部署到 Cloudflare Pages
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // NOTE: 静态导出不支持 Next.js 内置图片优化，需要禁用
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
