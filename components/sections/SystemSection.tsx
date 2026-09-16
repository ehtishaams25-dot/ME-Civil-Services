"use client";

import dynamic from "next/dynamic";
import { m, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { useActiveRender, useSceneSupport } from "@/components/three/support";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { systemStages } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { SystemDrawing } from "./SystemDrawing";

const SystemScene = dynamic(() => import("@/components/three/SystemScene"), { ssr: false });

export function SystemSection() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const support = useSceneSupport();
  const running = useActiveRender(stage, "200px");
  const near = useActiveRender(track, "100% 0px");
  const [mounted, setMounted] = useState(false);
  if (near && !mounted) setMounted(true);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const onReady = useCallback(() => setReady(true), []);

  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(systemStages.length - 1, Math.floor(v * systemStages.length)));
  });

  const interactive = !!support?.enabled && mounted;

  return (
    <section id="system" data-surface="dark" aria-label="System section" className="relative bg-ink text-paper">
      {/* Desktop / tablet: pinned, scroll-driven model */}
      <div ref={track} className="relative hidden md:block md:h-[420vh]">
        <div ref={stage} className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="shell grid-12 h-full items-center gap-y-10 border-t border-line-dark">
            <div className="col-span-3 lg:col-span-4">
              <Eyebrow index="13" tone="dark">
                System section
              </Eyebrow>
              <h2 className="mt-8 text-h2 md:text-[2.25rem] lg:text-[clamp(2.125rem,4.1vw,4.25rem)]">
                Planning to
                <br /> Finish.
              </h2>

              <ol className="mt-12 border-t border-line-dark">
                {systemStages.map((s, i) => {
                  const on = i === active;
                  return (
                    <li key={s.key} className="border-b border-line-dark">
                      <div className="grid grid-cols-[3rem_1fr] items-baseline py-4">
                        <span
                          className={cn("index transition-colors duration-500", on ? "text-brass" : "text-paper/50")}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[1.375rem] font-medium tracking-[-0.02em] transition-colors duration-500",
                            on ? "text-paper" : "text-paper/50",
                          )}
                        >
                          {s.title}
                        </span>
                      </div>
                      <div
                        className={cn(
                          "grid transition-[grid-template-rows,opacity] duration-700 ease-(--ease-expo)",
                          on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <p className="overflow-hidden pl-12 text-body text-paper/65">
                          <span className="block pb-5">{s.text}</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <div aria-hidden className="mt-8 flex items-center gap-4">
                <span className="index text-paper/60">Scroll</span>
                <span className="relative block h-px flex-1 bg-paper/15">
                  <m.span className="absolute inset-0 origin-left bg-brass" style={{ scaleX: bar }} />
                </span>
              </div>
            </div>

            <div className="relative col-span-5 h-[70svh] lg:col-span-8 lg:h-[78svh]">
              <div
                aria-hidden
                className={cn(
                  "absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-1000",
                  interactive && ready ? "opacity-0" : "opacity-100",
                )}
              >
                <SystemDrawing className="max-w-2xl" />
              </div>
              {interactive && (
                <m.div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent 0%, #000 6%), linear-gradient(to bottom, #000 88%, transparent 100%)",
                    maskComposite: "intersect",
                    WebkitMaskComposite: "source-in",
                  }}
                  initial={false}
                  animate={{ opacity: ready ? 1 : 0 }}
                  transition={{ duration: 1.4, ease: ease.expo }}
                >
                  <SystemScene
                    progress={scrollYProgress}
                    quality={support.quality}
                    running={running}
                    reducedMotion={support.reducedMotion}
                    onReady={onReady}
                  />
                </m.div>
              )}
              <p className="sr-only">
                Illustrative wall section showing a planned pipe route, installed supply and drainage lines, a defective
                pipe section being replaced, and the surface build-up of plaster, putty, primer and final coat.
              </p>
              <div className="pointer-events-none absolute top-0 right-0 flex items-center gap-3">
                <span className="index text-brass">Fig. 08</span>
                <span className="eyebrow text-paper/60">Wall section · illustrative</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: static drawing and stages */}
      <div className="shell border-t border-line-dark section-y md:hidden">
        <Eyebrow index="13" tone="dark">
          System section
        </Eyebrow>
        <h2 className="mt-5 text-h2">Planning to Finish.</h2>
        <div className="mt-6">
          <SystemDrawing />
        </div>
        <ol className="mt-6 border-t border-line-dark">
          {systemStages.map((s, i) => (
            <li key={s.key} className="grid grid-cols-[2.25rem_1fr] border-b border-line-dark py-3.5">
              <span className="pt-1 index text-brass">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-display text-[1.1875rem] font-medium tracking-[-0.02em]">{s.title}</p>
                <p className="mt-1 text-body text-paper/70">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
