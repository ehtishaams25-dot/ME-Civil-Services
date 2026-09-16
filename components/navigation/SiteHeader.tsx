"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/components/layout/Providers";
import { Phone } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { nav, site, telHref } from "@/lib/site";

export function SiteHeader() {
  const lenis = useLenis();
  const [overHero, setOverHero] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Solid / transparent + hide-on-scroll-down (hiding is desktop/tablet only).
  useEffect(() => {
    const hero = document.getElementById("top");
    let heroEnd = 600;
    let lastY = window.scrollY;
    let frame = 0;

    const measure = () => {
      heroEnd = hero ? hero.offsetHeight - 72 : 600;
    };
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setOverHero(y < heroEnd);
      const delta = y - lastY;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > heroEnd + 120);
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    measure();
    update();
    const ro = hero ? new ResizeObserver(measure) : null;
    if (hero) ro?.observe(hero);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
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

  // Menu: lock scroll, move focus in, trap Tab, close on Escape, restore focus.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const button = menuButton.current;
    const focusFirst = window.setTimeout(() => {
      menuRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const scope = [
        ...(headerRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
        ...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
      ].filter((el) => el.offsetParent !== null);
      if (!scope.length) return;
      const first = scope[0];
      const last = scope[scope.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(focusFirst);
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      button?.focus({ preventScroll: true });
    };
  }, [open, lenis]);

  // Close the menu if the viewport grows past the breakpoint where it exists.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 80rem)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const dark = overHero || open;

  return (
    <>
      <a
        href="#main"
        className="fixed top-3 left-3 z-[70] -translate-y-24 bg-paper px-4 py-3 eyebrow text-ink focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,color,border-color] duration-700 ease-(--ease-expo)",
          hidden && !open ? "translate-y-0 md:-translate-y-full" : "translate-y-0",
          dark
            ? "border-b border-transparent text-paper"
            : "border-b border-line bg-paper/90 text-ink backdrop-blur-md",
        )}
      >
        <div className="shell flex h-(--header-h) items-center justify-between gap-4 md:gap-8">
          <a href="#top" className="group relative -my-2 flex shrink-0 py-2" aria-label={`${site.name} — back to top`}>
            {/* Reverse and standard logos crossfade with the header ground. */}
            <span className="grid transition-transform duration-700 ease-(--ease-expo) group-hover:-translate-y-0.5">
              <Logo
                tone="dark"
                alt=""
                preload
                className={cn(
                  "[grid-area:1/1] h-8 transition-opacity duration-500 min-[360px]:h-9 md:h-10",
                  dark ? "opacity-100" : "opacity-0",
                )}
              />
              <Logo
                tone="light"
                alt=""
                className={cn(
                  "[grid-area:1/1] h-8 transition-opacity duration-500 min-[360px]:h-9 md:h-10",
                  dark ? "opacity-0" : "opacity-100",
                )}
              />
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

          <div className="flex items-center gap-1.5 sm:gap-3">
            {!open && (
              <a
                href="#contact"
                className={cn(
                  "hidden h-11 items-center px-5 text-[0.875rem] font-medium whitespace-nowrap transition-colors duration-500 sm:inline-flex",
                  dark ? "bg-paper text-ink hover:bg-white" : "bg-ink text-paper hover:bg-navy",
                )}
              >
                Request a Service
              </a>
            )}
            {/* Phones: a direct call action is always one tap away. */}
            <a
              href={telHref}
              aria-label={`Call ${site.phone.display}`}
              className={cn(
                "flex size-11 items-center justify-center rounded-full border transition-colors duration-500 sm:hidden",
                dark ? "border-paper/30 text-paper" : "border-ink/20 text-ink",
              )}
            >
              <Phone className="size-[1.125rem]" />
            </a>
            <button
              ref={menuButton}
              type="button"
              className="flex h-11 min-w-11 items-center justify-center gap-3 pl-1.5 min-[360px]:pl-3 xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="eyebrow max-[359px]:hidden">
                {open ? "Close" : "Menu"}
              </span>
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
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-surface="dark"
            className="fixed inset-0 z-40 flex flex-col bg-ink text-paper xl:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: ease.quart }}
          >
            <nav
              aria-label="Mobile"
              className="shell mt-[calc(var(--header-h)+1rem)] flex-1 overflow-y-auto overscroll-contain md:mt-[calc(var(--header-h)+2rem)]"
            >
              <ul className="border-t border-line-dark">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    className="border-b border-line-dark"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: ease.expo, delay: 0.15 + i * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-5 py-3.5 text-[1.75rem] leading-tight font-medium tracking-[-0.03em] md:py-4 md:text-[2rem]"
                    >
                      <span className="index text-brass">{String(i + 1).padStart(2, "0")}</span>
                      <span className="font-display">{item.label}</span>
                    </a>
                  </m.li>
                ))}
              </ul>
            </nav>
            <m.div
              className="shell grid gap-3 border-t border-line-dark pt-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:grid-cols-2 sm:gap-6 md:py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href={telHref}
                className="flex min-h-16 items-center justify-between gap-4 border border-line-dark-strong px-5 py-2 text-paper"
              >
                <span>
                  <span className="block eyebrow text-paper/60">Call</span>
                  <span className="mt-1 block font-display text-xl tracking-[-0.02em]">{site.phone.display}</span>
                </span>
                <Phone className="size-5 text-brass" />
              </a>
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
