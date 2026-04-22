import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProviderBySlug } from '@/lib/supabase';
import { CITIES } from '@/lib/constants';
import { providerMeta, providerSchema } from '@/lib/seo';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-dynamic';

type Props = { params: { city: string; slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data: p } = await getProviderBySlug(params.slug);
  if (!p) return {};
  return providerMeta(p);
}

export default async function AgencyProfilePage({ params }: Props) {
  const { data: p } = await getProviderBySlug(params.slug);
  if (!p || p.type !== 'agency') notFound();

  const cityObj = CITIES.find(c => c.slug === p.city_slug);
  const schema = providerSchema(p);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '40px 24px' }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 24 }}>
          <Link href="/agencies" style={{ color: '#7A7773', textDecoration: 'none' }}>Agencies</Link>
          {cityObj && <>{' / '}<Link href={`/agencies/${p.city_slug}`} style={{ color: '#7A7773', textDecoration: 'none' }}>{p.city}</Link></>}
          {' / '}{p.name}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 40 }}>
          {/* Main */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
                  <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 30, color: '#0A0908', margin: 0 }}>{p.name}</h1>
                  {p.verified && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#0A0908', color: '#F8F6F0', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 9px', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                      * FEW FOUND VERIFIED
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', margin: 0 }}>
                  {p.category}{p.city ? ` · ${p.city}` : ''}
                </p>
              </div>
            </div>

            {p.bio && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, margin: 0 }}>{p.bio}</p>
              </div>
            )}

            {p.services && p.services.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Services</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.services.map((s: string) => (
                    <span key={s} style={{ border: '1px solid #E2DED6', padding: '4px 10px', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38' }}>{s}</span>
                  ))}
                </div>
              </div>
            )}

            {(p.client1 || p.client2) && (
              <div style={{ marginBottom: 28 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Notable clients</p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {[p.client1, p.client2].filter(Boolean).map(c => (
                    <span key={c} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38' }}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Verification section */}
            {p.verified ? (
              <div style={{ background: '#0A0908', padding: '24px', marginTop: 16 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: 'rgba(248,246,240,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12 }}>Verification record</p>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 16, color: '#F8F6F0', marginBottom: 10, lineHeight: 1.5 }}>
                  This agency has been independently verified by Few Found.
                </p>
                {p.verification_date && (
                  <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: 'rgba(248,246,240,0.4)', margin: '0 0 16px' }}>
                    Verified {new Date(p.verification_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                )}
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: 'rgba(248,246,240,0.4)', margin: '0 0 4px', fontStyle: 'italic' }}>
                  Score band, references, and evidence available to brand members.
                </p>
                <Link href="/for-brands" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#C4900A', textDecoration: 'underline' }}>
                  Access as brand member
                </Link>
              </div>
            ) : (
              <div style={{ border: '1px solid #E2DED6', padding: '22px', marginTop: 16 }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>Not yet verified</p>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, color: '#0A0908', marginBottom: 8, lineHeight: 1.5 }}>
                  This agency is listed but not yet independently verified.
                </p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 14, lineHeight: 1.6 }}>
                  Verification confirms company registration, reference quality, and client claims. Verified agencies appear first in all searches.
                </p>
                <Link href={`/verify?type=agency`} style={{ background: '#0A0908', color: '#F8F6F0', padding: '10px 18px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, fontWeight: 600, display: 'inline-block' }}>
                  Apply for verification  -  ₹24,999/year
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div style={{ border: '1px solid #E2DED6', padding: '20px', marginBottom: 14 }}>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Details</p>
              {[
                { label: 'Type',         val: 'Marketing agency' },
                { label: 'Category',     val: p.category        },
                { label: 'City',         val: p.city            },
                { label: 'Founded',      val: p.founding_year?.toString() },
                { label: 'Team size',    val: p.team_size       },
              ].filter(r => r.val).map((r: {label: string; val: string | number | undefined | null}) => (
                <div key={r.label} style={{ marginBottom: 12 }}>
                  <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.label}</p>
                  <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#0A0908', margin: 0 }}>{r.val}</p>
                </div>
              ))}
              {p.website && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #E2DED6' }}>
                  <a href={p.website} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#0A0908', textDecoration: 'underline' }}>
                    Visit website
                  </a>
                </div>
              )}
            </div>

            {/* Brand member dark box */}
            <div style={{ background: '#0A0908', padding: '20px' }}>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: 'rgba(248,246,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>For brand buyers</p>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 14, color: '#F8F6F0', marginBottom: 10, lineHeight: 1.5 }}>
                Brand members see score bands, reference contacts, and evidence packs.
              </p>
              <Link href="/for-brands" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#C4900A', textDecoration: 'underline' }}>
                Join as brand member 
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
