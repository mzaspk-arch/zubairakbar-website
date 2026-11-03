import Link from 'next/link';
import { notFound } from 'next/navigation';
import Faq from '@/components/Faq';
import { SocialIcon } from '@/components/Icons';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import PostCard from '@/components/PostCard';
import Shell from '@/components/Shell';
import { TOPICS, formatDate, getAllPosts, getPost } from '@/lib/blog';
import { PERSON_ID, faqLd, pageMeta } from '@/lib/seo';
import { absoluteUrl } from '@/lib/site';

export const dynamicParams = false;
export const generateStaticParams = () => getAllPosts().map((p) => ({ topic: p.topic, slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic, slug } = await params;
  const post = getPost(topic, slug);
  if (!post) return {};
  const path = `/blog/${post.topic}/${post.slug}`;
  return pageMeta({ title: post.title, description: post.description, path, type: 'article', image: `${path}/opengraph-image`, publishedTime: post.date, modifiedTime: post.updated });
}

export default async function ArticlePage({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic, slug } = await params;
  const post = getPost(topic, slug);
  if (!post) notFound();
  const t = TOPICS[post.topic];
  const path = `/blog/${post.topic}/${post.slug}`;
  const url = absoluteUrl(path);
  const toc = post.headings.filter((h) => h.id !== 'key-takeaways');
  if (post.faq.length) toc.push({ id: 'faq', text: 'FAQ' });
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const related = [...others.filter((p) => p.topic === post.topic), ...others.filter((p) => p.topic !== post.topic)].slice(0, 3);
  const isTax = post.topic === 'uae-tax' || post.topic === 'pakistan-tax';

  const share = [
    { k: 'linkedin' as const, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, label: 'LinkedIn' },
    { k: 'x' as const, href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}`, label: 'X' },
    { k: 'facebook' as const, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, label: 'Facebook' },
  ];

  return (
    <Shell active="blog">
      <PageBanner
        crumbs={[{ name: 'Blog', href: '/blog' }, { name: t.short, href: `/blog/${post.topic}` }, { name: post.coverTitle, href: path }]}
        label={`${t.label} · ${post.category}`}
        title={post.title}
      >
        <p className="banner__date">
          Zubair Akbar · FTA-approved Tax Agent · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time> · {post.readingTime}
        </p>
      </PageBanner>

      <section className="section--tight bg-white">
        <div className="wrap article-layout">
          <article className="article">
            <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
            {isTax && (
              <p className="disclaimer">
                <strong>General information, not tax advice.</strong> Rules change; check the latest FTA guidance or speak to a registered tax agent about your situation.
              </p>
            )}
            {post.faq.length > 0 && (
              <div className="prose">
                <h2 id="faq">FAQ</h2>
                <div style={{ marginTop: 16 }}><Faq items={post.faq} /></div>
              </div>
            )}
            <div className="author-box">
              <img src="/images/zubair-akbar-headshot.jpg" alt="Zubair Akbar" width={96} height={96} loading="lazy" />
              <div style={{ flex: '1 1 280px' }}>
                <p className="hero__label">About the author</p>
                <p style={{ marginTop: 6, fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>Zubair Akbar</p>
                <p style={{ marginTop: 8, color: 'var(--studio-grey)', fontSize: 15.5 }}>
                  Chartered Accountant, Group CFO and FTA-approved Tax Agent (TAAN 20059440) with 16+ years in audit, tax and finance across the UAE and Pakistan.
                </p>
                <Link className="link-arrow" href="/about" style={{ color: '#fff' }}>More about Zubair →</Link>
              </div>
            </div>
          </article>

          <aside className="article-aside" aria-label="Article tools">
            {toc.length > 0 && (
              <nav className="toc" aria-label="On this page">
                <p>ON THIS PAGE</p>
                <ol>{toc.map((h) => <li key={h.id}><a href={`#${h.id}`}>{h.text}</a></li>)}</ol>
              </nav>
            )}
            <div className="toc">
              <p>SHARE</p>
              <div className="share-row">
                {share.map((s) => (
                  <a key={s.k} className="social social--line" href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${s.label}`}>
                    <SocialIcon name={s.k} size={18} />
                  </a>
                ))}
              </div>
            </div>
            <div className="toc" style={{ background: 'var(--ink)', color: '#fff', border: 0 }}>
              <p style={{ color: 'var(--light-blue)' }}>QUESTION ABOUT THIS TOPIC?</p>
              <p style={{ marginTop: 10, fontSize: 15.5, letterSpacing: 0, color: 'var(--studio-grey)' }}>Send me the details of your situation and get a clear answer.</p>
              <Link className="btn btn--primary" href={`/contact?topic=${isTax ? (post.topic === 'uae-tax' ? 'uae-tax' : 'pakistan-tax') : post.topic === 'saas' ? 'saas' : 'ai'}`} style={{ marginTop: 16, width: '100%' }}>Ask a question</Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section--tight bg-light">
          <div className="wrap">
            <h2 className="h2" style={{ marginTop: 0 }}>Related <span className="hl">articles</span></h2>
            <div className="grid grid--fill" style={{ marginTop: 32 }}>{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.updated,
            mainEntityOfPage: url,
            url,
            image: absoluteUrl(`${path}/opengraph-image`),
            author: { '@id': PERSON_ID, '@type': 'Person', name: 'Zubair Akbar', url: absoluteUrl('/about') },
            publisher: { '@id': PERSON_ID },
            articleSection: post.category,
            inLanguage: 'en',
          },
          ...(post.faq.length ? [faqLd(post.faq)] : []),
        ]}
      />
    </Shell>
  );
}
