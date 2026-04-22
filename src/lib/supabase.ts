import { createClient } from '@supabase/supabase-js';

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

export function serviceClient() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

export type ProviderType = 'agency' | 'creator' | 'professional';

export interface Provider {
  id: string;
  name: string;
  type: ProviderType;
  city: string;
  city_slug: string;
  category: string;
  category_slug: string;
  services: string[];
  website: string | null;
  email: string | null;
  client1: string | null;
  client2: string | null;
  founding_year: number | null;
  team_size: string | null;
  bio: string | null;
  slug: string;
  verified: boolean;
  verification_date: string | null;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  industry: string;
  budget_range: string | null;
  payment_terms: string | null;
  website: string | null;
  email: string | null;
  slug: string;
  verified: boolean;
  bio: string | null;
  created_at: string;
}

// HARDCODED ORDER: verified first, then by date. Never changes.
export async function getProviders(opts: {
  type?: ProviderType;
  citySlug?: string;
  categorySlug?: string;
  verifiedOnly?: boolean;
  query?: string;
  limit?: number;
  offset?: number;
}) {
  let q = supabase
    .from('providers')
    .select('*')
    .order('verified', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(opts.limit ?? 24);

  if (opts.type)         q = q.eq('type', opts.type);
  if (opts.citySlug)     q = q.eq('city_slug', opts.citySlug);
  if (opts.categorySlug) q = q.eq('category_slug', opts.categorySlug);
  if (opts.verifiedOnly) q = q.eq('verified', true);
  if (opts.query)        q = q.ilike('name', `%${opts.query}%`);
  if (opts.offset)       q = q.range(opts.offset, opts.offset + (opts.limit ?? 24) - 1);

  return q;
}

export async function getProviderBySlug(slug: string) {
  return supabase.from('providers').select('*').eq('slug', slug).single();
}

export async function getBrandBySlug(slug: string) {
  return supabase.from('brands').select('*').eq('slug', slug).single();
}

export async function getStats() {
  const [t, v, b] = await Promise.all([
    supabase.from('providers').select('id', { count: 'exact', head: true }),
    supabase.from('providers').select('id', { count: 'exact', head: true }).eq('verified', true),
    supabase.from('brands').select('id', { count: 'exact', head: true }),
  ]);
  return { total: t.count ?? 0, verified: v.count ?? 0, brands: b.count ?? 0 };
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g,'').replace(/\s+/g,'-').replace(/-+/g,'-').trim();
}
