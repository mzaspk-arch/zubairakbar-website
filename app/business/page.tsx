import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import PageBanner from '@/components/PageBanner';
import Shell from '@/components/Shell';
import { pageMeta } from '@/lib/seo';
import { COMPANIES, PRODUCTS, logoFor, type Owner } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Businesses & Roles — Xpert Group, Accentureon Consulting',
  description: 'Companies founded and led by Zubair Akbar: Xpert Group FZE-LLC (UAE), Accentureon Consulting LLC (Dubai) and Xpert Group Pakistan — plus his Group CFO and VP Administration roles.',
  path: '/business',
});

const VENTURES: { key: keyof typeof COMPANIES; role: string; place: string; d: string; services: string[]; logo: string; bg: string; owner?: Owner }[] = [
  { key: 'xg', owner: 'xg', role: 'CEO · since Jan 2024', place: 'SPC Free Zone, Sharjah, UAE', logo: 'xpert-group', bg: 'var(--ink)', d: 'A UAE business group covering accounting, taxation and audit alongside software development, SaaS, cloud services and digital growth — and the owner of nine SaaS products.', services: ['Accounting & audit', 'Taxation', 'Software & SaaS', 'Cloud & cybersecurity', 'IT consulting', 'Digital marketing', 'Business setup', 'E-commerce'] },
  { key: 'acc', owner: 'acc', role: 'Founder & Managing Partner · since 2025', place: 'Dubai, UAE', logo: 'accentureon', bg: 'var(--steel)', d: 'An advisory firm for accounting, taxation, digital strategy and business advisory — with plans to grow internationally as a software house delivering remotely.', services: ['Corporate Tax & VAT', 'Accounting', 'Business advisory', 'Digital strategy', 'Software development'] },
  { key: 'xgpk', role: 'Founder · since Jul 2024', place: 'Pakistan', logo: 'xpert-group-pakistan', bg: 'var(--charcoal)', d: 'The Pakistan arm of the group: taxation, software development, digital marketing and business services — and a bridge for businesses expanding between Pakistan and the UAE.', services: ['Pakistan taxation', 'Software development', 'Digital marketing', 'Business services'] },
];

const ROLES = [
  { since: 'Since Mar 2025', t: 'Group CFO', sub: 'UAE industrial manufacturing group · Finance & Accounting Manager 2016–2025', items: ['ERP implementation and finance systems', 'Bank financing and customs duty exemptions', 'VAT and Corporate Tax compliance'] },
  { since: 'Since May 2025', t: 'VP Administration', sub: 'UAE industrial group, Sharjah · Finance Business Partner since 2016', items: ['Administration and finance business partnering', 'Internal controls and reporting', 'Group-wide process improvement'] },
];

const ROUTES = [
  { need: 'UAE Corporate Tax, VAT or Excise', fit: COMPANIES.acc, where: 'Dubai' },
  { need: 'Bookkeeping, audit or business setup', fit: COMPANIES.xg, where: 'Sharjah' },
  { need: 'Pakistan tax or services', fit: COMPANIES.xgpk, where: 'Pakistan' },
  { need: 'ERP / Odoo or custom software', fit: COMPANIES.xg, where: 'UAE & Pakistan' },
];

export default function BusinessPage() {
  return (
    <Shell active="business">
      <PageBanner
        crumbs={[{ name: 'Business', href: '/business' }]}
        title={<>Businesses <span className="hl">&amp; roles</span></>}
        intro="The companies I founded and the finance leadership roles I hold across the UAE and Pakistan."
      />

      <section className="section bg-white">
        <div className="wrap">
          <p className="eyebrow">Ventures I lead</p>
          <h2 className="h2">Three companies, <span className="hl">two markets</span></h2>
          <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 28 }}>
            {VENTURES.map((v) => {
              const c = COMPANIES[v.key];
              const products = v.owner ? PRODUCTS.filter((p) => p.owner === v.owner) : [];
              return (
                <article key={v.key} className="venture">
                  <div className="venture__side" style={{ background: v.bg }}>
                    <img className="ghost" src={`/images/logos/${v.logo}.webp`} alt="" aria-hidden="true" />
                    <span className="logo-tile" style={{ width: 64, height: 64, background: 'rgba(255,255,255,.08)', position: 'relative' }}>
                      <img src={`/images/logos/${v.logo}.webp`} alt={`${c.name} logo`} width={46} height={46} loading="lazy" />
                    </span>
                    <p className="role">{v.role}</p>
                    <h3>{c.name}</h3>
                    <p className="place">{v.place}</p>
                  </div>
                  <div className="venture__body">
                    <p className="lead">{v.d}</p>
                    <ul className="chips" style={{ marginTop: 20 }}>
                      {v.services.map((s) => <li key={s} className="chip">{s}</li>)}
                    </ul>
                    {products.length > 0 && (
                      <>
                        <p className="mini-label">SaaS products · {products.length}</p>
                        <ul className="prod-chips">
                          {products.map((p) => (
                            <li key={p.slug}>
                              <a className="prod-chip" href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer">
                                <span className="logo-tile" style={{ width: 32, height: 32, borderRadius: 8 }}>
                                  <img src={logoFor(p.name)} alt="" width={22} height={22} loading="lazy" />
                                </span>
                                {p.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <a className="link-arrow" href={c.url} target="_blank" rel="noopener noreferrer" style={{ marginTop: 20 }}>Visit {c.domain} →</a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="wrap">
          <p className="eyebrow">Leadership roles</p>
          <h2 className="h2">A working <span className="hl">Group CFO</span></h2>
          <div className="grid" style={{ marginTop: 40, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {ROLES.map((r) => (
              <article key={r.t} className="card card--line exp-card">
                <p className="p-card__tag" style={{ marginTop: 0 }}>{r.since}</p>
                <h3 style={{ marginTop: 10, fontSize: 24 }}>{r.t}</h3>
                <p>{r.sub}</p>
                <ul className="pillars" style={{ marginTop: 20, gap: 10 }}>
                  {r.items.map((i) => <li key={i} style={{ paddingBottom: 10 }}><span style={{ color: 'var(--steel)' }}>✓</span><span>{i}</span></li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Find the right team</p>
              <h2 className="h2">What do you <span className="hl">need help with?</span></h2>
            </div>
            <p>Not sure? <Link href="/contact">Send one message</Link> and I&apos;ll route it.</p>
          </div>
          <table className="route-table">
            <thead><tr><th scope="col">I need…</th><th scope="col">Best fit</th><th scope="col">Where</th></tr></thead>
            <tbody>
              {ROUTES.map((r) => (
                <tr key={r.need}>
                  <td>{r.need}</td>
                  <td><a href={r.fit.url} target="_blank" rel="noopener noreferrer">{r.fit.name}</a></td>
                  <td>{r.where}</td>
                </tr>
              ))}
              <tr><td>A SaaS product or partnership</td><td><Link href="/brands">See SaaS brands</Link></td><td>Online</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <CtaBand title={<>Ready to <span style={{ color: 'var(--light-blue)' }}>work together?</span></>} primary={{ href: '/contact', label: 'Contact me' }} />
    </Shell>
  );
}
