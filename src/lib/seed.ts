import type {
  Competency,
  EvidenceStatus,
  MicroBuild,
  Module,
  RadarItem,
  University,
} from "./types";

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
    competencyScores: {
      "prompt-craft": 2,
      evaluation: 3,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "Semantic Scholar", "Google Scholar"],
    summary:
      "Build a repeatable prompt chain that drafts a literature search strategy, then verify every citation it produces against a real database.",
    deliverable:
      "A reusable search-strategy prompt chain plus a hallucination audit log with real / distorted / invented counts for every citation the model offered.",
    whyNotYoutube:
      "A video shows someone else's search. This build runs against your module's actual topic list, and the audit log — which citations the model invented for your topic — only exists once you do the checking yourself.",
    steps: [
      "Write a prompt that asks the model for a search strategy (keywords, synonyms, inclusion criteria) for a topic from your module — not for papers themselves.",
      "Run the strategy on Semantic Scholar or Google Scholar and collect 5 real papers.",
      "Now ask the model to summarise the 5 papers from their abstracts, which you paste in yourself.",
      "Audit: ask the model for 3 more papers without pasting abstracts, then check each one exists. Log which were real, distorted, or invented.",
      "Record your verified workflow: the prompts you kept, the ones you discarded, and your audit result.",
    ],
    integrity: {
      trains:
        "Designing search strategies with AI and auditing AI-supplied citations against real databases.",
      notFor:
        "Not for generating a reference list for coursework, or letting the model supply citations you have not opened and read.",
      verificationStep:
        "Step 4 is the gate: every citation the model produces is checked against Semantic Scholar or Google Scholar by hand, and the audit log is the artifact you submit.",
    },
    artifactPrompt:
      "Paste your final prompt chain and your hallucination audit log (real / distorted / invented counts).",
  },
  {
    slug: "law-issue-spotting-chain",
    title: "Case-brief issue-spotting chain with a source audit",
    discipline: "law",
    moduleCodes: ["LAW2041", "LAW2086"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    competencyScores: {
      "prompt-craft": 3,
      evaluation: 2,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "BAILII", "legislation.gov.uk"],
    summary:
      "Design a prompt chain that extracts issues from a judgment you supply, then audit every authority the model cites.",
    deliverable:
      "An issue-spotting prompt chain that forces the model to quote its supporting passage, plus an authority audit marking each cited case genuine or invented.",
    whyNotYoutube:
      "Generic 'AI for law' videos never touch a judgment from your reading list. Here the model works over a BAILII extract you chose, and the audit of invented authorities is evidence of a skill — spotting fabricated case law — that watching cannot produce.",
    steps: [
      "Pick a judgment from BAILII that your module covers and copy a manageable extract.",
      "Prompt the model to identify the legal issues, applying IRAC structure to your extract only.",
      "Ask it to list the authorities it relied on. Check each against BAILII or legislation.gov.uk.",
      "Rewrite the prompt so the model must quote the passage supporting each issue it spots.",
      "Log which authorities were genuine and which were invented, and keep your final chain.",
    ],
    integrity: {
      trains:
        "Structured legal analysis prompting and verifying AI-cited authorities against BAILII and legislation.gov.uk.",
      notFor:
        "Not for drafting assessed problem answers or moot submissions, and never for citing an authority you have not verified exists.",
      verificationStep:
        "Steps 3 and 5 are the gate: each authority the model names is looked up on BAILII or legislation.gov.uk, and the genuine-vs-invented log is the artifact.",
    },
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
    competencyScores: {
      evaluation: 3,
      "workflow-design": 2,
      "ethics-citation": 2,
    },
    freeTools: ["ChatGPT (free)", "British Library digitised sources", "Internet Archive"],
    summary:
      "Have the model compare two primary sources you supply, then produce a correction log proving where its reading fails.",
    deliverable:
      "A before/after prompt comparison and a line-by-line correction log marking every model claim supported, unsupported, or wrong against the original sources.",
    whyNotYoutube:
      "The correction log cannot be watched into existence. It documents where the model misread your two sources — sources tied to your module period — and the refinement step shows you can systematically reduce a failure mode you diagnosed.",
    steps: [
      "Choose two short primary sources from your module period (letters, speeches, newspaper extracts).",
      "Prompt the model to compare authorship, audience, and bias — pasting the full text of both.",
      "Check its claims against the sources line by line. Mark each claim supported, unsupported, or wrong.",
      "Refine your prompt once to reduce the failure you saw most, and re-run.",
      "Keep the before/after comparison and your correction log as the artifact.",
    ],
    integrity: {
      trains:
        "Critical evaluation of AI readings of primary sources, and iterating prompts against a documented failure mode.",
      notFor:
        "Not for producing source-analysis paragraphs for assessed essays, or presenting the model's reading as your own.",
      verificationStep:
        "Step 3 is the gate: every claim the model makes is checked line by line against the original text, and the marked-up correction log is the artifact.",
    },
    artifactPrompt:
      "Paste your correction log (claims marked supported / unsupported / wrong) and one sentence on what the refined prompt fixed.",
  },
  {
    slug: "business-competitor-scan",
    title: "Competitor scan template with cited sources only",
    discipline: "business",
    moduleCodes: ["BMAN2011", "LUBS2005"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 3,
      "tool-integration": 2,
      evaluation: 2,
    },
    freeTools: ["ChatGPT (free)", "Companies House", "company annual reports"],
    summary:
      "Build a reusable competitor-scan workflow where every claim in the output traces to a source you gathered.",
    deliverable:
      "A reusable scan template with placeholder slots, plus one filled-in comparison of two real UK companies where every row traces to a source you collected.",
    whyNotYoutube:
      "A tutorial gives you someone else's template for someone else's market. This one is built and tested against Companies House filings you pulled yourself, with a delete-anything-unsourced rule that trains the discipline videos skip.",
    steps: [
      "Pick two UK companies relevant to your module case studies.",
      "Gather raw inputs yourself: latest annual report summary, Companies House filing dates, pricing page text.",
      "Design one prompt template that turns your pasted inputs into a structured comparison table.",
      "Test it on both companies. Delete any output row that cites nothing you supplied.",
      "Save the template with placeholder slots so you can rerun it for any pair of companies.",
    ],
    integrity: {
      trains:
        "Designing reusable analysis workflows where the AI formats and contrasts only what you sourced.",
      notFor:
        "Not for fabricating market data in assessed reports, or presenting model-invented figures as research.",
      verificationStep:
        "Step 4 is the gate: any row in the output that does not trace to an input you gathered gets deleted, and the source notes ship with the artifact.",
    },
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
    competencyScores: {
      "prompt-craft": 2,
      evaluation: 3,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "NHS website", "NICE guidance"],
    summary:
      "Draft a patient information leaflet with AI, then verify every clinical claim against NHS and NICE guidance.",
    deliverable:
      "A corrected plain-English leaflet plus a completed claim-by-claim verification checklist (claim / source / verdict) against NHS and NICE text.",
    whyNotYoutube:
      "No video verifies clinical claims for the condition your module covers this term. The checklist — including the claims you had to delete — is the safety habit itself, practised on real NHS and NICE guidance, not demonstrated at you.",
    steps: [
      "Choose a condition covered in your module and find its NHS page and any NICE guidance.",
      "Prompt the model for a plain-English leaflet draft at a reading age of 11, for that condition.",
      "Build a checklist: list every clinical claim in the draft, one row each.",
      "Verify each row against NHS/NICE text. Correct or delete anything unsupported.",
      "Keep the corrected leaflet plus your completed checklist.",
    ],
    integrity: {
      trains:
        "Clinical-communication drafting with AI and claim-by-claim verification against NHS and NICE guidance.",
      notFor:
        "Not for assessed care plans or reflective writing, and never for real patient-facing material without qualified sign-off.",
      verificationStep:
        "Steps 3 and 4 are the gate: every clinical claim gets its own checklist row verified against NHS or NICE text, and unsupported claims are corrected or deleted before the artifact is submitted.",
    },
    artifactPrompt:
      "Paste your verification checklist (claim / source / verdict) and note any claim you had to remove.",
  },
  {
    slug: "cs-data-cleaner",
    title: "Small data cleaner with tests, written before the AI helps",
    discipline: "computer-science",
    moduleCodes: ["COMP2001"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 3,
      "tool-integration": 3,
      evaluation: 2,
    },
    freeTools: ["Python", "a free LLM chat", "data.gov.uk open datasets"],
    summary:
      "Write failing tests for a messy open dataset first, then use AI to draft the cleaner and make your tests pass.",
    deliverable:
      "A test file you authored before any AI involvement, a passing cleaning script, and an iteration log showing how many prompt attempts each test needed.",
    whyNotYoutube:
      "Copilot tutorials show code appearing; they never make you define correctness first. Writing the tests before the AI touches anything — and refining prompts instead of hand-patching — is a working practice you can only acquire by doing it on a dataset you picked.",
    steps: [
      "Pick a small messy CSV from data.gov.uk (missing values, mixed date formats).",
      "Write 4–5 tests describing the clean output you want, before any AI involvement.",
      "Prompt the model for a cleaning script, pasting your tests as the specification.",
      "Run the tests. For each failure, refine the prompt rather than hand-patching the code.",
      "Log how many prompt iterations each test needed to pass.",
    ],
    integrity: {
      trains:
        "Specification-first AI coding: you define correctness in tests, the model writes to your spec.",
      notFor:
        "Not for submitting AI-written code to assessed coursework where your module prohibits it — check your module's AI policy first.",
      verificationStep:
        "Steps 2 and 4 are the gate: the tests exist before the AI is involved, they define correctness, and the iteration log proves the loop ran.",
    },
    artifactPrompt:
      "Paste your test file and the iteration log (test / attempts to pass).",
  },
];

