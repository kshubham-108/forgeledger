"use client";

import Link from "next/link";
import { LedgerRow } from "@/components/ledger-row";
import { competencyLabels, evidenceStatusLabels, getBuildBySlug } from "@/lib/seed";
import { useLedger, useProfile } from "@/lib/use-store";
import type { Competency, EvidenceStatus, LedgerEntry } from "@/lib/types";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function statusOf(entry: LedgerEntry): EvidenceStatus {
  if (entry.evidenceStatus) return entry.evidenceStatus;
  // Entries stamped before provenance existed: derive it from the artifact.
  return entry.artifactText.trim().length >= 40
    ? "artifact-attached"
    : "self-assessed";
}

export function LedgerView() {
  const profile = useProfile();
  const ledger = useLedger();

  if (ledger.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-ink">
          Your ledger is open, but empty
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          Complete your first 25-minute build and it gets stamped here.
        </p>
        <Link
          href={profile === null ? "/" : "/dashboard"}
          className="mt-6 inline-block rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep"
        >
          {profile === null ? "Open your ledger" : "See this week's builds"}
        </Link>
      </div>
    );
  }

  const competencyCounts = new Map<Competency, number>();
  for (const entry of ledger) {
    const build = getBuildBySlug(entry.buildSlug);
    if (!build) continue;
    for (const c of build.competencies) {
      competencyCounts.set(c, (competencyCounts.get(c) ?? 0) + 1);
    }
  }
  const totalMinutes = ledger.reduce((sum, e) => sum + e.timeSpentMin, 0);
  const withArtifact = ledger.filter(
    (e) => statusOf(e) === "artifact-attached",
  ).length;
  const entries = ledger.toReversed();

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-biro">
        My stamps · evidence log
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink">
        {ledger.length} build{ledger.length === 1 ? "" : "s"} on record
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {totalMinutes} minutes of evidenced practice · {withArtifact} of{" "}
        {ledger.length} with an artifact attached
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {[...competencyCounts.entries()].map(([c, count]) => (
          <span
            key={c}
            className="rounded-sm border border-rule bg-card px-2 py-1 text-[11px] text-ink"
          >
            {competencyLabels[c]}{" "}
            <span className="font-mono text-biro">×{count}</span>
          </span>
        ))}
      </div>

      <section className="margin-ruled mt-10">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Ledger · complete record
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            newest first
          </span>
        </div>
        <ul>
          {entries.map((entry) => {
            const build = getBuildBySlug(entry.buildSlug);
            return (
              <LedgerRow
                key={entry.id}
                serial={entry.serial}
                title={build?.title ?? entry.buildSlug}
                moduleCode={entry.moduleCode}
                competencies={build?.competencies ?? []}
                date={dateFormat.format(new Date(entry.completedAt))}
                minutes={entry.timeSpentMin}
                evidenceStatus={statusOf(entry)}
              />
            );
          })}
        </ul>
      </section>

      {/* What the stamps mean — provenance stated plainly */}
      <section className="mt-8 border border-rule bg-card px-5 py-4">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          What the stamps mean
        </h2>
        <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-ink-muted">
          <li>
            <span className="font-medium text-ink">
              {evidenceStatusLabels["self-assessed"]}
            </span>{" "}
            — you logged the build and rated yourself. The weakest tier, and
            labelled as such.
          </li>
          <li>
            <span className="font-medium text-ink">
              {evidenceStatusLabels["artifact-attached"]}
            </span>{" "}
            — your prompts, audit log, or checklist are stored with the entry.
            Anyone you share it with can read the work.
          </li>
          <li>
            <span className="font-medium text-ink">
              {evidenceStatusLabels["externally-verified"]}
            </span>{" "}
            — a later tier, coming with accounts. No entry gets this label
            today; we don&apos;t claim verification we can&apos;t back.
          </li>
        </ul>
      </section>

      <p className="mt-8 text-xs text-ink-muted">
        This is an evidence log with clear provenance — not a certificate.
        Portfolio export (PDF and shareable link) arrives with accounts in the
        next release. Your entries are safe on this device until then.
      </p>
    </div>
  );
}
