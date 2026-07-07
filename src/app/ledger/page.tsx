import type { Metadata } from "next";
import { LedgerView } from "@/components/ledger-view";

export const metadata: Metadata = {
  title: "My stamps — Stamped",
};

export default function LedgerPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <LedgerView />
    </div>
  );
}
