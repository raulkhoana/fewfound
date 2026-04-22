import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';
import { Resend } from 'resend';


const FROM  = process.env.RESEND_FROM || 'hello@fewfound.co';
const SITE  = process.env.NEXT_PUBLIC_SITE_URL || 'https://fewfound.co';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
const body = await req.json();
    const { type, name, email, website, profile_url, ref1_name, ref1_email, ref2_name, ref2_email, message } = body;

    if (!name || !email || !ref1_name || !ref1_email || !ref2_name || !ref2_email) {
      return NextResponse.json({ message: 'All required fields must be filled.' }, { status: 400 });
    }

    const supabase = serviceClient();
    await supabase.from('verification_applications').insert({
      name, type, email, website: website || null,
      profile_url: profile_url || null,
      ref1_name, ref1_email, ref2_name, ref2_email,
      notes: message || null,
      status: 'pending',
    });

    // Notify team
    await resend.emails.send({
      from: FROM,
      to: 'hello@fewfound.co',
      subject: `New verification application  -  ${name} (${type})`,
      html: `<h2>New Application</h2><p><strong>Name:</strong> ${name}</p><p><strong>Type:</strong> ${type}</p><p><strong>Email:</strong> ${email}</p><p><strong>Website:</strong> ${website || 'N/A'}</p><p><strong>Profile:</strong> ${profile_url || 'N/A'}</p><hr><p><strong>Ref 1:</strong> ${ref1_name}  -  ${ref1_email}</p><p><strong>Ref 2:</strong> ${ref2_name} - ${ref2_email}</p><p><strong>Notes:</strong> ${message || 'None'}</p>`,
    }).catch(() => {});

    // Confirm to applicant
    await resend.emails.send({
      from: FROM, to: email,
      subject: 'Verification application received  -  Few Found',
      html: `<p>Hi ${name},</p><p>We have received your verification application. Our team will review it and contact you within 48 hours with payment instructions and next steps.</p><p>We will contact your references independently. They do not need to do anything yet.</p><p>Verification typically completes in 5–7 working days once payment is confirmed.</p><p>If you have any questions, reply to this email or reach us on WhatsApp.</p><p style="font-size:12px;color:#7A7773">Few Found · <a href="${SITE}">fewfound.co</a></p>`,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
