import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Instrument_Sans } from "next/font/google";
import Link from "next/link";
import { AuthNav } from "@/components/auth-nav";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Fluent — get fluent in the latest AI, inside your degree",
    template: "%s — Fluent",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "AI skills for students",
    "UK university AI training",
    "learn AI in your degree",
    "AI literacy university",
    "student AI practice",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Fluent — get fluent in the latest AI, inside your degree",
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluent — get fluent in the latest AI, inside your degree",
    description: SITE_DESCRIPTION,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${bricolage.variable} ${instrumentSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b-2 border-cobalt bg-ink">
          <nav className="mx-auto flex w-full max-w-5xl items-baseline justify-between px-6 py-4">
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-paper"
            >
              Fluent
            </Link>
            <div className="flex items-baseline gap-6 text-sm">
              <Link
                href="/dashboard"
                className="text-paper/75 hover:text-paper"
              >
                This week
              </Link>
              <Link href="/ledger" className="text-paper/75 hover:text-paper">
                My log
              </Link>
              <AuthNav />
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-rule bg-card">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-6 py-10 sm:grid-cols-[2fr_1fr_1fr]">
            <div>
              <p className="font-display text-lg font-semibold tracking-tight text-ink">
                Fluent
              </p>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-ink-muted">
                Weekly AI practice matched to the modules you&rsquo;re actually
                taking. Free tools only, built for UK undergraduates.
              </p>
              <p className="mt-4 max-w-xs border-l-2 border-cobalt pl-3 text-xs leading-relaxed text-ink-muted">
                Fluent helps you learn to use AI well inside your degree. It
                never completes assessed work for you.
              </p>
            </div>
            <nav aria-label="Footer">
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Explore
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <li>
                  <Link href="/" className="text-ink hover:text-cobalt">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="text-ink hover:text-cobalt"
                  >
                    This week
                  </Link>
                </li>
                <li>
                  <Link href="/ledger" className="text-ink hover:text-cobalt">
                    My log
                  </Link>
                </li>
                <li>
                  <Link
                    href="/builds/psych-literature-pipeline"
                    className="text-ink hover:text-cobalt"
                  >
                    Example build
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
                Grounded in
              </h2>
              <ul className="mt-3 flex flex-col gap-2 text-xs leading-relaxed text-ink-muted">
                <li>HEPI Student Generative AI Survey 2025</li>
                <li>Free-tool-first: nothing paywalled on the core path</li>
                <li>Your notes stay on your device</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-rule">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-6 py-4 text-xs text-ink-muted sm:flex-row sm:justify-between">
              <p>&copy; {new Date().getFullYear()} Fluent</p>
              <p className="font-mono">
                MVP 0 · demo data, stored on this device
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
