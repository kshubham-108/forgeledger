"use client";

import { useSyncExternalStore } from "react";
import { getLedger, getProfile, subscribe } from "./store";
import type { LedgerEntry, Profile } from "./types";

const EMPTY_LEDGER: LedgerEntry[] = [];

export function useProfile(): Profile | null {
  return useSyncExternalStore(subscribe, getProfile, () => null);
}

export function useLedger(): LedgerEntry[] {
  return useSyncExternalStore(subscribe, getLedger, () => EMPTY_LEDGER);
}
