import ContactForm from '@/components/ContactForm';
import PageBanner from '@/components/PageBanner';
import Shell from '@/components/Shell';
import Socials from '@/components/Socials';
import { pageMeta } from '@/lib/seo';
import { COMPANIES, SITE, TOPIC_OPTIONS } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact Zubair Akbar — Tax, ERP, SaaS & Speaking',
  description: 'Contact Zubair Akbar about UAE or Pakistan tax, ERP and Odoo, SaaS partnerships, AI automation or speaking. Email contact@zubairakbar.com.',
  path: '/contact',
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ topic?: string }> }) {
  const { topic } = await searchParams;
  const defaultTopic = TOPIC_OPTIONS.some((o) => o.value === topic) ? (topic as string) : '';
  return (
    <Shell active="contact">
      <PageBanner
        crumbs={[{ name: 'Contact', href: '/contact' }]}
        title={<>Let&apos;s <span className="hl">talk</span></>}
        intro="Tax, ERP, a SaaS partnership or a speaking invitation — tell me what you're working on."
      />
      <section className="section bg-light">
        <div className="wrap split" style={{ alignItems: 'flex-start', gap: 48 }}>
          <aside style={{ flex: '1 1 320px', minWidth: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div className="card bg-ink" style={{ padding: 28 }}>
              <p className="hero__label">Email</p>
              <a href={`mailto:${SITE.email}`} style={{ display: 'inline-block', marginTop: 8, color: '#fff', fontWeight: 600, fontSize: 18 }}>{SITE.email}</a>
              <p className="hero__label" style={{ marginTop: 24 }}>Based in</p>
              <p style={{ marginTop: 8 }}>{SITE.location}</p>
              <p className="hero__label" style={{ marginTop: 24, marginBottom: 14 }}>Follow {SITE.handle.toUpperCase()}</p>
              <Socials size={18} />
            </div>
            <div className="card card--line" style={{ padding: 28 }}>
              <p className="eyebrow">For firm engagements</p>
              <ul style={{ listStyle: 'none', marginTop: 16, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15.5 }}>
                <li>UAE tax and accounting:<br /><a href={COMPANIES.acc.url} target="_blank" rel="noopener noreferrer">{COMPANIES.acc.domain}</a></li>
                <li>Software, SaaS and business setup:<br /><a href={COMPANIES.xg.url} target="_blank" rel="noopener noreferrer">{COMPANIES.xg.domain}</a></li>
                <li>Pakistan tax and services:<br /><a href={COMPANIES.xgpk.url} target="_blank" rel="noopener noreferrer">{COMPANIES.xgpk.domain}</a></li>
              </ul>
            </div>
          </aside>
          <div className="card card--line" style={{ flex: '2 1 520px', minWidth: 0, padding: 'clamp(24px, 4vw, 44px)' }}>
            <h2 className="h2" style={{ marginTop: 0, fontSize: 28 }}>Send a <span className="hl">message</span></h2>
            <p className="muted" style={{ marginTop: 8 }}>Fields marked * are required.</p>
            <ContactForm defaultTopic={defaultTopic} />
          </div>
        </div>
      </section>
      <section className="section--tight bg-white">
        <div className="wrap">
          <p className="eyebrow">Before you write</p>
          <div className="grid grid--3" style={{ marginTop: 28 }}>
            {[
              ['Tax questions', 'Include your entity type, emirate or free zone, and the tax period you’re asking about.'],
              ['ERP and software', 'Share your current system, team size and the problem you want solved.'],
              ['Speaking and media', 'Send the event, date, audience and topic — tax, finance, SaaS or AI.'],
            ].map(([t, d]) => (
              <article key={t} className="card card--line exp-card"><h3 style={{ marginTop: 0 }}>{t}</h3><p>{d}</p></article>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
