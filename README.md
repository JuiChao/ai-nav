# AI 导航 - 发现最好用的 AI 工具

精选收录各领域优质 AI 工具，涵盖对话、图像生成、视频创作、音频处理、编程开发、写作助手等 9 大分类，帮你快速找到提升效率的最佳方案。

## ✨ 功能特性

- 🔍 **智能搜索** — 支持按名称、描述、标签搜索 AI 工具
- 📂 **分类导航** — 9 大分类快速筛选（AI 对话、图像生成、视频创作等）
- 🌐 **中英双语** — 完整的中英文界面切换，自动检测浏览器语言
- 📊 **广告系统** — 支持横幅、内联和侧边栏三种广告位
- ⚡ **SSG 静态生成** — Next.js 构建时预渲染，首屏加载极快
- 🎯 **SEO 优化** — 自动生成 title、description、Open Graph 元数据
- 🎨 **明亮清新主题** — 白色卡片、柔和阴影、清新蓝紫色系设计

## 🛠 技术栈

| 技术 | 用途 |
|------|------|
| **Next.js 16** | React 框架，App Router + 静态导出 |
| **React 19** | UI 组件库 |
| **TypeScript** | 类型安全 |
| **CSS** | 原生 CSS 样式，明亮清新风设计 |
| **Lucide React** | 图标库 |
| **Cloudflare Pages** | 静态站点托管 |

## 📁 项目结构

```
ai-nav/
├── public/                  # 静态资源
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # 根布局
│   │   ├── page.tsx         # 首页
│   │   ├── home-page-content.tsx  # 首页客户端组件
│   │   ├── globals.css      # 全局样式与设计变量
│   │   └── page.css         # 首页布局样式
│   ├── components/          # React 组件
│   ├── data/                # 工具、分类、广告数据
│   ├── hooks/               # 自定义 Hooks
│   ├── i18n/                # 国际化（翻译文案 + Context）
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

## 🌍 部署

项目部署在 **Cloudflare Pages**，配置：

| 配置项 | 值 |
|--------|-----|
| 构建命令 | `npm run build` |
| 输出目录 | `out` |
| Node.js 版本 | 18+ |

## 📜 许可证

MIT License
