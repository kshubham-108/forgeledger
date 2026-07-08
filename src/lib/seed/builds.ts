import type {
  Advance,
  Competency,
  Discipline,
  MicroBuild,
  Module,
  University,
} from "../types";

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
      "Paste your final prompt chain and what the model got wrong, so future-you can rerun it.",
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
      "Paste your final issue-spotting prompt and which authorities turned out to be invented.",
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
      "Paste your refined prompt and which misreadings it fixed.",
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
      "Paste your best agent brief and the gaps you caught in its synthesis.",
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
      "Paste your reusable prompt template and one filled-in comparison so you can rerun it next term.",
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
      "Paste your leaflet prompt and the claims you had to correct or delete.",
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
      "Paste your prompt for the cleaning script and how many attempts each test took to pass.",
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
      "Paste your review rubric prompt and the real-vs-noise counts from both runs.",
  },
  {
    slug: "econ-model-assumption-audit",
    title: "Build an AI data-interpretation workflow — then audit every assumption it made",
    discipline: "economics",
    moduleCodes: ["ECON2237", "ECON2137", "ECON2327"],
    estMinutes: 25,
    competencies: ["workflow-design", "evaluation", "tool-integration"],
    competencyScores: {
      "workflow-design": 2,
      evaluation: 3,
      "tool-integration": 2,
    },
    freeTools: ["ChatGPT (free)", "ONS (Office for National Statistics) data", "Google Sheets"],
    summary:
      "Pull a real dataset from your module topic, get AI to draft an interpretation of it, then force out every assumption baked into that interpretation and check each one against the source.",
    deliverable:
      "A prompt template that makes the model state its assumptions and data source before it states a conclusion, and a calibrated sense of which assumptions it gets wrong most often.",
    whyDoing:
      "A walkthrough video interprets someone else's chart. Interpreting an ONS series from your own module topic — and interrogating the model's hidden assumptions about causation, sample period, or seasonality — is a skill you can only build on data you chose yourself.",
    steps: [
      "Pick a dataset from ONS (or your module's usual source) relevant to a topic you're covering this term.",
      "Ask the model to summarise the trend and suggest one economic explanation for it, pasting the raw figures yourself.",
      "Ask it to list every assumption its explanation depends on — about causation, comparability, or timing.",
      "Check each assumption against the dataset's own metadata and methodology notes. Mark it holds, questionable, or wrong.",
      "Rewrite your prompt to require assumptions up front next time, before any conclusion — and note how the output changes.",
    ],
    groundRules: {
      trains:
        "Structured data-interpretation prompting and surfacing the assumptions an AI explanation depends on.",
      notFor:
        "Not for generating analysis for assessed coursework, or presenting an AI-drafted interpretation as your own without checking its assumptions.",
      builtInCheck:
        "Step 4 is the habit: every assumption the model's explanation relies on gets checked against the dataset's own documentation before it's trusted.",
    },
    notePrompt:
      "Paste your revised assumptions-first prompt and the assumptions you caught being wrong.",
  },
  {
    slug: "maths-proof-checker",
    title: "Get AI to attempt a proof — then hunt for the invalid step",
    discipline: "maths",
    moduleCodes: ["MATH2148", "MATH2328", "MATH2208"],
    estMinutes: 25,
    competencies: ["evaluation", "prompt-craft", "tool-integration"],
    competencyScores: {
      evaluation: 3,
      "prompt-craft": 2,
      "tool-integration": 2,
    },
    freeTools: ["ChatGPT (free)", "a free CAS (e.g. GeoGebra, Wolfram Alpha free tier)", "your module problem sheet"],
    summary:
      "Have AI attempt a proof or problem from your module, then verify it line by line — the failure modes (invalid steps, invented theorems, silently dropped conditions) are specific enough to be worth cataloguing.",
    deliverable:
      "A working method for line-by-line proof verification against AI output, plus a personal list of the specific ways your model breaks on your kind of problem.",
    whyDoing:
      "Watching someone check a proof on a different problem set teaches you nothing about where your model breaks on your problem set. Running it on this week's problem sheet — and finding the step where it invents a theorem or drops a condition — is the only way to calibrate.",
    steps: [
      "Pick an unseen problem or proof question from your module's current problem sheet.",
      "Ask the model to solve or prove it, showing every step, before you look at any worked solution.",
      "Go through its answer line by line against the definitions and theorems from your module — not against 'does the conclusion look right'.",
      "Flag the first invalid step: a theorem that doesn't exist, a condition it silently dropped, or a non-sequitur.",
      "Compare against your module's actual worked solution or your tutor's method, and note which failure mode you caught, so you know what to check for next time.",
    ],
    groundRules: {
      trains:
        "Line-by-line verification of AI-generated proofs against definitions and theorems you can name.",
      notFor:
        "Not for submitting AI-generated proofs as assessed problem-sheet answers, or trusting a proof you haven't checked step by step.",
      builtInCheck:
        "Steps 3 and 4 are the habit: every line is checked against a real theorem or definition, and the first invalid step is named before you move on.",
    },
    notePrompt:
      "Paste the prompt you used and the invalid step you found — which theorem it fabricated or misapplied.",
  },
  {
    slug: "medicine-differential-check",
    title: "Practice differential-diagnosis reasoning with AI — and check every claim against NICE",
    discipline: "medicine",
    moduleCodes: ["MED2269", "MED2319", "MED2219"],
    estMinutes: 25,
    competencies: ["evaluation", "ethics-citation", "prompt-craft"],
    competencyScores: {
      evaluation: 3,
      "ethics-citation": 3,
      "prompt-craft": 2,
    },
    freeTools: ["ChatGPT (free)", "NICE guidance", "Cochrane Library"],
    summary:
      "Work through a differential-diagnosis reasoning exercise on an anonymised, textbook-style case with AI, then check every clinical claim it makes against NICE and Cochrane before it earns a place in your notes.",
    deliverable:
      "A claim-by-claim verification habit for AI clinical reasoning, and a clear sense of where the model overstates confidence or invents guideline detail.",
    whyDoing:
      "A demo case is already fact-checked for the video. Running your own textbook case — and finding where the model's differential is overconfident or its cited guideline doesn't say what it claims — is the calibration you actually need before this becomes a real habit.",
    steps: [
      "Take an anonymised, textbook-style case vignette from your module (never a real patient) with a presenting complaint and history.",
      "Ask the model to generate a ranked differential diagnosis with its reasoning for each item.",
      "List every clinical claim it makes — prevalence figures, guideline recommendations, red-flag symptoms — one line each.",
      "Check each claim against NICE guidance or the Cochrane Library. Mark supported, outdated, or invented.",
      "Note which kind of claim it got wrong most often — that's the pattern to stay alert for next time.",
    ],
    groundRules: {
      trains:
        "Differential-diagnosis reasoning practice with AI and claim-by-claim verification against NICE and Cochrane.",
      notFor:
        "Never for real patient care, real case data, or assessed OSCE and clinical placement work — this is reasoning practice on textbook cases only, not a clinical tool.",
      builtInCheck:
        "Step 4 is the habit: every clinical claim is checked against NICE or Cochrane before it is trusted, and unsupported claims are marked as such.",
    },
    notePrompt:
      "Paste the prompt you used and which claims turned out unsupported or outdated.",
  },
];

/*
  The frontier feed: recent AI advances mapped to the modules they matter
  for. In MVP 1 these come from a daily ingest (arXiv, vendor changelogs,
  model releases); here they are hand-seeded to demonstrate the loop.
  Fluent watches the feeds. You get the skill.
*/

const buildBySlugMap = new Map(microBuilds.map((b) => [b.slug, b]));

export function getBuildBySlug(slug: string): MicroBuild | undefined {
  return buildBySlugMap.get(slug);
}

export function getBuildsForModuleCodes(codes: string[]): MicroBuild[] {
  const codeSet = new Set(codes);
  return microBuilds.filter((b) => b.moduleCodes.some((c) => codeSet.has(c)));
}

export function getBuildsForDiscipline(discipline: Discipline): MicroBuild[] {
  return microBuilds.filter((b) => b.discipline === discipline);
}
