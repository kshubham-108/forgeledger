"use client";

import dynamic from "next/dynamic";

export const LazyWeeklyPlan = dynamic(
  () => import("@/components/weekly-plan").then((mod) => mod.WeeklyPlan),
  {
    ssr: false,
    loading: () => (
      <div className="py-12" aria-busy="true" aria-label="Loading your week">
        <div className="h-4 w-24 animate-pulse rounded-sm bg-rule" />
        <div className="mt-4 h-10 w-64 animate-pulse rounded-sm bg-rule" />
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="h-20 animate-pulse border border-rule bg-card" />
          <div className="h-20 animate-pulse border border-rule bg-card" />
          <div className="h-20 animate-pulse border border-rule bg-card" />
        </div>
      </div>
    ),
  },
);
