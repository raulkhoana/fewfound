import { NextResponse } from 'next/server';
import { CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES } from '@/lib/constants';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fewfound.co';

function url(path: string, priority = '0.7', freq = 'weekly') {
  return `  <url>
    <loc>${SITE}${path}</loc>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const staticPages = [
    url('/', '1.0', 'daily'),
    url('/agencies', '0.9', 'daily'),
    url('/creators', '0.9', 'daily'),
    url('/professionals', '0.9', 'daily'),
    url('/brands', '0.8', 'daily'),
    url('/list', '0.8', 'monthly'),
    url('/verify', '0.8', 'monthly'),
    url('/for-brands', '0.8', 'monthly'),
    url('/about', '0.6', 'monthly'),
    url('/how-it-works', '0.7', 'monthly'),
    url('/verification-standards', '0.7', 'monthly'),
    url('/review-brand', '0.6', 'weekly'),
    url('/sitemap', '0.3', 'monthly'),
  ].join('\n');

  const cityPages = CITIES.map(c => url(`/agencies/${c.slug}`, '0.7', 'daily')).join('\n');
  const profCityPages = CITIES.map(c => url(`/professionals/${c.slug}`, '0.7', 'daily')).join('\n');
  const agencyCatPages = AGENCY_CATEGORIES.map(c => url(`/agencies/${c.slug}`, '0.7', 'daily')).join('\n');
  const creatorCatPages = CREATOR_CATEGORIES.map(c => url(`/creators/${c.slug}`, '0.7', 'daily')).join('\n');
  const profCatPages = PROFESSIONAL_CATEGORIES.map(c => url(`/professionals/${c.slug}`, '0.7', 'monthly')).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages}
${cityPages}
${profCityPages}
${agencyCatPages}
${creatorCatPages}
${profCatPages}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
