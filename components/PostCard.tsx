import Link from 'next/link';
import { TOPICS, type PostMeta } from '@/lib/topics';

export default function PostCard({ post }: { post: PostMeta }) {
  const t = TOPICS[post.topic];
  const href = `/blog/${post.topic}/${post.slug}`;
  return (
    <article className="card card--line card--hover post-card">
      <Link href={href} className={`post-cover post-cover--${post.cover}`} tabIndex={-1} aria-hidden="true">
        <span className="label">{t.label}</span>
        <span className="kicker">{post.kicker}</span>
        <span className="title">{post.coverTitle}</span>
      </Link>
      <div className="post-card__body">
        <p className="post-card__meta">{post.category} · {post.readingTime}</p>
        <h3><Link href={href}>{post.title}</Link></h3>
        <p className="post-card__excerpt">{post.description}</p>
      </div>
    </article>
  );
}
