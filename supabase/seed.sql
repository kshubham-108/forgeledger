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
--        -- slug,        name,                       city,        student_email_domains
--        -- 'bristol',   'University of Bristol',    'Bristol',   array['bristol.ac.uk']
--   2. Add its modules to the modules VALUES list:
--        -- uni_slug,  code,       title,                       discipline,   year
--        -- 'bristol', 'PSYC2005', 'Research Skills',           'psychology', 2
--   3. Add topics for its modules. Two options:
--        a. New module in a discipline we already cover? It automatically
--           picks up that discipline's shared topic set from the
--           discipline_topics list below — nothing to do.
--        b. Want bespoke topics for a specific module (as Manchester/Leeds
--           have)? Add explicit (uni_slug, code, topic) rows to the
--           per-module VALUES list instead, and exclude that university from
--           the discipline-wide fallback join.
--   4. Re-run this file (Supabase SQL editor, or `supabase db reset` locally).
--
-- This same manual, CSV-style pattern was used to grow the catalogue from 2
-- to 25 universities and from 6 to 9 disciplines (adding economics, maths,
-- medicine) — plain VALUES lists, no scraping, no per-institution research
-- for topics or micro-builds.
-- ============================================================================


-- ----------------------------------------------------------------------------
-- Universities
-- ----------------------------------------------------------------------------
insert into universities (slug, name, city, student_email_domains) values
  -- slug,             name,                                                  city,                   student_email_domains
  ('manchester',       'University of Manchester',                           'Manchester',           array['manchester.ac.uk']),
  ('leeds',            'University of Leeds',                                'Leeds',                array['leeds.ac.uk']),
  ('birmingham',       'University of Birmingham',                           'Birmingham',           array['student.bham.ac.uk', 'bham.ac.uk']),
  ('bristol',          'University of Bristol',                              'Bristol',              array['bristol.ac.uk']),
  ('cambridge',        'University of Cambridge',                           'Cambridge',            array['cam.ac.uk']),
  ('cardiff',          'Cardiff University',                                 'Cardiff',              array['cardiff.ac.uk']),
  ('durham',           'Durham University',                                  'Durham',               array['durham.ac.uk']),
  ('edinburgh',        'University of Edinburgh',                            'Edinburgh',            array['ed.ac.uk']),
  ('exeter',           'University of Exeter',                               'Exeter',               array['exeter.ac.uk']),
  ('glasgow',          'University of Glasgow',                              'Glasgow',              array['student.gla.ac.uk', 'gla.ac.uk']),
  ('imperial',         'Imperial College London',                            'London',               array['imperial.ac.uk', 'ic.ac.uk']),
  ('kcl',              'King''s College London',                             'London',               array['kcl.ac.uk']),
  ('liverpool',        'University of Liverpool',                            'Liverpool',            array['liverpool.ac.uk']),
  ('lse',              'London School of Economics and Political Science',   'London',               array['lse.ac.uk']),
  ('newcastle',        'Newcastle University',                               'Newcastle upon Tyne',  array['newcastle.ac.uk', 'ncl.ac.uk']),
  ('nottingham',       'University of Nottingham',                           'Nottingham',           array['nottingham.ac.uk']),
  ('oxford',           'University of Oxford',                               'Oxford',               array['ox.ac.uk']),
  ('queen-mary',       'Queen Mary University of London',                    'London',               array['qmul.ac.uk']),
  ('queens-belfast',   'Queen''s University Belfast',                        'Belfast',              array['qub.ac.uk']),
  ('sheffield',        'University of Sheffield',                            'Sheffield',            array['sheffield.ac.uk', 'shef.ac.uk']),
  ('southampton',      'University of Southampton',                          'Southampton',          array['soton.ac.uk']),
  ('ucl',              'University College London',                         'London',               array['ucl.ac.uk']),
  ('warwick',          'University of Warwick',                              'Coventry',             array['warwick.ac.uk']),
  ('york',             'University of York',                                 'York',                 array['york.ac.uk']),
  ('bath',             'University of Bath',                                 'Bath',                 array['bath.ac.uk'])
