import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageBanner from '@/components/PageBanner';
import PostCard from '@/components/PostCard';
import Shell from '@/components/Shell';
import TopicCards from '@/components/TopicCards';
import { TOPICS, getPostsByTopic, isTopic } from '@/lib/blog';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(TOPICS).map((topic) => ({ topic }));

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!isTopic(topic)) return {};
  const t = TOPICS[topic];
  return pageMeta({
    title: `${t.name} — Articles by Zubair Akbar`,
    description: `${t.intro} Practical articles from an FTA-approved Tax Agent and Group CFO.`,
    path: `/blog/${topic}`,
    noindex: getPostsByTopic(topic).length === 0, // keep empty topic pages out of Google until they have content
  });
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  if (!isTopic(topic)) notFound();
  const t = TOPICS[topic];
  const posts = getPostsByTopic(topic);
  return (
    <Shell active="blog">
      <PageBanner crumbs={[{ name: 'Blog', href: '/blog' }, { name: t.short, href: `/blog/${topic}` }]} label={t.label} title={t.name} intro={t.intro} />
      <section className="section--tight bg-light">
        <div className="wrap">
          {posts.length ? (
            <div className="grid grid--fill">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          ) : (
            <p className="empty-note">
              Articles on {t.name} are on the way. Meanwhile, <Link href="/contact">send me your question</Link> or{' '}
              <Link href="/blog">read the latest articles</Link>.
            </p>
          )}
        </div>
      </section>
      <section className="section bg-white">
        <div className="wrap">
          <p className="eyebrow">Other topics</p>
          <TopicCards current={topic} />
        </div>
      </section>
    </Shell>
  );
}
