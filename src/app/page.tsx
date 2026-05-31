import { getAllArticles, getAllCategories } from "@/lib/markdown";
import { ArticleCard } from "@/components/ArticleCard";
import Link from "next/link";
import { Search } from "lucide-react";

export default function Home() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  // For a simple static blog, we can just use the most recent as "Featured" if there's no specific flag,
  // or we can slice the first 2 as featured and the rest as latest.
  const featuredArticles = articles.slice(0, 2);
  const latestArticles = articles.slice(2, 8);

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="pt-20 pb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-foreground">
            Dev-Roy
          </h1>
          <p className="text-xl md:text-2xl text-muted font-light max-w-2xl">
            A minimalist space for thoughts on technology, engineering, and the pursuit of simplicity.
          </p>
        </div>
      </section>

      {/* Search */}
      <section>
        <form action="/articles" method="GET" className="relative max-w-xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted" />
            <input
              type="text"
              name="q"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all placeholder:text-muted"
            />
          </div>
        </form>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-6">Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/articles?category=${encodeURIComponent(category)}`}
                className="px-5 py-2.5 bg-card hover:bg-background border border-border hover:border-accent rounded-full text-sm font-medium transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured</h2>
            <Link href="/articles" className="text-accent hover:underline text-sm font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Articles */}
      {latestArticles.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold tracking-tight mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
