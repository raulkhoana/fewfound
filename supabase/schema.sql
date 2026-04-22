-- FEW FOUND — Complete Supabase Schema
-- Run in: supabase.com → your project → SQL Editor → New query → paste → Run

create extension if not exists "uuid-ossp";

-- ── PROVIDERS (agencies, creators, professionals) ──────────────
create table if not exists providers (
  id                uuid default uuid_generate_v4() primary key,
  name              text not null,
  type              text not null check (type in ('agency','creator','professional')),
  city              text default '',
  city_slug         text default '',
  category          text default '',
  category_slug     text default '',
  services          text[] default '{}',
  website           text,
  email             text,
  client1           text,
  client2           text,
  founding_year     int,
  team_size         text,
  bio               text,
  slug              text not null unique,
  verified          boolean default false not null,
  verification_date timestamptz,
  created_at        timestamptz default now() not null
);

create index if not exists idx_providers_type      on providers(type);
create index if not exists idx_providers_city_slug on providers(city_slug);
create index if not exists idx_providers_cat_slug  on providers(category_slug);
create index if not exists idx_providers_verified  on providers(verified);
create index if not exists idx_providers_slug      on providers(slug);

alter table providers enable row level security;
create policy "Public read providers"        on providers for select using (true);
create policy "Service role all providers"   on providers for all    using (auth.role() = 'service_role');

-- ── BRANDS ─────────────────────────────────────────────────────
create table if not exists brands (
  id            uuid default uuid_generate_v4() primary key,
  name          text not null,
  industry      text default '',
  budget_range  text,
  payment_terms text,
  website       text,
  email         text,
  slug          text not null unique,
  verified      boolean default false not null,
  bio           text,
  created_at    timestamptz default now() not null
);

create index if not exists idx_brands_slug     on brands(slug);
create index if not exists idx_brands_verified on brands(verified);

alter table brands enable row level security;
create policy "Public read brands"       on brands for select using (true);
create policy "Service role all brands"  on brands for all    using (auth.role() = 'service_role');

-- ── VERIFICATION APPLICATIONS ──────────────────────────────────
create table if not exists verification_applications (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  type        text not null,
  email       text not null,
  website     text,
  profile_url text,
  ref1_name   text,
  ref1_email  text,
  ref2_name   text,
  ref2_email  text,
  notes       text,
  status      text default 'pending' check (status in ('pending','in_review','passed','failed','refunded')),
  created_at  timestamptz default now() not null
);

create index if not exists idx_verify_status on verification_applications(status);

alter table verification_applications enable row level security;
create policy "Service role all verification_applications"
  on verification_applications for all using (auth.role() = 'service_role');

-- ── BRAND MEMBERSHIP INTEREST ──────────────────────────────────
create table if not exists brand_membership_interest (
  id           uuid default uuid_generate_v4() primary key,
  plan         text not null,
  brand_name   text not null,
  contact_name text not null,
  email        text not null,
  website      text,
  notes        text,
  status       text default 'new' check (status in ('new','contacted','converted','closed')),
  created_at   timestamptz default now() not null
);

alter table brand_membership_interest enable row level security;
create policy "Service role all brand_membership_interest"
  on brand_membership_interest for all using (auth.role() = 'service_role');

-- ── BRAND REVIEWS (anonymous) ──────────────────────────────────
create table if not exists brand_reviews (
  id               uuid default uuid_generate_v4() primary key,
  brand_name       text not null,
  reviewer_role    text not null,
  payment_timing   text,
  brief_quality    text,
  approval_speed   text,
  would_work_again text,
  comment          text,
  created_at       timestamptz default now() not null
);

create index if not exists idx_reviews_brand on brand_reviews(brand_name);

alter table brand_reviews enable row level security;
create policy "Public insert reviews"     on brand_reviews for insert with check (true);
create policy "Service role read reviews" on brand_reviews for select using (auth.role() = 'service_role');

-- ── BRAND MEMBERS (future payments) ───────────────────────────
create table if not exists brand_members (
  id               uuid default uuid_generate_v4() primary key,
  brand_name       text not null,
  email            text not null,
  plan             text default 'connect',
  payment_status   text default 'pending',
  membership_start timestamptz,
  membership_end   timestamptz,
  created_at       timestamptz default now() not null
);

alter table brand_members enable row level security;
create policy "Service role all brand_members"
  on brand_members for all using (auth.role() = 'service_role');

-- verify: select table_name from information_schema.tables where table_schema = 'public';
