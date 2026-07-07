import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  Advance,
  AdvanceRow,
  CapabilityRatings,
  CapabilitySnapshot,
  CapabilitySnapshotRow,
  Completion,
  CompletionRow,
  MatchedAdvance,
  Module,
  ModuleRow,
  Profile,
  ProfileRow,
  University,
  UniversityRow,
} from "./types";

/*
  Data-access layer for the UI.

  Every function takes a SupabaseClient (from getBrowserSupabase() or
  getServerSupabase()) that may be null in demo mode, and degrades
  gracefully: reads return null / [], writes return null / false. The
  caller never needs to try/catch for the unconfigured case.

  User-scoped functions resolve the current user from the client's session;
  RLS enforces ownership server-side either way.
*/

async function getUserId(supabase: SupabaseClient): Promise<string | null> {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) return null;
  return data.user.id;
}

// ---------------------------------------------------------------------------
// Mappers: snake_case rows → camelCase app types
// ---------------------------------------------------------------------------

function mapProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    universityId: row.university_id,
    hoursPerWeek: row.hours_per_week,
    createdAt: row.created_at,
  };
}

function mapModule(row: ModuleRow): Module {
  return {
    id: row.id,
    universityId: row.university_id,
    code: row.code,
    title: row.title,
    discipline: row.discipline,
    yearOfStudy: row.year_of_study,
  };
}

function mapCompletion(row: CompletionRow): Completion {
  return {
    id: row.id,
    buildSlug: row.build_slug,
    completedAt: row.completed_at,
    minutesSpent: row.minutes_spent,
    confidence: row.confidence,
    note: row.note,
    artifactUrl: row.artifact_url,
  };
}

function mapSnapshot(row: CapabilitySnapshotRow): CapabilitySnapshot {
  return {
    id: row.id,
    takenAt: row.taken_at,
    ratings: row.ratings ?? {},
  };
}

function mapAdvance(row: AdvanceRow): Advance {
  return {
    id: row.id,
    source: row.source,
    externalId: row.external_id,
    title: row.title,
    url: row.url,
    publishedAt: row.published_at,
    summary: row.summary,
    categories: row.categories ?? [],
    keywords: row.keywords ?? [],
  };
}

// ---------------------------------------------------------------------------
// Catalogue (public read — works signed out, needed for onboarding)
// ---------------------------------------------------------------------------

/** All universities, alphabetical. */
export async function listUniversities(
  supabase: SupabaseClient | null,
): Promise<University[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("universities")
    .select("id, slug, name, city")
    .order("name");
  if (error || !data) return [];
  return (data as Pick<UniversityRow, "id" | "slug" | "name" | "city">[]).map(
    (row) => ({ id: row.id, slug: row.slug, name: row.name, city: row.city }),
  );
}

/** Modules for one university, ordered by code. */
export async function listModulesForUniversity(
  supabase: SupabaseClient | null,
  universityId: string,
): Promise<Module[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("modules")
    .select("id, university_id, code, title, discipline, year_of_study, created_at")
    .eq("university_id", universityId)
    .order("code");
  if (error || !data) return [];
  return (data as ModuleRow[]).map(mapModule);
}

// ---------------------------------------------------------------------------
// Profile
// ---------------------------------------------------------------------------

/** The signed-in user's profile, or null (signed out / demo mode). */
export async function getProfile(
  supabase: SupabaseClient | null,
): Promise<Profile | null> {
  if (!supabase) return null;
  const userId = await getUserId(supabase);
  if (!userId) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  if (error || !data) return null;
  return mapProfile(data as ProfileRow);
}

/**
 * Update the signed-in user's profile (row already exists via the
 * auth.users trigger; upsert covers edge cases). Returns the fresh profile.
 */
export async function upsertProfile(
  supabase: SupabaseClient | null,
  patch: {
    displayName?: string | null;
    universityId?: string | null;
    hoursPerWeek?: number | null;
  },
): Promise<Profile | null> {
  if (!supabase) return null;
  const userId = await getUserId(supabase);
  if (!userId) return null;

  const row: Record<string, unknown> = { id: userId };
  if (patch.displayName !== undefined) row.display_name = patch.displayName;
  if (patch.universityId !== undefined) row.university_id = patch.universityId;
  if (patch.hoursPerWeek !== undefined) row.hours_per_week = patch.hoursPerWeek;

  const { data, error } = await supabase
    .from("profiles")
    .upsert(row, { onConflict: "id" })
    .select()
    .single();
  if (error || !data) return null;
  return mapProfile(data as ProfileRow);
}

// ---------------------------------------------------------------------------
// User modules (onboarding picks)
// ---------------------------------------------------------------------------

/** The modules the signed-in user picked, with full module details. */
export async function getUserModules(
  supabase: SupabaseClient | null,
): Promise<Module[]> {
  if (!supabase) return [];
  const userId = await getUserId(supabase);
  if (!userId) return [];
  const { data, error } = await supabase
    .from("user_modules")
    .select(
      "module:modules(id, university_id, code, title, discipline, year_of_study, created_at)",
    )
    .eq("user_id", userId);
  if (error || !data) return [];
  return (data as unknown as { module: ModuleRow | null }[])
    .map((row) => row.module)
    .filter((m): m is ModuleRow => m !== null)
    .map(mapModule);
}

