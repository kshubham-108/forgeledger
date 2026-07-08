import type {
  Advance,
  Competency,
  Discipline,
  MicroBuild,
  Module,
  University,
} from "../types";

export const advances: Advance[] = [
  {
    id: "adv-screening-recall",
    title:
      "LLM abstract screening hits 97% recall in systematic reviews — but only with a human spot-check loop",
    source: "arXiv",
    date: "3 Jul 2026",
    whyItMatters:
      "The human-in-the-loop screening pattern your methods module teaches is the one that actually works — fully automated runs silently dropped eligible papers.",
    moduleCodes: ["PSYC2017", "PSYC2520"],
    relatedBuildSlug: "psych-literature-pipeline",
  },
  {
    id: "adv-grounded-citations",
    title:
      "Frontier chat models now attach live source links to legal answers by default",
    source: "release",
    date: "1 Jul 2026",
    whyItMatters:
      "Linked sources still need opening — models happily cite real pages that don't say what they claim. Checking authorities just got faster, not optional.",
    moduleCodes: ["LAW2041", "LAW2086"],
    relatedBuildSlug: "law-issue-spotting-chain",
  },
  {
    id: "adv-deep-research",
    title:
      "Deep-research agents can now run 30-minute multi-source investigations unattended",
    source: "vendor",
    date: "27 Jun 2026",
    whyItMatters:
      "Brilliant for mapping a debate fast — if you can tell where the agent's tidy synthesis flattens a live disagreement.",
    moduleCodes: ["HIST2260", "HIST2400"],
    relatedBuildSlug: "history-deep-research-map",
  },
  {
    id: "adv-reading-age",
    title:
      "Study: LLMs hold a target reading age far better when shown exemplar text than when given a number",
    source: "arXiv",
    date: "24 Jun 2026",
    whyItMatters:
      "Changes how you prompt for patient-facing drafts: paste an exemplar paragraph instead of asking for 'reading age 11'.",
    moduleCodes: ["NURS2301", "NURS2270"],
    relatedBuildSlug: "nursing-patient-leaflet",
  },
  {
    id: "adv-agent-coding",
    title:
      "Coding agents that run your test suite before replying reach free tiers",
    source: "vendor",
    date: "19 Jun 2026",
    whyItMatters:
      "Spec-first habits pay off double now the agent can execute your tests itself — write them first and it converges in fewer tries.",
    moduleCodes: ["COMP2001", "COMP2611"],
    relatedBuildSlug: "cs-data-cleaner",
  },
  {
    id: "adv-small-models",
    title:
      "New open-weights 7B model matches last year's frontier on structured extraction",
    source: "release",
    date: "16 Jun 2026",
    whyItMatters:
      "Structured extraction now runs on a laptop with no API bill — worth knowing which jobs small local models do well.",
    moduleCodes: ["COMP2001", "COMP2611"],
    relatedBuildSlug: "cs-agent-code-review",
  },
  {
    id: "adv-sheets-agent",
    title:
      "Spreadsheet AI agents can now pull filings and draft comparison tables on request",
    source: "vendor",
    date: "12 Jun 2026",
    whyItMatters:
      "Auto-built tables look finished but every cell still needs a source you can open — the sourcing habit is the skill.",
    moduleCodes: ["BMAN2011", "LUBS2005"],
    relatedBuildSlug: "business-competitor-scan",
  },
  {
    id: "adv-invented-dois",
    title:
      "One in five AI-suggested psychology citations still points at a wrong or invented DOI",
    source: "arXiv",
    date: "9 Jun 2026",
    whyItMatters:
      "Reference lists remain the fastest way to lose marks with AI. Measure the error rate on your own topic before you trust a suggestion.",
    moduleCodes: ["PSYC2017"],
    relatedBuildSlug: "psych-literature-pipeline",
  },
];


export function getAdvancesForModuleCodes(codes: string[]): Advance[] {
  const codeSet = new Set(codes);
  return advances.filter((a) => a.moduleCodes.some((c) => codeSet.has(c)));
}
