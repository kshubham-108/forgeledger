import { InlineOnboarding } from "@/components/inline-onboarding";

export default function StartPage() {
  return (
    <div className="mx-auto w-full max-w-xl px-6 py-16 sm:py-24">
      <h1 className="font-display text-3xl text-ink">Open your ledger</h1>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted">
        Three quick questions so your builds match the modules you&rsquo;re
        actually on.
      </p>
      <div className="mt-8">
        <InlineOnboarding />
      </div>
    </div>
  );
}
