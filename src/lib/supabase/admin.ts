import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/*
  Service-role client — SERVER ONLY, for the cron route handlers.
  Bypasses RLS, so it must never be imported from client components, and
  SUPABASE_SERVICE_ROLE_KEY must never be exposed with a NEXT_PUBLIC_ prefix.
  Returns null when the env vars are missing (demo mode / misconfigured cron).
*/

export function getAdminSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
