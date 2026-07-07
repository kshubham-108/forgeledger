/*
  Types for the Supabase layer.

  Two flavours:
    * *Row types — snake_case, mirroring supabase/migrations/0001_init.sql.
      Used at the query boundary (data.ts, cron routes).
    * App-facing camelCase types — what data.ts returns to the UI.

  Deliberately NOT imported from src/lib/types.ts (the demo-mode types are
  being rewritten in parallel). When the schema grows, swap the hand-written
  row types for generated ones: `supabase gen types typescript`.
*/

// ---------------------------------------------------------------------------
// Shared vocabulary
// ---------------------------------------------------------------------------

/** The four capability areas rated 1–5 in a snapshot. */
export type CapabilityArea =
  | "prompt_craft"
  | "evaluation"
  | "workflow_design"
  | "ethics_citation";

export type CapabilityRatings = Partial<Record<CapabilityArea, number>>;

export type AdvanceSource = "arxiv" | "vendor" | "release";

// ---------------------------------------------------------------------------
// Row types (snake_case, as returned by PostgREST)
// ---------------------------------------------------------------------------

export type ProfileRow = {
  id: string;
  display_name: string | null;
  university_id: string | null;
  hours_per_week: number | null;
  created_at: string;
};

export type UniversityRow = {
  id: string;
  slug: string;
  name: string;
  city: string;
  created_at: string;
};

export type ModuleRow = {
  id: string;
  university_id: string;
  code: string;
  title: string;
  discipline: string;
  year_of_study: number | null;
  created_at: string;
};

export type ModuleTopicRow = {
  id: string;
  module_id: string;
  topic: string;
  source: "seed" | "syllabus";
  created_at: string;
};

export type MicroBuildRow = {
  id: string;
  slug: string;
  title: string;
  discipline: string;
  minutes: number;
  competencies: string[];
  summary: string;
  steps: unknown;
  integrity: unknown;
  module_codes: string[];
  created_at: string;
};

export type UserModuleRow = {
  id: string;
  user_id: string;
  module_id: string;
  created_at: string;
};

export type CompletionRow = {
  id: string;
  user_id: string;
  build_slug: string;
  completed_at: string;
  minutes_spent: number;
  confidence: number | null;
  note: string | null;
  artifact_url: string | null;
  created_at: string;
};

export type CapabilitySnapshotRow = {
  id: string;
  user_id: string;
  taken_at: string;
  ratings: CapabilityRatings;
};

export type AdvanceRow = {
  id: string;
  source: AdvanceSource;
  external_id: string;
  title: string;
  url: string;
  published_at: string;
  summary: string;
  categories: string[];
  keywords: string[];
  created_at: string;
};

export type AdvanceModuleMatchRow = {
  id: string;
  advance_id: string;
  module_id: string;
  score: number;
  rationale: string | null;
  created_at: string;
};

export type WeeklyDigestRow = {
  id: string;
  user_id: string;
  week_start: string;
  payload: unknown;
  created_at: string;
};

// ---------------------------------------------------------------------------
// App-facing types (camelCase — what data.ts returns)
// ---------------------------------------------------------------------------

export type Profile = {
  id: string;
  displayName: string | null;
  universityId: string | null;
  hoursPerWeek: number | null;
  createdAt: string;
};

export type University = {
  id: string;
  slug: string;
  name: string;
  city: string;
};

export type Module = {
  id: string;
  universityId: string;
  code: string;
  title: string;
  discipline: string;
  yearOfStudy: number | null;
};

export type Completion = {
  id: string;
  buildSlug: string;
  completedAt: string;
  minutesSpent: number;
  confidence: number | null;
  note: string | null;
  artifactUrl: string | null;
};

export type CapabilitySnapshot = {
  id: string;
  takenAt: string;
  ratings: CapabilityRatings;
};

export type Advance = {
  id: string;
  source: AdvanceSource;
  externalId: string;
  title: string;
  url: string;
  publishedAt: string;
  summary: string;
  categories: string[];
  keywords: string[];
};

/** An advance joined to the user's modules, deduplicated per advance. */
export type MatchedAdvance = {
  advance: Advance;
  /** Best match score across the user's modules, 0–1. */
  score: number;
  /** Rationale for the best-scoring match. */
  rationale: string | null;
  /** Ids of the user's modules this advance matched. */
  moduleIds: string[];
};
