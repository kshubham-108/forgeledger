import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  competencyLabels,
  disciplineLabels,
  getBuildBySlug,
  microBuilds,
} from "@/lib/seed";
import { CompleteBuildForm } from "@/components/complete-build-form";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return microBuilds.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  return { title: build ? `${build.title} — Stamped` : "Stamped" };
}

export default async function BuildPage({ params }: PageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) notFound();

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-biro">
        Micro-build · {disciplineLabels[build.discipline]} · {build.estMinutes}{" "}
        min
      </p>
      <h1 className="mt-3 font-display text-3xl leading-tight text-ink">
        {build.title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        {build.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {build.competencies.map((c) => {
          const weight = build.competencyScores[c] ?? 1;
          return (
            <span
              key={c}
              className="rounded-sm border border-rule bg-card px-2 py-1 text-[11px] text-ink"
            >
              {competencyLabels[c]}{" "}
              <span
                className="font-mono text-biro"
                title={`Training weight ${weight} of 3`}
              >
                {"●".repeat(weight)}
                {"○".repeat(3 - weight)}
              </span>
            </span>
          );
        })}
      </div>

      {/* What you leave with, and why watching a video wouldn't get you there */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-rule bg-card px-4 py-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            You leave with
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {build.deliverable}
          </p>
        </div>
        <div className="border border-rule bg-card px-4 py-4">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
            Why not just YouTube?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {build.whyNotYoutube}
          </p>
        </div>
      </section>

      {/* Integrity gate — structural, before the steps, not a footnote */}
      <section className="mt-8 border-l-2 border-verified bg-verified-faint px-4 py-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-verified">
          Integrity gate
        </p>
        <dl className="mt-3 flex flex-col gap-3 text-sm leading-relaxed">
          <div>
            <dt className="font-medium text-ink">This build trains</dt>
            <dd className="mt-0.5 text-ink-muted">{build.integrity.trains}</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">It must not be used for</dt>
            <dd className="mt-0.5 text-ink-muted">{build.integrity.notFor}</dd>
          </div>
          <div>
            <dt className="font-medium text-ink">
              Verification built into the exercise
            </dt>
            <dd className="mt-0.5 text-ink-muted">
              {build.integrity.verificationStep}
            </dd>
          </div>
        </dl>
        <p className="mt-3 border-t border-verified/30 pt-3 text-xs text-ink-muted">
          This is AI literacy your university should teach but doesn&apos;t.
          Stamped never completes assessed work — you confirm this before
          the entry is stamped.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          Free tools you need
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {build.freeTools.join(" · ")}
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          Nothing paywalled on the core path.
        </p>
      </section>

      {/* The steps are a genuine sequence — numbering carries meaning */}
      <section className="margin-ruled mt-10">
        <h2 className="border-b-2 border-ink pb-2 font-mono text-xs uppercase tracking-widest text-ink">
          The build
        </h2>
        <ol className="mt-2">
          {build.steps.map((step, i) => (
            <li
              key={step}
              className="flex gap-4 border-b border-rule bg-card px-4 py-4 sm:px-6"
            >
              <span className="shrink-0 font-mono text-xs text-biro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-ink">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <CompleteBuildForm
        buildSlug={build.slug}
        moduleCodes={build.moduleCodes}
        artifactPrompt={build.artifactPrompt}
        estMinutes={build.estMinutes}
        competencies={build.competencies}
      />
    </div>
  );
}
