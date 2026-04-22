'use client';
import React from 'react';

interface WordmarkProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  dark?: boolean;
}

export function Wordmark({ size = 'sm', dark = false }: WordmarkProps) {
  const color = dark ? '#F8F6F0' : '#0A0908';

  // fewGap = margin between F-E and E-W (larger = more visible space)
  // foundGap = margin between F-O, O-U etc (tighter than FEW)
  // rm = rule margin top/bottom
  const cfg = {
    sm:   { fs: 11, fw: 700, fw2: 900, fewGap: 5,  foundGap: 3,  rh: 1, rm: 3 },
    md:   { fs: 20, fw: 700, fw2: 900, fewGap: 9,  foundGap: 5,  rh: 2, rm: 5 },
    lg:   { fs: 36, fw: 700, fw2: 900, fewGap: 16, foundGap: 9,  rh: 2, rm: 7 },
    hero: { fs: 80, fw: 700, fw2: 900, fewGap: 36, foundGap: 20, rh: 3, rm: 12 },
  };
  const c = cfg[size] || cfg.sm;

  const base: React.CSSProperties = {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: c.fs,
    lineHeight: 1,
    display: 'inline-block',
    color,
  };

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      {/* F  E  W  -  wider gaps for 3-letter word, very visible */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        <span style={{ ...base, fontWeight: c.fw }}>F</span>
        <span style={{ ...base, fontWeight: c.fw, marginLeft: c.fewGap }}>E</span>
        <span style={{ ...base, fontWeight: c.fw, marginLeft: c.fewGap }}>W</span>
      </div>
      {/* Gold rule  -  the only place gold appears */}
      <div style={{
        height: c.rh,
        background: '#C4900A',
        margin: `${c.rm}px 0`,
        width: '100%',
      }} />
      {/* F O U N D  -  tighter than FEW, heavier weight */}
      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        {'FOUND'.split('').map((l, i) => (
          <span key={i} style={{ ...base, fontWeight: c.fw2, marginLeft: i === 0 ? 0 : c.foundGap }}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
