import { NextRequest, NextResponse } from 'next/server';
import { serviceClient } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('Authorization')?.replace('Bearer ','');
  if (!auth || auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error:'Unauthorized' }, { status:401 });
  }
  const tab = req.nextUrl.searchParams.get('tab') || 'providers';
  const supabase = serviceClient();
  let data, error;

  if (tab === 'providers') ({ data, error } = await supabase.from('providers').select('id,name,type,city,category,email,verified,created_at').order('created_at',{ascending:false}).limit(100));
  else if (tab === 'verifications') ({ data, error } = await supabase.from('verification_applications').select('*').order('created_at',{ascending:false}).limit(100));
  else if (tab === 'memberships') ({ data, error } = await supabase.from('brand_membership_interests').select('*').order('created_at',{ascending:false}).limit(100));
  else if (tab === 'reviews') ({ data, error } = await supabase.from('brand_reviews').select('*').order('created_at',{ascending:false}).limit(100));
  else data = [];

  if (error) return NextResponse.json({ error: error.message }, { status:500 });
  return NextResponse.json({ data: data || [] });
}
