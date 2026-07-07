import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";

/*
  Server-side Supabase client for server components, server actions, and
  route handlers. Reads the session from request cookies.
  Returns null in demo mode (no env vars).
*/

export async function getServerSupabase(): Promise<SupabaseClient | null> {
  const env = getSupabaseEnv();
  if (!env) return null;

  const cookieStore = await cookies();

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          /*
            cookies() is read-only inside server components. Safe to ignore:
            middleware.ts refreshes sessions, so tokens never go stale here.
          */
        }
      },
    },
  });
}
