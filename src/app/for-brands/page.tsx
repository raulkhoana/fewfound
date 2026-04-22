'use client';
import { useState } from 'react';
import Link from 'next/link';
import { PRICING } from '@/lib/constants';

const PLANS = [
  {
    id: 'connect',
    name: 'Brand Connect',
    price: '₹60,000/year',
    desc: 'For brands that need to find the right verified partner quickly.',
    features: [
      'Full verified profiles with score bands',
      'Reference contact details',
      'Evidence packs and case study records',
      'Shortlist service  -  submit a brief, receive curated matches',
      'Up to 12 shortlist requests per year',
    ],
  },
  {
    id: 'member',
    name: 'Brand Member',
    price: '₹1,50,000/year',
    desc: 'For brands that make multiple marketing hires or partner searches per year.',
    features: [
      'Everything in Brand Connect',
      'Unlimited shortlist requests',
      'Anonymous brand review data for your brand',
      'Early access to new verified providers',
      'Direct WhatsApp access to the Few Found team',
    ],
  },
];

export default function ForBrandsPage() {
  const [step, setStep] = useState<'home' | 'form' | 'success'>('home');
  const [plan, setPlan] = useState('connect');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/brands/membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, plan }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.message || 'Something went wrong.'); setLoading(false); return; }
      setStep('success');
    } catch { setError('Network error. Please try again.'); }
    setLoading(false);
  }

  if (step === 'success') return (
    <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, background: '#0A0908', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <span style={{ color: '#F8F6F0', fontSize: 20 }}>v</span>
      </div>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: '#0A0908', marginBottom: 12 }}>Interest registered.</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7 }}>
        We will be in touch within 24 hours with next steps and payment details.
      </p>
    </div>
  );

  if (step === 'form') return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '56px 24px' }}>
      <button onClick={() => setStep('home')} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', background: 'none', border: 'none', cursor: 'pointer', marginBottom: 24, padding: 0 }}>← Back</button>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>Register interest</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#7A7773', marginBottom: 32 }}>We will be in touch within 24 hours.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>Plan</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {PLANS.map(p => (
              <button key={p.id} type="button" onClick={() => setPlan(p.id)} style={{
                padding: '12px 16px', textAlign: 'left', cursor: 'pointer',
                background: plan === p.id ? '#0A0908' : 'transparent',
                color: plan === p.id ? '#F8F6F0' : '#0A0908',
                border: `1px solid ${plan === p.id ? '#0A0908' : '#E2DED6'}`,
                fontFamily: "'Helvetica Neue', Arial, sans-serif",
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 2px' }}>{p.name}</p>
                <p style={{ fontSize: 12, margin: 0 }}>{p.price}</p>
              </button>
            ))}
          </div>
        </div>

        {[
          { name: 'brand_name', label: 'Brand name *', placeholder: 'Your brand name', required: true },
          { name: 'contact_name', label: 'Your name *', placeholder: 'Your full name', required: true },
          { name: 'email', label: 'Work email *', placeholder: 'you@brand.com', type: 'email', required: true },
          { name: 'website', label: 'Website', placeholder: 'https://', required: false },
          { name: 'current_problem', label: 'What problem are you trying to solve?', placeholder: 'Tell us what you are looking for...', required: false, textarea: true },
        ].map(f => (
          <div key={f.name}>
            <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>{f.label}</label>
            {f.textarea ? (
              <textarea name={f.name} rows={3} placeholder={f.placeholder} style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', resize: 'vertical', boxSizing: 'border-box' }} />
            ) : (
              <input name={f.name} type={f.type || 'text'} required={f.required} placeholder={f.placeholder} style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }} />
            )}
          </div>
        ))}

        {error && <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', padding: '12px 16px' }}><p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p></div>}

        <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7A7773' : '#0A0908', color: '#F8F6F0', border: 'none', padding: '14px', fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>
          {loading ? 'Submitting...' : 'Register interest'}
        </button>
      </form>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#0A0908', padding: '72px 24px 64px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: 'rgba(248,246,240,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>For brands</p>
          <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 44, color: '#F8F6F0', lineHeight: 1.2, marginBottom: 16, maxWidth: 600 }}>
            Stop hiring based on decks and vibes.
          </h1>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 16, color: 'rgba(248,246,240,0.55)', lineHeight: 1.7, maxWidth: 500, marginBottom: 40 }}>
            Every agency claims results. Every creator claims engagement. Few Found verifies which claims are real. Brand members access the full record  -  score bands, references, evidence.
          </p>
          <button onClick={() => setStep('form')} style={{ background: '#F8F6F0', color: '#0A0908', border: 'none', padding: '14px 28px', fontSize: 14, cursor: 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 700 }}>
            Get access
          </button>
        </div>
      </section>

      {/* Plans */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '64px 24px' }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 32 }}>Membership plans</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {PLANS.map(p => (
            <div key={p.id} style={{ border: '1px solid #E2DED6', padding: '28px' }}>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>{p.name}</p>
              <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', marginBottom: 8 }}>{p.price}</p>
              <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', marginBottom: 20, lineHeight: 1.6 }}>{p.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {p.features.map(f => (
                  <p key={f} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', margin: 0, display: 'flex', gap: 8, alignItems: 'flex-start', lineHeight: 1.5 }}>
                    <span style={{ color: '#0A0908', fontWeight: 700, flexShrink: 0 }}>v</span>{f}
                  </p>
                ))}
              </div>
              <button onClick={() => { setPlan(p.id); setStep('form'); }} style={{ width: '100%', background: '#0A0908', color: '#F8F6F0', border: 'none', padding: '12px', fontSize: 13, cursor: 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>
                Register interest
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* What brands see */}
      <section style={{ background: '#F2EFE8', borderTop: '1px solid #E2DED6', borderBottom: '1px solid #E2DED6', padding: '64px 24px' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>What brand members see</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { t: 'Score bands', d: 'A+ through B. Calculated across 9 criteria. Not shown publicly  -  only to brand members.' },
              { t: 'Reference contacts', d: 'Names and emails of the references who verified the provider. You can contact them directly.' },
              { t: 'Evidence pack', d: 'The case studies and claims submitted at verification. Reviewed for internal consistency.' },
              { t: 'Shortlist service', d: 'Submit a brief. Receive a curated list of matching verified providers ranked by score.' },
              { t: 'Brand review data', d: 'Anonymous reviews submitted by agencies and creators who have worked with your brand.' },
              { t: 'Verification history', d: 'When each provider was verified, and whether they have renewed. Recency matters.' },
            ].map(item => (
              <div key={item.t} style={{ background: '#fff', border: '1px solid #E2DED6', padding: '20px' }}>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, color: '#0A0908', marginBottom: 6 }}>{item.t}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.6, margin: 0 }}>{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
