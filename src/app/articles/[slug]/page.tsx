import { getArticleBySlug, getArticleSlugs, getRelatedArticles, extractHeadings } from "@/lib/markdown";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User, Tag } from "lucide-react";
import type { Metadata } from "next";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { ArticleCard } from "@/components/ArticleCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AuthorBox } from "@/components/AuthorBox";
import { GiscusComments } from "@/components/GiscusComments";
import { Newsletter } from "@/components/Newsletter";
import type { Components } from "react-markdown";

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: article.image ? [article.image] : [],
    },
  };
}

// Heading ID generator (must match extractHeadings in markdown.ts)
function toId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Custom ReactMarkdown components that add IDs to headings
const markdownComponents: Components = {
  h2: ({ children }) => {
    const text = String(children);
    return (
      <h2 id={toId(text)} className="scroll-mt-24">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const text = String(children);
    return (
      <h3 id={toId(text)} className="scroll-mt-24">
        {children}
      </h3>
    );
  },
  img: ({ src, alt }) => (
    <img
      src={src}
      alt={alt}
      className="rounded-xl w-full my-6 border border-border"
      loading="lazy"
    />
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="text-accent hover:underline"
    >
      {children}
    </a>
  ),
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const headings = extractHeadings(article.content);
  const relatedArticles = getRelatedArticles(article.slug, article.category);

  return (
    <>
      <ReadingProgressBar />

      <article className="max-w-3xl mx-auto py-10">

        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/articles" className="hover:text-foreground transition-colors">Articles</Link>
          {article.category && (
            <>
              <span>/</span>
              <Link
                href={`/articles?category=${encodeURIComponent(article.category)}`}
                className="hover:text-foreground transition-colors capitalize"
              >
                {article.category}
              </Link>
            </>
          )}
        </nav>

        {/* ── HEADER ── */}
        <header className="mb-10">
          {article.category && (
            <div className="mb-4">
              <Link
                href={`/articles?category=${encodeURIComponent(article.category)}`}
                className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20 hover:bg-accent/20 transition-colors"
              >
                {article.category}
              </Link>
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted mb-8">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={article.date}>
                {format(new Date(article.date), "MMMM d, yyyy")}
              </time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readingTime}
            </span>
          </div>

          {/* Featured image */}
          {article.image && (
            <div className="relative w-full h-[300px] sm:h-[420px] rounded-3xl overflow-hidden bg-muted border border-border shadow-sm mb-10">
              <img
                src={article.image}
                alt={article.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}
        </header>

        {/* ── TABLE OF CONTENTS ── */}
        <TableOfContents headings={headings} />

        {/* ── TOP AD SLOT ── */}
        <AdPlaceholder />

        {/* ── CONTENT ── */}
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-accent hover:prose-a:text-accent/80 prose-img:rounded-xl prose-headings:scroll-mt-24">
          <ReactMarkdown components={markdownComponents}>
            {article.content}
          </ReactMarkdown>
        </div>

        {/* ── TAGS ── */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted flex-shrink-0" />
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-card text-xs text-muted font-medium rounded-full border border-border hover:border-accent hover:text-foreground transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ── SHARE BUTTONS ── */}
        <div className="mt-10 pt-8 border-t border-border">
          <ShareButtons title={article.title} slug={article.slug} />
        </div>

        {/* ── BACK BUTTON ── */}
        <div className="mt-10">
          <Link
            href="/articles"
            className="inline-flex items-center text-sm font-medium text-muted hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>
        </div>

        {/* ── AUTHOR BOX ── */}
        <AuthorBox author={article.author} />

        {/* ── BOTTOM AD SLOT ── */}
        <AdPlaceholder />

        {/* ── NEWSLETTER ── */}
        <Newsletter />

        {/* ── COMMENTS ── */}
        <GiscusComments />
      </article>

      {/* ── RELATED ARTICLES ── */}
      {relatedArticles.length > 0 && (
        <section className="max-w-3xl mx-auto py-10 border-t border-border mt-4">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((related) => (
              <ArticleCard key={related.slug} article={related} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
