'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { AiTool, CategoryId } from '@/types';
import { AI_TOOLS } from '@/data/tools';

/**
 * 管理工具列表的搜索与筛选逻辑
 * 搜索同时匹配中英文字段，确保双语模式下都能正常检索
 */
export function useToolFilter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const filteredTools = useMemo<AiTool[]>(() => {
    let results = AI_TOOLS;

    // 按分类筛选
    if (activeCategory !== 'all') {
      results = results.filter((tool) => tool.category === activeCategory);
    }

    // 按搜索关键词筛选（同时匹配中英文名称、描述和标签）
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        (tool) =>
          tool.name.toLowerCase().includes(query) ||
          (tool.nameEn && tool.nameEn.toLowerCase().includes(query)) ||
          tool.description.toLowerCase().includes(query) ||
          tool.descriptionEn.toLowerCase().includes(query) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          tool.tagsEn.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return results;
  }, [searchQuery, activeCategory]);

  /** 动态热门推荐工具 (为了避免服务端渲染与客户端不一致导致的 Hydration Error，仅在客户端挂载后打乱) */
  const [featuredTools, setFeaturedTools] = useState<AiTool[]>([]);

  useEffect(() => {
    const featured = AI_TOOLS.filter((tool) => tool.isFeatured);
    // 随机打乱数组算法 (Fisher-Yates)
    const shuffled = [...featured];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    // 返回随机的 8 个（避免页面太长，保持新鲜感）
    setFeaturedTools(shuffled.slice(0, 8));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: CategoryId) => {
    setActiveCategory(category);
  }, []);

  return {
    searchQuery,
    activeCategory,
    filteredTools,
    featuredTools,
    handleSearch,
    handleCategoryChange,
    totalCount: AI_TOOLS.length,
  };
}
