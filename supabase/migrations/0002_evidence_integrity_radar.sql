-- Evidence provenance, integrity gates, and the radar feed.
-- Matches the MVP 0 additions in src/lib/types.ts and src/lib/seed.ts.

-- Honest provenance tiers for ledger entries. "externally-verified" exists
-- so the product can grow into it, but nothing in MVP assigns it.
create type evidence_status as enum (
  'self-assessed',
  'artifact-attached',
  'externally-verified'
);

alter table user_build_completions
  add column artifact_link text,
  add column evidence_status evidence_status not null default 'self-assessed',
  add column competency_self_ratings jsonb not null default '{}',
  add column integrity_confirmed boolean not null default false;

-- Micro-builds gain the "one killer build" fields and a structural
-- integrity gate (trains / not for / verification step baked into the flow).
alter table micro_builds
  add column competency_scores jsonb not null default '{}',
  add column deliverable text not null default '',
  add column why_not_youtube text not null default '',
  add column integrity_trains text not null default '',
  add column integrity_not_for text not null default '',
  add column integrity_verification_step text not null default '';

-- Radar: advance items mapped to modules and a linked micro-build.
-- MVP seeds these by hand; the daily ingest job writes here in MVP 1.
create table ai_advance_items (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  source_type text not null,
  source text not null,
  published_on date not null,
  discipline text not null,
  summary text not null,
  why_it_matters text not null,
  micro_build_id uuid references micro_builds(id),
  created_at timestamptz not null default now()
);

create table advance_module_links (
  id uuid primary key default gen_random_uuid(),
  advance_id uuid not null references ai_advance_items(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  unique (advance_id, module_id)
);

alter table ai_advance_items enable row level security;
alter table advance_module_links enable row level security;

create policy "public read advances" on ai_advance_items for select using (true);
create policy "public read advance links" on advance_module_links for select using (true);

-- Cohort benchmarks are aggregate-only and gated on density: the app must
-- not surface percentiles for a (discipline, study_year) cell below the
-- user threshold. Enforced at read time via this view.
create table cohort_benchmarks (
  id uuid primary key default gen_random_uuid(),
  discipline text not null,
  study_year int not null,
  user_count int not null default 0,
  builds_per_user float,
  refreshed_at timestamptz not null default now(),
  unique (discipline, study_year)
);

alter table cohort_benchmarks enable row level security;

-- 500 mirrors COHORT_UNLOCK_THRESHOLD in src/lib/seed.ts.
create view cohort_benchmarks_unlocked as
  select * from cohort_benchmarks where user_count >= 500;

create policy "public read unlocked benchmarks" on cohort_benchmarks
  for select using (user_count >= 500);
