import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsApp } from '@/components/WhatsApp';
import { orgSchema } from '@/lib/seo';
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from '@/lib/constants';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `Few Found  -  ${SITE_TAGLINE}`,
    template: '%s | Few Found',
  },
  description: "Few Found is India's free listing and independent verification platform for marketing agencies, creators, and professionals. Brands browse free. Verified providers are independently assessed.",
  keywords: ['verified marketing agencies India', 'marketing agency verification India', 'find marketing agency India', 'verified creators India', 'few found'],
  openGraph: {
    type: 'website', locale: 'en_IN', url: SITE_URL, siteName: SITE_NAME,
    title: `Few Found  -  ${SITE_TAGLINE}`,
    description: "India's free listing and verification platform for marketing service providers.",
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema()) }} />
        <meta name="theme-color" content="#F8F6F0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body style={{ background: '#F8F6F0', color: '#0A0908', margin: 0 }}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsApp />
      </body>
    </html>
  );
}
