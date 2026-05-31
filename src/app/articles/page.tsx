import { getAllArticles, getAllCategories } from "@/lib/markdown";
import { ClientArticlesList } from "./ClientArticlesList";
import { Suspense } from "react";

export const metadata = {
  title: "Articles",
  description: "Read all articles from Dev-Roy.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const categories = getAllCategories();

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight">All Articles</h1>
        <p className="text-xl text-muted font-light">
          Search and filter through the archive.
        </p>
      </div>

      <Suspense fallback={<div>Loading articles...</div>}>
        <ClientArticlesList initialArticles={articles} categories={categories} />
      </Suspense>
    </div>
  );
}
