'use client';

import { Children, isValidElement, useState, type ReactNode } from 'react';

export type FilterDef = { key: string; label: string };

/**
 * Client-side filter. All product cards are rendered on the server (good for SEO);
 * this only hides the ones that don't match. Each child must carry data-tags="all live sales xg ...".
 */
export default function ProductFilter({ filters, children }: { filters: FilterDef[]; children: ReactNode }) {
  const [active, setActive] = useState('all');
  const items = Children.toArray(children);
  const shown = items.filter((c) => isValidElement<{ 'data-tags'?: string }>(c) && (c.props['data-tags'] || '').split(' ').includes(active));
  return (
    <>
      <div className="filters" role="group" aria-label="Filter products" style={{ marginTop: 32 }}>
        {filters.map((f) => (
          <button key={f.key} type="button" className="pill" aria-pressed={active === f.key} onClick={() => setActive(f.key)}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{shown.length} products shown</p>
      <div className="grid grid--fill" style={{ marginTop: 32 }}>{shown}</div>
    </>
  );
}
