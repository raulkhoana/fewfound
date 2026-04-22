'use client';
import { useState, useEffect } from 'react';

interface Listing {
  id: string; name: string; type: string; email: string; category: string; city?: string; verified: boolean; created_at: string;
}
interface Application {
  id: string; name: string; type: string; email: string; status: string; created_at: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState('');
  const [tab, setTab] = useState<'listings' | 'applications' | 'reviews' | 'interest'>('listings');
  const [listings, setListings] = useState<Listing[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [interest, setInterest] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function login() {
    const res = await fetch('/api/admin/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pw }) });
    if (res.ok) { setAuthed(true); loadData(); }
    else setPwErr('Incorrect password');
  }

  async function loadData() {
    setLoading(true);
    const [l, a, r, i] = await Promise.all([
      fetch('/api/admin/data?table=providers').then(r => r.json()),
      fetch('/api/admin/data?table=verification_applications').then(r => r.json()),
      fetch('/api/admin/data?table=brand_reviews').then(r => r.json()),
      fetch('/api/admin/data?table=brand_membership_interest').then(r => r.json()),
    ]);
    setListings(l.data || []);
    setApplications(a.data || []);
    setReviews(r.data || []);
    setInterest(i.data || []);
    setLoading(false);
  }

  if (!authed) return (
    <div style={{ maxWidth: 360, margin: '100px auto', padding: '0 24px', textAlign: 'center' }}>
      <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, color: '#0A0908', marginBottom: 24 }}>Admin</p>
      <input type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && login()}
        style={{ width: '100%', border: '1px solid #E2DED6', padding: '11px 14px', fontSize: 14, fontFamily: "'Helvetica Neue', Arial, sans-serif", outline: 'none', color: '#0A0908', background: '#fff', boxSizing: 'border-box', marginBottom: 10 }} />
      {pwErr && <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#DC2626', marginBottom: 10 }}>{pwErr}</p>}
      <button onClick={login} style={{ width: '100%', background: '#0A0908', color: '#F8F6F0', border: 'none', padding: '12px', fontSize: 13, cursor: 'pointer', fontFamily: "'Helvetica Neue', Arial, sans-serif", fontWeight: 600 }}>Sign in</button>
    </div>
  );

  const tabs = [
    { id: 'listings',     label: `Listings (${listings.length})`          },
    { id: 'applications', label: `Verification (${applications.length})`  },
    { id: 'reviews',      label: `Brand reviews (${reviews.length})`      },
    { id: 'interest',     label: `Brand interest (${interest.length})`    },
  ];

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 24, color: '#0A0908', margin: 0 }}>Admin</p>
        <button onClick={loadData} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', background: 'none', border: '1px solid #E2DED6', padding: '6px 14px', cursor: 'pointer' }}>Refresh</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { label: 'Total listings', val: listings.length },
          { label: 'Verified',       val: listings.filter(l => l.verified).length },
          { label: 'Applications',   val: applications.length },
          { label: 'Brand interest', val: interest.length },
        ].map(s => (
          <div key={s.label} style={{ background: '#F2EFE8', border: '1px solid #E2DED6', padding: '16px', textAlign: 'center' }}>
            <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 32, color: '#0A0908', margin: '0 0 4px' }}>{s.val}</p>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #E2DED6', marginBottom: 24 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)} style={{
            padding: '10px 18px', cursor: 'pointer', border: 'none', borderBottom: tab === t.id ? '2px solid #0A0908' : '2px solid transparent',
            background: 'transparent', color: tab === t.id ? '#0A0908' : '#7A7773', fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 13, fontWeight: tab === t.id ? 600 : 400, marginBottom: -1,
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {loading && <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#7A7773' }}>Loading...</p>}

      {tab === 'listings' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F2EFE8' }}>
              {['Name', 'Type', 'Category', 'City', 'Email', 'Verified', 'Date'].map(h => (
                <th key={h} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E2DED6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listings.map((l, i) => (
              <tr key={l.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF8' }}>
                {[l.name, l.type, l.category, l.city || ' - ', l.email, l.verified ? '* Yes' : 'No', new Date(l.created_at).toLocaleDateString('en-IN')].map((v, j) => (
                  <td key={j} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: j === 5 && l.verified ? '#0A0908' : '#3D3B38', fontWeight: j === 5 && l.verified ? 700 : 400, padding: '8px 12px', borderBottom: '1px solid #F2EFE8' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'applications' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F2EFE8' }}>
              {['Name', 'Type', 'Email', 'Status', 'Date'].map(h => (
                <th key={h} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E2DED6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((a, i) => (
              <tr key={a.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF8' }}>
                {[a.name, a.type, a.email, a.status, new Date(a.created_at).toLocaleDateString('en-IN')].map((v, j) => (
                  <td key={j} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', padding: '8px 12px', borderBottom: '1px solid #F2EFE8' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'reviews' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reviews.map((r: any) => (
            <div key={r.id} style={{ background: '#fff', border: '1px solid #E2DED6', padding: '16px' }}>
              <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
                <p style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 15, color: '#0A0908', margin: 0, fontWeight: 600 }}>{r.brand_name}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', margin: 0, paddingTop: 3 }}>{r.reviewer_role}</p>
                <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#7A7773', margin: 0, paddingTop: 3, marginLeft: 'auto' }}>{new Date(r.created_at).toLocaleDateString('en-IN')}</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: r.comment ? 10 : 0 }}>
                {[['Payment', r.payment_timing], ['Brief', r.brief_quality], ['Approvals', r.approval_speed], ['Work again', r.would_work_again]].map(([label, val]) => (
                  <div key={label}>
                    <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 9, color: '#7A7773', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>{label}</p>
                    <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 11, color: '#3D3B38', margin: 0 }}>{val}</p>
                  </div>
                ))}
              </div>
              {r.comment && <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', margin: 0, fontStyle: 'italic', paddingTop: 8, borderTop: '1px solid #F2EFE8' }}>{r.comment}</p>}
            </div>
          ))}
        </div>
      )}

      {tab === 'interest' && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#F2EFE8' }}>
              {['Brand', 'Contact', 'Email', 'Plan', 'Date'].map(h => (
                <th key={h} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 12px', textAlign: 'left', borderBottom: '1px solid #E2DED6' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {interest.map((it: any, i) => (
              <tr key={it.id} style={{ background: i % 2 === 0 ? '#fff' : '#FAFAF8' }}>
                {[it.brand_name, it.contact_name, it.email, it.plan, new Date(it.created_at).toLocaleDateString('en-IN')].map((v, j) => (
                  <td key={j} style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#3D3B38', padding: '8px 12px', borderBottom: '1px solid #F2EFE8' }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
