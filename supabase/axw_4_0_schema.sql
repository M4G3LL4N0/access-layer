create extension if not exists pgcrypto;

create table if not exists venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique,
  city text,
  region text,
  country text,
  status text default 'active',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists spaces (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  name text not null,
  type text,
  floor text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists entrypoints (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  space_id uuid references spaces(id) on delete cascade,
  name text not null,
  type text,
  status text default 'active',
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists devices (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  entrypoint_id uuid references entrypoints(id) on delete set null,
  name text,
  type text,
  status text default 'active',
  last_seen timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists credentials (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  external_user_id text,
  type text default 'guest',
  status text default 'active',
  expires_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists policies (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete cascade,
  name text not null,
  rules jsonb not null default '{}'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists tokens (
  id uuid primary key default gen_random_uuid(),
  credential_id uuid references credentials(id) on delete cascade,
  venue_id uuid references venues(id) on delete cascade,
  token_jti text unique not null,
  scope jsonb not null default '[]'::jsonb,
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  revoked boolean not null default false,
  revoked_at timestamptz,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid references venues(id) on delete set null,
  entrypoint_id uuid references entrypoints(id) on delete set null,
  device_id uuid references devices(id) on delete set null,
  credential_id uuid references credentials(id) on delete set null,
  token_jti text,
  action text not null,
  result text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_spaces_venue_id on spaces(venue_id);
create index if not exists idx_entrypoints_venue_id on entrypoints(venue_id);
create index if not exists idx_entrypoints_space_id on entrypoints(space_id);
create index if not exists idx_devices_venue_id on devices(venue_id);
create index if not exists idx_devices_entrypoint_id on devices(entrypoint_id);
create index if not exists idx_credentials_venue_id on credentials(venue_id);
create index if not exists idx_tokens_credential_id on tokens(credential_id);
create index if not exists idx_tokens_venue_id on tokens(venue_id);
create index if not exists idx_tokens_token_jti on tokens(token_jti);
create index if not exists idx_events_venue_id on events(venue_id);
create index if not exists idx_events_device_id on events(device_id);
create index if not exists idx_events_created_at on events(created_at desc);

alter table venues enable row level security;
alter table spaces enable row level security;
alter table entrypoints enable row level security;
alter table devices enable row level security;
alter table credentials enable row level security;
alter table policies enable row level security;
alter table tokens enable row level security;
alter table events enable row level security;

drop policy if exists "public_read_venues" on venues;
create policy "public_read_venues" on venues for select using (true);

drop policy if exists "public_read_spaces" on spaces;
create policy "public_read_spaces" on spaces for select using (true);

drop policy if exists "public_read_entrypoints" on entrypoints;
create policy "public_read_entrypoints" on entrypoints for select using (true);

drop policy if exists "public_read_devices" on devices;
create policy "public_read_devices" on devices for select using (true);

drop policy if exists "public_read_credentials" on credentials;
create policy "public_read_credentials" on credentials for select using (true);

drop policy if exists "public_read_policies" on policies;
create policy "public_read_policies" on policies for select using (true);

drop policy if exists "public_read_tokens" on tokens;
create policy "public_read_tokens" on tokens for select using (true);

drop policy if exists "public_read_events" on events;
create policy "public_read_events" on events for select using (true);
