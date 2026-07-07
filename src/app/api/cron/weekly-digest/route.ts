import { NextResponse } from "next/server";
import { guardCron } from "../_shared";

/*
  POST /api/cron/weekly-digest
  For every user with picked modules: take their top 3 advance matches from
  the last 7 days, pick a suggested micro-build whose module_codes overlap
  their modules, and upsert one weekly_digests row per (user, week_start).

  payload shape:
  {
    "week_start": "2026-07-06",
    "module_codes": ["PSYC2017"],
    "advances": [{ id, title, url, summary, published_at, score, rationale, module_code }],
    "suggested_build": { "slug": "...", "title": "..." } | null
  }
*/

const DIGEST_WINDOW_DAYS = 7;
const TOP_ADVANCES = 3;

type MatchWithAdvance = {
  module_id: string;
  score: number;
  rationale: string | null;
  advance: {
    id: string;
    title: string;
    url: string;
    summary: string;
    published_at: string;
  } | null;
};

/** Monday (UTC) of the current week, as YYYY-MM-DD. */
function mondayOfCurrentWeekUtc(): string {
  const now = new Date();
  const daysSinceMonday = (now.getUTCDay() + 6) % 7;
  const monday = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() - daysSinceMonday,
    ),
  );
  return monday.toISOString().slice(0, 10);
}

export async function POST(request: Request) {
  const guard = guardCron(request);
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const weekStart = mondayOfCurrentWeekUtc();
  const sinceIso = new Date(
    Date.now() - DIGEST_WINDOW_DAYS * 86_400_000,
  ).toISOString();

  const [userModulesRes, matchesRes, modulesRes, buildsRes] =
    await Promise.all([
      admin.from("user_modules").select("user_id, module_id"),
      admin
        .from("advance_module_matches")
        .select(
          "module_id, score, rationale, advance:ai_advances!inner(id, title, url, summary, published_at)",
        )
        .gte("advance.published_at", sinceIso),
      admin.from("modules").select("id, code"),
      admin.from("micro_builds").select("slug, title, module_codes"),
    ]);

  const firstError =
    userModulesRes.error ?? matchesRes.error ?? modulesRes.error ?? buildsRes.error;
  if (firstError) {
    return NextResponse.json({ error: firstError.message }, { status: 500 });
  }

  const userModules = (userModulesRes.data ?? []) as {
    user_id: string;
    module_id: string;
  }[];
  const matches = (matchesRes.data ?? []) as unknown as MatchWithAdvance[];
  const moduleCodeById = new Map(
    ((modulesRes.data ?? []) as { id: string; code: string }[]).map((m) => [
      m.id,
      m.code,
    ]),
  );
  const builds = (buildsRes.data ?? []) as {
    slug: string;
    title: string;
    module_codes: string[];
  }[];

  const modulesByUser = new Map<string, string[]>();
  for (const { user_id, module_id } of userModules) {
    const list = modulesByUser.get(user_id) ?? [];
    list.push(module_id);
    modulesByUser.set(user_id, list);
  }

  const rows: Record<string, unknown>[] = [];

  for (const [userId, moduleIds] of modulesByUser) {
    const moduleIdSet = new Set(moduleIds);
    const moduleCodes = moduleIds
      .map((id) => moduleCodeById.get(id))
      .filter((code): code is string => Boolean(code));
    const moduleCodeSet = new Set(moduleCodes);

    /* Top matches for this user's modules, one entry per advance. */
    const seenAdvances = new Set<string>();
    const topAdvances = matches
      .filter((match) => moduleIdSet.has(match.module_id) && match.advance)
      .sort((a, b) => b.score - a.score)
      .filter((match) => {
        const advanceId = match.advance as NonNullable<typeof match.advance>;
        if (seenAdvances.has(advanceId.id)) return false;
        seenAdvances.add(advanceId.id);
        return true;
      })
      .slice(0, TOP_ADVANCES)
      .map((match) => {
        const advance = match.advance as NonNullable<typeof match.advance>;
        return {
          id: advance.id,
          title: advance.title,
          url: advance.url,
          summary: advance.summary,
          published_at: advance.published_at,
          score: match.score,
          rationale: match.rationale,
          module_code: moduleCodeById.get(match.module_id) ?? null,
        };
      });

    /* Suggested build: the one sharing the most module codes with the user. */
    let suggestedBuild: { slug: string; title: string } | null = null;
    let bestOverlap = 0;
    for (const build of builds) {
      const overlap = (build.module_codes ?? []).filter((code) =>
        moduleCodeSet.has(code),
      ).length;
      if (overlap > bestOverlap) {
        bestOverlap = overlap;
        suggestedBuild = { slug: build.slug, title: build.title };
      }
    }

    rows.push({
      user_id: userId,
      week_start: weekStart,
      payload: {
        week_start: weekStart,
        module_codes: moduleCodes,
        advances: topAdvances,
        suggested_build: suggestedBuild,
      },
    });
  }

  if (rows.length > 0) {
    const { error } = await admin
      .from("weekly_digests")
      .upsert(rows, { onConflict: "user_id,week_start" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    ok: true,
    weekStart,
    digestsUpserted: rows.length,
  });
}
