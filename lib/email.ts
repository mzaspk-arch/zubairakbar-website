/**
 * Branded HTML emails for the contact form.
 * Table-based with inline styles so they render the same in Outlook, Gmail and Apple Mail.
 * Images load from https://zubairakbar.com/email/ (the same files the email signature uses).
 */
import { SITE, SOCIAL } from './site';

/** Images are attached inside the email (cid:) so Outlook shows them without asking to "download pictures" */
const EMBED = ['logo', 'zubair-akbar-128', ...SOCIAL.map((s) => s.key), 'whatsapp'] as const;
const img = (name: string) => `cid:${name}@zubairakbar.com`;

/** Inline attachments for nodemailer: every image the layout uses */
export function inlineImages(dir: string, { photo = true } = {}) {
  return [...new Set(EMBED)].filter((n) => photo || n !== 'zubair-akbar-128').map((name) => ({
    filename: `${name}.png`,
    path: `${dir}/${name}.png`,
    cid: `${name}@zubairakbar.com`,
    contentDisposition: 'inline' as const,
  }));
}
const C = { ink: '#151515', muted: '#5C5C5C', grey: '#8C8C8C', line: '#D0D0D0', bg: '#F2F2F2', slate: '#5A7EA8', steel: '#3F5F86' };
const FONT = "Arial, Helvetica, sans-serif";
const HEAD = "Montserrat, Arial, Helvetica, sans-serif";

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

/** Removes web links from text we echo back to a visitor, so the form can't be used to send links to strangers */
export const stripLinks = (s: string) => s.replace(/\b(?:https?:\/\/|www\.)\S+/gi, '[link removed]');

const socialRow = () =>
  SOCIAL.map(
    (s) =>
      `<td style="padding:0 6px 0 0;"><a href="${s.href}" style="text-decoration:none;"><img src="${img(s.key)}" width="28" height="28" alt="${s.label}" style="display:block;border:0;"></a></td>`,
  ).join('') +
  `<td style="padding:0;"><a href="https://wa.me/971507821371" style="text-decoration:none;"><img src="${img('whatsapp')}" width="28" height="28" alt="WhatsApp" style="display:block;border:0;"></a></td>`;

/** Wraps content in the branded layout: logo header, white card, signature block, social icons, footer */
export function layout({ preheader, body, signature = true }: { preheader: string; body: string; signature?: boolean }) {
  const year = new Date().getFullYear();
  const sig = signature
    ? `
<tr><td style="padding:8px 40px 0 40px;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;border-top:1px solid ${C.line};width:100%;">
    <tr><td style="padding:24px 0 0 0;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr>
          <td valign="middle" style="padding:0 16px 0 0;"><img src="${img('zubair-akbar-128')}" width="64" height="64" alt="Zubair Akbar" style="display:block;border:0;width:64px;height:64px;"></td>
          <td valign="middle" style="border-left:3px solid ${C.slate};padding:0 0 0 14px;font-family:${FONT};">
            <div style="font-family:${HEAD};font-size:16px;font-weight:bold;color:${C.ink};letter-spacing:.5px;">ZUBAIR AKBAR</div>
            <div style="font-size:13px;font-weight:bold;color:${C.steel};line-height:19px;">Finance, Tax &amp; Technology Entrepreneur</div>
            <div style="font-size:12px;color:${C.muted};line-height:18px;">FTA-approved Tax Agent (TAAN ${SITE.taan})</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</td></tr>`
    : '';

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(SITE.name)}</title></head>
<body style="margin:0;padding:0;background:${C.bg};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.bg};">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:${C.bg};">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:600px;background:#FFFFFF;border-top:6px solid ${C.slate};">
    <tr><td style="padding:32px 40px 8px 40px;">
      <a href="${SITE.url}" style="text-decoration:none;"><img src="${img('logo')}" width="129" height="44" alt="Zubair Akbar" style="display:block;border:0;width:129px;height:44px;"></a>
    </td></tr>
    <tr><td style="padding:16px 40px 8px 40px;font-family:${FONT};font-size:15px;line-height:24px;color:${C.ink};">
      ${body}
    </td></tr>
    ${sig}
    <tr><td style="padding:24px 40px 32px 40px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
        <tr><td colspan="8" style="padding:0 0 10px 0;font-family:${FONT};font-size:12px;letter-spacing:1px;color:${C.muted};">FOLLOW <b style="color:${C.ink};letter-spacing:0;">${SITE.handle}</b></td></tr>
        <tr>${socialRow()}</tr>
      </table>
    </td></tr>
  </table>
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;max-width:600px;">
    <tr><td style="padding:18px 40px;font-family:${FONT};font-size:11.5px;line-height:18px;color:${C.grey};text-align:center;">
      <a href="${SITE.url}" style="color:${C.steel};text-decoration:none;font-weight:bold;">zubairakbar.com</a> &nbsp;·&nbsp;
      <a href="mailto:${SITE.email}" style="color:${C.grey};text-decoration:none;">${SITE.email}</a> &nbsp;·&nbsp; UAE | Pakistan<br>
      © ${year} ${esc(SITE.name)} · <a href="${SITE.url}/privacy-policy" style="color:${C.grey};">Privacy Policy</a>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;
}

const row = (label: string, value: string) =>
  `<tr><td style="padding:8px 12px 8px 0;font-family:${FONT};font-size:13px;color:${C.muted};white-space:nowrap;vertical-align:top;width:90px;">${label}</td><td style="padding:8px 0;font-family:${FONT};font-size:14px;color:${C.ink};vertical-align:top;">${value}</td></tr>`;

