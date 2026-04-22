import { NextResponse } from 'next/server';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fewfound.co';

export async function GET() {
  const txt = `User-agent: *
Allow: /

Disallow: /admin
Disallow: /api/

Sitemap: ${SITE}/sitemap.xml`;

  return new NextResponse(txt, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
