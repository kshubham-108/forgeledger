import { advances } from "@/lib/seed/advances";
import { advanceSourceLabels } from "@/lib/seed/labels";

export function FrontierTicker() {
  return (
    <section aria-label="This week from the frontier" className="border-y border-cobalt-soft bg-card">
      <div className="mx-auto flex w-full max-w-7xl items-baseline justify-between px-12 py-3">
        <h2 className="font-mono text-[11px] uppercase tracking-widest text-cobalt-deep">
          This week from the frontier
        </h2>
        <p className="hidden font-mono text-[11px] text-ink-muted sm:block">
          Fluent watches the feeds. You get the skill.
        </p>
      </div>
      <div className="ticker">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {advances.map((advance) => (
                <li
                  key={`${copy}-${advance.id}`}
                  className="flex items-baseline gap-2 whitespace-nowrap px-12 py-2"
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
