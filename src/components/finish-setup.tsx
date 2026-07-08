"use client";

import { useState } from "react";
import { SnapshotRater } from "@/components/snapshot-rater";
import { disciplineLabels, getModulesForUniversity } from "@/lib/seed";
import { saveProfileAndSync } from "@/lib/sync-writes";
import type { Profile, SnapshotRatings } from "@/lib/types";

const HOUR_OPTIONS = [1, 2, 3, 5];

/*
  Shown on the dashboard once a student has signed up (university + course
  already set on their profile) but hasn't picked a module yet — the last
  step of registration, moved here so the sign-up page itself only has to
  worry about the email/password gate.
*/
export function FinishSetup({ profile }: { profile: Profile }) {
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [hoursPerWeek, setHoursPerWeek] = useState(3);
  const [snapshot, setSnapshot] = useState<SnapshotRatings>({});
  const hasRatings = Object.keys(snapshot).length > 0;

  const availableModules = getModulesForUniversity(profile.universityId).filter(
    (m) => !profile.discipline || m.discipline === profile.discipline,
  );

  function toggleModule(id: string) {
    setModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function finish(withSnapshot: boolean) {
    if (moduleIds.length === 0) return;
    saveProfileAndSync({
      ...profile,
      moduleIds,
      hoursPerWeek,
      snapshot: withSnapshot && hasRatings ? snapshot : profile.snapshot,
    });
  }

  return (
    <div className="mx-auto max-w-lg border-2 border-ink bg-card px-5 py-6">
      <p className="font-mono text-[11px] uppercase tracking-widest text-cobalt">
        Finish setting up
      </p>
      <p className="mt-3 font-display text-xl font-semibold text-ink">
        One step left, {profile.displayName}
      </p>
      <p className="mt-2 text-sm text-ink-muted">
        {profile.discipline
          ? `Pick your ${disciplineLabels[profile.discipline]} module and Fluent will start matching builds to it.`
          : "Pick a module and Fluent will start matching builds to it."}
      </p>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-ink">
          Tick your module(s)
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
        {availableModules.length === 0 ? (
          <p className="mt-2 text-xs text-ink-muted">
            No modules are seeded yet for your course at your university —
            check back soon, or explore other courses in the meantime.
          </p>
        ) : null}
      </fieldset>

      {moduleIds.length > 0 ? (
        <>
          <div className="rise-in mt-6">
            <p className="text-sm font-semibold text-ink">
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

          <div className="rise-in mt-6">
            <p className="text-sm font-semibold text-ink">
              Optional: how confident are you today?
            </p>
            <p className="mt-1 text-xs text-ink-muted">
              Rate yourself and this week&apos;s builds will target your
              weakest area first. Skip if you like.
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
        </>
      ) : null}
    </div>
  );
}
