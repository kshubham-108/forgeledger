"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { getUniversityBySlug } from "@/lib/supabase/data";
import { disciplineLabels, getCoursesForUniversity, universities } from "@/lib/seed";
import { saveProfileAndSync } from "@/lib/data-bridge";
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
  /** Carried over from the landing onboarding widget via query params. */
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

  const [university, setUniversity] = useState<University | null>(seededUniversity);
  const [discipline, setDiscipline] = useState<Discipline | null>(seededDiscipline);
  const [pickerOpen, setPickerOpen] = useState(
    mode === "sign-up" && (seededUniversity === null || seededDiscipline === null),
  );
  const [pickerStep, setPickerStep] = useState<"university" | "course">(
    seededUniversity ? "course" : "university",
  );

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

  const availableCourses = university ? getCoursesForUniversity(university.id) : [];
  const domainHint = university?.emailDomains[0];
  const emailValid = mode === "sign-in" || !university || isValidUniversityEmail(email, university);
  const canSubmit =
    mode === "sign-in"
      ? true
      : university !== null &&
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
      if (!university || !discipline) {
        setError("Choose your university and course first.");
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
            university_id: remoteUniversity.id,
            discipline,
          },
        },
      });
      setBusy(false);
      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      /* Seed the local profile right away so the post-auth "finish setup"
         step (module + hours + snapshot) already knows the university and
         course, regardless of whether email confirmation delays sign-in. */
      saveProfileAndSync({
        displayName: email.split("@")[0] || "Student",
        universityId: university.id,
        discipline,
        moduleIds: [],
        hoursPerWeek: 3,
        createdAt: new Date().toISOString(),
      });

      if (data.session) {
        router.push("/dashboard");
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
    router.push("/dashboard");
    router.refresh();
  }

  if (awaitingConfirmation) {
    return (
      <div className="rounded-sm border border-rule bg-card p-6">
        <h1 className="font-display text-xl text-ink">Check your email</h1>
        <p className="mt-3 text-sm text-ink-muted">
          We sent a confirmation link to <strong>{email}</strong>. Open it to
          finish creating your account, then come back here to pick your
          module.
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

      {mode === "sign-up" && pickerOpen ? (
        <div className="mt-6">
          {pickerStep === "university" ? (
            <div>
              <label htmlFor="university" className="block text-sm text-ink">
                Which university?
              </label>
              <select
                id="university"
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
              <button
                type="button"
                disabled={university === null}
                onClick={() => setPickerStep("course")}
                className="mt-4 w-full rounded-sm bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
              >
                Continue
              </button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-ink">
                What course are you doing at{" "}
                <span className="font-medium">{university?.name}</span>?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
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
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPickerStep("university")}
                  className="rounded-sm border border-rule px-4 py-2 text-sm text-ink hover:border-ink-muted"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={discipline === null}
                  onClick={() => setPickerOpen(false)}
                  className="flex-1 rounded-sm bg-cobalt px-4 py-2 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {mode === "sign-up" && !pickerOpen && university && discipline ? (
        <div className="mt-4 flex items-center justify-between gap-2 rounded-sm border border-rule bg-paper px-3 py-2 text-xs text-ink-muted">
          <span>
            {university.name} · {disciplineLabels[discipline]}
          </span>
          <button
            type="button"
            onClick={() => {
              setPickerOpen(true);
              setPickerStep("university");
            }}
            className="shrink-0 font-medium text-cobalt hover:text-cobalt-deep"
          >
            Change
          </button>
        </div>
      ) : null}

      {mode === "sign-in" || (university && discipline && !pickerOpen) ? (
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
      ) : null}

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
