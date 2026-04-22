import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Cancellation and Refund Policy',
  description: 'Cancellation and Refund Policy for Few Found — operated by Scalemind Media.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 10, color: '#7A7773', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Legal</p>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 36, color: '#0A0908', marginBottom: 8 }}>Cancellation &amp; Refund Policy</h1>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 8 }}>Last updated on 22-04-2026</p>
      <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 12, color: '#7A7773', marginBottom: 40 }}>Operated by: SCALEMIND MEDIA (Eliteaffnet Pvt Ltd)</p>

      <div style={{ borderTop: '1px solid #E2DED6', paddingTop: 32 }}>
        <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, marginBottom: 24 }}>
          SCALEMIND MEDIA believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:
        </p>

        {[
          'Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the service delivery process has already been initiated.',
          'For verification services: if a provider does not pass the verification assessment, a full refund will be issued within 48 hours along with specific written feedback on what did not pass.',
          'In case of complaints regarding the service, please report the same to our Customer Service team at hello@fewfound.co.',
          'In case you feel that the service received is not as described on the site, you must bring it to the notice of our customer service within the same day of receiving the service outcome.',
          'In case of any refunds approved by SCALEMIND MEDIA, it will take 16 to 30 days for the refund to be processed to the end customer.',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
            <span style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 16, color: '#C4900A', flexShrink: 0, marginTop: 2 }}>&#8226;</span>
            <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 14, color: '#3D3B38', lineHeight: 1.8, margin: 0 }}>{item}</p>
          </div>
        ))}

        <div style={{ marginTop: 32, padding: '20px 24px', background: '#F2EFE8', border: '1px solid #E2DED6' }}>
          <p style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", fontSize: 13, color: '#3D3B38', lineHeight: 1.8, margin: 0 }}>
            For all refund and cancellation requests, contact us at{' '}
            <a href="mailto:hello@fewfound.co" style={{ color: '#0A0908' }}>hello@fewfound.co</a>
            {' '}or WhatsApp{' '}
            <a href="https://wa.me/919810939740" style={{ color: '#0A0908' }}>+91 9810939740</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
