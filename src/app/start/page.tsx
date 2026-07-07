import type { Metadata } from "next";
import { OnboardingWizard } from "@/components/onboarding-wizard";

export const metadata: Metadata = {
  title: "Open your ledger — ForgeLedger",
};

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-biro">
        Open a ledger
      </p>
      <h1 className="mt-3 font-display text-3xl text-ink">
        Three steps, then your first build
      </h1>
      <OnboardingWizard />
    </div>
  );
}
