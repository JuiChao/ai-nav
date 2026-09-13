import fs from 'fs';
import path from 'path';
import { AI_TOOLS } from '../src/data/tools';
import { CATEGORIES } from '../src/data/categories';
import { BLOG_POSTS } from '../src/data/blog';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://958000.xyz';
const locales = ['zh', 'en'];

function createUrlEntry(path: string, priority: string, changefreq: string = 'weekly') {
  let entries = '';
  const lastmod = new Date().toISOString();
  
  for (const locale of locales) {
    const cleanPath = path ? (path.endsWith('/') ? path : `${path}/`) : '/';
    const loc = `${siteUrl}/${locale}${cleanPath}`;
    
    let alternates = '';
    for (const altLocale of locales) {
      const altUrl = `${siteUrl}/${altLocale}${cleanPath}`;
      const lang = altLocale === 'zh' ? 'zh-CN' : altLocale;
      alternates += `\n    <xhtml:link rel="alternate" hreflang="${lang}" href="${altUrl}"/>`;
    }

    entries += `  <url>
    <loc>${loc}</loc>${alternates}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  }
  return entries;
}

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  // Home
  xml += createUrlEntry('', '1.0', 'daily');

  // Static Pages
  const staticPages = ['/about', '/privacy', '/terms', '/contact', '/blog'];
  staticPages.forEach((page) => {
    xml += createUrlEntry(page, '0.7', 'weekly');
  });

  // Blogs
  BLOG_POSTS.forEach((post) => {
    xml += createUrlEntry(`/blog/${post.slug}`, '0.8', 'monthly');
  });

  // Tools
  AI_TOOLS.forEach((tool) => {
    xml += createUrlEntry(`/tool/${tool.id}`, '0.8', 'weekly');
  });

  // Categories
  CATEGORIES.forEach((category) => {
    xml += createUrlEntry(`/category/${category.id}`, '0.9', 'weekly');
  });

  xml += `</urlset>`;

  const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');
  console.log(`[Sitemap] Generated ${publicPath}`);
}

generateSitemap();

