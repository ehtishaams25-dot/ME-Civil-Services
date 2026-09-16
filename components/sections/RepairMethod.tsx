"use client";

import { m, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { ease } from "@/lib/motion";

/** Eight-step repair sequence drawn as a measured track that fills as it scrolls past. */
export function RepairMethod({ steps }: { steps: readonly string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="mt-12 md:mt-[clamp(5rem,10vw,9rem)]">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <p className="eyebrow text-brass">Repair methodology</p>
          <h3 className="mt-3 max-w-[22ch] text-h3 md:mt-5">From suspected source to final finishing.</h3>
        </div>
        <p className="index text-muted-dark">08 steps</p>
      </div>

      <div className="relative mt-6 md:mt-12">
        {/* Track */}
        <div aria-hidden className="absolute inset-x-0 top-0 hidden h-px bg-paper/15 lg:block" />
        <m.div
          aria-hidden
          className="absolute inset-x-0 top-0 hidden h-px origin-left bg-brass lg:block"
          style={{ scaleX }}
        />

        <ol className="grid grid-cols-2 gap-x-[var(--gutter)] md:grid-cols-4 lg:grid-cols-8">
          {steps.map((step, i) => (
            <m.li
              key={step}
              className="relative border-t border-paper/15 pt-4 pb-5 md:pt-6 md:pb-10 lg:border-t-0 lg:pt-8 lg:pb-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: ease.expo, delay: i * 0.06 }}
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 hidden size-[7px] -translate-y-[3px] rounded-full border border-brass bg-ink lg:block"
              />
              <span className="index text-brass">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-display text-[1rem] leading-snug md:mt-4 md:text-[1.0625rem] font-medium tracking-[-0.01em] text-paper lg:text-[1rem] xl:text-[1.125rem]">
                {step}
              </p>
            </m.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
