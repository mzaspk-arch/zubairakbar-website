import Link from 'next/link';
import type { ReactNode } from 'react';
import { absoluteUrl } from '@/lib/site';
import { breadcrumbLd } from '@/lib/seo';
import JsonLd from './JsonLd';
import NetworkBg from './NetworkBg';

export type Crumb = { name: string; href: string };

/** Dark banner with network animation, breadcrumbs and H1 — used on every inner page */
export default function PageBanner({
  crumbs,
  title,
  intro,
  children,
  label,
}: {
  crumbs: Crumb[];
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  label?: string;
}) {
  const all = [{ name: 'Home', href: '/' }, ...crumbs];
  return (
    <section className="banner">
      <NetworkBg density={60} speed={0.8} pulses={3} />
      <div className="wrap above banner__inner">
        <nav className="crumbs" aria-label="Breadcrumb">
          <ol>
            {all.map((c, i) => (
              <li key={c.href} style={{ display: 'flex', gap: 10 }}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === all.length - 1 ? <span aria-current="page">{c.name}</span> : <Link href={c.href}>{c.name}</Link>}
              </li>
            ))}
          </ol>
        </nav>
        {label && <p className="hero__label" style={{ marginTop: 28 }}>{label}</p>}
        <h1>{title}</h1>
        {intro && <p className="banner__intro">{intro}</p>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(all.map((c) => ({ name: c.name, url: absoluteUrl(c.href) })))} />
    </section>
  );
}
