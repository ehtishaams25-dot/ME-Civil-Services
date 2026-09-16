import { Mark } from "@/components/ui/Icons";
import { nav, site, telHref } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-surface="dark" className="relative overflow-hidden bg-ink text-paper">
      <div className="shell">
        <div className="grid-12 gap-y-12 border-t border-line-dark py-16 md:py-20">
          <div className="col-span-4 md:col-span-8 lg:col-span-4">
            <div className="flex items-center gap-3">
              <Mark className="size-8" />
              <span className="font-display text-[0.875rem] font-semibold tracking-[0.14em] uppercase">
                M.E. Civil Services
              </span>
            </div>
            <p className="mt-6 max-w-[30ch] text-body text-paper/60">{site.positioning}</p>
          </div>

          <div className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
            <p className="eyebrow text-paper/45">Navigate</p>
            <ul className="mt-5 grid gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="link-line text-[0.9375rem] text-paper/80 hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="eyebrow text-paper/45">Contact</p>
            <dl className="mt-5 grid gap-5 text-[0.9375rem]">
              <div>
                <dt className="text-small text-paper/45">Proprietor</dt>
                <dd className="mt-1 text-paper/85">{site.proprietor}</dd>
              </div>
              <div>
                <dt className="text-small text-paper/45">Phone</dt>
                <dd className="mt-1">
                  <a href={telHref} className="link-line text-paper/85 hover:text-paper">
                    {site.phone.display}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="col-span-4 md:col-span-3 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-paper/45">Address</p>
            <address className="mt-5 text-[0.9375rem] leading-relaxed text-paper/85 not-italic">
              {site.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
          </div>
        </div>

        {/* Signature */}
        <div className="border-t border-line-dark pt-10 pb-8">
          <p className="font-display text-[clamp(2rem,6.6vw,7rem)] leading-[0.98] font-medium tracking-[-0.045em] text-paper">
            <span className="block">Your Home &amp; Business –</span>
            <span className="block text-paper/40">Our Responsibility.</span>
          </p>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 text-small text-paper/45">
            <p>
              © {year} {site.name}. All rights reserved.
            </p>
            <a href="#top" className="link-line">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
