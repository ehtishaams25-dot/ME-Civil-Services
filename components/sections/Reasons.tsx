import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { reasons } from "@/lib/content";

export function Reasons() {
  return (
    <section id="why" aria-labelledby="why-heading" className="relative bg-paper section-y">
      <div className="shell">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <Reveal>
              <Eyebrow index="16">{reasons.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="why-heading" lines={reasons.heading} className="mt-8 text-h2" />
          </div>
        </div>

        <Stagger
          as="ul"
          stagger={0.06}
          className="mt-[clamp(3rem,6vw,5rem)] grid border-t border-l border-line-strong sm:grid-cols-2 lg:grid-cols-4"
        >
          {reasons.items.map((item, i) => (
            <StaggerItem
              key={item.title}
              className="group relative flex min-h-[16rem] flex-col justify-between gap-10 border-r border-b border-line-strong p-6 transition-colors duration-700 hover:bg-white md:min-h-[19rem] md:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-brass transition-transform duration-700 ease-(--ease-expo) group-hover:scale-x-100"
              />
              <span className="index text-muted">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="flex min-h-[2.3em] max-w-[14ch] items-end text-h3">{item.title}</h3>
                <p className="mt-4 text-body text-muted">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
