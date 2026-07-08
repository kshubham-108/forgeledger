import type { Metadata } from "next";
import { AuthGuard } from "@/components/auth-guard";
import { LazyWeeklyPlan } from "@/components/lazy-weekly-plan";
import { SignOutButton } from "@/components/sign-out-button";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Your weekly AI practice plan, builds matched to your modules, your build log, and the latest advances in your field.",
  robots: { index: false },
};

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <LazyWeeklyPlan />
        <SignOutButton />
      </div>
    </AuthGuard>
  );
}
