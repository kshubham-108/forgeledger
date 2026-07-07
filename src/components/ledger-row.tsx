import { competencyLabels, evidenceStatusLabels } from "@/lib/seed";
import type { Competency, EvidenceStatus } from "@/lib/types";

type LedgerRowProps = {
  serial: string;
  title: string;
  moduleCode: string;
  competencies: Competency[];
  date: string;
  minutes?: number;
  evidenceStatus?: EvidenceStatus;
  animate?: boolean;
};

/*
  The signature element: a stamped ledger row.
  The stamp states provenance honestly — what the entry actually is
  (self-assessed / artifact attached), never a verification we can't back.
*/
const statusStyles: Record<EvidenceStatus, string> = {
  "self-assessed": "border-rule bg-paper text-ink-muted",
  "artifact-attached": "border-verified bg-verified-faint text-verified",
  "externally-verified": "border-biro bg-biro-faint text-biro-deep",
};

export function LedgerRow({
  serial,
  title,
  moduleCode,
  competencies,
  date,
  minutes,
  evidenceStatus = "artifact-attached",
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
        <span
          className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wide ${statusStyles[evidenceStatus]}`}
        >
          {evidenceStatusLabels[evidenceStatus]}
        </span>
        <span className="font-mono text-[11px] text-ink-muted">
          {date}
          {minutes !== undefined ? ` · ${minutes} min` : null}
        </span>
      </div>
    </li>
  );
}
