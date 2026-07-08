# Fluent

Get fluent in the latest AI — inside your degree. Fluent gives UK students short, 25-minute practice builds matched to the university modules they actually take, and keeps them current with a daily feed of the latest AI advances mapped to what each module teaches. Instead of watching generic tutorials, you practise the newest AI techniques on your own module's material — a PSYC2017 literature search, a LAW2041 judgment, a HIST2260 primary source — and build a personal log of what you can now do.

## Quickstart (demo mode)

No accounts, no env vars — data lives in your browser's localStorage.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The pilot catalogue — 25 UK universities, 9 courses, ~185 modules, 11 builds — is bundled. In demo mode, sign-up is never gated: pick a university, course, and module(s) straight away.

### Demo mode vs signed-in mode

The app runs in two modes and switches between them automatically:

- **Demo mode** (no env vars, or signed out): everything — profile, module picks, capability snapshots, the build log — lives in this browser's localStorage. This is how the deployed site runs with zero configuration.
- **Signed-in mode** (Supabase configured + session): localStorage stays the fast optimistic layer the UI reads from, and `src/lib/data-bridge.ts` mirrors every write to Supabase and hydrates from it on sign-in. The first time you sign in, any local data Supabase doesn't have yet is pushed up once; when both sides have data, Supabase wins. Supabase failures never block the local flow.

## Supabase setup (accounts + persistence)

1. Create a free project at [supabase.com](https://supabase.com).
2. Run the schema in order: open the SQL editor and paste `supabase/migrations/0001_init.sql`, then `supabase/migrations/0002_courses_and_email_domains.sql` — or, with the [Supabase CLI](https://supabase.com/docs/guides/cli) linked to your project, `supabase db push`.
3. Seed the catalogue: run `supabase/seed.sql` the same way (SQL editor is easiest). It is idempotent — safe to re-run after edits — and includes all 25 universities with their student email domains, ~185 modules, 11 builds, and 8 demo AI advances with module matches, so "Latest in your field" has content before the first cron run.
4. Copy `.env.local.example` to `.env.local` and paste your project URL + anon key (Project Settings → API).
5. Restart the dev server. Sign-up/sign-in now work; without the env vars the same pages show a friendly demo-mode notice instead.

### Registration flow (Supabase-configured mode)

Once Supabase is configured, picking a university and course on the landing widget leads to a sign-up gate instead of straight to the module picker:

1. **University** → **course** (the discipline you're studying) — picked from the same 25-university, 9-course catalogue as demo mode.
2. **Sign up with your university email.** `/auth/sign-up?university=<slug>&discipline=<discipline>` carries the two choices along; the form validates the email suffix live against that university's real student domain(s) (e.g. `@bristol.ac.uk`) before it lets you submit. The `handle_new_user()` trigger repeats the same check server-side as a backstop and rejects the signup if the email doesn't match.
3. **Finish setup on `/dashboard`.** After your first sign-in, if your profile has a university + course but no module yet, a "finish setup" prompt (module → hours → optional capability snapshot) appears in place of the weekly plan.
4. **`/explore`** works signed out, in both modes: browse all 9 courses and their builds, each showing example modules it maps to, without registering.

### Auth flow

- `/auth/sign-up` — university + course picker (if not already chosen), then email + password; Supabase sends a confirmation link.
- `/auth/callback` — the confirmation link lands here; it exchanges the code for a session cookie and redirects to `/dashboard`.
- `/auth/sign-in` — password sign-in, no university/course context needed.
- `/auth/sign-out` — POST; clears the session and redirects home.
- `middleware.ts` refreshes the session cookie on every request (and passes straight through when Supabase isn't configured).
- A database trigger auto-creates a `profiles` row for every new auth user, setting `university_id` and `discipline` from sign-up metadata and rejecting the insert if the email doesn't match the university's domain(s).

First shippable slice: sign up with a `@bristol.ac.uk` email → pick Economics → pick a module → complete one 25-minute build → see it in your log.

## Daily pipeline (arXiv → match → digest)

Three route handlers under `/api/cron/*`, each requiring `Authorization: Bearer $CRON_SECRET`:

| Route | What it does |
| --- | --- |
| `POST /api/cron/ingest-arxiv` | Fetches the last ~2 days of cs.AI, cs.CL, cs.LG, cs.HC, stat.ML from the official arXiv Atom API, extracts keywords, upserts into `ai_advances`. |
| `POST /api/cron/match-advances` | Scores the last 7 days of advances against `module_topics` by keyword overlap, upserts `advance_module_matches` with a rationale. |
| `POST /api/cron/weekly-digest` | Per user: top 3 matches for their modules + a suggested micro-build, upserted into `weekly_digests`. |

Scheduling is a GitHub Actions workflow (`.github/workflows/cron.yml`): ingest + match daily at 06:00 UTC, digest Mondays at 07:00 UTC, plus a manual `workflow_dispatch` trigger. Set two repository secrets:

- `APP_URL` — your deployed base URL, no trailing slash.
- `CRON_SECRET` — same value as the `CRON_SECRET` env var on your host.

To test locally:

```bash
curl -X POST http://localhost:3000/api/cron/ingest-arxiv -H "Authorization: Bearer $CRON_SECRET"
```

## Architecture

- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- Frontend runs in two modes: demo (localStorage store in `src/lib/store.ts`) or Supabase (data access in `src/lib/supabase/data.ts`, bridged by `src/lib/data-bridge.ts`). `isSupabaseConfigured()` in `src/lib/supabase/config.ts` is the single switch — with no env vars every Supabase module no-ops gracefully.
- Postgres schema (`supabase/migrations/0001_init.sql` + `0002_courses_and_email_domains.sql`), all tables RLS-enabled:
  - Catalogue: `universities` (with `student_email_domains text[]`) → `modules` → `module_topics`, plus `micro_builds`. Public read; written only by the service role (manual seeding).
  - Per-user: `profiles` (auto-created on signup, with `university_id` and `discipline` set from sign-up metadata), `user_modules`, `user_build_completions`, `capability_snapshots`, `weekly_digests`. Owner-only via `auth.uid()`.
  - Pipeline: `ai_advances` → `advance_module_matches` (→ `weekly_digests`). Public read; written by the cron routes with the service-role key.
- The loop: **ingest** (arXiv API → `ai_advances`) → **match** (keyword overlap against `module_topics` → `advance_module_matches`) → **digest** (per-user weekly summary + suggested build → `weekly_digests`).
- "Course" is modelled as the existing `discipline` vocabulary (now 9: psychology, law, history, business, nursing, computer-science, economics, maths, medicine) — not a separate database table.

## Roadmap

- Syllabus paste: students paste their own syllabus to generate `module_topics` (`source = 'syllabus'`) for long-tail modules.
- Deeper per-university catalogues — currently one representative module per course a university offers; `supabase/seed.sql` documents the copy-paste pattern for adding more. Explicitly **no scraping**, ever; the only external fetch is the official arXiv API.
- Smarter matching: swap keyword overlap for pgvector embeddings (upgrade path documented in `src/app/api/cron/match-advances/route.ts`).
