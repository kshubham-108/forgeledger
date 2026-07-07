import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

/* POST /auth/sign-out — clears the session and returns home. */
export async function POST(request: Request) {
  const supabase = await getServerSupabase();
  if (supabase) {
    await supabase.auth.signOut();
  }
  /* 303 turns the POST into a GET for the redirect target. */
  return NextResponse.redirect(new URL("/", request.url), { status: 303 });
}
