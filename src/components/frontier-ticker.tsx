import { advances } from "@/lib/seed/advances";
import { advanceSourceLabels } from "@/lib/seed/labels";

/*
  "This week from the frontier" — a slow CSS marquee of recent advances
  from the seeded feed. The track holds the list twice; the duplicate is
  aria-hidden. Under prefers-reduced-motion it becomes a scrollable row.
*/
export function FrontierTicker() {
  return (
    <section aria-label="This week from the frontier">
      <div className="mx-auto flex w-full max-w-5xl items-baseline justify-between px-6 pb-2">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-ink-muted">
          This week from the frontier
        </h2>
        <p className="hidden font-mono text-[11px] text-ink-muted sm:block">
          Fluent watches the feeds. You get the skill.
        </p>
      </div>
      <div className="ticker border-y border-rule bg-card">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {advances.map((advance) => (
                <li
                  key={advance.id}
                  className="flex items-baseline gap-2 whitespace-nowrap px-6 py-2.5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wide text-cobalt">
                    {advanceSourceLabels[advance.source]}
                  </span>
                  <span className="text-xs text-ink">{advance.title}</span>
                  <span className="font-mono text-[11px] text-ink-muted">
                    {advance.date}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
