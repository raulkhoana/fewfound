'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES, BRAND_INDUSTRIES, TEAM_SIZES } from '@/lib/constants';

type ProviderType = 'agency' | 'creator' | 'professional' | 'brand';

const TYPE_CONFIG: Record<ProviderType, {
  label: string; desc: string;
  price: string; verifyNote: string;
  categories: { name: string; slug: string }[];
  hasCity: boolean;
}> = {
  agency: {
    label: 'Marketing Agency', desc: 'Performance, creative, PR, media, martech, affiliate, AdTech',
    price: '₹24,999/year', verifyNote: 'Agency & Professional verification',
    categories: AGENCY_CATEGORIES, hasCity: true,
  },
  creator: {
    label: 'Content Creator', desc: 'YouTube, Instagram, LinkedIn, podcast, short-form, newsletter',
    price: '₹14,999/year', verifyNote: 'Creator verification',
    categories: CREATOR_CATEGORIES, hasCity: false,
  },
  professional: {
    label: 'Independent Professional', desc: 'Fractional CMO, strategist, growth advisor, consultant',
    price: '₹24,999/year', verifyNote: 'Professional verification',
    categories: PROFESSIONAL_CATEGORIES, hasCity: true,
  },
  brand: {
    label: 'Brand', desc: 'D2C, FMCG, fintech, consumer tech, SaaS',
    price: '₹14,999/year', verifyNote: 'Brand verification',
    categories: BRAND_INDUSTRIES.map(n => ({ name: n, slug: n.toLowerCase().replace(/\s+/g, '-') })), hasCity: false,
  },
};

function ListFormInner() {
  const searchParams = useSearchParams();
  const defaultType = (searchParams.get('type') as ProviderType) || 'agency';

  const [type, setType] = useState<ProviderType>(defaultType);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileSlug, setProfileSlug] = useState('');

  const cfg = TYPE_CONFIG[type];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.message || 'Something went wrong.'); setLoading(false); return; }
      setProfileSlug(json.slug);
      setStep('success');
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  if (step === 'success') {
    const path = type === 'agency' ? `/agencies` : type === 'creator' ? `/creators` : type === 'professional' ? `/professionals` : `/brands`;
    return (
      <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, background: '#0A0908', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <span style={{ color: '#F8F6F0', fontSize: 20 }}>v</span>
        </div>
        <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 12 }}>You are listed.</h1>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7, marginBottom: 8 }}>
          Your profile is live immediately. A confirmation email is on its way.
        </p>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7, marginBottom: 28 }}>
          When you are ready, apply for verification to earn the Few Found Verified mark and appear first in every search.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={path} style={{ background: '#0A0908', color: '#F8F6F0', padding: '11px 20px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, fontWeight: 600 }}>
            Browse {cfg.label}s
          </a>
          <a href="/verify" style={{ background: 'transparent', color: '#0A0908', padding: '11px 20px', textDecoration: 'none', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, border: '1px solid #0A0908' }}>
            Apply for verification
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '56px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>
        Free listing
      </p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: '#0A0908', marginBottom: 6 }}>
        List your profile
      </h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7, marginBottom: 32 }}>
        Free. Live immediately. No approval queue. When you are ready, apply separately for verification ({cfg.price}).
      </p>

      {/* Type selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 32 }}>
        {(Object.keys(TYPE_CONFIG) as ProviderType[]).map(t => (
          <button key={t} type="button" onClick={() => setType(t)} style={{
            padding: '12px 16px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s',
            background: type === t ? '#0A0908' : 'transparent',
            color: type === t ? '#F8F6F0' : '#0A0908',
            border: `1px solid ${type === t ? '#0A0908' : '#E2DED6'}`,
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 3px' }}>{TYPE_CONFIG[t].label}</p>
            <p style={{ fontSize: 10, margin: 0, opacity: 0.6 }}>{TYPE_CONFIG[t].desc.split(',')[0]}...</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Name */}
        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
            {type === 'agency' ? 'Agency name' : type === 'brand' ? 'Brand name' : 'Your name or professional name'} *
          </label>
          <input name="name" type="text" required placeholder={type === 'agency' ? 'e.g. Northlight Creative' : type === 'brand' ? 'e.g. Your Brand' : 'e.g. Rahul Khurana'}
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}
            onFocus={e => (e.target.style.borderColor = '#0A0908')}
            onBlur={e => (e.target.style.borderColor = '#E2DED6')}
          />
        </div>

        {/* Category / Industry */}
        {type !== 'brand' ? (
          <div>
            <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
              Primary category *
            </label>
            <select name="category" required style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}>
              <option value="">Select your primary category</option>
              {cfg.categories.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        ) : (
          <div>
            <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
              Industry *
            </label>
            <select name="category" required style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}>
              <option value="">Select your industry</option>
              {BRAND_INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
        )}

        {/* City */}
        {cfg.hasCity && (
          <div>
            <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
              Primary city *
            </label>
            <select name="city" required style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}>
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c.slug} value={c.name}>{c.name}</option>)}
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Email */}
        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
            Email address * <span style={{ fontWeight: 400, color: '#7A7773' }}>(for confirmation  -  not shown publicly)</span>
          </label>
          <input name="email" type="email" required placeholder="hello@youragency.com"
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}
            onFocus={e => (e.target.style.borderColor = '#0A0908')}
            onBlur={e => (e.target.style.borderColor = '#E2DED6')}
          />
        </div>

        {/* Website */}
        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
            Website <span style={{ fontWeight: 400, color: '#7A7773' }}>(optional)</span>
          </label>
          <input name="website" type="url" placeholder="https://"
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}
            onFocus={e => (e.target.style.borderColor = '#0A0908')}
            onBlur={e => (e.target.style.borderColor = '#E2DED6')}
          />
        </div>

        {/* Bio */}
        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
            Short description * <span style={{ fontWeight: 400, color: '#7A7773' }}>(max 150 words)</span>
          </label>
          <textarea name="bio" required rows={4}
            placeholder={type === 'agency' ? 'Describe your agency, what you specialise in, and who you work with...' : type === 'creator' ? 'Describe your content, your audience, and your commercial experience...' : type === 'brand' ? 'Describe your brand and what kind of marketing partners you are looking for...' : 'Describe your expertise, past clients, and what you offer...'}
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', resize: 'vertical', boxSizing: 'border-box' }}
            onFocus={e => (e.target.style.borderColor = '#0A0908')}
            onBlur={e => (e.target.style.borderColor = '#E2DED6')}
          />
        </div>

        {error && (
          <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', padding: '12px 16px' }}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p>
          </div>
        )}

        <div style={{ paddingTop: 8, borderTop: '1px solid #E2DED6' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 16, lineHeight: 1.6 }}>
            By submitting you confirm the information is accurate. Profile goes live immediately. No payment required.
            Verification ({cfg.price}) is a separate step when you are ready.
          </p>
          <button type="submit" disabled={loading} style={{
            width: '100%', background: loading ? '#7A7773' : '#0A0908', color: '#F8F6F0',
            border: 'none', padding: '14px', fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer',
            fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600,
          }}>
            {loading ? 'Submitting...' : `List as ${cfg.label}  -  Free`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function ListPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: "'Helvetica Neue', Arial, sans-serif", color: '#7A7773' }}>Loading...</div>}>
      <ListFormInner />
    </Suspense>
  );
}
