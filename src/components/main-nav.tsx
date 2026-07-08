"use client";

import Link from "next/link";
import { AuthNav } from "@/components/auth-nav";

export function MainNav() {
  return (
    <nav className="mx-auto flex w-full max-w-5xl items-baseline justify-between px-6 py-4">
      <Link
        href="/"
        className="font-display text-xl font-semibold tracking-tight text-paper"
      >
        Fluent
      </Link>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 text-sm">
        <Link href="/explore" className="text-paper/75 hover:text-paper">
          Explore
        </Link>
        <AuthNav />
      </div>
    </nav>
  );
}
