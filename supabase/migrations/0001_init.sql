-- ============================================================================
-- Fluent — initial schema
-- ============================================================================
-- Fluent helps students get fluent in the latest AI inside their degree:
-- short practice builds matched to the university modules they actually take,
-- kept current by a daily feed of AI advances.
--
-- Data model in one line:
--   catalogue (universities → modules → module_topics, micro_builds)
--   + per-user data (profiles, user_modules, user_build_completions,
--     capability_snapshots, weekly_digests)
--   + pipeline data (ai_advances → advance_module_matches → weekly_digests)
--
-- RLS approach:
--   * Catalogue + pipeline tables: readable by everyone (anon + authenticated),
--     written ONLY by the service role (cron routes / manual seeding). The
--     service role bypasses RLS, so no write policies are declared for them.
--   * User-owned tables: owner-only select/insert/update/delete via auth.uid().
-- ============================================================================


-- ----------------------------------------------------------------------------
-- Catalogue: universities
-- Expansion path is manual seeding (see supabase/seed.sql) — no scraping.
-- ----------------------------------------------------------------------------
create table universities (
  id         uuid primary key default gen_random_uuid(),
  slug       text unique not null,          -- e.g. 'manchester'
  name       text not null,                 -- e.g. 'University of Manchester'
  city       text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Catalogue: modules a university teaches
-- ----------------------------------------------------------------------------
create table modules (
  id            uuid primary key default gen_random_uuid(),
  university_id uuid not null references universities(id) on delete cascade,
  code          text not null,              -- e.g. 'PSYC2017'
  title         text not null,              -- e.g. 'Research Methods and Statistics'
  discipline    text not null,              -- e.g. 'psychology'
  year_of_study int,                        -- 1–5; year the module is usually taken
  created_at    timestamptz not null default now(),
  unique (university_id, code)              -- also serves as the university_id index
);

-- ----------------------------------------------------------------------------
-- Catalogue: topics taught in a module.
-- The match pipeline scores AI advances against these terms. 'seed' topics are
-- hand-curated; 'syllabus' topics will come from user-pasted syllabi later.
-- ----------------------------------------------------------------------------
create table module_topics (
  id         uuid primary key default gen_random_uuid(),
  module_id  uuid not null references modules(id) on delete cascade,
  topic      text not null,                 -- short phrase, e.g. 'systematic review'
  source     text not null default 'seed' check (source in ('seed', 'syllabus')),
  created_at timestamptz not null default now()
);

create index module_topics_module_id_idx on module_topics (module_id);

-- ----------------------------------------------------------------------------
-- Catalogue: micro-builds — 25-minute practice sessions.
-- module_codes is a denormalised list of module codes the build fits
-- (e.g. {'PSYC2017','PSYC2520'}); fine for MVP, revisit if codes collide
-- across universities.
-- ----------------------------------------------------------------------------
create table micro_builds (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,        -- e.g. 'psych-literature-pipeline'
  title        text not null,
  discipline   text not null,
  minutes      int not null default 25 check (minutes > 0),
  competencies text[] not null default '{}',  -- e.g. {'prompt-craft','evaluation'}
  summary      text not null default '',
  steps        jsonb not null default '[]',   -- ordered array of step strings
  integrity    jsonb not null default '{}',   -- ground rules: {trains, not_for, verification_step}
  module_codes text[] not null default '{}',  -- denormalised match list
  created_at   timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- User: profile, one row per auth user (auto-created by trigger below)
-- ----------------------------------------------------------------------------
create table profiles (
  id             uuid primary key references auth.users(id) on delete cascade,
  display_name   text,
  university_id  uuid references universities(id) on delete set null,
  hours_per_week int check (hours_per_week between 1 and 40),
  created_at     timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- User: modules the user picked during onboarding
-- ----------------------------------------------------------------------------
create table user_modules (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  module_id  uuid not null references modules(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, module_id)               -- also serves as the user_id index
);

create index user_modules_module_id_idx on user_modules (module_id);

-- ----------------------------------------------------------------------------
-- User: log of finished builds.
-- build_slug is text (not a FK) so the log survives catalogue re-seeds — fine
-- for MVP while build content still lives in code.
-- ----------------------------------------------------------------------------
create table user_build_completions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  build_slug    text not null,
  completed_at  timestamptz not null default now(),
  minutes_spent int not null default 25 check (minutes_spent > 0),
  confidence    smallint check (confidence between 1 and 5),
  note          text,                       -- what they made / took away
  artifact_url  text,                       -- optional link to the thing they built
  created_at    timestamptz not null default now()
);

create index user_build_completions_user_id_completed_at_idx
  on user_build_completions (user_id, completed_at desc);

-- ----------------------------------------------------------------------------
-- User: capability snapshots — periodic 1–5 self-ratings across the four
-- competency areas, so students can see their fluency move over time.
-- ratings shape: {"prompt_craft": 3, "evaluation": 2,
--                 "workflow_design": 4, "ethics_citation": 3}
-- ----------------------------------------------------------------------------
create table capability_snapshots (
  id       uuid primary key default gen_random_uuid(),
  user_id  uuid not null references profiles(id) on delete cascade,
  taken_at timestamptz not null default now(),
  ratings  jsonb not null default '{}'
);

create index capability_snapshots_user_id_taken_at_idx
  on capability_snapshots (user_id, taken_at desc);

-- ----------------------------------------------------------------------------
-- Pipeline: AI advances ingested daily (arXiv API only for MVP; 'vendor' and
-- 'release' reserved for hand-added items). external_id dedupes re-ingests,
-- e.g. 'arxiv:2506.01234'.
-- ----------------------------------------------------------------------------
create table ai_advances (
  id           uuid primary key default gen_random_uuid(),
  source       text not null check (source in ('arxiv', 'vendor', 'release')),
  external_id  text unique not null,
  title        text not null,
  url          text not null,
  published_at timestamptz not null,
  summary      text not null default '',
  categories   text[] not null default '{}', -- e.g. {'cs.AI','cs.CL'}
  keywords     text[] not null default '{}', -- heuristic terms used for matching
  created_at   timestamptz not null default now()
);

create index ai_advances_published_at_idx on ai_advances (published_at desc);
create index ai_advances_created_at_idx on ai_advances (created_at desc);

-- ----------------------------------------------------------------------------
-- Pipeline: advance ↔ module matches produced by the match job.
-- score = keyword/topic overlap in [0,1]; rationale is a one-line explanation.
-- Upgrade path: replace keyword overlap with pgvector embeddings (see
-- src/app/api/cron/match-advances/route.ts).
-- ----------------------------------------------------------------------------
create table advance_module_matches (
  id         uuid primary key default gen_random_uuid(),
  advance_id uuid not null references ai_advances(id) on delete cascade,
  module_id  uuid not null references modules(id) on delete cascade,
  score      real not null,
  rationale  text,
  created_at timestamptz not null default now(),
  unique (advance_id, module_id)            -- also serves as the advance_id index
);

create index advance_module_matches_module_id_idx on advance_module_matches (module_id);

-- ----------------------------------------------------------------------------
-- Pipeline → user: weekly digest per user. payload holds the rendered
-- content: top advances for their modules + a suggested micro-build.
-- ----------------------------------------------------------------------------
create table weekly_digests (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references profiles(id) on delete cascade,
  week_start date not null,                 -- Monday (UTC) of the digest week
  payload    jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique (user_id, week_start)              -- also serves as the user_id index
);

-- ============================================================================
-- Auto-create a profile row whenever an auth user signs up.
-- security definer + empty search_path is the standard Supabase pattern for
-- triggers on auth.users.
-- ============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(new.email, '@', 1)
    )
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================================
-- Row Level Security
-- ============================================================================
alter table universities            enable row level security;
alter table modules                 enable row level security;
alter table module_topics           enable row level security;
alter table micro_builds            enable row level security;
alter table profiles                enable row level security;
alter table user_modules            enable row level security;
alter table user_build_completions  enable row level security;
alter table capability_snapshots    enable row level security;
alter table ai_advances             enable row level security;
alter table advance_module_matches  enable row level security;
alter table weekly_digests          enable row level security;

-- ----------------------------------------------------------------------------
-- Catalogue + pipeline tables: public read, service-role-only writes.
-- (No insert/update/delete policies declared — the service role bypasses RLS.)
-- ----------------------------------------------------------------------------
create policy "catalogue read: universities" on universities
  for select to anon, authenticated using (true);

create policy "catalogue read: modules" on modules
  for select to anon, authenticated using (true);

create policy "catalogue read: module_topics" on module_topics
  for select to anon, authenticated using (true);

create policy "catalogue read: micro_builds" on micro_builds
  for select to anon, authenticated using (true);

create policy "catalogue read: ai_advances" on ai_advances
  for select to anon, authenticated using (true);

create policy "catalogue read: advance_module_matches" on advance_module_matches
  for select to anon, authenticated using (true);

-- ----------------------------------------------------------------------------
-- User tables: owner-only, per command.
-- (select auth.uid()) instead of auth.uid() lets Postgres cache the value
-- per statement instead of re-evaluating per row.
-- ----------------------------------------------------------------------------

-- profiles (PK doubles as the owner column)
create policy "profiles select own" on profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles insert own" on profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "profiles update own" on profiles
  for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "profiles delete own" on profiles
  for delete to authenticated using ((select auth.uid()) = id);

-- user_modules
create policy "user_modules select own" on user_modules
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "user_modules insert own" on user_modules
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "user_modules update own" on user_modules
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "user_modules delete own" on user_modules
  for delete to authenticated using ((select auth.uid()) = user_id);

-- user_build_completions
create policy "completions select own" on user_build_completions
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "completions insert own" on user_build_completions
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "completions update own" on user_build_completions
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "completions delete own" on user_build_completions
  for delete to authenticated using ((select auth.uid()) = user_id);

-- capability_snapshots
create policy "snapshots select own" on capability_snapshots
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "snapshots insert own" on capability_snapshots
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "snapshots update own" on capability_snapshots
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "snapshots delete own" on capability_snapshots
  for delete to authenticated using ((select auth.uid()) = user_id);

-- weekly_digests (rows are written by the service-role digest job; users can
-- read and clear their own)
create policy "digests select own" on weekly_digests
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "digests insert own" on weekly_digests
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "digests update own" on weekly_digests
  for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "digests delete own" on weekly_digests
  for delete to authenticated using ((select auth.uid()) = user_id);
