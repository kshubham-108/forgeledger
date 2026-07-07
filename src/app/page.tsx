import Link from "next/link";

/*
  Animated backdrop: ruled paper slowly panning, two soft ink washes
  drifting, and a large stamp ring turning very slowly. All decorative,
  all behind the content, all disabled for prefers-reduced-motion.
*/
function Backdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="backdrop-rules absolute inset-0" />
      <div className="backdrop-margin absolute inset-y-0" />
      <div className="backdrop-wash backdrop-wash-a" />
      <div className="backdrop-wash backdrop-wash-b" />
      <div className="backdrop-stamp-ring" />
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="relative flex min-h-[78vh] items-center">
      <Backdrop />

      <section className="relative mx-auto w-full max-w-5xl px-6 py-20">
        <p className="font-mono text-xs uppercase tracking-widest text-biro">
          For UK undergraduates
        </p>
        <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl leading-[1.12] text-ink sm:text-6xl">
          The AI skills your course doesn&rsquo;t teach. Proof that you have
          them.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
          Each week, new AI advances become 25-minute builds matched to the
          modules you&rsquo;re actually taking. Finish one and it&rsquo;s in
          your ledger &mdash; evidence you can put on a CV.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link
            href="/start"
            className="rounded-sm bg-biro px-6 py-3 text-sm font-medium text-white hover:bg-biro-deep"
          >
            Open your ledger
          </Link>
          <Link
            href="/builds/psych-literature-pipeline"
            className="font-mono text-xs text-biro hover:text-biro-deep"
          >
            See an example build &rarr;
          </Link>
        </div>
        <p className="mt-16 max-w-md border-t border-rule pt-4 text-xs leading-relaxed text-ink-muted">
          Stamped never writes assessed work. Every entry says exactly what it
          is &mdash; self-assessed, or with your work attached.
        </p>
      </section>
    </div>
  );
}
