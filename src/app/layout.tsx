import type { Metadata } from "next";
import { Young_Serif, Public_Sans, Spline_Sans_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const youngSerif = Young_Serif({
  variable: "--font-young-serif",
  weight: "400",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stamped — prove your AI skills, one build at a time",
  description:
    "Short AI builds mapped to your real modules. Every one you complete gets stamped as proof. Built for UK undergraduates.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${youngSerif.variable} ${publicSans.variable} ${splineMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-rule bg-paper">
          <nav className="mx-auto flex w-full max-w-5xl items-baseline justify-between px-6 py-4">
            <Link
              href="/"
              className="font-display text-xl tracking-tight text-ink"
            >
              Stamped
            </Link>
            <div className="flex items-baseline gap-6 text-sm">
              <Link
                href="/dashboard"
                className="text-ink-muted hover:text-ink"
              >
                This week
              </Link>
              <Link href="/ledger" className="text-ink-muted hover:text-ink">
                My stamps
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-rule">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-6 py-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
            <p>
              Stamped supplements your degree. It never completes assessed work
              for you.
            </p>
            <p className="font-mono">MVP 0 · demo data, stored on this device</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
