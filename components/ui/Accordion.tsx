"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { useIsPhone } from "@/lib/use-reduced-motion";
import { Plus } from "./Icons";

type AccordionItemProps = {
  code: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  tone?: "light" | "dark";
};

/**
 * Editorial disclosure row. Height animates with the grid-rows technique, so
 * content stays in the DOM (indexable, findable) without layout measurement.
 */
export function AccordionItem({
  code,
  title,
  meta,
  children,
  defaultOpen = false,
  tone = "light",
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  // `defaultOpen` is a desktop default; on phones every group starts closed to keep the page short.
  const phone = useIsPhone();
  const [wasPhone, setWasPhone] = useState(phone);
  if (phone !== wasPhone) {
    setWasPhone(phone);
    if (phone) setOpen(false);
  }
  const id = useId();
  const dark = tone === "dark";

  return (
    <div className={cn("border-t", dark ? "border-line-dark-strong" : "border-line-strong")}>
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-button`}
          onClick={() => setOpen((v) => !v)}
          className="group grid min-h-16 w-full grid-cols-[1.75rem_1fr_auto] items-center gap-x-3 py-4 text-left md:grid-cols-[4rem_1fr_auto_auto] md:gap-x-4 md:py-8"
        >
          <span className={cn("index", dark ? "text-brass" : "text-muted")}>{code}</span>
          <span className="text-h3 transition-transform duration-700 ease-(--ease-expo) group-hover:translate-x-1.5">
            {title}
            {meta ? (
              <span className={cn("mt-1 block index md:hidden", dark ? "text-muted-dark" : "text-muted")}>{meta}</span>
            ) : null}
          </span>
          {meta ? (
            <span className={cn("hidden index md:block", dark ? "text-muted-dark" : "text-muted")}>{meta}</span>
          ) : null}
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-500",
              dark
                ? "border-line-dark-strong group-hover:border-paper/60"
                : "border-line-strong group-hover:border-ink/60",
              open && (dark ? "bg-paper text-ink" : "bg-ink text-paper"),
            )}
          >
            <Plus className={cn("size-4 transition-transform duration-700 ease-(--ease-expo)", open && "rotate-45")} />
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-button`}
        className={cn(
          "grid transition-[grid-template-rows] duration-700 ease-(--ease-expo)",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        inert={!open}
      >
        <div className="overflow-hidden">
          <div
            className={cn(
              "pb-6 transition-opacity duration-700 md:pb-10 md:pl-[calc(4rem+1rem)]",
              open ? "opacity-100" : "opacity-0",
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