/**
 * Replace the signed-in user's module picks with exactly `moduleIds`.
 * Returns true on success.
 */
export async function setUserModules(
  supabase: SupabaseClient | null,
  moduleIds: string[],
): Promise<boolean> {
  if (!supabase) return false;
  const userId = await getUserId(supabase);
  if (!userId) return false;

  const { error: deleteError } = await supabase
    .from("user_modules")
    .delete()
    .eq("user_id", userId);
  if (deleteError) return false;

  if (moduleIds.length === 0) return true;

  const { error: insertError } = await supabase.from("user_modules").insert(
    moduleIds.map((moduleId) => ({ user_id: userId, module_id: moduleId })),
  );
  return !insertError;
}

// ---------------------------------------------------------------------------
// Build completions (the practice log)
// ---------------------------------------------------------------------------

/** The signed-in user's completions, newest first. */
export async function listCompletions(
  supabase: SupabaseClient | null,
): Promise<Completion[]> {
  if (!supabase) return [];
  const userId = await getUserId(supabase);
  if (!userId) return [];
  const { data, error } = await supabase
    .from("user_build_completions")
    .select("*")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false });
  if (error || !data) return [];
  return (data as CompletionRow[]).map(mapCompletion);
}

/** Log a finished build for the signed-in user. */
export async function addCompletion(
  supabase: SupabaseClient | null,
  input: {
    buildSlug: string;
    minutesSpent?: number;
    confidence?: number | null;
    note?: string | null;
    artifactUrl?: string | null;
  },
): Promise<Completion | null> {
  if (!supabase) return null;
  const userId = await getUserId(supabase);
  if (!userId) return null;
  const { data, error } = await supabase
    .from("user_build_completions")
    .insert({
      user_id: userId,
      build_slug: input.buildSlug,
      minutes_spent: input.minutesSpent ?? 25,
      confidence: input.confidence ?? null,
      note: input.note ?? null,
      artifact_url: input.artifactUrl ?? null,
    })
    .select()
    .single();
  if (error || !data) return null;
  return mapCompletion(data as CompletionRow);
}

// ---------------------------------------------------------------------------
// Capability snapshots
// ---------------------------------------------------------------------------

/** Record a new capability snapshot (1–5 per area) for the signed-in user. */
export async function addCapabilitySnapshot(
  supabase: SupabaseClient | null,
  ratings: CapabilityRatings,
): Promise<CapabilitySnapshot | null> {
  if (!supabase) return null;
  const userId = await getUserId(supabase);
  if (!userId) return null;
  const { data, error } = await supabase
    .from("capability_snapshots")
    .insert({ user_id: userId, ratings })
    .select()
    .single();
  if (error || !data) return null;
  return mapSnapshot(data as CapabilitySnapshotRow);
}

/** The signed-in user's most recent capability snapshot, or null. */
export async function getLatestSnapshot(
  supabase: SupabaseClient | null,
): Promise<CapabilitySnapshot | null> {
  if (!supabase) return null;
  const userId = await getUserId(supabase);
  if (!userId) return null;
  const { data, error } = await supabase
    .from("capability_snapshots")
    .select("*")
    .eq("user_id", userId)
    .order("taken_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return mapSnapshot(data as CapabilitySnapshotRow);
}

// ---------------------------------------------------------------------------
// AI advances feed
// ---------------------------------------------------------------------------

/**
 * Recent AI advances matched to the given modules (join via
 * advance_module_matches), deduplicated per advance and sorted by best
 * match score. Public read — works signed out too.
 */
export async function getAdvancesForModuleIds(
  supabase: SupabaseClient | null,
  moduleIds: string[],
  options?: { sinceDays?: number; limit?: number },
): Promise<MatchedAdvance[]> {
  if (!supabase || moduleIds.length === 0) return [];
  const sinceDays = options?.sinceDays ?? 14;
  const limit = options?.limit ?? 20;
  const sinceIso = new Date(Date.now() - sinceDays * 86_400_000).toISOString();

  const { data, error } = await supabase
    .from("advance_module_matches")
    .select(
      "module_id, score, rationale, advance:ai_advances!inner(id, source, external_id, title, url, published_at, summary, categories, keywords, created_at)",
    )
    .in("module_id", moduleIds)
    .gte("advance.published_at", sinceIso);
  if (error || !data) return [];

  const rows = data as unknown as {
    module_id: string;
    score: number;
    rationale: string | null;
    advance: AdvanceRow | null;
  }[];

  /* An advance can match several of the user's modules — keep one entry per
     advance with the best score and the full list of matched modules. */
  const byAdvance = new Map<string, MatchedAdvance>();
  for (const row of rows) {
    if (!row.advance) continue;
    const existing = byAdvance.get(row.advance.id);
    if (existing) {
      if (!existing.moduleIds.includes(row.module_id)) {
        existing.moduleIds.push(row.module_id);
      }
      if (row.score > existing.score) {
        existing.score = row.score;
        existing.rationale = row.rationale;
      }
    } else {
      byAdvance.set(row.advance.id, {
        advance: mapAdvance(row.advance),
        score: row.score,
        rationale: row.rationale,
        moduleIds: [row.module_id],
      });
    }
  }

  return [...byAdvance.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
