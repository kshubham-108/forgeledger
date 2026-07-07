import { competencyLabels } from "@/lib/seed";
import type { Competency } from "@/lib/types";

type LedgerRowProps = {
  serial: string;
  title: string;
  moduleCode: string;
  competencies: Competency[];
  date: string;
  minutes?: number;
  animate?: boolean;
};

/*
  The signature element: a stamped ledger row.
  Monospace serial, module-code chip, competency tags, date stamp.
*/
export function LedgerRow({
  serial,
  title,
  moduleCode,
  competencies,
  date,
  minutes,
  animate = false,
}: LedgerRowProps) {
  return (
    <li
      className={`flex flex-col gap-2 border-b border-rule bg-card px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6 ${animate ? "stamp-in" : ""}`}
    >
      <span className="font-mono text-xs text-biro">{serial}</span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{title}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="rounded-sm bg-biro-faint px-1.5 py-0.5 font-mono text-[11px] text-biro-deep">
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
        <span className="inline-flex items-center gap-1 rounded-sm border border-verified bg-verified-faint px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-verified">
          Verified build
        </span>
        <span className="font-mono text-[11px] text-ink-muted">
          {date}
          {minutes !== undefined ? ` · ${minutes} min` : null}
        </span>
      </div>
    </li>
  );
}
