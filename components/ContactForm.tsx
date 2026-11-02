'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useState, type FormEvent } from 'react';
import { TOPIC_OPTIONS } from '@/lib/site';


const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export default function ContactForm({ defaultTopic = '' }: { defaultTopic?: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');
  const [name, setName] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setState('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');
      setName(String(data.name || '').split(' ')[0]);
      setState('sent');
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setState('error');
      // Turnstile tokens are single-use; get a fresh one for the retry
      (window as unknown as { turnstile?: { reset: () => void } }).turnstile?.reset();
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-success" role="status">
        <p style={{ fontSize: 28, color: 'var(--light-blue)', marginTop: 0 }} aria-hidden="true">✓</p>
        <h2>Message on its way</h2>
        <p>Thank you{name ? `, ${name}` : ''}. Your message has been sent to contact@zubairakbar.com and I&apos;ll reply by email.</p>
        <button type="button" className="btn btn--primary" style={{ marginTop: 20 }} onClick={() => setState('idle')}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      {SITE_KEY && <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />}
      <div className="field">
        <label htmlFor="cf-name">Full name *</label>
        <input id="cf-name" name="name" required maxLength={120} autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email *</label>
        <input id="cf-email" name="email" type="email" required maxLength={200} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-company">Company</label>
        <input id="cf-company" name="company" maxLength={160} autoComplete="organization" />
      </div>
      <div className="field">
        <label htmlFor="cf-topic">I&apos;m interested in *</label>
        <select id="cf-topic" name="topic" required defaultValue={defaultTopic}>
          <option value="" disabled>Choose a topic</option>
          {TOPIC_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <div className="field field--full">
        <label htmlFor="cf-message">Message *</label>
        <textarea id="cf-message" name="message" required minLength={10} maxLength={5000} />
      </div>
      {/* Honeypot: hidden from people, bots fill it in */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="check">
        <input type="checkbox" name="consent" value="yes" required />
        <span>I agree that my details will be used to reply to this message, as described in the <Link href="/privacy-policy">Privacy Policy</Link>. *</span>
      </label>
      {SITE_KEY && <div className="cf-turnstile field--full" data-sitekey={SITE_KEY} data-theme="light" />}
      {state === 'error' && <p className="form-error" role="alert">{error}</p>}
      <div className="field--full" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
        <button type="submit" className="btn btn--dark" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send message'}</button>
        <p className="muted" style={{ fontSize: 14 }}>Goes straight to contact@zubairakbar.com · spam-protected · no newsletters.</p>
      </div>
    </form>
  );
}
