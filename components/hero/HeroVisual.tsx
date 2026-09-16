"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef, useState } from "react";
import { useActiveRender, useSceneSupport } from "@/components/three/support";
import type { PartId } from "@/components/three/PipeJunctionScene";
import { cn } from "@/lib/cn";
import { PipeJunctionDrawing } from "./PipeJunctionDrawing";

const PipeJunctionScene = dynamic(() => import("@/components/three/PipeJunctionScene"), { ssr: false });

const parts: { id: PartId; label: string; note: string }[] = [
  { id: "tee", label: "Tee", note: "Branch connection" },
  { id: "valve", label: "Gate valve", note: "Isolation and flow control" },
  { id: "union", label: "Union", note: "Serviceable joint" },
  { id: "elbow", label: "Elbow", note: "Change of direction" },
  { id: "flange", label: "Flange", note: "Bolted connection" },
];

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const support = useSceneSupport();
  const running = useActiveRender(ref);
  const [active, setActive] = useState<PartId | null>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  const current = parts.find((p) => p.id === active);

  return (
    <div ref={ref} className="relative h-full w-full">
      <p className="sr-only">
        Illustrative model of a plumbing pipe junction: a tee, gate valve, union coupling, elbows and a flanged outlet.
      </p>

      {/* Static drawing — placeholder and no-WebGL fallback */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-[8%] transition-opacity duration-[1400ms] ease-(--ease-expo)",
          ready ? "opacity-0" : "opacity-100",
        )}
      >
        <PipeJunctionDrawing />
      </div>

      {support?.enabled ? (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-[1800ms] ease-(--ease-expo)",
            ready ? "scale-100 opacity-100" : "scale-[0.98] opacity-0",
          )}
          style={{
            // Let pipes that run out of frame dissolve rather than hit a hard edge.
            maskImage:
              "linear-gradient(to right, transparent 0%, #000 20%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 90%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        >
          <PipeJunctionScene
            active={active}
            onHover={setActive}
            quality={support.quality}
            running={running}
            reducedMotion={support.reducedMotion}
            onReady={onReady}
          />
        </div>
      ) : null}

      {/* Drafting frame */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute top-0 left-0 h-3 w-px bg-brass/70" />
        <span className="absolute top-0 left-0 h-px w-3 bg-brass/70" />
        <span className="absolute right-0 bottom-0 h-3 w-px bg-brass/70" />
        <span className="absolute right-0 bottom-0 h-px w-3 bg-brass/70" />
      </div>

      <div className="pointer-events-none absolute top-0 left-5 flex items-center gap-3 pt-4 md:left-6">
        <span className="index text-brass">Fig. 01</span>
        <span className="eyebrow text-paper/55">Pipe junction assembly</span>
      </div>

      {/* Component legend — hover or focus to highlight a part in the model */}
      <div className="absolute inset-x-0 bottom-0 px-5 pb-5 text-right md:px-6">
        <p
          aria-live="polite"
          className={cn(
            "mb-4 h-5 text-small text-paper/70 transition-opacity duration-500",
            current ? "opacity-100" : "opacity-0",
          )}
        >
          {current ? `${current.label} — ${current.note}` : ""}
        </p>
        <ul className={cn("hidden flex-wrap justify-end gap-x-6 gap-y-2", support?.enabled && "sm:flex")}>
          {parts.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(p.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(p.id)}
                onBlur={() => setActive(null)}
                disabled={!ready}
                className={cn(
                  "group flex items-center gap-2 py-1 text-[0.75rem] tracking-[0.02em] transition-colors duration-500 disabled:cursor-default",
                  active === p.id ? "text-paper" : "text-paper/50 hover:text-paper",
                )}
              >
                <span className={cn("index", active === p.id ? "text-brass" : "text-paper/35")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "border-b pb-0.5 transition-colors duration-500",
                    active === p.id ? "border-brass" : "border-transparent",
                  )}
                >
                  {p.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
