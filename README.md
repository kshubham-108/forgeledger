# ForgeLedger

A verified ledger of AI micro-builds mapped to real UK university modules. Students complete short, discipline-specific builds (25–40 min) that train them to use and verify AI within their field — every completion is stamped into a persistent ledger.

## MVP 0 (this build)

- Landing page with live ledger fragment
- Onboarding: pick university + modules (pilot catalogue: Manchester + Leeds, 10 modules, 6 disciplines)
- Weekly plan: micro-builds matched to your modules
- Micro-build flow: steps, integrity note, artifact submission
- Build Ledger: stamped entries with serials, module codes, competency tags

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
  components/     ledger-row (signature element), wizard, forms
  lib/            types, seed catalogue, versioned local store
supabase/
  migrations/     0001_init.sql — full schema with RLS
  seed.sql        pilot university + module catalogue
```

## Next (MVP 1)

- Supabase auth + swap local store for Postgres
- Daily arXiv ingest → classify → match pipeline (Edge Functions)
- Weekly radar digest matched to enrolled modules
