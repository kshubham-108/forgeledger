"use client";

import { LogRow } from "@/components/ledger-row";
import { competencyLabels, getBuildBySlug } from "@/lib/seed";
import { useLog } from "@/lib/use-store";
import type { Competency } from "@/lib/types";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function BuildLogSection() {
  const log = useLog();

  if (log.length === 0) {
    return (
      <p className="px-4 py-6 text-sm text-ink-muted">
        Nothing in your log yet — finish a build and it lands here.
      </p>
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

  const entries = log.toReversed();

  return (
    <>
      <div className="flex flex-wrap gap-2 px-4 pt-4 sm:px-6">
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
    </>
  );
}
