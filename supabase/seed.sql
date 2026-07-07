-- Pilot catalogue seed — mirrors src/lib/seed.ts

insert into universities (slug, name, city) values
  ('manchester', 'University of Manchester', 'Manchester'),
  ('leeds', 'University of Leeds', 'Leeds');

insert into modules (university_id, code, title, discipline, study_year)
select u.id, m.code, m.title, m.discipline, m.study_year
from (values
  ('manchester', 'PSYC2017', 'Research Methods and Statistics', 'psychology', 2),
  ('manchester', 'LAW2041', 'Contract Law', 'law', 2),
  ('manchester', 'HIST2260', 'Sources and Methods in Modern History', 'history', 2),
  ('manchester', 'BMAN2011', 'Marketing Analysis and Strategy', 'business', 2),
  ('manchester', 'NURS2301', 'Evidence-Based Practice', 'nursing', 2),
  ('manchester', 'COMP2001', 'Software Engineering', 'computer-science', 2),
  ('leeds', 'PSYC2520', 'Cognitive Psychology', 'psychology', 2),
  ('leeds', 'LAW2086', 'Criminal Law', 'law', 2),
  ('leeds', 'HIST2400', 'The Practice of History', 'history', 2),
  ('leeds', 'LUBS2005', 'Consumer Behaviour', 'business', 2)
) as m(uni_slug, code, title, discipline, study_year)
join universities u on u.slug = m.uni_slug;

-- Micro-builds are seeded from src/lib/seed.ts via a script in MVP 1,
-- keeping one source of truth for build content during the pilot.
