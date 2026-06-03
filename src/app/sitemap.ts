import { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/markdown';

const SITE_URL = 'https://dev-roy-personal-space.pages.dev';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();

  const articleUrls = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const routes = [
    '',
    '/articles',
    '/portfolio',
    '/tags',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.7,
  }));

  return [...routes, ...articleUrls];
}
