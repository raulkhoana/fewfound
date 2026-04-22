import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMeta } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = pageMeta({
  title: 'How Few Found Works',
  description: 'How listing, verification, and brand membership work on Few Found. Free to list, earn the badge through independent verification.',
  path: '/how-it-works',
});

export default function HowItWorksPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>How it works</p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 40, color: '#0A0908', lineHeight: 1.2, marginBottom: 48 }}>Three tracks. One platform.</h1>

      {/* Track 1: Providers */}
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 12, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>For agencies, creators, and professionals</p>
        {[
          { n: '01', t: 'List free. Live immediately.', b: 'Submit your profile  -  name, category, city, a short description. That is enough to go live. No approval. No queue. Your profile appears in search results from minute one. There are no fees, no credit card, no trial.' },
          { n: '02', t: 'Apply for verification when ready.', b: 'When you are ready to earn the badge, submit a verification application. You will need two references  -  clients or brand contacts who can speak to your work. Provide evidence: company registration, LinkedIn, case studies. The fee is charged at this stage.' },
          { n: '03', t: 'We contact references directly.', b: 'References receive an email from us with a structured seven-question form. They respond to us  -  not to you. You do not see their responses. This independence is what makes the badge meaningful. Reference communication is automated, with follow-ups on days 3, 7, and 14.' },
          { n: '04', t: 'Assessment and decision.', b: 'A trained reviewer assesses your submission across nine criteria. Five of those criteria must pass for verification to be awarded. The process takes 5 to 7 working days when both references respond promptly. Maximum 21 days.' },
          { n: '05', t: 'Verified. Appearing first.', b: 'On verification, your profile receives the Few Found Verified mark and moves above all listed-only providers in every search. This is permanent for as long as your verification is active. Verification renews annually.' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: 'rgba(10,9,8,0.1)', margin: 0, flexShrink: 0, lineHeight: 1, width: 48 }}>{s.n}</p>
            <div>
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 18, color: '#0A0908', marginBottom: 8 }}>{s.t}</h3>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, margin: 0 }}>{s.b}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #E2DED6', marginBottom: 56, paddingTop: 48 }}>
        <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 12, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>For brands</p>
        {[
          { n: '01', t: 'Browse free.', b: 'All profiles are visible to anyone without an account. Search by category, city, name. Verified profiles show the badge. Listed-only profiles show the listed status. No gatekeeping on browsing.' },
          { n: '02', t: 'Join as brand member for the full picture.', b: 'Brand members access score bands, reference contact details, evidence packs, and the shortlist service. Two membership tiers: Brand Connect at ₹60,000/year and Brand Member at ₹1,50,000/year.' },
          { n: '03', t: 'Use the shortlist service.', b: 'Submit a brief  -  your category need, timeline, budget range. Receive a curated list of matching verified providers ranked by their score band. Shortlist requests are processed within 48 working hours.' },
        ].map(s => (
          <div key={s.n} style={{ display: 'flex', gap: 24, marginBottom: 28 }}>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: 'rgba(10,9,8,0.1)', margin: 0, flexShrink: 0, lineHeight: 1, width: 48 }}>{s.n}</p>
            <div>
              <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 18, color: '#0A0908', marginBottom: 8 }}>{s.t}</h3>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, margin: 0 }}>{s.b}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        <Link href="/list" style={{ background: '#0A0908', color: '#F8F6F0', padding: '12px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>List free</Link>
        <Link href="/verification-standards" style={{ border: '1px solid #0A0908', color: '#0A0908', padding: '12px 22px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13 }}>Read verification standards </Link>
      </div>
    </div>
  );
}
