"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { getBrowserSupabase } from "./supabase/client";
import {
  addCapabilitySnapshot,
  addCompletion,
  getLatestSnapshot,
  getProfile as getRemoteProfile,
  getUserModules,
  listCompletions,
  listModulesForUniversity,
  listUniversities,
  upsertProfile,
  setUserModules,
} from "./supabase/data";
import type {
  CapabilityArea,
  CapabilityRatings,
  Completion,
} from "./supabase/types";
import {
  getBuildBySlug,
  getModuleById,
  modules as seedModules,
  universities as seedUniversities,
} from "./seed";
import {
  addLogEntry,
  getLog,
  getProfile as getLocalProfile,
  replaceLog,
  saveProfile,
  saveSnapshot,
  serialFor,
} from "./store";
import type { Competency, LogEntry, Profile, SnapshotRatings } from "./types";

/*
  Dual-mode data bridge.

  localStorage (src/lib/store.ts) stays the synchronous source of truth the
  UI reads from. When Supabase is configured AND a session exists, this
  module additionally:
    * mirrors writes (profile + modules, snapshots, completions) to Supabase,
    * hydrates the local store from Supabase on sign-in / page load,
    * pushes up local data Supabase doesn't have yet (one-shot sync).

  Everything is fire-and-forget: a Supabase failure logs a console.warn and
  the local flow carries on untouched.
*/

// ---------------------------------------------------------------------------
// Competency (kebab-case, UI) ↔ capability area (snake_case, DB) mapping
// ---------------------------------------------------------------------------

const competencyToArea: Partial<Record<Competency, CapabilityArea>> = {
  "prompt-craft": "prompt_craft",
  evaluation: "evaluation",
  "workflow-design": "workflow_design",
  "ethics-citation": "ethics_citation",
};

const areaToCompetency: Record<CapabilityArea, Competency> = {
  prompt_craft: "prompt-craft",
  evaluation: "evaluation",
  workflow_design: "workflow-design",
  ethics_citation: "ethics-citation",
};

function toCapabilityRatings(snapshot: SnapshotRatings): CapabilityRatings {
  const ratings: CapabilityRatings = {};
  for (const [competency, value] of Object.entries(snapshot)) {
    const area = competencyToArea[competency as Competency];
    if (area && typeof value === "number") ratings[area] = value;
  }
  return ratings;
}

function toSnapshotRatings(ratings: CapabilityRatings): SnapshotRatings {
  const snapshot: SnapshotRatings = {};
  for (const [area, value] of Object.entries(ratings)) {
    const competency = areaToCompetency[area as CapabilityArea];
    if (competency && typeof value === "number") snapshot[competency] = value;
  }
  return snapshot;
}

// ---------------------------------------------------------------------------
// Catalogue map: local seed ids ↔ Supabase uuids, joined by uni slug + code
// ---------------------------------------------------------------------------

type CatalogueMap = {
  localUniToRemote: Map<string, string>;
  remoteUniToLocal: Map<string, string>;
  localModuleToRemote: Map<string, string>;
  remoteModuleToLocal: Map<string, string>;
};

let catalogueMapPromise: Promise<CatalogueMap | null> | null = null;

async function loadCatalogueMap(
  supabase: SupabaseClient,
): Promise<CatalogueMap | null> {
  const remoteUnis = await listUniversities(supabase);
  if (remoteUnis.length === 0) return null;

  const map: CatalogueMap = {
    localUniToRemote: new Map(),
    remoteUniToLocal: new Map(),
    localModuleToRemote: new Map(),
    remoteModuleToLocal: new Map(),
  };

  for (const localUni of seedUniversities) {
    const remoteUni = remoteUnis.find((u) => u.slug === localUni.slug);
    if (!remoteUni) continue;
    map.localUniToRemote.set(localUni.id, remoteUni.id);
    map.remoteUniToLocal.set(remoteUni.id, localUni.id);

    const remoteModules = await listModulesForUniversity(supabase, remoteUni.id);
    for (const localModule of seedModules) {
      if (localModule.universityId !== localUni.id) continue;
      const remoteModule = remoteModules.find(
        (m) => m.code === localModule.code,
      );
      if (!remoteModule) continue;
      map.localModuleToRemote.set(localModule.id, remoteModule.id);
      map.remoteModuleToLocal.set(remoteModule.id, localModule.id);
    }
  }
  return map;
}

