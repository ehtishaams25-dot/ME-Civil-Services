"use client";

import { AnimatePresence, m } from "motion/react";
import { useId, useMemo, useState } from "react";
import { requestOptions } from "@/lib/content";
import { ease } from "@/lib/motion";
import { site, telHref } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * Prepares a service request as a text message to the listed phone number.
 * No data is sent to or stored by the website.
 */
export function RequestComposer() {
  const id = useId();
  const [services, setServices] = useState<string[]>([]);
  const [property, setProperty] = useState<string>("");
  const [location, setLocation] = useState("");
  const [details, setDetails] = useState("");
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const lines = [
      `Service request — ${site.name}`,
      services.length ? `Services: ${services.join(", ")}` : null,
      property ? `Property: ${property}` : null,
      location.trim() ? `Location: ${location.trim()}` : null,
      details.trim() ? `Details: ${details.trim()}` : null,
      name.trim() ? `Name: ${name.trim()}` : null,
    ].filter(Boolean);
    return lines.join("\n");
  }, [services, property, location, details, name]);

  const ready = services.length > 0 || details.trim().length > 0;
  const smsHref = `sms:${site.phone.e164}?&body=${encodeURIComponent(message)}`;

  const toggle = (s: string) => setServices((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "w-full border-0 border-b border-line-dark-strong bg-transparent px-0 py-3 text-[0.9375rem] text-paper placeholder:text-paper/35 focus:border-brass focus:ring-0 focus:outline-none";

  return (
    <div id="request" className="scroll-mt-28 border border-line-dark bg-ink-2/70 p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-h3">Request a Service</h3>
        <span className="index text-paper/40">Form</span>
      </div>
      <p className="mt-3 text-small text-paper/55">
        Select what you need and add a few details. The request opens as a text message to {site.phone.display} —
        nothing is stored on this website.
      </p>

      <form
        className="mt-8 grid gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (ready) window.location.href = smsHref;
        }}
      >
        <fieldset>
          <legend className="eyebrow text-paper/60">Service required</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {requestOptions.services.map((s) => {
              const on = services.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(s)}
                  className={cn(
                    "border px-3 py-2 text-[0.8125rem] transition-colors duration-300",
                    on
                      ? "border-paper bg-paper text-ink"
                      : "border-line-dark-strong text-paper/75 hover:border-paper/60 hover:text-paper",
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow text-paper/60">Property type</legend>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
            {requestOptions.property.map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-2.5 text-[0.875rem] text-paper/80">
                <input
                  type="radio"
                  name={`${id}-property`}
                  value={p}
                  checked={property === p}
                  onChange={() => setProperty(p)}
                  className="size-3.5 appearance-none rounded-full border border-paper/40 checked:border-[4px] checked:border-brass"
                />
                {p}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="block">
            <span className="eyebrow text-paper/60">Location / area</span>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Malad (E)"
              autoComplete="address-level2"
              className={field}
            />
          </label>
          <label className="block">
            <span className="eyebrow text-paper/60">Your name (optional)</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="eyebrow text-paper/60">Describe the requirement</span>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="What needs attention, and where?"
            className={cn(field, "resize-none")}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!ready}
            className="flex h-13 flex-1 items-center justify-center bg-paper px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-500 hover:bg-white disabled:cursor-not-allowed disabled:bg-paper/25 disabled:text-paper/50"
          >
            Send as text message
          </button>
          <button
            type="button"
            onClick={copy}
            disabled={!ready}
            className="flex h-13 items-center justify-center border border-line-dark-strong px-5 text-[0.9375rem] text-paper/85 transition-colors duration-500 hover:border-paper/60 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.span
                key={copied ? "copied" : "copy"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: ease.out }}
              >
                {copied ? "Copied" : "Copy details"}
              </m.span>
            </AnimatePresence>
          </button>
        </div>
        <p className="-mt-3 text-small text-paper/45">
          Prefer to talk?{" "}
          <a href={telHref} className="link-line-reverse text-paper/80">
            Call {site.phone.display}
          </a>
        </p>
      </form>
    </div>
  );
}
