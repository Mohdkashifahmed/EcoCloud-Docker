-- EcoCloud database schema. Run in Supabase SQL Editor as project owner.
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'user' check (role in ('user','admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(trim(name)) between 1 and 60),
  category text not null default 'Other',
  wattage numeric(10,2) not null check (wattage > 0 and wattage <= 50000),
  hours_per_day numeric(4,2) not null check (hours_per_day >= 0 and hours_per_day <= 24),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.energy_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid references public.devices(id) on delete set null,
  energy_kwh numeric(12,4) not null check (energy_kwh >= 0),
  recorded_at timestamptz not null default now(),
  source text not null default 'manual' check (source in ('manual','iot','import'))
);

create table if not exists public.electricity_rates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  rate_per_kwh numeric(10,4) not null check (rate_per_kwh >= 0),
  currency char(3) not null default 'INR',
  effective_from date not null default current_date,
  created_at timestamptz not null default now(),
  unique(user_id, effective_from)
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  device_id uuid references public.devices(id) on delete cascade,
  title text not null,
  description text not null,
  category text not null default 'efficiency',
  is_dismissed boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists devices_user_id_idx on public.devices(user_id);
create index if not exists readings_user_recorded_idx on public.energy_readings(user_id, recorded_at desc);
create index if not exists readings_device_id_idx on public.energy_readings(device_id);
create index if not exists rates_user_effective_idx on public.electricity_rates(user_id, effective_from desc);
create index if not exists recommendations_user_idx on public.recommendations(user_id, is_dismissed);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles(id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;
drop trigger if exists devices_updated_at on public.devices;
create trigger devices_updated_at before update on public.devices
for each row execute procedure public.set_updated_at();
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.energy_readings enable row level security;
alter table public.electricity_rates enable row level security;
alter table public.recommendations enable row level security;

-- Users can read/update their own profile, but cannot promote themselves to admin.
drop policy if exists "profile read own" on public.profiles;
create policy "profile read own" on public.profiles for select using (auth.uid() = id);
drop policy if exists "profile update own" on public.profiles;
create policy "profile update own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id and role = 'user');

drop policy if exists "devices own access" on public.devices;
create policy "devices own access" on public.devices for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "readings own access" on public.energy_readings;
create policy "readings own access" on public.energy_readings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "rates own access" on public.electricity_rates;
create policy "rates own access" on public.electricity_rates for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "recommendations own access" on public.recommendations;
create policy "recommendations own access" on public.recommendations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Optional Storage setup: create a private bucket named "energy-exports" in the dashboard.
-- Example object policies (apply after creating the bucket):
-- create policy "users manage own exports" on storage.objects for all
-- using (bucket_id='energy-exports' and (storage.foldername(name))[1]=auth.uid()::text)
-- with check (bucket_id='energy-exports' and (storage.foldername(name))[1]=auth.uid()::text);
