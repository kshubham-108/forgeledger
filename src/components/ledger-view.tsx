"use client";

import Link from "next/link";
import { LogRow } from "@/components/ledger-row";
import { competencyLabels, getBuildBySlug } from "@/lib/seed";
import { useLog, useProfile } from "@/lib/use-store";
import type { Competency } from "@/lib/types";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function LogView() {
  const profile = useProfile();
  const log = useLog();

  if (log.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Nothing in your log yet
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Finish your first 25-minute build and it lands here.
        </p>
        <Link
          href={profile === null ? "/" : "/dashboard"}
          className="mt-6 inline-block rounded-sm bg-cobalt px-5 py-2.5 text-sm font-medium text-white hover:bg-cobalt-deep"
        >
          {profile === null ? "Get started" : "See this week's builds"}
        </Link>
      </div>
    );
  }

  const competencyCounts = new Map<Competency, number>();
  for (const entry of log) {
    const build = getBuildBySlug(entry.buildSlug);
    if (!build) continue;
    for (const c of build.competencies) {
      competencyCounts.set(c, (competencyCounts.get(c) ?? 0) + 1);
    }
  }
  const totalMinutes = log.reduce((sum, e) => sum + e.timeSpentMin, 0);
  const entries = log.toReversed();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        My log · personal record
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        {log.length} build{log.length === 1 ? "" : "s"} done
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {totalMinutes} minutes of hands-on practice, in your own modules
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {[...competencyCounts.entries()].map(([c, count]) => (
          <span
            key={c}
            className="rounded-sm border border-rule bg-card px-2 py-1 text-[11px] text-ink"
          >
            {competencyLabels[c]}{" "}
            <span className="font-mono text-cobalt">×{count}</span>
          </span>
        ))}
      </div>

      <section className="mt-10">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Build log
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            newest first
          </span>
        </div>
        <ul>
          {entries.map((entry) => {
            const build = getBuildBySlug(entry.buildSlug);
            return (
              <LogRow
                key={entry.id}
                serial={entry.serial}
                title={build?.title ?? entry.buildSlug}
                moduleCode={entry.moduleCode}
                competencies={build?.competencies ?? []}
                date={dateFormat.format(new Date(entry.completedAt))}
                minutes={entry.timeSpentMin}
                confidence={entry.confidence}
              />
            );
          })}
        </ul>
      </section>

      <p className="mt-8 text-xs leading-relaxed text-ink-muted">
        This log is yours: what you practised, when, and how confident you
        felt afterwards. Notes you saved with a build stay on this device.
        Export arrives with accounts in a later release.
      </p>
    </div>
  );
}
