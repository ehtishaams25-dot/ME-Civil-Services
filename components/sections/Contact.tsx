import { ButtonLink } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { cta } from "@/lib/content";
import { site, telHref } from "@/lib/site";
import { RequestComposer } from "./RequestComposer";

export function Contact() {
  return (
    <section
      id="contact"
      data-surface="dark"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-ink pt-(--section-y) text-paper"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden guides opacity-40 md:block" />
      <div className="relative shell">
        <div className="grid-12 gap-y-14">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3 eyebrow text-paper/70">
                <span aria-hidden className="h-px w-7 bg-brass" />
                <span className="index text-brass">18</span>
                <span>Contact</span>
              </p>
            </Reveal>
            <SplitLines id="contact-heading" lines={cta.heading} className="mt-8 text-display" />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-[48ch] text-lead text-paper/72">{cta.body}</p>
            </Reveal>

            <Reveal delay={0.18} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <ButtonLink
                href={telHref}
                variant="solid-light"
                size="lg"
                className="min-w-72"
                icon={<Phone className="size-5" />}
                ariaLabel={`Call ${site.name} on ${site.phone.display}`}
              >
                Call {site.phone.display}
              </ButtonLink>
              <a href="#request" className="link-line-reverse text-[0.9375rem] font-medium text-paper/90">
                Request a Service
              </a>
            </Reveal>

            <Reveal delay={0.24} className="mt-16 grid gap-10 border-t border-line-dark pt-8 sm:grid-cols-2">
              <div>
                <p className="eyebrow text-paper/60">Proprietor</p>
                <p className="mt-4 text-h4">{site.proprietor}</p>
              </div>
              <address className="not-italic">
                <p className="eyebrow text-paper/60">Address</p>
                <p className="mt-4 text-body text-paper/85">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </p>
              </address>
            </Reveal>
          </div>

          <div className="col-span-4 md:col-span-8 lg:col-span-5 lg:pt-4">
            <RequestComposer />
          </div>
        </div>
      </div>
    </section>
  );
}
