"use client";

import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { getBrowserSupabase } from "./supabase/client";
import { isSupabaseConfigured } from "./supabase/config";

/*
  Client-side auth state. In demo mode (no Supabase env vars) this resolves
  immediately to { user: null, ready: true } and never touches the network.
*/
export function useAuthUser(): { user: User | null; ready: boolean } {
  const [user, setUser] = useState<User | null>(null);
  /* Demo mode has no session to wait for — ready from the first render. */
  const [ready, setReady] = useState(() => !isSupabaseConfigured());

  useEffect(() => {
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    let cancelled = false;
    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setUser(data.session?.user ?? null);
      setReady(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        setReady(true);
      },
    );

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return { user, ready };
}

/* The name captured at sign-up (auth-form.tsx writes it to user_metadata as
   display_name) — the one reliable source for a student's real name, as
   opposed to profile rows that may have been backfilled from an email
   address. */
export function getAuthDisplayName(
  user: Pick<User, "user_metadata"> | null | undefined,
): string | undefined {
  const value = user?.user_metadata?.display_name;
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

function isEmailLocalPart(name: string, email: string | undefined): boolean {
  if (!email) return false;
  const prefix = email.split("@")[0]?.toLowerCase();
  return prefix !== undefined && name.toLowerCase() === prefix;
}

/* First name for "Welcome back, …" — prefers auth metadata over a cached
   profile name that may be the email username (jn24882-style DB fallback). */
export function getWelcomeFirstName(
  user: Pick<User, "user_metadata" | "email"> | null | undefined,
  fallbackDisplayName?: string,
): string {
  const authName = getAuthDisplayName(user);
  let fullName = authName;

  if (!fullName && fallbackDisplayName) {
    const fallback = fallbackDisplayName.trim();
    if (fallback && !isEmailLocalPart(fallback, user?.email)) {
      fullName = fallback;
    }
  }

  if (!fullName) return "Student";

  const first = fullName.split(/\s+/)[0];
  return first !== "" ? first : "Student";
}
