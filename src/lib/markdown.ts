import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { readingTime } from 'reading-time-estimator';

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export interface ArticleData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags?: string[];
  author: string;
  image?: string;
  content: string;
  readingTime: string;
}

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  return fs.readdirSync(articlesDirectory);
}

export function getArticleBySlug(slug: string): ArticleData {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const estimatedReadTime = readingTime(content).text;

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date ? new Date(data.date).toISOString() : '',
    excerpt: data.excerpt || '',
    category: data.category || '',
    tags: data.tags || [],
    author: data.author || 'Roy',
    image: data.image || '',
    content: content,
    readingTime: estimatedReadTime,
  };
}

export function getAllArticles(): ArticleData[] {
  const slugs = getArticleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
  return articles;
}

export function getAllCategories(): string[] {
  const articles = getAllArticles();
  const categories = new Set(articles.map((article) => article.category).filter(Boolean));
  return Array.from(categories);
}
