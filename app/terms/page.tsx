import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMeta({ title: 'Terms & Conditions', description: 'The rules for using zubairakbar.com and its content.', path: '/terms' });

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      intro="The rules for using zubairakbar.com and its content."
      path="/terms"
      updated="2 November 2026"
      footer={{ href: '/privacy-policy', label: 'Read the Privacy Policy' }}
      summary={<><strong>In short:</strong> the content here is general information, not tax, legal or financial advice. You are welcome to read, share and link to it with credit, but please don&apos;t copy it wholesale or misuse the site.</>}
      sections={[
        { id: 'acceptance', title: 'Acceptance', body: <p>By using zubairakbar.com you agree to these terms and to the <Link href="/privacy-policy">Privacy Policy</Link>. If you do not agree, please do not use the website.</p> },
        { id: 'about-this-website', title: 'About this website', body: <p>This is the personal website of Zubair Akbar, Dubai, United Arab Emirates. It presents my background, the businesses I lead, my SaaS products and brands, and articles on taxation, SaaS and AI automation.</p> },
        { id: 'not-professional-advice', title: 'Not professional advice', body: <>
          <p>Articles and other content on this website are <strong>general information, not tax, legal, accounting or financial advice</strong>. Tax laws and official guidance in the UAE and Pakistan change often, and every situation is different. Do not act on this content without advice on your own circumstances.</p>
          <p>Reading this website or sending me a message does not create an adviser–client relationship. Professional services are provided only by the relevant company — Accentureon Consulting LLC, Xpert Group FZE-LLC or Xpert Group Pakistan — under a signed engagement letter.</p></> },
        { id: 'intellectual-property', title: 'Intellectual property', body: <>
          <p>The text, design, photographs and personal logo on this website belong to Zubair Akbar. The names and logos of the SaaS products shown here belong to the company that owns each product: EduSyncer, HireSyncer and CoreSyncer ERP to Accentureon Consulting LLC, and all other products and brands to Xpert Group FZE-LLC.</p>
          <p>You may link to any page and quote short excerpts with a clear credit and link back. Copying whole articles, reusing images or logos, or presenting the content as your own requires my written permission.</p></> },
        { id: 'acceptable-use', title: 'Acceptable use', body: <ul>
          <li>Do not try to break into, overload or disrupt the website.</li>
          <li>Do not use the contact form to send spam, advertising or harmful content.</li>
          <li>Do not scrape the website in a way that harms its performance, or use its content to mislead others.</li>
        </ul> },
        { id: 'products-other-websites', title: 'Products & other websites', body: <p>Product descriptions here are short summaries. Each SaaS product and brand has its own website, and its own terms, pricing and privacy policy apply when you use it. I am not responsible for the content of websites I link to.</p> },
        { id: 'accuracy', title: 'Accuracy', body: <p>I work to keep content accurate and up to date, and each article shows when it was last updated. Some information may still become out of date, and the website is provided &ldquo;as is&rdquo; without guarantees of accuracy, completeness or availability.</p> },
        { id: 'limitation-of-liability', title: 'Limitation of liability', body: <p>To the extent the law allows, I am not liable for any loss or damage arising from your use of this website or reliance on its content, including decisions made on the basis of articles. Nothing in these terms limits liability that cannot be limited by law.</p> },
        { id: 'governing-law', title: 'Governing law', body: <p>These terms are governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have jurisdiction over any dispute about them.</p> },
        { id: 'changes-contact', title: 'Changes & contact', body: <p>I may update these terms from time to time; the date at the top shows the latest version. Questions: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p> },
      ]}
    />
  );
}
