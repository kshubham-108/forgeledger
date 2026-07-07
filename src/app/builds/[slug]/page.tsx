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
  return { title: build ? `${build.title} — ForgeLedger` : "ForgeLedger" };
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
        {build.competencies.map((c) => (
          <span
            key={c}
            className="rounded-sm border border-rule bg-card px-2 py-1 text-[11px] text-ink"
          >
            {competencyLabels[c]}
          </span>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          Free tools you need
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          {build.freeTools.join(" · ")}
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

      <section className="mt-8 border-l-2 border-verified bg-verified-faint px-4 py-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-verified">
          Integrity note
        </p>
        <p className="mt-1 text-sm leading-relaxed text-ink">
          {build.ethicsNote}
        </p>
      </section>

      <CompleteBuildForm
        buildSlug={build.slug}
        moduleCodes={build.moduleCodes}
        artifactPrompt={build.artifactPrompt}
        estMinutes={build.estMinutes}
      />
    </div>
  );
}
