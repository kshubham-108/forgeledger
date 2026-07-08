"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuthUser } from "@/lib/use-auth";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, ready } = useAuthUser();

  useEffect(() => {
    if (!ready) return;
    const needsAuth = isSupabaseConfigured() ? user === null : true;
    if (needsAuth) {
      router.replace("/auth/sign-in");
    }
  }, [user, ready, router]);

  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <p className="text-sm text-ink-muted">Loading…</p>
      </div>
    );
  }

  const needsAuth = isSupabaseConfigured() ? user === null : true;
  if (needsAuth) return null;

  return <>{children}</>;
}
