import { NextRequest, NextResponse } from 'next/server';
import { serviceClient, slugify } from '@/lib/supabase';
import { Resend } from 'resend';
import { CITIES, AGENCY_CATEGORIES, CREATOR_CATEGORIES, PROFESSIONAL_CATEGORIES } from '@/lib/constants';


const FROM = process.env.RESEND_FROM || 'hello@fewfound.co';
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fewfound.co';

function getCitySlug(name: string) {
  return CITIES.find(c => c.name === name)?.slug || slugify(name);
}

function getCatSlug(name: string, type: string) {
  const all = type === 'agency' ? AGENCY_CATEGORIES : type === 'creator' ? CREATOR_CATEGORIES : PROFESSIONAL_CATEGORIES;
  return all.find(c => c.name === name)?.slug || slugify(name);
}

function profilePath(type: string, citySlug: string, catSlug: string, slug: string) {
  if (type === 'agency')       return `/agencies/${citySlug}/${slug}`;
  if (type === 'creator')      return `/creators/${catSlug}/${slug}`;
  if (type === 'professional') return `/professionals/${citySlug}/${slug}`;
  return `/brands/${slug}`;
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
const body = await req.json();
    const { type, name, category, city, email, website, bio } = body;

    if (!name?.trim() || !type || !email?.trim()) {
      return NextResponse.json({ message: 'Name, type, and email are required.' }, { status: 400 });
    }

    const supabase = serviceClient();
    const ts = Date.now();

    if (type === 'brand') {
      const slug = `${slugify(name)}-${ts}`;
      const { data, error } = await supabase.from('brands').insert({
        name: name.trim(),
        industry: category || 'Other',
        website: website || null,
        email: email.trim(),
        slug, bio: bio || null,
        verified: false,
      }).select().single();

      if (error) { console.error(error); return NextResponse.json({ message: 'Failed to create listing.' }, { status: 500 }); }

      await resend.emails.send({
        from: FROM, to: email.trim(),
        subject: `${name} is now listed on Few Found`,
        html: `<p>Your brand profile for <strong>${name}</strong> is live on Few Found.</p><p><a href="${SITE}/brands/${slug}">View your profile</a></p><p>When you're ready, <a href="${SITE}/verify?type=brand">apply for brand verification</a>.</p>`,
      }).catch(() => {});

      return NextResponse.json({ success: true, slug, id: data.id });
    }

    // Providers
    const citySlug = getCitySlug(city || '');
    const catSlug  = getCatSlug(category || '', type);
    const base = type === 'creator' ? `${slugify(name)}-${catSlug}` : `${slugify(name)}-${citySlug}`;
    const slug = `${base}-${ts}`;

    const { data, error } = await supabase.from('providers').insert({
      name: name.trim(), type,
      city: city || '',
      city_slug: citySlug,
      category: category || '',
      category_slug: catSlug,
      services: [],
      website: website || null,
      email: email.trim(),
      bio: bio || null,
      slug, verified: false,
    }).select().single();

    if (error) { console.error(error); return NextResponse.json({ message: 'Failed to create listing.' }, { status: 500 }); }

    const path = profilePath(type, citySlug, catSlug, slug);

    await resend.emails.send({
      from: FROM, to: email.trim(),
      subject: `${name} is now listed on Few Found`,
      html: `
        <p>Your profile for <strong>${name}</strong> is live on Few Found.</p>
        <p><a href="${SITE}${path}">View your profile</a></p>
        <hr>
        <p><strong>Next step: Apply for verification</strong></p>
        <p>Verified providers appear above listed-only providers in every search. Always.</p>
        <p>Verification for your type starts at ₹14,999/year.</p>
        <p><a href="${SITE}/verify?type=${type}">Apply for verification </a></p>
        <hr>
        <p style="font-size:12px;color:#7A7773">Few Found · India's trust layer for marketing service providers · <a href="${SITE}">fewfound.co</a></p>
      `,
    }).catch(() => {});

    return NextResponse.json({ success: true, slug, id: data.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
