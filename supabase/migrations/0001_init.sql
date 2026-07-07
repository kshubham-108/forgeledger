-- ForgeLedger MVP 0 schema
-- Matches src/lib/types.ts; demo localStorage store swaps for these tables.

create extension if not exists vector;

create table universities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  city text not null
);

create table modules (
  id uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities(id),
  code text not null,
  title text not null,
  discipline text not null,
  study_year int,
  unique (university_id, code)
);

create table module_topics (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references modules(id) on delete cascade,
  topic text not null,
  keywords text[] not null default '{}',
  embedding vector(1536)
);

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  university_id uuid references universities(id),
  discipline text,
  study_year int check (study_year between 1 and 5),
  hours_per_week int not null default 3,
  onboarding_complete boolean not null default false,
  created_at timestamptz not null default now()
);

create table user_modules (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  module_id uuid not null references modules(id),
  term_start date,
  term_end date,
  syllabus_text text,
  unique (user_id, module_id)
);

create table micro_builds (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  discipline text not null,
  module_codes text[] not null default '{}',
  est_minutes int not null default 25,
  competency_tags text[] not null default '{}',
  free_tools jsonb not null default '[]',
  summary text not null,
  steps jsonb not null default '[]',
  ethics_note text not null,
  artifact_prompt text not null
);

create table user_build_completions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  micro_build_id uuid not null references micro_builds(id),
  module_code text not null,
  serial text not null,
  artifact_path text,
  artifact_text text,
  self_score int check (self_score between 1 and 5),
  time_spent_min int,
  completed_at timestamptz not null default now(),
  unique (user_id, serial)
);

create table capability_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  dimension text not null,
  score float not null,
  taken_at timestamptz not null default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table user_modules enable row level security;
alter table user_build_completions enable row level security;
alter table capability_snapshots enable row level security;
alter table universities enable row level security;
alter table modules enable row level security;
alter table module_topics enable row level security;
alter table micro_builds enable row level security;

create policy "own profile" on profiles
  for all using (auth.uid() = id);

create policy "own modules" on user_modules
  for all using (auth.uid() = user_id);

create policy "own completions" on user_build_completions
  for all using (auth.uid() = user_id);

create policy "own snapshots" on capability_snapshots
  for all using (auth.uid() = user_id);

-- Catalogue tables are public read
create policy "public read universities" on universities for select using (true);
create policy "public read modules" on modules for select using (true);
create policy "public read topics" on module_topics for select using (true);
create policy "public read builds" on micro_builds for select using (true);