on conflict (slug) do update
  set name = excluded.name,
      city = excluded.city,
      student_email_domains = excluded.student_email_domains;

-- ----------------------------------------------------------------------------
-- Modules (joined to universities by slug so ids stay opaque)
-- ----------------------------------------------------------------------------
insert into modules (university_id, code, title, discipline, year_of_study)
select u.id, m.code, m.title, m.discipline, m.year_of_study
from (values
  -- uni_slug,     code,       title,                                        discipline,        year

  -- University of Manchester
  ('manchester', 'PSYC2017', 'Research Methods and Statistics',              'psychology',       2),
  ('manchester', 'LAW2041',  'Contract Law',                                 'law',              2),
  ('manchester', 'HIST2260', 'Sources and Methods in Modern History',        'history',          2),
  ('manchester', 'BMAN2011', 'Marketing Analysis and Strategy',              'business',         2),
  ('manchester', 'NURS2301', 'Evidence-Based Practice',                      'nursing',          2),
  ('manchester', 'COMP2001', 'Software Engineering',                         'computer-science', 2),

  -- University of Leeds
  ('leeds',      'PSYC2520', 'Cognitive Psychology',                         'psychology',       2),
  ('leeds',      'LAW2086',  'Criminal Law',                                 'law',              2),
  ('leeds',      'HIST2400', 'The Practice of History',                      'history',          2),
  ('leeds',      'LUBS2005', 'Consumer Behaviour',                           'business',         2),
  ('leeds',      'COMP2611', 'Artificial Intelligence',                      'computer-science', 2),
  ('leeds',      'NURS2270', 'Applied Evidence-Based Nursing',                'nursing',          2),

  -- University of Birmingham
  ('birmingham', 'PSYC2121', 'Cognitive Psychology',                         'psychology',       2),
  ('birmingham', 'LAW2122',  'Contract Law',                                 'law',              2),
  ('birmingham', 'HIST2123', 'Historiography and Historical Theory',         'history',          2),
  ('birmingham', 'BUSI2124', 'Marketing Analysis and Strategy',              'business',         2),
  ('birmingham', 'NURS2125', 'Pathophysiology and Pharmacology',             'nursing',          2),
  ('birmingham', 'COMP2126', 'Data Structures and Algorithms',               'computer-science', 2),
  ('birmingham', 'ECON2127', 'Intermediate Microeconomics',                  'economics',        2),
  ('birmingham', 'MATH2128', 'Real Analysis',                                'maths',            2),
  ('birmingham', 'MED2129',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- University of Bristol
  ('bristol',    'PSYC2131', 'Biological Psychology',                        'psychology',       2),
  ('bristol',    'LAW2132',  'Tort Law',                                     'law',              2),
  ('bristol',    'HIST2133', 'Approaches to History',                        'history',          2),
  ('bristol',    'BUSI2134', 'Organisational Behaviour',                     'business',         2),
  ('bristol',    'NURS2135', 'Clinical Decision Making',                     'nursing',          2),
  ('bristol',    'COMP2136', 'Databases',                                    'computer-science', 2),
  ('bristol',    'ECON2137', 'Intermediate Macroeconomics',                  'economics',        2),
  ('bristol',    'MATH2138', 'Linear Algebra II',                            'maths',            2),
  ('bristol',    'MED2139',  'Human Disease and Therapeutics',               'medicine',         2),

  -- University of Cambridge (no standalone undergraduate Business or Nursing degree)
  ('cambridge',  'PSYC2141', 'Social Psychology',                            'psychology',       2),
  ('cambridge',  'LAW2142',  'Tort Law',                                     'law',              2),
  ('cambridge',  'HIST2143', 'Historical Argument and Practice',             'history',          2),
  ('cambridge',  'COMP2146', 'Artificial Intelligence',                      'computer-science', 2),
  ('cambridge',  'ECON2147', 'Econometrics I',                               'economics',        2),
  ('cambridge',  'MATH2148', 'Analysis II',                                  'maths',            2),
  ('cambridge',  'MED2149',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- Cardiff University
  ('cardiff',    'PSYC2151', 'Developmental Psychology',                     'psychology',       2),
  ('cardiff',    'LAW2152',  'EU Law',                                       'law',              2),
  ('cardiff',    'HIST2153', 'Sources and Methods in Modern History',        'history',          2),
  ('cardiff',    'BUSI2154', 'Strategic Management',                        'business',         2),
  ('cardiff',    'NURS2155', 'Long-Term Conditions and Complex Care',        'nursing',          2),
  ('cardiff',    'COMP2156', 'Computer Systems and Architecture',            'computer-science', 2),
  ('cardiff',    'ECON2157', 'Money and Banking',                            'economics',        2),
  ('cardiff',    'MATH2158', 'Differential Equations',                       'maths',            2),
  ('cardiff',    'MED2159',  'Pathology and Pharmacology',                   'medicine',         2),

  -- Durham University (no undergraduate Nursing degree)
  ('durham',     'PSYC2161', 'Individual Differences',                       'psychology',       2),
  ('durham',     'LAW2162',  'Land Law',                                     'law',              2),
  ('durham',     'HIST2163', 'Historical Skills and Sources',                'history',          2),
  ('durham',     'BUSI2164', 'Financial Management',                        'business',         2),
  ('durham',     'COMP2166', 'Programming Paradigms',                        'computer-science', 2),
  ('durham',     'ECON2167', 'Development Economics',                       'economics',        2),
  ('durham',     'MATH2168', 'Abstract Algebra',                             'maths',            2),
  ('durham',     'MED2169',  'Musculoskeletal and Neurological Systems',     'medicine',         2),

  -- University of Edinburgh
  ('edinburgh',  'PSYC2171', 'Psychopathology',                              'psychology',       2),
  ('edinburgh',  'LAW2172',  'Public Law',                                   'law',              2),
  ('edinburgh',  'HIST2173', 'The Practice of History',                      'history',          2),
  ('edinburgh',  'BUSI2174', 'International Business Strategy',              'business',         2),
  ('edinburgh',  'NURS2175', 'Evidence-Based Practice',                      'nursing',          2),
  ('edinburgh',  'COMP2176', 'Web and Mobile Development',                   'computer-science', 2),
  ('edinburgh',  'ECON2177', 'Economics of Public Policy',                   'economics',        2),
  ('edinburgh',  'MATH2178', 'Numerical Analysis',                           'maths',            2),
  ('edinburgh',  'MED2179',  'Clinical and Communication Skills II',         'medicine',         2),

  -- University of Exeter
  ('exeter',     'PSYC2181', 'Conceptual and Historical Issues in Psychology', 'psychology',     2),
  ('exeter',     'LAW2182',  'Equity and Trusts',                            'law',              2),
  ('exeter',     'HIST2183', 'Making History: Theory and Practice',          'history',          2),
  ('exeter',     'BUSI2184', 'Consumer Behaviour',                           'business',         2),
  ('exeter',     'NURS2185', 'Pathophysiology and Pharmacology',             'nursing',          2),
  ('exeter',     'COMP2186', 'Software Engineering',                         'computer-science', 2),
  ('exeter',     'ECON2187', 'Intermediate Microeconomics',                  'economics',        2),
  ('exeter',     'MATH2188', 'Probability and Statistics',                   'maths',            2),
  ('exeter',     'MED2189',  'Human Disease and Therapeutics',               'medicine',         2),

  -- University of Glasgow
  ('glasgow',    'PSYC2191', 'Cognitive Psychology',                         'psychology',       2),
  ('glasgow',    'LAW2192',  'Constitutional and Administrative Law',        'law',              2),
  ('glasgow',    'HIST2193', 'Historiography and Historical Theory',         'history',          2),
  ('glasgow',    'BUSI2194', 'Operations Management',                       'business',         2),
  ('glasgow',    'NURS2195', 'Applied Evidence-Based Nursing',               'nursing',          2),
  ('glasgow',    'COMP2196', 'Artificial Intelligence',                      'computer-science', 2),
  ('glasgow',    'ECON2197', 'Intermediate Macroeconomics',                  'economics',        2),
  ('glasgow',    'MATH2198', 'Real Analysis',                                'maths',            2),
  ('glasgow',    'MED2199',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- Imperial College London (no Law, History, or Nursing degree)
  ('imperial',   'BUSI2204', 'Strategic Management',                        'business',         2),
  ('imperial',   'COMP2206', 'Software Engineering',                         'computer-science', 2),
  ('imperial',   'ECON2207', 'Intermediate Microeconomics',                  'economics',        2),
  ('imperial',   'MATH2208', 'Linear Algebra II',                            'maths',            2),
  ('imperial',   'MED2209',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- King's College London
  ('kcl',        'PSYC2211', 'Biological Psychology',                        'psychology',       2),
  ('kcl',        'LAW2212',  'Criminal Law',                                 'law',              2),
  ('kcl',        'HIST2213', 'Sources and Methods in Modern History',        'history',          2),
  ('kcl',        'BUSI2214', 'Marketing Analysis and Strategy',              'business',         2),
  ('kcl',        'NURS2215', 'Evidence-Based Practice',                      'nursing',          2),
  ('kcl',        'COMP2216', 'Data Structures and Algorithms',               'computer-science', 2),
  ('kcl',        'ECON2217', 'Econometrics I',                               'economics',        2),
  ('kcl',        'MATH2218', 'Differential Equations',                       'maths',            2),
  ('kcl',        'MED2219',  'Human Disease and Therapeutics',               'medicine',         2),

  -- University of Liverpool
  ('liverpool',  'PSYC2221', 'Social Psychology',                            'psychology',       2),
  ('liverpool',  'LAW2222',  'Contract Law',                                 'law',              2),
  ('liverpool',  'HIST2223', 'Approaches to History',                        'history',          2),
  ('liverpool',  'BUSI2224', 'Consumer Behaviour',                           'business',         2),
  ('liverpool',  'NURS2225', 'Clinical Decision Making',                     'nursing',          2),
  ('liverpool',  'COMP2226', 'Databases',                                    'computer-science', 2),
  ('liverpool',  'ECON2227', 'Money and Banking',                            'economics',        2),
  ('liverpool',  'MATH2228', 'Abstract Algebra',                             'maths',            2),
  ('liverpool',  'MED2229',  'Pathology and Pharmacology',                   'medicine',         2),

  -- LSE (no Medicine, Nursing, or standalone Computer Science / Mathematics degree)
  ('lse',        'PSYC2231', 'Social Psychology',                            'psychology',       2),
  ('lse',        'LAW2232',  'Public Law',                                   'law',              2),
  ('lse',        'HIST2233', 'Historical Argument and Practice',             'history',          2),
  ('lse',        'BUSI2234', 'Strategic Management',                        'business',         2),
  ('lse',        'ECON2237', 'Intermediate Microeconomics',                  'economics',        2),

  -- Newcastle University
  ('newcastle',  'PSYC2241', 'Developmental Psychology',                     'psychology',       2),
  ('newcastle',  'LAW2242',  'Tort Law',                                     'law',              2),
  ('newcastle',  'HIST2243', 'The Practice of History',                      'history',          2),
  ('newcastle',  'BUSI2244', 'Organisational Behaviour',                     'business',         2),
  ('newcastle',  'NURS2245', 'Evidence-Based Practice',                      'nursing',          2),
  ('newcastle',  'COMP2246', 'Computer Systems and Architecture',            'computer-science', 2),
  ('newcastle',  'ECON2247', 'Development Economics',                       'economics',        2),
  ('newcastle',  'MATH2248', 'Probability and Statistics',                   'maths',            2),
  ('newcastle',  'MED2249',  'Musculoskeletal and Neurological Systems',     'medicine',         2),

  -- University of Nottingham
  ('nottingham', 'PSYC2251', 'Individual Differences',                       'psychology',       2),
  ('nottingham', 'LAW2252',  'Land Law',                                     'law',              2),
  ('nottingham', 'HIST2253', 'Historical Skills and Sources',                'history',          2),
  ('nottingham', 'BUSI2254', 'Financial Management',                        'business',         2),
  ('nottingham', 'NURS2255', 'Pathophysiology and Pharmacology',             'nursing',          2),
  ('nottingham', 'COMP2256', 'Artificial Intelligence',                      'computer-science', 2),
  ('nottingham', 'ECON2257', 'Economics of Public Policy',                   'economics',        2),
  ('nottingham', 'MATH2258', 'Numerical Analysis',                           'maths',            2),
  ('nottingham', 'MED2259',  'Clinical and Communication Skills II',         'medicine',         2),

  -- University of Oxford (no undergraduate Business or Nursing degree)
  ('oxford',     'PSYC2261', 'Psychopathology',                              'psychology',       2),
  ('oxford',     'LAW2262',  'Land Law',                                     'law',              2),
  ('oxford',     'HIST2263', 'Historiography and Historical Theory',         'history',          2),
  ('oxford',     'COMP2266', 'Software Engineering',                         'computer-science', 2),
  ('oxford',     'ECON2267', 'Econometrics I',                               'economics',        2),
  ('oxford',     'MATH2268', 'Analysis II',                                  'maths',            2),
  ('oxford',     'MED2269',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- Queen Mary University of London
  ('queen-mary', 'PSYC2271', 'Cognitive Psychology',                         'psychology',       2),
  ('queen-mary', 'LAW2272',  'Criminal Law',                                 'law',              2),
  ('queen-mary', 'HIST2273', 'Sources and Methods in Modern History',        'history',          2),
  ('queen-mary', 'BUSI2274', 'Marketing Analysis and Strategy',              'business',         2),
  ('queen-mary', 'NURS2275', 'Evidence-Based Practice',                      'nursing',          2),
  ('queen-mary', 'COMP2276', 'Data Structures and Algorithms',               'computer-science', 2),
  ('queen-mary', 'ECON2277', 'Intermediate Macroeconomics',                  'economics',        2),
  ('queen-mary', 'MATH2278', 'Linear Algebra II',                            'maths',            2),
  ('queen-mary', 'MED2279',  'Human Disease and Therapeutics',               'medicine',         2),

  -- Queen's University Belfast
  ('queens-belfast', 'PSYC2281', 'Biological Psychology',                    'psychology',       2),
  ('queens-belfast', 'LAW2282',  'Equity and Trusts',                        'law',              2),
  ('queens-belfast', 'HIST2283', 'Making History: Theory and Practice',      'history',          2),
  ('queens-belfast', 'BUSI2284', 'Consumer Behaviour',                       'business',         2),
  ('queens-belfast', 'NURS2285', 'Applied Evidence-Based Nursing',           'nursing',          2),
  ('queens-belfast', 'COMP2286', 'Databases',                                'computer-science', 2),
  ('queens-belfast', 'ECON2287', 'Money and Banking',                        'economics',        2),
  ('queens-belfast', 'MATH2288', 'Differential Equations',                   'maths',            2),
  ('queens-belfast', 'MED2289',  'Pathology and Pharmacology',               'medicine',         2),

  -- University of Sheffield
  ('sheffield',  'PSYC2291', 'Social Psychology',                            'psychology',       2),
  ('sheffield',  'LAW2292',  'Public Law',                                   'law',              2),
  ('sheffield',  'HIST2293', 'The Practice of History',                      'history',          2),
  ('sheffield',  'BUSI2294', 'Strategic Management',                        'business',         2),
  ('sheffield',  'NURS2295', 'Clinical Decision Making',                     'nursing',          2),
  ('sheffield',  'COMP2296', 'Computer Systems and Architecture',            'computer-science', 2),
  ('sheffield',  'ECON2297', 'Intermediate Microeconomics',                  'economics',        2),
  ('sheffield',  'MATH2298', 'Abstract Algebra',                             'maths',            2),
  ('sheffield',  'MED2299',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- University of Southampton
  ('southampton', 'PSYC2301', 'Developmental Psychology',                    'psychology',       2),
  ('southampton', 'LAW2302',  'Constitutional and Administrative Law',       'law',              2),
  ('southampton', 'HIST2303', 'Historical Skills and Sources',               'history',          2),
  ('southampton', 'BUSI2304', 'Operations Management',                      'business',         2),
  ('southampton', 'NURS2305', 'Evidence-Based Practice',                     'nursing',          2),
  ('southampton', 'COMP2306', 'Artificial Intelligence',                     'computer-science', 2),
  ('southampton', 'ECON2307', 'Development Economics',                      'economics',        2),
  ('southampton', 'MATH2308', 'Probability and Statistics',                  'maths',            2),
  ('southampton', 'MED2309',  'Musculoskeletal and Neurological Systems',    'medicine',         2),

  -- University College London
  ('ucl',        'PSYC2311', 'Cognitive Psychology',                         'psychology',       2),
  ('ucl',        'LAW2312',  'Tort Law',                                     'law',              2),
  ('ucl',        'HIST2313', 'Historiography and Historical Theory',         'history',          2),
  ('ucl',        'BUSI2314', 'Marketing Analysis and Strategy',              'business',         2),
  ('ucl',        'NURS2315', 'Pathophysiology and Pharmacology',             'nursing',          2),
  ('ucl',        'COMP2316', 'Software Engineering',                         'computer-science', 2),
  ('ucl',        'ECON2317', 'Econometrics I',                               'economics',        2),
  ('ucl',        'MATH2318', 'Real Analysis',                                'maths',            2),
  ('ucl',        'MED2319',  'Human Disease and Therapeutics',               'medicine',         2),

  -- University of Warwick (no undergraduate Nursing or Medicine degree)
  ('warwick',    'PSYC2321', 'Individual Differences',                       'psychology',       2),
  ('warwick',    'LAW2322',  'Contract Law',                                 'law',              2),
  ('warwick',    'HIST2323', 'Approaches to History',                        'history',          2),
  ('warwick',    'BUSI2324', 'Organisational Behaviour',                     'business',         2),
  ('warwick',    'COMP2326', 'Data Structures and Algorithms',               'computer-science', 2),
  ('warwick',    'ECON2327', 'Econometrics I',                               'economics',        2),
  ('warwick',    'MATH2328', 'Linear Algebra II',                            'maths',            2),

  -- University of York
  ('york',       'PSYC2331', 'Psychopathology',                              'psychology',       2),
  ('york',       'LAW2332',  'Land Law',                                     'law',              2),
  ('york',       'HIST2333', 'Sources and Methods in Modern History',        'history',          2),
  ('york',       'BUSI2334', 'Consumer Behaviour',                           'business',         2),
  ('york',       'NURS2335', 'Evidence-Based Practice',                      'nursing',          2),
  ('york',       'COMP2336', 'Databases',                                    'computer-science', 2),
  ('york',       'ECON2337', 'Intermediate Macroeconomics',                  'economics',        2),
  ('york',       'MATH2338', 'Differential Equations',                       'maths',            2),
  ('york',       'MED2339',  'Cardiovascular and Respiratory Systems',       'medicine',         2),

  -- University of Bath (no Law, History, Nursing, or Medicine degree)
  ('bath',       'PSYC2341', 'Social Psychology',                            'psychology',       2),
  ('bath',       'BUSI2344', 'Strategic Management',                        'business',         2),
  ('bath',       'COMP2346', 'Artificial Intelligence',                      'computer-science', 2),
  ('bath',       'ECON2347', 'Intermediate Microeconomics',                  'economics',        2),
  ('bath',       'MATH2348', 'Probability and Statistics',                   'maths',            2)
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
--
-- Two layers:
--   1. Bespoke per-module topics for the two original universities
--      (Manchester, Leeds) — unchanged from the original pilot seed.
--   2. A single shared topic set per discipline (5–6 phrases, extended from
--      the Manchester/Leeds phrasing for the 6 original disciplines; invented
--      sensibly for the 3 new ones), applied to every module of that
--      discipline at every OTHER university. This is deliberately not
--      researched per-institution — it's the same reused list everywhere,
--      per the manual-seeding expansion approach.
-- ----------------------------------------------------------------------------
delete from module_topics where source = 'seed';

-- Layer 1: bespoke topics for Manchester + Leeds modules.
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

-- Layer 2: one shared topic set per discipline, applied to every module of
-- that discipline at every university EXCEPT Manchester/Leeds (which keep
-- their bespoke topics from Layer 1 above).
insert into module_topics (module_id, topic, source)
select mod.id, dt.topic, 'seed'
from (values
  -- discipline,          topic
  ('psychology',        'statistical inference'),
  ('psychology',        'research ethics'),
  ('psychology',        'literature search'),
  ('psychology',        'cognitive modelling'),
  ('psychology',        'attention and memory'),
  ('psychology',        'decision making'),

  ('law',               'legal reasoning'),
  ('law',               'case law analysis'),
  ('law',               'statutory interpretation'),
  ('law',               'contract formation'),
  ('law',               'criminal liability'),
  ('law',               'sentencing'),

  ('history',           'primary source analysis'),
  ('history',           'archival research'),
  ('history',           'source criticism'),
  ('history',           'historiography'),
  ('history',           'historical method'),
  ('history',           'oral history'),

  ('business',          'market segmentation'),
  ('business',          'competitor analysis'),
  ('business',          'consumer research'),
  ('business',          'marketing strategy'),
  ('business',          'consumer psychology'),
  ('business',          'survey research'),

  ('nursing',           'evidence appraisal'),
  ('nursing',           'clinical guidelines'),
  ('nursing',           'patient communication'),
  ('nursing',           'care planning'),
  ('nursing',           'patient education'),
  ('nursing',           'quality improvement'),

  ('computer-science',  'software testing'),
  ('computer-science',  'code review'),
  ('computer-science',  'software design patterns'),
  ('computer-science',  'machine learning'),
  ('computer-science',  'neural networks'),
  ('computer-science',  'requirements engineering'),

  ('economics',         'econometrics'),
  ('economics',         'supply and demand'),
  ('economics',         'market failure'),
  ('economics',         'national income accounting'),
  ('economics',         'monetary policy'),
  ('economics',         'development economics'),

  ('maths',             'proof techniques'),
  ('maths',             'linear algebra'),
  ('maths',             'real analysis'),
  ('maths',             'differential equations'),
  ('maths',             'numerical methods'),
  ('maths',             'probability theory'),

  ('medicine',          'differential diagnosis'),
  ('medicine',          'pharmacology'),
  ('medicine',          'clinical guidelines'),
  ('medicine',          'pathophysiology'),
  ('medicine',          'evidence-based medicine'),
  ('medicine',          'patient communication')
) as dt(discipline, topic)
join modules mod on mod.discipline = dt.discipline
join universities u on u.id = mod.university_id
where u.slug not in ('manchester', 'leeds');

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
  ),
  (
    'econ-model-assumption-audit',
    'Build an AI data-interpretation workflow — then audit every assumption it made',
    'economics',
    25,
    array['workflow-design', 'evaluation', 'tool-integration'],
    'Pull a real dataset from your module topic, get AI to draft an interpretation of it, then force out every assumption baked into that interpretation and check each one against the source.',
    jsonb_build_array(
      'Pick a dataset from ONS (or your module''s usual source) relevant to a topic you''re covering this term.',
      'Ask the model to summarise the trend and suggest one economic explanation for it, pasting the raw figures yourself.',
      'Ask it to list every assumption its explanation depends on — about causation, comparability, or timing.',
      'Check each assumption against the dataset''s own metadata and methodology notes. Mark it holds, questionable, or wrong.',
      'Rewrite your prompt to require assumptions up front next time, before any conclusion — and note how the output changes.'
    ),
    jsonb_build_object(
      'trains', 'Structured data-interpretation prompting and surfacing the assumptions an AI explanation depends on.',
      'not_for', 'Not for generating analysis for assessed coursework, or presenting an AI-drafted interpretation as your own without checking its assumptions.',
      'verification_step', 'Step 4 is the habit: every assumption the model''s explanation relies on gets checked against the dataset''s own documentation before it''s trusted.'
    ),
    array['ECON2237', 'ECON2137', 'ECON2327']
  ),
  (
    'maths-proof-checker',
    'Get AI to attempt a proof — then hunt for the invalid step',
    'maths',
    25,
    array['evaluation', 'prompt-craft', 'tool-integration'],
    'Have AI attempt a proof or problem from your module, then verify it line by line — the failure modes (invalid steps, invented theorems, silently dropped conditions) are specific enough to be worth cataloguing.',
    jsonb_build_array(
      'Pick an unseen problem or proof question from your module''s current problem sheet.',
      'Ask the model to solve or prove it, showing every step, before you look at any worked solution.',
      'Go through its answer line by line against the definitions and theorems from your module — not against ''does the conclusion look right''.',
      'Flag the first invalid step: a theorem that doesn''t exist, a condition it silently dropped, or a non-sequitur.',
      'Compare against your module''s actual worked solution or your tutor''s method, and note which failure mode you caught, so you know what to check for next time.'
    ),
    jsonb_build_object(
      'trains', 'Line-by-line verification of AI-generated proofs against definitions and theorems you can name.',
      'not_for', 'Not for submitting AI-generated proofs as assessed problem-sheet answers, or trusting a proof you haven''t checked step by step.',
      'verification_step', 'Steps 3 and 4 are the habit: every line is checked against a real theorem or definition, and the first invalid step is named before you move on.'
    ),
    array['MATH2148', 'MATH2328', 'MATH2208']
  ),
  (
    'medicine-differential-check',
    'Practice differential-diagnosis reasoning with AI — and check every claim against NICE',
    'medicine',
    25,
    array['evaluation', 'ethics-citation', 'prompt-craft'],
    'Work through a differential-diagnosis reasoning exercise on an anonymised, textbook-style case with AI, then check every clinical claim it makes against NICE and Cochrane before it earns a place in your notes.',
    jsonb_build_array(
      'Take an anonymised, textbook-style case vignette from your module (never a real patient) with a presenting complaint and history.',
      'Ask the model to generate a ranked differential diagnosis with its reasoning for each item.',
      'List every clinical claim it makes — prevalence figures, guideline recommendations, red-flag symptoms — one line each.',
      'Check each claim against NICE guidance or the Cochrane Library. Mark supported, outdated, or invented.',
      'Note which kind of claim it got wrong most often — that''s the pattern to stay alert for next time.'
    ),
    jsonb_build_object(
      'trains', 'Differential-diagnosis reasoning practice with AI and claim-by-claim verification against NICE and Cochrane.',
      'not_for', 'Never for real patient care, real case data, or assessed OSCE and clinical placement work — this is reasoning practice on textbook cases only, not a clinical tool.',
      'verification_step', 'Step 4 is the habit: every clinical claim is checked against NICE or Cochrane before it is trusted, and unsupported claims are marked as such.'
    ),
    array['MED2269', 'MED2319', 'MED2219']
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
--
-- Unchanged: the 3 new disciplines (economics, maths, medicine) intentionally
-- have no seeded advances here — the real daily ingest pipeline will populate
-- those once it runs against the wider catalogue.
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
