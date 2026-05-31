"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import type { ArticleData } from "@/lib/markdown";
import { Search } from "lucide-react";

export function ClientArticlesList({
  initialArticles,
  categories,
}: {
  initialArticles: ArticleData[];
  categories: string[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get("category") || "";
  const initialQuery = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync state if URL changes
  useEffect(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialQuery) setQuery(initialQuery);
  }, [initialCategory, initialQuery]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(query.toLowerCase()) || 
                            article.excerpt.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [initialArticles, query, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted text-sm"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-sm appearance-none sm:min-w-[200px] text-foreground cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-border rounded-2xl">
          <p className="text-muted">No articles found matching your criteria.</p>
          <button
            onClick={() => {
              setQuery("");
              setSelectedCategory("");
            }}
            className="mt-4 text-accent hover:underline text-sm font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
