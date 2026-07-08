import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const description =
  "The terms for using Fluent: a free practice tool that trains AI skills matched to your modules. It never completes assessed work, and you stay responsible for your own institution's AI policy.";

export const metadata: Metadata = {
  title: "Terms",
  description,
  alternates: { canonical: "/terms" },
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

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-12">
      <p className="font-mono text-xs uppercase tracking-widest text-cobalt">
        Last updated July 2026
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        Terms of use
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-ink-muted">
        Plain terms for a plain product. By using Fluent, you&rsquo;re
        agreeing to the following.
      </p>

      <div className="mt-10">
        <Section title="What Fluent is">
          <p>
            Fluent gives you 25-minute practice builds matched to your
            university modules, plus a feed of AI advances relevant to what
            you&rsquo;re studying. It is a practice tool, not a course
            provider and not an assessment service.
          </p>
        </Section>

        <Section title="What Fluent is not">
          <p>
            Fluent does not write, complete, or submit assessed work on your
            behalf, and no build is designed to be used that way. Every
            build states up front what it trains and what it must never be
            used for. Using Fluent&rsquo;s output to complete assessed work
            in a way that breaches your institution&rsquo;s academic
            integrity policy is against these terms and entirely your own
            responsibility.
          </p>
        </Section>

        <Section title="Your responsibility">
          <p>
            You&rsquo;re responsible for knowing and following your own
            university&rsquo;s AI and academic integrity policies — they
            vary by institution and by module. Fluent supplements your
            degree; it does not override your department&rsquo;s rules.
          </p>
        </Section>

        <Section title="Accounts and cost">
          <p>
            The core path — every build, the module matching, the frontier
            feed, and your build log — is free, and every build runs on
            tools with a free tier. You can use Fluent in demo mode without
            an account, or create an account to keep your data across
            devices. See our{" "}
            <a href="/privacy" className="text-cobalt hover:text-cobalt-deep">
              privacy page
            </a>{" "}
            for what that involves.
          </p>
        </Section>

        <Section title="Third-party tools">
          <p>
            Builds point you to free external tools (search engines, model
            chat interfaces, public databases like BAILII or NHS guidance).
            Fluent doesn&rsquo;t control those tools, doesn&rsquo;t guarantee
            their availability or accuracy, and isn&rsquo;t responsible for
            their content or any changes they make to pricing or features.
          </p>
        </Section>

        <Section title="No warranty">
          <p>
            Fluent is provided as-is, as an early-stage project (MVP 0).
            Advances, module matches, and build content are curated
            carefully but may contain errors — always verify what an AI
            tool tells you, which is exactly the habit every build is
            designed to build.
          </p>
        </Section>

        <Section title="Changes">
          <p>
            We may update these terms, the catalogue of universities and
            modules, or the builds themselves as Fluent develops. Meaningful
            changes to these terms will be reflected here with an updated
            date above.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            Questions about these terms:{" "}
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
