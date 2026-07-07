"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { competencyLabels } from "@/lib/seed";
import { addLedgerEntry } from "@/lib/store";
import type { Competency } from "@/lib/types";

type CompleteBuildFormProps = {
  buildSlug: string;
  moduleCodes: string[];
  artifactPrompt: string;
  estMinutes: number;
  competencies: Competency[];
};

const SCORE_LABELS = ["Shaky", "Getting there", "Solid", "Confident", "Could teach it"];

export function CompleteBuildForm({
  buildSlug,
  moduleCodes,
  artifactPrompt,
  estMinutes,
  competencies,
}: CompleteBuildFormProps) {
  const router = useRouter();
  const [artifactText, setArtifactText] = useState("");
  const [artifactLink, setArtifactLink] = useState("");
  const [selfScore, setSelfScore] = useState(3);
  const [competencyRatings, setCompetencyRatings] = useState<
    Partial<Record<Competency, number>>
  >({});
  const [timeSpent, setTimeSpent] = useState(estMinutes);
  const [moduleCode, setModuleCode] = useState(moduleCodes[0]);
  const [integrityConfirmed, setIntegrityConfirmed] = useState(false);

  const hasArtifact = artifactText.trim().length >= 40;
  const allRated = competencies.every((c) => competencyRatings[c] !== undefined);
  const canSubmit = hasArtifact && allRated && integrityConfirmed;

  function rateCompetency(c: Competency, score: number) {
    setCompetencyRatings((prev) => ({ ...prev, [c]: score }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    addLedgerEntry({
      buildSlug,
      moduleCode,
      selfScore,
      competencySelfRatings: competencyRatings,
      timeSpentMin: timeSpent,
      artifactText: artifactText.trim(),
      artifactLink: artifactLink.trim() || undefined,
      integrityConfirmed,
    });
    router.push("/ledger");
  }

  return (
    <form onSubmit={submit} className="mt-12 border-t-2 border-ink pt-8">
      <h2 className="font-display text-xl text-ink">Stamp it into your ledger</h2>
      <p className="mt-2 text-xs text-ink-muted">
        Entries are stamped with what they actually are: your artifact plus
        your self-assessment. Peer and lecturer verification is a later tier —
        we never label self-reported work &ldquo;verified&rdquo;.
      </p>

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
        Your artifact <span className="text-biro">(required)</span>
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
          {hasArtifact
            ? "Artifact attached — this is what makes the entry evidence."
            : "At least 40 characters — no artifact, no stamp."}
        </span>
      </label>

      <label className="mt-4 block text-sm font-medium text-ink">
        Link to your work <span className="text-ink-muted">(optional)</span>
        <input
          type="url"
          value={artifactLink}
          onChange={(e) => setArtifactLink(e.target.value)}
          placeholder="e.g. a shared doc, gist, or chat transcript link"
          className="mt-2 w-full border border-rule bg-card px-3 py-2.5 font-mono text-xs text-ink placeholder:font-sans placeholder:text-sm placeholder:text-ink-muted"
        />
      </label>

      <div className="mt-6">
        <p className="text-sm font-medium text-ink">
          Rate yourself against each competency this build trains
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          1 = shaky, 5 = could teach it. Stored with the entry as your
          self-assessment.
        </p>
        <div className="mt-3 flex flex-col gap-3">
          {competencies.map((c) => (
            <div
              key={c}
              className="flex flex-wrap items-center justify-between gap-2 border border-rule bg-card px-3 py-2"
            >
              <span className="text-sm text-ink">{competencyLabels[c]}</span>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    type="button"
                    aria-label={`${competencyLabels[c]}: ${score} of 5`}
                    onClick={() => rateCompetency(c, score)}
                    className={`h-8 w-8 rounded-sm border font-mono text-xs ${
                      (competencyRatings[c] ?? 0) >= score
                        ? "border-biro bg-biro text-white"
                        : "border-rule bg-paper text-ink-muted hover:border-ink-muted"
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-ink">
            Overall, how solid does this feel? ({SCORE_LABELS[selfScore - 1]})
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

      <label className="mt-6 flex cursor-pointer items-start gap-3 border-l-2 border-verified bg-verified-faint px-4 py-3">
        <input
          type="checkbox"
          checked={integrityConfirmed}
          onChange={(e) => setIntegrityConfirmed(e.target.checked)}
          className="mt-0.5 accent-verified"
        />
        <span className="text-sm leading-relaxed text-ink">
          I did the verification step myself, and nothing from this build goes
          into assessed work uncited or against my module&apos;s AI policy.
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-8 rounded-sm bg-verified px-6 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
      >
        Stamp into ledger
      </button>
      {!canSubmit ? (
        <p className="mt-2 text-xs text-ink-muted">
          To stamp: attach your artifact, rate every competency, and confirm
          the integrity line.
        </p>
      ) : null}
    </form>
  );
}
