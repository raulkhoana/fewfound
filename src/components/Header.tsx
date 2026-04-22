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
        maxWidth: 1080, margin: '0 auto', padding: '13px 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12,
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Wordmark size="sm" />
        </Link>

        {/* Desktop nav — hidden below 900px */}
        <nav style={{ display: 'flex', gap: 20, alignItems: 'center', flex: 1, justifyContent: 'center' }} className="nav-links">
          {NAV.map(n => (
            <Link key={n.href} href={n.href} style={{
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: 12, color: n.bold ? '#0A0908' : '#3D3B38',
              textDecoration: 'none', fontWeight: n.bold ? 600 : 400,
              borderBottom: n.bold ? '1.5px solid #0A0908' : 'none',
              paddingBottom: n.bold ? 1 : 0, whiteSpace: 'nowrap',
            }}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          {/* For brands — desktop only */}
          <Link href="/for-brands" className="hide-mobile" style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 12, color: '#0A0908', textDecoration: 'none',
            border: '1px solid #0A0908', padding: '6px 12px', whiteSpace: 'nowrap',
          }}>
            For brands
          </Link>

          {/* List free — always visible */}
          <Link href="/list" style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: 12, color: '#F8F6F0', textDecoration: 'none',
            background: '#0A0908', padding: '6px 12px', fontWeight: 600, whiteSpace: 'nowrap',
          }}>
            List free
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="nav-mobile"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 2px', flexDirection: 'column', gap: 5,
              alignItems: 'center', justifyContent: 'center', width: 28,
            }}
          >
            <span style={{
              display: 'block', width: 22, height: 2, background: '#0A0908',
              transition: 'transform 0.2s',
              transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2, background: '#0A0908',
              opacity: open ? 0 : 1, transition: 'opacity 0.2s',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2, background: '#0A0908',
              transition: 'transform 0.2s',
              transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }} />
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {open && (
        <div style={{
          borderTop: '1px solid #E2DED6', background: '#F8F6F0',
          padding: '8px 20px 16px',
        }}>
          {[...NAV, { label: 'For brands', href: '/for-brands', bold: false }].map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0',
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: 15, color: '#0A0908', textDecoration: 'none',
              borderBottom: '1px solid #F2EFE8',
              fontWeight: n.bold ? 600 : 400,
            }}>
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
