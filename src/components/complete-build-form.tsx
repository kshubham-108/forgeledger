"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { addLedgerEntry } from "@/lib/store";

type CompleteBuildFormProps = {
  buildSlug: string;
  moduleCodes: string[];
  artifactPrompt: string;
  estMinutes: number;
};

const SCORE_LABELS = ["Shaky", "Getting there", "Solid", "Confident", "Could teach it"];

export function CompleteBuildForm({
  buildSlug,
  moduleCodes,
  artifactPrompt,
  estMinutes,
}: CompleteBuildFormProps) {
  const router = useRouter();
  const [artifactText, setArtifactText] = useState("");
  const [selfScore, setSelfScore] = useState(3);
  const [timeSpent, setTimeSpent] = useState(estMinutes);
  const [moduleCode, setModuleCode] = useState(moduleCodes[0]);

  const canSubmit = artifactText.trim().length >= 40;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    addLedgerEntry({
      buildSlug,
      moduleCode,
      selfScore,
      timeSpentMin: timeSpent,
      artifactText: artifactText.trim(),
    });
    router.push("/ledger");
  }

  return (
    <form onSubmit={submit} className="mt-12 border-t-2 border-ink pt-8">
      <h2 className="font-display text-xl text-ink">Stamp it into your ledger</h2>

      {moduleCodes.length > 1 ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-ink">Which module was this for?</p>
          <div className="mt-2 flex gap-2">
            {moduleCodes.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setModuleCode(code)}
                className={`rounded-sm border px-3 py-1.5 font-mono text-xs ${
                  moduleCode === code
                    ? "border-biro bg-biro text-white"
                    : "border-rule bg-card text-ink hover:border-ink-muted"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <label className="mt-5 block text-sm font-medium text-ink">
        Your artifact
        <span className="mt-1 block text-xs font-normal text-ink-muted">
          {artifactPrompt}
        </span>
        <textarea
          value={artifactText}
          onChange={(e) => setArtifactText(e.target.value)}
          rows={7}
          placeholder="Paste your prompts, audit log, or checklist here…"
          className="mt-2 w-full border border-rule bg-card px-3 py-2.5 font-mono text-xs leading-relaxed text-ink placeholder:font-sans placeholder:text-sm placeholder:text-ink-muted"
        />
        <span className="mt-1 block text-xs text-ink-muted">
          {canSubmit
            ? "Ready to stamp."
            : "At least 40 characters — the artifact is the evidence."}
        </span>
      </label>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-ink">
            How solid does this feel? ({SCORE_LABELS[selfScore - 1]})
          </p>
          <div className="mt-2 flex gap-1.5">
            {SCORE_LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-label={`${i + 1} of 5: ${label}`}
                onClick={() => setSelfScore(i + 1)}
                className={`h-9 w-9 rounded-sm border font-mono text-xs ${
                  selfScore >= i + 1
                    ? "border-biro bg-biro text-white"
                    : "border-rule bg-card text-ink-muted hover:border-ink-muted"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <label className="block text-sm font-medium text-ink">
          Minutes it actually took
          <input
            type="number"
            min={5}
            max={240}
            value={timeSpent}
            onChange={(e) => setTimeSpent(Number(e.target.value))}
            className="mt-2 w-28 border border-rule bg-card px-3 py-2 font-mono text-sm text-ink"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-8 rounded-sm bg-verified px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
      >
        Stamp into ledger
      </button>
    </form>
  );
}
