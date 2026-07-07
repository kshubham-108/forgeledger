import type { Metadata } from "next";
import { WeeklyPlan } from "@/components/weekly-plan";

export const metadata: Metadata = {
  title: "This week — Stamped",
};

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <WeeklyPlan />
    </div>
  );
}
