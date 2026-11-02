import Link from 'next/link';
import PageBanner from '@/components/PageBanner';
import Shell from '@/components/Shell';
import { TOPICS, getAllPosts, type Topic } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';
import { BRANDS, PRODUCTS } from '@/lib/site';

export const metadata = pageMeta({ title: 'Sitemap', description: 'Every page on zubairakbar.com in one place.', path: '/sitemap' });

export default function SitemapPage() {
  const posts = getAllPosts();
  return (
    <Shell active="none">
      <PageBanner crumbs={[{ name: 'Sitemap', href: '/sitemap' }]} title="Sitemap" intro="Every page on zubairakbar.com in one place." />
      <section className="section--tight bg-white">
        <div className="wrap sitemap-cols">
          <nav aria-label="Main pages">
            <h2>Main pages</h2>
            <ul>
              {[['/', 'Home'], ['/about', 'About'], ['/brands', 'Brands'], ['/business', 'Business'], ['/blog', 'Blog'], ['/contact', 'Contact']].map(([h, l]) => <li key={h}><Link href={h}>{l}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="Blog">
            <h2>Blog</h2>
            <ul>
              {(Object.keys(TOPICS) as Topic[]).map((t) => <li key={t}><Link href={`/blog/${t}`}>{TOPICS[t].name}</Link></li>)}
              {posts.map((p) => <li key={p.slug}><Link href={`/blog/${p.topic}/${p.slug}`}>{p.title}</Link></li>)}
            </ul>
          </nav>
          <nav aria-label="SaaS and brands">
            <h2>SaaS &amp; brands</h2>
            <ul>
              {PRODUCTS.map((p) => <li key={p.slug}><a href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer">{p.name}</a></li>)}
              {BRANDS.map((b) => <li key={b.name}><a href={b.sites[0].url} target="_blank" rel="noopener noreferrer">{b.name}</a></li>)}
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h2>Legal</h2>
            <ul>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
              <li><Link href="/terms">Terms &amp; Conditions</Link></li>
              <li><a href="/sitemap.xml">XML sitemap</a></li>
            </ul>
          </nav>
        </div>
      </section>
    </Shell>
  );
}
