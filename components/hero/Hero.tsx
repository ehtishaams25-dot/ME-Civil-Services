import { ButtonLink } from "@/components/ui/Button";
import { ArrowDown } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { hero } from "@/lib/content";
import { site } from "@/lib/site";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      id="top"
      data-surface="dark"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-ink text-paper"
    >
      {/* Drafting guides + a single soft backlight for the model */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden guides opacity-40 md:block" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[62%]"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 58% 48%, rgb(36 91 143 / 0.22), transparent 70%)",
        }}
      />

      <div className="relative shell flex min-h-[100svh] flex-col pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+3.5rem)]">
        <div className="grid-12 flex-1 items-stretch">
          {/* Copy */}
          <div className="col-span-4 flex flex-col justify-between gap-12 md:col-span-8 lg:col-span-7 lg:pb-14">
            <Reveal delay={0.1} y={12}>
              <p className="flex flex-wrap items-center gap-x-4 gap-y-2 eyebrow text-paper/70">
                <span className="text-brass">{hero.city}</span>
                <span aria-hidden className="h-px w-8 bg-paper/25" />
                <span>{hero.disciplines.join(" • ")}</span>
              </p>
            </Reveal>

            <div>
              <SplitLines
                as="h1"
                id="hero-heading"
                immediate
                delay={0.25}
                lines={hero.lines}
                className="text-display"
              />
              <div className="mt-10 grid gap-10 md:mt-12 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:gap-14 lg:grid-cols-1 lg:items-start xl:grid-cols-[minmax(0,26rem)_auto] xl:items-end">
                <Reveal delay={0.75} y={16}>
                  <p className="text-lead text-paper/72">{hero.support}</p>
                </Reveal>
                <Reveal delay={0.9} y={16} className="flex flex-wrap items-center gap-x-8 gap-y-5">
                  <ButtonLink href="#contact" variant="solid-light" className="min-w-56">
                    Request a Service
                  </ButtonLink>
                  <a href="#services" className="link-line-reverse text-[0.9375rem] font-medium text-paper/90">
                    Explore Services
                  </a>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Model */}
          <div className="relative col-span-4 mt-14 h-[min(92vw,30rem)] md:col-span-8 lg:col-span-5 lg:mt-0 lg:h-auto">
            <div className="absolute inset-0 lg:-right-[calc(var(--shell-x)*0.6)] lg:bottom-14 lg:-left-[18%]">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* Base rail */}
        <Reveal delay={1.1} y={0} className="relative mt-10 border-t border-line-dark lg:mt-0">
          <div className="flex items-center justify-between gap-6 py-5">
            <p className="eyebrow text-paper/60">{site.positioning}</p>
            <a href="#about" className="group hidden items-center gap-3 text-paper/60 sm:flex">
              <span className="eyebrow">Scroll</span>
              <span className="relative block h-5 w-5 overflow-hidden">
                <ArrowDown className="absolute inset-0 size-5 transition-transform duration-700 ease-(--ease-expo) group-hover:translate-y-full" />
                <ArrowDown className="absolute inset-0 size-5 -translate-y-full transition-transform duration-700 ease-(--ease-expo) group-hover:translate-y-0" />
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
