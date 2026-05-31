import Link from "next/link";
import { format } from "date-fns";
import type { ArticleData } from "@/lib/markdown";

export function ArticleCard({ article }: { article: ArticleData }) {
  return (
    <Link href={`/articles/${article.slug}`} className="group block h-full">
      <article className="h-full flex flex-col p-6 bg-card rounded-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-sm overflow-hidden">
        {article.image && (
          <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden bg-muted flex-shrink-0">
            <img 
              src={article.image} 
              alt={article.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <div className="flex-grow">
          <div className="flex items-center space-x-2 text-xs text-muted mb-3">
          <time dateTime={article.date}>
            {format(new Date(article.date), "MMMM d, yyyy")}
          </time>
          <span>&middot;</span>
          <span>{article.readingTime}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
          {article.title}
        </h3>
        <p className="text-muted text-sm line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        {article.category && (
          <span className="inline-block px-3 py-1 bg-background text-foreground text-xs rounded-full border border-border mt-auto">
            {article.category}
          </span>
        )}
        </div>
      </article>
    </Link>
  );
}
