import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { categories } from "@/lib/content";

/** A specification schedule: one column per trade, one ruled row per category. */
export function Categories() {
  return (
    <section id="categories" aria-labelledby="categories-heading" className="relative bg-paper-2 section-y">
      <div className="shell">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-8 lg:col-span-6">
            <Reveal>
              <Eyebrow index="15">Schedule</Eyebrow>
            </Reveal>
            <SplitLines id="categories-heading" lines={[categories.heading]} className="mt-8 text-h2" />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:self-end">
            <Reveal delay={0.1}>
              <p className="text-body text-muted">
                Thirteen categories across plumbing, painting and maintenance — the complete scope, at a glance.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-[clamp(3rem,6vw,5rem)] grid gap-16 lg:grid-cols-2 lg:gap-[calc(var(--gutter)*2)]">
          {categories.groups.map((group) => (
            <div key={group.title}>
              <Reveal>
                <div className="flex items-baseline justify-between border-b border-ink pb-4">
                  <h3 className="text-h3">{group.title}</h3>
                  <span className="index text-muted">{String(group.rows.length).padStart(2, "0")}</span>
                </div>
              </Reveal>
              <Stagger as="ul" stagger={0.05}>
                {group.rows.map((row, i) => (
                  <StaggerItem
                    key={row.name}
                    y={10}
                    className="group grid grid-cols-[3.5rem_1fr] gap-y-1 border-b border-line-strong py-5 md:grid-cols-[4.5rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-baseline"
                  >
                    <span className="index text-muted transition-colors duration-500 group-hover:text-ink">
                      {group.prefix}.{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-h4 transition-transform duration-700 ease-(--ease-expo) group-hover:translate-x-1">
                      {row.name}
                    </span>
                    <span className="col-start-2 text-body text-muted md:col-start-auto">{row.scope}</span>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
