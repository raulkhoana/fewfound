import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES } from '@/lib/constants';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'Sitemap',
  description: 'All pages on Few Found.',
  path: '/sitemap',
});

function SitemapSection({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div style={{ marginBottom: 36 }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>{title}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {links.map(l => (
          <Link key={l.href} href={l.href} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', textDecoration: 'none' }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function SitemapPage() {
  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 24px' }}>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: '#0A0908', marginBottom: 40 }}>Sitemap</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
        <div>
          <SitemapSection title="Main" links={[
            { label: 'Home',                  href: '/'                        },
            { label: 'List free',             href: '/list'                    },
            { label: 'Apply for verification',href: '/verify'                  },
            { label: 'Review a brand',        href: '/review-brand'            },
            { label: 'For brands',            href: '/for-brands'              },
            { label: 'About',                 href: '/about'                   },
            { label: 'How it works',          href: '/how-it-works'            },
            { label: 'Verification standards',href: '/verification-standards'  },
          ]} />
          <SitemapSection title="Directories" links={[
            { label: 'All agencies',      href: '/agencies'      },
            { label: 'All creators',      href: '/creators'      },
            { label: 'All professionals', href: '/professionals'  },
            { label: 'All brands',        href: '/brands'        },
          ]} />
          <SitemapSection title="Cities" links={CITIES.map(c => ({ label: `Agencies in ${c.name}`, href: `/agencies/${c.slug}` }))} />
        </div>
        <div>
          <SitemapSection title="Agency categories" links={AGENCY_CATEGORIES.slice(0, 30).map(c => ({ label: c.name, href: `/agencies/${c.slug}` }))} />
        </div>
        <div>
          <SitemapSection title="Creator categories" links={CREATOR_CATEGORIES.map(c => ({ label: c.name, href: `/creators/${c.slug}` }))} />
          <SitemapSection title="Professional roles" links={PROFESSIONAL_CATEGORIES.map(c => ({ label: c.name, href: `/professionals/${c.slug}` }))} />
        </div>
      </div>
    </div>
  );
}
