import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const description =
  "How Fluent handles your data: demo mode keeps everything on your device, signed-in mode mirrors it to your own Supabase-backed account. Nothing is sold, shared, or used to train models.";

export const metadata: Metadata = {
  title: "Privacy",
  description,
  alternates: { canonical: "/privacy" },
};

const contactEmail = `hello@${new URL(SITE_URL).hostname}`;

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 border-t border-rule pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <h2 className="font-mono text-xs uppercase tracking-widest text-ink">
        {title}
      </h2>
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-ink-muted">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        Last updated July 2026
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Privacy
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        Fluent is built so the default answer to &ldquo;where does my data
        go?&rdquo; is &ldquo;nowhere.&rdquo; This page explains exactly what
        the two modes the app runs in actually do.
      </p>

      <div className="mt-10">
        <Section title="Demo mode (no account)">
          <p>
            This is how the site runs for everyone by default. Your profile,
            module picks, capability snapshot and build log are stored only
            in your browser&rsquo;s <code>localStorage</code>, on your
            device. Nothing is sent to a server, nothing is sold, and we have
            no way to see it. Clearing your browser data deletes it
            completely.
          </p>
        </Section>

        <Section title="Signed-in mode (optional account)">
          <p>
            If you create an account, your email address, module picks,
            capability snapshot and build log are also stored in a Supabase
            project so they follow you across devices. Every one of those
            tables is access-controlled so that only your signed-in account
            can read or write your own rows — nobody else&rsquo;s, and not
            even us outside of running the service. <code>localStorage</code>{" "}
            stays the fast layer the app reads from; Supabase is the
            durable copy.
          </p>
          <p>
            Signing in sets one session cookie, refreshed automatically, so
            you stay signed in. It is used only for authentication — not for
            tracking or advertising.
          </p>
        </Section>

        <Section title="What we never do">
          <ul className="flex list-disc flex-col gap-2 pl-5">
            <li>Sell or share your data with third parties.</li>
            <li>Use your notes, build logs, or profile to train any model.</li>
            <li>Run advertising trackers or third-party analytics pixels.</li>
            <li>
              Send your data to arXiv or any other feed source — the only
              thing Fluent fetches from arXiv is public research metadata,
              flowing one way, into the app.
            </li>
          </ul>
        </Section>

        <Section title="The catalogue you see">
          <p>
            The university, module, and micro-build catalogue, and the
            frontier advances feed, are the same for every student and
            contain no personal data — they&rsquo;re what Fluent shows you,
            not information about you.
          </p>
        </Section>

        <Section title="Deleting your data">
          <p>
            In demo mode, clear your browser&rsquo;s site data for Fluent and
            everything is gone immediately. If you have an account, email us
            at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-cobalt hover:text-cobalt-deep"
            >
              {contactEmail}
            </a>{" "}
            and we&rsquo;ll delete your account and every row tied to it.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            Fluent is an early-stage project (MVP 0) and this policy will
            evolve as the product does — most likely to add detail, not to
            reduce it. Meaningful changes will be reflected on this page with
            an updated date above.
          </p>
        </Section>

        <Section title="Questions">
          <p>
            Reach us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-cobalt hover:text-cobalt-deep"
            >
              {contactEmail}
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}
