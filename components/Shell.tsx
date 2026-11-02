import type { ReactNode } from 'react';
import type { NavKey } from '@/lib/site';
import Footer from './Footer';
import Header from './Header';

/** Header + main + footer. Pass `overlay` when the page starts with a dark hero/banner the header sits on. */
export default function Shell({ active, overlay = true, children }: { active: NavKey; overlay?: boolean; children: ReactNode }) {
  return (
    <>
      <div className={overlay ? 'header-overlay' : undefined}>
        <Header active={active} solid={!overlay} />
      </div>
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
