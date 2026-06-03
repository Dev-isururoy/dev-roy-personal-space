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
  // Decode URL-encoded characters (e.g. Sinhala, Arabic, etc.) so the filename lookup works correctly
  const decodedSlug = decodeURIComponent(slug);
  const realSlug = decodedSlug.replace(/\.md$/, '');
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

export function getAllTags(): { tag: string; count: number }[] {
  const articles = getAllArticles();
  const tagCount: Record<string, number> = {};
  articles.forEach((article) => {
    (article.tags || []).forEach((tag) => {
      if (tag) tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function getRelatedArticles(currentSlug: string, category: string, limit = 3): ArticleData[] {
  return getAllArticles()
    .filter((a) => a.slug !== currentSlug && a.category === category)
    .slice(0, limit);
}

export function extractHeadings(content: string): { id: string; text: string; level: number }[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: { id: string; text: string; level: number }[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}
