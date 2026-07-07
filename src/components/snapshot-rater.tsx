"use client";

import { competencyLabels, snapshotCompetencies } from "@/lib/seed";
import type { SnapshotRatings } from "@/lib/types";

type SnapshotRaterProps = {
  value: SnapshotRatings;
  onChange: (next: SnapshotRatings) => void;
};

/*
  1–5 self-rating across the four snapshot competencies. Personal progress
  only — it tunes which builds get recommended first.
*/
export function SnapshotRater({ value, onChange }: SnapshotRaterProps) {
  return (
    <div className="flex flex-col gap-2.5">
      {snapshotCompetencies.map((competency) => (
        <div
          key={competency}
          className="flex flex-wrap items-center justify-between gap-2"
        >
          <span className="text-sm text-ink">
            {competencyLabels[competency]}
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((score) => (
              <button
                key={score}
                type="button"
                aria-label={`${competencyLabels[competency]}: ${score} of 5`}
                aria-pressed={value[competency] === score}
                onClick={() => onChange({ ...value, [competency]: score })}
                className={`h-8 w-8 rounded-sm border font-mono text-xs ${
                  (value[competency] ?? 0) >= score
                    ? "border-cobalt bg-cobalt text-white"
                    : "border-rule bg-paper text-ink-muted hover:border-ink-muted"
                }`}
              >
                {score}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
