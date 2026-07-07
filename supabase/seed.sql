-- ============================================================================
-- Fluent — pilot catalogue seed
-- ============================================================================
-- Mirrors src/lib/seed.ts (the demo-mode catalogue) so demo mode and Supabase
-- mode show the same universities, modules, micro-builds, and demo advances.
--
-- Safe to re-run: every insert upserts, and seed topics are replaced wholesale.
--
-- HOW TO ADD MORE UNIVERSITIES / MODULES (the chosen expansion path is manual
-- seeding — no scraping):
--   1. Add a row to the universities VALUES list below:
--        -- slug,        name,                       city
--        -- 'bristol',   'University of Bristol',    'Bristol'
--   2. Add its modules to the modules VALUES list:
--        -- uni_slug,  code,       title,                       discipline,   year
--        -- 'bristol', 'PSYC2005', 'Research Skills',           'psychology', 2
--   3. Add 3–6 topics per module to the module_topics VALUES list:
--        -- uni_slug,  code,       topic
--        -- 'bristol', 'PSYC2005', 'statistical inference'
--   4. Re-run this file (Supabase SQL editor, or `supabase db reset` locally).
-- ============================================================================


-- ----------------------------------------------------------------------------
-- Universities
-- ----------------------------------------------------------------------------
insert into universities (slug, name, city) values
  -- slug,         name,                        city
  ('manchester', 'University of Manchester', 'Manchester'),
  ('leeds',      'University of Leeds',      'Leeds')
on conflict (slug) do update
  set name = excluded.name, city = excluded.city;

-- ----------------------------------------------------------------------------
-- Modules (joined to universities by slug so ids stay opaque)
-- ----------------------------------------------------------------------------
insert into modules (university_id, code, title, discipline, year_of_study)
select u.id, m.code, m.title, m.discipline, m.year_of_study
from (values
  -- uni_slug,     code,       title,                                    discipline,        year
  ('manchester', 'PSYC2017', 'Research Methods and Statistics',        'psychology',       2),
  ('manchester', 'LAW2041',  'Contract Law',                           'law',              2),
  ('manchester', 'HIST2260', 'Sources and Methods in Modern History',  'history',          2),
  ('manchester', 'BMAN2011', 'Marketing Analysis and Strategy',        'business',         2),
  ('manchester', 'NURS2301', 'Evidence-Based Practice',                'nursing',          2),
  ('manchester', 'COMP2001', 'Software Engineering',                   'computer-science', 2),
  ('leeds',      'PSYC2520', 'Cognitive Psychology',                   'psychology',       2),
  ('leeds',      'LAW2086',  'Criminal Law',                           'law',              2),
  ('leeds',      'HIST2400', 'The Practice of History',                'history',          2),
  ('leeds',      'LUBS2005', 'Consumer Behaviour',                     'business',         2),
  ('leeds',      'COMP2611', 'Artificial Intelligence',                'computer-science', 2),
  ('leeds',      'NURS2270', 'Applied Evidence-Based Nursing',         'nursing',          2)
) as m(uni_slug, code, title, discipline, year_of_study)
join universities u on u.slug = m.uni_slug
on conflict (university_id, code) do update
  set title = excluded.title,
      discipline = excluded.discipline,
      year_of_study = excluded.year_of_study;

-- ----------------------------------------------------------------------------
-- Module topics — what each module actually teaches. The daily match job
-- scores AI advances against these terms, so keep them concrete and lowercase.
-- Seed topics are replaced wholesale on re-run; 'syllabus' topics (from
-- user-pasted syllabi, later) are left untouched.
-- ----------------------------------------------------------------------------
delete from module_topics where source = 'seed';

