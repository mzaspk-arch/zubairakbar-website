import fs from 'node:fs';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

const font = (file: string) => fs.readFileSync(path.join(process.cwd(), 'assets', 'fonts', file));
const portrait = () => `data:image/jpeg;base64,${fs.readFileSync(path.join(process.cwd(), 'public', 'images', 'zubair-akbar-headshot.jpg')).toString('base64')}`;

/** Brand share image: charcoal gradient, slate bar, white headline with one light-blue line, round photo footer */
export function brandOgImage({ label, lines, highlight, footer = 'zubairakbar.com' }: { label: string; lines: string[]; highlight?: number; footer?: string }) {
  const size = lines.join(' ').length > 60 ? 54 : 64;
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '64px 72px', background: 'radial-gradient(ellipse 70% 90% at 78% 40%, #8C8C8C 0%, #3C3C3C 72%)', color: '#fff', fontFamily: 'Inter' }}>
        <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, color: '#D0D0D0' }}>{label}</div>
        <div style={{ display: 'flex', borderLeft: '8px solid #5A7EA8', paddingLeft: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Montserrat', fontWeight: 800, fontSize: size, lineHeight: 1.08, textTransform: 'uppercase' }}>
            {lines.map((l, i) => <span key={i} style={{ color: i === highlight ? '#8FB4E3' : '#fff' }}>{l}</span>)}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, borderTop: '1px solid rgba(255,255,255,.25)', paddingTop: 24 }}>
          <img src={portrait()} width={76} height={76} style={{ borderRadius: 999, border: '4px solid #fff', objectFit: 'cover' }} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Montserrat', fontWeight: 800, fontSize: 28 }}>Zubair Akbar</span>
            <span style={{ fontSize: 22, color: '#D0D0D0' }}>{footer}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: 'Montserrat', data: font('montserrat-latin-800-normal.woff'), weight: 800, style: 'normal' },
        { name: 'Inter', data: font('inter-latin-500-normal.woff'), weight: 500, style: 'normal' },
      ],
    },
  );
}

/** Splits a title into up to 4 lines of ~22 characters */
export function wrapTitle(title: string, max = 22, maxLines = 4) {
  const words = title.split(/\s+/);
  const lines: string[] = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) { const rest = lines.splice(maxLines - 1).join(' '); lines.push(rest.length > max ? `${rest.slice(0, max - 1)}…` : rest); }
  return lines;
}
