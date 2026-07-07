export type University = {
  id: string;
  slug: string;
  name: string;
  city: string;
};

export type Module = {
  id: string;
  universityId: string;
  code: string;
  title: string;
  discipline: Discipline;
  year: number;
};

export type Discipline =
  | "psychology"
  | "law"
  | "history"
  | "business"
  | "nursing"
  | "computer-science";

export type Competency =
  | "prompt-craft"
  | "evaluation"
  | "workflow-design"
  | "tool-integration"
  | "ethics-citation";

export type MicroBuild = {
  slug: string;
  title: string;
  discipline: Discipline;
  moduleCodes: string[];
  estMinutes: number;
  competencies: Competency[];
  /* Weight (1–3) per trained competency — how hard this build works each one. */
  competencyScores: Partial<Record<Competency, number>>;
  freeTools: string[];
  summary: string;
  /* The concrete thing you walk away with. */
  deliverable: string;
  /* The "one killer build" test: why a YouTube video can't substitute. */
  whyNotYoutube: string;
  steps: string[];
  integrity: {
    /* What this build trains. */
    trains: string;
    /* What it must NOT be used for. */
    notFor: string;
    /* The citation/verification step baked into the exercise itself. */
    verificationStep: string;
  };
  artifactPrompt: string;
};

export type RadarItem = {
  id: string;
  title: string;
  /* e.g. "arXiv preprint", "regulator guidance", "vendor release" */
  sourceType: string;
  source: string;
  date: string;
  discipline: Discipline;
  moduleCodes: string[];
  summary: string;
  whyItMatters: string;
  buildSlug: string;
};

export type Profile = {
  displayName: string;
  universityId: string;
  moduleIds: string[];
  hoursPerWeek: number;
  createdAt: string;
};

/*
  Honest evidence provenance for a ledger entry. MVP 0 can only produce the
  first two; external verification ships later and is never claimed early.
*/
export type EvidenceStatus =
  | "self-assessed"
  | "artifact-attached"
  | "externally-verified";

export type LedgerEntry = {
  id: string;
  serial: string;
  buildSlug: string;
  moduleCode: string;
  selfScore: number;
  /* 1–5 self-rating against each competency the build names. */
  competencySelfRatings?: Partial<Record<Competency, number>>;
  timeSpentMin: number;
  artifactText: string;
  artifactLink?: string;
  evidenceStatus?: EvidenceStatus;
  integrityConfirmed?: boolean;
  completedAt: string;
};
