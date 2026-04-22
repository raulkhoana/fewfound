import Link from 'next/link';
import type { Metadata } from 'next';
import { Wordmark } from '@/components/Wordmark';
import { getStats } from '@/lib/supabase';
import { SITE_URL, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES, CITIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: "Few Found - India's Trust Layer for Marketing Service Providers",
  description: "Free listing and independent verification for marketing agencies, creators, and professionals in India. Brands browse free. The verified mark is earned, not bought.",
  alternates: { canonical: SITE_URL },
};

const FAQS = [
  { q: 'Is listing really free?', a: 'Yes. Completely free. No credit card. No trial period. Your profile goes live the moment you submit. Listing is the entry point - verification is the separate paid step for those who want the badge.' },
  { q: 'How long does verification take?', a: '5 to 7 working days for standard applications where both references respond promptly. Maximum window is 21 days.' },
  { q: 'What if my company registration is not in the MCA system?', a: 'Very common for proprietorships, older companies, and LLPs. The system flags it and asks you to upload your certificate of incorporation. A reviewer confirms within 48 hours.' },
  { q: 'Are my references contacted without my involvement?', a: 'Yes. We contact them directly. We do not route communication through you. You do not see what they said. Independence is the point.' },
  { q: 'What happens if I fail verification?', a: 'You receive specific written feedback on exactly what did not pass. Your fee is refunded in full within 48 hours. Your listing continues unchanged. Reapply at any time.' },
  { q: 'Who can see my score band?', a: 'Brand members only. Your public profile shows only the Few Found Verified mark. The score band is private intelligence for serious buyers.' },
  { q: 'Can a brand see who reviewed them?', a: 'No. Brand reviews are anonymous to the brand. This is what makes honest reviews possible.' },
  { q: 'Is there paid placement in search results?', a: 'No. Verified providers always appear above listed-only providers. No sponsored position. No way to pay for higher visibility. Hardcoded. Cannot be changed from any admin panel.' },
  { q: 'Can I list as a solo freelancer with no company?', a: 'Yes. Independent professionals list as individuals. No company registration required.' },
  { q: 'What does brand membership give me?', a: 'Full verified profiles with score bands, reference contact details, and evidence packs. Access to the shortlist service. And access to anonymous brand review data.' },
];

const TYPES = [
  { id: 'agency',       label: 'List as agency',       desc: 'Performance, creative, PR, media, martech, affiliate, AdTech', note: 'Verified agencies get found by brand members searching now' },
  { id: 'creator',      label: 'List as creator',       desc: 'YouTube, Instagram, LinkedIn, podcast, short-form, newsletter',  note: 'Verified creators appear in brand shortlists automatically'  },
  { id: 'professional', label: 'List as professional',  desc: 'Fractional CMO, strategist, growth advisor, media planner',     note: 'The category brands search most and find least'           },
  { id: 'brand',        label: 'List as brand',         desc: 'D2C, FMCG, fintech, consumer tech, SaaS',                       note: 'Signal to agencies and creators that you are worth working with' },
];

const HOW_STEPS = [
  { n: '01', title: 'List free. Today.', body: 'Profile is live the moment you submit. No queue. No approval. Discoverable from minute one.' },
  { n: '02', title: 'Apply for verification.', body: 'Submit two references and evidence. The system contacts references independently - without routing through you. 5 to 7 days.' },
  { n: '03', title: 'Get found first.', body: 'Verified providers appear above listed-only in every search. Always. No paid placement changes this. Ever.' },
];

const VERIFY_PRINCIPLES = [
  { n: '01', title: 'References contacted independently', body: 'We email both references directly - never through you. They complete a structured form. You do not see their responses.' },
  { n: '02', title: 'Identity verified automatically',    body: 'Company registration checked against MCA and GSTN. LinkedIn headcount cross-referenced with claimed team size.' },
  { n: '03', title: 'Evidence reviewed, not just accepted', body: 'Case studies assessed for internal consistency. Claims must be specific and measurable.' },
  { n: '04', title: 'Failure means a full refund',         body: 'If you do not pass, you receive specific written feedback. Fee refunded in full within 48 hours.' },
];

