import Link from 'next/link';
import type { ReactNode } from 'react';
import PageBanner from './PageBanner';
import Shell from './Shell';

export type LegalSection = { id: string; title: string; body: ReactNode };

export default function LegalPage({ title, intro, path, updated, summary, sections, footer }: {
  title: string; intro: string; path: string; updated: string; summary: ReactNode; sections: LegalSection[]; footer: { href: string; label: string };
}) {
  return (
    <Shell active="none">
      <PageBanner crumbs={[{ name: title, href: path }]} title={title} intro={intro}>
        <p className="banner__date">Last updated: {updated}</p>
      </PageBanner>
      <section className="section--tight bg-white">
        <div className="wrap article-layout">
          <article className="article legal">
            <div className="callout" style={{ marginBottom: 8 }}><p style={{ marginTop: 0 }}>{summary}</p></div>
            {sections.map((s, i) => (
              <section key={s.id} aria-labelledby={s.id}>
                <h2 id={s.id}>{i + 1}. {s.title}</h2>
                {s.body}
              </section>
            ))}
            <p style={{ marginTop: 48 }}><Link className="link-arrow" href={footer.href}>{footer.label} →</Link></p>
          </article>
          <aside className="article-aside">
            <nav className="toc" aria-label="On this page">
              <p>ON THIS PAGE</p>
              <ol>{sections.map((s, i) => <li key={s.id}><a href={`#${s.id}`}>{i + 1}. {s.title}</a></li>)}</ol>
            </nav>
          </aside>
        </div>
      </section>
    </Shell>
  );
}
