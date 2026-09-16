"use client";

import Image from "next/image";
import { AnimatePresence, m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { servicesIndex } from "@/lib/content";
import { media } from "@/lib/media";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/cn";
import { loaderFor } from "@/lib/image-loader";

export function ServicesIndex() {
  const listRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- media query is client-only
    setFinePointer(mq.matches);
    const onChange = () => setFinePointer(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onMove = (e: React.PointerEvent) => {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative border-t border-line bg-paper section-y"
    >
      <div className="shell">
        <div className="grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <Reveal>
                <Eyebrow index="02">Services</Eyebrow>
              </Reveal>
              <SplitLines id="services-heading" lines={["What We Do"]} className="mt-8 text-h2" />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-[34ch] text-body text-muted">
                  Complete plumbing and painting solutions under one roof — new installations and alterations, repair
                  and leakage rectification, maintenance and finishing works.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <a href="#categories" className="mt-8 inline-block link-line-reverse text-[0.9375rem] font-medium">
                  View all service categories
                </a>
              </Reveal>
            </div>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <div
              ref={listRef}
              onPointerMove={finePointer ? onMove : undefined}
              onPointerLeave={() => setHovered(null)}
              className="relative"
            >
              <ul className="border-b border-line-strong">
                {servicesIndex.map((item, i) => (
                  <m.li
                    key={item.n}
                    className="border-t border-line-strong"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 1, ease: ease.expo, delay: i * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onPointerEnter={() => setHovered(i)}
                      onFocus={() => setHovered(null)}
                      className={cn(
                        "group grid grid-cols-[2.25rem_1fr_auto] items-start gap-x-4 py-7 transition-colors duration-500 md:grid-cols-[4rem_minmax(0,1.15fr)_minmax(0,0.85fr)_auto] md:items-center md:py-9",
                        hovered !== null && hovered !== i ? "md:text-text/35" : "text-text",
                      )}
                    >
                      <span className="pt-2 index text-muted md:pt-0">{item.n}</span>
                      <span className="font-display text-[clamp(1.75rem,3.2vw,3.25rem)] leading-[1.05] font-medium tracking-[-0.035em] transition-transform duration-700 ease-(--ease-expo) group-hover:translate-x-2">
                        {item.title}
                      </span>
                      <span
                        className={cn(
                          "col-start-2 mt-3 max-w-[38ch] text-body transition-colors duration-500 md:col-start-auto md:mt-0",
                          hovered !== null && hovered !== i ? "md:text-muted/50" : "text-muted",
                        )}
                      >
                        {item.description}
                      </span>
                      <span className="col-start-3 row-start-1 flex size-11 items-center justify-center rounded-full border border-line-strong transition-[background-color,border-color,color] duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:col-start-auto md:row-start-auto">
                        <ArrowUpRight className="size-4 transition-transform duration-500 ease-(--ease-expo) group-hover:rotate-45" />
                      </span>
                    </a>
                  </m.li>
                ))}
              </ul>

              {/* Cursor-following preview */}
              {finePointer && (
                <m.div
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
                  style={{ x: sx, y: sy }}
                >
                  <AnimatePresence>
                    {hovered !== null && (
                      <m.div
                        key="preview"
                        className="relative -mt-[9rem] -ml-[7rem] h-[18rem] w-[14rem] overflow-hidden bg-ink"
                        initial={{ opacity: 0, scale: 0.9, clipPath: "inset(12% 12% 12% 12%)" }}
                        animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ opacity: 0, scale: 0.94, clipPath: "inset(10% 10% 10% 10%)" }}
                        transition={{ duration: 0.6, ease: ease.expo }}
                      >
                        {servicesIndex.map((item, i) => {
                          const img = media[item.image];
                          return (
                            <m.div
                              key={item.n}
                              className="absolute inset-0"
                              animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 1.08 }}
                              transition={{ duration: 0.7, ease: ease.expo }}
                            >
                              <Image
                                src={img.src}
                                alt=""
                                fill
                                sizes="224px"
                                loader={loaderFor(img.src)}
                                className="object-cover"
                                style={{ objectPosition: img.focus }}
                              />
                            </m.div>
                          );
                        })}
                      </m.div>
                    )}
                  </AnimatePresence>
                </m.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
