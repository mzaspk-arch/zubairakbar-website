import Link from 'next/link';
import NetworkBg from '@/components/NetworkBg';
import Shell from '@/components/Shell';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <Shell active="none">
      <section className="banner" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center' }}>
        <NetworkBg density={60} speed={0.7} />
        <div className="wrap above banner__inner">
          <p className="hero__label">Error 404</p>
          <h1>This page <span className="hl">doesn&apos;t exist</span></h1>
          <p className="banner__intro">The link may be old or mistyped. Try one of these instead.</p>
          <div className="btn-row" style={{ marginTop: 32 }}>
            <Link className="btn btn--primary" href="/">Go to home</Link>
            <Link className="btn btn--ghost" href="/blog">Read the blog</Link>
            <Link className="btn btn--ghost" href="/sitemap">See the sitemap</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
