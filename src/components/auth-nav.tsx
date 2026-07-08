"use client";

import Link from "next/link";
import { useEffect } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuthUser } from "@/lib/use-auth";

/*
  Auth corner of the header. Renders nothing in demo mode, so the layout
  stays exactly as before when Supabase isn't configured. Also the single
  place that kicks off the local ↔ Supabase sync when a session appears.
*/
export function AuthNav() {
  const { user, ready } = useAuthUser();

  useEffect(() => {
    void import("@/lib/data-bridge").then((bridge) => {
      if (user) {
        void bridge.syncWithSupabase();
      } else {
        bridge.resetSyncState();
      }
    });
  }, [user]);

  if (!isSupabaseConfigured() || !ready) return null;

  if (user === null) {
    return (
      <Link href="/auth/sign-in" className="text-cobalt-glow hover:text-paper">
        Sign in
      </Link>
    );
  }

  return (
    <Link href="/dashboard" className="text-cobalt-glow hover:text-paper">
      My Dashboard
    </Link>
  );
}
