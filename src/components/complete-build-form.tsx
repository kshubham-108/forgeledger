"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { competencyLabels } from "@/lib/seed";
import { addLogEntryAndSync } from "@/lib/data-bridge";
import type { Competency } from "@/lib/types";

type CompleteBuildFormProps = {
  buildSlug: string;
  moduleCodes: string[];
  notePrompt: string;
  estMinutes: number;
  competencies: Competency[];
};

const SCORE_LABELS = [
  "Still shaky",
  "Getting there",
  "Solid",
  "Confident",
  "Could show a coursemate",
];

export function CompleteBuildForm({
  buildSlug,
  moduleCodes,
  notePrompt,
  estMinutes,
  competencies,
}: CompleteBuildFormProps) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [noteLink, setNoteLink] = useState("");
  const [confidence, setConfidence] = useState(3);
  const [competencyRatings, setCompetencyRatings] = useState<
    Partial<Record<Competency, number>>
  >({});
  const [timeSpent, setTimeSpent] = useState(estMinutes);
  const [moduleCode, setModuleCode] = useState(moduleCodes[0]);
  const [groundRulesConfirmed, setGroundRulesConfirmed] = useState(false);

  const allRated = competencies.every(
    (c) => competencyRatings[c] !== undefined,
  );
  const canSubmit = allRated && groundRulesConfirmed;

  function rateCompetency(c: Competency, score: number) {
    setCompetencyRatings((prev) => ({ ...prev, [c]: score }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    addLogEntryAndSync({
      buildSlug,
      moduleCode,
      confidence,
      competencyRatings,
      timeSpentMin: timeSpent,
      note: note.trim(),
      noteLink: noteLink.trim() || undefined,
      groundRulesConfirmed,
    });
    router.push("/ledger");
  }

  return (
    <form onSubmit={submit} className="mt-12 border-t-2 border-ink pt-8">
      <h2 className="font-display text-xl font-semibold text-ink">
        Done? Log it
      </h2>
      <p className="mt-2 text-xs text-ink-muted">
        Your log is a personal record — what you practised and how confident
        you feel now. Nobody is grading this.
      </p>

      {moduleCodes.length > 1 ? (
        <div className="mt-5">
          <p className="text-sm font-medium text-ink">
            Which module was this for?
          </p>
          <div className="mt-2 flex gap-2">
            {moduleCodes.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setModuleCode(code)}
                className={`rounded-sm border px-3 py-1.5 font-mono text-xs ${
                  moduleCode === code
                    ? "border-cobalt bg-cobalt text-white"
                    : "border-rule bg-card text-ink hover:border-ink-muted"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-6">
        <p className="text-sm font-medium text-ink">
          How confident do you feel now, skill by skill?
        </p>
        <p className="mt-1 text-xs text-ink-muted">
          1 = still shaky, 5 = could show a coursemate. Just for tracking your
          own progress.
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
                        ? "border-cobalt bg-cobalt text-white"
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
            Overall? ({SCORE_LABELS[confidence - 1]})
          </p>
          <div className="mt-2 flex gap-1.5">
            {SCORE_LABELS.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-label={`${i + 1} of 5: ${label}`}
                onClick={() => setConfidence(i + 1)}
                className={`h-9 w-9 rounded-sm border font-mono text-xs ${
                  confidence >= i + 1
                    ? "border-cobalt bg-cobalt text-white"
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

      <label className="mt-6 block text-sm font-medium text-ink">
        Save a note about what you made{" "}
        <span className="text-ink-muted">(optional)</span>
        <span className="mt-1 block text-xs font-normal text-ink-muted">
          {notePrompt}
        </span>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={5}
          placeholder="Your prompts, what worked, what you'd do differently…"
          className="mt-2 w-full border border-rule bg-card px-3 py-2.5 font-mono text-xs leading-relaxed text-ink placeholder:font-sans placeholder:text-sm placeholder:text-ink-muted"
        />
        <span className="mt-1 block text-xs font-normal text-ink-muted">
          For your own reference — future-you will thank you.
        </span>
      </label>

      <label className="mt-4 block text-sm font-medium text-ink">
        Link to your work <span className="text-ink-muted">(optional)</span>
        <input
          type="url"
          value={noteLink}
          onChange={(e) => setNoteLink(e.target.value)}
          placeholder="e.g. a shared doc, gist, or chat transcript link"
          className="mt-2 w-full border border-rule bg-card px-3 py-2.5 font-mono text-xs text-ink placeholder:font-sans placeholder:text-sm placeholder:text-ink-muted"
        />
      </label>

      <label className="mt-6 flex cursor-pointer items-start gap-3 border-l-2 border-cobalt bg-cobalt-faint px-4 py-3">
        <input
          type="checkbox"
          checked={groundRulesConfirmed}
          onChange={(e) => setGroundRulesConfirmed(e.target.checked)}
          className="mt-0.5 accent-cobalt"
        />
        <span className="text-sm leading-relaxed text-ink">
          I did the checking step myself, and nothing from this build goes
          into assessed work uncited or against my module&apos;s AI policy.
        </span>
      </label>

      <button
        type="submit"
        disabled={!canSubmit}
        className="mt-8 rounded-sm bg-cobalt px-6 py-3 text-sm font-medium text-white hover:bg-cobalt-deep disabled:cursor-not-allowed disabled:bg-rule disabled:text-ink-muted"
      >
        Add to my log
      </button>
      {!canSubmit ? (
        <p className="mt-2 text-xs text-ink-muted">
          Rate each skill and confirm the ground rules to log this build.
        </p>
      ) : null}
    </form>
  );
}
