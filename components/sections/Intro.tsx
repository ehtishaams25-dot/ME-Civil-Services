import { Eyebrow } from "@/components/ui/Eyebrow";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { intro } from "@/lib/content";
import { site } from "@/lib/site";

export function Intro() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative bg-paper section-y">
      <div className="shell">
        <div className="grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-5">
            <Reveal>
              <Eyebrow index="01">{intro.eyebrow}</Eyebrow>
            </Reveal>
            <SplitLines id="about-heading" lines={intro.heading} className="mt-8 max-w-[14ch] text-h2" />
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:pt-16">
            <Reveal>
              <p className="text-lead text-text">{intro.body[0]}</p>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-[calc(var(--gutter)*2)]">
              <Reveal delay={0.08}>
                <p className="text-body text-muted">{intro.body[1]}</p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="text-body text-muted">{intro.body[2]}</p>
              </Reveal>
            </div>

            <Reveal delay={0.2} className="mt-12 grid grid-cols-2 border-t border-line-strong pt-6">
              <div>
                <p className="eyebrow text-muted">Proprietor</p>
                <p className="mt-3 text-h4">{site.proprietor}</p>
              </div>
              <div>
                <p className="eyebrow text-muted">Based in</p>
                <p className="mt-3 text-h4">{site.address.locality}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Cinematic plate */}
      <div className="shell mt-[clamp(4rem,9vw,8rem)]">
        <Photo
          image="introBathroom"
          sizes="(min-width: 1720px) 1600px, 100vw"
          className="aspect-[4/5] w-full sm:aspect-[16/10] lg:aspect-[21/9]"
          parallax={8}
        />
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
          <p className="index text-muted">Fig. 02</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Project types">
            {intro.sectors.map((s) => (
              <li key={s} className="eyebrow text-muted">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tagline */}
      <div className="shell mt-[clamp(5rem,11vw,10rem)]">
        <div className="grid-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-2">
            <Reveal y={0}>
              <span aria-hidden className="block h-px w-16 bg-brass" />
            </Reveal>
            <SplitLines
              as="p"
              lines={["Your Home & Business –", "Our Responsibility."]}
              className="mt-10 text-h1 text-ink"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
