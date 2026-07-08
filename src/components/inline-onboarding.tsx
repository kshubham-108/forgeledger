"use client";

import Image from "next/image";
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
import { getAuthDisplayName, getWelcomeFirstName, useAuthUser } from "@/lib/use-auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { useLog, useProfile } from "@/lib/use-store";
import type { Discipline, SnapshotRatings } from "@/lib/types";

const HOUR_OPTIONS = [1, 2, 3, 5];

type OnboardingStep =
  | "university"
  | "course"
  | "auth"
  | "modules"
  | "hours"
  | "snapshot";

function WelcomeBackBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[26rem] flex-col overflow-hidden rounded-md border border-cobalt-glow/40 bg-gradient-to-br from-header to-[#1a2550] p-6 shadow-[0_8px_40px_-8px_#4a47f060]">
      <div
        aria-hidden="true"
        className="star-field pointer-events-none absolute inset-0 -z-10"
      />
      {children}
    </div>
  );
}

function StepFlowBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[26rem] flex-col rounded-md border-2 border-cobalt bg-card p-6 shadow-[0_8px_32px_-4px_#4a47f025]">
      {children}
    </div>
  );
}

function StepHeading({
  num,
  children,
}: {
  num: string;
  children: React.ReactNode;
}) {
  return (
    <p className="text-sm font-semibold text-ink">
      <span className="mr-2 font-mono text-xs text-cobalt">{num}</span>
      {children}
    </p>
  );
}

function fieldClassName(extra = "") {
  return `mt-2.5 w-full rounded-sm border border-rule bg-paper px-3 py-2.5 text-sm text-ink ${extra}`.trim();
}

