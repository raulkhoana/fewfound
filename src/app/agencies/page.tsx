import Link from 'next/link';
import type { Metadata } from 'next';
import { ProviderCard } from '@/components/ProviderCard';
import { getProviders } from '@/lib/supabase';
import { CITIES, AGENCY_CATEGORIES } from '@/lib/constants';
import { pageMeta } from '@/lib/seo';
import React from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'Marketing Agencies in India',
  description: 'Browse and verify marketing agencies in India. Performance, creative, PR, media, influencer, martech and more. Verified agencies appear first. Free to browse.',
  path: '/agencies',
});

function filterLink(active: boolean): React.CSSProperties {
  return {
    display: 'block',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: 12,
    color: active ? '#0A0908' : '#3D3B38',
    padding: '4px 0',
    textDecoration: 'none',
    fontWeight: active ? 600 : 400,
    marginBottom: 2,
  };
}

export default async function AgenciesPage({
  searchParams,
}: {
  searchParams: { city?: string; cat?: string; q?: string };
}) {
  const { city, cat, q } = searchParams;
  const cityObj = city ? CITIES.find(c => c.slug === city) : null;
  const catObj  = cat  ? AGENCY_CATEGORIES.find(c => c.slug === cat) : null;

  const { data: raw } = await getProviders({
    type: 'agency',
    citySlug: city || undefined,
    categorySlug: cat || undefined,
    query: q || undefined,
    limit: 36,
  });
  const providers = raw ?? [];

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Browse</p>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>
          {catObj ? catObj.name : cityObj ? `Marketing agencies in ${cityObj.name}` : 'Marketing agencies in India'}
        </h1>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', margin: 0 }}>
          {providers.length} {providers.length === 1 ? 'agency' : 'agencies'}  -  verified appear first
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
        <aside>
          <div style={{ marginBottom: 28 }}>
            <form action="/agencies" method="get">
              <input name="q" type="search" defaultValue={q || ''} placeholder="Search agencies..."
                style={{ width: '100%', border: '1px solid #E2DED6', padding: '9px 12px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }} />
              {city && <input type="hidden" name="city" value={city} />}
              {cat  && <input type="hidden" name="cat"  value={cat}  />}
            </form>
          </div>
          <div style={{ marginBottom: 28 }}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>By city</p>
            <Link href="/agencies" style={filterLink(!city && !cat)}>All</Link>
            {CITIES.map(c => (
              <Link key={c.slug} href={`/agencies?city=${c.slug}${cat ? `&cat=${cat}` : ''}`} style={filterLink(city === c.slug)}>
                {c.name}
              </Link>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>By category</p>
            {AGENCY_CATEGORIES.slice(0, 24).map(c => (
              <Link key={c.slug} href={`/agencies?cat=${c.slug}${city ? `&city=${city}` : ''}`} style={filterLink(cat === c.slug)}>
                {c.name}
              </Link>
            ))}
          </div>
        </aside>

        <div>
          {providers.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, color: '#0A0908', marginBottom: 10 }}>Be the first listed here.</p>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 24, lineHeight: 1.7 }}>
                When brands search this category, your profile appears first. Listing is free and live immediately.
              </p>
              <Link href="/list?type=agency" style={{ background: '#0A0908', color: '#F8F6F0', padding: '11px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>
                List free
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {providers.map(p => <ProviderCard key={p.id} p={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
