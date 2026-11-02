import { TOPICS, getAllPosts, getPost } from '@/lib/blog';
import { OG_SIZE, brandOgImage, wrapTitle } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = 'Article by Zubair Akbar';
export const generateStaticParams = () => getAllPosts().map((p) => ({ topic: p.topic, slug: p.slug }));

export default async function Image({ params }: { params: Promise<{ topic: string; slug: string }> }) {
  const { topic, slug } = await params;
  const post = getPost(topic, slug);
  const lines = wrapTitle(post?.coverTitle || 'Zubair Akbar');
  return brandOgImage({ label: post ? TOPICS[post.topic].label : 'BLOG', lines, highlight: lines.length - 1, footer: 'zubairakbar.com/blog' });
}
