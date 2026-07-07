"use client";

import Link from "next/link";
import { useState } from "react";
import { SnapshotRater } from "@/components/snapshot-rater";
import {
  advanceSourceLabels,
  competencyLabels,
  disciplineLabels,
  getAdvancesForModuleCodes,
  getBuildsForModuleCodes,
  getModuleById,
  snapshotCompetencies,
} from "@/lib/seed";
import { saveSnapshotAndSync } from "@/lib/data-bridge";
import { useLog, useProfile } from "@/lib/use-store";
import type { Competency, SnapshotRatings } from "@/lib/types";

function weakestCompetency(snapshot: SnapshotRatings): Competency | null {
  let weakest: Competency | null = null;
  let lowest = Infinity;
  for (const competency of snapshotCompetencies) {
    const rating = snapshot[competency];
    if (rating !== undefined && rating < lowest) {
      lowest = rating;
      weakest = competency;
    }
  }
  return weakest;
}

/* "Your snapshot": show ratings + focus area, or offer the 20-second rater. */
function SnapshotSection({ snapshot }: { snapshot?: SnapshotRatings }) {
  const [draft, setDraft] = useState<SnapshotRatings>({});
  const hasSnapshot = snapshot !== undefined && Object.keys(snapshot).length > 0;

  if (!hasSnapshot) {
    return (
      <section className="mt-8 border border-rule bg-card px-5 py-4">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          Your snapshot
        </h2>
        <p className="mt-2 text-sm text-ink">
          Twenty seconds: rate yourself and this week&rsquo;s builds will
          target your weakest area first.
        </p>
        <div className="mt-4 max-w-md">
          <SnapshotRater value={draft} onChange={setDraft} />
        </div>
        <button
          type="button"
          disabled={Object.keys(draft).length === 0}
          onClick={() => saveSnapshotAndSync(draft)}
          className="mt-4 rounded-sm bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
        >
          Save snapshot
        </button>
      </section>
    );
  }

  const focus = weakestCompetency(snapshot);
  return (
    <section className="mt-8 border border-rule bg-card px-5 py-4">
      <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
        Your snapshot
      </h2>
      <div className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {snapshotCompetencies.map((competency) => {
          const rating = snapshot[competency];
          return (
            <div
              key={competency}
              className="flex items-baseline justify-between gap-3"
            >
              <span className="text-sm text-ink">
                {competencyLabels[competency]}
              </span>
              <span
                className="font-mono text-sm tracking-wider text-cobalt"
                aria-label={
                  rating === undefined ? "not rated" : `${rating} of 5`
                }
              >
                {rating === undefined
                  ? "—"
                  : "●".repeat(rating) + "○".repeat(5 - rating)}
              </span>
            </div>
          );
        })}
      </div>
      {focus !== null ? (
        <p className="mt-4 border-t border-rule pt-3 text-sm text-ink">
          This week&rsquo;s focus:{" "}
          <span className="font-medium text-cobalt-deep">
            {competencyLabels[focus]}
          </span>{" "}
          <span className="text-ink-muted">
            — builds that work it are listed first and marked.
          </span>
        </p>
      ) : null}
    </section>
  );
}

