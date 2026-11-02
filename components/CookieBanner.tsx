'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { LogoMark } from './Icons';

const KEY = 'za-cookie-choice';
type Choice = 'all' | 'essential';

/** Loads the analytics script only after the visitor accepts analytics. */
function loadAnalytics() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;
  if (!src || document.getElementById('za-analytics')) return;
  const s = document.createElement('script');
  s.id = 'za-analytics';
  s.defer = true;
  s.src = src;
  if (id) s.setAttribute('data-website-id', id);
  document.head.appendChild(s);
}

/** Cookie consent banner. Reopen it from anywhere with: window.dispatchEvent(new Event('za:open-cookies')) */
export default function CookieBanner() {
  const [show, setShow] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    let saved: string | null = null;
    try { saved = window.localStorage.getItem(KEY); } catch { saved = null; }
    if (saved === 'all') loadAnalytics();
    if (!saved) setShow(true);
    else setAnalytics(saved === 'all');
    const reopen = () => { setSettings(true); setShow(true); };
    window.addEventListener('za:open-cookies', reopen);
    return () => window.removeEventListener('za:open-cookies', reopen);
  }, []);

  const save = useCallback((choice: Choice) => {
    try { window.localStorage.setItem(KEY, choice); } catch { /* storage blocked: banner simply closes */ }
    if (choice === 'all') loadAnalytics();
    setShow(false);
    setSettings(false);
  }, []);

  if (!show) return null;

  return (
    <section className="cookie" role="region" aria-label="Cookie preferences">
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <LogoMark size={40} />
        <h2>Your privacy</h2>
      </div>
      <p>
        I use essential cookies to run this site. With your permission I&apos;d also use privacy-friendly analytics to see which
        articles help most. <Link href="/privacy-policy">Privacy Policy</Link>
      </p>

      {settings && (
        <div className="cookie__opts">
          <div className="cookie__row">
            <span>
              <strong style={{ fontSize: 14 }}>Essential</strong>
              <small>Security, spam protection, remembering this choice</small>
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#8FB4E3', whiteSpace: 'nowrap' }}>Always on</span>
          </div>
          <label className="cookie__row" htmlFor="ck-analytics" style={{ cursor: 'pointer' }}>
            <span>
              <strong style={{ fontSize: 14 }}>Analytics</strong>
              <small>Anonymous visit counts, no advertising</small>
            </span>
            <input
              id="ck-analytics"
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              style={{ width: 22, height: 22, accentColor: '#8FB4E3' }}
            />
          </label>
        </div>
      )}

      <div className="cookie__actions">
        {settings ? (
          <>
            <button type="button" className="btn btn--primary" onClick={() => save(analytics ? 'all' : 'essential')}>Save choices</button>
            <button type="button" className="btn btn--ghost" onClick={() => save('all')}>Accept all</button>
          </>
        ) : (
          <>
            <button type="button" className="btn btn--primary" onClick={() => save('all')}>Accept analytics</button>
            <button type="button" className="btn btn--ghost" onClick={() => save('essential')}>Essential only</button>
            <button type="button" className="cookie__link" onClick={() => setSettings(true)}>Settings</button>
          </>
        )}
      </div>
    </section>
  );
}

/** Footer button that reopens the banner */
export function CookieSettingsButton() {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event('za:open-cookies'))}>
      Cookie settings
    </button>
  );
}
