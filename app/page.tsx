import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Faq, { type QA } from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import NetworkBg from '@/components/NetworkBg';
import PostCard from '@/components/PostCard';
import Shell from '@/components/Shell';
import Socials from '@/components/Socials';
import { getAllPosts, TOPICS, type Topic } from '@/lib/blog';
import { faqLd, pageMeta } from '@/lib/seo';
import { BRANDS, COMPANIES, FEATURED, PRODUCTS, SITE, SOCIAL, logoFor } from '@/lib/site';

export const metadata = pageMeta({ title: SITE.title, description: SITE.description, path: '/', type: 'profile', absoluteTitle: true });

const AREAS = [
  { t: 'UAE tax & compliance', d: 'Corporate Tax, VAT and Excise registration, filing and advisory as an FTA-approved Tax Agent.', tags: 'Corporate Tax · VAT · Excise' },
  { t: 'Pakistan taxation', d: 'Income tax and compliance for Pakistan-based businesses and Pakistanis living in the UAE.', tags: 'Income Tax · Sales Tax · FBR' },
  { t: 'CFO & financial strategy', d: 'Cash flow, internal controls, bank financing and audit readiness from a working Group CFO.', tags: 'Cash flow · Controls · Audit' },
  { t: 'ERP & Odoo', d: 'ERP selection and rollouts that start with clean data and clear processes, not just software.', tags: 'Odoo · Data migration · Training' },
  { t: 'SaaS products', d: 'Software for real business problems: WhatsApp CRM, hiring, education, email signatures and growth.', tags: 'Built for the UAE & Pakistan' },
  { t: 'AI & automation', d: 'AI agents and workflows that remove repetitive finance and operations work, with human approval built in.', tags: 'AI agents · E-invoicing · Workflows' },
];

const VENTURES = [
  { c: COMPANIES.xg, role: 'CEO · since 2024', place: 'SPC Free Zone, Sharjah, UAE', d: 'Accounting, tax, audit, software and SaaS, cloud, cybersecurity, digital marketing and business setup.', logo: 'xpert-group', bg: 'var(--ink)' },
  { c: COMPANIES.acc, role: 'Founder & Managing Partner · since 2025', place: 'Dubai, UAE', d: 'Accounting, taxation, business advisory and digital strategy for UAE businesses.', logo: 'accentureon', bg: 'var(--steel)' },
  { c: COMPANIES.xgpk, role: 'Founder · since 2024', place: 'Pakistan', d: 'Taxation, software development, digital marketing and business services for Pakistani businesses.', logo: 'xpert-group-pakistan', bg: 'var(--charcoal)' },
];

const FAQ: QA[] = [
  { q: 'Who is Zubair Akbar?', a: `A Dubai-based Chartered Accountant, Group CFO and FTA-approved Tax Agent (TAAN ${SITE.taan}) who founded Accentureon Consulting and Xpert Group, and builds SaaS products for businesses in the UAE and Pakistan.` },
  { q: 'Can you help with UAE Corporate Tax, VAT and Excise?', a: 'Yes. As an FTA-approved Tax Agent I advise on registration, filing and compliance for Corporate Tax, VAT and Excise, through Accentureon Consulting and Xpert Group.' },
  { q: 'Do you work with businesses in Pakistan?', a: 'Yes. Xpert Group Pakistan supports Pakistani businesses and overseas Pakistanis with taxation, software and digital services.' },
  { q: 'Which SaaS products have you built?', a: 'Live products include Whatsell.ai, HireSyncer and FormSyncer, with SignSyncer, EduSyncer, EduNestra and six more on the way.' },
  { q: 'How can I contact you?', a: `Email ${SITE.email} or use the contact form. You can also follow ${SITE.handle} on LinkedIn, Facebook, Instagram, X, YouTube and TikTok.` },
];

