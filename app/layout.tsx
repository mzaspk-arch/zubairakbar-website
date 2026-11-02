import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import CookieBanner from '@/components/CookieBanner';
import JsonLd from '@/components/JsonLd';
import { SITE } from '@/lib/site';
import { personLd, websiteLd } from '@/lib/seo';
import './globals.css';

// Fonts are stored in this repository and served from this site (no third-party font requests)
const montserrat = localFont({
  src: [
    { path: '../assets/fonts/montserrat-latin-600-normal.woff2', weight: '600' },
    { path: '../assets/fonts/montserrat-latin-700-normal.woff2', weight: '700' },
    { path: '../assets/fonts/montserrat-latin-800-normal.woff2', weight: '800' },
  ],
  variable: '--font-montserrat',
  display: 'swap',
});
const inter = localFont({
  src: [
    { path: '../assets/fonts/inter-latin-400-normal.woff2', weight: '400' },
    { path: '../assets/fonts/inter-latin-500-normal.woff2', weight: '500' },
    { path: '../assets/fonts/inter-latin-600-normal.woff2', weight: '600' },
    { path: '../assets/fonts/inter-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = { themeColor: '#151515', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <CookieBanner />
        <JsonLd data={[personLd(), websiteLd()]} />
      </body>
    </html>
  );
}
