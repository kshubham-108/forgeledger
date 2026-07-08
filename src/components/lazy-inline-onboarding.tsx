"use client";

import dynamic from "next/dynamic";

export const LazyInlineOnboarding = dynamic(
  () =>
    import("@/components/inline-onboarding").then((mod) => mod.InlineOnboarding),
  {
    ssr: false,
    loading: () => (
      <div
        className="border-2 border-ink bg-card px-5 py-6"
        aria-busy="true"
        aria-label="Loading setup form"
      >
        <div className="h-4 w-32 animate-pulse rounded-sm bg-rule" />
        <div className="mt-5 h-10 w-full animate-pulse rounded-sm bg-rule" />
        <div className="mt-4 h-10 w-full animate-pulse rounded-sm bg-rule" />
      </div>
    ),
  },
);
