import { Eyebrow } from "@/components/ui/Eyebrow";
import { ItemList } from "@/components/ui/ItemList";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { waterSystems } from "@/lib/content";

export function WaterSystems() {
  return (
    <section id="water-systems" aria-labelledby="water-heading" className="relative bg-paper-2 section-y">
      <div className="shell">
        <div className="grid-12 gap-y-4 md:gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <Eyebrow index="04">{waterSystems.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="water-heading" lines={waterSystems.heading} className="mt-5 text-h2 md:mt-8" />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:self-end">
            <Reveal delay={0.1}>
              <p className="text-lead text-muted">
                Overhead and underground tank connections, pump installation and the pipework that links them to the
                building — installed, replaced and maintained.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-8 grid-12 gap-y-8 md:mt-[clamp(3.5rem,7vw,6rem)] md:gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Photo
                image="industrialPipes"
                sizes="(min-width: 1024px) 32vw, 100vw"
                className="aspect-[16/9] md:aspect-[16/10] lg:aspect-[3/4]"
                parallax={6}
              />
              <p className="mt-4 index text-muted max-md:hidden">Fig. 04</p>
            </div>
          </div>

          <div className="col-span-4 grid gap-8 md:col-span-8 md:grid-cols-2 md:gap-[calc(var(--gutter)*2)] lg:col-span-7 lg:col-start-6">
            {waterSystems.columns.map((col, i) => (
              <div key={col.title}>
                <Reveal delay={i * 0.08}>
                  <div className="flex items-baseline justify-between border-b border-ink pb-3 md:pb-4">
                    <h3 className="text-h3">{col.title}</h3>
                    <span className="index text-muted">{String(col.items.length).padStart(2, "0")}</span>
                  </div>
                </Reveal>
                <ItemList items={col.items} columns={1} mobileLimit={4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
