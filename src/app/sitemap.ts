import { MetadataRoute } from 'next';
import { SITE_URL, CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES } from '@/lib/constants';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '', '/agencies', '/creators', '/professionals', '/brands',
    '/list', '/verify', '/for-brands', '/about',
    '/how-it-works', '/verification-standards', '/review-brand',
  ].map(path => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const cityPages = CITIES.flatMap(c => [
    { url: `${SITE_URL}/agencies/${c.slug}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7 },
    { url: `${SITE_URL}/professionals/${c.slug}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.6 },
  ]);

  const categoryPages = [
    ...AGENCY_CATEGORIES.map(c => ({ url: `${SITE_URL}/agencies/${c.slug}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.7 })),
    ...CREATOR_CATEGORIES.map(c => ({ url: `${SITE_URL}/creators/${c.slug}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.6 })),
    ...PROFESSIONAL_CATEGORIES.map(c => ({ url: `${SITE_URL}/professionals/${c.slug}`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.6 })),
  ];

  const { data: providers } = await supabase.from('providers').select('type,city_slug,category_slug,slug').limit(1000);
  const providerPages = (providers || []).map(p => ({
    url: `${SITE_URL}/${p.type === 'agency' ? 'agencies' : p.type === 'creator' ? 'creators' : 'professionals'}/${p.type === 'creator' ? p.category_slug : p.city_slug}/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...cityPages, ...categoryPages, ...providerPages];
}
