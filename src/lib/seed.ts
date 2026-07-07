import type { Competency, MicroBuild, Module, University } from "./types";

export const universities: University[] = [
  {
    id: "uni-manchester",
    slug: "manchester",
    name: "University of Manchester",
    city: "Manchester",
  },
  { id: "uni-leeds", slug: "leeds", name: "University of Leeds", city: "Leeds" },
];

export const modules: Module[] = [
  {
    id: "mod-psyc2017",
    universityId: "uni-manchester",
    code: "PSYC2017",
    title: "Research Methods and Statistics",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-law2041",
    universityId: "uni-manchester",
    code: "LAW2041",
    title: "Contract Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-hist2260",
    universityId: "uni-manchester",
    code: "HIST2260",
    title: "Sources and Methods in Modern History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-bman2011",
    universityId: "uni-manchester",
    code: "BMAN2011",
    title: "Marketing Analysis and Strategy",
    discipline: "business",
    year: 2,
  },
  {
    id: "mod-nurs2301",
    universityId: "uni-manchester",
    code: "NURS2301",
    title: "Evidence-Based Practice",
    discipline: "nursing",
    year: 2,
  },
  {
    id: "mod-comp2001",
    universityId: "uni-manchester",
    code: "COMP2001",
    title: "Software Engineering",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-psyc2520",
    universityId: "uni-leeds",
    code: "PSYC2520",
    title: "Cognitive Psychology",
    discipline: "psychology",
    year: 2,
  },
  {
    id: "mod-law2086",
    universityId: "uni-leeds",
    code: "LAW2086",
    title: "Criminal Law",
    discipline: "law",
    year: 2,
  },
  {
    id: "mod-hist2400",
    universityId: "uni-leeds",
    code: "HIST2400",
    title: "The Practice of History",
    discipline: "history",
    year: 2,
  },
  {
    id: "mod-lubs2005",
    universityId: "uni-leeds",
    code: "LUBS2005",
    title: "Consumer Behaviour",
    discipline: "business",
    year: 2,
  },
];