function getCatalogueMap(
  supabase: SupabaseClient,
): Promise<CatalogueMap | null> {
  if (!catalogueMapPromise) {
    catalogueMapPromise = loadCatalogueMap(supabase).catch(() => {
      catalogueMapPromise = null;
      return null;
    });
  }
  return catalogueMapPromise;
}

// ---------------------------------------------------------------------------
// Session helper — writes only mirror when a Supabase session exists
// ---------------------------------------------------------------------------

async function getSessionClient(): Promise<SupabaseClient | null> {
  const supabase = getBrowserSupabase();
  if (!supabase) return null;
  const { data } = await supabase.auth.getSession();
  return data.session ? supabase : null;
}

// ---------------------------------------------------------------------------
// Bridged writes: local first (synchronous), Supabase mirror in the background
// ---------------------------------------------------------------------------

export function saveProfileAndSync(profile: Profile) {
  saveProfile(profile);
  void mirrorProfile(profile);
}

export function saveSnapshotAndSync(snapshot: SnapshotRatings) {
  saveSnapshot(snapshot);
  void mirrorSnapshot(snapshot);
}

export function addLogEntryAndSync(
  entry: Omit<LogEntry, "id" | "serial" | "completedAt">,
): LogEntry {
  const full = addLogEntry(entry);
  void mirrorCompletion(full);
  return full;
}

async function mirrorProfile(profile: Profile) {
  try {
    const supabase = await getSessionClient();
    if (!supabase) return;
    const map = await getCatalogueMap(supabase);
    await upsertProfile(supabase, {
      displayName: profile.displayName,
      universityId: map?.localUniToRemote.get(profile.universityId) ?? null,
      hoursPerWeek: profile.hoursPerWeek,
    });
    if (map) {
      const remoteModuleIds = profile.moduleIds
        .map((id) => map.localModuleToRemote.get(id))
        .filter((id): id is string => id !== undefined);
      await setUserModules(supabase, remoteModuleIds);
    }
    if (profile.snapshot && Object.keys(profile.snapshot).length > 0) {
      await addCapabilitySnapshot(supabase, toCapabilityRatings(profile.snapshot));
    }
  } catch (error) {
    console.warn("Supabase profile sync skipped:", error);
  }
}

async function mirrorSnapshot(snapshot: SnapshotRatings) {
  try {
    const supabase = await getSessionClient();
    if (!supabase) return;
    await addCapabilitySnapshot(supabase, toCapabilityRatings(snapshot));
  } catch (error) {
    console.warn("Supabase snapshot sync skipped:", error);
  }
}

async function mirrorCompletion(entry: LogEntry) {
  try {
    const supabase = await getSessionClient();
    if (!supabase) return;
    await addCompletion(supabase, {
      buildSlug: entry.buildSlug,
      minutesSpent: entry.timeSpentMin,
      confidence: entry.confidence,
      note: entry.note || null,
      artifactUrl: entry.noteLink ?? null,
    });
  } catch (error) {
    console.warn("Supabase completion sync skipped:", error);
  }
}

// ---------------------------------------------------------------------------
// Hydration: Supabase → local store shapes
// ---------------------------------------------------------------------------

function completionToLogEntry(
  completion: Completion,
  index: number,
  profileModuleCodes: Set<string>,
  existingBySlug: Map<string, LogEntry>,
): LogEntry {
  const previous = existingBySlug.get(completion.buildSlug);
  const build = getBuildBySlug(completion.buildSlug);
  const moduleCode =
    previous?.moduleCode ||
    build?.moduleCodes.find((code) => profileModuleCodes.has(code)) ||
    build?.moduleCodes[0] ||
    "";
  return {
    id: completion.id,
    serial: serialFor(index),
    buildSlug: completion.buildSlug,
    moduleCode,
    confidence: completion.confidence ?? previous?.confidence ?? 3,
    competencyRatings: previous?.competencyRatings,
    timeSpentMin: completion.minutesSpent,
    note: completion.note ?? previous?.note ?? "",
    noteLink: completion.artifactUrl ?? previous?.noteLink,
    groundRulesConfirmed: previous?.groundRulesConfirmed ?? true,
    completedAt: completion.completedAt,
  };
}

