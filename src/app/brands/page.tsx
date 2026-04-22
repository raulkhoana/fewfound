import Link from 'next/link';
import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'Brands on Few Found',
  description: 'Browse brands listed on Few Found. See which brands have been independently assessed by marketing service providers.',
  path: '/brands',
});

interface Brand {
  id: string; name: string; industry: string; bio: string | null;
  verified: boolean; slug: string; website: string | null;
  budget_range: string | null; payment_terms: string | null; created_at: string;
}

export default async function BrandsPage({ searchParams }: { searchParams: { q?: string } }) {
  const { q } = searchParams;
  let query = supabase
    .from('brands')
    .select('*')
    .order('verified', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(36);
  if (q) query = query.ilike('name', `%${q}%`);
  const { data: raw } = await query;
  const brands: Brand[] = raw ?? [];

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Browse</p>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>Brands on Few Found</h1>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', margin: 0 }}>{brands.length} brands listed</p>
      </div>

      <form action="/brands" method="get" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', maxWidth: 400 }}>
          <input name="q" type="search" defaultValue={q || ''} placeholder="Search brands..."
            style={{ flex: 1, border: '1px solid #E2DED6', borderRight: 'none', padding: '10px 14px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff' }} />
          <button type="submit" style={{ background: '#0A0908', color: '#F8F6F0', border: 'none', padding: '10px 18px', fontSize: 12, cursor: 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>Search</button>
        </div>
      </form>

      {brands.length === 0 ? (
        <div style={{ padding: '48px 0', textAlign: 'center' }}>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, color: '#0A0908', marginBottom: 10 }}>No brands listed yet.</p>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 24, lineHeight: 1.7 }}>
            Brands list to signal to agencies and creators that they are worth working with.
          </p>
          <Link href="/list?type=brand" style={{ background: '#0A0908', color: '#F8F6F0', padding: '11px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>
            List your brand
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {brands.map(b => (
            <Link key={b.id} href={`/brands/${b.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                style={{ background: '#fff', border: '1px solid #E2DED6', padding: '20px', transition: 'border-color 0.15s' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 17, color: '#0A0908', margin: 0 }}>{b.name}</h3>
                  {b.verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#0A0908', color: '#F8F6F0', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 7px', fontFamily: "'Helvetica Neue', Arial, sans-serif", flexShrink: 0, marginLeft: 8 }}>
                      * VERIFIED
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', margin: '0 0 8px' }}>{b.industry}</p>
                {b.bio && (
                  <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {b.bio}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
