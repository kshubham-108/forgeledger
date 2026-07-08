export type University = {
  id: string;
  slug: string;
  name: string;
  city: string;
  /* Student email domain suffix(es), e.g. ["bristol.ac.uk"]. Checked as
     "ends with", so college/department subdomains (Oxbridge) match too. */
  emailDomains: string[];
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
  | "computer-science"
  | "economics"
  | "maths"
  | "medicine";

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
  /* The concrete skill you walk away with. */
  deliverable: string;
  /* Why 25 minutes of doing beats an hour of watching. */
  whyDoing: string;
  steps: string[];
  /* Ground rules: safe, honest use — not proof, not policing. */
  groundRules: {
    /* What this build trains. */
    trains: string;
    /* What it must never be used for. */
    notFor: string;
    /* The checking habit baked into the exercise itself. */
    builtInCheck: string;
  };
  /* Suggestion for the optional personal note when logging the build. */
  notePrompt: string;
};

/*
  A recent AI advance from the feeds Fluent watches — arXiv preprints,
  vendor product updates, and model/tool releases — mapped to the modules
  it matters for and, where one exists, the build that turns it into a skill.
*/
export type Advance = {
  id: string;
  title: string;
  source: "arXiv" | "vendor" | "release";
  date: string;
  whyItMatters: string;
  moduleCodes: string[];
  relatedBuildSlug?: string;
};

/* 1–5 self-ratings across competencies — personal progress, nothing more. */
export type SnapshotRatings = Partial<Record<Competency, number>>;

export type Profile = {
  displayName: string;
  universityId: string;
  /* The course chosen at registration — same vocabulary as Module/MicroBuild
     discipline. Optional for backward compatibility with profiles saved
     before this field existed. */
  discipline?: Discipline;
  moduleIds: string[];
  hoursPerWeek: number;
  /* Optional capability snapshot taken at onboarding (or later). */
  snapshot?: SnapshotRatings;
  createdAt: string;
};

/* One completed build in the student's personal build log. */
export type LogEntry = {
  id: string;
  serial: string;
  buildSlug: string;
  moduleCode: string;
  /* Overall "how confident do you feel now?" — 1–5, for the student's own eyes. */
  confidence: number;
  /* Per-competency confidence after the build. */
  competencyRatings?: Partial<Record<Competency, number>>;
  timeSpentMin: number;
  /* Optional note about what you made, kept for your own reference. */
  note: string;
  noteLink?: string;
  groundRulesConfirmed?: boolean;
  completedAt: string;
};