// ---------------------------------------------------------------------------
// One-shot sync on sign-in: push up what Supabase lacks, then hydrate local
// from Supabase (Supabase wins when both sides have data).
// ---------------------------------------------------------------------------

let syncedUserId: string | null = null;

export async function syncWithSupabase(): Promise<void> {
  const supabase = getBrowserSupabase();
  if (!supabase) return;

  try {
    const { data } = await supabase.auth.getSession();
    const userId = data.session?.user.id;
    if (!userId || syncedUserId === userId) return;
    syncedUserId = userId;

    const [remoteProfile, remoteModules, remoteSnapshot, remoteCompletions] =
      await Promise.all([
        getRemoteProfile(supabase),
        getUserModules(supabase),
        getLatestSnapshot(supabase),
        listCompletions(supabase),
      ]);

    const localProfile = getLocalProfile();
    const localLog = getLog();
    const map = await getCatalogueMap(supabase);
    const remoteOnboarded =
      remoteProfile?.universityId != null && remoteModules.length > 0;

    /* Push up: profile/modules/snapshot only if Supabase hasn't onboarded. */
    if (localProfile && !remoteOnboarded) {
      await mirrorProfile(
        remoteSnapshot ? { ...localProfile, snapshot: undefined } : localProfile,
      );
    }

    /* Push up: completions Supabase doesn't have (matched by build slug). */
    const remoteSlugs = new Set(remoteCompletions.map((c) => c.buildSlug));
    const missing = localLog.filter((e) => !remoteSlugs.has(e.buildSlug));
    for (const entry of missing) {
      await addCompletion(supabase, {
        buildSlug: entry.buildSlug,
        minutesSpent: entry.timeSpentMin,
        confidence: entry.confidence,
        note: entry.note || null,
        artifactUrl: entry.noteLink ?? null,
      });
    }

    /* Hydrate: profile (Supabase wins when it has onboarding data). */
    if (remoteOnboarded && map && remoteProfile) {
      const localUniId = remoteProfile.universityId
        ? map.remoteUniToLocal.get(remoteProfile.universityId)
        : undefined;
      if (localUniId) {
        const moduleIds = remoteModules
          .map((m) => map.remoteModuleToLocal.get(m.id))
          .filter((id): id is string => id !== undefined);
        const snapshot = remoteSnapshot
          ? toSnapshotRatings(remoteSnapshot.ratings)
          : localProfile?.snapshot;
        saveProfile({
          displayName:
            remoteProfile.displayName ?? localProfile?.displayName ?? "Student",
          universityId: localUniId,
          moduleIds,
          hoursPerWeek:
            remoteProfile.hoursPerWeek ?? localProfile?.hoursPerWeek ?? 3,
          snapshot:
            snapshot && Object.keys(snapshot).length > 0 ? snapshot : undefined,
          createdAt: remoteProfile.createdAt,
        });
      }
    }

    /* Hydrate: completions (re-fetch so pushed-up entries come back too). */
    const finalCompletions =
      missing.length > 0 ? await listCompletions(supabase) : remoteCompletions;
    if (finalCompletions.length > 0) {
      const profileCodes = new Set(
        (getLocalProfile()?.moduleIds ?? [])
          .map((id) => getModuleById(id)?.code)
          .filter((code): code is string => code !== undefined),
      );
      const existingBySlug = new Map(localLog.map((e) => [e.buildSlug, e]));
      const oldestFirst = [...finalCompletions].reverse();
      replaceLog(
        oldestFirst.map((completion, index) =>
          completionToLogEntry(completion, index, profileCodes, existingBySlug),
        ),
      );
    }
  } catch (error) {
    console.warn("Supabase sync skipped:", error);
  }
}

/* Allow a re-sync after sign-out → sign-in as a different user. */
export function resetSyncState() {
  syncedUserId = null;
}
