"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { quality } from "@/lib/content";
import { cn } from "@/lib/cn";

function Stage({
  label,
  index,
  total,
  progress,
}: {
  label: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const at = index / (total - 1);
  const opacity = useTransform(progress, [at - 0.22, at - 0.04, at + 0.12, at + 0.3], [0.22, 1, 1, 0.45]);
  const x = useTransform(progress, [at - 0.2, at], [16, 0]);
  return (
    <li className="relative grid grid-cols-[2.5rem_1fr] items-baseline md:grid-cols-[4.5rem_1fr]">
      <span className="relative z-10 index text-muted">
        <span className="bg-paper-2 pr-2">{String(index + 1).padStart(2, "0")}</span>
      </span>
      <m.span
        style={{ opacity, x }}
        className={cn(
          "block py-1.5 font-display text-[1.5rem] leading-[1.08] font-medium tracking-[-0.03em] text-ink md:py-3 md:text-[clamp(1.75rem,4.2vw,4rem)] md:leading-[1.02] md:tracking-[-0.04em]",
        )}
      >
        {label}
      </m.span>
      {index < total - 1 ? (
        <span aria-hidden className="col-start-2 block index leading-none text-brass md:pb-1">
          ↓
        </span>
      ) : null}
    </li>
  );
}

export function Quality() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="quality" aria-labelledby="quality-heading" className="relative bg-paper-2 section-y">
      <div className="shell">
        <div className="grid-12 gap-y-8 md:gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Reveal>
                <Eyebrow index="17">{quality.eyebrow}</Eyebrow>
              </Reveal>
              <SplitLines id="quality-heading" lines={["Quality", "Approach"]} className="mt-5 text-h2 md:mt-8" />
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-[34ch] text-lead text-text md:mt-10">{quality.closing}</p>
              </Reveal>
            </div>
          </div>

          <div className="relative col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
            <span aria-hidden className="absolute top-2 bottom-2 left-[0.45rem] w-px bg-line-strong" />
            <m.span
              aria-hidden
              className="absolute top-2 bottom-2 left-[0.45rem] w-px origin-top bg-ink"
              style={{ scaleY: line }}
            />
            <ol ref={ref} aria-label="Quality stages">
              {quality.stages.map((s, i) => (
                <Stage key={s} label={s} index={i} total={quality.stages.length} progress={scrollYProgress} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
