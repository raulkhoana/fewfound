import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';
import { Resend } from 'resend';

const FROM = process.env.RESEND_FROM || 'hello@fewfound.co';

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { brand_name, reviewer_role, payment_timing, brief_quality, approval_speed, would_work_again, comment } = body;
    if (!brand_name || !reviewer_role) {
      return NextResponse.json({ message: 'Required fields missing.' }, { status: 400 });
    }

    await serviceClient().from('brand_reviews').insert({
      brand_name, reviewer_role, payment_timing,
      brief_quality, approval_speed, would_work_again,
      comment: comment || null,
    });

    await resend.emails.send({
      from: FROM, to: 'hello@fewfound.co',
      subject: `New brand review  -  ${brand_name}`,
      html: `<h2>New Brand Review</h2>
<p><strong>Brand:</strong> ${brand_name}</p>
<p><strong>Reviewer role:</strong> ${reviewer_role}</p>
<p><strong>Payment timing:</strong> ${payment_timing}</p>
<p><strong>Brief quality:</strong> ${brief_quality}</p>
<p><strong>Approval speed:</strong> ${approval_speed}</p>
<p><strong>Would work again:</strong> ${would_work_again}</p>
<p><strong>Comment:</strong> ${comment || 'None'}</p>`,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}
