import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { combined } from "@/lib/content";
import { Scenarios } from "./Scenarios";

export function Combined() {
  return (
    <section
      id="combined"
      data-surface="dark"
      aria-labelledby="combined-heading"
      className="relative overflow-hidden bg-ink pt-(--section-y) text-paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden guides opacity-40 md:block" />
      <div className="relative shell">
        <div className="grid-12 gap-y-5 md:gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <Reveal>
              <Eyebrow index="12" tone="dark">
                {combined.eyebrow}
              </Eyebrow>
            </Reveal>
            <SplitLines id="combined-heading" lines={combined.heading} className="mt-5 text-h2 md:mt-8 md:text-display" />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:self-end">
            <Reveal delay={0.1}>
              <p className="text-lead text-paper/75">{combined.body}</p>
            </Reveal>
          </div>
        </div>

        <Scenarios />
      </div>
    </section>
  );
}
