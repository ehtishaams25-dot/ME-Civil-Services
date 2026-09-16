"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/layout/Providers";
import { Mark } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { nav, site, telHref } from "@/lib/site";

export function SiteHeader() {
  const lenis = useLenis();
  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);

  // Solid / transparent + hide-on-scroll-down
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const hero = document.getElementById("top");
      const heroEnd = hero ? hero.offsetHeight - 72 : 600;
      setOverHero(y < heroEnd);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > heroEnd + 120);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Selected state for the section in view
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menu: lock scroll, close on Escape
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const light = overHero && !open;

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-24 bg-paper px-4 py-3 eyebrow text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-700 ease-(--ease-expo)",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          light
            ? "border-b border-transparent text-paper"
            : open
              ? "border-b border-transparent text-paper"
              : "border-b border-line bg-paper/88 text-ink backdrop-blur-md",
        )}
      >
        <div className="shell flex h-(--header-h) items-center justify-between gap-8">
          <a href="#top" className="group flex items-center gap-3" aria-label={`${site.name} — back to top`}>
            <Mark className="size-7 transition-transform duration-700 ease-(--ease-expo) group-hover:-translate-y-0.5" />
            <span className="font-display text-[0.8125rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase">
              M.E. Civil Services
            </span>
          </a>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={active === item.href ? "true" : undefined}
                    className="relative flex items-center gap-2 py-2 text-[0.875rem] tracking-[-0.005em]"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-1 rounded-full bg-brass transition-opacity duration-500",
                        active === item.href ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="link-line">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {!open && (
              <a
                href="#contact"
                className={cn(
                  "hidden h-11 items-center px-5 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-500 sm:inline-flex",
                  light ? "bg-paper text-ink hover:bg-white" : "bg-ink text-paper hover:bg-navy",
                )}
              >
                Request a Service
              </a>
            )}
            <button
              type="button"
              className="flex h-11 items-center gap-3 pl-3 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="eyebrow">{open ? "Close" : "Menu"}</span>
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-all duration-500 ease-(--ease-expo)",
                    open ? "top-1.5 rotate-45" : "top-0.5",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-current transition-all duration-500 ease-(--ease-expo)",
                    open ? "top-1.5 -rotate-45" : "top-2.5",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-surface="dark"
            className="fixed inset-0 z-40 flex flex-col bg-ink text-paper xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: ease.quart }}
          >
            <nav aria-label="Mobile" className="shell mt-[calc(var(--header-h)+2rem)] flex-1 overflow-y-auto">
              <ul className="border-t border-line-dark">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    className="border-b border-line-dark"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: ease.expo, delay: 0.2 + i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-5 py-4 text-[2rem] leading-tight font-medium tracking-[-0.03em]"
                    >
                      <span className="index text-brass">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display">{item.label}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <m.div
              className="shell grid gap-6 border-t border-line-dark py-8 sm:grid-cols-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div>
                <p className="eyebrow text-muted-dark">Call</p>
                <a href={telHref} className="mt-3 block font-display text-2xl tracking-[-0.02em]">
                  {site.phone.display}
                </a>
              </div>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-center bg-paper text-[0.9375rem] font-medium text-ink"
              >
                Request a Service
              </a>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
