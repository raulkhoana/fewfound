import Link from 'next/link';
import type { Metadata } from 'next';
import { ProviderCard } from '@/components/ProviderCard';
import { getProviders } from '@/lib/supabase';
import { CREATOR_CATEGORIES } from '@/lib/constants';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'Content Creators in India',
  description: 'Browse and verify content creators in India. Instagram, YouTube, LinkedIn, podcasts, newsletters and more. Verified creators appear first.',
  path: '/creators',
});

export default async function CreatorsPage({ searchParams }: { searchParams: { cat?: string; q?: string } }) {
  const { cat, q } = searchParams;
  const catObj = cat ? CREATOR_CATEGORIES.find(c => c.slug === cat) : null;

  const { data: raw } = await getProviders({ type: 'creator', categorySlug: cat, query: q, limit: 36 });
  const providers = raw ?? [];

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Browse</p>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>
          {catObj ? catObj.name : 'Content creators in India'}
        </h1>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', margin: 0 }}>
          {providers.length} {providers.length === 1 ? 'creator' : 'creators'}  -  verified appear first
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 40 }}>
        <aside>
          <div style={{ marginBottom: 28 }}>
            <form action="/creators" method="get">
              <input name="q" type="search" defaultValue={q || ''} placeholder="Search creators..."
                style={{ width: '100%', border: '1px solid #E2DED6', padding: '9px 12px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }} />
              {cat && <input type="hidden" name="cat" value={cat} />}
            </form>
          </div>
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Platform / niche</p>
            <Link href="/creators" style={{ display: 'block', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', padding: '4px 0', textDecoration: 'none', marginBottom: 2 }}>All</Link>
            {CREATOR_CATEGORIES.map(c => (
              <Link key={c.slug} href={`/creators?cat=${c.slug}`} style={{ display: 'block', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: cat === c.slug ? '#0A0908' : '#3D3B38', fontWeight: cat === c.slug ? 600 : 400, padding: '4px 0', textDecoration: 'none', marginBottom: 2 }}>
                {c.name}
              </Link>
            ))}
          </div>
        </aside>
        <div>
          {providers.length === 0 ? (
            <div style={{ padding: '48px 0', textAlign: 'center' }}>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, color: '#0A0908', marginBottom: 10 }}>Be the first listed here.</p>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 24, lineHeight: 1.7 }}>Listing is free and live immediately.</p>
              <Link href="/list?type=creator" style={{ background: '#0A0908', color: '#F8F6F0', padding: '11px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>List free</Link>
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
