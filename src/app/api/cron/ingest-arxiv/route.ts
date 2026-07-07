import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { guardCron, topKeywords } from "../_shared";

/*
  POST /api/cron/ingest-arxiv
  Daily ingest from the official arXiv Atom API — the only external source
  in the pipeline (no scraping anywhere). Fetches the most recent papers in
  the AI categories, keeps those published in the last ~2 days, extracts
  heuristic keywords, and upserts into ai_advances on external_id.
*/

const ARXIV_API = "https://export.arxiv.org/api/query";
const CATEGORIES = ["cs.AI", "cs.CL", "cs.LG", "cs.HC", "stat.ML"];
const MAX_RESULTS = 100;
const WINDOW_DAYS = 2;
const KEYWORDS_PER_ADVANCE = 12;

/* Atom entry shape after fast-xml-parser (attributes prefixed with @_). */
type ArxivEntry = {
  id?: unknown;
  title?: unknown;
  summary?: unknown;
  published?: unknown;
  category?: { "@_term"?: unknown } | { "@_term"?: unknown }[];
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function entryCategories(category: ArxivEntry["category"]): string[] {
  const list = Array.isArray(category) ? category : category ? [category] : [];
  return list
    .map((item) => (typeof item["@_term"] === "string" ? item["@_term"] : ""))
    .filter(Boolean);
}

export async function POST(request: Request) {
  const guard = guardCron(request);
  if (!guard.ok) return guard.response;
  const { admin } = guard;

  const query = new URL(ARXIV_API);
  query.searchParams.set(
    "search_query",
    CATEGORIES.map((cat) => `cat:${cat}`).join(" OR "),
  );
  query.searchParams.set("sortBy", "submittedDate");
  query.searchParams.set("sortOrder", "descending");
  query.searchParams.set("start", "0");
  query.searchParams.set("max_results", String(MAX_RESULTS));

  const response = await fetch(query, {
    headers: { "User-Agent": "fluent/0.1 (daily ingest job)" },
    cache: "no-store",
  });
  if (!response.ok) {
    return NextResponse.json(
      { error: `arXiv API responded with ${response.status}` },
      { status: 502 },
    );
  }
  const xml = await response.text();

  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml) as {
    feed?: { entry?: ArxivEntry | ArxivEntry[] };
  };
  const rawEntries = feed.feed?.entry;
  const entries = Array.isArray(rawEntries)
    ? rawEntries
    : rawEntries
      ? [rawEntries]
      : [];

  const cutoff = Date.now() - WINDOW_DAYS * 86_400_000;
  const rows: Record<string, unknown>[] = [];

  for (const entry of entries) {
    /* Entry id is the abstract URL, e.g. http://arxiv.org/abs/2506.01234v1 */
    const absUrl = typeof entry.id === "string" ? entry.id : "";
    const arxivId = absUrl.split("/abs/")[1];
    if (!arxivId) continue;

    const publishedMs = Date.parse(asText(entry.published));
    if (!Number.isFinite(publishedMs) || publishedMs < cutoff) continue;

    const title = asText(entry.title);
    const summary = asText(entry.summary);
    if (!title) continue;

    rows.push({
      source: "arxiv",
      /* Strip the version suffix so re-ingesting v2 updates the same row. */
      external_id: `arxiv:${arxivId.replace(/v\d+$/, "")}`,
      title,
      url: absUrl,
      published_at: new Date(publishedMs).toISOString(),
      summary,
      categories: entryCategories(entry.category),
      keywords: topKeywords(`${title} ${summary}`, KEYWORDS_PER_ADVANCE),
    });
  }

  if (rows.length > 0) {
    const { error } = await admin
      .from("ai_advances")
      .upsert(rows, { onConflict: "external_id" });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({
    ok: true,
    fetched: entries.length,
    upserted: rows.length,
    windowDays: WINDOW_DAYS,
  });
}
