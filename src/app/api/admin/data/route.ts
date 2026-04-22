import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';

const ALLOWED_TABLES = [
  'providers',
  'brands',
  'verification_applications',
  'brand_reviews',
  'brand_membership_interest',
];

export async function GET(req: NextRequest) {
  // Simple cookie check
  const cookie = req.cookies.get('admin_authed');
  if (!cookie || cookie.value !== 'true') {
    return NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
  }

  const table = req.nextUrl.searchParams.get('table');
  if (!table || !ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ message: 'Invalid table.' }, { status: 400 });
  }

  const { data, error } = await serviceClient()
    .from(table)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
