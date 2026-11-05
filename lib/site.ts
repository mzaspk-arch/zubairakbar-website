/**
 * Site-wide content and settings for zubairakbar.com.
 * Edit text, links and products here — every page reads from this file.
 */

export const SITE = {
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://zubairakbar.com').replace(/\/$/, ''),
  name: 'Zubair Akbar',
  title: 'Zubair Akbar | Finance, Tax & Technology Entrepreneur',
  description:
    'Chartered Accountant, Group CFO and FTA-approved Tax Agent (TAAN 20059440) building SaaS. UAE & Pakistan tax, ERP and AI automation insights.',
  tagline: 'Building Businesses. Empowering Finance. Creating Technology.',
  positioning:
    'I help UAE and Pakistani businesses stay compliant, run on clean numbers, and grow with the right technology.',
  email: 'contact@zubairakbar.com',
  location: 'Dubai, United Arab Emirates',
  handle: '@zubairakbarpk',
  taan: '20059440',
  locale: 'en_AE',
};

export const NAV = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/about', label: 'About', key: 'about' },
  { href: '/brands', label: 'Brands', key: 'brands' },
  { href: '/business', label: 'Business', key: 'business' },
  { href: '/blog', label: 'Blog', key: 'blog' },
] as const;

export type NavKey = (typeof NAV)[number]['key'] | 'contact' | 'none';

