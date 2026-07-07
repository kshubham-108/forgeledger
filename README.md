# Stamped

Short AI builds mapped to your real UK university modules. Complete one, submit your artifact, and collect a stamp — serial number, module code, skills proved. Built for undergraduates who use AI but can't yet prove it.

## MVP 0 (this build)

- Landing page with sample stamps and one worked radar → module → build example
- Onboarding: pick university + modules (pilot catalogue: Manchester + Leeds, 10 modules, 6 disciplines)
- Weekly plan: micro-builds matched to your modules, personal-pace stats, and a hand-curated radar feed (cohort comparison stays locked until 500+ users per discipline)
- Micro-build flow: deliverable + "why not YouTube", structural integrity gate (trains / not for / verification step), competency training weights, artifact + per-competency self-assessment + integrity confirmation on submit
- My stamps: entries carry honest evidence status (self-assessed / artifact attached; peer/lecturer verification is a later tier, never claimed early)

Data is stored on-device (versioned localStorage) in demo mode. The Supabase schema in `supabase/` is ready for accounts, real persistence, and the daily AI-advance radar (MVP 1).

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- Supabase (PostgreSQL + pgvector) — migrations in `supabase/migrations/`

## Structure

```
src/
  app/            routes: / , /start , /dashboard , /builds/[slug] , /ledger
  components/     ledger-row (stamp rows), wizard, forms
  lib/            types, seed catalogue, versioned local store
supabase/
  migrations/     0001_init.sql — full schema with RLS
                  0002_evidence_integrity_radar.sql — evidence status, integrity gate, radar tables
  seed.sql        pilot university + module catalogue
```

## Next (MVP 1)

- Supabase auth + swap local store for Postgres
- Daily arXiv ingest → classify → match pipeline (Edge Functions)
- Weekly radar digest matched to enrolled modules
