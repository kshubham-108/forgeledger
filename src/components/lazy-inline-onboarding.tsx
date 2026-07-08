"use client";

import dynamic from "next/dynamic";

export const LazyInlineOnboarding = dynamic(
  () =>
    import("@/components/inline-onboarding").then((mod) => mod.InlineOnboarding),
  {
    ssr: false,
    loading: () => (
      <div
        className="rounded-md border-2 border-cobalt bg-card p-6 shadow-[0_8px_32px_-4px_#4a47f025]"
        aria-busy="true"
        aria-label="Loading setup form"
      >
        <div className="h-4 w-32 rounded-sm bg-rule" />
        <div className="mt-5 h-10 w-full rounded-sm bg-rule" />
        <div className="mt-4 h-10 w-full rounded-sm bg-rule" />
      </div>
    ),
  },
);
