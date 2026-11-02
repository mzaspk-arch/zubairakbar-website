import CtaBand from '@/components/CtaBand';
import PageBanner from '@/components/PageBanner';
import Shell from '@/components/Shell';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About Zubair Akbar — Chartered Accountant, Group CFO & SaaS Founder',
  description: '16+ years in audit, tax and finance across Pakistan and the UAE. FTA-approved Tax Agent, Group CFO, Odoo Partner and founder of Xpert Group and Accentureon Consulting.',
  path: '/about',
  type: 'profile',
});

const JOURNEY = [
  { y: '2011 – 2015', r: 'Senior Audit Associate', w: 'Chartered accountancy firm, Lahore. External audit across industries.' },
  { y: '2015 – 2016', r: 'Financial Consultant', w: 'Al Aseel Accounting, UAE. Accounting and advisory for UAE companies.' },
  { y: '2016 – 2025', r: 'Finance & Accounting Manager', w: 'UAE industrial group, Sharjah. ERP, internal controls, VAT and bank financing.' },
  { y: '2024', r: 'CEO, Xpert Group FZE-LLC', w: 'Plus founder of Xpert Group Pakistan. Accounting, tax, software and SaaS.' },
  { y: '2025 – today', r: 'Group CFO & Founder', w: 'Group CFO and VP Administration in UAE industry · Founder & Managing Partner, Accentureon Consulting.' },
];

const CREDS = [
  { k: 'UAE · FTA', t: 'Approved Tax Agent', d: `Corporate Tax, VAT and Excise · TAAN ${SITE.taan}` },
  { k: 'ICAP', t: 'Chartered Accountant (affil.)', d: 'Institute of Chartered Accountants of Pakistan' },
  { k: 'EAAA · 2025', t: 'UAE-CA Fellowship', d: 'Emirates Association of Accountants & Auditors' },
  { k: 'Fellowships', t: 'FCPA · FFA · FICA', d: 'Professional accounting fellowships' },
  { k: 'Odoo', t: 'Odoo Partner', d: 'ERP implementation and rollouts' },
  { k: 'Diplomas', t: 'UAE Corporate Tax (2023)', d: 'GCC VAT Compliance (2019)' },
  { k: 'Education', t: 'BBA, Accounting', d: 'Shah Abdul Latif University, Khairpur · 2010–2013' },
  { k: 'Pakistan', t: 'Tax Practitioner', d: 'Pakistan taxation and compliance' },
];

const PRINCIPLES = [
  { t: 'Compliance first', d: 'Every recommendation starts with current law and FTA or FBR guidance — not shortcuts that create penalties later.' },
  { t: 'Clean numbers', d: 'Good decisions need reliable books, clear controls and reports owners can actually read.' },
  { t: 'The right technology', d: 'Software that fits the process and the budget — automated where it saves time, with humans approving what matters.' },
];

export default function AboutPage() {
  return (
    <Shell active="about">
      <PageBanner
        crumbs={[{ name: 'About', href: '/about' }]}
        title={<>About <span className="hl">Zubair Akbar</span></>}
        intro="A finance-first founder who builds technology: turning 16+ years of audit, tax and ERP experience into consulting firms and SaaS products."
      />

      <section className="section bg-white">
        <div className="wrap split">
          <div className="split__text">
            <p className="eyebrow">My story</p>
            <h2 className="h2">From audit files to <span className="hl">SaaS products</span></h2>
            <p className="lead" style={{ marginTop: 24 }}>
              I started my career in external audit in Lahore, where I learned that every number has to be defended. Since then I&apos;ve spent more than 16 years in accounts, finance, taxation, internal and external audit, system and forensic audits, and internal controls.
            </p>
            <p className="lead" style={{ marginTop: 16 }}>
              In the UAE I grew from finance manager to Group CFO, leading ERP implementations, bank financing, customs duty exemptions and VAT and Corporate Tax compliance. Along the way I became an FTA-approved Tax Agent and an Odoo Partner.
            </p>
            <p className="lead" style={{ marginTop: 16 }}>
              The same problems kept coming back — messy data, manual work, compliance stress. So I started building the software to fix them. Today I lead Xpert Group and Accentureon Consulting, and a growing portfolio of SaaS products.
            </p>
            <blockquote className="quote">&ldquo;{SITE.positioning}&rdquo;</blockquote>
          </div>
          <div className="split__media split__media--right">
            <img src="/images/zubair-akbar-about.jpg" alt="Zubair Akbar, Chartered Accountant and Group CFO" width={480} height={580} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section bg-light">
        <div className="wrap">
          <p className="eyebrow">Career journey</p>
          <h2 className="h2">Sixteen years, <span className="hl">two countries</span></h2>
          <ol className="timeline">
            {JOURNEY.map((j) => (
              <li key={j.y}>
                <p className="yr">{j.y}</p>
                <h3 className="role">{j.r}</h3>
                <p className="where">{j.w}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-white">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Credentials</p>
              <h2 className="h2">Qualified to <span className="hl">sign the return</span></h2>
            </div>
            <p>Professional memberships, approvals and diplomas behind the advice.</p>
          </div>
          <div className="grid" style={{ marginTop: 40, gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 18 }}>
            {CREDS.map((c) => (
              <div key={c.t} className="cred-card">
                <p className="k">{c.k}</p>
                <h3 className="t">{c.t}</h3>
                <p className="d">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-dark on-dark">
        <div className="wrap">
          <p className="eyebrow">How I work</p>
          <h2 className="h2">Three principles behind <span className="hl">everything I build</span></h2>
          <div className="grid grid--3" style={{ marginTop: 44 }}>
            {PRINCIPLES.map((p, i) => (
              <article key={p.t} className="card card--glass exp-card">
                <p className="kicker-num" style={{ color: 'var(--light-blue)' }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 style={{ color: '#fff' }}>{p.t}</h3>
                <p style={{ color: 'var(--studio-grey)' }}>{p.d}</p>
              </article>
            ))}
          </div>
          <div className="stats" style={{ paddingBottom: 0 }}>
            <div className="stat"><span>Languages</span><strong style={{ fontSize: 22, marginTop: 8 }}>Urdu · Punjabi · English · Arabic (working)</strong></div>
            <div className="stat"><span>Based in</span><strong style={{ fontSize: 22, marginTop: 8 }}>Dubai, UAE</strong></div>
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Let&apos;s build something <span style={{ color: 'var(--light-blue)' }}>compliant and smart.</span></>}
        primary={{ href: '/contact', label: 'Contact me' }}
        secondary={{ href: '/business', label: 'See my businesses' }}
      />
    </Shell>
  );
}
