import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { surfacePrep } from "@/lib/content";

export function SurfacePrep() {
  return (
    <section id="preparation" aria-labelledby="prep-heading" className="relative bg-paper-2 section-y">
      <div className="shell">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <Eyebrow index="08">{surfacePrep.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="prep-heading" lines={surfacePrep.heading} className="mt-8 text-h1" />
          </div>
          <div className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10">
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
          className="mt-[clamp(3.5rem,7vw,6rem)] grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4"
        >
          {surfacePrep.items.map((item, i) => (
            <StaggerItem
              key={item}
              className="flex min-h-[7.5rem] flex-col justify-between gap-6 border-b border-line-strong py-5 sm:pr-6 lg:min-h-[9rem]"
            >
              <span className="index text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-[20ch] text-h4">{item}</span>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Note */}
        <div className="mt-[clamp(3.5rem,7vw,6rem)] grid-12">
          <Reveal className="col-span-4 md:col-span-8 lg:col-span-8 lg:col-start-3">
            <figure className="relative border-l border-brass pl-6 md:pl-10">
              <p className="eyebrow text-muted">Before final painting</p>
              <blockquote className="mt-6 font-display text-[clamp(1.375rem,2.4vw,2.25rem)] leading-[1.25] font-normal tracking-[-0.02em] text-ink">
                {surfacePrep.statement}
              </blockquote>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