insert into module_topics (module_id, topic, source)
select mod.id, t.topic, 'seed'
from (values
  -- uni_slug,     code,       topic
  ('manchester', 'PSYC2017', 'systematic review'),
  ('manchester', 'PSYC2017', 'prisma screening'),
  ('manchester', 'PSYC2017', 'statistical inference'),
  ('manchester', 'PSYC2017', 'questionnaire design'),
  ('manchester', 'PSYC2017', 'literature search'),
  ('manchester', 'PSYC2017', 'research ethics'),

  ('manchester', 'LAW2041',  'contract formation'),
  ('manchester', 'LAW2041',  'legal reasoning'),
  ('manchester', 'LAW2041',  'case law analysis'),
  ('manchester', 'LAW2041',  'statutory interpretation'),
  ('manchester', 'LAW2041',  'remedies for breach'),

  ('manchester', 'HIST2260', 'primary source analysis'),
  ('manchester', 'HIST2260', 'archival research'),
  ('manchester', 'HIST2260', 'source criticism'),
  ('manchester', 'HIST2260', 'historiography'),
  ('manchester', 'HIST2260', 'digitised newspaper archives'),
  ('manchester', 'HIST2260', 'optical character recognition'),

  ('manchester', 'BMAN2011', 'market segmentation'),
  ('manchester', 'BMAN2011', 'competitor analysis'),
  ('manchester', 'BMAN2011', 'consumer research'),
  ('manchester', 'BMAN2011', 'brand positioning'),
  ('manchester', 'BMAN2011', 'marketing strategy'),

  ('manchester', 'NURS2301', 'evidence appraisal'),
  ('manchester', 'NURS2301', 'clinical guidelines'),
  ('manchester', 'NURS2301', 'patient communication'),
  ('manchester', 'NURS2301', 'health literacy'),
  ('manchester', 'NURS2301', 'clinical decision support'),

  ('manchester', 'COMP2001', 'software testing'),
  ('manchester', 'COMP2001', 'requirements engineering'),
  ('manchester', 'COMP2001', 'code review'),
  ('manchester', 'COMP2001', 'code generation'),
  ('manchester', 'COMP2001', 'continuous integration'),
  ('manchester', 'COMP2001', 'software design patterns'),

  ('leeds',      'PSYC2520', 'attention and memory'),
  ('leeds',      'PSYC2520', 'language processing'),
  ('leeds',      'PSYC2520', 'decision making'),
  ('leeds',      'PSYC2520', 'cognitive modelling'),
  ('leeds',      'PSYC2520', 'perception'),

  ('leeds',      'LAW2086',  'criminal liability'),
  ('leeds',      'LAW2086',  'mens rea'),
  ('leeds',      'LAW2086',  'homicide offences'),
  ('leeds',      'LAW2086',  'legal reasoning'),
  ('leeds',      'LAW2086',  'sentencing'),

  ('leeds',      'HIST2400', 'historical method'),
  ('leeds',      'HIST2400', 'archival research'),
  ('leeds',      'HIST2400', 'historiography'),
  ('leeds',      'HIST2400', 'public history'),
  ('leeds',      'HIST2400', 'oral history'),

  ('leeds',      'LUBS2005', 'consumer decision making'),
  ('leeds',      'LUBS2005', 'consumer psychology'),
  ('leeds',      'LUBS2005', 'advertising and persuasion'),
  ('leeds',      'LUBS2005', 'brand perception'),
  ('leeds',      'LUBS2005', 'survey research'),

  ('leeds',      'COMP2611', 'machine learning'),
  ('leeds',      'COMP2611', 'neural networks'),
  ('leeds',      'COMP2611', 'search algorithms'),
  ('leeds',      'COMP2611', 'knowledge representation'),
  ('leeds',      'COMP2611', 'intelligent agents'),
  ('leeds',      'COMP2611', 'reinforcement learning'),

  ('leeds',      'NURS2270', 'evidence appraisal'),
  ('leeds',      'NURS2270', 'clinical guidelines'),
  ('leeds',      'NURS2270', 'care planning'),
  ('leeds',      'NURS2270', 'patient education'),
  ('leeds',      'NURS2270', 'quality improvement'),
  ('leeds',      'NURS2270', 'research literacy')
) as t(uni_slug, code, topic)
join universities u on u.slug = t.uni_slug
join modules mod on mod.university_id = u.id and mod.code = t.code;

-- ----------------------------------------------------------------------------
-- Micro-builds — 25-minute practice sessions, same slugs, titles, and content
-- as src/lib/seed.ts. steps is an ordered array of instructions; integrity
-- holds the ground rules shown before starting:
--   {trains, not_for, verification_step}
-- (verification_step carries the "checking habit built in" copy).
-- ----------------------------------------------------------------------------
insert into micro_builds
  (slug, title, discipline, minutes, competencies, summary, steps, integrity, module_codes)
