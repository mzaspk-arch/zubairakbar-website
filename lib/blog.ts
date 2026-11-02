import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { type PostMeta, type Topic, TOPICS, isTopic } from './topics';

/**
 * Blog posts live in content/blog/<topic>/<slug>.md
 * Front matter: title, description, date, updated, category, kicker, coverTitle, cover, readingTime, faq (optional list of {q, a})
 */

export { TOPICS, isTopic, type Topic, type PostMeta } from './topics';

export interface Post extends PostMeta {
  html: string;
  headings: { id: string; text: string }[];
}

const ROOT = path.join(process.cwd(), 'content', 'blog');

const slugify = (s: string) =>
  s.toLowerCase().replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function readFile(topic: Topic, file: string): Post {
  const raw = fs.readFileSync(path.join(ROOT, topic, file), 'utf8');
  const { data, content } = matter(raw);
  const headings: { id: string; text: string }[] = [];
  const md = new Marked({
    renderer: {
      heading({ tokens, depth }) {
        const text = this.parser.parseInline(tokens);
        const id = slugify(text);
        if (depth === 2) headings.push({ id, text: text.replace(/<[^>]+>/g, '') });
        return `<h${depth} id="${id}">${text}</h${depth}>\n`;
      },
      link({ href, title, tokens }) {
        const text = this.parser.parseInline(tokens);
        const ext = /^https?:\/\//.test(href);
        return `<a href="${href}"${title ? ` title="${title}"` : ''}${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${text}</a>`;
      },
    },
  });
  const html = md.parse(content, { async: false }) as string;
  const toStr = (d: unknown) => (d instanceof Date ? d.toISOString().slice(0, 10) : String(d ?? ''));
  return {
    slug: file.replace(/\.md$/, ''),
    topic,
    title: data.title,
    description: data.description,
    date: toStr(data.date),
    updated: toStr(data.updated || data.date),
    category: data.category || TOPICS[topic].short,
    kicker: data.kicker || '',
    coverTitle: data.coverTitle || data.title,
    cover: data.cover || 'dark',
    readingTime: data.readingTime || `${Math.max(1, Math.round(content.split(/\s+/).length / 220))} min read`,
    faq: Array.isArray(data.faq) ? data.faq : [],
    html,
    headings,
  };
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];
  for (const topic of Object.keys(TOPICS) as Topic[]) {
    const dir = path.join(ROOT, topic);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir)) if (f.endsWith('.md') && !f.startsWith('_')) posts.push(readFile(topic, f));
  }
  return posts.sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

export const getPostsByTopic = (topic: Topic) => getAllPosts().filter((p) => p.topic === topic);

export function getPost(topic: string, slug: string): Post | null {
  if (!isTopic(topic) || !/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(ROOT, topic, `${slug}.md`);
  return fs.existsSync(file) ? readFile(topic, `${slug}.md`) : null;
}

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
