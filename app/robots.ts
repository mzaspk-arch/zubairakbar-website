import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  // Staging/preview servers set NEXT_PUBLIC_NOINDEX=1 so they never appear in Google
  if (process.env.NEXT_PUBLIC_NOINDEX === '1') return { rules: { userAgent: '*', disallow: '/' } };
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/'] }, sitemap: `${SITE.url}/sitemap.xml`, host: SITE.url };
}
