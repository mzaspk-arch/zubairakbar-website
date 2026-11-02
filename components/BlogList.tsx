'use client';

import { useMemo, useState } from 'react';
import type { PostMeta } from '@/lib/topics';
import PostCard from './PostCard';

/** Article grid with a quick search box. Cards are server-rendered first; search only narrows them. */
export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [q, setQ] = useState('');
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return posts;
    return posts.filter((p) => `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(t));
  }, [q, posts]);

  return (
    <>
      <div className="field" style={{ maxWidth: 420, marginTop: 28 }}>
        <label htmlFor="blog-search">Search articles</label>
        <input id="blog-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Corporate Tax, VAT, AI" />
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} articles</p>
      {shown.length ? (
        <div className="grid grid--fill" style={{ marginTop: 32 }}>
          {shown.map((p) => <PostCard key={`${p.topic}/${p.slug}`} post={p} />)}
        </div>
      ) : (
        <p className="empty-note" style={{ marginTop: 32 }}>No articles match that search yet. Try another word or pick a topic.</p>
      )}
    </>
  );
}
