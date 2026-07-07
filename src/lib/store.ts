import type { LedgerEntry, Profile } from "./types";

/*
  Demo-mode store: versioned localStorage, swapped for Supabase in MVP 1.
  Reads are cached at module level; writes update the cache and notify
  subscribers so useSyncExternalStore stays consistent.
*/

const PROFILE_KEY = "st.v1.profile";
const LEDGER_KEY = "st.v1.ledger";

let profileCache: Profile | null | undefined;
let ledgerCache: LedgerEntry[] | undefined;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getProfile(): Profile | null {
  if (typeof window === "undefined") return null;
  if (profileCache === undefined) {
    const raw = window.localStorage.getItem(PROFILE_KEY);
    profileCache = raw ? (JSON.parse(raw) as Profile) : null;
  }
  return profileCache;
}

export function saveProfile(profile: Profile) {
  profileCache = profile;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  emit();
}

export function getLedger(): LedgerEntry[] {
  if (typeof window === "undefined") return EMPTY_LEDGER;
  if (ledgerCache === undefined) {
    const raw = window.localStorage.getItem(LEDGER_KEY);
    ledgerCache = raw ? (JSON.parse(raw) as LedgerEntry[]) : [];
  }
  return ledgerCache;
}

const EMPTY_LEDGER: LedgerEntry[] = [];

export function addLedgerEntry(
  entry: Omit<LedgerEntry, "id" | "serial" | "completedAt" | "evidenceStatus">,
): LedgerEntry {
  const existing = getLedger();
  /*
    Provenance is derived, never claimed: an entry with a pasted artifact or
    link is "artifact-attached"; anything less is "self-assessed". External
    verification is a later tier and is never assigned here.
  */
  const hasArtifact =
    entry.artifactText.trim().length >= 40 ||
    (entry.artifactLink ?? "").trim().length > 0;
  const full: LedgerEntry = {
    ...entry,
    id: crypto.randomUUID(),
    serial: `ST-${String(existing.length + 1).padStart(4, "0")}`,
    evidenceStatus: hasArtifact ? "artifact-attached" : "self-assessed",
    completedAt: new Date().toISOString(),
  };
  ledgerCache = [...existing, full];
  window.localStorage.setItem(LEDGER_KEY, JSON.stringify(ledgerCache));
  emit();
  return full;
}
