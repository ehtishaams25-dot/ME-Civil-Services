import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { reasons } from "@/lib/content";

export function Reasons() {
  return (
    <section id="why" aria-labelledby="why-heading" className="relative bg-paper section-y">
      <div className="shell">
        <div className="grid-12 gap-y-4 md:gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <Reveal>
              <Eyebrow index="16">{reasons.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="why-heading" lines={reasons.heading} className="mt-5 text-h2 md:mt-8" />
          </div>
        </div>

        <Stagger
          as="ul"
          stagger={0.06}
          className="mt-6 grid border-t border-line-strong md:mt-[clamp(3rem,6vw,5rem)] md:grid-cols-2 md:border-l lg:grid-cols-4"
        >
          {reasons.items.map((item, i) => (
            <StaggerItem
              key={item.title}
              className="group relative grid grid-cols-[2.25rem_1fr] border-b border-line-strong py-4 transition-colors duration-700 md:flex md:min-h-[19rem] md:flex-col md:justify-between md:gap-10 md:border-r md:p-8 md:hover:bg-white"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brass max-md:hidden transition-transform duration-700 ease-(--ease-expo) group-hover:scale-x-100"
              />
              <span className="index text-muted max-md:pt-1.5">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-h3 md:flex md:min-h-[2.3em] md:max-w-[14ch] md:items-end">{item.title}</h3>
                <p className="mt-1 text-body text-muted md:mt-4">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
