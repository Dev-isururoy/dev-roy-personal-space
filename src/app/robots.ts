import { MetadataRoute } from 'next';

const SITE_URL = 'https://dev-roy-personal-space.pages.dev';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/'], // Hide decap CMS admin route from search engines
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
