"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { saveProfileAndSync } from "@/lib/sync-writes";
import { getCoursesForUniversity } from "@/lib/seed/modules";
import { disciplineLabels } from "@/lib/seed/labels";
import { universities } from "@/lib/seed/universities";
import { getUniversityBySlug } from "@/lib/supabase/data";
import type { Discipline, University } from "@/lib/types";

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
    sub: "Sign up with your university email — your modules and practice log follow you across devices.",
    cta: "Create account",
    busy: "Creating account…",
  },
};

function isValidUniversityEmail(email: string, university: University): boolean {
  const lower = email.trim().toLowerCase();
  if (lower === "") return false;
  return university.emailDomains.some((domain) =>
    lower.endsWith(domain.toLowerCase()),
  );
}

export function AuthForm({
  mode,
  initialUniversitySlug,
  initialDiscipline,
}: {
  mode: Mode;
  initialUniversitySlug?: string;
  initialDiscipline?: string;
}) {
  const router = useRouter();

  const seededUniversity =
    universities.find((u) => u.slug === initialUniversitySlug) ?? null;
  const seededDiscipline =
    seededUniversity &&
    initialDiscipline &&
    getCoursesForUniversity(seededUniversity.id).includes(
      initialDiscipline as Discipline,
    )
      ? (initialDiscipline as Discipline)
      : null;

  const [name, setName] = useState("");
  const [university, setUniversity] = useState<University | null>(seededUniversity);
  const [discipline, setDiscipline] = useState<Discipline | null>(seededDiscipline);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);

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

  const availableCourses = university ? getCoursesForUniversity(university.id) : [];
  const domainHint = university?.emailDomains[0];
  const emailValid =
    mode === "sign-in" || !university || isValidUniversityEmail(email, university);
  const canSubmit =
    mode === "sign-in"
      ? true
      : name.trim() !== "" &&
        university !== null &&
        discipline !== null &&
        isValidUniversityEmail(email, university);

  function chooseUniversity(slug: string) {
    const next = universities.find((u) => u.slug === slug) ?? null;
    setUniversity(next);
    setDiscipline(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = getBrowserSupabase();
    if (!supabase) return;

    if (mode === "sign-up") {
      if (!name.trim()) {
        setError("Enter your name.");
        return;
      }
      if (!university || !discipline) {
        setError("Choose your university and course.");
        return;
      }
      if (!isValidUniversityEmail(email, university)) {
        setError(`Please use your ${domainHint ?? "university"} email address.`);
        return;
      }
    }

    setBusy(true);
    setError(null);

    if (mode === "sign-up" && university && discipline) {
      const remoteUniversity = await getUniversityBySlug(supabase, university.slug);
      if (!remoteUniversity) {
        setBusy(false);
        setError(
          "We couldn't find that university in our system yet — please try again shortly.",
        );
        return;
      }

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: name.trim(),
            university_id: remoteUniversity.id,
            discipline,
          },
        },
      });
      if (signUpError) {
        setBusy(false);
        setError(signUpError.message);
        return;
      }

      saveProfileAndSync({
        displayName: name.trim(),
        universityId: university.id,
        discipline,
        moduleIds: [],
        hoursPerWeek: 3,
        createdAt: new Date().toISOString(),
      });

      if (data.session) {
        await supabase.auth.signOut();
      }

      setBusy(false);
      setNeedsEmailConfirmation(!data.session);
      setRegistrationComplete(true);
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
    router.push("/dashboard");
  }

  if (registrationComplete) {
    return (
      <div className="rounded-sm border border-rule bg-card p-6">
        <h1 className="font-display text-xl text-ink">
          {needsEmailConfirmation ? "Check your email" : "Account created"}
        </h1>
        <p className="mt-3 text-sm text-ink-muted">
          {needsEmailConfirmation ? (
            <>
              We sent a confirmation link to <strong>{email}</strong>. Open it
              to verify your address, then come back and sign in.
            </>
          ) : (
            <>Your account is ready.</>
          )}{" "}
          Click <strong>Sign in</strong> in the top right corner and log in with
          the email and password you just set.
        </p>
        <Link
          href="/auth/sign-in"
          className="mt-4 inline-block text-sm text-cobalt hover:text-cobalt-deep underline underline-offset-2"
        >
          Go to sign in
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-rule bg-card p-6">
      <h1 className="font-display text-xl text-ink">{copy[mode].heading}</h1>
      <p className="mt-1 text-sm text-ink-muted">{copy[mode].sub}</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {mode === "sign-up" ? (
          <>
            <div>
              <label htmlFor="name" className="block text-sm text-ink">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-sm border border-rule bg-card px-3 py-2 text-sm text-ink"
              />
            </div>

            <div>
              <label htmlFor="university" className="block text-sm text-ink">
                University
              </label>
              <select
                id="university"
                required
                value={university?.slug ?? ""}
                onChange={(event) => chooseUniversity(event.target.value)}
                className="mt-1 w-full rounded-sm border border-rule bg-card px-3 py-2 text-sm text-ink"
              >
                <option value="">Choose your university…</option>
                {universities.map((uni) => (
                  <option key={uni.slug} value={uni.slug}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>

            {university ? (
              <div>
                <p className="text-sm text-ink">Course</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableCourses.map((course) => (
                    <button
                      key={course}
                      type="button"
                      aria-pressed={discipline === course}
                      onClick={() => setDiscipline(course)}
                      className={`rounded-sm border px-3 py-2 text-sm ${
                        discipline === course
                          ? "border-cobalt bg-cobalt text-white"
                          : "border-rule bg-paper text-ink hover:border-ink-muted"
                      }`}
                    >
                      {disciplineLabels[course]}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        ) : null}

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
          {mode === "sign-up" && domainHint ? (
            <p
              className={`mt-1 text-xs ${
                emailValid ? "text-ink-muted" : "text-red-700"
              }`}
            >
              Use your {domainHint} email
            </p>
          ) : null}
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
          disabled={busy || !canSubmit}
          className="w-full rounded-sm bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-deep disabled:opacity-60"
        >
          {busy ? copy[mode].busy : copy[mode].cta}
        </button>
      </form>

      <p className="mt-4 text-sm text-ink-muted">
        {mode === "sign-up" ? (
          <>
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-cobalt hover:text-cobalt-deep underline underline-offset-2"
            >
              Sign in
            </Link>
          </>
        ) : (
          <>
            New here?{" "}
            <Link
              href="/auth/sign-up"
              className="text-cobalt hover:text-cobalt-deep underline underline-offset-2"
            >
              Create an account
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