values
  (
    'psych-literature-pipeline',
    'Run a literature search with AI — and catch every citation it invents',
    'psychology',
    25,
    array['prompt-craft', 'evaluation', 'ethics-citation'],
    'Build a repeatable prompt chain that drafts a literature search strategy for a topic from your module, then learn to spot the citations the model makes up.',
    jsonb_build_array(
      'Write a prompt that asks the model for a search strategy (keywords, synonyms, inclusion criteria) for a topic from your module — not for papers themselves.',
      'Run the strategy on Semantic Scholar or Google Scholar and collect 5 real papers.',
      'Now ask the model to summarise the 5 papers from their abstracts, which you paste in yourself.',
      'Stress-test it: ask the model for 3 more papers without pasting abstracts, then check each one exists. Note which were real, distorted, or invented.',
      'Keep the prompts that worked and bin the ones that didn''t — you now have a search pipeline you can rerun for any essay.'
    ),
    jsonb_build_object(
      'trains', 'Designing search strategies with AI and checking AI-suggested citations against real databases.',
      'not_for', 'Not for generating a reference list for coursework, or citing anything you have not opened and read.',
      'verification_step', 'Step 4 is the habit: every citation the model offers gets looked up on Semantic Scholar or Google Scholar before you trust it.'
    ),
    array['PSYC2017', 'PSYC2520']
  ),
  (
    'law-issue-spotting-chain',
    'Build an issue-spotting chain that can''t cite a case you haven''t checked',
    'law',
    25,
    array['prompt-craft', 'evaluation', 'ethics-citation'],
    'Design a prompt chain that pulls the legal issues out of a judgment you supply — and get fast at spotting fabricated case law.',
    jsonb_build_array(
      'Pick a judgment from BAILII that your module covers and copy a manageable extract.',
      'Prompt the model to identify the legal issues, applying IRAC structure to your extract only.',
      'Ask it to list the authorities it relied on. Check each against BAILII or legislation.gov.uk.',
      'Rewrite the prompt so the model must quote the passage supporting each issue it spots.',
      'Note which authorities were genuine and which were invented, and keep your final chain for the next judgment.'
    ),
    jsonb_build_object(
      'trains', 'Structured legal analysis prompting and checking AI-cited authorities against BAILII and legislation.gov.uk.',
      'not_for', 'Not for drafting assessed problem answers or moot submissions, and never for citing an authority you have not verified exists.',
      'verification_step', 'Steps 3 and 5 are the habit: every authority the model names gets looked up before it earns a place in your notes.'
    ),
    array['LAW2041', 'LAW2086']
  ),
  (
    'history-source-comparison',
    'Make AI compare two primary sources — then catch where it misreads them',
    'history',
    25,
    array['evaluation', 'workflow-design', 'ethics-citation'],
    'Have the model compare two primary sources from your module period, find where its reading fails, and fix it with one targeted prompt change.',
    jsonb_build_array(
      'Choose two short primary sources from your module period (letters, speeches, newspaper extracts).',
      'Prompt the model to compare authorship, audience, and bias — pasting the full text of both.',
      'Check its claims against the sources line by line. Mark each claim supported, unsupported, or wrong.',
      'Refine your prompt once to reduce the failure you saw most, and re-run.',
      'Compare before and after — you''ve just debugged an AI reading the way you''d debug an argument.'
    ),
    jsonb_build_object(
      'trains', 'Critical evaluation of AI readings of primary sources, and iterating prompts against a failure you diagnosed.',
      'not_for', 'Not for producing source-analysis paragraphs for assessed essays, or presenting the model''s reading as your own.',
      'verification_step', 'Step 3 is the habit: every claim the model makes gets checked line by line against the original text.'
    ),
    array['HIST2260', 'HIST2400']
  ),
  (
    'history-deep-research-map',
    'Map a historiographical debate with a deep-research agent',
    'history',
    25,
    array['workflow-design', 'evaluation', 'ethics-citation'],
    'Point a deep-research agent at a debate from your module, then test its map of the field against what your reading list actually says.',
    jsonb_build_array(
      'Pick a debate your module covers (one where you''ve read at least two opposing historians).',
      'Brief a deep-research agent: ask for the main positions, key works, and how the debate has shifted over time.',
      'While it runs, jot down what you''d expect a good answer to include, from your own reading.',
      'Compare: which positions did it get right, which historians did it miss, where did it flatten a live disagreement into false consensus?',
      'Re-brief it once with a tighter question aimed at the biggest gap you found, and compare the runs.'
    ),
    jsonb_build_object(
      'trains', 'Briefing research agents well, and judging agent-written syntheses against reading you''ve actually done.',
      'not_for', 'Not for outsourcing assessed historiographical essays, or citing works the agent names that you have not read.',
      'verification_step', 'Step 4 is the habit: the agent''s map is tested against your own reading before any of it enters your notes.'
    ),
    array['HIST2260', 'HIST2400']
  ),
  (
    'business-competitor-scan',
    'Build a competitor-scan workflow where every claim has a source',
    'business',
    25,
    array['workflow-design', 'tool-integration', 'evaluation'],
    'Build a reusable competitor-scan workflow where the AI structures and contrasts only what you sourced — and anything unsourced gets deleted.',
    jsonb_build_array(
      'Pick two UK companies relevant to your module case studies.',
      'Gather raw inputs yourself: latest annual report summary, Companies House filing dates, pricing page text.',
      'Design one prompt template that turns your pasted inputs into a structured comparison table.',
      'Test it on both companies. Delete any output row that cites nothing you supplied.',
      'Save the template with placeholder slots so you can rerun it for any pair of companies.'
    ),
    jsonb_build_object(
      'trains', 'Designing reusable analysis workflows where the AI formats and contrasts only what you sourced.',
      'not_for', 'Not for fabricating market data in assessed reports, or presenting model-invented figures as research.',
      'verification_step', 'Step 4 is the habit: any row in the output that does not trace to an input you gathered gets deleted.'
    ),
    array['BMAN2011', 'LUBS2005']
  ),
  (
    'nursing-patient-leaflet',
    'Draft a patient leaflet with AI — and check every clinical claim',
    'nursing',
    25,
    array['prompt-craft', 'evaluation', 'ethics-citation'],
    'Draft a plain-English patient information leaflet with AI, then verify every clinical claim in it against NHS and NICE guidance.',
    jsonb_build_array(
      'Choose a condition covered in your module and find its NHS page and any NICE guidance.',
      'Prompt the model for a plain-English leaflet draft at a reading age of 11, for that condition.',
      'List every clinical claim in the draft, one line each.',
      'Check each claim against NHS/NICE text. Correct or delete anything unsupported.',
      'Keep the corrected leaflet and notice which kinds of claims the model got wrong — that pattern repeats.'
    ),
    jsonb_build_object(
      'trains', 'Clinical-communication drafting with AI and claim-by-claim checking against NHS and NICE guidance.',
      'not_for', 'Not for assessed care plans or reflective writing, and never for real patient-facing material without qualified sign-off.',
      'verification_step', 'Steps 3 and 4 are the habit: every clinical claim gets checked against NHS or NICE text, and unsupported claims are corrected or deleted.'
    ),
    array['NURS2301', 'NURS2270']
  ),
  (
    'cs-data-cleaner',
    'Write the tests first, then make AI write the cleaner',
    'computer-science',
    25,
    array['workflow-design', 'tool-integration', 'evaluation'],
    'Write failing tests for a messy open dataset first, then use AI to draft the cleaner and make your tests pass — refining prompts, not hand-patching.',
    jsonb_build_array(
      'Pick a small messy CSV from data.gov.uk (missing values, mixed date formats).',
      'Write 4–5 tests describing the clean output you want, before any AI involvement.',
      'Prompt the model for a cleaning script, pasting your tests as the specification.',
      'Run the tests. For each failure, refine the prompt rather than hand-patching the code.',
      'Count how many prompt iterations each test needed — that number is your calibration for real projects.'
    ),
    jsonb_build_object(
      'trains', 'Specification-first AI coding: you define correctness in tests, the model writes to your spec.',
      'not_for', 'Not for submitting AI-written code to assessed coursework where your module prohibits it — check your module''s AI policy first.',
      'verification_step', 'Steps 2 and 4 are the habit: the tests exist before the AI is involved, and they — not the model — define correctness.'
    ),
    array['COMP2001', 'COMP2611']
  ),
  (
    'cs-agent-code-review',
    'Turn a coding agent into a reviewer that follows your rubric',
    'computer-science',
    25,
    array['workflow-design', 'tool-integration', 'evaluation'],
    'Write a five-point review rubric for your own code, make an AI agent apply it, and judge which findings are real and which are noise.',
    jsonb_build_array(
      'Pick 50–150 lines of your own recent code (a lab exercise or side project).',
      'Write a five-point review rubric: what matters here (naming, edge cases, error handling — your call).',
      'Ask the agent to review the code strictly against your rubric, citing line numbers for every finding.',
      'Triage its findings: real issue, matter of taste, or hallucinated. Count each category.',
      'Tighten the two vaguest rubric points and re-run — watch the noise drop.'
    ),
    jsonb_build_object(
      'trains', 'Constraining AI reviewers with explicit criteria and triaging their findings against your own judgement.',
      'not_for', 'Not for review-washing group-project code you don''t understand, or auto-fixing assessed work against module policy.',
      'verification_step', 'Step 4 is the habit: every agent finding is triaged as real, taste, or hallucinated before you act on any of it.'
    ),
    array['COMP2001', 'COMP2611']
  )
