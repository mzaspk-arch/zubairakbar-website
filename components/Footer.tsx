import Link from 'next/link';
import { COMPANIES, PRODUCTS, SITE, logoFor } from '@/lib/site';
import { CookieSettingsButton } from './CookieBanner';
import { LogoMark, MailIcon, PinIcon, GlobeIcon } from './Icons';
import Socials from './Socials';

const QUICK = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Zubair' },
  { href: '/brands', label: 'SaaS Brands' },
  { href: '/business', label: 'Businesses' },
  { href: '/blog', label: 'Blog & Insights' },
  { href: '/contact', label: 'Contact' },
];

const WORK = [
  { href: '/contact?topic=uae-tax', label: 'UAE Tax Advisory' },
  { href: '/contact?topic=pakistan-tax', label: 'Pakistan Tax' },
  { href: '/contact?topic=erp', label: 'ERP & Odoo' },
  { href: '/contact?topic=saas', label: 'SaaS Partnerships' },
  { href: '/contact?topic=speaking', label: 'Speaking & Media' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-cols">
          <div>
            <Link href="/" className="brand" aria-label="Zubair Akbar — home">
              <LogoMark />
              <span className="brand__word">ZUBAIR<br />AKBAR</span>
            </Link>
            <p style={{ marginTop: 20, fontSize: 15.5, lineHeight: 1.7 }}>
              Chartered Accountant, Group CFO and FTA-approved Tax Agent who builds SaaS. {SITE.positioning}
            </p>
            <p style={{ margin: '24px 0 14px', fontSize: 13, fontWeight: 600, letterSpacing: '.18em', color: '#fff' }}>
              FOLLOW {SITE.handle}
            </p>
            <Socials size={18} />
          </div>

          <nav aria-label="Quick links">
            <h2 className="footer-h">Quick <strong>Links</strong></h2>
            <ul className="footer-links">
              {QUICK.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Work with me">
            <h2 className="footer-h">Work <strong>With Me</strong></h2>
            <ul className="footer-links">
              {WORK.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </nav>

          <div>
            <h2 className="footer-h">Contact <strong>Info</strong></h2>
            <ul className="footer-contact">
              <li><MailIcon /><a className="footer-link" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              <li><PinIcon /><span>{SITE.location}</span></li>
              <li>
                <GlobeIcon />
                <span>
                  <a className="footer-link" href="https://xpertgroupglobal.com" target="_blank" rel="noopener noreferrer">xpertgroupglobal.com</a>
                  {' · '}
                  <a className="footer-link" href={COMPANIES.acc.url} target="_blank" rel="noopener noreferrer">{COMPANIES.acc.domain}</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-saas">
          <h2 className="footer-h" style={{ margin: 0 }}>My <strong>SaaS</strong></h2>
          <ul className="saas-chips">
            {PRODUCTS.map((p) => (
              <li key={p.slug}>
                <a className="saas-chip" href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer">
                  <span className="logo-tile" style={{ width: 32, height: 32, borderRadius: 8 }}>
                    <img src={logoFor(p.name)} alt="" width={22} height={22} loading="lazy" />
                  </span>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-bottom">
          <p style={{ fontSize: 14 }}>© {year} {SITE.name}. All rights reserved.</p>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
            <CookieSettingsButton />
            <Link href="/sitemap">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
