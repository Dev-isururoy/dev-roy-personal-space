import { getAllTags, getAllArticles } from "@/lib/markdown";
import Link from "next/link";
import type { Metadata } from "next";
import { Tag } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse articles by topic.",
};

export default async function TagsPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const tags = getAllTags();
  const allArticles = getAllArticles();
  
  // Get selected tag from query params (e.g. /tags?tag=networking)
  const selectedTagParam = searchParams.tag;
  const selectedTag = typeof selectedTagParam === 'string' ? selectedTagParam : null;

  // Filter articles by selected tag
  const filteredArticles = selectedTag 
    ? allArticles.filter(article => article.tags?.includes(selectedTag))
    : [];

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tags</h1>
        <p className="text-xl text-muted font-light leading-relaxed">
          Explore topics I've written about.
        </p>
      </header>

      {/* Tags Cloud */}
      <section className="bg-card p-8 rounded-3xl border border-border">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {tags.map(({ tag, count }) => {
            const isSelected = selectedTag === tag;
            return (
              <Link
                key={tag}
                href={isSelected ? "/tags" : `/tags?tag=${encodeURIComponent(tag)}`}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  isSelected 
                    ? "bg-accent text-white border-accent shadow-md scale-105" 
                    : "bg-background text-muted border-border hover:border-accent hover:text-foreground"
                }`}
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
                <span className={`px-2 py-0.5 rounded-full text-xs ${isSelected ? "bg-white/20" : "bg-card text-muted"}`}>
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Filtered Results */}
      {selectedTag && (
        <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              <span className="text-muted font-normal">Showing articles tagged with:</span> 
              <span className="text-accent">#{selectedTag}</span>
            </h2>
            <Link href="/tags" className="text-sm font-medium text-muted hover:text-foreground">
              Clear filter ✕
            </Link>
          </div>
          
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <p className="text-muted">No articles found for this tag.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
