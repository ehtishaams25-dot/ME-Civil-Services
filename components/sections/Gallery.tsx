"use client";

import { m, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/ui/Photo";
import type { MediaKey } from "@/lib/media";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type Plate = { image: MediaKey; caption: string };

/** Magazine layout: asymmetric plates on the 12-column grid. */
const layout = [
  {
    frame: "col-span-4 md:col-span-5 lg:col-span-7 lg:row-span-2",
    ratio: "aspect-[4/5] lg:aspect-auto lg:h-[calc(100%-2.25rem)]",
    depth: 10,
  },
  { frame: "col-span-4 md:col-span-3 lg:col-span-5", ratio: "aspect-[4/5] md:aspect-[4/3]", depth: -14 },
  { frame: "col-span-2 md:col-span-4 lg:col-span-2", ratio: "aspect-[4/5] md:aspect-[3/4]", depth: 18 },
  { frame: "col-span-2 md:col-span-4 lg:col-span-3", ratio: "aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5]", depth: -8 },
  { frame: "col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-4", ratio: "aspect-[4/5] md:aspect-[16/9]", depth: 12 },
];

function Drift({
  x,
  y,
  depth,
  children,
  className,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  depth: number;
  children: React.ReactNode;
  className?: string;
}) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <m.div className={className} style={{ x: tx, y: ty }}>
      {children}
    </m.div>
  );
}

export function Gallery({ plates }: { plates: readonly Plate[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 60, damping: 20 });
  const y = useSpring(py, { stiffness: 60, damping: 20 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2 * 0.6);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2 * 0.6);
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="mt-8 grid-12 gap-y-[var(--gutter)] max-md:rail md:mt-[clamp(3.5rem,7vw,6rem)] lg:grid-rows-[auto_auto_auto]"
    >
      {plates.map((plate, i) => {
        const l = layout[i % layout.length];
        return (
          <figure key={plate.image} className={cn("relative max-md:w-[72vw] max-md:max-w-[20rem]", l.frame)}>
            <div className={cn("relative overflow-hidden", l.ratio)}>
              <Drift x={x} y={y} depth={l.depth} className="absolute -inset-6">
                <Photo
                  image={plate.image}
                  sizes="(min-width: 1024px) 50vw, (min-width: 768px) 100vw, 72vw"
                  className="h-full w-full"
                  parallax={0}
                />
              </Drift>
            </div>
            <figcaption className="mt-2 flex items-baseline justify-between gap-4 md:mt-3">
              <span className="text-small text-text">{plate.caption}</span>
              <span className="index text-muted">Pl. {String(i + 1).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
