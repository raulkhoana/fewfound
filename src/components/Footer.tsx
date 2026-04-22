import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { CITIES, AGENCY_CATEGORIES } from '@/lib/constants';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP || '919999999999';

export function Footer() {
  return (
    <footer style={{ background: '#F8F6F0', borderTop: '1px solid #E2DED6', marginTop: 80 }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '48px 24px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <Wordmark size="sm" />
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', lineHeight: 1.6, marginTop: 12, maxWidth: 200 }}>
              India's trust layer for marketing service providers.
            </p>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 14, textDecoration: 'none' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#25D366' }}>WhatsApp us</span>
            </a>
          </div>

          {[
            {
              title: 'Browse',
              links: [
                { label: 'All agencies',      href: '/agencies'      },
                { label: 'All creators',      href: '/creators'      },
                { label: 'All professionals', href: '/professionals'  },
                { label: 'Brand partners',    href: '/brands'        },
                { label: 'Review a brand',    href: '/review-brand'  },
              ],
            },
            {
              title: 'Cities',
              links: CITIES.slice(0, 7).map(c => ({ label: c.name, href: `/agencies/${c.slug}` })),
            },
            {
              title: 'Company',
              links: [
                { label: 'About',                    href: '/about'                   },
                { label: 'How it works',             href: '/how-it-works'            },
                { label: 'Verification standards',   href: '/verification-standards'  },
                { label: 'For brands',               href: '/for-brands'              },
                { label: 'List your profile',        href: '/list'                    },
                { label: 'Apply for verification',   href: '/verify'                  },
                { label: 'Sitemap',                  href: '/sitemap'                 },
              ],
            },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
                {col.title}
              </p>
              {col.links.map(l => (
                <Link key={l.href} href={l.href} style={{
                  display: 'block', fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontSize: 12, color: '#3D3B38', marginBottom: 8, textDecoration: 'none',
                }}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #E2DED6', paddingTop: 20, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', margin: 0 }}>
            © 2026 Few Found. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', margin: 0 }}>
            Verified providers are independently assessed. No paid placement. Ever.
          </p>
        </div>
      </div>
    </footer>
  );
}
