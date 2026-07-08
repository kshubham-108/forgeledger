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
      <div className="border-y border-cobalt-soft bg-card py-10" aria-hidden="true" />
    ),
  },
);

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

const LOOP_CARDS = [
  {
    num: "01 · A new advance lands",
    body: "Deep-research agents can now run 30-minute multi-source investigations unattended.",
    meta: "Vendor update · 27 Jun 2026",
    link: null,
  },
  {
    num: "02 · Matched to your module",
    body: "Sources and Methods in Modern History — a module you're taking this term.",
    meta: "HIST2260 · University of Manchester",
    link: null,
  },
  {
    num: "03 · You practise it this week",
    body: "Map a historiographical debate with a research agent — 25 minutes, free tools.",
    meta: null,
    link: { href: "/builds/history-deep-research-map", label: "Open this build →" },
  },
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

function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute -top-20 right-[30%] h-[30rem] w-[30rem] rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle, #7b78ff30 0%, #4a47f000 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-0 -left-10 h-[22.5rem] w-[22.5rem] rounded-full opacity-90"
        style={{
          background:
            "radial-gradient(circle, #4a47f022 0%, #4a47f000 70%)",
          filter: "blur(50px)",
        }}
      />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div>
      <StructuredData />

      {/* Hero + inline onboarding */}
      <section className="relative">
        <HeroBackdrop />
        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-12 pb-12 pt-12 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cobalt-deep">
              For UK undergraduates
            </p>
            <h1 className="mt-5 max-w-[680px] font-display text-[2.75rem] font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-[3.25rem]">
              Get fluent in the latest AI inside your{" "}
              <span className="inline-flex flex-wrap items-end gap-2.5">
                <RotatingWord words={ROTATING_SUBJECTS} />
                <span>degree.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-[480px] text-base leading-relaxed text-ink-muted">
              Every week, new advances from arXiv and the model labs become
              25-minute practice builds matched to the modules you&rsquo;re
              actually taking. Not another course — practice, in your subject.
            </p>
            <p className="mt-5">
              <GatedLink
                href="/builds/psych-literature-pipeline"
                className="font-mono text-xs text-cobalt-glow hover:text-cobalt-deep"
              >
                See an example build &rarr;
              </GatedLink>
            </p>
          </div>
          <div className="lg:pt-0">
            <LazyInlineOnboarding />
          </div>
        </div>
      </section>

      <FrontierTicker />

      {/* How Fluent works */}
      <section className="mx-auto w-full max-w-7xl px-12 py-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          How Fluent works
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink-muted">
          One loop, on repeat: something new lands at the frontier, Fluent maps
          it to your modules, and you practise it the same week.
        </p>
        <div className="mt-8 flex flex-col gap-4 lg:flex-row">
          {LOOP_CARDS.map((card) => (
            <div
              key={card.num}
              className="flex-1 rounded-sm border border-cobalt-soft border-l-[3px] border-l-cobalt-soft bg-card p-5 shadow-[0_2px_12px_-2px_#4a47f018]"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt-deep">
                {card.num}
              </p>
              <p className="mt-3 text-sm leading-snug text-ink">{card.body}</p>
              {card.meta ? (
                <p className="mt-2 font-mono text-[11px] text-ink-muted">
                  {card.meta}
                </p>
              ) : null}
              {card.link ? (
                <p className="mt-2">
                  <GatedLink
                    href={card.link.href}
                    className="font-mono text-[11px] text-cobalt hover:text-cobalt-deep"
                  >
                    {card.link.label}
                  </GatedLink>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* HEPI stats */}
      <section className="border-y border-cobalt-soft bg-gradient-to-b from-cobalt-faint via-cobalt-soft to-mist">
        <div className="mx-auto grid w-full max-w-7xl gap-12 px-12 py-12 sm:grid-cols-[auto_auto_1fr] sm:items-center">
          <div>
            <p className="font-display text-5xl font-semibold text-ink">92%</p>
            <p className="mt-2 max-w-[11rem] text-xs leading-relaxed text-ink-muted">
              of UK students already use AI in their studies
            </p>
          </div>
          <div>
            <p className="font-display text-5xl font-semibold text-cobalt-deep">
              36%
            </p>
            <p className="mt-2 max-w-[11rem] text-xs leading-relaxed text-ink-muted">
              have been taught how to use it well
            </p>
          </div>
          <div className="max-w-md">
            <p className="text-sm leading-relaxed text-ink">
              The gap isn&rsquo;t access — it&rsquo;s teaching. Lectures move at
              term pace; the frontier moves weekly. Fluent closes the gap with
              practice inside your modules, not another lecture.
            </p>
            <p className="mt-2 font-mono text-[11px] text-cobalt-deep">
              HEPI Student Generative AI Survey 2025
            </p>
          </div>
        </div>
      </section>

      {/* Built to be trusted */}
      <section className="border-y border-cobalt-soft bg-mist">
        <div className="mx-auto w-full max-w-7xl px-12 py-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Built to be trusted
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              {
                title: "Free tools only",
                body: "Every build runs on tools with a free tier. You're never asked to pay to keep up with classmates who can.",
              },
              {
                title: "Never does your work",
                body: "Each build states what it trains and what it must never be used for. Checking, citing and honest use are built into the steps — not a policy page.",
              },
              {
                title: "Your log stays yours",
                body: "Notes and progress live on your device in this release. Nothing is shared, sold, or used to train models.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-sm border border-cobalt-soft bg-card p-5"
              >
                <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="bg-paper-warm"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto w-full max-w-7xl px-12 py-12">
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
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-cobalt-deep bg-gradient-to-br from-header to-[#1a2550]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-12 py-12 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="max-w-lg font-display text-[1.75rem] font-semibold leading-tight text-paper">
              This week&rsquo;s advances are already matched to modules.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper/70">
              Pick your university and modules above — your first 25-minute
              build is ready today.
            </p>
          </div>
          <GatedLink
            href="/builds/psych-literature-pipeline"
            className="shrink-0 rounded-sm bg-gradient-to-b from-cobalt-glow via-cobalt to-cobalt-deep px-6 py-3 text-sm font-medium text-white shadow-[0_4px_16px_#4a47f050] hover:opacity-95"
          >
            Try an example build
          </GatedLink>
        </div>
      </section>
    </div>
  );
}
