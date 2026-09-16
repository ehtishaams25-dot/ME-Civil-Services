import { getImageProps } from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowDown, Phone } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { hero } from "@/lib/content";
import { site, telHref } from "@/lib/site";
import heroStill from "@/public/images/hero-junction.webp";
import { HeroVisual } from "./HeroVisual";

/** 1×1 transparent GIF: wider screens skip the still entirely and use the live model. */
const EMPTY_SOURCE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function MobileStill() {
  const { props } = getImageProps({
    src: heroStill,
    alt: "",
    sizes: "92vw",
    fetchPriority: "high",
    loading: "eager",
  });
  return (
    <picture>
      <source media="(min-width: 48rem)" srcSet={EMPTY_SOURCE} />
      <img
        {...props}
        alt=""
        className="hero-float absolute inset-0 h-full w-full object-contain object-center"
        style={{
          maskImage: "linear-gradient(to bottom, #000 80%, transparent 100%)",
        }}
      />
    </picture>
  );
}

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

      <div className="relative shell flex flex-col pt-[calc(var(--header-h)+1.75rem)] md:min-h-[100svh] md:pt-[calc(var(--header-h)+2.5rem)] lg:pt-[calc(var(--header-h)+3.5rem)]">
        <div className="grid-12 flex-1 items-stretch">
          {/* Copy */}
          <div className="col-span-4 flex flex-col justify-between gap-7 md:col-span-8 md:gap-12 lg:col-span-7 lg:pb-14">
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
              <div className="mt-6 grid gap-7 md:mt-12 md:grid-cols-[minmax(0,26rem)_auto] md:items-end md:gap-14 lg:grid-cols-1 lg:items-start xl:grid-cols-[minmax(0,26rem)_auto] xl:items-end">
                <Reveal delay={0.75} y={16}>
                  <p className="text-lead text-paper/72">{hero.support}</p>
                </Reveal>
                <Reveal
                  delay={0.9}
                  y={16}
                  className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:items-center md:gap-x-8 md:gap-y-5"
                >
                  <ButtonLink href="#contact" variant="solid-light" className="w-full md:w-auto md:min-w-56">
                    Request a Service
                  </ButtonLink>
                  {/* Phones: calling is the primary action, so it sits beside the request button. */}
                  <ButtonLink
                    href={telHref}
                    variant="outline-light"
                    className="w-full md:hidden"
                    icon={<Phone className="size-[1.125rem]" />}
                  >
                    Call {site.phone.display}
                  </ButtonLink>
                  <a
                    href="#services"
                    className="hidden text-[0.9375rem] font-medium text-paper/90 link-line-reverse md:inline"
                  >
                    Explore Services
                  </a>
                </Reveal>
              </div>
            </div>
          </div>

          {/* Model */}
          <div className="relative col-span-4 mt-8 h-[min(80vw,21rem)] md:col-span-8 md:mt-14 md:h-[min(92vw,30rem)] lg:col-span-5 lg:mt-0 lg:h-auto">
            <div className="absolute inset-0 lg:-right-[calc(var(--shell-x)*0.6)] lg:bottom-14 lg:-left-[18%]">
              <HeroVisual mobileStill={<MobileStill />} />
            </div>
          </div>
        </div>

        {/* Base rail */}
        <Reveal delay={1.1} y={0} className="relative mt-6 border-t border-line-dark md:mt-10 lg:mt-0">
          <div className="flex items-center justify-between gap-6 py-4 md:py-5">
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
