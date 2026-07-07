import { NextResponse } from "next/server";
import { guardCron, tokenize } from "../_shared";

/*
  POST /api/cron/match-advances
  Scores recent ai_advances against module_topics by case-insensitive term
  overlap and upserts advance_module_matches.

  Scoring: pool the distinct terms of a module's topics into one set;
  score = |advance terms ∩ module topic terms| / |module topic terms|.
  Matches at or above THRESHOLD are stored with a one-line rationale
  naming the overlapping topics.

  Upgrade path: replace keyword overlap with pgvector — embed each
  module_topic and each advance (title + summary) once at write time,
  store vectors in a pgvector column, and let this job run a cosine
  similarity query (`embedding <=> ...`) instead of set intersection.
  The advance_module_matches table shape (advance_id, module_id, score,
  rationale) stays the same, so the UI does not change.
*/

const MATCH_WINDOW_DAYS = 7;
const THRESHOLD = 0.15;

type AdvanceLite = {
  id: string;
  title: string;
  summary: string;
  keywords: string[];
};

type TopicLite = {
  module_id: string;
  topic: string;
};

export async function POST(request: Request) {
  const guard = guardCron(request);
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const sinceIso = new Date(
    Date.now() - MATCH_WINDOW_DAYS * 86_400_000,
  ).toISOString();

  const { data: advancesData, error: advancesError } = await admin
    .from("ai_advances")
    .select("id, title, summary, keywords")
    .gte("published_at", sinceIso);
  if (advancesError) {
    return NextResponse.json({ error: advancesError.message }, { status: 500 });
  }
  const advances = (advancesData ?? []) as AdvanceLite[];

  const { data: topicsData, error: topicsError } = await admin
    .from("module_topics")
    .select("module_id, topic");
  if (topicsError) {
    return NextResponse.json({ error: topicsError.message }, { status: 500 });
  }
  const topics = (topicsData ?? []) as TopicLite[];

  /* Group topics per module, keeping each topic's own term set for the
     rationale and the pooled set for scoring. */
  const moduleTopicTerms = new Map<
    string,
    { topics: { topic: string; terms: string[] }[]; allTerms: Set<string> }
  >();
  for (const { module_id, topic } of topics) {
    const terms = tokenize(topic);
    if (terms.length === 0) continue;
    let group = moduleTopicTerms.get(module_id);
    if (!group) {
      group = { topics: [], allTerms: new Set() };
      moduleTopicTerms.set(module_id, group);
    }
    group.topics.push({ topic, terms });
    for (const term of terms) group.allTerms.add(term);
  }

  const rows: Record<string, unknown>[] = [];

  for (const advance of advances) {
    const advanceTerms = new Set([
      ...(advance.keywords ?? []).map((keyword) => keyword.toLowerCase()),
      ...tokenize(`${advance.title} ${advance.summary}`),
    ]);

    for (const [moduleId, group] of moduleTopicTerms) {
      const matched = [...group.allTerms].filter((term) =>
        advanceTerms.has(term),
      );
      const score = matched.length / group.allTerms.size;
      if (score < THRESHOLD) continue;

      const overlappingTopics = group.topics
        .filter(({ terms }) => terms.some((term) => advanceTerms.has(term)))
        .map(({ topic }) => topic)
        .slice(0, 3);

      rows.push({
        advance_id: advance.id,
        module_id: moduleId,
        score: Number(score.toFixed(3)),
        rationale: `Overlaps module topics: ${overlappingTopics.join(", ")} (${matched.length}/${group.allTerms.size} terms).`,
      });
    }
  }

  if (rows.length > 0) {
    const { error } = await admin
      .from("advance_module_matches")
      .upsert(rows, { onConflict: "advance_id,module_id" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    ok: true,
    advancesScored: advances.length,
    modulesWithTopics: moduleTopicTerms.size,
    matchesUpserted: rows.length,
    threshold: THRESHOLD,
  });
}