export const SOCIAL = [
  { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/zubairakbarpk' },
  { key: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/zubairakbarpk' },
  { key: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/zubairakbarpk' },
  { key: 'x', label: 'X', href: 'https://x.com/zubairakbarpk' },
  { key: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@zubairakbarpk' },
  { key: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@zubairakbarpk' },
] as const;

export type SocialKey = (typeof SOCIAL)[number]['key'];

/* ---------------- Companies ---------------- */

export const COMPANIES = {
  xg: { name: 'Xpert Group FZE-LLC', url: 'https://xpertgroup.me', domain: 'xpertgroup.me' },
  xgpk: { name: 'Xpert Group Pakistan', url: 'https://xpertgroup.pk', domain: 'xpertgroup.pk' },
  acc: { name: 'Accentureon Consulting LLC', url: 'https://accentureon.com', domain: 'accentureon.com' },
} as const;

/* ---------------- SaaS products ---------------- */

export type Status = 'Live' | 'Pre-launch' | 'Coming soon';
export type Category = 'sales' | 'ops' | 'people';
export type Owner = 'xg' | 'acc';

export interface Product {
  name: string;
  slug: string; // social handle / logo file
  domain: string;
  tag: string;
  category: Category;
  status: Status;
  owner: Owner;
  description: string;
  linkedin?: string; // path after linkedin.com/
  x?: string;
}

export const PRODUCTS: Product[] = [
  { name: 'Whatsell.ai', slug: 'whatsellai', domain: 'whatsell.ai', tag: 'WhatsApp CRM', category: 'sales', status: 'Live', owner: 'xg', description: 'WhatsApp Business API platform for sales, support and broadcast campaigns.', linkedin: 'showcase/whatsellai', x: 'whatsellai' },
  { name: 'HireSyncer', slug: 'hiresyncer', domain: 'hiresyncer.com', tag: 'Recruitment AI', category: 'people', status: 'Live', owner: 'acc', description: 'AI CV screening and hiring automation for teams hiring across several companies.' },
  { name: 'FormSyncer', slug: 'formsyncer', domain: 'formsyncer.com', tag: 'Forms automation', category: 'ops', status: 'Live', owner: 'xg', description: 'Forms automation platform: build forms, collect responses and route the data into your workflows.' },
  { name: 'SignSyncer', slug: 'signsyncer', domain: 'signsyncer.com', tag: 'Email signatures', category: 'sales', status: 'Pre-launch', owner: 'xg', description: 'Centrally managed, on-brand email signatures for every employee.' },
  { name: 'EduSyncer', slug: 'edusyncer', domain: 'edusyncer.com', tag: 'Education', category: 'people', status: 'Pre-launch', owner: 'acc', description: 'Management platform for schools, academies, tutors and homeschooling families.' },
  { name: 'EduNestra', slug: 'edunestra', domain: 'edunestra.com', tag: 'Homeschooling', category: 'people', status: 'Pre-launch', owner: 'xg', description: 'Homeschooling platform for families — structured learning plans, lessons and progress in one place.' },
  { name: 'GrowSyncer', slug: 'growsyncer', domain: 'growsyncer.com', tag: 'Leads & pipeline', category: 'sales', status: 'Coming soon', owner: 'xg', description: 'Business growth platform for lead management and sales pipeline tracking.' },
  { name: 'ReachSyncer', slug: 'reachsyncer', domain: 'reachsyncer.com', tag: 'LinkedIn growth', category: 'sales', status: 'Coming soon', owner: 'xg', description: 'Plans, designs and schedules LinkedIn posts in your own voice and brand.' },
  { name: 'DemoSyncer', slug: 'demosyncer', domain: 'demosyncer.com', tag: 'Demo automation', category: 'sales', status: 'Coming soon', owner: 'xg', description: 'Automated, interactive product demos for SaaS companies.' },
  { name: 'SendSyncer', slug: 'sendsyncer', domain: 'sendsyncer.com', tag: 'Docs, teams & tasks', category: 'ops', status: 'Coming soon', owner: 'xg', description: 'Manage and sync documentation, teams and tasks in one workspace.' },
  { name: 'RelaySyncer', slug: 'relaysyncer', domain: 'relaysyncer.com', tag: 'MCP & servers', category: 'ops', status: 'Coming soon', owner: 'xg', description: 'All-in-one management of MCP connections, servers and integrations.' },
  { name: 'CoreSyncer ERP', slug: 'coresyncer', domain: 'coresyncer.com', tag: 'ERP', category: 'ops', status: 'Coming soon', owner: 'acc', description: 'ERP for growing SMEs — finance, operations and tax-ready books in one place.', linkedin: 'company/coresyncer', x: 'coresyncer' },
];

/** Products shown on the home page */
export const FEATURED = ['Whatsell.ai', 'HireSyncer', 'FormSyncer', 'SignSyncer', 'EduSyncer', 'EduNestra'];

/* ---------------- Other brands ---------------- */

export interface Brand {
  name: string;
  logo: string;
  tag: string;
  description: string;
  sites: { url: string; domain: string }[];
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  x?: string;
}

export const BRANDS: Brand[] = [
  { name: 'Taxpertancy', logo: 'taxpertancy', tag: 'UAE tax & consulting', description: 'UAE taxation and corporate consulting: Corporate Tax, VAT, Excise and business advisory.', sites: [{ url: 'https://taxpertancy.com', domain: 'taxpertancy.com' }], facebook: 'taxpertancy', instagram: 'taxpertancy', linkedin: 'showcase/taxpertancy', youtube: 'taxpertancy', x: 'taxpertancy' },
  { name: 'Taxpert.pk', logo: 'taxpertpk', tag: 'Pakistan tax & consulting', description: 'Taxation, business and corporate consulting for companies and individuals in Pakistan.', sites: [{ url: 'https://taxpert.pk', domain: 'taxpert.pk' }], facebook: 'taxpertpak', instagram: 'taxpertpak', linkedin: 'showcase/taxpertpak', youtube: 'taxpertpak', x: 'taxpertpak' },
  { name: 'Marketrategist', logo: 'marketrategist', tag: 'Marketing strategy', description: 'Marketing strategy and marketing automation for growing businesses.', sites: [{ url: 'https://marketrategist.com', domain: 'marketrategist.com' }], facebook: 'marketrategist', instagram: 'marketrategist', linkedin: 'showcase/marketrategist', youtube: 'marketrategist' },
  { name: 'Reesha', logo: 'reesha', tag: 'Fashion', description: 'Clothing, headwear and footwear brand for Pakistan and the Middle East.', sites: [{ url: 'https://reesha.pk', domain: 'reesha.pk' }, { url: 'https://reesha.com', domain: 'reesha.com' }], facebook: 'reeshapak', instagram: 'reeshapak', youtube: 'reeshapak' },
  { name: 'Ilm Ul Miras', logo: 'ilmulmiras', tag: 'Islamic heritage', description: 'Islamic Miras Encyclopaedia — a growing library of Islamic heritage and knowledge.', sites: [{ url: 'https://ilmulmiras.com', domain: 'ilmulmiras.com' }], facebook: 'ilmulmiras', instagram: 'ilmulmiras', youtube: 'ilmulmiras' },
  { name: 'Hijama.com.pk', logo: 'hijama', tag: 'Sunnah healing', description: 'Hijama (cupping) — the Sunnah way of cure, with guidance and bookings in Pakistan.', sites: [{ url: 'https://hijama.com.pk', domain: 'hijama.com.pk' }], facebook: 'hijamapk', instagram: 'hijamapak', youtube: 'hijamapak' },
];

/* ---------------- Helpers ---------------- */

export const productSocial = (p: Product) => ({
  facebook: `https://www.facebook.com/${p.slug}`,
  instagram: `https://www.instagram.com/${p.slug}`,
  linkedin: `https://www.linkedin.com/${p.linkedin || `showcase/${p.slug}`}`,
  youtube: `https://www.youtube.com/@${p.slug}`,
  x: p.x ? `https://x.com/${p.x}` : undefined,
});

export const brandSocial = (b: Brand) => ({
  facebook: b.facebook ? `https://www.facebook.com/${b.facebook}` : undefined,
  instagram: b.instagram ? `https://www.instagram.com/${b.instagram}` : undefined,
  linkedin: b.linkedin ? `https://www.linkedin.com/${b.linkedin}` : undefined,
  youtube: b.youtube ? `https://www.youtube.com/@${b.youtube}` : undefined,
  x: b.x ? `https://x.com/${b.x}` : undefined,
});

export const logoFor = (name: string) =>
  `/images/logos/${name.toLowerCase().replace(' erp', '').replace('.ai', '').replace(/\W+/g, '')}.webp`;

export const ownerName = (o: Owner) => (o === 'acc' ? COMPANIES.acc.name : COMPANIES.xg.name);

export const absoluteUrl = (path = '/') => `${SITE.url}${path === '/' ? '/' : path}`;

/** Contact form topics (used by the form and the email API) */
export const TOPIC_OPTIONS = [
  { value: 'uae-tax', label: 'UAE Corporate Tax, VAT or Excise' },
  { value: 'pakistan-tax', label: 'Pakistan taxation' },
  { value: 'erp', label: 'ERP & Odoo' },
  { value: 'saas', label: 'A SaaS product or partnership' },
  { value: 'ai', label: 'AI & automation' },
  { value: 'speaking', label: 'Speaking or media' },
  { value: 'other', label: 'Something else' },
];
