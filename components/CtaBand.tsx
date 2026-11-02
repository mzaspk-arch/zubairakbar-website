import Link from 'next/link';
import type { ReactNode } from 'react';

export default function CtaBand({ title, text, primary, secondary }: {
  title: ReactNode;
  text?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string; external?: boolean };
}) {
  return (
    <section className="cta-band bg-cta">
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <div className="btn-row">
          <Link className="btn btn--primary" href={primary.href}>{primary.label}</Link>
          {secondary &&
            (secondary.external ? (
              <a className="btn btn--ghost" href={secondary.href} target="_blank" rel="noopener noreferrer">{secondary.label}</a>
            ) : (
              <Link className="btn btn--ghost" href={secondary.href}>{secondary.label}</Link>
            ))}
        </div>
      </div>
    </section>
  );
}
