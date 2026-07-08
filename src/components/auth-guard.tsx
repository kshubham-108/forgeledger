"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuthUser } from "@/lib/use-auth";

/*
  Demo mode (no Supabase configured) has no real accounts to gate behind —
  matches the onboarding widget's own rule (see InlineOnboarding's
  `needsAuthGate`) so a demo user who just onboarded locally can still
  reach their dashboard instead of bouncing off a non-functional sign-in
  page. Once Supabase is configured, this becomes a real auth gate.
*/
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, ready } = useAuthUser();

  useEffect(() => {
    if (!ready) return;
    const needsAuth = isSupabaseConfigured() && user === null;
    if (needsAuth) {
      router.replace("/auth/sign-in");
    }
  }, [user, ready, router]);

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-7xl px-12 py-12">
        <p className="text-sm text-ink-muted">Loading…</p>
      </div>
    );
  }

  const needsAuth = isSupabaseConfigured() && user === null;
  if (needsAuth) return null;

  return <>{children}</>;
}