export default function HomePage() {
  const featured = FEATURED.map((n) => PRODUCTS.find((p) => p.name === n)!).filter(Boolean);
  const posts = getAllPosts().slice(0, 3);
  const linkedin = SOCIAL.find((s) => s.key === 'linkedin')!.href;

  return (
    <Shell active="home">
      {/* Hero */}
      <section className="hero">
        <NetworkBg density={90} />
        <div className="wrap above hero__grid">
          <div className="hero__text">
            <p className="hero__label">Finance • Tax • Strategy • SaaS • ERP • Digital Transformation</p>
            <h1>
              <span className="name">Zubair Akbar</span>
              <span className="line">Building Businesses.</span>
              <span className="line">Empowering Finance.</span>
              <span className="line line--hl">Creating Technology.</span>
            </h1>
            <p className="hero__intro">
              Chartered Accountant, Group CFO and FTA-approved Tax Agent who also builds SaaS. {SITE.positioning}
            </p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <Link className="btn btn--primary" href="/contact">Work with me</Link>
              <Link className="btn btn--ghost" href="/brands">Explore my SaaS brands</Link>
            </div>
            <ul className="hero__chips">
              <li>FTA Tax Agent · TAAN {SITE.taan}</li>
              <li>Odoo Partner</li>
              <li>UAE · Pakistan</li>
            </ul>
          </div>
          <div className="hero__media">
            <img src="/images/zubair-akbar-portrait.webp" alt="Zubair Akbar in a navy suit" width={540} height={675} fetchPriority="high" />
            <div className="float-card float-card--a"><strong>16+</strong><span>years in audit, tax &amp; finance</span></div>
            <div className="float-card float-card--b"><strong>12</strong><span>SaaS products in the portfolio</span></div>
          </div>
        </div>
        <div className="follow-bar">
          <div className="wrap">
            <p className="follow-label"><span>FOLLOW</span><span>{SITE.handle}</span></p>
            <Socials />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink on-dark" aria-label="At a glance">
        <div className="wrap stats">
          <div className="stat"><strong>16+</strong><span>Years in audit, tax, internal controls and finance</span></div>
          <div className="stat"><strong>3</strong><span>Ventures founded and led in the UAE and Pakistan</span></div>
          <div className="stat"><strong>{PRODUCTS.length}</strong><span>SaaS products built by my companies</span></div>
          <div className="stat"><strong>2</strong><span>Tax jurisdictions: UAE and Pakistan</span></div>
        </div>
      </section>

      {/* About */}
      <section className="section bg-white">
        <div className="wrap split">
          <div className="split__media">
            <img src="/images/zubair-akbar-studio.jpg" alt="Portrait of Zubair Akbar" width={480} height={580} loading="lazy" />
          </div>
          <div className="split__text">
            <p className="eyebrow">About me</p>
            <h2 className="h2">Most accountants don&apos;t build software. <span className="hl">I do both.</span></h2>
            <p className="lead" style={{ marginTop: 24 }}>
              I&apos;m a finance-first founder. For 16+ years I&apos;ve worked across audit, tax, internal controls and ERP — from senior audit work in Lahore to Group CFO roles in the UAE.
            </p>
            <p className="lead" style={{ marginTop: 16 }}>
              Today I lead Xpert Group and Accentureon Consulting, serve as an FTA-approved Tax Agent for Corporate Tax, VAT and Excise, and build SaaS products that solve the problems I see in finance teams every day.
            </p>
            <ul className="pillars">
              <li><b>01</b><div><strong>Building businesses</strong><span>Founder of Accentureon Consulting; CEO of Xpert Group FZE-LLC and founder of Xpert Group Pakistan.</span></div></li>
              <li><b>02</b><div><strong>Empowering finance</strong><span>FTA-approved Tax Agent (TAAN {SITE.taan}) and Group CFO.</span></div></li>
              <li><b>03</b><div><strong>Creating technology</strong><span>Odoo Partner and builder of Whatsell.ai, HireSyncer, FormSyncer and more SaaS products.</span></div></li>
            </ul>
            <Link className="link-arrow" href="/about" style={{ marginTop: 20 }}>Read my full story →</Link>
          </div>
        </div>
      </section>

      {/* What I do */}
      <section className="section bg-light">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">What I do</p>
              <h2 className="h2">Six areas. One goal: <span className="hl">compliant, growing businesses.</span></h2>
            </div>
            <p>Advice from a practitioner who files the returns, runs the finance team and ships the software.</p>
          </div>
          <div className="grid grid--3" style={{ marginTop: 48 }}>
            {AREAS.map((a, i) => (
              <article key={a.t} className="card card--line card--hover exp-card">
                <p className="kicker-num">{String(i + 1).padStart(2, '0')}</p>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
                <p className="tags">{a.tags}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS */}
      <section className="section bg-dark on-dark">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">My SaaS brands</p>
              <h2 className="h2">Software built by an accountant <span className="hl">who signs tax returns.</span></h2>
            </div>
          </div>
          <div className="grid grid--3" style={{ marginTop: 48 }}>
            {featured.map((p) => (
              <article key={p.slug} className="card card--glass card--hover p-card p-card--dark">
                <span className="logo-tile" style={{ width: 56, height: 56 }}>
                  <img src={logoFor(p.name)} alt={`${p.name} logo`} width={40} height={40} loading="lazy" />
                </span>
                <p className="p-card__tag">{p.tag}</p>
                <h3>{p.name}</h3>
                <p className="p-card__desc">{p.description}</p>
                <div className="p-card__foot">
                  <a className="link-arrow" href={`https://${p.domain}`} target="_blank" rel="noopener noreferrer">Visit {p.domain} →</a>
                </div>
              </article>
            ))}
          </div>
          <div className="section-head" style={{ marginTop: 40, alignItems: 'center' }}>
            <p style={{ color: 'var(--studio-grey)' }}>{PRODUCTS.length} SaaS products and {BRANDS.length} more brands across the UAE and Pakistan.</p>
            <Link className="btn btn--primary" href="/brands">View all brands</Link>
          </div>
        </div>
      </section>

      {/* Businesses */}
      <section className="section bg-white">
        <div className="wrap">
          <p className="eyebrow">My businesses</p>
          <h2 className="h2">Companies I <span className="hl">founded and lead</span></h2>
          <div className="grid grid--3" style={{ marginTop: 48 }}>
            {VENTURES.map((v) => (
              <article key={v.c.name} className="card card--line card--hover co-card">
                <div className="co-card__head" style={{ background: v.bg }}>
                  <span className="logo-tile" style={{ width: 56, height: 56, background: 'rgba(255,255,255,.08)' }}>
                    <img src={`/images/logos/${v.logo}.webp`} alt={`${v.c.name} logo`} width={40} height={40} loading="lazy" />
                  </span>
                  <p className="role">{v.role}</p>
                  <h3>{v.c.name}</h3>
                  <p className="place">{v.place}</p>
                </div>
                <div className="co-card__body">
                  <p className="muted">{v.d}</p>
                  <a className="link-arrow" href={v.c.url} target="_blank" rel="noopener noreferrer">{v.c.domain} →</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="section bg-light">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Latest insights</p>
              <h2 className="h2">Tax, SaaS and AI automation — <span className="hl">explained plainly.</span></h2>
            </div>
            <Link className="link-arrow" href="/blog">All articles →</Link>
          </div>
          <div className="filters" style={{ marginTop: 32 }}>
            <Link className="pill is-active" href="/blog">All</Link>
            {(Object.keys(TOPICS) as Topic[]).map((t) => (
              <Link key={t} className="pill" href={`/blog/${t}`}>{TOPICS[t].short}</Link>
            ))}
          </div>
          <div className="grid grid--fill" style={{ marginTop: 32 }}>
            {posts.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-white">
        <div className="wrap split" style={{ alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 320px' }}>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">Questions people <span className="hl">often ask</span></h2>
            <p className="muted" style={{ marginTop: 18 }}>Can&apos;t find your answer? Send me a note.</p>
            <Link className="btn btn--dark" href="/contact" style={{ marginTop: 24 }}>Ask a question</Link>
          </div>
          <div style={{ flex: '2 1 520px', minWidth: 0 }}><Faq items={FAQ} /></div>
        </div>
        <JsonLd data={faqLd(FAQ)} />
      </section>

      <CtaBand
        title={<>Have a tax, ERP or <span style={{ color: 'var(--light-blue)' }}>SaaS question?</span></>}
        text="Tell me what you're working on and how I can help."
        primary={{ href: '/contact', label: 'Contact me' }}
        secondary={{ href: linkedin, label: 'Connect on LinkedIn', external: true }}
      />
    </Shell>
  );
}
