import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { decorative } from "@/lib/content";
import { Gallery } from "./Gallery";

export function Decorative() {
  return (
    <section id="finishes" aria-labelledby="finishes-heading" className="relative bg-paper section-y">
      <div className="shell">
        <div className="grid-12 gap-y-5 md:gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Reveal>
              <Eyebrow index="09">{decorative.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="finishes-heading" lines={decorative.heading} className="mt-5 text-h2 md:mt-8 md:text-display" />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.1}>
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-lead text-text" aria-label="Decorative finishes">
                {decorative.services.map((s, i) => (
                  <li key={s} className="flex items-center gap-2">
                    <span>{s}</span>
                    {i < decorative.services.length - 1 ? (
                      <span aria-hidden className="text-brass">
                        /
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <Gallery plates={decorative.plates} />
      </div>
    </section>
  );
}
