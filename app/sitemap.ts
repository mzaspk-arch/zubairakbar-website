import type { MetadataRoute } from 'next';
import { TOPICS, getAllPosts, getPostsByTopic, type Topic } from '@/lib/blog';
import { absoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updated ? new Date(posts[0].updated) : new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), changeFrequency: 'weekly', priority: 1, lastModified: latest },
    { url: absoluteUrl('/about'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/brands'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/business'), changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/blog'), changeFrequency: 'weekly', priority: 0.9, lastModified: latest },
    { url: absoluteUrl('/contact'), changeFrequency: 'yearly', priority: 0.6 },
    { url: absoluteUrl('/sitemap'), changeFrequency: 'monthly', priority: 0.3 },
    { url: absoluteUrl('/privacy-policy'), changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), changeFrequency: 'yearly', priority: 0.2 },
  ];
  // Only list topic pages that have articles (empty ones are noindex)
  const topics = (Object.keys(TOPICS) as Topic[])
    .filter((t) => getPostsByTopic(t).length > 0)
    .map((t) => ({ url: absoluteUrl(`/blog/${t}`), changeFrequency: 'weekly' as const, priority: 0.7 }));
  const articles = posts.map((p) => ({ url: absoluteUrl(`/blog/${p.topic}/${p.slug}`), lastModified: new Date(p.updated), changeFrequency: 'monthly' as const, priority: 0.7 }));
  return [...pages, ...topics, ...articles];
}
