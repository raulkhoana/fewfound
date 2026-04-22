import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBrandBySlug } from '@/lib/supabase';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: b } = await getBrandBySlug(params.slug);
  if (!b) return {};
  return pageMeta({ title: `${b.name}  -  Brand on Few Found`, description: `${b.name} is listed on Few Found. ${b.bio || ''}`, path: `/brands/${params.slug}` });
}

export default async function BrandProfilePage({ params }: Props) {
  const { data: b } = await getBrandBySlug(params.slug);
  if (!b) notFound();

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 24 }}>
        <Link href="/brands" style={{ color: '#7A7773', textDecoration: 'none' }}>Brands</Link> / {b.name}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 30, color: '#0A0908', margin: 0 }}>{b.name}</h1>
            {b.verified && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#0A0908', color: '#F8F6F0', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 9px', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>* FEW FOUND VERIFIED</span>}
          </div>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 20 }}>{b.industry}</p>
          {b.bio && <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, marginBottom: 28 }}>{b.bio}</p>}

          {/* Brand reviews section */}
          <div style={{ border: '1px solid #E2DED6', padding: '24px' }}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Provider reviews</p>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 16, color: '#0A0908', marginBottom: 8, lineHeight: 1.5 }}>Reviews by agencies and creators who have worked with this brand.</p>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', marginBottom: 16, lineHeight: 1.6 }}>
              Reviews are anonymous to the brand. Score bands available to brand members only.
            </p>
            <Link href="/for-brands" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#0A0908', textDecoration: 'underline' }}>
              Access review data as brand member
            </Link>
          </div>
        </div>

        <aside>
          <div style={{ border: '1px solid #E2DED6', padding: '20px', marginBottom: 14 }}>
            <p style={{ fontFamily: "'Helvetice Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Details</p>
            {[{ label: 'Industry', val: b.industry }, { label: 'Payment terms', val: b.payment_terms }, { label: 'Budget range', val: b.budget_range }].filter(r => r.val).map(r => (
              <div key={r.label} style={{ marginBottom: 12 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.label}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#0A0908', margin: 0 }}>{r.val}</p>
              </div>
            ))}
            {b.website && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #E2DED6' }}>
                <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#0A0908', textDecoration: 'underline' }}>Visit website</a>
              </div>
            )}
          </div>
          <Link href="/review-brand" style={{ display: 'block', background: '#F2EFE8', border: '1px solid #E2DED6', padding: '16px', textDecoration: 'none', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#0A0908', margin: 0, fontWeight: 600 }}>Review this brand</p>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', margin: '4px 0 0' }}>Anonymous. 5 minutes.</p>
          </Link>
        </aside>
      </div>
    </div>
  );
}
