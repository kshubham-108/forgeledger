import type { LogEntry, Profile, SnapshotRatings } from "./types";

/*
  Demo-mode store: versioned localStorage, swapped for a real backend later.
  Reads are cached at module level; writes update the cache and notify
  subscribers so useSyncExternalStore stays consistent.

  v2 ("fluent.*") renames the ledger to a build log and drops evidence-status
  fields. v1 ("st.*") data is migrated once, then the old keys are removed.
*/

const PROFILE_KEY = "fluent.v2.profile";
const LOG_KEY = "fluent.v2.log";

const LEGACY_PROFILE_KEY = "st.v1.profile";
const LEGACY_LEDGER_KEY = "st.v1.ledger";

let profileCache: Profile | null | undefined;
let logCache: LogEntry[] | undefined;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/* Shape of a v1 ledger entry, only as far as migration needs it. */
type LegacyLedgerEntry = {
  id?: string;
  buildSlug?: string;
  moduleCode?: string;
  selfScore?: number;
  competencySelfRatings?: SnapshotRatings;
  timeSpentMin?: number;
  artifactText?: string;
  artifactLink?: string;
  integrityConfirmed?: boolean;
  completedAt?: string;
};

export function serialFor(index: number): string {
  return `FL-${String(index + 1).padStart(4, "0")}`;
}

/* One-shot v1 → v2 migration; malformed legacy data is discarded. */
function migrateLegacy() {
  try {
    const legacyProfileRaw = window.localStorage.getItem(LEGACY_PROFILE_KEY);
    if (legacyProfileRaw && !window.localStorage.getItem(PROFILE_KEY)) {
      const legacy = JSON.parse(legacyProfileRaw) as Partial<Profile>;
      if (
        typeof legacy.universityId === "string" &&
        Array.isArray(legacy.moduleIds)
      ) {
        const migrated: Profile = {
          displayName: legacy.displayName ?? "Student",
          universityId: legacy.universityId,
          moduleIds: legacy.moduleIds,
          hoursPerWeek: legacy.hoursPerWeek ?? 3,
          createdAt: legacy.createdAt ?? new Date().toISOString(),
        };
        window.localStorage.setItem(PROFILE_KEY, JSON.stringify(migrated));
      }
    }

    const legacyLedgerRaw = window.localStorage.getItem(LEGACY_LEDGER_KEY);
    if (legacyLedgerRaw && !window.localStorage.getItem(LOG_KEY)) {
      const legacy = JSON.parse(legacyLedgerRaw) as LegacyLedgerEntry[];
      if (Array.isArray(legacy)) {
        const migrated: LogEntry[] = legacy
          .filter((e) => typeof e.buildSlug === "string")
          .map((e, i) => ({
            id: e.id ?? crypto.randomUUID(),
            serial: serialFor(i),
            buildSlug: e.buildSlug as string,
            moduleCode: e.moduleCode ?? "",
            confidence: e.selfScore ?? 3,
            competencyRatings: e.competencySelfRatings,
            timeSpentMin: e.timeSpentMin ?? 25,
            note: e.artifactText ?? "",
            noteLink: e.artifactLink,
            groundRulesConfirmed: e.integrityConfirmed,
            completedAt: e.completedAt ?? new Date().toISOString(),
          }));
        window.localStorage.setItem(LOG_KEY, JSON.stringify(migrated));
      }
    }
  } catch {
    /* Corrupt legacy data: start fresh rather than crash the demo. */
  }
  window.localStorage.removeItem(LEGACY_PROFILE_KEY);
  window.localStorage.removeItem(LEGACY_LEDGER_KEY);
}

function ensureMigrated() {
  if (
    window.localStorage.getItem(LEGACY_PROFILE_KEY) !== null ||
    window.localStorage.getItem(LEGACY_LEDGER_KEY) !== null
  ) {
    migrateLegacy();
  }
}

export function getProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  if (profileCache === undefined) {
    ensureMigrated();
    try {
      const raw = window.localStorage.getItem(PROFILE_KEY);
      profileCache = raw ? (JSON.parse(raw) as Profile) : null;
    } catch {
      profileCache = null;
    }
  }
  return profileCache;
}

export function saveProfile(profile: Profile) {
  profileCache = profile;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  emit();
}

export function saveSnapshot(snapshot: SnapshotRatings) {
  const profile = getProfile();
  if (!profile) return;
  saveProfile({ ...profile, snapshot });
}

export function getLog(): LogEntry[] {
  if (typeof window === "undefined") return EMPTY_LOG;
  if (logCache === undefined) {
    ensureMigrated();
    try {
      const raw = window.localStorage.getItem(LOG_KEY);
      logCache = raw ? (JSON.parse(raw) as LogEntry[]) : [];
    } catch {
      logCache = [];
    }
  }
  return logCache;
}

const EMPTY_LOG: LogEntry[] = [];

export function addLogEntry(
  entry: Omit<LogEntry, "id" | "serial" | "completedAt">,
): LogEntry {
  const existing = getLog();
  const full: LogEntry = {
    ...entry,
    id: crypto.randomUUID(),
    serial: serialFor(existing.length),
    completedAt: new Date().toISOString(),
  };
  logCache = [...existing, full];
  window.localStorage.setItem(LOG_KEY, JSON.stringify(logCache));
  emit();
  return full;
}

/* Replace the whole log (oldest first) — used when hydrating from Supabase. */
export function replaceLog(entries: LogEntry[]) {
  logCache = entries;
  window.localStorage.setItem(LOG_KEY, JSON.stringify(entries));
  emit();
}

/* Wipe the local profile + log — used on sign-out so a stale profile doesn't
   keep showing (or leak into) whichever account signs in next on this
   browser. Demo mode never calls this: there is no real sign-out there. */
export function clearLocalData() {
  profileCache = null;
  logCache = [];
  window.localStorage.removeItem(PROFILE_KEY);
  window.localStorage.removeItem(LOG_KEY);
  emit();
}
