import CtaBand from '@/components/CtaBand';
import { SocialIcon } from '@/components/Icons';
import JsonLd from '@/components/JsonLd';
import PageBanner from '@/components/PageBanner';
import ProductCard from '@/components/ProductCard';
import ProductFilter from '@/components/ProductFilter';
import Shell from '@/components/Shell';
import { PERSON_ID, pageMeta } from '@/lib/seo';
import { BRANDS, COMPANIES, PRODUCTS, brandSocial, ownerName } from '@/lib/site';

export const metadata = pageMeta({
  title: 'SaaS Products & Brands — Whatsell.ai, HireSyncer, FormSyncer and more',
  description: 'Twelve SaaS products and six more brands by Zubair Akbar: Whatsell.ai, HireSyncer, FormSyncer, SignSyncer, EduSyncer, EduNestra, Taxpertancy, Taxpert.pk and more.',
  path: '/brands',
});

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'live', label: 'Live' },
  { key: 'sales', label: 'Sales & growth' },
  { key: 'ops', label: 'Operations & automation' },
  { key: 'people', label: 'HR & education' },
  { key: 'xg', label: 'By Xpert Group' },
  { key: 'acc', label: 'By Accentureon' },
];

const SOCIAL_KEYS = ['linkedin', 'facebook', 'instagram', 'x', 'youtube'] as const;
const LABEL = { linkedin: 'LinkedIn', facebook: 'Facebook', instagram: 'Instagram', x: 'X', youtube: 'YouTube' };

export default function BrandsPage() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SaaS products by Zubair Akbar',
    itemListElement: PRODUCTS.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: p.name,
        url: `https://${p.domain}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: p.description,
        publisher: { '@type': 'Organization', name: ownerName(p.owner), url: p.owner === 'acc' ? COMPANIES.acc.url : COMPANIES.xg.url },
        creator: { '@id': PERSON_ID },
      },
    })),
  };

  return (
    <Shell active="brands">
      <PageBanner
        crumbs={[{ name: 'Brands', href: '/brands' }]}
        title={<>My <span className="hl">brands</span></>}
        intro={`${PRODUCTS.length === 12 ? 'Twelve' : PRODUCTS.length} SaaS products and ${BRANDS.length === 6 ? 'six' : BRANDS.length} more brands across tax, marketing, education, health, heritage and fashion — in the UAE and Pakistan.`}
      >
        <div className="btn-row" style={{ marginTop: 32 }}>
          <a className="btn btn--primary" href="#saas">SaaS products</a>
          <a className="btn btn--ghost" href="#more-brands">Other brands</a>
        </div>
      </PageBanner>

      <section className="section--tight bg-dark on-dark">
        <div className="wrap split">
          <div className="split__text">
            <p className="hero__label">Featured product · WhatsApp CRM · Live</p>
            <h2 className="h2" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              <span className="logo-tile" style={{ width: 64, height: 64 }}>
                <img src="/images/logos/whatsell.webp" alt="" width={46} height={46} />
              </span>
              Whatsell.ai
            </h2>
            <p className="lead" style={{ marginTop: 20, color: 'var(--off-white)' }}>
              A WhatsApp Business API platform that lets teams sell, support and run broadcast campaigns from one place — built for businesses in the UAE and Pakistan.
            </p>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <a className="btn btn--primary" href="https://whatsell.ai" target="_blank" rel="noopener noreferrer">Visit whatsell.ai</a>
              <a className="btn btn--ghost" href="/contact?topic=saas">Book a demo</a>
            </div>
          </div>
          <div aria-hidden="true" style={{ flex: '1 1 320px', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15 }}>
            <p style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,.1)' }}>Hi, is the Pro plan available?</p>
            <p style={{ alignSelf: 'flex-end', padding: '12px 16px', borderRadius: '14px 14px 4px 14px', background: 'var(--light-blue)', color: 'var(--ink)' }}>Yes — I&apos;ve sent you the details and a payment link.</p>
            <p style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '14px 14px 14px 4px', background: 'rgba(255,255,255,.1)' }}>Perfect, thank you!</p>
          </div>
        </div>
      </section>

      <section id="saas" className="section bg-light">
        <div className="wrap">
          <p className="eyebrow">SaaS products</p>
          <h2 className="h2">Software built by an accountant <span className="hl">who signs tax returns</span></h2>
          <ProductFilter filters={FILTERS}>
            {PRODUCTS.map((p) => (
              <div key={p.slug} data-tags={['all', p.status === 'Live' ? 'live' : '', p.category, p.owner].join(' ')} style={{ display: 'flex' }}>
                <ProductCard p={p} />
              </div>
            ))}
          </ProductFilter>
        </div>
      </section>

      <section id="more-brands" className="section bg-white">
        <div className="wrap">
          <p className="eyebrow">More brands</p>
          <h2 className="h2">Beyond software: <span className="hl">brands with a purpose</span></h2>
          <div className="grid grid--fill" style={{ marginTop: 40 }}>
            {BRANDS.map((b) => {
              const s = brandSocial(b);
              return (
                <article key={b.name} className="card card--line card--hover p-card">
                  <span className="logo-tile" style={{ width: 64, height: 64 }}>
                    <img src={`/images/logos/${b.logo}.webp`} alt={`${b.name} logo`} width={46} height={46} loading="lazy" style={b.logo === 'hijama' ? { width: '86%', height: '86%' } : undefined} />
                  </span>
                  <p className="p-card__tag">{b.tag}</p>
                  <h3>{b.name}</h3>
                  <p className="p-card__desc">{b.description}</p>
                  <div className="p-card__foot">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      {b.sites.map((site) => (
                        <a key={site.url} className="link-arrow" href={site.url} target="_blank" rel="noopener noreferrer">{site.domain} →</a>
                      ))}
                    </div>
                    <div className="p-card__links">
                      {SOCIAL_KEYS.map((k) =>
                        s[k] ? (
                          <a key={k} className="social social--sm social--line" href={s[k]} target="_blank" rel="noopener noreferrer" aria-label={`${b.name} on ${LABEL[k]}`}>
                            <SocialIcon name={k} size={15} />
                          </a>
                        ) : null,
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title={<>Want early access or a <span style={{ color: 'var(--light-blue)' }}>partnership?</span></>}
        text="Resellers, implementation partners and early customers are welcome."
        primary={{ href: '/contact?topic=saas', label: 'Talk to me' }}
      />
      <JsonLd data={itemList} />
    </Shell>
  );
}
