import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES } from '@/lib/constants';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fewfound.co';
const FROM = process.env.RESEND_FROM || 'hello@fewfound.co';

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim();
}

function getCitySlug(name: string) {
  return CITIES.find(c => c.name === name)?.slug || slugify(name);
}

function getCatSlug(name: string, type: string) {
  const all = type === 'agency' ? AGENCY_CATEGORIES : type === 'creator' ? CREATOR_CATEGORIES : PROFESSIONAL_CATEGORIES;
  return all.find(c => c.name === name)?.slug || slugify(name);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, name, category, city, email, website, bio } = body;

    if (!name?.trim() || !type || !email?.trim()) {
      return NextResponse.json({ message: 'Name, type, and email are required.' }, { status: 400 });
    }

    const db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const ts = Date.now();

    if (type === 'brand') {
      const slug = `${slugify(name)}-${ts}`;
      const { error } = await db.from('brands').insert({
        name: name.trim(),
        industry: category || 'Other',
        website: website || null,
        email: email.trim(),
        slug,
        bio: bio || null,
        verified: false,
      });

      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({ message: 'Failed to create listing.' }, { status: 500 });
      }

      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: FROM, to: email.trim(),
          subject: `${name} is now listed on Few Found`,
          html: `<p>Your brand profile for <strong>${name}</strong> is live on Few Found.</p>`,
        });
      } catch (e) { console.error('Email error:', e); }

      return NextResponse.json({ success: true, slug });
    }

    const citySlug = getCitySlug(city || '');
    const catSlug  = getCatSlug(category || '', type);
    const base = type === 'creator' ? `${slugify(name)}-${catSlug}` : `${slugify(name)}-${citySlug}`;
    const slug = `${base}-${ts}`;

    const { error } = await db.from('providers').insert({
      name: name.trim(),
      type,
      city: city || '',
      city_slug: citySlug,
      category: category || '',
      category_slug: catSlug,
      services: [],
      website: website || null,
      email: email.trim(),
      bio: bio || null,
      slug,
      verified: false,
    });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ message: 'Failed to create listing.' }, { status: 500 });
    }

    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const path = type === 'agency' ? `/agencies/${citySlug}/${slug}` : type === 'creator' ? `/creators/${catSlug}/${slug}` : `/professionals/${citySlug}/${slug}`;
      await resend.emails.send({
        from: FROM, to: email.trim(),
        subject: `${name} is now listed on Few Found`,
        html: `<p>Your profile for <strong>${name}</strong> is live on Few Found.</p><p><a href="${SITE}${path}">View your profile</a></p>`,
      });
    } catch (e) { console.error('Email error:', e); }

    return NextResponse.json({ success: true, slug });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
