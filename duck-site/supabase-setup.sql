-- supabase-setup.sql
-- Run this once in your Supabase project's SQL Editor (left sidebar -> SQL Editor -> New query).
-- It creates the sightings table and opens up the access this app needs.

create table if not exists sightings (
  id uuid primary key default gen_random_uuid(),
  duck_id text not null,
  lat double precision not null,
  lon double precision not null,
  place_name text default '',
  finder_name text default 'A fellow cruiser',
  note text default '',
  photo_url text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: this app has no login system, so every visitor
-- shares one open read/write policy. That's fine for a fun, low-stakes
-- duck game on a private cruise, but don't reuse this pattern for
-- anything sensitive.
alter table sightings enable row level security;

create policy "Anyone can read sightings"
  on sightings for select
  using (true);

create policy "Anyone can insert sightings"
  on sightings for insert
  with check (true);

-- Storage bucket for photos.
-- After running the SQL above, go to Storage in the left sidebar and:
-- 1. Click "New bucket"
-- 2. Name it exactly: duck-photos
-- 3. Toggle "Public bucket" ON (so photo URLs work without auth)
-- 4. Create the bucket
--
-- Then run this to allow uploads to it:
insert into storage.buckets (id, name, public)
values ('duck-photos', 'duck-photos', true)
on conflict (id) do nothing;

create policy "Anyone can upload duck photos"
  on storage.objects for insert
  with check (bucket_id = 'duck-photos');

create policy "Anyone can view duck photos"
  on storage.objects for select
  using (bucket_id = 'duck-photos');
