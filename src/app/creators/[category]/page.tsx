import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProviderCard } from '@/components/ProviderCard';
import { getProviders } from '@/lib/supabase';
import { CREATOR_CATEGORIES } from '@/lib/constants';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const catObj = CREATOR_CATEGORIES.find(c => c.slug === params.category);
  if (!catObj) return {};
  return pageMeta({ title: catObj.name, description: `Browse and verify ${catObj.name.toLowerCase()} creators on Few Found.`, path: `/creators/${params.category}` });
}

export default async function CreatorCategoryPage({ params }: Props) {
  const catObj = CREATOR_CATEGORIES.find(c => c.slug === params.category);
  if (!catObj) notFound();

  const { data: raw } = await getProviders({ type: 'creator', categorySlug: params.category, limit: 36 });
  const providers = raw ?? [];

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 20 }}>
        <Link href="/creators" style={{ color: '#7A7773', textDecoration: 'none' }}>Creators</Link> / {catObj.name}
      </p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>{catObj.name}</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 32 }}>
        {providers.length} {providers.length === 1 ? 'creator' : 'creators'}  -  verified appear first
      </p>
      {providers.length === 0 ? (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, color: '#0A0908', marginBottom: 10 }}>Be the first listed here.</p>
          <Link href="/list?type=creator" style={{ background: '#0A0908', color: '#F8F6F0', padding: '11px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>List free</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {providers.map(p => <ProviderCard key={p.id} p={p} />)}
        </div>
      )}
    </div>
  );
}
