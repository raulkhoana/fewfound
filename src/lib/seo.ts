import type { Metadata } from 'next';
import { SITE_URL, SITE_NAME } from './constants';
import type { Provider, Brand } from './supabase';

export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const title = `${opts.title} | Few Found`;
  return {
    title,
    description: opts.description,
    openGraph: { title, description: opts.description, url: `${SITE_URL}${opts.path}`, siteName: SITE_NAME },
    twitter: { card: 'summary', title, description: opts.description },
    alternates: { canonical: `${SITE_URL}${opts.path}` },
    robots: { index: true, follow: true },
  };
}

export function providerMeta(p: Provider): Metadata {
  const path = p.type === 'agency'
    ? `/agencies/${p.city_slug}/${p.slug}`
    : p.type === 'creator'
    ? `/creators/${p.category_slug}/${p.slug}`
    : `/professionals/${p.city_slug}/${p.slug}`;

  const title = `${p.name}  -  ${p.verified ? 'Few Found Verified' : 'Listed'} ${p.category} ${p.city ? `in ${p.city}` : ''}`;
  const description = `${p.name} is ${p.verified ? 'a Few Found Verified' : 'listed on Few Found as a'} ${p.category}${p.city ? ` based in ${p.city}` : ''}. ${p.services?.slice(0,3).join(', ') || ''}. ${p.verified ? 'Independently verified.' : 'View profile.'}`;

  return pageMeta({ title, description, path });
}

export function orgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Few Found',
    url: SITE_URL,
    description: "India's trust layer for marketing service providers.",
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    areaServed: 'IN',
  };
}

export function providerSchema(p: Provider) {
  const path = p.type === 'agency'
    ? `/agencies/${p.city_slug}/${p.slug}`
    : p.type === 'creator'
    ? `/creators/${p.category_slug}/${p.slug}`
    : `/professionals/${p.city_slug}/${p.slug}`;

  return {
    '@context': 'https://schema.org',
    '@type': p.type === 'creator' ? 'Person' : 'Organization',
    name: p.name,
    url: p.website || `${SITE_URL}${path}`,
    description: p.bio || '',
    address: { '@type': 'PostalAddress', addressLocality: p.city, addressCountry: 'IN' },
    knowsAbout: p.services || [],
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
