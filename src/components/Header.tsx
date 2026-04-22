'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Wordmark } from './Wordmark';

const NAV = [
  { label: 'Agencies',      href: '/agencies'      },
  { label: 'Creators',      href: '/creators'      },
  { label: 'Professionals', href: '/professionals'  },
  { label: 'Brands',        href: '/brands'        },
  { label: 'Review a brand',href: '/review-brand', bold: true },
  { label: 'How it works',  href: '/how-it-works'  },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{
      background: '#F8F6F0',
      borderBottom: '1px solid #E2DED6',
      position: 'sticky', top: 0, zIndex: 200,
    }}>
      <div style={{
        maxWidth: 1080, margin: '0 auto', padding: '13px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Wordmark size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hidden md:flex">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: 13, color: n.bold ? '#0A0908' : '#3D3B38',
              textDecoration: 'none',
              fontWeight: n.bold ? 600 : 400,
              borderBottom: n.bold ? '1.5px solid #0A0908' : 'none',
              paddingBottom: n.bold ? 1 : 0,
            }}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10 }}>
          <Link href="/for-brands" style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 12, color: '#0A0908', textDecoration: 'none',
            border: '1px solid #0A0908', padding: '7px 14px',
          }}>
            For brands
          </Link>
          <Link href="/list" style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 12, color: '#F8F6F0', textDecoration: 'none',
            background: '#0A0908', padding: '7px 14px', fontWeight: 600,
          }}>
            List free
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div style={{ borderTop: '1px solid #E2DED6', background: '#F8F6F0', padding: '16px 24px' }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '10px 0',
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: 14, color: '#0A0908', textDecoration: 'none',
              borderBottom: '1px solid #E2DED6',
            }}>
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
