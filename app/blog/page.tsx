import Link from 'next/link';
import BlogList from '@/components/BlogList';
import PageBanner from '@/components/PageBanner';
import Shell from '@/components/Shell';
import TopicCards from '@/components/TopicCards';
import { TOPICS, getAllPosts, formatDate, type Post, type PostMeta, type Topic } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Blog — UAE Tax, Pakistan Tax, SaaS & AI Automation',
  description: 'Plain-language articles on UAE Corporate Tax, VAT and Excise, Pakistan taxation, building SaaS and AI automation — from a practising Tax Agent and Group CFO.',
  path: '/blog',
});

const meta = ({ html: _h, headings: _hd, ...m }: Post): PostMeta => m;

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured] = posts;
  return (
    <Shell active="blog">
      <PageBanner
        crumbs={[{ name: 'Blog', href: '/blog' }]}
        title={<>Insights on <span className="hl">tax, SaaS &amp; AI</span></>}
        intro="Plain-language articles on UAE Corporate Tax, VAT and Excise, Pakistan taxation, building SaaS and AI automation — from a practitioner."
      />

      {featured && (
        <section className="section--tight bg-white">
          <div className="wrap">
            <article className="card card--line venture" style={{ border: 0 }}>
              <Link href={`/blog/${featured.topic}/${featured.slug}`} className={`post-cover post-cover--${featured.cover}`} style={{ flex: '1 1 340px', height: 'auto', minHeight: 260 }} tabIndex={-1} aria-hidden="true">
                <span className="label">{TOPICS[featured.topic].label}</span>
                <span className="kicker">{featured.kicker}</span>
                <span className="title">{featured.coverTitle}</span>
              </Link>
              <div className="venture__body" style={{ background: 'var(--off-white)' }}>
                <p className="p-card__tag" style={{ marginTop: 0 }}>Featured · {featured.category}</p>
                <h2 style={{ marginTop: 10, fontSize: 28, lineHeight: 1.3 }}>
                  <Link href={`/blog/${featured.topic}/${featured.slug}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>{featured.title}</Link>
                </h2>
                <p className="lead" style={{ marginTop: 14 }}>{featured.description}</p>
                <p className="post-card__meta" style={{ marginTop: 16 }}>Zubair Akbar · Updated {formatDate(featured.updated)} · {featured.readingTime}</p>
              </div>
            </article>
          </div>
        </section>
      )}

      <section className="section--tight bg-light">
        <div className="wrap">
          <h2 className="h2" style={{ marginTop: 0 }}>Latest <span className="hl">articles</span></h2>
          <div className="filters" style={{ marginTop: 24 }}>
            <Link className="pill is-active" href="/blog" aria-current="page">All</Link>
            {(Object.keys(TOPICS) as Topic[]).map((t) => <Link key={t} className="pill" href={`/blog/${t}`}>{TOPICS[t].short}</Link>)}
          </div>
          <BlogList posts={posts.map(meta)} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <p className="eyebrow">Browse by topic</p>
          <h2 className="h2">Four topics, <span className="hl">one practitioner</span></h2>
          <TopicCards />
        </div>
      </section>
    </Shell>
  );
}
