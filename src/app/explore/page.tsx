import type { Metadata } from "next";
import { ExploreView } from "@/components/explore-view";

export const metadata: Metadata = {
  title: "Explore",
  description:
    "Browse Fluent's AI practice builds by course — see what you'd build and which modules it fits, before you sign up.",
};

export default function ExplorePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        Explore
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold text-ink">
        Pick a course, see what you&apos;d build
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-muted">
        Every build is a 25-minute AI practice session mapped to real modules.
        Browse by course to see what&apos;s on offer before you sign up.
      </p>
      <div className="mt-8">
        <ExploreView />
      </div>
    </div>
  );
}
