"use client";

import Link from "next/link";
import {
  COHORT_UNLOCK_THRESHOLD,
  competencyLabels,
  disciplineLabels,
  getBuildsForModuleCodes,
  getModuleById,
  getRadarItemsForModuleCodes,
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
          href="/"
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
  const radar = getRadarItemsForModuleCodes(moduleCodes);
  const completedSlugs = new Set(ledger.map((e) => e.buildSlug));
  const moduleCodeSet = new Set(moduleCodes);

  const buildsThisWeek = Math.max(1, Math.floor((profile.hoursPerWeek * 60) / 25));
  const completedThisPlan = builds.filter((b) => completedSlugs.has(b.slug)).length;

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

      {/* Personal progress — measured against your own plan, not a cohort */}
      <section className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="border border-rule bg-card px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Your pace
          </p>
          <p className="mt-1 text-sm text-ink">
            <span className="font-mono text-lg text-biro">{buildsThisWeek}</span>{" "}
            build{buildsThisWeek === 1 ? "" : "s"} fit in your{" "}
            {profile.hoursPerWeek}h this week
          </p>
        </div>
        <div className="border border-rule bg-card px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Module coverage
          </p>
          <p className="mt-1 text-sm text-ink">
            <span className="font-mono text-lg text-biro">
              {completedThisPlan}/{builds.length}
            </span>{" "}
            matched builds done
          </p>
        </div>
        <div className="border border-dashed border-rule bg-paper px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Cohort comparison
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ink-muted">
            Locked until {COHORT_UNLOCK_THRESHOLD}+ students in your discipline
            are on the ledger. We won&apos;t show you a percentile computed
            from nobody.
          </p>
        </div>
      </section>

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

      {/* The radar → build loop: advance, module, build — end to end */}
      <section className="margin-ruled mt-10">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Radar · new for your modules
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            curated weekly
          </span>
        </div>
        {radar.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-muted">
            No radar items match your modules yet. The feed covers Psychology,
            Law, Nursing and History first.
          </p>
        ) : (
          <ul>
            {radar.map((item) => {
              const done = completedSlugs.has(item.buildSlug);
              return (
                <li
                  key={item.id}
                  className="border-b border-rule bg-card px-4 py-4 sm:px-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-sm border border-rule bg-paper px-1.5 py-0.5 font-mono text-[11px] text-ink-muted">
                      {item.sourceType}
                    </span>
                    {item.moduleCodes
                      .filter((c) => moduleCodeSet.has(c))
                      .map((code) => (
                        <span
                          key={code}
                          className="rounded-sm bg-biro-faint px-1.5 py-0.5 font-mono text-[11px] text-biro-deep"
                        >
                          {code}
                        </span>
                      ))}
                    <span className="font-mono text-[11px] text-ink-muted">
                      {item.date}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug text-ink">
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {item.whyItMatters}
                  </p>
                  <div className="mt-3">
                    {done ? (
                      <span className="font-mono text-[11px] uppercase tracking-wide text-verified">
                        Linked build already in your ledger
                      </span>
                    ) : (
                      <Link
                        href={`/builds/${item.buildSlug}`}
                        className="font-mono text-xs text-biro hover:text-biro-deep"
                      >
                        Try this advance → 25-min build
                      </Link>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <p className="px-4 py-3 text-xs text-ink-muted sm:px-6">
          Pilot feed: items are hand-curated for launch modules. The automated
          daily ingest (arXiv, vendor releases, regulator guidance) ships in
          the next release.
        </p>
      </section>
    </div>
  );
}
