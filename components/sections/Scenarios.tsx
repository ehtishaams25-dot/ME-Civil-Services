"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useRef, useState } from "react";
import { combined, type Trade } from "@/lib/content";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";

const LANE_Y: Record<Trade, number> = { plumbing: 0, finishing: 1 };
const HEIGHT = 340;
const LANE_TOP = 100;
const LANE_BOTTOM = 240;

/**
 * Project scenarios drawn as a two-lane coordination diagram: plumbing work on
 * one lane, surface and painting work on the other, one continuous path.
 */
export function Scenarios() {
  const [index, setIndex] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const scenario = combined.scenarios[index];
  const n = scenario.steps.length;
  const handover = scenario.steps.findIndex((s) => s.trade === "finishing");

  const onKeyDown = (e: React.KeyboardEvent) => {
    const count = combined.scenarios.length;
    let next = index;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % count;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setIndex(next);
    tabsRef.current[next]?.focus();
  };

  // Path through node centres (x in %, y in lane units)
  const points = scenario.steps.map((s, i) => ({ x: ((i + 0.5) / n) * 1000, y: LANE_Y[s.trade] }));
  const laneToPx = (lane: number) => (lane === 0 ? LANE_TOP : LANE_BOTTOM);
  let d = `M ${points[0].x} ${laneToPx(points[0].y)}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    if (a.y === b.y) {
      d += ` L ${b.x} ${laneToPx(b.y)}`;
    } else {
      const mid = (a.x + b.x) / 2;
      d += ` C ${mid} ${laneToPx(a.y)}, ${mid} ${laneToPx(b.y)}, ${b.x} ${laneToPx(b.y)}`;
    }
  }

  return (
    <div className="mt-8 pb-(--section-y) md:mt-[clamp(3.5rem,7vw,6rem)]">
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Project scenarios"
        className="-mx-(--shell-x) flex snap-x gap-2 overflow-x-auto scroll-px-(--shell-x) px-(--shell-x) pb-1 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:grid-cols-4 md:gap-0 md:overflow-visible md:border-t md:border-line-dark-strong md:px-0 md:pb-0"
        onKeyDown={onKeyDown}
      >
        {combined.scenarios.map((s, i) => {
          const selected = i === index;
          return (
            <button
              key={s.id}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${s.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setIndex(i)}
              className={cn(
                "group relative flex-none snap-start rounded-full border px-4 py-2.5 text-left transition-colors duration-500 md:flex-auto md:rounded-none md:border-0 md:px-0 md:py-6 md:pr-4",
                selected
                  ? "border-paper bg-paper text-ink md:bg-transparent md:text-paper"
                  : "border-line-dark-strong text-paper/75 hover:text-paper/80 md:text-paper/55",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute inset-x-0 -top-px h-px origin-left bg-brass transition-transform duration-700 ease-(--ease-expo) max-md:hidden",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span className={cn("block index max-md:hidden", selected ? "text-brass" : "text-paper/55")}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block font-display text-[0.9375rem] leading-tight font-medium tracking-[-0.015em] whitespace-nowrap md:mt-3 md:text-[clamp(1rem,1.5vw,1.375rem)] md:whitespace-normal">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Diagram */}
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${scenario.id}`}
        className="mt-5 border border-line-dark bg-ink-2/60 md:mt-14"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-line-dark px-4 py-3 md:px-8 md:py-4">
          <p className="eyebrow text-paper/60">
            <span className="text-brass">Scenario</span> — {scenario.title}
          </p>
          <p className="index text-paper/60">{String(n).padStart(2, "0")} stages · one service arrangement</p>
        </div>

        {/* Desktop: two-lane diagram */}
        <div className="hidden md:grid md:grid-cols-[11rem_1fr] lg:grid-cols-[14rem_1fr]">
          <div className="relative border-r border-line-dark">
            {(["plumbing", "finishing"] as Trade[]).map((lane) => (
              <div
                key={lane}
                className="absolute inset-x-0 flex -translate-y-1/2 items-center gap-3 px-8"
                style={{ top: lane === "plumbing" ? LANE_TOP : LANE_BOTTOM }}
              >
                <span
                  aria-hidden
                  className={cn("size-2 rounded-full", lane === "plumbing" ? "bg-[#6f98c4]" : "bg-brass")}
                />
                <span className="eyebrow leading-[1.45] text-paper/70">{combined.lanes[lane]}</span>
              </div>
            ))}
          </div>

          <div className="relative px-2" style={{ height: HEIGHT }}>
            {/* Lane guides */}
            <div
              aria-hidden
              className="absolute inset-x-0 border-t border-dashed border-line-dark"
              style={{ top: LANE_TOP }}
            />
            <div
              aria-hidden
              className="absolute inset-x-0 border-t border-dashed border-line-dark"
              style={{ top: LANE_BOTTOM }}
            />
            <div aria-hidden className="absolute inset-x-0 top-1/2 border-t border-line-dark" />

            <div className="absolute inset-0 mx-2">
              <AnimatePresence mode="wait">
                <m.div
                  key={scenario.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                >
                  <svg
                    viewBox={`0 0 1000 ${HEIGHT}`}
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden
                  >
                    <m.path
                      d={d}
                      fill="none"
                      stroke="#b79a63"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 1.6, ease: ease.expo, delay: 0.1 }}
                    />
                  </svg>

                  {scenario.steps.map((step, i) => {
                    const top = step.trade === "plumbing" ? LANE_TOP : LANE_BOTTOM;
                    return (
                      <m.div
                        key={step.label + i}
                        className="absolute flex w-[18%] -translate-x-1/2 flex-col items-center text-center"
                        style={{ left: `${((i + 0.5) / n) * 100}%`, top: top - 6 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: ease.expo, delay: 0.2 + (i / n) * 1.1 }}
                      >
                        <span
                          className={cn(
                            "size-3 rounded-full border-2 border-ink",
                            step.trade === "plumbing" ? "bg-[#6f98c4]" : "bg-brass",
                          )}
                        />
                        <span
                          className={cn(
                            "absolute flex w-full flex-col items-center",
                            step.trade === "plumbing" ? "bottom-6" : "top-6",
                          )}
                        >
                          <span className="index text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                          <span className="mt-1.5 font-display text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] text-paper lg:text-[1.0625rem]">
                            {step.label}
                          </span>
                        </span>
                      </m.div>
                    );
                  })}

                  {handover > 0 && (
                    <m.span
                      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink-2 px-3 py-1.5 eyebrow whitespace-nowrap text-paper/55"
                      style={{ left: `${(handover / n) * 100}%` }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                    >
                      Coordinated handover
                    </m.span>
                  )}
                </m.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: vertical sequence */}
        <AnimatePresence mode="wait">
          <m.ol
            key={scenario.id}
            className="relative px-4 py-5 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <span aria-hidden className="absolute top-8 bottom-8 left-[21px] w-px bg-line-dark-strong" />
            {scenario.steps.map((step, i) => (
              <li key={step.label + i}>
                {i === handover && handover > 0 ? (
                  <p className="relative my-1.5 ml-8 eyebrow text-paper/60">Coordinated handover</p>
                ) : null}
                <m.div
                  className="relative flex items-start gap-5 py-2"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: ease.expo, delay: 0.1 + i * 0.08 }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "relative mt-1.5 size-3 shrink-0 rounded-full border-2 border-ink-2",
                      step.trade === "plumbing" ? "bg-[#6f98c4]" : "bg-brass",
                    )}
                  />
                  <span>
                    <span className="index text-paper/60">
                      {String(i + 1).padStart(2, "0")} · {combined.lanes[step.trade]}
                    </span>
                    <span className="mt-0.5 block font-display text-[1.0625rem] font-medium tracking-[-0.01em]">
                      {step.label}
                    </span>
                  </span>
                </m.div>
              </li>
            ))}
          </m.ol>
        </AnimatePresence>
      </div>
    </div>
  );
}
