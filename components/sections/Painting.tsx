import { Eyebrow } from "@/components/ui/Eyebrow";
import { ItemList } from "@/components/ui/ItemList";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { painting } from "@/lib/content";

export function Painting() {
  return (
    <section id="painting" aria-labelledby="painting-heading" className="relative bg-paper section-y">
      <div className="shell">
        {/* Opener */}
        <div className="grid-12 gap-y-6 md:gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow index="06">{painting.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="painting-heading" lines={painting.heading} className="mt-5 text-h1 md:mt-8" />
            <div className="mt-4 grid max-w-[40ch] gap-3 md:mt-10 md:gap-5">
              {painting.body.map((p, i) => (
                <Reveal key={i} delay={0.08 * (i + 1)}>
                  <p className={i === 0 ? "text-lead text-text" : "text-body text-muted"}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
            <Photo
              image="painterLadder"
              sizes="(min-width: 1024px) 48vw, 100vw"
              className="aspect-[16/10] md:aspect-[4/5] lg:aspect-[5/6]"
              parallax={7}
            />
            <div className="mt-4 flex justify-between max-md:hidden">
              <p className="index text-muted">Fig. 06</p>
              <p className="eyebrow text-muted">Interior painting</p>
            </div>
          </div>
        </div>

        {/* Interior spaces + finishes schedule */}
        <div className="mt-10 grid-12 gap-y-10 md:mt-[clamp(4.5rem,9vw,8rem)] md:gap-y-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-ink pb-3 md:pb-4">
                <h3 className="text-h3">Interior Painting</h3>
                <span className="index text-muted">{String(painting.interiorSpaces.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <ItemList items={painting.interiorSpaces} columns={2} mobileLimit={5} />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-ink pb-3 md:pb-4">
                <h3 className="text-h3">Interior Finishes</h3>
                <span className="index text-muted">{String(painting.interiorFinishes.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <Stagger stagger={0.05} className="grid grid-cols-2 gap-x-4 md:gap-x-0 lg:grid-cols-1">
              {painting.interiorFinishes.map((f, i) => (
                <StaggerItem
                  key={f.name}
                  className="group flex items-center gap-2.5 border-b border-line py-2.5 md:gap-4 md:py-3 md:odd:pr-4 lg:odd:pr-0"
                >
                  <span className="w-6 shrink-0 index text-muted max-md:hidden">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden
                    data-swatch={f.swatch}
                    className="swatch h-6 w-8 shrink-0 md:h-7 md:w-12 ring-1 ring-ink/10 transition-[width] duration-700 ease-(--ease-expo) ring-inset group-hover:w-20"
                  />
                  <span className="text-[0.875rem] leading-snug md:text-body">{f.name}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
