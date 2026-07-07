import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getAdminSupabase } from "@/lib/supabase/admin";

/*
  Shared plumbing for the cron route handlers:
    * guardCron — bearer-secret auth + service-role client, with clear
      failure responses (401 bad secret, 503 unconfigured env).
    * tokenize / topKeywords — the simple keyword heuristic used by the
      ingest and match jobs.
*/

type GuardResult =
  | { ok: true; admin: SupabaseClient }
  | { ok: false; response: NextResponse };

export function guardCron(request: Request): GuardResult {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            "CRON_SECRET is not set. Add it to the environment to enable the cron routes.",
        },
        { status: 503 },
      ),
    };
  }

  if (request.headers.get("authorization") !== `Bearer ${secret}`) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  const admin = getAdminSupabase();
  if (!admin) {
    return {
      ok: false,
      response: NextResponse.json(
        {
          error:
            "Supabase is not configured (NEXT_PUBLIC_SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY missing). Cron routes are disabled in demo mode.",
        },
        { status: 503 },
      ),
    };
  }

  return { ok: true, admin };
}

/*
  Stopwords: standard English filler plus arXiv-abstract boilerplate that
  would otherwise dominate every keyword list ("paper", "propose", ...).
*/
const STOPWORDS = new Set([
  "a", "about", "above", "after", "again", "all", "also", "an", "and", "any",
  "are", "as", "at", "be", "because", "been", "before", "being", "below",
  "between", "both", "but", "by", "can", "cannot", "could", "did", "do",
  "does", "doing", "down", "during", "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "him", "his",
  "how", "however", "i", "if", "in", "into", "is", "it", "its", "itself",
  "just", "may", "might", "more", "most", "much", "must", "my", "no", "nor",
  "not", "of", "off", "on", "once", "only", "or", "other", "our", "ours",
  "out", "over", "own", "same", "she", "should", "so", "some", "such", "than",
  "that", "the", "their", "theirs", "them", "then", "there", "these", "they",
  "this", "those", "through", "to", "too", "under", "until", "up", "very",
  "was", "we", "were", "what", "when", "where", "which", "while", "who",
  "whom", "why", "will", "with", "would", "you", "your", "yours",
  // arXiv boilerplate
  "abstract", "achieve", "achieves", "approach", "approaches", "based",
  "benchmark", "benchmarks", "demonstrate", "demonstrates", "existing",
  "experiments", "framework", "improve", "improves", "introduce", "large",
  "method", "methods", "new", "novel", "outperforms", "paper", "performance",
  "present", "presents", "prior", "propose", "proposed", "recent", "results",
  "show", "shows", "state", "study", "task", "tasks", "using", "via", "work",
  "well",
]);

/** Lowercase word tokens, stopwords and short/numeric tokens removed. */
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(
      (word) =>
        word.length >= 3 && !STOPWORDS.has(word) && !/^\d+$/.test(word),
    );
}

/** Top `limit` tokens of `text` by frequency (ties broken alphabetically). */
export function topKeywords(text: string, limit: number): string[] {
  const counts = new Map<string, number>();
  for (const word of tokenize(text)) {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([word]) => word);
}
