import { Eyebrow } from "@/components/ui/Eyebrow";
import { ItemList } from "@/components/ui/ItemList";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { repair } from "@/lib/content";
import { RepairMethod } from "./RepairMethod";

export function Repair() {
  return (
    <section
      id="repair"
      data-surface="dark"
      aria-labelledby="repair-heading"
      className="relative overflow-hidden bg-ink section-y text-paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden guides opacity-40 md:block" />
      <div className="relative shell">
        <div className="grid-12 gap-y-4 md:gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Reveal>
              <Eyebrow index="05" tone="dark">
                {repair.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitLines id="repair-heading" lines={repair.heading} className="mt-5 text-h1 md:mt-8" />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.1}>
              <p className="text-lead text-paper/75">{repair.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid-12 gap-y-8 md:mt-[clamp(3.5rem,7vw,6rem)] md:gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Photo
              image="leakDrop"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[16/10] md:aspect-[4/3] lg:aspect-[5/6]"
              parallax={6}
              tone="deep"
            />
            <p className="mt-4 index text-muted-dark max-md:hidden">Fig. 05</p>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-paper/60 pb-3 md:pb-4">
                <h3 className="text-h3">Leakage and repair works</h3>
                <span className="index text-muted-dark">{String(repair.issues.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <ItemList items={repair.issues} columns={2} tone="dark" mobileLimit={5} />
          </div>
        </div>

        <RepairMethod steps={repair.method} />
      </div>
    </section>
  );
}