const CATEGORY_GROUPS = [
  { label: 'Performance and Growth',    items: AGENCY_CATEGORIES.filter(c => ['performance-marketing','paid-search','paid-social','programmatic','affiliate-marketing','app-marketing'].includes(c.slug)) },
  { label: 'Creative and Brand',        items: AGENCY_CATEGORIES.filter(c => ['creative-branding','brand-strategy','campaign-creative','content-marketing'].includes(c.slug)) },
  { label: 'Social and Influencer',     items: AGENCY_CATEGORIES.filter(c => ['social-media','influencer-marketing','creator-commerce','ugc-campaigns'].includes(c.slug)) },
  { label: 'PR, Media and OOH',         items: AGENCY_CATEGORIES.filter(c => ['pr-communications','media-planning','tv-buying','ooh-dooh'].includes(c.slug)) },
  { label: 'SEO and Content',           items: AGENCY_CATEGORIES.filter(c => ['seo-organic','technical-seo','content-marketing','link-building'].includes(c.slug)) },
  { label: 'Data and MarTech',          items: AGENCY_CATEGORIES.filter(c => ['martech','crm-setup','marketing-automation','data-analytics','attribution-mmp'].includes(c.slug)) },
  { label: 'B2B and Demand Gen',        items: AGENCY_CATEGORIES.filter(c => ['b2b-marketing','account-based-marketing','demand-generation','lead-generation'].includes(c.slug)) },
  { label: 'Events and Experiential',   items: AGENCY_CATEGORIES.filter(c => ['event-experiential','brand-activations','trade-shows'].includes(c.slug)) },
  { label: 'Specialised',               items: AGENCY_CATEGORIES.filter(c => ['healthcare-marketing','pharma-marketing','real-estate-marketing','financial-marketing','edtech-marketing','sports-marketing','luxury-marketing'].includes(c.slug)) },
];

const wa = process.env.NEXT_PUBLIC_WHATSAPP || '919999999999';

