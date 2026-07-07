import type { Metadata } from "next";
import { LogView } from "@/components/ledger-view";

export const metadata: Metadata = {
  title: "My log",
  description:
    "Your personal record of completed AI practice builds: what you practised, when, and how confident you felt.",
  robots: { index: false },
};

export default function LogPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <LogView />
    </div>
  );
}
