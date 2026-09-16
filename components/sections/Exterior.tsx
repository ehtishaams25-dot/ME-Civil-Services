import { Eyebrow } from "@/components/ui/Eyebrow";
import { ItemList } from "@/components/ui/ItemList";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { exterior } from "@/lib/content";
import { LayerSequence } from "./LayerSequence";

export function Exterior() {
  return (
    <section id="exterior" aria-labelledby="exterior-heading" className="relative bg-paper pb-(--section-y)">
      <div className="shell">
        <div className="grid-12 gap-y-6 border-t border-line pt-(--section-y) md:gap-y-12">
          <div className="col-span-4 max-md:order-2 md:col-span-4 lg:col-span-4">
            <Photo
              image="exteriorRope"
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[16/10] md:aspect-[3/4]"
              parallax={6}
            />
            <p className="mt-4 index text-muted max-md:hidden">Fig. 07</p>
          </div>
          <div className="col-span-4 max-md:hidden md:col-span-4 lg:col-span-3 lg:mt-[40%]">
            <Photo
              image="facadeUp"
              sizes="(min-width: 1024px) 24vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5]"
              parallax={10}
            />
          </div>
          <div className="col-span-4 max-md:order-1 md:col-span-8 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <Reveal>
              <Eyebrow index="07">{exterior.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="exterior-heading" lines={exterior.heading} className="mt-5 text-h2 md:mt-8" />
            <Reveal delay={0.1}>
              <div className="mt-6 flex items-baseline justify-between border-b border-ink pb-3 md:mt-12 md:pb-4">
                <h3 className="text-h4">External surfaces</h3>
                <span className="index text-muted">{String(exterior.surfaces.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <ItemList items={exterior.surfaces} columns={1} mobileLimit={4} />
          </div>
        </div>

        <div className="mt-12 md:mt-[clamp(5rem,10vw,9rem)]">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <Reveal>
              <p className="eyebrow text-muted">Exterior painting process</p>
              <h3 className="mt-3 max-w-[26ch] text-h3 md:mt-5">Each coat depends on the one beneath it.</h3>
            </Reveal>
            <p className="index text-muted">
              Section build-up · 08 stages<span className="lg:hidden"> · swipe</span>
            </p>
          </div>
          <LayerSequence steps={exterior.process} />
        </div>
      </div>
    </section>
  );
}
