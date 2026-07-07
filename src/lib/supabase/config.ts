/*
  Central env guard for Supabase.

  The app must run fine with NO env vars at all (demo mode: localStorage
  store). Every Supabase-touching module calls one of these helpers and
  no-ops / returns null when unconfigured — nothing creates a client at
  module top level.

  Note: NEXT_PUBLIC_* vars are inlined at build time, so they must be read
  via direct property access (process.env.NEXT_PUBLIC_X), never dynamically.
*/

export type SupabaseEnv = {
  url: string;
  anonKey: string;
};

/** Returns the public Supabase env pair, or null when not configured. */
export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/** True when the public Supabase env vars are present (accounts enabled). */
export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null;
}
