"use client";

import Link from "next/link";
import { useEffect } from "react";
import { resetSyncState, syncWithSupabase } from "@/lib/data-bridge";
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
    if (user) {
      void syncWithSupabase();
    } else {
      resetSyncState();
    }
  }, [user]);

  if (!isSupabaseConfigured() || !ready) return null;

  if (user === null) {
    return (
      <Link href="/auth/sign-in" className="text-paper/75 hover:text-paper">
        Sign in
      </Link>
    );
  }

  return (
    <form method="post" action="/auth/sign-out">
      <button
        type="submit"
        className="cursor-pointer text-sm text-paper/75 hover:text-paper"
      >
        Sign out
      </button>
    </form>
  );
}
