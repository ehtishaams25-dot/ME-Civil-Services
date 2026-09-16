"use client";

import { AnimatePresence, m, useScroll, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { execution } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function Execution() {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const total = execution.steps.length;

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-48% 0px -48% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" aria-labelledby="process-heading" className="relative bg-paper section-y">
      <div className="shell">
        <div className="grid-12 gap-y-6 md:gap-y-12">
          {/* Pinned index */}
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Reveal>
                <Eyebrow index="14">{execution.eyebrow}</Eyebrow>
              </Reveal>
              <SplitLines id="process-heading" lines={[execution.heading]} className="mt-5 text-h1 md:mt-8" />

              <div className="mt-14 hidden items-end gap-6 lg:flex" aria-hidden>
                <div className="relative h-[clamp(6rem,11vw,10rem)] overflow-hidden font-display text-[clamp(6rem,11vw,10rem)] leading-none font-medium tracking-[-0.06em] text-ink">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.span
                      key={active}
                      className="block"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "-100%" }}
                      transition={{ duration: 0.8, ease: ease.expo }}
                    >
                      {String(active + 1).padStart(2, "0")}
                    </m.span>
                  </AnimatePresence>
                </div>
                <div className="pb-3">
                  <p className="index text-muted">/ {String(total).padStart(2, "0")}</p>
                  <div className="relative mt-4 h-px w-32 bg-line-strong">
                    <m.span className="absolute inset-0 origin-left bg-ink" style={{ scaleX: progress }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol ref={listRef} className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            {execution.steps.map((step, i) => {
              const on = active === i;
              return (
                <li
                  key={step.title}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="border-t border-line-strong last:border-b"
                >
                  <m.div
                    className="grid grid-cols-[2.25rem_1fr] py-5 md:grid-cols-[5rem_1fr] md:py-9 lg:min-h-[38vh] lg:py-12"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: ease.expo }}
                  >
                    <span className={cn("pt-1.5 index transition-colors duration-700 md:pt-2", on ? "text-ink" : "text-muted")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "transition-opacity duration-700 ease-(--ease-expo)",
                        on ? "lg:opacity-100" : "lg:opacity-35",
                      )}
                    >
                      <h3 className="font-display text-[1.375rem] leading-[1.15] font-medium tracking-[-0.025em] md:text-[clamp(1.75rem,3vw,3rem)] md:leading-[1.05] md:tracking-[-0.035em]">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 max-w-[40ch] text-body text-muted md:mt-5 md:text-lead">{step.text}</p>
                    </div>
                  </m.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
