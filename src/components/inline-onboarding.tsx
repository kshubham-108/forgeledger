"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SnapshotRater } from "@/components/snapshot-rater";
import {
  getBuildsForModuleCodes,
  getModuleById,
  getModulesForUniversity,
  universities,
} from "@/lib/seed";
import { saveProfileAndSync } from "@/lib/data-bridge";
import { useLog, useProfile } from "@/lib/use-store";
import type { SnapshotRatings } from "@/lib/types";

const HOUR_OPTIONS = [1, 2, 3, 5];

/*
  Onboarding lives in the landing hero. Questions reveal progressively as
  each answer lands, and the CTA shows a live count of matched builds so
  every click gives feedback. The final micro-step — a capability
  snapshot — is optional and skippable in one click.
*/
export function InlineOnboarding() {
  const router = useRouter();
  const profile = useProfile();
  const log = useLog();

  const [universityId, setUniversityId] = useState<string | null>(null);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [snapshot, setSnapshot] = useState<SnapshotRatings>({});

  if (profile !== null) {
    return (
      <div className="border-2 border-ink bg-card px-5 py-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
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

  const availableModules =
    universityId === null ? [] : getModulesForUniversity(universityId);
  const chosenCodes = moduleIds
    .map(getModuleById)
    .filter((m) => m !== undefined)
    .map((m) => m.code);
  const matchedBuilds = getBuildsForModuleCodes(chosenCodes).length;
  const hasRatings = Object.keys(snapshot).length > 0;

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
      moduleIds,
      hoursPerWeek,
      snapshot: withSnapshot && hasRatings ? snapshot : undefined,
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard");
  }

  return (
    <div className="border-2 border-ink bg-card px-5 py-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
        Start free · 30 seconds
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
            Pilot catalogue — more universities each term.
          </p>
        ) : null}
      </fieldset>

      {/* 02 — Modules, revealed once a university is picked */}
      {universityId !== null ? (
        <fieldset className="rise-in mt-6">
          <legend className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">02</span>
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

      {/* 03 — Hours, revealed once a module is ticked */}
      {moduleIds.length > 0 ? (
        <div className="rise-in mt-6">
          <p className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">03</span>
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

      {/* 04 — Optional snapshot + start, revealed with 03 */}
      {moduleIds.length > 0 ? (
        <div className="rise-in mt-6">
          <p className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-cobalt">04</span>
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
            {matchedBuilds > 0
              ? `Start — ${matchedBuilds} build${matchedBuilds === 1 ? "" : "s"} matched to your modules`
              : "Start building"}
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
