"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getModulesForUniversity, universities } from "@/lib/seed";
import { saveProfile } from "@/lib/store";

const HOUR_OPTIONS = [1, 2, 3, 5, 8];

export function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [universityId, setUniversityId] = useState<string | null>(null);
  const [moduleIds, setModuleIds] = useState<string[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState(3);

  const availableModules =
    universityId === null ? [] : getModulesForUniversity(universityId);

  function toggleModule(id: string) {
    setModuleIds((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  }

  function finish() {
    if (universityId === null || moduleIds.length === 0) return;
    saveProfile({
      displayName: displayName.trim() || "Student",
      universityId,
      moduleIds,
      hoursPerWeek,
      createdAt: new Date().toISOString(),
    });
    router.push("/dashboard");
  }

  return (
    <div className="mt-8">
      <p className="font-mono text-xs text-ink-muted">Step {step + 1} of 3</p>

      {step === 0 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-ink">
            Where do you study?
          </legend>
          <div className="mt-4 flex flex-col gap-2">
            {universities.map((uni) => (
              <label
                key={uni.id}
                className={`flex cursor-pointer items-center justify-between border px-4 py-3 text-sm ${
                  universityId === uni.id
                    ? "border-biro bg-biro-faint"
                    : "border-rule bg-card hover:border-ink-muted"
                }`}
              >
                <span>
                  <span className="font-medium text-ink">{uni.name}</span>
                  <span className="ml-2 text-ink-muted">{uni.city}</span>
                </span>
                <input
                  type="radio"
                  name="university"
                  checked={universityId === uni.id}
                  onChange={() => {
                    setUniversityId(uni.id);
                    setModuleIds([]);
                  }}
                  className="accent-biro"
                />
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Pilot catalogue. Your university not here yet? More are added each
            term.
          </p>
          <button
            type="button"
            disabled={universityId === null}
            onClick={() => setStep(1)}
            className="mt-6 rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
          >
            Choose modules
          </button>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-ink">
            Which modules are you taking?
          </legend>
          <div className="mt-4 flex flex-col gap-2">
            {availableModules.map((mod) => (
              <label
                key={mod.id}
                className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm ${
                  moduleIds.includes(mod.id)
                    ? "border-biro bg-biro-faint"
                    : "border-rule bg-card hover:border-ink-muted"
                }`}
              >
                <input
                  type="checkbox"
                  checked={moduleIds.includes(mod.id)}
                  onChange={() => toggleModule(mod.id)}
                  className="accent-biro"
                />
                <span className="rounded-sm bg-paper px-1.5 py-0.5 font-mono text-[11px] text-biro-deep">
                  {mod.code}
                </span>
                <span className="text-ink">{mod.title}</span>
              </label>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(0)}
              className="rounded-sm border border-rule px-4 py-2.5 text-sm text-ink hover:border-ink-muted"
            >
              Back
            </button>
            <button
              type="button"
              disabled={moduleIds.length === 0}
              onClick={() => setStep(2)}
              className="rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
            >
              Nearly there
            </button>
          </div>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="mt-4">
          <legend className="text-base font-semibold text-ink">
            How the ledger addresses you
          </legend>
          <label className="mt-4 block text-sm text-ink">
            First name <span className="text-ink-muted">(optional)</span>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g. Sam"
              className="mt-2 w-full border border-rule bg-card px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
            />
          </label>
          <p className="mt-6 text-sm font-medium text-ink">
            Hours you can honestly give per week
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {HOUR_OPTIONS.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setHoursPerWeek(h)}
                className={`rounded-sm border px-4 py-2 font-mono text-sm ${
                  hoursPerWeek === h
                    ? "border-biro bg-biro text-white"
                    : "border-rule bg-card text-ink hover:border-ink-muted"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            Builds are 25–40 minutes. Even 1 hour a week moves your ledger.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-sm border border-rule px-4 py-2.5 text-sm text-ink hover:border-ink-muted"
            >
              Back
            </button>
            <button
              type="button"
              onClick={finish}
              className="rounded-sm bg-biro px-5 py-2.5 text-sm font-medium text-white hover:bg-biro-deep"
            >
              Open my ledger
            </button>
          </div>
        </fieldset>
      ) : null}
    </div>
  );
}
