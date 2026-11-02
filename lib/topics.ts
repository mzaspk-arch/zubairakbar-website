/** Blog topics and post types — safe to import in browser components (no file-system access) */

export const TOPICS = {
  'uae-tax': { label: 'TAX • UAE', name: 'UAE Taxation', short: 'UAE Tax', intro: 'Corporate Tax, VAT and Excise — registration, filing, reliefs and penalties.' },
  'pakistan-tax': { label: 'TAX • PAKISTAN', name: 'Pakistan Taxation', short: 'Pakistan Tax', intro: 'Income tax, filing status and compliance for businesses and overseas Pakistanis.' },
  saas: { label: 'SAAS', name: 'SaaS', short: 'SaaS', intro: 'Building, pricing and running software products — lessons in public.' },
  'ai-automation': { label: 'AI AUTOMATION', name: 'AI Automation', short: 'AI Automation', intro: 'AI agents, e-invoicing readiness and automation for finance teams.' },
} as const;

export type Topic = keyof typeof TOPICS;
export const isTopic = (t: string): t is Topic => t in TOPICS;

export interface PostMeta {
  slug: string;
  topic: Topic;
  title: string;
  description: string;
  date: string;
  updated: string;
  category: string;
  kicker: string;
  coverTitle: string;
  cover: 'dark' | 'steel' | 'light';
  readingTime: string;
  faq: { q: string; a: string }[];
}

