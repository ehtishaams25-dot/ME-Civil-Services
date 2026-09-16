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
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow index="06">{painting.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="painting-heading" lines={painting.heading} className="mt-8 text-h1" />
            <div className="mt-10 grid max-w-[40ch] gap-5">
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
              className="aspect-[4/5] lg:aspect-[5/6]"
              parallax={7}
            />
            <div className="mt-4 flex justify-between">
              <p className="index text-muted">Fig. 06</p>
              <p className="eyebrow text-muted">Interior painting</p>
            </div>
          </div>
        </div>

        {/* Interior spaces + finishes schedule */}
        <div className="mt-[clamp(4.5rem,9vw,8rem)] grid-12 gap-y-16">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-ink pb-4">
                <h3 className="text-h3">Interior Painting</h3>
                <span className="index text-muted">{String(painting.interiorSpaces.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <ItemList items={painting.interiorSpaces} columns={2} />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-ink pb-4">
                <h3 className="text-h3">Interior Finishes</h3>
                <span className="index text-muted">{String(painting.interiorFinishes.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <Stagger stagger={0.05} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
              {painting.interiorFinishes.map((f, i) => (
                <StaggerItem
                  key={f.name}
                  className="group flex items-center gap-4 border-b border-line py-3 sm:odd:pr-4 lg:odd:pr-0"
                >
                  <span className="w-6 shrink-0 index text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    aria-hidden
                    data-swatch={f.swatch}
                    className="swatch h-7 w-12 shrink-0 ring-1 ring-ink/10 transition-[width] duration-700 ease-(--ease-expo) ring-inset group-hover:w-20"
                  />
                  <span className="text-body">{f.name}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </div>
    </section>
  );
}
