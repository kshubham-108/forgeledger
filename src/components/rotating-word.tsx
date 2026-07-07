"use client";

import { useEffect, useState } from "react";

type RotatingWordProps = {
  words: string[];
  intervalMs?: number;
};

/*
  Cycles through a list of words with a small rise-in on each swap.
  Rotation stops entirely under prefers-reduced-motion.

  All words are stacked in the same grid cell (inline-grid, area 1/1) with
  only the active one visible, so the slot is always as wide as the longest
  word and the surrounding line never re-wraps when the word changes.
*/
export function RotatingWord({ words, intervalMs = 2600 }: RotatingWordProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      intervalMs,
    );
    return () => window.clearInterval(timer);
  }, [words.length, intervalMs]);

  return (
    <span className="inline-grid whitespace-nowrap align-baseline text-cobalt">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`col-start-1 row-start-1 ${
            i === index ? "word-in" : "invisible"
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
