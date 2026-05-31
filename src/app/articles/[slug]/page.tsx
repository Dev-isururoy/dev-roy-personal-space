import { getArticleBySlug, getArticleSlugs } from "@/lib/markdown";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  return (
    <article className="max-w-3xl mx-auto py-10">
      <Link href="/articles" className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors mb-10 group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to articles
      </Link>

      <header className="mb-14 text-center">
        {article.category && (
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-card text-muted text-xs font-medium rounded-full border border-border">
              {article.category}
            </span>
          </div>
        )}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
          {article.title}
        </h1>
        <div className="flex items-center justify-center space-x-2 text-sm text-muted mb-10">
          <time dateTime={article.date}>
            {format(new Date(article.date), "MMMM d, yyyy")}
          </time>
          <span>&middot;</span>
          <span>{article.readingTime}</span>
          <span>&middot;</span>
          <span>By {article.author}</span>
        </div>
        {article.image && (
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-14 bg-muted border border-border shadow-sm">
            <img 
              src={article.image} 
              alt={article.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      </header>

      {/* 
        Tailwind Typography plugin is used here via prose class.
        In Tailwind v4, prose is part of @tailwindcss/typography.
      */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      {article.tags && article.tags.length > 0 && (
        <div className="mt-16 pt-8 border-t border-border">
          <h3 className="text-sm font-semibold mb-4 text-muted uppercase tracking-wider">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-card text-xs text-foreground rounded-full border border-border">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
