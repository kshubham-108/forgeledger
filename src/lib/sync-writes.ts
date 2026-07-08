"use client";

import { addLogEntry, saveProfile, saveSnapshot } from "./store";
import type { LogEntry, Profile, SnapshotRatings } from "./types";

function mirrorRemote(fn: () => Promise<void>) {
  void fn().catch((error) => console.warn("Supabase sync skipped:", error));
}

/*
  Lightweight write helpers for pages that should not pull in the full
  data-bridge (and seed catalogue) at navigation time. Supabase mirroring
  is deferred via dynamic import.
*/
export function saveProfileAndSync(profile: Profile) {
  saveProfile(profile);
  mirrorRemote(() =>
    import("./data-bridge").then((bridge) => bridge.mirrorProfile(profile)),
  );
}

export function saveSnapshotAndSync(snapshot: SnapshotRatings) {
  saveSnapshot(snapshot);
  mirrorRemote(() =>
    import("./data-bridge").then((bridge) => bridge.mirrorSnapshot(snapshot)),
  );
}

export function addLogEntryAndSync(
  entry: Omit<LogEntry, "id" | "serial" | "completedAt">,
): LogEntry {
  const full = addLogEntry(entry);
  mirrorRemote(() =>
    import("./data-bridge").then((bridge) => bridge.mirrorCompletion(full)),
  );
  return full;
}
