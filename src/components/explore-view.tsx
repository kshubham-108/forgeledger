"use client";

import { useState } from "react";
import { GatedLink } from "@/components/gated-link";
import {
  competencyLabels,
  disciplineLabels,
  getBuildsForDiscipline,
  modules,
  universities,
} from "@/lib/seed";
import { useProfile } from "@/lib/use-store";
import type { Discipline, MicroBuild } from "@/lib/types";

const courses = Object.keys(disciplineLabels) as Discipline[];

/* 1-2 example modules this build maps to, shown as sub-text — the viewer's
   own module first if it's a match, otherwise a couple of representative
   ones pulled from the catalogue across universities. */
function exampleModules(build: MicroBuild, ownModuleId?: string) {
  const matches = modules.filter((m) => build.moduleCodes.includes(m.code));
  const own = ownModuleId ? matches.find((m) => m.id === ownModuleId) : undefined;
  const rest = matches.filter((m) => m.id !== own?.id);
  const shown = own ? [own, ...rest.slice(0, 1)] : rest.slice(0, 2);
  return shown.map((m) => ({
    ...m,
    universityName: universities.find((u) => u.id === m.universityId)?.name,
  }));
}

export function ExploreView() {
  const profile = useProfile();
  const [course, setCourse] = useState<Discipline>(profile?.discipline ?? courses[0]);

  const builds = getBuildsForDiscipline(course);
  const ownModuleId = profile?.moduleIds.find(
    (id) => modules.find((m) => m.id === id)?.discipline === course,
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {courses.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={course === c}
            onClick={() => setCourse(c)}
            className={`rounded-sm border px-3 py-2 text-sm ${
              course === c
                ? "border-cobalt bg-cobalt text-white"
                : "border-rule bg-card text-ink hover:border-ink-muted"
            }`}
          >
            {disciplineLabels[c]}
          </button>
        ))}
      </div>

      <div className="margin-ruled mt-8">
        <div className="border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            {disciplineLabels[course]} builds
          </h2>
        </div>
        {builds.length === 0 ? (
          <p className="px-4 py-6 text-sm text-ink-muted">
            No builds for this course yet — more are added each term.
          </p>
        ) : (
          <ul>
            {builds.map((build) => {
              const examples = exampleModules(build, ownModuleId);
              return (
                <li
                  key={build.slug}
                  className="border-b border-rule bg-card px-4 py-4 sm:px-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-ink-muted">
                      {build.estMinutes} min
                    </span>
                    {build.competencies.map((c) => (
                      <span
                        key={c}
                        className="rounded-sm border border-rule px-1.5 py-0.5 font-mono text-[11px] text-ink-muted"
                      >
                        {competencyLabels[c]}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-medium leading-snug text-ink">
                    {build.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                    {build.summary}
                  </p>
                  {examples.length > 0 ? (
                    <p className="mt-2 text-[11px] text-ink-muted">
                      {examples[0].id === ownModuleId ? "Matches your module: " : "Fits modules like "}
                      {examples
                        .map(
                          (m) =>
                            `${m.code} ${m.title}${
                              m.universityName ? ` (${m.universityName})` : ""
                            }`,
                        )
                        .join(" · ")}
                    </p>
                  ) : null}
                  <GatedLink
                    href={`/builds/${build.slug}`}
                    className="mt-3 inline-block font-mono text-xs text-cobalt hover:text-cobalt-deep"
                  >
                    See this build &rarr;
                  </GatedLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
