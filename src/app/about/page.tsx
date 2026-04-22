import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'About Few Found',
  description: "Few Found is India's trust layer for marketing service providers. Free listing and independent verification. The badge is earned, not bought.",
  path: '/about',
});

export default function AboutPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>About</p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 40, color: '#0A0908', lineHeight: 1.2, marginBottom: 28 }}>
        India's trust layer for marketing service providers.
      </h1>

      {[
        {
          heading: 'Why Few Found exists.',
          body: `The India marketing ecosystem has a trust deficit. Agencies claim results they did not produce. Creators claim audiences that are not real. Professionals claim clients they never had. Brands make hiring decisions based on decks, vibes, and WhatsApp recommendations.\n\nFew Found exists to fix this. Not with reviews that can be gamed. Not with ratings that can be bought. With independent, structured verification that contacts your references directly  -  without routing through you - and assesses your claims against evidence.`,
        },
        {
          heading: 'What the badge means.',
          body: `The Few Found Verified mark means a trained reviewer has contacted two independent references, reviewed company registration or identity documents, assessed case studies for internal consistency, and confirmed that the provider's core claims hold up.\n\nThe badge is not available for purchase. It is not awarded because someone paid a listing fee. It is issued only when a provider passes a nine-criteria assessment. If you fail, you receive a full refund and specific written feedback.`,
        },
        {
          heading: 'The one rule that never changes.',
          body: `Verified providers always appear above listed-only providers in every search. Always. No provider can pay to appear higher. This is hardcoded into the database query  -  not a setting, not a toggle, not something that can be changed from an admin panel. It is the foundation the platform is built on.`,
        },
        {
          heading: 'Who it is for.',
          body: `Agencies, creators, and independent professionals list free. When they are ready, they apply for verification. Brands browse free. Brand members pay for access to full verified profiles  -  score bands, reference contacts, evidence packs - and for the shortlist service.`,
        },
        {
          heading: 'The name.',
          body: `FEW FOUND. Two words. The best ones are rare. They are worth searching for. When you find them, the search was worth it.`,
        },
      ].map(s => (
        <div key={s.heading} style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 22, color: '#0A0908', marginBottom: 12 }}>{s.heading}</h2>
          {s.body.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, marginBottom: 12 }}>{para}</p>
          ))}
        </div>
      ))}

      <div style={{ borderTop: '1px solid #E2DED6', paddingTop: 32, display: 'flex', gap: 16 }}>
        <Link href="/list" style={{ background: '#0A0908', color: '#F8F6F0', padding: '12px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>List free</Link>
        <Link href="/verify" style={{ border: '1px solid #0A0908', color: '#0A0908', padding: '12px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13 }}>Apply for verification</Link>
      </div>
    </div>
  );
}
