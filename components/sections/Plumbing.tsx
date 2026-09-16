import { AccordionItem } from "@/components/ui/Accordion";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ItemList } from "@/components/ui/ItemList";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { plumbing } from "@/lib/content";

export function Plumbing() {
  return (
    <section id="plumbing" aria-labelledby="plumbing-heading" className="relative bg-paper pb-(--section-y)">
      {/* Chapter opener */}
      <div className="shell">
        <div className="grid-12 items-end gap-y-12 border-t border-line pt-(--section-y)">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Photo
              image="plumbingValves"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[4/5] md:aspect-[4/3] lg:aspect-[7/6]"
              parallax={7}
            />
          </div>
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow index="03">{plumbing.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="plumbing-heading" lines={["Complete", "Plumbing Works"]} className="mt-8 text-h2" />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[36ch] text-lead text-muted">{plumbing.description}</p>
            </Reveal>
            <Reveal delay={0.18} className="mt-12 grid grid-cols-3 border-t border-line-strong">
              {plumbing.scopes.map((s) => (
                <div key={s.code} className="border-r border-line pt-5 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <p className="index text-muted">{s.code}</p>
                  <p className="mt-3 text-small text-text">{s.title}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>

      {/* Scope detail — progressive disclosure */}
      <div className="shell mt-[clamp(4rem,8vw,7rem)]">
        <div className="grid-12">
          <div className="col-span-4 mb-8 md:col-span-8 lg:col-span-3 lg:mb-0">
            <Reveal>
              <p className="eyebrow text-muted">Scope of work</p>
              <p className="mt-5 max-w-[28ch] text-body text-muted">
                Open each group for the full list of plumbing works undertaken.
              </p>
            </Reveal>
          </div>
          <div className="col-span-4 border-b border-line-strong md:col-span-8 lg:col-span-9">
            {plumbing.scopes.map((scope, i) => {
              const count = scope.groups.reduce((n, g) => n + g.items.length, 0);
              return (
                <AccordionItem
                  key={scope.code}
                  code={scope.code}
                  title={scope.title}
                  meta={`${String(count).padStart(2, "0")} items`}
                  defaultOpen={i === 0}
                >
                  <div className="grid gap-10">
                    {scope.groups.map((group, gi) => (
                      <div key={gi}>
                        {"label" in group && group.label ? (
                          <p className="mb-4 eyebrow text-muted">{group.label}</p>
                        ) : null}
                        <ItemList items={group.items} columns={2} />
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sanitary plate */}
      <div className="shell mt-[clamp(4rem,8vw,7rem)]">
        <div className="grid-12 gap-y-6">
          <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-5">
            <Photo
              image="sanitaryMarble"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] md:aspect-[5/6]"
              parallax={5}
            />
          </div>
          <div className="col-span-4 flex flex-col justify-end md:col-span-4 lg:col-span-3">
            <Reveal>
              <p className="index text-muted">Fig. 03</p>
              <p className="mt-4 max-w-[30ch] text-body text-muted">
                Sanitary and bathroom plumbing for toilets, bathrooms, washrooms, kitchens, utility areas and commercial
                sanitary facilities.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
