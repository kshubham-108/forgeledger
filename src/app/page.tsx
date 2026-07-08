import dynamic from "next/dynamic";
import { LazyInlineOnboarding } from "@/components/lazy-inline-onboarding";
import { GatedLink } from "@/components/gated-link";
import { RotatingWord } from "@/components/rotating-word";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const FrontierTicker = dynamic(
  () =>
    import("@/components/frontier-ticker").then((mod) => mod.FrontierTicker),
  {
    loading: () => (
      <div className="border-y border-rule bg-card py-3" aria-hidden="true">
        <div className="mx-auto h-4 w-full max-w-5xl animate-pulse px-6 bg-rule" />
      </div>
    ),
  },
);

/* Honest FAQs — mirrors what UK student sites (Save the Student, UCAS)
   do well: question-format headings answering real objections. Rendered
   on-page and emitted as FAQPage JSON-LD. */
const FAQS = [
  {
    q: "Is Fluent another online AI course?",
    a: "No. Courses give you lectures; Fluent gives you 25-minute practice builds matched to the modules you're actually taking. You do the thing, in your subject, the same week the technique lands.",
  },
  {
    q: "Will Fluent do my assignments for me?",
    a: "Never. Every build trains you to use AI well — checking citations, auditing claims, briefing agents — and each one states up front what it must never be used for. Fluent never completes assessed work.",
  },
  {
    q: "How much does Fluent cost?",
    a: "Fluent is free, and every build runs on free tools. Nothing on the core path is paywalled, so you're never disadvantaged by not affording a subscription.",
  },
  {
    q: "How much time do I need each week?",
    a: "One build takes about 25 minutes. If you work in term time, even one build a week keeps you moving — the weekly plan adapts to the hours you actually have.",
  },
  {
    q: "Do I need to know how to code?",
    a: "No. Builds are designed for your discipline — Psychology, Law, History, Nursing, Business, Economics, Maths, Medicine and more — and most involve no code at all.",
  },
  {
    q: "What happens to my data?",
    a: "Your build log and notes stay on your device in this release. Nothing you write in a build is shared or used to train anything.",
  },
];

const ROTATING_SUBJECTS = [
  "Psychology",
  "Law",
  "History",
  "Nursing",
  "Business",
  "Computing",
  "Economics",
  "Maths",
  "Medicine",
];

