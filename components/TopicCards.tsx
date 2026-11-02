import Link from 'next/link';
import { TOPICS, getAllPosts, type Topic } from '@/lib/blog';

export default function TopicCards({ current }: { current?: Topic }) {
  const posts = getAllPosts();
  return (
    <div className="grid" style={{ marginTop: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      {(Object.keys(TOPICS) as Topic[]).filter((t) => t !== current).map((t) => {
        const n = posts.filter((p) => p.topic === t).length;
        return (
          <Link key={t} href={`/blog/${t}`} className="card card--line card--hover topic-card">
            <p className="p-card__tag">{TOPICS[t].label}</p>
            <h3>{TOPICS[t].name}</h3>
            <p>{TOPICS[t].intro}</p>
            <span className="count">{n === 0 ? 'Coming soon →' : `${n} article${n === 1 ? '' : 's'} →`}</span>
          </Link>
        );
      })}
    </div>
  );
}
