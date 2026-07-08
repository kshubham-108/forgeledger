import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";

const description =
  "Why Fluent exists: UK students are using AI faster than universities can teach it. Fluent turns this week's AI advances into 25-minute practice builds matched to the modules you're actually taking.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Fluent",
    description,
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About Fluent",
    description,
  },
};

function StructuredData() {
  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Fluent",
    description,
    url: `${SITE_URL}/about`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPage) }}
    />
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <StructuredData />
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        Why Fluent exists
      </p>
      <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        The frontier moves weekly. Your syllabus doesn&rsquo;t.
      </h1>
      <p className="mt-5 text-sm leading-relaxed text-ink-muted">
        Fluent is a practice layer, not a course. It watches the AI frontier
        for you, matches what lands to the modules you&rsquo;re actually
        taking, and turns it into something you do in 25 minutes — not
        something you watch someone else do.
      </p>

      <section className="mt-10 border-y border-rule bg-cobalt-faint px-5 py-8 sm:px-8">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink">
          The problem
        </h2>
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:gap-10">
          <div>
            <p className="font-display text-4xl font-semibold text-ink">
              92%
            </p>
            <p className="mt-1 max-w-[13rem] text-xs leading-relaxed text-ink-muted">
              of UK students already use AI in their studies
            </p>
          </div>
          <div>
            <p className="font-display text-4xl font-semibold text-cobalt">
              36%
            </p>
            <p className="mt-1 max-w-[13rem] text-xs leading-relaxed text-ink-muted">
              have been taught how to use it well
            </p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-relaxed text-ink">
          That gap isn&rsquo;t about access. Nearly everyone already has
          ChatGPT open. It&rsquo;s about teaching: lectures move at term
          pace, module handbooks update once a year if at all, and the
          frontier moves every week. Most students end up with chat habits —
          summarising, explaining — instead of discipline-specific workflows
          they can actually rely on.
        </p>
        <p className="mt-3 font-mono text-[11px] text-ink-muted">
          HEPI Student Generative AI Survey 2025
        </p>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          How Fluent closes it
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          One loop, on repeat, for every module you take:
        </p>
        <ol className="mt-5 flex flex-col gap-4">
          <li className="border border-rule bg-card px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              01 · A new advance lands
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              A paper, a model release, a tool update — Fluent watches arXiv
              and the model labs so you don&rsquo;t have to.
            </p>
          </li>
          <li className="border border-rule bg-card px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              02 · Matched to your module
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              It&rsquo;s mapped to the specific module you&rsquo;re taking
              this term — not a generic &ldquo;AI for students&rdquo;
              category.
            </p>
          </li>
          <li className="border border-rule bg-card px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
              03 · You practise it this week
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">
              A 25-minute build, on your subject&rsquo;s actual material,
              with free tools — logged privately so you can see what
              you&rsquo;ve built up over the term.
            </p>
          </li>
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          What Fluent deliberately isn&rsquo;t
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Not another course
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              No lecture videos, no modules to sit through. Every build is
              something you do, on material from your own degree, the same
              week the technique behind it lands.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">
              Never does your work
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Fluent trains you to use AI well — checking citations, auditing
              claims, briefing agents — and states up front what each build
              must never be used for. It never completes assessed work.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          Who it&rsquo;s for
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          UK undergraduates in any discipline — Psychology, Law, History,
          Nursing, Business, Computer Science, Economics, Maths, Medicine and
          more. You don&rsquo;t need to know how to code, and you don&rsquo;t
          need more than a spare 25 minutes a week to keep moving.
        </p>
      </section>

      <section className="mt-10 border-t border-rule pt-8">
        <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
          What&rsquo;s next
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Fluent launches with a pilot catalogue — 25 UK universities, nine
          courses, and a module hand-picked for each one they teach. More
          universities and modules are added every term, and a &ldquo;paste
          your syllabus&rdquo; flow is on the way so any module can be
          matched, not just the ones we&rsquo;ve seeded by hand.
        </p>
        <p className="mt-6 text-sm">
          <Link
            href="/builds"
            className="font-mono text-xs text-cobalt hover:text-cobalt-deep"
          >
            Browse every build &rarr;
          </Link>
        </p>
      </section>
    </div>
  );
}