const quote = (text: string) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:8px 0 0 0;"><tr><td bgcolor="${C.bg}" style="padding:16px 18px;background:${C.bg};border-left:4px solid ${C.slate};font-family:${FONT};font-size:14px;line-height:22px;color:${C.ink};">${esc(text).replace(/\n/g, '<br>')}</td></tr></table>`;

/** Button that renders the same in Outlook (padding and colour live on the table cell) */
const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;"><tr><td bgcolor="${C.ink}" style="background:${C.ink};border-radius:6px;padding:12px 22px;"><a href="${href}" style="color:#FFFFFF;font-family:${FONT};font-size:14px;font-weight:bold;text-decoration:none;display:inline-block;">${label}</a></td></tr></table>`;

export type Enquiry = { name: string; email: string; company: string; topic: string; message: string; ip: string };

/** Confirmation sent to the visitor who filled in the form */
export function visitorConfirmation(e: Enquiry) {
  const first = e.name.split(' ')[0] || e.name;
  const copy = stripLinks(e.message).slice(0, 1500) + (e.message.length > 1500 ? '…' : '');
  const subject = 'Thank you for getting in touch — Zubair Akbar';
  const body = `
<h1 style="margin:0 0 16px 0;font-family:${HEAD};font-size:24px;line-height:30px;font-weight:bold;color:${C.ink};text-transform:uppercase;">Thank you, <span style="color:${C.steel};">${esc(first)}</span></h1>
<p style="margin:0 0 14px 0;">I've received your message about <b>${esc(e.topic)}</b> and will reply personally, usually within <b>one to two working days</b>.</p>
<p style="margin:0 0 20px 0;">If it's urgent, you can reach me on WhatsApp at <a href="https://wa.me/971507821371" style="color:${C.steel};font-weight:bold;text-decoration:none;">+971 50 782 1371</a>.</p>
<p style="margin:0;font-family:${FONT};font-size:12px;letter-spacing:1px;color:${C.muted};">YOUR MESSAGE</p>
${quote(copy)}
<p style="margin:24px 0 8px 0;">While you wait, you may find these useful:</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
  <tr><td style="padding:4px 0;font-family:${FONT};font-size:14px;"><span style="color:${C.slate};">▶</span>&nbsp; <a href="${SITE.url}/blog" style="color:${C.steel};text-decoration:none;font-weight:bold;">Articles on UAE &amp; Pakistan tax, SaaS and AI</a></td></tr>
  <tr><td style="padding:4px 0;font-family:${FONT};font-size:14px;"><span style="color:${C.slate};">▶</span>&nbsp; <a href="${SITE.url}/brands" style="color:${C.steel};text-decoration:none;font-weight:bold;">My SaaS products and brands</a></td></tr>
  <tr><td style="padding:4px 0;font-family:${FONT};font-size:14px;"><span style="color:${C.slate};">▶</span>&nbsp; <a href="${SITE.url}/business" style="color:${C.steel};text-decoration:none;font-weight:bold;">The companies I lead</a></td></tr>
</table>
<p style="margin:24px 0 0 0;">Kind regards,</p>`;
  const text = `Thank you, ${first}.

I've received your message about ${e.topic} and will reply personally, usually within one to two working days.
If it's urgent, WhatsApp me at +971 50 782 1371.

Your message:
${copy}

Kind regards,
Zubair Akbar
Finance, Tax & Technology Entrepreneur · FTA-approved Tax Agent (TAAN ${SITE.taan})
${SITE.url} · ${SITE.email}`;
  return { subject, html: layout({ preheader: `Thanks ${first} — I've received your message and will reply within 1–2 working days.`, body }), text };
}

/** Notification sent to Zubair's inbox */
export function ownerNotification(e: Enquiry) {
  const subject = `Website enquiry: ${e.topic} — ${e.name}`;
  const body = `
<p style="margin:0 0 6px 0;font-family:${FONT};font-size:12px;letter-spacing:1px;color:${C.muted};">NEW WEBSITE ENQUIRY</p>
<h1 style="margin:0 0 16px 0;font-family:${HEAD};font-size:22px;line-height:28px;font-weight:bold;color:${C.ink};">${esc(e.topic)}</h1>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;width:100%;border-top:1px solid ${C.line};border-bottom:1px solid ${C.line};">
  ${row('Name', esc(e.name))}
  ${row('Email', `<a href="mailto:${esc(e.email)}" style="color:${C.steel};font-weight:bold;text-decoration:none;">${esc(e.email)}</a>`)}
  ${row('Company', esc(e.company || '—'))}
  ${row('Topic', esc(e.topic))}
</table>
<p style="margin:20px 0 0 0;font-family:${FONT};font-size:12px;letter-spacing:1px;color:${C.muted};">MESSAGE</p>
${quote(e.message)}
<div style="margin:24px 0 0 0;">${button(`mailto:${esc(e.email)}?subject=${encodeURIComponent('Re: ' + e.topic)}`, `Reply to ${esc(e.name.split(' ')[0] || e.name)}`)}</div><p style="margin:20px 0 0 0;font-size:12px;color:${C.grey};">Pressing Reply in your email app also answers ${esc(e.email)} directly. An automatic confirmation has been sent to them. Sender IP: ${esc(e.ip)}</p>`;
  const text = `New website enquiry\n\nName: ${e.name}\nEmail: ${e.email}\nCompany: ${e.company || '-'}\nTopic: ${e.topic}\nIP: ${e.ip}\n\n${e.message}`;
  return { subject, html: layout({ preheader: `${e.name}: ${e.message.slice(0, 90)}`, body, signature: false }), text };
}
