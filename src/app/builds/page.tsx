import type { Metadata } from "next";
import Link from "next/link";
import {
  competencyLabels,
  disciplineLabels,
  microBuilds,
} from "@/lib/seed";
import type { Discipline } from "@/lib/types";
import { SITE_URL } from "@/lib/site";

const description =
  "Every Fluent practice build in one place: 25-minute, module-matched exercises across Psychology, Law, History, Business, Nursing, Computer Science, Economics, Maths and Medicine. Free tools only.";

export const metadata: Metadata = {
  title: "All builds",
  description,
  alternates: { canonical: "/builds" },
  openGraph: {
    title: "All builds — Fluent",
    description,
    url: "/builds",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "All builds — Fluent",
    description,
  },
};

const disciplineOrder = Object.keys(disciplineLabels) as Discipline[];

function StructuredData() {
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Fluent practice builds",
    description,
    itemListElement: microBuilds.map((build, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/builds/${build.slug}`,
      item: {
        "@type": "LearningResource",
        name: build.title,
        description: build.summary,
        timeRequired: `PT${build.estMinutes}M`,
        educationalLevel: "Undergraduate",
        isAccessibleForFree: true,
        teaches: build.competencies.map((c) => competencyLabels[c]),
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}

export default function BuildsIndexPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <StructuredData />
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        {microBuilds.length} builds · free tools only
      </p>
      <h1 className="mt-3 max-w-2xl text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Every build, in one place
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-muted">
        Each one is 25 minutes, matched to real module codes, and trains a
        skill you use with AI — not another lecture. Pick your discipline
        below, or{" "}
        <Link href="/" className="text-cobalt hover:text-cobalt-deep">
          set up your modules
        </Link>{" "}
        to see the ones matched to you first.
      </p>

      <div className="mt-10 flex flex-col gap-12">
        {disciplineOrder.map((discipline) => {
          const builds = microBuilds.filter(
            (b) => b.discipline === discipline,
          );
          if (builds.length === 0) return null;
          return (
            <section key={discipline}>
              <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
                <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
                  {disciplineLabels[discipline]}
                </h2>
                <span className="font-mono text-xs text-ink-muted">
                  {builds.length} build{builds.length === 1 ? "" : "s"}
                </span>
              </div>
              <ul>
                {builds.map((build) => (
                  <li
                    key={build.slug}
                    className="flex flex-col gap-3 border-b border-rule bg-card px-4 py-5 sm:px-6"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-sm font-semibold text-ink">
                        {build.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[11px] text-ink-muted">
                        {build.estMinutes} min
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-ink-muted">
                      {build.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      {build.moduleCodes.map((code) => (
                        <span
                          key={code}
                          className="rounded-sm bg-cobalt-faint px-1.5 py-0.5 font-mono text-[11px] text-cobalt-deep"
                        >
                          {code}
                        </span>
                      ))}
                      {build.competencies.map((c) => {
                        const weight = build.competencyScores[c] ?? 1;
                        return (
                          <span
                            key={c}
                            className="rounded-sm border border-rule px-2 py-0.5 text-[11px] text-ink"
                          >
                            {competencyLabels[c]}{" "}
                            <span
                              className="font-mono text-cobalt"
                              title={`Training weight ${weight} of 3`}
                            >
                              {"●".repeat(weight)}
                              {"○".repeat(3 - weight)}
                            </span>
                          </span>
                        );
                      })}
                      <Link
                        href={`/builds/${build.slug}`}
                        className="ml-auto shrink-0 font-mono text-xs text-cobalt hover:text-cobalt-deep"
                      >
                        Open build &rarr;
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
