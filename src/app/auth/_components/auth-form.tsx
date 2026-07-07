"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserSupabase } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";

const copy: Record<
  Mode,
  { heading: string; sub: string; cta: string; busy: string }
> = {
  "sign-in": {
    heading: "Sign in",
    sub: "Pick up where you left off.",
    cta: "Sign in",
    busy: "Signing in…",
  },
  "sign-up": {
    heading: "Create your account",
    sub: "Save your modules and practice log across devices.",
    cta: "Create account",
    busy: "Creating account…",
  },
};

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="rounded-sm border border-rule bg-card p-6">
        <h1 className="font-display text-xl text-ink">{copy[mode].heading}</h1>
        <p className="mt-3 text-sm text-ink-muted">
          Running in demo mode — your data lives in this browser. Connect
          Supabase to enable accounts.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-cobalt hover:text-cobalt-deep underline underline-offset-2"
        >
          Back home
        </Link>
      </div>
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    setBusy(true);
    setError(null);

    if (mode === "sign-up") {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (data.session) {
        // Email confirmation disabled on the project — signed in already.
        router.push("/");
        router.refresh();
        return;
      }
      setAwaitingConfirmation(true);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setBusy(false);
    if (signInError) {
      setError(signInError.message);
      return;
    }
    router.push("/");
    router.refresh();
  }

  if (awaitingConfirmation) {
    return (
      <div className="rounded-sm border border-rule bg-card p-6">
        <h1 className="font-display text-xl text-ink">Check your email</h1>
        <p className="mt-3 text-sm text-ink-muted">
          We sent a confirmation link to <strong>{email}</strong>. Open it to
          finish creating your account.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-sm text-cobalt hover:text-cobalt-deep underline underline-offset-2"
        >
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-rule bg-card p-6">
      <h1 className="font-display text-xl text-ink">{copy[mode].heading}</h1>
      <p className="mt-1 text-sm text-ink-muted">{copy[mode].sub}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-ink">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-sm border border-rule bg-card px-3 py-2 text-sm text-ink"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-ink">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-sm border border-rule bg-card px-3 py-2 text-sm text-ink"
          />
          {mode === "sign-up" && (
            <p className="mt-1 text-xs text-ink-muted">At least 8 characters.</p>
          )}
        </div>

        {error && <p className="text-sm text-red-700">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-sm bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-deep disabled:opacity-60"
        >
          {busy ? copy[mode].busy : copy[mode].cta}
        </button>
      </form>

      <p className="mt-4 text-sm text-ink-muted">
        {mode === "sign-up" ? (
          <>
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="text-cobalt hover:text-cobalt-deep underline underline-offset-2">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link href="/auth/sign-up" className="text-cobalt hover:text-cobalt-deep underline underline-offset-2">
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
