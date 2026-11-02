import LegalPage from '@/components/LegalPage';
import { pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMeta({ title: 'Privacy Policy', description: 'How zubairakbar.com collects, uses and protects your personal data.', path: '/privacy-policy' });

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
const firms = 'Accentureon Consulting LLC, Xpert Group FZE-LLC or Xpert Group Pakistan';

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="How zubairakbar.com collects, uses and protects your personal data."
      path="/privacy-policy"
      updated="2 November 2026"
      footer={{ href: '/terms', label: 'Read the Terms & Conditions' }}
      summary={<><strong>In short:</strong> I collect only what you send through the contact form and basic technical data needed to run and protect this site. I use it to reply to you. I never sell your data or add you to a mailing list without your permission.</>}
      sections={[
        { id: 'who-i-am', title: 'Who I am', body: <p>This website, zubairakbar.com, is the personal website of Zubair Akbar, based in Dubai, United Arab Emirates (&ldquo;I&rdquo;, &ldquo;me&rdquo;, &ldquo;my&rdquo;). I am responsible for the personal data collected through this website. You can reach me at {mail}.</p> },
        { id: 'data-i-collect', title: 'Data I collect', body: <>
          <ul>
            <li><strong>Information you give me:</strong> your name, email address, company (optional), the topic you choose and your message when you use the contact form or email me.</li>
            <li><strong>Technical information:</strong> IP address, browser and device type, pages visited, referring website and date and time of visit, recorded in server logs and, if you agree, in analytics.</li>
            <li><strong>Spam-protection signals:</strong> data processed by the form&apos;s bot check to confirm you are a person.</li>
          </ul>
          <p>Please do not send sensitive information (for example identity numbers, bank details or health information) through the contact form.</p></> },
        { id: 'how-i-use-it', title: 'How I use it', body: <>
          <ul>
            <li>To read and reply to your enquiry.</li>
            <li>To pass your enquiry to {firms}, only where you ask about their services.</li>
            <li>To keep the website secure, prevent spam and fix problems.</li>
            <li>To understand which content is useful, using aggregated analytics.</li>
          </ul>
          <p>I do not sell or rent personal data, and I do not send newsletters or marketing emails unless you clearly ask to receive them.</p></> },
        { id: 'legal-basis', title: 'Legal basis', body: <>
          <p>I process personal data in line with the UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data and, for visitors from the European Union or United Kingdom, the principles of the GDPR. I rely on:</p>
          <ul>
            <li><strong>Your consent</strong> — when you submit the contact form or accept analytics cookies. You can withdraw consent at any time.</li>
            <li><strong>Legitimate interests</strong> — keeping the website secure and working properly.</li>
            <li><strong>Legal obligations</strong> — where the law requires me to keep or disclose information.</li>
          </ul></> },
        { id: 'cookies', title: 'Cookies & analytics', body: <p>The website uses only cookies that are essential for it to work and stay secure. Analytics are privacy-friendly, measure visits in aggregate and run only if you accept them in the cookie banner. You can change your choice at any time from the &ldquo;Cookie settings&rdquo; link in the footer, or block cookies in your browser.</p> },
        { id: 'sharing', title: 'Sharing', body: <>
          <p>I share personal data only with:</p>
          <ul>
            <li>Service providers that run the website for me — web hosting, email hosting, security and content delivery — who may use the data only to provide their service.</li>
            <li>The company you asked about ({firms}), when your enquiry is about their services.</li>
            <li>Authorities, when required by law.</li>
          </ul></> },
        { id: 'international-transfers', title: 'International transfers', body: <p>Some service providers may store data on servers outside the UAE. Where this happens, I use providers that apply appropriate safeguards to protect personal data.</p> },
        { id: 'retention', title: 'Retention', body: <ul>
          <li>Contact form messages and replies: up to 24 months after our last contact, unless they lead to an engagement, in which case the relevant company&apos;s record-keeping rules apply.</li>
          <li>Server and security logs: up to 90 days.</li>
          <li>Aggregated analytics: kept without identifying you.</li>
        </ul> },
        { id: 'your-rights', title: 'Your rights', body: <p>You can ask me to give you a copy of your personal data, correct it, delete it, restrict or object to its use, or withdraw your consent. Email {mail} and I will respond within 30 days. If you are not satisfied, you may complain to the UAE Data Office or the data protection authority in your country.</p> },
        { id: 'security', title: 'Security', body: <p>The website uses encrypted connections (HTTPS), spam protection and access controls. No online service is completely secure, but I take reasonable steps to protect your data.</p> },
        { id: 'children-links-changes', title: 'Children, links & changes', body: <p>This website is not intended for children under 18, and I do not knowingly collect their data. Links to other websites, including my SaaS products and brands, are covered by those websites&apos; own privacy policies. I may update this policy; the date at the top shows the latest version.</p> },
        { id: 'contact', title: 'Contact', body: <p>Questions about this policy or your data: {mail} · Dubai, United Arab Emirates.</p> },
      ]}
    />
  );
}