export default async function HomePage() {
  const stats = await getStats().catch(() => ({ total: 0, verified: 0, brands: 0 }));

  return (
    <div>
      {/* HERO */}
      <section style={{ background: '#0A0908', padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ marginBottom: 28 }}>
            <Wordmark size="hero" dark />
          </div>
          <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 22, color: 'rgba(248,246,240,0.72)', maxWidth: 500, lineHeight: 1.5, marginBottom: 10 }}>
            India's trust layer for marketing service providers.
          </p>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: 'rgba(248,246,240,0.38)', maxWidth: 440, lineHeight: 1.7, marginBottom: 44 }}>
            The brands making the best hiring decisions are already here. Are you listed?
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, maxWidth: 680 }}>
            {TYPES.map(t => (
              <Link key={t.id} href={`/list?type=${t.id}`} style={{ textDecoration: 'none', display: 'block', border: '1px solid rgba(248,246,240,0.1)', padding: '16px 18px' }}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#F8F6F0', fontWeight: 600, margin: '0 0 5px' }}>{t.label} </p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: 'rgba(248,246,240,0.35)', margin: '0 0 7px', lineHeight: 1.4 }}>{t.desc}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#C4900A', margin: 0, fontStyle: 'italic' }}>{t.note}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#F2EFE8', borderBottom: '1px solid #E2DED6' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '28px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #E2DED6', borderLeft: '1px solid #E2DED6' }}>
            {[
              { v: stats.total,    l: 'Providers listed' },
              { v: stats.verified, l: 'Verified - appearing first in every search' },
              { v: stats.brands,   l: 'Brands on the platform' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '24px 16px', borderRight: '1px solid #E2DED6', borderBottom: '1px solid #E2DED6' }}>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 44, color: '#0A0908', margin: '0 0 8px', lineHeight: 1 }}>{s.v}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section style={{ background: '#F8F6F0', borderBottom: '1px solid #E2DED6', padding: '56px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>Search and verify</p>
          <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: '#0A0908', lineHeight: 1.2, marginBottom: 16, maxWidth: 520 }}>
            Search any partner or brand. See what we found.
          </h2>
          <form action="/agencies" method="get" style={{ display: 'flex', maxWidth: 600 }}>
            <input name="q" type="search" placeholder="Search any agency, creator, professional, or brand..."
              style={{ flex: 1, background: '#fff', border: '1px solid #E2DED6', borderRight: 'none', color: '#0A0908', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, padding: '12px 16px', outline: 'none' }} />
            <button type="submit" style={{ background: '#0A0908', color: '#F8F6F0', border: 'none', padding: '12px 22px', fontSize: 13, cursor: 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>
              Search
            </button>
          </form>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginTop: 10 }}>
            Brand members see score bands, reference contacts, and evidence packs.{' '}
            <Link href="/for-brands" style={{ color: '#0A0908', textDecoration: 'underline' }}>Join as brand member </Link>
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: '#F2EFE8', borderBottom: '1px solid #E2DED6', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 40 }}>How it works</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
            {HOW_STEPS.map(s => (
              <div key={s.n}>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 48, color: 'rgba(10,9,8,0.08)', margin: '0 0 14px', lineHeight: 1 }}>{s.n}</p>
                <h3 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 18, color: '#0A0908', marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.7 }}>{s.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32 }}>
            <Link href="/how-it-works" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#0A0908', textDecoration: 'underline' }}>Read the full process </Link>
          </div>
        </div>
      </section>

      {/* BROWSE CATEGORIES */}
      <section style={{ background: '#F8F6F0', borderBottom: '1px solid #E2DED6', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Browse by category</p>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, color: '#0A0908', margin: 0 }}>If you work in marketing, you belong here.</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {CATEGORY_GROUPS.map(group => (
              <div key={group.label}>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>{group.label}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {group.items.map(cat => (
                    <Link key={cat.slug} href={`/agencies/${cat.slug}`} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', textDecoration: 'none', padding: '3px 0' }}>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, paddingTop: 32, borderTop: '1px solid #E2DED6' }}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Browse by city</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {CITIES.map(city => (
                <Link key={city.slug} href={`/agencies/${city.slug}`} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', border: '1px solid #E2DED6', padding: '5px 14px', textDecoration: 'none' }}>
                  {city.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VERIFICATION STANDARDS */}
      <section style={{ background: '#F2EFE8', borderBottom: '1px solid #E2DED6', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
            <div>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Verification standards</p>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, color: '#0A0908', margin: 0 }}>The badge means something. Here is why.</h2>
            </div>
            <Link href="/verification-standards" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#0A0908', textDecoration: 'underline', whiteSpace: 'nowrap' }}>Read the full standard </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {VERIFY_PRINCIPLES.map(p => (
              <div key={p.n} style={{ background: '#fff', border: '1px solid #E2DED6', padding: '22px 24px' }}>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: 'rgba(10,9,8,0.1)', margin: '0 0 12px', lineHeight: 1 }}>{p.n}</p>
                <h4 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, color: '#0A0908', margin: '0 0 8px' }}>{p.title}</h4>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.7, margin: 0 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section style={{ background: '#F8F6F0', borderBottom: '1px solid #E2DED6', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 56 }}>
            <div>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>FAQs</p>
              <h2 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 26, color: '#0A0908', lineHeight: 1.3, marginBottom: 16 }}>Every question a sceptic would ask. Answered honestly.</h2>
              <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', background: '#25D366', color: 'white', padding: '10px 16px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, fontWeight: 600 }}>
                Ask on WhatsApp
              </a>
            </div>
            <div>
              {FAQS.map((f, i) => (
                <details key={i} style={{ borderBottom: '1px solid #E2DED6' }}>
                  <summary style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, color: '#0A0908', padding: '14px 0', cursor: 'pointer', listStyle: 'none' }}>
                    {f.q}
                  </summary>
                  <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.7, paddingBottom: 14, margin: 0 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE RULE */}
      <section style={{ background: '#0A0908', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ maxWidth: 620 }}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: 'rgba(248,246,240,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>The one rule</p>
            <blockquote style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 22, color: '#F8F6F0', lineHeight: 1.6, borderLeft: '2px solid #C4900A', paddingLeft: 24, margin: '0 0 20px' }}>
              Verified providers always appear above listed-only providers in every search. No provider can pay to appear higher. No sponsored results. Ever.
            </blockquote>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: 'rgba(248,246,240,0.35)', margin: '0 0 32px' }}>
              Hardcoded into the database query. Cannot be changed from any admin panel.
            </p>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Link href="/list" style={{ background: '#F8F6F0', color: '#0A0908', padding: '12px 22px', fontSize: 13, textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>
                List your profile free
              </Link>
              <Link href="/verify" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: 'rgba(248,246,240,0.38)', textDecoration: 'underline' }}>
                Apply for verification 
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
