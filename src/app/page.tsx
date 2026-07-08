import Link from "next/link";
import { FrontierTicker } from "@/components/frontier-ticker";
import { InlineOnboarding } from "@/components/inline-onboarding";
import { RotatingWord } from "@/components/rotating-word";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

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

/* What you'll be able to do — one line per discipline, tied to a real build. */
const CAPABILITIES = [
  {
    code: "PSYC2017",
    line: "Run an AI literature search — and catch every citation it invents.",
    slug: "psych-literature-pipeline",
  },
  {
    code: "LAW2041",
    line: "Spot fabricated case law before it reaches your notes.",
    slug: "law-issue-spotting-chain",
  },
  {
    code: "HIST2260",
    line: "Brief a deep-research agent well — and see where it flattens the debate.",
    slug: "history-deep-research-map",
  },
  {
    code: "COMP2001",
    line: "Make a coding agent write to your spec, tests first.",
    slug: "cs-data-cleaner",
  },
  {
    code: "NURS2301",
    line: "Check AI-drafted patient information claim by claim, the NHS way.",
    slug: "nursing-patient-leaflet",
  },
  {
    code: "BMAN2011",
    line: "Build analysis workflows where every number has a source.",
    slug: "business-competitor-scan",
  },
  {
    code: "ECON2237",
    line: "Interrogate the assumptions baked into an AI data interpretation.",
    slug: "econ-model-assumption-audit",
  },
  {
    code: "MATH2148",
    line: "Hunt down the invalid step in an AI-generated proof.",
    slug: "maths-proof-checker",
  },
  {
    code: "MED2269",
    line: "Check every clinical claim against NICE and Cochrane before it counts.",
    slug: "medicine-differential-check",
  },
];

