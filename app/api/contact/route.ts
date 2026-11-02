import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { TOPIC_OPTIONS } from '@/lib/site';

export const runtime = 'nodejs';

// Simple in-memory rate limit: 5 messages per IP per 10 minutes (resets when the app restarts)
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);
const oneLine = (s: string) => s.replace(/[\n\t]+/g, ' ');
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // spam check not configured yet (honeypot + rate limit still apply)
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip !== 'unknown') body.set('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  const json = (await res.json().catch(() => ({}))) as { success?: boolean };
  return json.success === true;
}

export async function POST(req: Request) {
  const ip = (req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown').trim();
  if (limited(ip)) return fail('Too many messages. Please wait a few minutes and try again.', 429);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail('Invalid request.');
  }

  // Honeypot filled in → pretend success so bots learn nothing
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = oneLine(clean(body.name, 120));
  const email = oneLine(clean(body.email, 200));
  const company = oneLine(clean(body.company, 160));
  const topicValue = clean(body.topic, 40);
  const message = clean(body.message, 5000);
  const topic = TOPIC_OPTIONS.find((o) => o.value === topicValue)?.label;

  if (!name || !email || !topic || message.length < 10) return fail('Please fill in all required fields.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail('Please enter a valid email address.');
  if (body.consent !== 'yes') return fail('Please agree to the Privacy Policy so I can reply.');
  if (!(await verifyTurnstile(clean(body['cf-turnstile-response'], 4096), ip))) return fail('Spam check failed. Please refresh the page and try again.');

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error('[contact] SMTP is not configured');
    return fail('The form is temporarily unavailable. Please email contact@zubairakbar.com.', 503);
  }

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });

  const text = `Name: ${name}\nEmail: ${email}\nCompany: ${company || '-'}\nTopic: ${topic}\nIP: ${ip}\n\n${message}`;
  const html = `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Company:</b> ${esc(company || '-')}<br><b>Topic:</b> ${esc(topic)}</p><p style="white-space:pre-wrap">${esc(message)}</p><p style="color:#888;font-size:12px">Sent from the zubairakbar.com contact form · IP ${esc(ip)}</p>`;

  try {
    await transporter.sendMail({
      from: `"zubairakbar.com" <${CONTACT_FROM || SMTP_USER}>`,
      to: CONTACT_TO || 'contact@zubairakbar.com',
      replyTo: { name, address: email },
      subject: `Website enquiry: ${topic} — ${name}`,
      text,
      html,
    });
  } catch (err) {
    console.error('[contact] send failed', err);
    return fail('The message could not be sent. Please email contact@zubairakbar.com.', 502);
  }
  return NextResponse.json({ ok: true });
}
