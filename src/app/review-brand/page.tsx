'use client';
import { useState } from 'react';

const QUESTIONS = [
  { id: 'payment_timing', label: 'Payment timing', options: ['Always on time', 'Usually on time', 'Often delayed', 'Very delayed'] },
  { id: 'brief_quality',  label: 'Brief quality',  options: ['Excellent  -  clear objectives and budget', 'Good  -  mostly clear', 'Poor  -  vague and changed frequently', 'No structured brief'] },
  { id: 'approval_speed', label: 'Approval speed', options: ['Fast  -  within agreed timelines', 'Reasonable', 'Slow  -  consistent delays', 'Very slow  -  blocked work regularly'] },
  { id: 'would_work_again', label: 'Would you work with this brand again?', options: ['Yes, without hesitation', 'Yes, with certain conditions', 'Unlikely', 'No'] },
];

export default function ReviewBrandPage() {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (Object.keys(answers).length < QUESTIONS.length) { setError('Please answer all questions.'); return; }
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const data = { ...Object.fromEntries(fd.entries()), ...answers };

    try {
      const res = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const json = await res.json();
      if (!res.ok) { setError(json.message || 'Something went wrong.'); setLoading(false); return; }
      setStep('success');
    } catch { setError('Network error. Please try again.'); }
    setLoading(false);
  }

  if (step === 'success') return (
    <div style={{ maxWidth: 560, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ width: 48, height: 48, background: '#0A0908', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><span style={{ color: '#F8F6F0', fontSize: 20 }}>v</span></div>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 28, color: '#0A0908', marginBottom: 12 }}>Review submitted.</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.7 }}>Your review is anonymous. It contributes to the brand's score visible to brand members. The brand never sees who submitted it.</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>Review a brand</p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: '#0A0908', marginBottom: 8 }}>How was the brand to work with?</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#7A7773', lineHeight: 1.7, marginBottom: 32 }}>Anonymous. 5 minutes. The brand never sees who submitted a review. This data helps other agencies and creators make informed decisions.</p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>Brand name *</label>
          <input name="brand_name" type="text" required placeholder="Name of the brand you worked with"
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }} />
        </div>

        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>Your role *</label>
          <input name="reviewer_role" type="text" required placeholder="e.g. Performance agency, Lifestyle creator, Fractional CMO"
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box' }} />
        </div>

        {QUESTIONS.map(q => (
          <div key={q.id}>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#0A0908', marginBottom: 10, fontWeight: 500 }}>{q.label} *</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {q.options.map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 14px', border: `1px solid ${answers[q.id] === opt ? '#0A0908' : '#E2DED6'}`, background: answers[q.id] === opt ? '#F2EFE8' : '#fff', transition: 'all 0.15s' }}>
                  <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt }))} style={{ accentColor: '#0A0908' }} />
                  <span style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#0A0908' }}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div>
          <label style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', display: 'block', marginBottom: 5, fontWeight: 500 }}>Any additional context? <span style={{ fontWeight: 400, color: '#7A7773' }}>(optional  -  also anonymous)</span></label>
          <textarea name="comment" rows={3} placeholder="What would you want another agency or creator to know before working with this brand?"
            style={{ width: '100%', border: '1px solid #E2DED6', padding: '10px 13px', fontSize: 13, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', resize: 'vertical', boxSizing: 'border-box' }} />
        </div>

        {error && <div style={{ background: '#FFF0F0', border: '1px solid #FECACA', padding: '12px 16px' }}><p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p></div>}

        <div style={{ paddingTop: 8, borderTop: '1px solid #E2DED6' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 14, lineHeight: 1.6 }}>Your identity is not collected or stored. The brand does not know who submitted this review. Few Found stores only the role and the answers  -  not your name or email.</p>
          <button type="submit" disabled={loading} style={{ width: '100%', background: loading ? '#7A7773' : '#0A0908', color: '#F8F6F0', border: 'none', padding: '14px', fontSize: 14, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>
            {loading ? 'Submitting...' : 'Submit anonymous review'}
          </button>
        </div>
      </form>
    </div>
  );
}
