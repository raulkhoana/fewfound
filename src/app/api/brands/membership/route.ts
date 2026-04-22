import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';
import { Resend } from 'resend';


const FROM  = process.env.RESEND_FROM || 'hello@fewfound.co';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
const body = await req.json();
    const { plan, brand_name, contact_name, email, website, current_problem } = body;
    if (!brand_name || !email || !contact_name) return NextResponse.json({ message: 'Required fields missing.' }, { status: 400 });

    await serviceClient().from('brand_membership_interest').insert({ plan, brand_name, contact_name, email, website: website || null, notes: current_problem || null, status: 'new' });

    await resend.emails.send({
      from: FROM, to: 'hello@fewfound.co',
      subject: `New brand membership interest  -  ${brand_name} (${plan})`,
      html: `<h2>Brand Membership Interest</h2><p><strong>Brand:</strong> ${brand_name}</p><p><strong>Contact:</strong> ${contact_name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Plan:</strong> ${plan}</p><p><strong>Website:</strong> ${website || 'N/A'}</p><p><strong>Problem:</strong> ${current_problem || 'Not provided'}</p>`,
    }).catch(() => {});

    await resend.emails.send({
      from: FROM, to: email,
      subject: 'We have received your interest  -  Few Found',
      html: `<p>Hi ${contact_name},</p><p>Thank you for your interest in Few Found brand membership. Our team will be in touch within 24 hours with details and next steps.</p>`,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
