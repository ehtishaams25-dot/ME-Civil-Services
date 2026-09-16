import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { protective } from "@/lib/content";

export function Protective() {
  return (
    <section id="protective" aria-labelledby="protective-heading" className="relative bg-paper-2">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[26rem] lg:min-h-full">
          <Photo
            image="facadeGrid"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="absolute! inset-0"
            parallax={8}
          />
        </div>

        <div className="px-(--shell-x) section-y lg:pr-[max(var(--shell-x),calc((100vw-1720px)/2+var(--shell-x)))] lg:pl-[clamp(3rem,6vw,7rem)]">
          <Reveal>
            <Eyebrow index="11">{protective.eyebrow}</Eyebrow>
          </Reveal>
          <SplitLines id="protective-heading" lines={protective.heading} className="mt-8 text-h2" />

          <Reveal delay={0.08}>
            <p className="mt-12 eyebrow text-muted">Applications</p>
          </Reveal>
          <Stagger as="ul" stagger={0.05} className="mt-5 flex flex-wrap gap-2">
            {protective.applications.map((a) => (
              <StaggerItem key={a} className="border border-line-strong px-3.5 py-2 text-small text-text">
                {a}
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1} className="mt-14">
            <aside aria-label="Important note" className="grid grid-cols-[auto_1fr] gap-5 border-t border-ink pt-6">
              <span
                aria-hidden
                className="mt-0.5 flex size-8 items-center justify-center rounded-full border border-brass font-display text-[0.8125rem] text-ink"
              >
                i
              </span>
              <div>
                <p className="eyebrow text-text">Source before surface</p>
                <p className="mt-4 max-w-[52ch] text-body text-text">{protective.note}</p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
