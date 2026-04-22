import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProviderCard } from '@/components/ProviderCard';
import { getProviders } from '@/lib/supabase';
import { CITIES, AGENCY_CATEGORIES } from '@/lib/constants';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = { params: { city: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityObj = CITIES.find(c => c.slug === params.city);
  const catObj  = AGENCY_CATEGORIES.find(c => c.slug === params.city);
  if (!cityObj && !catObj) return {};
  const name = cityObj ? `Marketing agencies in ${cityObj.name}` : catObj!.name;
  return pageMeta({ title: name, description: `Browse and verify ${name.toLowerCase()} on Few Found.`, path: `/agencies/${params.city}` });
}

export default async function AgencyCityPage({ params }: Props) {
  const cityObj = CITIES.find(c => c.slug === params.city);
  const catObj  = AGENCY_CATEGORIES.find(c => c.slug === params.city);
  if (!cityObj && !catObj) notFound();

  const filter = cityObj
    ? { type: 'agency' as const, citySlug: params.city }
    : { type: 'agency' as const, categorySlug: params.city };

  const { data: raw } = await getProviders({ ...filter, limit: 36 });
  const providers = raw ?? [];
  const heading = cityObj ? `Marketing agencies in ${cityObj.name}` : catObj!.name;

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 20 }}>
        <Link href="/agencies" style={{ color: '#7A7773', textDecoration: 'none' }}>Agencies</Link> / {cityObj ? cityObj.name : catObj!.name}
      </p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>{heading}</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 32 }}>
        {providers.length} {providers.length === 1 ? 'agency' : 'agencies'}  -  verified appear first
      </p>
      {providers.length === 0 ? (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, color: '#0A0908', marginBottom: 10 }}>Be the first listed here.</p>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 24 }}>Listing is free and live immediately.</p>
          <Link href="/list?type=agency" style={{ background: '#0A0908', color: '#F8F6F0', padding: '11px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>List free</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {providers.map(p => <ProviderCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
