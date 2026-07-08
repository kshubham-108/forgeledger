import type {
  Advance,
  Competency,
  Discipline,
  MicroBuild,
  Module,
  University,
} from "../types";

export const competencyLabels: Record<Competency, string> = {
  "prompt-craft": "Prompt craft",
  evaluation: "Evaluation & verification",
  "workflow-design": "Workflow design",
  "tool-integration": "Tool integration",
  "ethics-citation": "Ethics & citation",
};

/* The four competencies rated in the onboarding capability snapshot. */
export const snapshotCompetencies: Competency[] = [
  "prompt-craft",
  "evaluation",
  "workflow-design",
  "ethics-citation",
];

export const advanceSourceLabels: Record<Advance["source"], string> = {
  arXiv: "arXiv",
  vendor: "Vendor update",
  release: "Release",
};

export const disciplineLabels: Record<MicroBuild["discipline"], string> = {
  psychology: "Psychology",
  law: "Law",
  history: "History",
  business: "Business",
  nursing: "Nursing",
  "computer-science": "Computer Science",
  economics: "Economics",
  maths: "Maths",
  medicine: "Medicine",
};

