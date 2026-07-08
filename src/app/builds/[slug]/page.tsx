import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  competencyLabels,
  disciplineLabels,
  getBuildBySlug,
  microBuilds,
} from "@/lib/seed";
import { CompleteBuildForm } from "@/components/complete-build-form";
import { AuthGuard } from "@/components/auth-guard";
import { SITE_URL } from "@/lib/site";

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
  if (!build) return { title: "Build not found" };
  const description = `A ${build.estMinutes}-minute practice build for ${disciplineLabels[build.discipline]} students: ${build.summary}`;
  return {
    title: build.title,
    description,
    alternates: { canonical: `/builds/${build.slug}` },
    openGraph: {
      title: build.title,
      description,
      url: `/builds/${build.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: build.title,
      description,
    },
  };
}

export default async function BuildPage({ params }: PageProps) {
  const { slug } = await params;
  const build = getBuildBySlug(slug);
  if (!build) notFound();

  const learningResource = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: build.title,
    description: build.summary,
    url: `${SITE_URL}/builds/${build.slug}`,
    timeRequired: `PT${build.estMinutes}M`,
    educationalLevel: "Undergraduate",
    teaches: build.competencies.map((c) => competencyLabels[c]),
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: "Fluent", url: SITE_URL },
  };

  return (
    <AuthGuard>
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResource) }}
      />
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        25-min build · {disciplineLabels[build.discipline]}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink">
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
                className="font-mono text-cobalt"
                title={`Training weight ${weight} of 3`}
              >
                {"●".repeat(weight)}
                {"○".repeat(3 - weight)}
              </span>
            </span>
          );
        })}
      </div>

      {/* What you leave with, and why doing beats watching */}
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
            Why do it, not watch it
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {build.whyDoing}
          </p>
        </div>
      </section>

      {/* Ground rules — safe use stated up front, before the steps */}
      <section className="mt-8 border-l-2 border-cobalt bg-cobalt-faint px-4 py-4">
        <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt-deep">
          Ground rules
        </p>
        <dl className="mt-3 flex flex-col gap-3 text-sm leading-relaxed">
          <div>
            <dt className="font-medium text-ink">This build trains</dt>
            <dd className="mt-0.5 text-ink-muted">
              {build.groundRules.trains}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-ink">Never use it for</dt>
            <dd className="mt-0.5 text-ink-muted">
              {build.groundRules.notFor}
            </dd>
          </div>
          <div>
            <dt className="font-medium text-ink">
              The checking habit built in
            </dt>
            <dd className="mt-0.5 text-ink-muted">
              {build.groundRules.builtInCheck}
            </dd>
          </div>
        </dl>
        <p className="mt-3 border-t border-cobalt/20 pt-3 text-xs text-ink-muted">
          These rules are about using AI safely and honestly in your degree.
          Fluent never completes assessed work — you confirm this when you log
          the build.
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
              <span className="shrink-0 font-mono text-xs text-cobalt">
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
        notePrompt={build.notePrompt}
        estMinutes={build.estMinutes}
        competencies={build.competencies}
      />
    </div>
    </AuthGuard>
  );
}