on conflict (slug) do update
  set title = excluded.title,
      discipline = excluded.discipline,
      minutes = excluded.minutes,
      competencies = excluded.competencies,
      summary = excluded.summary,
      steps = excluded.steps,
      integrity = excluded.integrity,
      module_codes = excluded.module_codes;

-- ----------------------------------------------------------------------------
-- Demo AI advances — the same 8 items as the `advances` list in src/lib/seed.ts,
-- so a fresh project shows "Latest in your field" content immediately, before
-- the first cron run. external_id 'seed:…' keeps them distinct from real
-- ingests; published_at is relative to seeding time so they always fall inside
-- the default 14-day matching window. URLs are demo placeholders.
-- ----------------------------------------------------------------------------
insert into ai_advances
  (source, external_id, title, url, published_at, summary, categories, keywords)
values
  (
    'arxiv',
    'seed:adv-screening-recall',
    'LLM abstract screening hits 97% recall in systematic reviews — but only with a human spot-check loop',
    'https://example.com/fluent-demo/adv-screening-recall',
    now() - interval '1 day',
    'The human-in-the-loop screening pattern your methods module teaches is the one that actually works — fully automated runs silently dropped eligible papers.',
    array['cs.CL', 'cs.IR'],
    array['systematic review', 'abstract screening', 'literature search', 'human-in-the-loop']
  ),
  (
    'release',
    'seed:adv-grounded-citations',
    'Frontier chat models now attach live source links to legal answers by default',
    'https://example.com/fluent-demo/adv-grounded-citations',
    now() - interval '2 days',
    'Linked sources still need opening — models happily cite real pages that don''t say what they claim. Checking authorities just got faster, not optional.',
    array[]::text[],
    array['legal reasoning', 'case law analysis', 'citations', 'grounding']
  ),
  (
    'vendor',
    'seed:adv-deep-research',
    'Deep-research agents can now run 30-minute multi-source investigations unattended',
    'https://example.com/fluent-demo/adv-deep-research',
    now() - interval '3 days',
    'Brilliant for mapping a debate fast — if you can tell where the agent''s tidy synthesis flattens a live disagreement.',
    array[]::text[],
    array['deep research', 'historiography', 'research agents', 'synthesis']
  ),
  (
    'arxiv',
    'seed:adv-reading-age',
    'Study: LLMs hold a target reading age far better when shown exemplar text than when given a number',
    'https://example.com/fluent-demo/adv-reading-age',
    now() - interval '4 days',
    'Changes how you prompt for patient-facing drafts: paste an exemplar paragraph instead of asking for ''reading age 11''.',
    array['cs.CL'],
    array['health literacy', 'patient communication', 'reading age', 'exemplar prompting']
  ),
  (
    'vendor',
    'seed:adv-agent-coding',
    'Coding agents that run your test suite before replying reach free tiers',
    'https://example.com/fluent-demo/adv-agent-coding',
    now() - interval '5 days',
    'Spec-first habits pay off double now the agent can execute your tests itself — write them first and it converges in fewer tries.',
    array[]::text[],
    array['software testing', 'code generation', 'coding agents', 'test-driven development']
  ),
  (
    'release',
    'seed:adv-small-models',
    'New open-weights 7B model matches last year''s frontier on structured extraction',
    'https://example.com/fluent-demo/adv-small-models',
    now() - interval '6 days',
    'Structured extraction now runs on a laptop with no API bill — worth knowing which jobs small local models do well.',
    array[]::text[],
    array['open weights', 'structured extraction', 'local models', 'code review']
  ),
  (
    'vendor',
    'seed:adv-sheets-agent',
    'Spreadsheet AI agents can now pull filings and draft comparison tables on request',
    'https://example.com/fluent-demo/adv-sheets-agent',
    now() - interval '8 days',
    'Auto-built tables look finished but every cell still needs a source you can open — the sourcing habit is the skill.',
    array[]::text[],
    array['competitor analysis', 'spreadsheet agents', 'company filings', 'sourcing']
  ),
  (
    'arxiv',
    'seed:adv-invented-dois',
    'One in five AI-suggested psychology citations still points at a wrong or invented DOI',
    'https://example.com/fluent-demo/adv-invented-dois',
    now() - interval '10 days',
    'Reference lists remain the fastest way to lose marks with AI. Measure the error rate on your own topic before you trust a suggestion.',
    array['cs.DL', 'cs.CL'],
    array['citations', 'doi', 'literature search', 'hallucination']
  )