/*
  Onboarding lives in the landing hero. One question at a time inside a
  fixed-height card so the page doesn't grow as steps advance. Demo mode
  (no Supabase env vars) never gates on sign-up.
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
  const [step, setStep] = useState<OnboardingStep>("university");

  const university = universities.find((u) => u.id === universityId) ?? null;
  const availableCourses = university ? getCoursesForUniversity(university.id) : [];
  const availableModules =
    university && discipline
      ? getModulesForUniversity(university.id).filter(
          (m) => m.discipline === discipline,
        )
      : [];
  const hasRatings = Object.keys(snapshot).length > 0;
  const needsAuthGate = gated && ready && user === null;
  // If the auth gate clears while sitting on "auth" (e.g. signed in from
  // another tab), skip forward to "modules" without needing an effect —
  // `step` stays the source of truth for user-driven navigation.
  const displayStep = step === "auth" && !needsAuthGate ? "modules" : step;

  function toggleModule(id: string) {
    setModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function finish(withSnapshot: boolean) {
    if (universityId === null || moduleIds.length === 0) return;
    saveProfileAndSync({
      displayName: getAuthDisplayName(user) ?? "Student",
      universityId,
      discipline: discipline ?? undefined,
      moduleIds,
      hoursPerWeek,
      snapshot: withSnapshot && hasRatings ? snapshot : undefined,
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard");
  }

  function goToCourse() {
    if (universityId === null) return;
    setStep("course");
  }

  function goToNextAfterCourse() {
    if (discipline === null) return;
    setStep(needsAuthGate ? "auth" : "modules");
  }

  if (profile !== null) {
    const buildCount = log.length;
    const welcomeName = getWelcomeFirstName(user, profile.displayName);
    const encouragement =
      buildCount > 0
        ? `${buildCount} build${buildCount === 1 ? "" : "s"} in — the frontier moves weekly, and so do you.`
        : "Your first 25-minute build is ready whenever you are.";

    return (
      <WelcomeBackBox>
        <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt-glow">
          Start free · a minute
        </p>

        <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
          <p className="font-display text-xl font-semibold text-paper">
            Welcome back, {welcomeName}
          </p>

          <div className="relative mx-auto mt-6 h-32 w-32">
            <div className="glow-pulse absolute inset-0 rounded-full bg-cobalt-glow/40 blur-2xl" />
            <Image
              src="/brain-ai-icon.png"
              alt=""
              fill
              sizes="128px"
              className="float-icon relative object-contain drop-shadow-[0_0_20px_rgba(123,120,255,0.7)]"
            />
          </div>

          <p className="mx-auto mt-6 max-w-[22rem] text-sm leading-relaxed text-paper/70">
            {encouragement}
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-block rounded-sm bg-cobalt px-5 py-2.5 text-sm font-medium text-white hover:bg-cobalt-deep"
          >
            This week&apos;s builds
          </Link>
        </div>
      </WelcomeBackBox>
    );
  }

  return (
    <StepFlowBox>
      <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt-glow">
        Start free · a minute
      </p>

      <div className="mt-5 flex min-h-[18rem] flex-1 flex-col">
        {displayStep === "university" ? (
          <div className="flex flex-1 flex-col">
            <StepHeading num="01">Where do you study?</StepHeading>
            <select
              id="onboarding-university"
              value={universityId ?? ""}
              onChange={(event) => {
                const next = event.target.value || null;
                setUniversityId(next);
                setDiscipline(null);
                setModuleIds([]);
              }}
              className={fieldClassName()}
            >
              <option value="">Choose your university…</option>
              {universities.map((uni) => (
                <option key={uni.id} value={uni.id}>
                  {uni.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-ink-muted">
              25 universities in the pilot — more added each term.
            </p>
            <div className="mt-auto pt-6">
              <button
                type="button"
                disabled={universityId === null}
                onClick={goToCourse}
                className="w-full rounded-sm bg-cobalt px-5 py-3 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {displayStep === "course" ? (
          <div className="flex flex-1 flex-col">
            <StepHeading num="02">What course are you doing?</StepHeading>
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
            <div className="mt-auto flex gap-2 pt-6">
              <button
                type="button"
                onClick={() => setStep("university")}
                className="rounded-sm border border-rule px-4 py-3 text-sm text-ink-muted hover:text-ink"
              >
                Back
              </button>
              <button
                type="button"
                disabled={discipline === null}
                onClick={goToNextAfterCourse}
                className="flex-1 rounded-sm bg-cobalt px-5 py-3 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {displayStep === "auth" && university !== null && discipline !== null ? (
          <div className="flex flex-1 flex-col">
            <StepHeading num="03">Verify your student email</StepHeading>
            <p className="mt-2 text-xs leading-relaxed text-ink-muted">
              One step left: sign up with your {university.name} email so we
              know your modules are really yours.
            </p>
            <Link
              href={`/auth/sign-up?university=${university.slug}&discipline=${discipline}`}
              className="mt-4 block w-full rounded-sm bg-cobalt px-5 py-3 text-center text-sm font-medium text-white hover:bg-cobalt-deep"
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
            <button
              type="button"
              onClick={() => setStep("course")}
              className="mt-auto pt-6 text-left text-sm text-ink-muted hover:text-ink"
            >
              ← Back
            </button>
          </div>
        ) : null}

        {displayStep === "modules" && university !== null && discipline !== null ? (
          <div className="flex flex-1 flex-col">
            <StepHeading num="03">Tick your modules</StepHeading>
            <div className="mt-2.5 flex max-h-40 flex-wrap gap-2 overflow-y-auto">
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
            <div className="mt-auto flex gap-2 pt-6">
              <button
                type="button"
                onClick={() => setStep(needsAuthGate ? "auth" : "course")}
                className="rounded-sm border border-rule px-4 py-3 text-sm text-ink-muted hover:text-ink"
              >
                Back
              </button>
              <button
                type="button"
                disabled={moduleIds.length === 0}
                onClick={() => setStep("hours")}
                className="flex-1 rounded-sm bg-cobalt px-5 py-3 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {displayStep === "hours" ? (
          <div className="flex flex-1 flex-col">
            <StepHeading num="04">Hours you can honestly give a week</StepHeading>
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
            <div className="mt-auto flex gap-2 pt-6">
              <button
                type="button"
                onClick={() => setStep("modules")}
                className="rounded-sm border border-rule px-4 py-3 text-sm text-ink-muted hover:text-ink"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep("snapshot")}
                className="flex-1 rounded-sm bg-cobalt px-5 py-3 text-sm font-medium text-white hover:bg-cobalt-deep"
              >
                Continue
              </button>
            </div>
          </div>
        ) : null}

        {displayStep === "snapshot" ? (
          <div className="flex flex-1 flex-col">
            <StepHeading num="05">Optional: how confident are you today?</StepHeading>
            <p className="mt-1 text-xs text-ink-muted">
              Rate yourself and this week&apos;s builds will target your weakest
              area first. Skip if you like.
            </p>
            <div className="mt-3">
              <SnapshotRater value={snapshot} onChange={setSnapshot} />
            </div>
            <div className="mt-auto space-y-2 pt-6">
              <button
                type="button"
                onClick={() => finish(true)}
                className="w-full rounded-sm bg-cobalt px-5 py-3 text-sm font-medium text-white hover:bg-cobalt-deep"
              >
                Start building
              </button>
              {hasRatings ? null : (
                <button
                  type="button"
                  onClick={() => finish(false)}
                  className="w-full py-1 text-center text-xs text-ink-muted hover:text-ink"
                >
                  Skip the snapshot — you can rate yourself any time
                </button>
              )}
              <button
                type="button"
                onClick={() => setStep("hours")}
                className="w-full pt-1 text-center text-sm text-ink-muted hover:text-ink"
              >
                ← Back
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </StepFlowBox>
  );
}
