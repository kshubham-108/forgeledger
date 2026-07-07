"use client";

import Link from "next/link";
import {
  competencyLabels,
  disciplineLabels,
  getBuildsForModuleCodes,
  getModuleById,
} from "@/lib/seed";
import { useLedger, useProfile } from "@/lib/use-store";

export function WeeklyPlan() {
  const profile = useProfile();
  const ledger = useLedger();

  if (profile === null) {
    return (
      <div className="py-16 text-center">
        <h1 className="font-display text-2xl text-ink">No ledger yet</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Pick your university and modules to see this week&apos;s builds.
        </p>
        <Link
          href="/start"
          className="mt-6 inline-block rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep"
        >
          Open your ledger
        </Link>
      </div>
    );
  }

  const chosenModules = profile.moduleIds
    .map(getModuleById)
    .filter((m) => m !== undefined);
  const moduleCodes = chosenModules.map((m) => m.code);
  const builds = getBuildsForModuleCodes(moduleCodes);
  const completedSlugs = new Set(ledger.map((e) => e.buildSlug));
  const moduleCodeSet = new Set(moduleCodes);

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-biro">
        This week
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink">
        {profile.displayName}&apos;s plan
      </h1>
      <p className="mt-2 text-sm text-ink-muted">
        {chosenModules.length} module{chosenModules.length === 1 ? "" : "s"} ·{" "}
        {profile.hoursPerWeek}h a week ·{" "}
        <Link href="/ledger" className="text-biro hover:text-biro-deep">
          {ledger.length} build{ledger.length === 1 ? "" : "s"} in your ledger
        </Link>
      </p>

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
              return (
                <li
                  key={build.slug}
                  className="flex flex-col gap-3 border-b border-rule bg-card px-4 py-4 sm:flex-row sm:items-center sm:px-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-sm bg-biro-faint px-1.5 py-0.5 font-mono text-[11px] text-biro-deep">
                        {matchedCode}
                      </span>
                      <span className="text-[11px] text-ink-muted">
                        {disciplineLabels[build.discipline]} · {build.estMinutes}{" "}
                        min
                      </span>
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
                    <span className="inline-flex shrink-0 items-center rounded-sm border border-verified bg-verified-faint px-2 py-1 font-mono text-[11px] uppercase tracking-wide text-verified">
                      In your ledger
                    </span>
                  ) : (
                    <Link
                      href={`/builds/${build.slug}`}
                      className="shrink-0 rounded-sm bg-biro px-4 py-2 text-center text-sm font-medium text-white hover:bg-biro-deep"
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

      <section className="mt-10 border border-dashed border-rule bg-card px-5 py-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          Coming in the next release
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          A weekly radar digest: new AI advances matched to{" "}
          {moduleCodes.slice(0, 2).join(" and ")}
          {moduleCodes.length > 2 ? " and more" : ""}, each with a fresh build.
        </p>
      </section>
    </div>
  );
}