export function WeeklyPlan() {
  const profile = useProfile();
  const log = useLog();

  if (profile === null) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          You&rsquo;re not set up yet
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Pick your university and modules to see this week&apos;s builds.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-sm bg-cobalt px-5 py-2.5 text-sm font-medium text-white hover:bg-cobalt-deep"
        >
          Get started
        </Link>
      </div>
    );
  }

  const chosenModules = profile.moduleIds
    .map(getModuleById)
    .filter((m) => m !== undefined);
  const moduleCodes = chosenModules.map((m) => m.code);
  const matchedBuilds = getBuildsForModuleCodes(moduleCodes);
  const advances = getAdvancesForModuleCodes(moduleCodes);
  const completedSlugs = new Set(log.map((e) => e.buildSlug));
  const moduleCodeSet = new Set(moduleCodes);

  const focus =
    profile.snapshot !== undefined ? weakestCompetency(profile.snapshot) : null;

  /* Not-done first; among those, builds working the focus area lead. */
  const builds = [...matchedBuilds].sort((a, b) => {
    const doneDelta =
      Number(completedSlugs.has(a.slug)) - Number(completedSlugs.has(b.slug));
    if (doneDelta !== 0) return doneDelta;
    if (focus !== null) {
      const focusDelta =
        (b.competencyScores[focus] ?? 0) - (a.competencyScores[focus] ?? 0);
      if (focusDelta !== 0) return focusDelta;
    }
    return a.title.localeCompare(b.title);
  });

  const buildsThisWeek = Math.max(
    1,
    Math.floor((profile.hoursPerWeek * 60) / 25),
  );
  const completedThisPlan = matchedBuilds.filter((b) =>
    completedSlugs.has(b.slug),
  ).length;

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        This week
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        {profile.displayName}&apos;s week
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {chosenModules.length} module{chosenModules.length === 1 ? "" : "s"} ·{" "}
        {profile.hoursPerWeek}h a week ·{" "}
        <Link href="/ledger" className="text-cobalt hover:text-cobalt-deep">
          {log.length} build{log.length === 1 ? "" : "s"} in your log
        </Link>
      </p>

      {/* Personal progress — measured against your own plan */}
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="border border-rule bg-card px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Your pace
          </p>
          <p className="mt-1 text-sm text-ink">
            <span className="font-mono text-lg text-cobalt">
              {buildsThisWeek}
            </span>{" "}
            build{buildsThisWeek === 1 ? "" : "s"} fit in your{" "}
            {profile.hoursPerWeek}h this week
          </p>
        </div>
        <div className="border border-rule bg-card px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Module coverage
          </p>
          <p className="mt-1 text-sm text-ink">
            <span className="font-mono text-lg text-cobalt">
              {completedThisPlan}/{matchedBuilds.length}
            </span>{" "}
            matched builds done
          </p>
        </div>
        <div className="border border-rule bg-card px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Minutes practised
          </p>
          <p className="mt-1 text-sm text-ink">
            <span className="font-mono text-lg text-cobalt">
              {log.reduce((sum, e) => sum + e.timeSpentMin, 0)}
            </span>{" "}
            hands-on so far
          </p>
        </div>
      </section>

      <SnapshotSection snapshot={profile.snapshot} />

      <section className="margin-ruled mt-10">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Builds matched to your modules
          </h2>
        </div>
        {builds.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-muted">
            No builds match your modules yet. More are added each week.
          </p>
        ) : (
          <ul>
            {builds.map((build) => {
              const done = completedSlugs.has(build.slug);
              const matchedCode =
                build.moduleCodes.find((c) => moduleCodeSet.has(c)) ??
                build.moduleCodes[0];
              const worksFocus =
                focus !== null && !done && build.competencies.includes(focus);
              return (
                <li
                  key={build.slug}
                  className="flex flex-col gap-3 border-b border-rule bg-card px-4 py-4 sm:flex-row sm:items-center sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-sm bg-cobalt-faint px-1.5 py-0.5 font-mono text-[11px] text-cobalt-deep">
                        {matchedCode}
                      </span>
                      <span className="text-[11px] text-ink-muted">
                        {disciplineLabels[build.discipline]} ·{" "}
                        {build.estMinutes} min
                      </span>
                      {worksFocus ? (
                        <span className="rounded-sm border border-cobalt px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-cobalt">
                          Works your focus area
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-ink">
                      {build.title}
                    </p>
                    <p className="mt-1 flex flex-wrap gap-x-2 text-[11px] text-ink-muted">
                      {build.competencies.map((c) => (
                        <span key={c}>{competencyLabels[c]}</span>
                      ))}
                    </p>
                  </div>
                  {done ? (
                    <span className="inline-flex shrink-0 items-center rounded-sm border border-rule bg-paper px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                      Done
                    </span>
                  ) : (
                    <Link
                      href={`/builds/${build.slug}`}
                      className="shrink-0 rounded-sm bg-cobalt px-4 py-2 text-center text-sm font-medium text-white hover:bg-cobalt-deep"
                    >
                      Start build
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Latest in your field: the frontier feed, filtered to your modules */}
      <section className="margin-ruled mt-10">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Latest in your field
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            updated weekly
          </span>
        </div>
        {advances.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-muted">
            Nothing matched to your modules this week — the feed covers more
            disciplines each term.
          </p>
        ) : (
          <ul>
            {advances.map((advance) => {
              const done =
                advance.relatedBuildSlug !== undefined &&
                completedSlugs.has(advance.relatedBuildSlug);
              return (
                <li
                  key={advance.id}
                  className="border-b border-rule bg-card px-4 py-4 sm:px-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm border border-rule bg-paper px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
                      {advanceSourceLabels[advance.source]}
                    </span>
                    {advance.moduleCodes
                      .filter((c) => moduleCodeSet.has(c))
                      .map((code) => (
                        <span
                          key={code}
                          className="rounded-sm bg-cobalt-faint px-1.5 py-0.5 font-mono text-[11px] text-cobalt-deep"
                        >
                          {code}
                        </span>
                      ))}
                    <span className="font-mono text-[11px] text-ink-muted">
                      {advance.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug text-ink">
                    {advance.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {advance.whyItMatters}
                  </p>
                  {advance.relatedBuildSlug !== undefined ? (
                    <div className="mt-3">
                      {done ? (
                        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-muted">
                          Linked build done ✓
                        </span>
                      ) : (
                        <Link
                          href={`/builds/${advance.relatedBuildSlug}`}
                          className="font-mono text-xs text-cobalt hover:text-cobalt-deep"
                        >
                          Turn it into a skill — 25-min build &rarr;
                        </Link>
                      )}
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        <p className="px-4 py-3 text-xs text-ink-muted sm:px-6">
          Fluent watches the feeds — arXiv, model releases, vendor updates —
          so you don&apos;t have to. Automated daily ingest ships in the next
          release; this pilot feed is hand-curated.
        </p>
      </section>
    </div>
  );
}
