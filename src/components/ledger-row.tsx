import { competencyLabels } from "@/lib/seed";
import type { Competency } from "@/lib/types";

type LogRowProps = {
  serial: string;
  title: string;
  moduleCode: string;
  competencies: Competency[];
  date: string;
  minutes?: number;
  confidence?: number;
};

/*
  One completed build in the log: serial, what you practised, and how
  confident you felt afterwards. A personal record, not a certificate.
*/
export function LogRow({
  serial,
  title,
  moduleCode,
  competencies,
  date,
  minutes,
  confidence,
}: LogRowProps) {
  return (
    <li
      className="flex flex-col gap-2 border-b border-rule bg-card px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
    >
      <span className="font-mono text-xs text-cobalt">{serial}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-cobalt-faint px-1.5 py-0.5 font-mono text-[11px] text-cobalt-deep">
            {moduleCode}
          </span>
          {competencies.map((c) => (
            <span key={c} className="text-[11px] text-ink-muted">
              {competencyLabels[c]}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1">
        {confidence !== undefined ? (
          <span
            className="font-mono text-[11px] tracking-wider text-cobalt"
            title={`Confidence after the build: ${confidence} of 5`}
            aria-label={`Confidence after the build: ${confidence} of 5`}
          >
            {"●".repeat(confidence)}
            {"○".repeat(Math.max(0, 5 - confidence))}
          </span>
        ) : null}
        <span className="font-mono text-[11px] text-ink-muted">
          {date}
          {minutes !== undefined ? ` · ${minutes} min` : null}
        </span>
      </div>
    </li>
  );
}