/*
  Radar: worked examples of the advance → module → build loop.
  Each item is a real, plausible advance mapped to a pilot module and a
  micro-build in the catalogue. In MVP 1 these come from the daily ingest
  pipeline; here they demonstrate the loop end-to-end with concrete content.
*/
export const radarItems: RadarItem[] = [
  {
    id: "radar-psyc-elicit-screening",
    title:
      "arXiv: LLM-assisted abstract screening reaches 97% recall in systematic reviews — but only with human verification loops",
    sourceType: "arXiv preprint",
    source: "arXiv cs.CL",
    date: "30 Jun 2026",
    discipline: "psychology",
    moduleCodes: ["PSYC2017", "PSYC2520"],
    summary:
      "A new evaluation of GPT-class models screening abstracts for systematic reviews found high recall only when every exclusion decision was spot-checked by a human reviewer. Fully automated screening silently dropped eligible papers.",
    whyItMatters:
      "PSYC2017 teaches PRISMA-style search and screening. This is the exact human-in-the-loop pattern your lab reports will be marked on — and the failure mode (silent exclusions) is what the linked build trains you to catch.",
    buildSlug: "psych-literature-pipeline",
  },
  {
    id: "radar-law-fabricated-citations",
    title:
      "Courts and tribunals judiciary updates guidance after another fabricated-authority incident in submissions",
    sourceType: "Regulator / judiciary guidance",
    source: "Courts and Tribunals Judiciary",
    date: "26 Jun 2026",
    discipline: "law",
    moduleCodes: ["LAW2041", "LAW2086"],
    summary:
      "Updated judicial guidance re-emphasises that lawyers are personally responsible for verifying every authority in submissions, after AI-drafted documents citing non-existent cases reached court again.",
    whyItMatters:
      "Fabricated authorities are now a professional-conduct issue, not a curiosity. The linked build makes you produce a genuine-vs-invented audit of AI-cited cases from a judgment on your LAW2041 reading list.",
    buildSlug: "law-issue-spotting-chain",
  },
  {
    id: "radar-nursing-nhs-ai-guidance",
    title:
      "NHS England publishes guidance on AI-generated patient information: human clinical verification required",
    sourceType: "NHS guidance",
    source: "NHS England",
    date: "23 Jun 2026",
    discipline: "nursing",
    moduleCodes: ["NURS2301"],
    summary:
      "New guidance for trusts sets out when AI drafting of patient-facing material is acceptable: reading-age targets, mandatory claim-by-claim clinical verification, and named human sign-off before anything reaches a patient.",
    whyItMatters:
      "This is the workflow NURS2301's evidence-based-practice framing points at. The linked build has you draft a leaflet at reading age 11 and verify every clinical claim against NHS and NICE text — the same gate the guidance now mandates.",
    buildSlug: "nursing-patient-leaflet",
  },
  {
    id: "radar-psyc-hallucinated-dois",
    title:
      "Study: one in five AI-suggested psychology citations has a wrong or invented DOI",
    sourceType: "Journal article",
    source: "Behavior Research Methods",
    date: "18 Jun 2026",
    discipline: "psychology",
    moduleCodes: ["PSYC2017"],
    summary:
      "An audit of LLM-suggested references across psychology subfields found ~20% pointed to wrong papers or nowhere at all, with error rates highest for pre-2010 literature and niche subtopics.",
    whyItMatters:
      "Your PSYC2017 coursework penalises unverifiable references. The linked build's hallucination audit gives you a personal error-rate measurement for your own topic — evidence you check sources, not vibes.",
    buildSlug: "psych-literature-pipeline",
  },
  {
    id: "radar-hist-newspaper-ocr",
    title:
      "British Library releases improved OCR layer for 19th-century newspaper archive — transcription errors still cluster in names and dates",
    sourceType: "Archive release",
    source: "British Library Labs",
    date: "16 Jun 2026",
    discipline: "history",
    moduleCodes: ["HIST2260", "HIST2400"],
    summary:
      "The refreshed OCR makes thousands of 19th-century newspapers keyword-searchable, but the release notes flag persistent errors in proper nouns and dates — exactly what LLMs then confidently misread.",
    whyItMatters:
      "More searchable sources for HIST2260 essays, and a sharper reason to verify: if the OCR garbles a name and the model builds a claim on it, only your line-by-line correction log catches it. That is the linked build.",
    buildSlug: "history-source-comparison",
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

/*
  Honest provenance labels. "Externally verified" exists in the type so the
  UI can show it as a future tier — no MVP 0 entry ever gets it.
*/
export const evidenceStatusLabels: Record<EvidenceStatus, string> = {
  "self-assessed": "Self-assessed",
  "artifact-attached": "Artifact attached",
  "externally-verified": "Peer/lecturer verified",
};

/* Cohort features stay locked until real density exists per discipline. */
export const COHORT_UNLOCK_THRESHOLD = 500;

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

export function getRadarItemsForModuleCodes(codes: string[]): RadarItem[] {
  const codeSet = new Set(codes);
  return radarItems.filter((r) => r.moduleCodes.some((c) => codeSet.has(c)));
}
