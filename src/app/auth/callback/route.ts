import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

/*
  Email-confirmation / magic-link landing: exchanges the ?code= for a
  session cookie, then sends the user on. No-ops safely in demo mode.
*/
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        return NextResponse.redirect(new URL("/auth/sign-in", requestUrl.origin));
      }
    }
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
