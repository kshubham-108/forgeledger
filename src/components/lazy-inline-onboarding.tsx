"use client";

import dynamic from "next/dynamic";

export const LazyInlineOnboarding = dynamic(
  () =>
    import("@/components/inline-onboarding").then((mod) => mod.InlineOnboarding),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[26rem] rounded-md border-2 border-cobalt bg-card p-6 shadow-[0_8px_32px_-4px_#4a47f025]"
        aria-busy="true"
        aria-label="Loading setup form"
      >
        <div className="h-3 w-32 animate-pulse rounded-sm bg-rule" />
        <div className="mt-5 h-4 w-48 animate-pulse rounded-sm bg-rule" />
        <div className="mt-4 h-10 w-full animate-pulse rounded-sm bg-rule" />
        <div className="mt-auto pt-6">
          <div className="h-11 w-full animate-pulse rounded-sm bg-rule" />
        </div>
      </div>
    ),
  },
);
