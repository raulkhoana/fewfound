'use client';
import Link from 'next/link';
import type { Provider } from '@/lib/supabase';

function providerPath(p: Provider) {
  if (p.type === 'agency')   return `/agencies/${p.city_slug}/${p.slug}`;
  if (p.type === 'creator')  return `/creators/${p.category_slug}/${p.slug}`;
  return `/professionals/${p.city_slug}/${p.slug}`;
}

export function ProviderCard({ p }: { p: Provider }) {
  const path = providerPath(p);
  return (
    <Link href={path} style={{ textDecoration: 'none', display: 'block' }}>
      <div className="provider-card" style={{ background: '#fff', border: '1px solid #E2DED6', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 17, color: '#0A0908', margin: '0 0 3px', lineHeight: 1.3 }}>
              {p.name}
            </h3>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', margin: 0 }}>
              {p.category}{p.city ? ` · ${p.city}` : ''}
            </p>
          </div>
          <div style={{ flexShrink: 0, marginLeft: 12 }}>
            {p.verified ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, background: '#0A0908', color: '#F8F6F0', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', padding: '3px 7px', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                * VERIFIED
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid #E2DED6', color: '#7A7773', fontSize: 9, fontWeight: 600, letterSpacing: '0.08em', padding: '3px 7px', fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
                LISTED
              </span>
            )}
          </div>
        </div>

        {p.bio && (
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {p.bio}
          </p>
        )}

        {p.services && p.services.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
            {p.services.slice(0, 4).map((s: string) => (
              <span key={s} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', border: '1px solid #E2DED6', padding: '2px 7px' }}>
                {s}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 14 }}>
            {p.founding_year && <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773' }}>Est. {p.founding_year}</span>}
            {p.team_size      && <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773' }}>{p.team_size} people</span>}
          </div>
          <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773' }}>View</span>
        </div>
      </div>
    </Link>
  );
}

export function ProviderCardSkeleton() {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2DED6', padding: '20px' }}>
      {[140, 80, 220, 160, 60].map((w, i) => (
        <div key={i} style={{ height: i === 0 ? 18 : i < 4 ? 13 : 11, width: w, background: '#F2EFE8', marginBottom: i < 4 ? 10 : 0, borderRadius: 2 }} />
      ))}
    </div>
  );
}
