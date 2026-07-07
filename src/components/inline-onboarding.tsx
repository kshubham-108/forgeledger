"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  getBuildsForModuleCodes,
  getModuleById,
  getModulesForUniversity,
  universities,
} from "@/lib/seed";
import { saveProfile } from "@/lib/store";
import { useLedger, useProfile } from "@/lib/use-store";

const HOUR_OPTIONS = [1, 2, 3, 5];

/*
  Onboarding lives in the landing hero. Questions reveal progressively as
  each answer lands, and the CTA shows a live count of matched builds so
  every click gives feedback.
*/
export function InlineOnboarding() {
  const router = useRouter();
  const profile = useProfile();
  const ledger = useLedger();

  const [universityId, setUniversityId] = useState<string | null>(null);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);

  if (profile !== null) {
    return (
      <div className="border-2 border-ink bg-card px-5 py-6">
        <p className="font-mono text-[11px] uppercase tracking-widest text-verified">
          Ledger open
        </p>
        <p className="mt-3 font-display text-xl text-ink">
          Welcome back, {profile.displayName}
        </p>
        <p className="mt-2 text-sm text-ink-muted">
          {profile.moduleIds.length} module
          {profile.moduleIds.length === 1 ? "" : "s"} ·{" "}
          {ledger.length} stamp{ledger.length === 1 ? "" : "s"} collected
        </p>
        <Link
          href="/dashboard"
          className="mt-5 inline-block rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep"
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

  function toggleModule(id: string) {
    setModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function finish() {
    if (universityId === null || moduleIds.length === 0) return;
    saveProfile({
      displayName: "Student",
      universityId,
      moduleIds,
      hoursPerWeek,
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard");
  }

  return (
    <div className="border-2 border-ink bg-card px-5 py-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-biro">
        Open your ledger · 30 seconds
      </p>

      {/* 01 — University */}
      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">
          <span className="mr-2 font-mono text-xs text-biro">01</span>
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
                  ? "border-biro bg-biro-faint font-medium text-biro-deep"
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
        <fieldset className="stamp-in mt-6">
          <legend className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-biro">02</span>
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
                      ? "border-biro bg-biro text-white"
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

      {/* 03 — Hours + go, revealed once a module is ticked */}
      {moduleIds.length > 0 ? (
        <div className="stamp-in mt-6">
          <p className="text-sm font-semibold text-ink">
            <span className="mr-2 font-mono text-xs text-biro">03</span>
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
                    ? "border-biro bg-biro text-white"
                    : "border-rule bg-paper text-ink hover:border-ink-muted"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={finish}
            className="mt-5 w-full rounded-sm bg-verified px-5 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            {matchedBuilds > 0
              ? `Start — ${matchedBuilds} build${matchedBuilds === 1 ? "" : "s"} matched to your modules`
              : "Start building"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
