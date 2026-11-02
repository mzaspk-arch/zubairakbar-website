'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { NAV, SITE, type NavKey } from '@/lib/site';
import { LogoMark } from './Icons';

export default function Header({ active = 'none', solid = false }: { active?: NavKey; solid?: boolean }) {
  const [open, setOpen] = useState(false);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${solid ? ' site-header--solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap site-header__bar">
        <Link href="/" className="brand" aria-label="Zubair Akbar — home">
          <LogoMark />
          <span className="brand__word">
            ZUBAIR
            <br />
            AKBAR
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.key} href={item.href} className="nav__link" aria-current={active === item.key ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className="nav__cta" aria-current={active === 'contact' ? 'page' : undefined}>
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu">
        {NAV.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className="mobile-menu__link"
            aria-current={active === item.key ? 'page' : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="btn btn--primary" onClick={() => setOpen(false)}>
          Contact
        </Link>
        <p style={{ marginTop: 18, fontSize: 13, color: '#B0B0B0', textAlign: 'center' }}>Follow {SITE.handle}</p>
      </div>
    </header>
  );
}
