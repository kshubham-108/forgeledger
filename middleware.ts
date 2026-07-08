import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/config";

/*
  Standard @supabase/ssr session refresh: re-validates the auth token on
  each request and forwards refreshed cookies to both the server components
  (via the mutated request) and the browser (via the response).

  In demo mode (no Supabase env vars) every request passes through untouched.

  Note: this project is on a Next.js version where the `proxy.ts` rename
  (see next.config docs) is not yet picked up by the file-convention scanner
  — a build with `proxy.ts` produces no `ƒ Proxy` entry at all, while
  `middleware.ts` correctly compiles to `ƒ Proxy (Middleware)`. Keep this
  file named `middleware.ts` with the `middleware` export until upgrading
  past that bug; re-verify with `next build` (look for the `ƒ Proxy` route
  summary line) before ever renaming it again.
*/
export async function middleware(request: NextRequest) {
  const env = getSupabaseEnv();
  if (!env) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(env.url, env.anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  /* Triggers a token refresh if the session has expired. Do not remove. */
  const { data } = await supabase.auth.getUser();

  /* Dashboard is the primary authenticated destination (see AuthNav /
     AuthGuard) — gate it server-side too, so a signed-out direct visit
     redirects immediately instead of flashing the page first. Build pages
     are deliberately left ungated here: they carry SEO/OpenGraph metadata
     and are meant to stay crawlable and shareable; the "try it out" CTAs
     that link to them are gated client-side instead (see GatedLink). */
  if (!data.user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const redirectResponse = NextResponse.redirect(
      new URL("/auth/sign-in", request.url),
    );
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });
    return redirectResponse;
  }

  return response;
}

export const config = {
  /* Everything except static assets and images. */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
