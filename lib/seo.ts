import type { Metadata } from 'next';
import { COMPANIES, SITE, SOCIAL, absoluteUrl } from './site';

/** Builds page metadata with canonical URL, Open Graph and Twitter tags */
export function pageMeta({
  title,
  description,
  path,
  image = '/opengraph-image',
  type = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === 'article' ? { publishedTime, modifiedTime, authors: [absoluteUrl('/about')] } : {}),
    },
    twitter: { card: 'summary_large_image', site: SITE.handle, creator: SITE.handle, title, description, images: [image] },
  };
}

export const PERSON_ID = `${SITE.url}/#person`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: SITE.name,
  url: SITE.url,
  image: absoluteUrl('/images/zubair-akbar-studio.jpg'),
  email: `mailto:${SITE.email}`,
  jobTitle: 'Group CFO, FTA-approved Tax Agent and SaaS founder',
  description: SITE.description,
  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
  knowsAbout: ['UAE Corporate Tax', 'UAE VAT', 'UAE Excise Tax', 'Pakistan taxation', 'IFRS', 'ERP', 'Odoo', 'SaaS', 'AI automation'],
  knowsLanguage: ['en', 'ur', 'pa', 'ar'],
  hasCredential: [{ '@type': 'EducationalOccupationalCredential', name: 'FTA-approved Tax Agent', identifier: `TAAN ${SITE.taan}` }],
  worksFor: Object.values(COMPANIES).map((c) => ({ '@type': 'Organization', name: c.name, url: c.url })),
  sameAs: SOCIAL.map((s) => s.href),
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': PERSON_ID },
});

export const breadcrumbLd = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
});

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