export const microBuilds: MicroBuild[] = [
  {
    slug: "psych-literature-pipeline",
    title: "Literature search pipeline with a hallucination audit",
    discipline: "psychology",
    moduleCodes: ["PSYC2017", "PSYC2520"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    freeTools: ["ChatGPT (free)", "Semantic Scholar", "Google Scholar"],
    summary:
      "Build a repeatable prompt chain that drafts a literature search strategy, then verify every citation it produces against a real database.",
    steps: [
      "Write a prompt that asks the model for a search strategy (keywords, synonyms, inclusion criteria) for a topic from your module — not for papers themselves.",
      "Run the strategy on Semantic Scholar or Google Scholar and collect 5 real papers.",
      "Now ask the model to summarise the 5 papers from their abstracts, which you paste in yourself.",
      "Audit: ask the model for 3 more papers without pasting abstracts, then check each one exists. Log which were real, distorted, or invented.",
      "Record your verified workflow: the prompts you kept, the ones you discarded, and your audit result.",
    ],
    ethicsNote:
      "You verify every source by hand. AI drafts strategy; it never supplies citations you have not checked.",
    artifactPrompt:
      "Paste your final prompt chain and your hallucination audit log (real / distorted / invented counts).",
  },
  {
    slug: "law-issue-spotting-chain",
    title: "Case-brief issue-spotting chain with a source audit",
    discipline: "law",
    moduleCodes: ["LAW2041", "LAW2086"],
    estMinutes: 30,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    freeTools: ["ChatGPT (free)", "BAILII", "legislation.gov.uk"],
    summary:
      "Design a prompt chain that extracts issues from a judgment you supply, then audit every authority the model cites.",
    steps: [
      "Pick a judgment from BAILII that your module covers and copy a manageable extract.",
      "Prompt the model to identify the legal issues, applying IRAC structure to your extract only.",
      "Ask it to list the authorities it relied on. Check each against BAILII or legislation.gov.uk.",
      "Rewrite the prompt so the model must quote the passage supporting each issue it spots.",
      "Log which authorities were genuine and which were invented, and keep your final chain.",
    ],
    ethicsNote:
      "The model reasons over text you supply. Any authority it names is unverified until you check it yourself.",
    artifactPrompt:
      "Paste your final issue-spotting prompt and your authority audit (genuine vs invented).",
  },
  {
    slug: "history-source-comparison",
    title: "Primary-source comparison with a correction log",
    discipline: "history",
    moduleCodes: ["HIST2260", "HIST2400"],
    estMinutes: 25,
    competencies: ["evaluation", "workflow-design", "ethics-citation"],
    freeTools: ["ChatGPT (free)", "British Library digitised sources", "Internet Archive"],
    summary:
      "Have the model compare two primary sources you supply, then produce a correction log proving where its reading fails.",
    steps: [
      "Choose two short primary sources from your module period (letters, speeches, newspaper extracts).",
      "Prompt the model to compare authorship, audience, and bias — pasting the full text of both.",
      "Check its claims against the sources line by line. Mark each claim supported, unsupported, or wrong.",
      "Refine your prompt once to reduce the failure you saw most, and re-run.",
      "Keep the before/after comparison and your correction log as the artifact.",
    ],
    ethicsNote:
      "The correction log is the point: you demonstrate critical reading the model cannot do for you.",
    artifactPrompt:
      "Paste your correction log (claims marked supported / unsupported / wrong) and one sentence on what the refined prompt fixed.",
  },
  {
    slug: "business-competitor-scan",
    title: "Competitor scan template with cited sources only",
    discipline: "business",
    moduleCodes: ["BMAN2011", "LUBS2005"],
    estMinutes: 30,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    freeTools: ["ChatGPT (free)", "Companies House", "company annual reports"],
    summary:
      "Build a reusable competitor-scan workflow where every claim in the output traces to a source you gathered.",
    steps: [
      "Pick two UK companies relevant to your module case studies.",
      "Gather raw inputs yourself: latest annual report summary, Companies House filing dates, pricing page text.",
      "Design one prompt template that turns your pasted inputs into a structured comparison table.",
      "Test it on both companies. Delete any output row that cites nothing you supplied.",
      "Save the template with placeholder slots so you can rerun it for any pair of companies.",
    ],
    ethicsNote:
      "No claim without a source you collected. The model formats and contrasts; it does not research.",
    artifactPrompt:
      "Paste your reusable template and one filled-in comparison table with source notes.",
  },
  {
    slug: "nursing-patient-leaflet",
    title: "Patient-education draft with a verification checklist",
    discipline: "nursing",
    moduleCodes: ["NURS2301"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    freeTools: ["ChatGPT (free)", "NHS website", "NICE guidance"],
    summary:
      "Draft a patient information leaflet with AI, then verify every clinical claim against NHS and NICE guidance.",
    steps: [
      "Choose a condition covered in your module and find its NHS page and any NICE guidance.",
      "Prompt the model for a plain-English leaflet draft at a reading age of 11, for that condition.",
      "Build a checklist: list every clinical claim in the draft, one row each.",
      "Verify each row against NHS/NICE text. Correct or delete anything unsupported.",
      "Keep the corrected leaflet plus your completed checklist.",
    ],
    ethicsNote:
      "Clinical accuracy is verified by you against NHS and NICE sources — never assumed from the model.",
    artifactPrompt:
      "Paste your verification checklist (claim / source / verdict) and note any claim you had to remove.",
  },
  {
    slug: "cs-data-cleaner",
    title: "Small data cleaner with tests, written before the AI helps",
    discipline: "computer-science",
    moduleCodes: ["COMP2001"],
    estMinutes: 40,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    freeTools: ["Python", "a free LLM chat", "data.gov.uk open datasets"],
    summary:
      "Write failing tests for a messy open dataset first, then use AI to draft the cleaner and make your tests pass.",
    steps: [
      "Pick a small messy CSV from data.gov.uk (missing values, mixed date formats).",
      "Write 4–5 tests describing the clean output you want, before any AI involvement.",
      "Prompt the model for a cleaning script, pasting your tests as the specification.",
      "Run the tests. For each failure, refine the prompt rather than hand-patching the code.",
      "Log how many prompt iterations each test needed to pass.",
    ],
    ethicsNote:
      "Tests come from you and define correctness. The model writes to your specification, not the reverse.",
    artifactPrompt:
      "Paste your test file and the iteration log (test / attempts to pass).",
  },
];

export const competencyLabels: Record<Competency, string> = {
  "prompt-craft": "Prompt craft",
  evaluation: "Evaluation",
  "workflow-design": "Workflow design",
  "tool-integration": "Tool integration",
  "ethics-citation": "Ethics & citation",
};

export const disciplineLabels: Record<MicroBuild["discipline"], string> = {
  psychology: "Psychology",
  law: "Law",
  history: "History",
  business: "Business",
  nursing: "Nursing",
  "computer-science": "Computer Science",
};

const buildBySlugMap = new Map(microBuilds.map((b) => [b.slug, b]));
const moduleByIdMap = new Map(modules.map((m) => [m.id, m]));

export function getBuildBySlug(slug: string): MicroBuild | undefined {
  return buildBySlugMap.get(slug);
}

export function getModuleById(id: string): Module | undefined {
  return moduleByIdMap.get(id);
}

export function getModulesForUniversity(universityId: string): Module[] {
  return modules.filter((m) => m.universityId === universityId);
}

export function getBuildsForModuleCodes(codes: string[]): MicroBuild[] {
  const codeSet = new Set(codes);
  return microBuilds.filter((b) => b.moduleCodes.some((c) => codeSet.has(c)));
}
