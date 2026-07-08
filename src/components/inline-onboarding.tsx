"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnapshotRater } from "@/components/snapshot-rater";
import {
  getCoursesForUniversity,
  getModulesForUniversity,
} from "@/lib/seed/modules";
import { disciplineLabels } from "@/lib/seed/labels";
import { universities } from "@/lib/seed/universities";
import { saveProfileAndSync } from "@/lib/sync-writes";
import { useAuthUser } from "@/lib/use-auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useLog, useProfile } from "@/lib/use-store";
import type { Discipline, SnapshotRatings } from "@/lib/types";

const HOUR_OPTIONS = [1, 2, 3, 5];

/*
  Onboarding lives in the landing hero. Questions reveal progressively as
  each answer lands: university -> course -> (sign-up gate, if Supabase is
  configured and there's no session yet) -> module -> hours -> optional
  capability snapshot. Demo mode (no Supabase env vars) never gates on
  sign-up — there's no backend to verify a university email against.
*/
export function InlineOnboarding() {
  const router = useRouter();
  const profile = useProfile();
  const log = useLog();
  const { user, ready } = useAuthUser();
  const gated = isSupabaseConfigured();

  const [universityId, setUniversityId] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [snapshot, setSnapshot] = useState<SnapshotRatings>({});

  if (profile !== null) {
    return (
      <div className="rounded-md border-2 border-cobalt bg-card p-6 shadow-[0_8px_32px_-4px_#4a47f025]">
        <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt-glow">
          You&apos;re set up
        </p>
        <p className="mt-3 font-display text-xl font-semibold text-ink">
          Welcome back, {profile.displayName}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {profile.moduleIds.length} module
          {profile.moduleIds.length === 1 ? "" : "s"} · {log.length} build
          {log.length === 1 ? "" : "s"} done
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-block rounded-sm bg-cobalt px-5 py-2.5 text-sm font-medium text-white hover:bg-cobalt-deep"
        >
          This week&apos;s builds
        </Link>
      </div>
    );
  }

  const university = universities.find((u) => u.id === universityId) ?? null;
  const availableCourses = university ? getCoursesForUniversity(university.id) : [];
  const availableModules =
    university && discipline
      ? getModulesForUniversity(university.id).filter(
          (m) => m.discipline === discipline,
        )
      : [];
  const hasRatings = Object.keys(snapshot).length > 0;

  /* Once Supabase is configured, module picking (and everything after it)
     is gated behind a sign-up verified against the chosen university's
     email domain — handled on /auth/sign-up, not here. */
  const needsAuthGate = gated && ready && user === null;

  function toggleModule(id: string) {
    setModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function finish(withSnapshot: boolean) {
    if (universityId === null || moduleIds.length === 0) return;
    saveProfileAndSync({
      displayName: "Student",
      universityId,
      discipline: discipline ?? undefined,
      moduleIds,
      hoursPerWeek,
      snapshot: withSnapshot && hasRatings ? snapshot : undefined,
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard");
  }

  return (
    <div className="rounded-md border-2 border-cobalt bg-card p-6 shadow-[0_8px_32px_-4px_#4a47f025]">
      <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt-glow">
        Start free · a minute
      </p>

      {/* 01 — University */}
      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">
          <span className="mr-2 font-mono text-xs text-cobalt">01</span>
          Where do you study?
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {universities.map((uni) => (
            <button
              key={uni.id}
              type="button"
              onClick={() => {
                setUniversityId(uni.id);
                setDiscipline(null);
                setModuleIds([]);
              }}
              className={`rounded-sm border px-3 py-2 text-sm ${
                universityId === uni.id
                  ? "border-cobalt bg-cobalt-faint font-medium text-cobalt-deep"
                  : "border-rule bg-paper text-ink hover:border-ink-muted"
              }`}
            >
              {uni.name}
            </button>
          ))}
        </div>
        {universityId === null ? (
          <p className="mt-2 text-xs text-ink-muted">
            25 universities in the pilot — more added each term.
          </p>
        ) : null}
      </fieldset>

      {/* 02 — Course, revealed once a university is picked */}
      {university !== null ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">02</span>
            What course are you doing?
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {availableCourses.map((course) => (
              <button
                key={course}
                type="button"
                aria-pressed={discipline === course}
                onClick={() => {
                  setDiscipline(course);
                  setModuleIds([]);
                }}
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
        </fieldset>
      ) : null}

      {/* Sign-up gate — only when Supabase is configured and no session yet */}
      {university !== null && discipline !== null && needsAuthGate ? (
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">03</span>
            Verify your student email
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            One step left: sign up with your {university.name} email so we
            know your modules are really yours.
          </p>
          <Link
            href={`/auth/sign-up?university=${university.slug}&discipline=${discipline}`}
            className="mt-4 inline-block w-full rounded-sm bg-cobalt px-5 py-3 text-center text-sm font-medium text-white hover:bg-cobalt-deep"
          >
            Continue with your {university.name} email
          </Link>
          <p className="mt-2 text-xs text-ink-muted">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="text-cobalt hover:text-cobalt-deep underline underline-offset-2"
            >
              Sign in
            </Link>
          </p>
        </div>
      ) : null}

      {/* 03/04 — Modules, revealed once a course is picked (demo mode, or already signed in) */}
      {university !== null && discipline !== null && !needsAuthGate ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">03</span>
            Tick your modules
          </legend>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {availableModules.map((mod) => {
              const selected = moduleIds.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleModule(mod.id)}
                  className={`rounded-sm border px-2.5 py-1.5 font-mono text-xs ${
                    selected
                      ? "border-cobalt bg-cobalt text-white"
                      : "border-rule bg-paper text-ink hover:border-ink-muted"
                  }`}
                  title={mod.title}
                >
                  {mod.code}
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            Hover a code to see the module title.
          </p>
        </fieldset>
      ) : null}

      {/* 04 — Hours, revealed once a module is ticked */}
      {moduleIds.length > 0 ? (
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">04</span>
            Hours you can honestly give a week
          </p>
          <div className="mt-2.5 flex gap-2">
            {HOUR_OPTIONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHoursPerWeek(h)}
                className={`rounded-sm border px-3.5 py-1.5 font-mono text-sm ${
                  hoursPerWeek === h
                    ? "border-cobalt bg-cobalt text-white"
                    : "border-rule bg-paper text-ink hover:border-ink-muted"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {/* 05 — Optional snapshot + start, revealed with 04 */}
      {moduleIds.length > 0 ? (
        <div className="mt-6">
          <p className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">05</span>
            Optional: how confident are you today?
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Rate yourself and this week&apos;s builds will target your weakest
            area first. Skip if you like.
          </p>
          <div className="mt-3">
            <SnapshotRater value={snapshot} onChange={setSnapshot} />
          </div>
          <button
            type="button"
            onClick={() => finish(true)}
            className="mt-5 w-full rounded-sm bg-cobalt px-5 py-3 text-sm font-medium text-white hover:bg-cobalt-deep"
          >
            Start building
          </button>
          {hasRatings ? null : (
            <button
              type="button"
              onClick={() => finish(false)}
              className="mt-2 w-full py-1 text-center text-xs text-ink-muted hover:text-ink"
            >
              Skip the snapshot — you can rate yourself any time
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}