on conflict (external_id) do update
  set source = excluded.source,
      title = excluded.title,
      url = excluded.url,
      published_at = excluded.published_at,
      summary = excluded.summary,
      categories = excluded.categories,
      keywords = excluded.keywords;

-- ----------------------------------------------------------------------------
-- Demo advance ↔ module matches — mirrors the moduleCodes each advance carries
-- in src/lib/seed.ts. rationale reuses the "why it matters" line; scores are
-- hand-set high because these are curated matches, not keyword overlap.
-- ----------------------------------------------------------------------------
insert into advance_module_matches (advance_id, module_id, score, rationale)
select a.id, mod.id, m.score, a.summary
from (values
  -- external_id,                  uni_slug,     code,       score
  ('seed:adv-screening-recall',   'manchester', 'PSYC2017', 0.92),
  ('seed:adv-screening-recall',   'leeds',      'PSYC2520', 0.85),
  ('seed:adv-grounded-citations', 'manchester', 'LAW2041',  0.90),
  ('seed:adv-grounded-citations', 'leeds',      'LAW2086',  0.90),
  ('seed:adv-deep-research',      'manchester', 'HIST2260', 0.88),
  ('seed:adv-deep-research',      'leeds',      'HIST2400', 0.88),
  ('seed:adv-reading-age',        'manchester', 'NURS2301', 0.91),
  ('seed:adv-reading-age',        'leeds',      'NURS2270', 0.91),
  ('seed:adv-agent-coding',       'manchester', 'COMP2001', 0.93),
  ('seed:adv-agent-coding',       'leeds',      'COMP2611', 0.87),
  ('seed:adv-small-models',       'manchester', 'COMP2001', 0.82),
  ('seed:adv-small-models',       'leeds',      'COMP2611', 0.86),
  ('seed:adv-sheets-agent',       'manchester', 'BMAN2011', 0.89),
  ('seed:adv-sheets-agent',       'leeds',      'LUBS2005', 0.89),
  ('seed:adv-invented-dois',      'manchester', 'PSYC2017', 0.94)
) as m(external_id, uni_slug, code, score)
join ai_advances a on a.external_id = m.external_id
join universities u on u.slug = m.uni_slug
join modules mod on mod.university_id = u.id and mod.code = m.code
on conflict (advance_id, module_id) do update
  set score = excluded.score,
      rationale = excluded.rationale;
