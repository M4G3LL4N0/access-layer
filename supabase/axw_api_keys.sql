create table api_keys (
id uuid primary key default gen_random_uuid(),
name text not null,
key_prefix text not null,
key_hash text not null,
active boolean default true,
created_at timestamptz default now()
);
