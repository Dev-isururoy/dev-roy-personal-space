import { getAllTags, getAllArticles } from "@/lib/markdown";
import type { Metadata } from "next";
import { TagsFilter } from "@/components/TagsFilter";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tags",
  description: "Browse articles by topic.",
};

export default function TagsPage() {
  const tags = getAllTags();
  const allArticles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-16">
      <header className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tags</h1>
        <p className="text-xl text-muted font-light leading-relaxed">
          Explore topics I've written about.
        </p>
      </header>

      <Suspense fallback={<div className="h-32 bg-card rounded-3xl animate-pulse" />}>
        <TagsFilter tags={tags} articles={allArticles} />
      </Suspense>
    </div>
  );
}
