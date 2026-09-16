"use client";

import { m } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

type SplitLinesProps = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** Animate on mount instead of on viewport entry (used above the fold). */
  immediate?: boolean;
  id?: string;
};

/**
 * Masked line reveal. Lines are authored explicitly so the break points are
 * typographic decisions rather than accidents of wrapping.
 */
export function SplitLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  immediate = false,
  id,
}: SplitLinesProps) {
  const Tag = m[as];
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
          <m.span
            className={cn("block will-change-transform", lineClassName)}
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 1.25, ease: ease.expo } },
            }}
          >
            {line}
            {i < lines.length - 1 ? " " : null}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