/*
  Quiet animated backdrop: ruled paper drifting very slowly, two soft
  cobalt washes floating on long offsets, a signal sweep line passing
  through every few seconds, and a scatter of technical-drawing glyphs
  (dotted circle, dashed ring, crosshairs, asterisk, diamond, orbit dot)
  floating on staggered loops. Decorative, behind the content, frozen for
  prefers-reduced-motion.
*/
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="backdrop-rules absolute inset-0" />
      <div className="backdrop-wash" />
      <div className="backdrop-wash-b" />
      <div className="backdrop-sweep" />

      {/* Dotted circle — upper middle, slow clockwise spin */}
      <svg
        className="glyph glyph-spin"
        style={{ top: "7%", left: "51%", width: 64, height: 64, animationDuration: "42s" }}
        viewBox="0 0 64 64"
      >
        <circle
          cx="32"
          cy="32"
          r="27"
          fill="none"
          stroke="var(--color-cobalt)"
          strokeWidth="1.5"
          strokeDasharray="0.1 8.5"
          strokeLinecap="round"
          opacity="0.16"
        />
      </svg>

      {/* Crosshair — left margin of the hero, gentle float */}
      <svg
        className="glyph glyph-float"
        style={{ top: "30%", left: "3%", width: 26, height: 26, animationDuration: "17s" }}
        viewBox="0 0 26 26"
      >
        <g stroke="var(--color-ink)" strokeWidth="1.2" opacity="0.14">
          <line x1="13" y1="0" x2="13" y2="26" />
          <line x1="0" y1="13" x2="26" y2="13" />
          <circle cx="13" cy="13" r="5" fill="none" />
        </g>
      </svg>

      {/* Orbit dot — right edge, dot circles a faint track */}
      <svg
        className="glyph glyph-spin"
        style={{ top: "22%", right: "2%", width: 72, height: 72, animationDuration: "24s" }}
        viewBox="0 0 72 72"
      >
        <circle
          cx="36"
          cy="36"
          r="30"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1"
          opacity="0.1"
        />
        <circle cx="36" cy="6" r="3" fill="var(--color-cobalt)" opacity="0.3" />
      </svg>

      {/* Asterisk — drifts near the ticker, slight rotation */}
      <svg
        className="glyph glyph-drift"
        style={{ top: "44%", left: "8%", width: 32, height: 32, animationDuration: "26s" }}
        viewBox="0 0 32 32"
      >
        <g
          stroke="var(--color-cobalt)"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.18"
        >
          <line x1="16" y1="3" x2="16" y2="29" />
          <line x1="4.7" y1="9.5" x2="27.3" y2="22.5" />
          <line x1="4.7" y1="22.5" x2="27.3" y2="9.5" />
        </g>
      </svg>

      {/* Diamond (square at 45°) — right margin, mid-page */}
      <svg
        className="glyph glyph-float"
        style={{ top: "52%", right: "5%", width: 40, height: 40, animationDuration: "21s", animationDelay: "-7s" }}
        viewBox="0 0 40 40"
      >
        <path
          d="M20 3 L37 20 L20 37 L3 20 Z"
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="1.2"
          opacity="0.12"
        />
      </svg>

      {/* Dashed ring — lower left, slow counter-clockwise spin */}
      <svg
        className="glyph glyph-spin-reverse"
        style={{ top: "68%", left: "4%", width: 80, height: 80, animationDuration: "52s" }}
        viewBox="0 0 80 80"
      >
        <circle
          cx="40"
          cy="40"
          r="34"
          fill="none"
          stroke="var(--color-cobalt)"
          strokeWidth="1.4"
          strokeDasharray="10 8"
          opacity="0.14"
        />
      </svg>

      {/* Small plus — lower middle, gentle drift */}
      <svg
        className="glyph glyph-drift"
        style={{ top: "82%", left: "47%", width: 22, height: 22, animationDuration: "19s", animationDelay: "-4s" }}
        viewBox="0 0 22 22"
      >
        <g stroke="var(--color-cobalt)" strokeWidth="1.6" strokeLinecap="round" opacity="0.16">
          <line x1="11" y1="2" x2="11" y2="20" />
          <line x1="2" y1="11" x2="20" y2="11" />
        </g>
      </svg>
    </div>
  );
}

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
    <div className="relative">
      <StructuredData />
      <Backdrop />

      {/* Hero + inline onboarding */}
      <section className="relative mx-auto grid w-full max-w-5xl gap-12 px-6 pb-16 pt-12 sm:pt-16 lg:grid-cols-[1fr_22rem]">
        <div className="stagger">
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
            <Link
              href="/builds/psych-literature-pipeline"
              className="font-mono text-xs text-cobalt hover:text-cobalt-deep"
            >
              See an example build &rarr;
            </Link>
          </p>
        </div>
        <div className="lg:pt-2">
          <InlineOnboarding />
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
          <div className="loop-connector hidden h-px w-10 shrink-0 self-center sm:block" />
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
          <div className="loop-connector hidden h-px w-10 shrink-0 self-center sm:block" />
          <div className="flex-1 border border-rule bg-card px-5 py-5">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              03 · You practise it this week
            </p>
            <p className="mt-3 text-sm font-medium leading-snug text-ink">
              Map a historiographical debate with a research agent — 25
              minutes, free tools.
            </p>
            <p className="mt-2">
              <Link
                href="/builds/history-deep-research-map"
                className="font-mono text-[11px] text-cobalt hover:text-cobalt-deep"
              >
                Open this build &rarr;
              </Link>
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

      {/* What you'll be able to do */}
      <section className="relative mx-auto w-full max-w-5xl px-6 py-16">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            What you&rsquo;ll be able to do
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            25 min each · free tools
          </span>
        </div>
        <ul>
          {CAPABILITIES.map((cap) => (
            <li
              key={cap.slug + cap.code}
              className="flex flex-col gap-2 border-b border-rule bg-card px-4 py-4 sm:flex-row sm:items-center sm:gap-4 sm:px-6"
            >
              <span className="w-24 shrink-0 rounded-sm bg-cobalt-faint px-1.5 py-0.5 text-center font-mono text-[11px] text-cobalt-deep">
                {cap.code}
              </span>
              <p className="min-w-0 flex-1 text-sm text-ink">{cap.line}</p>
              <Link
                href={`/builds/${cap.slug}`}
                className="shrink-0 font-mono text-xs text-cobalt hover:text-cobalt-deep"
              >
                Try the build &rarr;
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-ink-muted">
          Skills are self-paced and logged privately for your own reference —
          this is about what you can do, not what you can show.
        </p>
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
          <Link
            href="/builds/psych-literature-pipeline"
            className="shrink-0 rounded-sm bg-cobalt px-6 py-3 text-sm font-medium text-white hover:bg-cobalt-deep"
          >
            Try an example build
          </Link>
        </div>
      </section>
    </div>
  );
}
