import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';

export async function GET(req: NextRequest, { params }: { params: { table: string } }) {
  const table = params.table;
  const allowed = ['providers', 'applications', 'memberships', 'reviews'];

  if (!allowed.includes(table)) {
    return NextResponse.json({ message: 'Not found.' }, { status: 404 });
  }

  const supabase = serviceClient();
  const tableMap: Record<string, string> = {
    providers: 'providers',
    applications: 'verification_applications',
    memberships: 'brand_members',
    reviews: 'brand_reviews',
  };

  const { data, error } = await supabase
    .from(tableMap[table])
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json({ data });
}
