'use client';

import { useState, useMemo, useCallback } from 'react';
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

  /** 热门推荐工具 */
  const featuredTools = useMemo<AiTool[]>(
    () => AI_TOOLS.filter((tool) => tool.isFeatured),
    []
  );

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
