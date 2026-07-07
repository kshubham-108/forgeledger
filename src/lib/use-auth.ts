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
