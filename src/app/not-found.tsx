import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-start px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        404
      </p>
      <h1 className="mt-3 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        This page didn&rsquo;t make the syllabus.
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-muted">
        Whatever you were looking for isn&rsquo;t here — it may have moved,
        or the link was off. Try one of these instead.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="rounded-sm bg-cobalt px-5 py-2.5 text-sm font-medium text-white hover:bg-cobalt-deep"
        >
          Back home
        </Link>
        <Link
          href="/builds"
          className="rounded-sm border border-rule bg-card px-5 py-2.5 text-sm font-medium text-ink hover:border-ink-muted"
        >
          Browse all builds
        </Link>
      </div>
    </div>
  );
}
