import { NextResponse, type NextRequest } from 'next/server';

/** Redirects www.zubairakbar.com → zubairakbar.com (one canonical host for SEO) */
export function proxy(req: NextRequest) {
  const host = req.headers.get('host') || '';
  if (host.startsWith('www.')) {
    const url = req.nextUrl.clone();
    url.host = host.slice(4);
    url.port = '';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/((?!_next/static|_next/image|favicon|.*\\.(?:png|jpg|webp|svg|ico)$).*)'] };
