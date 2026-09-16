import { Eyebrow } from "@/components/ui/Eyebrow";
import { ItemList } from "@/components/ui/ItemList";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { metalWood } from "@/lib/content";

export function MetalWood() {
  const { metal, wood } = metalWood;
  return (
    <section id="metal-wood" aria-labelledby="metal-heading" className="relative bg-paper pb-(--section-y)">
      <div className="shell">
        <div className="grid-12 gap-y-10 border-t border-line pt-(--section-y)">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <Eyebrow index="10">Enamel, Metal &amp; Wood</Eyebrow>
            </Reveal>
            <SplitLines id="metal-heading" lines={["Metal and Wooden", "Surface Painting"]} className="mt-5 text-h2 md:mt-8" />
          </div>
        </div>

        <div className="mt-8 grid-12 gap-y-12 md:mt-[clamp(3rem,6vw,5rem)] md:gap-y-20">
          {/* Metal */}
          <article className="col-span-4 md:col-span-8 lg:col-span-7" aria-labelledby="metal-title">
            <div className="grid gap-[var(--gutter)] md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <div>
                <Photo
                  image="railing"
                  sizes="(min-width: 1024px) 26vw, (min-width: 768px) 40vw, 100vw"
                  className="aspect-[16/10] md:aspect-[4/5]"
                  parallax={5}
                />
              </div>
              <div>
                <Reveal>
                  <div className="flex items-baseline justify-between border-b border-ink pb-3 max-md:mt-3 md:pb-4">
                    <h3 id="metal-title" className="text-h3">
                      {metal.title}
                    </h3>
                    <span className="index text-muted">{String(metal.items.length).padStart(2, "0")}</span>
                  </div>
                </Reveal>
                <ItemList items={metal.items} columns={1} mobileLimit={4} />
              </div>
            </div>

            <div className="mt-8 md:mt-12">
              <p className="eyebrow text-muted">Typical process</p>
              <Stagger as="ol" stagger={0.06} className="mt-3 grid grid-cols-2 gap-2 md:mt-5 md:flex md:flex-wrap md:items-center md:gap-x-0 md:gap-y-3">
                {metal.process.map((step, i) => (
                  <StaggerItem key={step} className="flex items-stretch md:items-center">
                    <span className="w-full border border-line-strong bg-white/70 px-3 py-2 text-small leading-snug md:w-auto">
                      <span className="mr-2 index text-muted max-md:block max-md:pb-1">{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </span>
                    {i < metal.process.length - 1 ? <span aria-hidden className="mx-2 h-px w-5 bg-brass max-md:hidden" /> : null}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </article>

          {/* Wood */}
          <article className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9" aria-labelledby="wood-title">
            <Photo
              image="woodDoor"
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3]"
              parallax={5}
            />
            <Reveal className="mt-5 md:mt-8">
              <div className="flex items-baseline justify-between border-b border-ink pb-3 md:pb-4">
                <h3 id="wood-title" className="text-h3">
                  {wood.title}
                </h3>
                <span className="index text-muted">{String(wood.items.length).padStart(2, "0")}</span>
              </div>
            </Reveal>
            <ItemList items={wood.items} columns={1} mobileLimit={4} />
          </article>
        </div>
      </div>
    </section>
  );
}
