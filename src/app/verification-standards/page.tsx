import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'Verification Standards  -  Few Found',
  description: 'The nine criteria, four score bands, and full process used by Few Found to independently verify marketing agencies, creators, and professionals.',
  path: '/verification-standards',
});

const CRITERIA = [
  { id: '1', name: 'Identity verification', desc: 'Company registration confirmed against MCA/GSTN. For individuals, LinkedIn profile age and consistency checked. Domain ownership confirmed.' },
  { id: '2', name: 'Reference quality',    desc: 'Two independent references required. Both must be direct clients or brand contacts. Character references and colleagues are not accepted. References are contacted directly by Few Found  -  not through the applicant.' },
  { id: '3', name: 'Reference response',   desc: 'Both references must complete the seven-question structured form within 21 days. Automated follow-ups on days 3, 7, and 14. Non-response leads to application hold.' },
  { id: '4', name: 'Claim consistency',    desc: 'Case studies reviewed for internal consistency. Claimed results must be specific and measurable. Vague outcome statements ("drove significant growth", "increased awareness") do not pass.' },
  { id: '5', name: 'Team size accuracy',   desc: 'LinkedIn headcount cross-referenced with claimed team size. Discrepancies of more than 30% flagged for explanation.' },
  { id: '6', name: 'Founding year',        desc: 'Company registration date or LinkedIn company page creation date must be consistent with claimed founding year.' },
  { id: '7', name: 'Website & presence',   desc: 'Active website with contact information required. Social presence consistent with claimed category and city.' },
  { id: '8', name: 'Client list accuracy', desc: 'Client names on profile must be confirmed by at least one reference or via a publicly verifiable source. No unverified logo drops.' },
  { id: '9', name: 'Reference sentiment',  desc: 'Reference responses assessed for overall sentiment. Hedged or lukewarm responses lower the score. Strong positive responses raise it.' },
];

const BANDS = [
  { band: 'A+', range: '90–100', desc: 'All nine criteria passed with strong reference sentiment. Exceptional evidence quality. Recommended without reservation.' },
  { band: 'A',  range: '75–89',  desc: 'Seven or more criteria passed. Good reference responses. Minor evidence gaps noted.' },
  { band: 'B+', range: '60–74',  desc: 'Five or more criteria passed. Meets minimum verification standard. Some claims unverified.' },
  { band: 'B',  range: '50–59',  desc: 'Minimum pass. Significant evidence gaps. Verified but with caveats visible to brand members.' },
];

export default function VerificationStandardsPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Verification standards</p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 40, color: '#0A0908', lineHeight: 1.2, marginBottom: 16 }}>The badge means something. Here is how.</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#7A7773', lineHeight: 1.7, marginBottom: 48 }}>
        The Few Found Verified mark is issued only when a provider passes a nine-criteria independent assessment. Five criteria must pass for verification to be awarded. Below is the full standard.
      </p>

      {/* Nine criteria */}
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>Nine assessment criteria</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {CRITERIA.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 20, padding: '16px 20px', background: '#fff', border: '1px solid #E2DED6' }}>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: 'rgba(10,9,8,0.08)', margin: 0, flexShrink: 0, lineHeight: 1, width: 36 }}>{c.id.padStart(2, '0')}</p>
              <div>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, color: '#0A0908', marginBottom: 6 }}>{c.name}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.7, margin: 0 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score bands */}
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Score bands</p>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773', lineHeight: 1.6, marginBottom: 24 }}>
          Score bands are private to brand members. Public profiles show only the * FEW FOUND VERIFIED mark  -  not the band.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {BANDS.map(b => (
            <div key={b.band} style={{ padding: '20px', background: '#F2EFE8', border: '1px solid #E2DED6' }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 }}>
                <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: '#0A0908', lineHeight: 1 }}>{b.band}</span>
                <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', marginTop: 6 }}>Score {b.range}</span>
              </div>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '16px 20px', border: '1px solid #FECACA', background: '#FFF0F0' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#DC2626', margin: 0, fontWeight: 600 }}>FAIL  -  below 50: Full refund within 48 hours. Written feedback on exactly what failed.</p>
        </div>
      </div>

      {/* Key commitments */}
      <div style={{ background: '#0A0908', padding: '32px', marginBottom: 40 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: 'rgba(248,246,240,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Commitments</p>
        {[
          'References are contacted directly  -  never through the applicant.',
          'Applicants do not see reference responses.',
          'Failures receive full refunds and specific written feedback.',
          'Verified providers always appear above listed-only. No exceptions.',
          'Score bands are never shared with the verified provider.',
          'The verification standard is published publicly and does not change without notice.',
        ].map(c => (
          <p key={c} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#F8F6F0', display: 'flex', gap: 10, margin: '0 0 10px', lineHeight: 1.6 }}>
            <span style={{ flexShrink: 0, color: '#C4900A' }}>*</span>{c}
          </p>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <Link href="/verify" style={{ background: '#0A0908', color: '#F8F6F0', padding: '12px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>Apply for verification</Link>
        <Link href="/how-it-works" style={{ border: '1px solid #0A0908', color: '#0A0908', padding: '12px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13 }}>How it works</Link>
      </div>
    </div>
  );
}
