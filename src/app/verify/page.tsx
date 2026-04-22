'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const PRICING: Record<string, { label: string; price: string }> = {
  agency:       { label: 'Agency', price: '₹24,999/year' },
  creator:      { label: 'Creator', price: '₹14,999/year' },
  professional: { label: 'Independent Professional', price: '₹24,999/year' },
  brand:        { label: 'Brand', price: '₹14,999/year' },
};

function VerifyFormInner() {
  const searchParams = useSearchParams();
  const defaultType = searchParams.get('type') || 'agency';
  const [type, setType] = useState(defaultType);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cfg = PRICING[type] || PRICING.agency;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type }),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.message || 'Something went wrong.'); setLoading(false); return; }
      setStep('success');
    } catch {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  }

  if (step === 'success') return (
    <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, background: '#0A0908', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <span style={{ color: '#F8F6F0', fontSize: 20 }}>v</span>
      </div>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: '#0A0908', marginBottom: 12 }}>Application received.</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7, marginBottom: 8 }}>
        We will review your application and contact you within 48 hours with payment details and next steps.
      </p>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7, marginBottom: 28 }}>
        Verification typically completes in 5–7 working days once payment is confirmed and references are submitted.
      </p>
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Apply for verification</p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: '#0A0908', marginBottom: 6 }}>
        Earn the Few Found Verified mark.
      </h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7, marginBottom: 32 }}>
        Independently assessed. Appears first in every search. The badge means something because it is earned, not bought.
      </p>

      {/* Type tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 32, borderBottom: '1px solid #E2DED6' }}>
        {Object.entries(PRICING).map(([t, c]) => (
          <button key={t} type="button" onClick={() => setType(t)} style={{
            padding: '10px 16px', cursor: 'pointer', border: 'none', borderBottom: type === t ? '2px solid #0A0908' : '2px solid transparent',
            background: 'transparent', color: type === t ? '#0A0908' : '#7A7773', fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 13, fontWeight: type === t ? 600 : 400, marginBottom: -1,
          }}>
            {c.label}
          </button>
        ))}
      </div>

      {/* What you get */}
      <div style={{ background: '#F2EFE8', border: '1px solid #E2DED6', padding: '20px', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>Verification fee</p>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, color: '#0A0908', margin: 0 }}>{cfg.price}</p>
          </div>
          <div style={{ background: '#0A0908', color: '#F8F6F0', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', padding: '4px 9px', fontFamily: "'Helvetica Neue', Arial, sans-serif", marginTop: 6 }}>
            * FEW FOUND VERIFIED
          </div>
        </div>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', margin: '0 0 8px', fontStyle: 'italic' }}>
          Full refund if you do not pass. Written feedback on what failed.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {['Appear first in every search  -  always', 'Independent reference checks (not routed through you)', 'Verification record on your profile', 'Score band visible to brand members', '12-month validity'].map(item => (
            <p key={item} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', margin: 0, display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <span style={{ color: '#0A0908', fontWeight: 700, flexShrink: 0 }}>v</span> {item}
            </p>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {[
          { name: 'name', label: `${cfg.label} name`, placeholder: 'Your full name or company name', required: true },
          { name: 'email', label: 'Email address', placeholder: 'hello@yourcompany.com', type: 'email', required: true },
          { name: 'website', label: 'Website', placeholder: 'https://', required: false },
          { name: 'profile_url', label: 'Few Found profile URL', placeholder: 'https://fewfound.co/agencies/mumbai/...', required: false },
          { name: 'ref1_name', label: 'Reference 1  -  Name', placeholder: 'Name of your client or brand contact', required: true },
          { name: 'ref1_email', label: 'Reference 1  -  Email', placeholder: 'Their email address', type: 'email', required: true },
          { name: 'ref2_name', label: 'Reference 2  -  Name', placeholder: 'Name of a second client or brand contact', required: true },
          { name: 'ref2_email', label: 'Reference 2  -  Email', placeholder: 'Their email address', type: 'email', required: true },
        ].map(f => (
          <div key={f.name}>
            <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>
              {f.label} {f.required && '*'}
            </label>
            <input name={f.name} type={f.type || 'text'} required={f.required} placeholder={f.placeholder}
              style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#0A0908')}
              onBlur={e => (e.target.style.borderColor = '#E2DED6')}
            />
          </div>
        ))}

        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>Any message or context for the review team</label>
          <textarea name="message" rows={3} style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', resize: 'vertical', boxSizing: 'border-box' }}
            onFocus={e => (e.target.style.borderColor = '#0A0908')}
            onBlur={e => (e.target.style.borderColor = '#E2DED6')}
          />
        </div>

        {error && <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', padding: '12px 16px' }}><p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p></div>}

        <div style={{ paddingTop: 8, borderTop: '1px solid #E2DED6' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 16, lineHeight: 1.6 }}>
            We will review your application and contact you within 48 hours with payment instructions. We contact your references independently  -  not through you.
          </p>
          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7A7773' : '#0A0908', color: '#F8F6F0', border: 'none', padding: '14px', fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>
            {loading ? 'Submitting...' : `Submit verification application  -  ${cfg.price}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div style={{ padding: '80px 24px', textAlign: 'center', fontFamily: "'Helvetica Neue', Arial, sans-serif", color: '#7A7773' }}>Loading...</div>}>
      <VerifyFormInner />
    </Suspense>
  );
}
