import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { surfacePrep } from "@/lib/content";

export function SurfacePrep() {
  return (
    <section id="preparation" aria-labelledby="prep-heading" className="relative bg-paper-2 section-y">
      <div className="shell">
        <div className="grid-12 gap-y-6 md:gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <Eyebrow index="08">{surfacePrep.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="prep-heading" lines={surfacePrep.heading} className="mt-5 text-h1 md:mt-8" />
          </div>
          <div className="col-span-4 max-md:hidden md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10">
            <Photo
              image="trowelConcrete"
              sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw"
              className="aspect-square"
              parallax={4}
            />
          </div>
        </div>

        <Stagger
          as="ol"
          stagger={0.04}
          className="mt-8 grid grid-cols-2 gap-x-4 border-t border-ink md:mt-[clamp(3.5rem,7vw,6rem)] md:gap-x-0 lg:grid-cols-4"
        >
          {surfacePrep.items.map((item, i) => (
            <StaggerItem
              key={item}
              className="flex flex-col justify-between gap-2 border-b border-line-strong py-3.5 pr-1 md:min-h-[7.5rem] md:gap-6 md:py-5 md:pr-6 lg:min-h-[9rem]"
            >
              <span className="index text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-[20ch] font-display text-[1rem] leading-[1.3] font-medium tracking-[-0.01em] md:text-h4">{item}</span>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Note */}
        <div className="mt-8 grid-12 md:mt-[clamp(3.5rem,7vw,6rem)]">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <figure className="relative border-l border-brass pl-5 md:pl-10">
              <p className="eyebrow text-muted">Before final painting</p>
              <blockquote className="mt-3 font-display text-[1.1875rem] leading-[1.35] md:mt-6 md:text-[clamp(1.375rem,2.4vw,2.25rem)] md:leading-[1.25] font-normal tracking-[-0.02em] text-ink">
                {surfacePrep.statement}
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
