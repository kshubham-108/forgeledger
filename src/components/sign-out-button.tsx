"use client";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useAuthUser } from "@/lib/use-auth";
import { clearLocalData } from "@/lib/store";

/*
  Bottom-of-page sign out. Renders nothing in demo mode or when signed out,
  matching AuthNav's Supabase gate.
*/
export function SignOutButton() {
  const { user, ready } = useAuthUser();

  if (!isSupabaseConfigured() || !ready || user === null) return null;

  return (
    <div className="mt-12 border-t border-rule pt-6">
      {/* Clears the local profile/log before the form's normal POST navigates
          away — otherwise the landing page's "welcome back" widget would
          keep reading the signed-out student's cached profile. */}
      <form
        action="/auth/sign-out"
        method="post"
        onSubmit={() => clearLocalData()}
      >
        <button
          type="submit"
          className="text-sm text-ink-muted hover:text-cobalt"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
