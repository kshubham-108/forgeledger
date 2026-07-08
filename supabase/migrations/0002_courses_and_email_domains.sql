-- ============================================================================
-- Fluent — courses (discipline at registration) and university email gating
-- ============================================================================
-- Two additions:
--   1. universities.student_email_domains — the real student email domain
--      suffix(es) for that university, used to gate sign-up.
--   2. profiles.discipline — the "course" a student picks at registration
--      (same free-text vocabulary as modules.discipline / micro_builds.discipline,
--      not FK-constrained, consistent with how discipline is modeled elsewhere).
--
-- handle_new_user() is replaced to read `university_id` and `discipline` out
-- of the new user's raw_user_meta_data (set by the client's signUp() call)
-- and to set them directly on the profile row — this works regardless of
-- whether email confirmation delays the first sign-in.
--
-- Email domain check: a basic, deliberately simple test — the new user's
-- email must end with one of the chosen university's student_email_domains
-- (case-insensitive). This runs server-side as a backstop behind a friendlier
-- client-side check in the sign-up form. If no university_id is supplied in
-- metadata, the check is skipped so nothing else (e.g. future non-gated
-- signup paths) breaks.
-- ============================================================================

alter table universities
  add column student_email_domains text[] not null default '{}';

alter table profiles
  add column discipline text;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta_university_id uuid;
  meta_discipline     text;
  allowed_domains     text[];
  email_lower         text;
  domain_ok           boolean;
begin
  meta_university_id := nullif(new.raw_user_meta_data ->> 'university_id', '')::uuid;
  meta_discipline     := nullif(new.raw_user_meta_data ->> 'discipline', '');
  email_lower         := lower(new.email);

  if meta_university_id is not null then
    select student_email_domains into allowed_domains
    from public.universities
    where id = meta_university_id;

    if allowed_domains is not null and array_length(allowed_domains, 1) > 0 then
      select bool_or(email_lower like ('%' || lower(domain)))
      into domain_ok
      from unnest(allowed_domains) as domain;

      if not coalesce(domain_ok, false) then
        raise exception
          'Please sign up with your university email address for the university you selected.';
      end if;
    end if;
  end if;

  insert into public.profiles (id, display_name, university_id, discipline)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      split_part(new.email, '@', 1)
    ),
    meta_university_id,
    meta_discipline
  );
  return new;
end;
$$;
