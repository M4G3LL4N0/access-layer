create extension if not exists pgcrypto;

create table if not exists axw_venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  city text,
  region text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists axw_spaces (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references axw_venues(id) on delete cascade,
  name text not null,
  type text not null default 'space',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create index if not exists axw_spaces_venue_id_idx on axw_spaces(venue_id);

create table if not exists axw_access_points (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references axw_venues(id) on delete cascade,
  space_id uuid references axw_spaces(id) on delete set null,
  name text not null,
  kind text not null default 'door',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create index if not exists axw_access_points_venue_id_idx on axw_access_points(venue_id);
create index if not exists axw_access_points_space_id_idx on axw_access_points(space_id);

create table if not exists axw_policies (
  id uuid primary key default gen_random_uuid(),
  venue_id uuid not null references axw_venues(id) on delete cascade,
  subject_type text not null,
  subject_id text not null,
  resource_type text not null,
  resource_id text not null,
  action text not null,
  effect text not null check (effect in ('allow','deny')),
  priority int not null default 100,
  conditions jsonb not null default '{}'::jsonb,
  note text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create index if not exists axw_policies_lookup_idx
  on axw_policies(venue_id, subject_type, subject_id, resource_type, resource_id, action, effect, status, priority);

create table if not exists axw_tokens (
  jti text primary key,
  venue_id uuid not null references axw_venues(id) on delete cascade,
  subject_type text not null,
  subject_id text not null,
  scopes text[] not null default array[]::text[],
  issued_at timestamptz not null default now(),
  expires_at timestamptz,
  status text not null default 'active',
  meta jsonb not null default '{}'::jsonb
);

create index if not exists axw_tokens_venue_id_idx on axw_tokens(venue_id);
create index if not exists axw_tokens_status_idx on axw_tokens(status);

create table if not exists axw_token_denylist (
  jti text primary key,
  venue_id uuid,
  reason text,
  revoked_at timestamptz not null default now(),
  exp timestamptz
);

create index if not exists axw_token_denylist_venue_id_idx on axw_token_denylist(venue_id);

create table if not exists axw_audit_events (
  id uuid primary key default gen_random_uuid(),
  at timestamptz not null default now(),
  venue_id uuid,
  actor_type text,
  actor_id text,
  action text not null,
  resource_type text,
  resource_id text,
  ok boolean not null default true,
  ip text,
  ua text,
  meta jsonb not null default '{}'::jsonb
);

create index if not exists axw_audit_events_venue_id_at_idx on axw_audit_events(venue_id, at desc);
