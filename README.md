# AI 导航 - 发现最好用的 AI 工具

精选收录各领域优质 AI 工具，涵盖对话、图像生成、视频创作、音频处理、编程开发、写作助手等 9 大分类，帮你快速找到提升效率的最佳方案。

## ✨ 功能特性

- 🔍 **智能搜索** — 支持按名称、描述、标签搜索 AI 工具
- 📂 **分类导航** — 9 大分类快速筛选（AI 对话、图像生成、视频创作等）
- 🌐 **中英双语** — 完整的中英文界面切换，自动检测浏览器语言
- 📝 **深度博客** — 从 Markdown 文件读取的双语深度文章，独立路由可被搜索引擎索引
- 📊 **广告系统** — 支持横幅、内联和侧边栏三种广告位
- ⚡ **SSG 静态生成** — Next.js 构建时预渲染，首屏加载极快
- 🎯 **SEO 优化** — 每篇文章自动生成 title、description、Open Graph 元数据

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| **Next.js 16** | React 框架，App Router + 静态导出 |
| **React 19** | UI 组件库 |
| **TypeScript** | 类型安全 |
| **CSS** | 原生 CSS 样式，深色科技风设计 |
| **gray-matter** | Markdown frontmatter 解析 |
| **Lucide React** | 图标库 |
| **Cloudflare Pages** | 静态站点托管 |

## 📁 项目结构

```
ai-nav/
├── blog/                    # 博客 Markdown 文件
│   ├── zh/                  # 中文文章
│   └── en/                  # 英文文章
├── public/                  # 静态资源
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   ├── globals.css      # 全局样式
│   │   └── blog/[slug]/     # 博客详情页（动态路由）
│   ├── components/          # React 组件
│   ├── data/                # 工具、分类、广告数据
│   ├── hooks/               # 自定义 Hooks
│   ├── i18n/                # 国际化（翻译文案 + Context）
│   ├── lib/                 # 工具库（Markdown 读取）
│   └── types/               # TypeScript 类型定义
├── next.config.ts           # Next.js 配置
├── tsconfig.json            # TypeScript 配置
└── package.json
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 构建

```bash
npm run build
```

静态文件输出到 `out/` 目录。

## 📝 添加博客文章

1. 在 `blog/zh/` 和 `blog/en/` 中创建对应的 Markdown 文件
2. 文件名格式：`序号-slug.md`（如 `06-my-new-article.md`）
3. 添加 frontmatter 头信息：

```markdown
---
title: "文章标题"
description: "文章摘要"
keywords: ["关键词1", "关键词2"]
date: "2026-05-17"
author: "AI 导航编辑部"
category: "AI 对话"
---

# 文章正文...
```

4. 重新构建即可自动生成新文章的静态页面。

## 🌍 部署

项目部署在 **Cloudflare Pages**，配置：

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `npm run build` |
| 输出目录 | `out` |
| Node.js 版本 | 18+ |

## 📜 许可证

MIT License
