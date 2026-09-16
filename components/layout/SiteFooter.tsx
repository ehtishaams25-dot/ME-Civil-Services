import { Logo } from "@/components/ui/Logo";
import { nav, site, telHref } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-surface="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="shell">
        <div className="grid-12 gap-y-10 border-t border-line-dark py-12 md:gap-y-12 md:py-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <Logo tone="dark" className="h-11 md:h-14" />
            <p className="mt-5 max-w-[30ch] text-body text-paper/65 md:mt-6">{site.positioning}</p>
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
            <p className="eyebrow text-paper/60">Navigate</p>
            <ul className="mt-3 grid md:mt-5 md:gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-1.5 text-[0.9375rem] text-paper/85 hover:text-paper md:py-0"
                  >
                    <span className="link-line">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="eyebrow text-paper/60">Contact</p>
            <dl className="mt-4 grid gap-4 text-[0.9375rem] md:mt-5 md:gap-5">
              <div>
                <dt className="text-small text-paper/60">Proprietor</dt>
                <dd className="mt-1 text-paper/85">{site.proprietor}</dd>
              </div>
              <div>
                <dt className="text-small text-paper/60">Phone</dt>
                <dd>
                  <a href={telHref} className="inline-block py-1.5 text-paper hover:text-paper md:py-0">
                    <span className="link-line">{site.phone.display}</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-paper/60">Address</p>
            <address className="mt-4 text-[0.9375rem] leading-relaxed text-paper/85 not-italic md:mt-5">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>

        {/* Signature */}
        <div className="border-t border-line-dark pt-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:pt-10 md:pb-8">
          <p className="font-display text-[clamp(1.75rem,6.6vw,7rem)] leading-[1.02] font-medium tracking-[-0.04em] text-paper md:leading-[0.98] md:tracking-[-0.045em]">
            <span className="block">Your Home &amp; Business –</span>
            <span className="block text-paper/45">Our Responsibility.</span>
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-small text-paper/60 md:mt-12">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <a href="#top" className="inline-block py-2 md:py-0">
              <span className="link-line">Back to top</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
