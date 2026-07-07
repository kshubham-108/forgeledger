"use client";

import { useSyncExternalStore } from "react";
import { getLog, getProfile, subscribe } from "./store";
import type { LogEntry, Profile } from "./types";

const EMPTY_LOG: LogEntry[] = [];

export function useProfile(): Profile | null {
  return useSyncExternalStore(subscribe, getProfile, () => null);
}

export function useLog(): LogEntry[] {
  return useSyncExternalStore(subscribe, getLog, () => EMPTY_LOG);
}