function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: "GB",
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
  return (
    <>
      {[organization, website, faqPage].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export default function LandingPage() {
  return (
    <div>
      <StructuredData />

      {/* Hero + inline onboarding */}
      <section className="mx-auto grid w-full max-w-5xl gap-12 px-6 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1fr_22rem]">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
            For UK undergraduates
          </p>
          <h1 className="mt-4 max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-6xl lg:text-[4rem]">
            Get fluent in the latest AI inside your{" "}
            <RotatingWord words={ROTATING_SUBJECTS} />
            <span className="block">degree.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
            Every week, new advances from arXiv and the model labs become
            25-minute practice builds matched to the modules you&rsquo;re
            actually taking. Not another course — practice, in your subject.
          </p>
          <p className="mt-6">
            <GatedLink
              href="/builds/psych-literature-pipeline"
              className="font-mono text-xs text-cobalt hover:text-cobalt-deep"
            >
              See an example build &rarr;
            </GatedLink>
          </p>
        </div>
        <div className="lg:pt-2">
          <LazyInlineOnboarding />
        </div>
      </section>

      {/* This week from the frontier — seeded ticker */}
      <div className="relative">
        <FrontierTicker />
      </div>

      {/* The loop: advance → your module → 25-minute build */}
      <section className="relative mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          How Fluent works
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
          One loop, on repeat: something new lands at the frontier, Fluent maps
          it to your modules, and you practise it the same week.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:gap-0">
          <div className="flex-1 border border-rule bg-card px-5 py-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              01 · A new advance lands
            </p>
            <p className="mt-3 text-sm font-medium leading-snug text-ink">
              Deep-research agents can now run 30-minute multi-source
              investigations unattended.
            </p>
            <p className="mt-2 font-mono text-[11px] text-ink-muted">
              Vendor update · 27 Jun 2026
            </p>
          </div>
          <div className="hidden h-px w-10 shrink-0 self-center border-t border-dashed border-cobalt/50 sm:block" />
          <div className="flex-1 border border-rule bg-card px-5 py-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              02 · Matched to your module
            </p>
            <p className="mt-3 text-sm font-medium leading-snug text-ink">
              Sources and Methods in Modern History — a module you&rsquo;re
              taking this term.
            </p>
            <p className="mt-2 font-mono text-[11px] text-ink-muted">
              HIST2260 · University of Manchester
            </p>
          </div>
          <div className="hidden h-px w-10 shrink-0 self-center border-t border-dashed border-cobalt/50 sm:block" />
          <div className="flex-1 border border-rule bg-card px-5 py-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              03 · You practise it this week
            </p>
            <p className="mt-3 text-sm font-medium leading-snug text-ink">
              Map a historiographical debate with a research agent — 25
              minutes, free tools.
            </p>
            <p className="mt-2">
              <GatedLink
                href="/builds/history-deep-research-map"
                className="font-mono text-[11px] text-cobalt hover:text-cobalt-deep"
              >
                Open this build &rarr;
              </GatedLink>
            </p>
          </div>
        </div>
      </section>

      {/* The teaching gap — HEPI 2025 */}
      <section className="relative border-y border-rule bg-cobalt-faint">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-12 sm:grid-cols-[auto_auto_1fr] sm:items-center sm:gap-12">
          <div>
            <p className="font-display text-5xl font-semibold text-ink">92%</p>
            <p className="mt-1 max-w-[12rem] text-xs leading-relaxed text-ink-muted">
              of UK students already use AI in their studies
            </p>
          </div>
          <div>
            <p className="font-display text-5xl font-semibold text-cobalt">
              36%
            </p>
            <p className="mt-1 max-w-[12rem] text-xs leading-relaxed text-ink-muted">
              have been taught how to use it well
            </p>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-ink">
              The gap isn&rsquo;t access — it&rsquo;s teaching. Lectures move
              at term pace; the frontier moves weekly. Fluent closes the gap
              with practice inside your modules, not another lecture.
            </p>
            <p className="mt-2 font-mono text-[11px] text-ink-muted">
              HEPI Student Generative AI Survey 2025
            </p>
          </div>
        </div>
      </section>

      {/* Why trust Fluent — plain commitments, not badges */}
      <section className="relative border-y border-rule bg-card">
        <div className="mx-auto w-full max-w-5xl px-6 py-16">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Built to be trusted
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Free tools only
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Every build runs on tools with a free tier. You&rsquo;re never
                asked to pay to keep up with classmates who can.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Never does your work
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Each build states what it trains and what it must never be
                used for. Checking, citing and honest use are built into the
                steps — not a policy page.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ink">
                Your log stays yours
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Notes and progress live on your device in this release.
                Nothing is shared, sold, or used to train models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — real objections, question-format headings, backed by JSON-LD */}
      <section
        className="relative mx-auto w-full max-w-5xl px-6 py-16"
        aria-labelledby="faq-heading"
      >
        <h2
          id="faq-heading"
          className="font-mono text-xs uppercase tracking-widest text-ink"
        >
          Common questions
        </h2>
        <dl className="mt-6 grid gap-x-12 gap-y-8 sm:grid-cols-2">
          {FAQS.map((faq) => (
            <div key={faq.q}>
              <dt className="text-sm font-semibold text-ink">{faq.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-muted">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Closing CTA — one action, restated value */}
      <section className="relative border-t border-rule">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-md text-balance font-display text-2xl font-semibold leading-snug text-ink sm:text-3xl">
              This week&rsquo;s advances are already matched to modules.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
              Pick your university and modules above — your first 25-minute
              build is ready today.
            </p>
          </div>
          <GatedLink
            href="/builds/psych-literature-pipeline"
            className="shrink-0 rounded-sm bg-cobalt px-6 py-3 text-sm font-medium text-white hover:bg-cobalt-deep"
          >
            Try an example build
          </GatedLink>
        </div>
      </section>
    </div>
  );
}
