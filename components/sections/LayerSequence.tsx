"use client";

import { m } from "motion/react";
import { ease } from "@/lib/motion";

const INK = "#0b1624";

/**
 * A wall section drawn eight times; each stage removes a defect or adds a
 * layer, so the sequence reads as a build-up rather than a list.
 */
function SectionCell({ stage }: { stage: number }) {
  const rough = stage < 4;
  const surfaceY = 96;
  const grow = (key: string, y: number, h: number, fill: string, stroke?: string) => (
    <m.rect
      key={key}
      x="8"
      y={y}
      width="104"
      height={h}
      fill={fill}
      stroke={stroke}
      strokeWidth="0.75"
      style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1, ease: ease.expo, delay: 0.25 }}
    />
  );

  return (
    <svg viewBox="0 34 120 116" className="h-auto w-full" aria-hidden>
      <defs>
        <pattern id={`hatch-${stage}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={INK} strokeOpacity="0.22" strokeWidth="1" />
        </pattern>
        <clipPath id={`clip-${stage}`}>
          <rect x="8" y="40" width="104" height="104" />
        </clipPath>
      </defs>

      {/* Substrate */}
      <g clipPath={`url(#clip-${stage})`}>
        {rough ? (
          <path
            d={`M8 ${surfaceY + 2} L18 ${surfaceY - 1} L27 ${surfaceY + 3} L39 ${surfaceY} L50 ${surfaceY + 2} L61 ${surfaceY - 2} L72 ${surfaceY + 2} L84 ${surfaceY} L95 ${surfaceY + 3} L112 ${surfaceY} V144 H8 Z`}
            fill={`url(#hatch-${stage})`}
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="0.9"
          />
        ) : (
          <path
            d={`M8 ${surfaceY} H112 V144 H8 Z`}
            fill={`url(#hatch-${stage})`}
            stroke={INK}
            strokeOpacity="0.55"
            strokeWidth="0.9"
          />
        )}
      </g>

      {/* Dust (removed at cleaning) */}
      {stage < 1 && (
        <g fill={INK} fillOpacity="0.45">
          {[14, 24, 33, 47, 58, 69, 80, 92, 103].map((x, i) => (
            <circle key={x} cx={x} cy={surfaceY - 5 - (i % 3) * 3} r="1" />
          ))}
        </g>
      )}

      {/* Loose, flaking material (removed at stage 3) */}
      {stage < 2 && (
        <g fill="none" stroke={INK} strokeOpacity="0.6" strokeWidth="0.9">
          <path d={`M20 ${surfaceY - 2} l10 -7 l4 3`} />
          <path d={`M78 ${surfaceY} l12 -8 l3 4`} />
        </g>
      )}

      {/* Crack, then filled */}
      {stage < 3 ? (
        <path
          d={`M56 ${surfaceY} l3 9 l-4 8 l4 10 l-2 9`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.75"
          strokeWidth="1"
        />
      ) : (
        <m.path
          d={`M56 ${surfaceY} l3 9 l-4 8 l4 10 l-2 9`}
          fill="none"
          stroke="#b79a63"
          strokeWidth="2.2"
          initial={stage === 3 ? { pathLength: 0 } : false}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: ease.expo, delay: 0.3 }}
        />
      )}

      {/* Inspection mark */}
      {stage === 0 && (
        <m.circle
          cx="57"
          cy={surfaceY + 16}
          r="17"
          fill="none"
          stroke="#b79a63"
          strokeWidth="1"
          strokeDasharray="3 3"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1, ease: ease.expo, delay: 0.3 }}
          style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}
        />
      )}

      {/* Prepared surface line */}
      {stage === 4 && (
        <m.line
          x1="8"
          x2="112"
          y1={surfaceY}
          y2={surfaceY}
          stroke="#b79a63"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 1.1, ease: ease.expo, delay: 0.3 }}
        />
      )}

      {/* Build-up: primer → putty / levelling → final coat */}
      {stage >= 5 &&
        (stage === 5 ? (
          grow("primer", surfaceY - 5, 5, "#ffffff", "rgb(11 22 36 / 0.35)")
        ) : (
          <rect
            x="8"
            y={surfaceY - 5}
            width="104"
            height="5"
            fill="#ffffff"
            stroke="rgb(11 22 36 / 0.35)"
            strokeWidth="0.75"
          />
        ))}
      {stage >= 6 &&
        (stage === 6 ? (
          grow("putty", surfaceY - 15, 10, "#e6e0d3", "rgb(11 22 36 / 0.35)")
        ) : (
          <rect
            x="8"
            y={surfaceY - 15}
            width="104"
            height="10"
            fill="#e6e0d3"
            stroke="rgb(11 22 36 / 0.35)"
            strokeWidth="0.75"
          />
        ))}
      {stage >= 7 && grow("coat", surfaceY - 22, 7, "#163a5f")}
    </svg>
  );
}

export function LayerSequence({ steps }: { steps: readonly string[] }) {
  return (
    <div className="-mx-(--shell-x) mt-6 snap-x snap-mandatory scroll-px-(--shell-x) [scrollbar-width:thin] overflow-x-auto px-(--shell-x) pb-4 md:mt-12 lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0">
      <ol className="grid w-max auto-cols-[9.5rem] grid-flow-col gap-x-3 md:auto-cols-[11.5rem] md:gap-x-[var(--gutter)] lg:w-full lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-8">
        {steps.map((step, i) => (
          <m.li
            key={step}
            className="snap-start border-t border-ink pt-3 md:pt-4"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: ease.expo, delay: i * 0.07 }}
          >
            <div className="flex items-center justify-between">
              <span className="index text-muted">{String(i + 1).padStart(2, "0")}</span>
              {i < steps.length - 1 ? (
                <span aria-hidden className="index text-muted">
                  →
                </span>
              ) : null}
            </div>
            <div className="mt-3 bg-white/60 ring-1 ring-line ring-inset">
              <SectionCell stage={i} />
            </div>
            <p className="mt-3 font-display text-[0.9375rem] leading-snug font-medium tracking-[-0.01em] md:mt-4">{step}</p>
          </m.li>
        ))}
      </ol>
    </div>
  );
}
