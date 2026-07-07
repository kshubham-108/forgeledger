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
  freeTools: string[];
  summary: string;
  steps: string[];
  ethicsNote: string;
  artifactPrompt: string;
};

export type Profile = {
  displayName: string;
  universityId: string;
  moduleIds: string[];
  hoursPerWeek: number;
  createdAt: string;
};

export type LedgerEntry = {
  id: string;
  serial: string;
  buildSlug: string;
  moduleCode: string;
  selfScore: number;
  timeSpentMin: number;
  artifactText: string;
  completedAt: string;
};
