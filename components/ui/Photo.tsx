"use client";

import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { media, type MediaKey } from "@/lib/media";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { loaderFor } from "@/lib/image-loader";
import { usePrefersReducedMotion } from "@/lib/use-reduced-motion";

type PhotoProps = {
  image: MediaKey;
  sizes: string;
  className?: string;
  imgClassName?: string;
  /** Vertical parallax travel as a percentage of the frame. 0 disables. */
  parallax?: number;
  reveal?: boolean;
  preload?: boolean;
  /** Tone the image slightly toward the navy palette. */
  tone?: "none" | "soft" | "deep";
  children?: React.ReactNode;
};

/**
 * Editorial image frame: clip reveal on entry, slow settle of scale, and
 * scroll parallax. The in-view trigger lives on the unclipped wrapper —
 * an element hidden by its own clip-path never reports as intersecting.
 */
export function Photo({
  image,
  sizes,
  className,
  imgClassName,
  parallax = 6,
  reveal = true,
  preload = false,
  tone = "none",
  children,
}: PhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const item = media[image];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const moving = parallax > 0 && !reduce;

  return (
    <m.div
      ref={ref}
      className={cn("relative", className)}
      initial={reveal ? "hidden" : false}
      whileInView={reveal ? "show" : undefined}
      viewport={{ once: true, amount: 0.12 }}
    >
      <m.div
        className="absolute inset-0 overflow-hidden bg-ink/10"
        variants={{
          hidden: { clipPath: "inset(0% 0% 100% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: reduce ? 0 : 1.4, ease: ease.expo } },
        }}
      >
        <m.div
          className="absolute inset-x-0"
          style={{
            top: moving ? `-${parallax + 1}%` : 0,
            bottom: moving ? `-${parallax + 1}%` : 0,
            y: moving ? y : 0,
          }}
        >
          <m.div
            className="absolute inset-0"
            variants={{
              hidden: { scale: 1.14 },
              show: { scale: 1, transition: { duration: reduce ? 0 : 1.8, ease: ease.expo } },
            }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes={sizes}
              preload={preload}
              loader={loaderFor(item.src)}
              className={cn("object-cover", imgClassName)}
              style={{ objectPosition: item.focus ?? "50% 50%" }}
            />
          </m.div>
        </m.div>
        {tone !== "none" && (
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 mix-blend-multiply",
              tone === "soft" ? "bg-[#163a5f]/10" : "bg-[#0b1624]/30",
            )}
          />
        )}
      </m.div>
      {children}
    </m.div>
  );
}
