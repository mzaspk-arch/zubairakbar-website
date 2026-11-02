import { OG_SIZE, brandOgImage } from '@/lib/og';

export const alt = 'Zubair Akbar — Building Businesses. Empowering Finance. Creating Technology.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function Image() {
  return brandOgImage({ label: 'FINANCE • TAX • SAAS • ERP', lines: ['Building Businesses.', 'Empowering Finance.', 'Creating Technology.'], highlight: 2, footer: 'CFO · UAE Tax Agent · SaaS Founder · zubairakbar.com' });
}
