import Link from "next/link";
import { LedgerRow } from "@/components/ledger-row";

const sampleEntries = [
  {
    serial: "FL-0007",
    title: "Literature search pipeline with a hallucination audit",
    moduleCode: "PSYC2017",
    competencies: ["prompt-craft", "evaluation", "ethics-citation"] as const,
    date: "3 Jul 2026",
    minutes: 25,
  },
  {
    serial: "FL-0006",
    title: "Case-brief issue-spotting chain with a source audit",
    moduleCode: "LAW2041",
    competencies: ["prompt-craft", "ethics-citation"] as const,
    date: "26 Jun 2026",
    minutes: 30,
  },
  {
    serial: "FL-0005",
    title: "Primary-source comparison with a correction log",
    moduleCode: "HIST2260",
    competencies: ["evaluation", "workflow-design"] as const,
    date: "19 Jun 2026",
    minutes: 25,
  },
];

const steps = [
  {
    heading: "Pick your modules",
    body: "Choose your university and the modules you are actually taking this term. Everything you build maps back to them.",
  },
  {
    heading: "Complete a 25-minute build",
    body: "Each micro-build is a real workflow in your discipline — a prompt chain, an audit, a template — with the verification done by you.",
  },
  {
    heading: "It goes in your ledger",
    body: "Every build is stamped with a serial, your module code, and the competencies it proves. Export it when you graduate.",
  },
];

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6">
      {/* Hero: thesis + live ledger fragment */}
      <section className="py-14 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-biro">
          For UK undergraduates
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-ink sm:text-5xl">
          92% of students use AI.{" "}
          <span className="mark-swipe">Almost none can prove it.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted">
          ForgeLedger turns weekly AI advances into short builds mapped to your
          real university modules — and keeps a stamped record of every one you
          complete. Not a course. A ledger.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/start"
            className="rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep"
          >
            Open your ledger
          </Link>
          <span className="font-mono text-xs text-ink-muted">
            Free · 2 universities · 6 disciplines in the pilot
          </span>
        </div>
      </section>

      {/* Live ledger fragment */}
      <section aria-label="Example ledger entries" className="margin-ruled pb-14">
        <div className="flex items-baseline justify-between border-b-2 border-ink pb-2">
          <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
            Ledger · extract
          </h2>
          <span className="font-mono text-xs text-ink-muted">
            entries 5–7 of 7
          </span>
        </div>
        <ul>
          {sampleEntries.map((entry) => (
            <LedgerRow
              key={entry.serial}
              serial={entry.serial}
              title={entry.title}
              moduleCode={entry.moduleCode}
              competencies={[...entry.competencies]}
              date={entry.date}
              minutes={entry.minutes}
              animate
            />
          ))}
        </ul>
      </section>

      {/* How it works — a genuine sequence, so numbering is earned */}
      <section className="border-t border-rule py-14">
        <h2 className="font-display text-2xl text-ink">How it works</h2>
        <ol className="mt-8 grid gap-8 sm:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.heading}>
              <span className="font-mono text-xs text-biro">
                Step {i + 1} of 3
              </span>
              <h3 className="mt-2 text-base font-semibold text-ink">
                {step.heading}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Integrity line */}
      <section className="border-t border-rule py-10">
        <p className="max-w-2xl text-sm leading-relaxed text-ink-muted">
          Every build trains you to verify AI output — checking citations,
          auditing claims, correcting its reading. ForgeLedger never writes
          assessed work.{" "}
          <span className="text-ink">
            The verification is the skill employers want.
          </span>
        </p>
      </section>
    </div>
  );
}
