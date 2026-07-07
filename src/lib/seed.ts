import type {
  Advance,
  Competency,
  MicroBuild,
  Module,
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
  {
    id: "mod-comp2611",
    universityId: "uni-leeds",
    code: "COMP2611",
    title: "Artificial Intelligence",
    discipline: "computer-science",
    year: 2,
  },
  {
    id: "mod-nurs2270",
    universityId: "uni-leeds",
    code: "NURS2270",
    title: "Applied Evidence-Based Nursing",
    discipline: "nursing",
    year: 2,
  },
];

export const microBuilds: MicroBuild[] = [
  {
    slug: "psych-literature-pipeline",
    title: "Run a literature search with AI — and catch every citation it invents",
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
      "Build a repeatable prompt chain that drafts a literature search strategy for a topic from your module, then learn to spot the citations the model makes up.",
    deliverable:
      "A reusable search-strategy prompt chain, plus a working sense of how often — and where — AI-suggested citations go wrong on your topic.",
    whyDoing:
      "A video shows someone else's search on someone else's topic. Run the pipeline on your module's actual topic list and you find out first-hand which citations the model invents for your field — an instinct you only get by doing the checking yourself.",
    steps: [
      "Write a prompt that asks the model for a search strategy (keywords, synonyms, inclusion criteria) for a topic from your module — not for papers themselves.",
      "Run the strategy on Semantic Scholar or Google Scholar and collect 5 real papers.",
      "Now ask the model to summarise the 5 papers from their abstracts, which you paste in yourself.",
      "Stress-test it: ask the model for 3 more papers without pasting abstracts, then check each one exists. Note which were real, distorted, or invented.",
      "Keep the prompts that worked and bin the ones that didn't — you now have a search pipeline you can rerun for any essay.",
    ],
    groundRules: {
      trains:
        "Designing search strategies with AI and checking AI-suggested citations against real databases.",
      notFor:
        "Not for generating a reference list for coursework, or citing anything you have not opened and read.",
      builtInCheck:
        "Step 4 is the habit: every citation the model offers gets looked up on Semantic Scholar or Google Scholar before you trust it.",
    },
    notePrompt:
      "Optional: save your final prompt chain and what the model got wrong, so future-you can rerun it.",
  },
  {
    slug: "law-issue-spotting-chain",
    title: "Build an issue-spotting chain that can't cite a case you haven't checked",
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
      "Design a prompt chain that pulls the legal issues out of a judgment you supply — and get fast at spotting fabricated case law.",
    deliverable:
      "An issue-spotting prompt chain that forces the model to quote its supporting passage, and the ability to tell a genuine authority from an invented one in minutes.",
    whyDoing:
      "Generic 'AI for law' videos never touch a judgment from your reading list. Work over a BAILII extract you chose and you practise the skill that keeps showing up in professional-conduct headlines: spotting case law that doesn't exist.",
    steps: [
      "Pick a judgment from BAILII that your module covers and copy a manageable extract.",
      "Prompt the model to identify the legal issues, applying IRAC structure to your extract only.",
      "Ask it to list the authorities it relied on. Check each against BAILII or legislation.gov.uk.",
      "Rewrite the prompt so the model must quote the passage supporting each issue it spots.",
      "Note which authorities were genuine and which were invented, and keep your final chain for the next judgment.",
    ],
    groundRules: {
      trains:
        "Structured legal analysis prompting and checking AI-cited authorities against BAILII and legislation.gov.uk.",
      notFor:
        "Not for drafting assessed problem answers or moot submissions, and never for citing an authority you have not verified exists.",
      builtInCheck:
        "Steps 3 and 5 are the habit: every authority the model names gets looked up before it earns a place in your notes.",
    },
    notePrompt:
      "Optional: save your final issue-spotting prompt and which authorities turned out to be invented.",
  },
  {
    slug: "history-source-comparison",
    title: "Make AI compare two primary sources — then catch where it misreads them",
    discipline: "history",
    moduleCodes: ["HIST2260", "HIST2400"],
    estMinutes: 25,
    competencies: ["evaluation", "workflow-design", "ethics-citation"],
    competencyScores: {
      evaluation: 3,
      "workflow-design": 2,
      "ethics-citation": 2,
    },
    freeTools: [
      "ChatGPT (free)",
      "British Library digitised sources",
      "Internet Archive",
    ],
    summary:
      "Have the model compare two primary sources from your module period, find where its reading fails, and fix it with one targeted prompt change.",
    deliverable:
      "A sharper eye for where AI readings of sources go wrong, and a prompt pattern that measurably reduces the failure you diagnosed.",
    whyDoing:
      "You can't watch your way to this. The misreadings are specific to your two sources and your period — finding them line by line, then fixing the worst one with a prompt change, is the skill itself.",
    steps: [
      "Choose two short primary sources from your module period (letters, speeches, newspaper extracts).",
      "Prompt the model to compare authorship, audience, and bias — pasting the full text of both.",
      "Check its claims against the sources line by line. Mark each claim supported, unsupported, or wrong.",
      "Refine your prompt once to reduce the failure you saw most, and re-run.",
      "Compare before and after — you've just debugged an AI reading the way you'd debug an argument.",
    ],
    groundRules: {
      trains:
        "Critical evaluation of AI readings of primary sources, and iterating prompts against a failure you diagnosed.",
      notFor:
        "Not for producing source-analysis paragraphs for assessed essays, or presenting the model's reading as your own.",
      builtInCheck:
        "Step 3 is the habit: every claim the model makes gets checked line by line against the original text.",
    },
    notePrompt:
      "Optional: save which misreadings you caught and what the refined prompt fixed.",
  },
  {
    slug: "history-deep-research-map",
    title: "Map a historiographical debate with a deep-research agent",
    discipline: "history",
    moduleCodes: ["HIST2260", "HIST2400"],
    estMinutes: 25,
    competencies: ["workflow-design", "evaluation", "ethics-citation"],
    competencyScores: {
      "workflow-design": 3,
      evaluation: 3,
      "ethics-citation": 2,
    },
    freeTools: [
      "A deep-research mode (ChatGPT or Gemini, free tier)",
      "Your module reading list",
      "Internet Archive",
    ],
    summary:
      "Point a deep-research agent at a debate from your module, then test its map of the field against what your reading list actually says.",
    deliverable:
      "A working method for using research agents on historiography: what to ask for, how long to let them run, and where their synthesis flattens the argument.",
    whyDoing:
      "Deep-research agents are weeks old and nobody's lecture covers them yet. The only way to learn where they shine and where they flatten a debate is to run one on a debate you already half-know — which is exactly what your module gives you.",
    steps: [
      "Pick a debate your module covers (one where you've read at least two opposing historians).",
      "Brief a deep-research agent: ask for the main positions, key works, and how the debate has shifted over time.",
      "While it runs, jot down what you'd expect a good answer to include, from your own reading.",
      "Compare: which positions did it get right, which historians did it miss, where did it flatten a live disagreement into false consensus?",
      "Re-brief it once with a tighter question aimed at the biggest gap you found, and compare the runs.",
    ],
    groundRules: {
      trains:
        "Briefing research agents well, and judging agent-written syntheses against reading you've actually done.",
      notFor:
        "Not for outsourcing assessed historiographical essays, or citing works the agent names that you have not read.",
      builtInCheck:
        "Step 4 is the habit: the agent's map is tested against your own reading before any of it enters your notes.",
    },
    notePrompt:
      "Optional: save your best agent brief and the gaps you caught in its synthesis.",
  },
  {
    slug: "business-competitor-scan",
    title: "Build a competitor-scan workflow where every claim has a source",
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
      "Build a reusable competitor-scan workflow where the AI structures and contrasts only what you sourced — and anything unsourced gets deleted.",
    deliverable:
      "A scan template with placeholder slots you can rerun for any pair of companies, and the delete-anything-unsourced discipline that makes AI analysis usable.",
    whyDoing:
      "A tutorial hands you someone else's template for someone else's market. Build and test yours against Companies House filings you pulled yourself and you learn the rule that matters: if the model added a number you didn't supply, it goes.",
    steps: [
      "Pick two UK companies relevant to your module case studies.",
      "Gather raw inputs yourself: latest annual report summary, Companies House filing dates, pricing page text.",
      "Design one prompt template that turns your pasted inputs into a structured comparison table.",
      "Test it on both companies. Delete any output row that cites nothing you supplied.",
      "Save the template with placeholder slots so you can rerun it for any pair of companies.",
    ],
    groundRules: {
      trains:
        "Designing reusable analysis workflows where the AI formats and contrasts only what you sourced.",
      notFor:
        "Not for fabricating market data in assessed reports, or presenting model-invented figures as research.",
      builtInCheck:
        "Step 4 is the habit: any row in the output that does not trace to an input you gathered gets deleted.",
    },
    notePrompt:
      "Optional: save your reusable template and one filled-in comparison so you can rerun it next term.",
  },
  {
    slug: "nursing-patient-leaflet",
    title: "Draft a patient leaflet with AI — and check every clinical claim",
    discipline: "nursing",
    moduleCodes: ["NURS2301", "NURS2270"],
    estMinutes: 25,
    competencies: ["prompt-craft", "evaluation", "ethics-citation"],
    competencyScores: {
      "prompt-craft": 2,
      evaluation: 3,
      "ethics-citation": 3,
    },
    freeTools: ["ChatGPT (free)", "NHS website", "NICE guidance"],
    summary:
      "Draft a plain-English patient information leaflet with AI, then verify every clinical claim in it against NHS and NICE guidance.",
    deliverable:
      "The claim-by-claim checking habit the NHS now expects around AI-drafted patient material, practised on a condition from your module.",
    whyDoing:
      "No video checks clinical claims for the condition your module covers this term. Doing the verification yourself — including deleting claims that don't hold up — is the safety habit, not a demonstration of it.",
    steps: [
      "Choose a condition covered in your module and find its NHS page and any NICE guidance.",
      "Prompt the model for a plain-English leaflet draft at a reading age of 11, for that condition.",
      "List every clinical claim in the draft, one line each.",
      "Check each claim against NHS/NICE text. Correct or delete anything unsupported.",
      "Keep the corrected leaflet and notice which kinds of claims the model got wrong — that pattern repeats.",
    ],
    groundRules: {
      trains:
        "Clinical-communication drafting with AI and claim-by-claim checking against NHS and NICE guidance.",
      notFor:
        "Not for assessed care plans or reflective writing, and never for real patient-facing material without qualified sign-off.",
      builtInCheck:
        "Steps 3 and 4 are the habit: every clinical claim gets checked against NHS or NICE text, and unsupported claims are corrected or deleted.",
    },
    notePrompt:
      "Optional: save the claims you had to correct or delete — the pattern is worth remembering.",
  },
  {
    slug: "cs-data-cleaner",
    title: "Write the tests first, then make AI write the cleaner",
    discipline: "computer-science",
    moduleCodes: ["COMP2001", "COMP2611"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 3,
      "tool-integration": 3,
      evaluation: 2,
    },
    freeTools: ["Python", "a free LLM chat", "data.gov.uk open datasets"],
    summary:
      "Write failing tests for a messy open dataset first, then use AI to draft the cleaner and make your tests pass — refining prompts, not hand-patching.",
    deliverable:
      "Specification-first AI coding as a reflex: you define correctness in tests, the model writes to your spec, and you know how many iterations that really takes.",
    whyDoing:
      "Copilot tutorials show code appearing; they never make you define correctness first. Writing the tests before the AI touches anything — and refining prompts instead of hand-patching — is a working practice you only acquire by doing it on a dataset you picked.",
    steps: [
      "Pick a small messy CSV from data.gov.uk (missing values, mixed date formats).",
      "Write 4–5 tests describing the clean output you want, before any AI involvement.",
      "Prompt the model for a cleaning script, pasting your tests as the specification.",
      "Run the tests. For each failure, refine the prompt rather than hand-patching the code.",
      "Count how many prompt iterations each test needed — that number is your calibration for real projects.",
    ],
    groundRules: {
      trains:
        "Specification-first AI coding: you define correctness in tests, the model writes to your spec.",
      notFor:
        "Not for submitting AI-written code to assessed coursework where your module prohibits it — check your module's AI policy first.",
      builtInCheck:
        "Steps 2 and 4 are the habit: the tests exist before the AI is involved, and they — not the model — define correctness.",
    },
    notePrompt:
      "Optional: save your test file and how many attempts each test took to pass.",
  },
  {
    slug: "cs-agent-code-review",
    title: "Turn a coding agent into a reviewer that follows your rubric",
    discipline: "computer-science",
    moduleCodes: ["COMP2001", "COMP2611"],
    estMinutes: 25,
    competencies: ["workflow-design", "tool-integration", "evaluation"],
    competencyScores: {
      "workflow-design": 2,
      "tool-integration": 3,
      evaluation: 3,
    },
    freeTools: [
      "A free coding agent or LLM chat",
      "A piece of your own recent code",
    ],
    summary:
      "Write a five-point review rubric for your own code, make an AI agent apply it, and judge which findings are real and which are noise.",
    deliverable:
      "A personal review rubric an agent can actually follow, and calibration on which agent findings deserve your attention.",
    whyDoing:
      "Agent code review is rolling out everywhere this year, and the skill isn't reading the output — it's constraining it. You only learn what a rubric must pin down by watching an agent misapply a vague one to code you understand.",
    steps: [
      "Pick 50–150 lines of your own recent code (a lab exercise or side project).",
      "Write a five-point review rubric: what matters here (naming, edge cases, error handling — your call).",
      "Ask the agent to review the code strictly against your rubric, citing line numbers for every finding.",
      "Triage its findings: real issue, matter of taste, or hallucinated. Count each category.",
      "Tighten the two vaguest rubric points and re-run — watch the noise drop.",
    ],
    groundRules: {
      trains:
        "Constraining AI reviewers with explicit criteria and triaging their findings against your own judgement.",
      notFor:
        "Not for review-washing group-project code you don't understand, or auto-fixing assessed work against module policy.",
      builtInCheck:
        "Step 4 is the habit: every agent finding is triaged as real, taste, or hallucinated before you act on any of it.",
    },
    notePrompt:
      "Optional: save your rubric and the real-vs-noise counts from both runs.",
  },
];

/*
  The frontier feed: recent AI advances mapped to the modules they matter
  for. In MVP 1 these come from a daily ingest (arXiv, vendor changelogs,
  model releases); here they are hand-seeded to demonstrate the loop.
  Fluent watches the feeds. You get the skill.
*/
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

export function getAdvancesForModuleCodes(codes: string[]): Advance[] {
  const codeSet = new Set(codes);
  return advances.filter((a) => a.moduleCodes.some((c) => codeSet.has(c)));
}
