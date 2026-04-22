import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SITE_URL, CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES } from '@/lib/constants';

export async function GET() {
  const staticPaths = [
    '','about','how-it-works','verification-standards','for-brands','list','verify','review-brand','sitemap',
    'agencies','creators','professionals','brands',
    ...CITIES.map(c=>`agencies/${c.slug}`),
    ...CITIES.map(c=>`professionals/${c.slug}`),
    ...AGENCY_CATEGORIES.map(c=>`agencies/${c.slug}`),
    ...CREATOR_CATEGORIES.map(c=>`creators/${c.slug}`),
    ...PROFESSIONAL_CATEGORIES.map(c=>`professionals/${c.slug}`),
  ];

  const [{ data: providers }, { data: brands }] = await Promise.all([
    supabase.from('providers').select('type,city_slug,category_slug,slug').limit(2000),
    supabase.from('brands').select('slug').limit(500),
  ]);

  const providerPaths = (providers||[]).map(p => {
    if (p.type==='agency') return `agencies/${p.city_slug}/${p.slug}`;
    if (p.type==='creator') return `creators/${p.category_slug}/${p.slug}`;
    return `professionals/${p.city_slug}/${p.slug}`;
  });
  const brandPaths = (brands||[]).map(b => `brands/${b.slug}`);

  const allPaths = [...staticPaths, ...providerPaths, ...brandPaths];
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPaths.map(p=>`  <url><loc>${SITE_URL}/${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>`;
  return new NextResponse(xml, { headers:{'Content-Type':'application/xml'} });
}
