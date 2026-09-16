"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import { Plus } from "./Icons";
import { Stagger, StaggerItem } from "./Reveal";

type ItemListProps = {
  items: readonly string[];
  columns?: 1 | 2 | 3;
  tone?: "light" | "dark";
  numbered?: boolean;
  start?: number;
  className?: string;
  /**
   * Phones only: show this many items and reveal the rest on demand.
   * Tablet and desktop always show the full list.
   */
  mobileLimit?: number;
};

/** Hairline-ruled schedule of items — the site's basic unit for service scope. */
export function ItemList({
  items,
  columns = 2,
  tone = "light",
  numbered = true,
  start = 1,
  className,
  mobileLimit,
}: ItemListProps) {
  const dark = tone === "dark";
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const collapsible = mobileLimit !== undefined && items.length > mobileLimit + 1;
  const hiddenCount = collapsible ? items.length - mobileLimit : 0;

  return (
    <div className={className}>
      <Stagger
        stagger={0.035}
        className={cn(
          "grid gap-x-[calc(var(--gutter)*2)]",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => (
          <StaggerItem
            key={item}
            className={cn(
              "flex items-baseline gap-4 border-b py-3 text-body md:py-3.5",
              dark ? "border-line-dark text-paper/90" : "border-line text-text",
              collapsible && !expanded && i >= mobileLimit && "max-md:hidden",
            )}
          >
            {numbered ? (
              <span className={cn("w-6 shrink-0 index", dark ? "text-muted-dark" : "text-muted")}>
                {String(i + start).padStart(2, "0")}
              </span>
            ) : (
              <span aria-hidden className="mb-[0.3em] h-px w-3 shrink-0 self-center bg-brass" />
            )}
            <span id={i === mobileLimit ? `${id}-more` : undefined}>{item}</span>
          </StaggerItem>
        ))}
      </Stagger>

      {collapsible ? (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={`${id}-more`}
          onClick={() => setExpanded((v) => !v)}
          className={cn(
            "flex min-h-12 w-full items-center justify-between gap-4 border-b text-[0.9375rem] font-medium md:hidden",
            dark ? "border-line-dark text-paper" : "border-line text-text",
          )}
        >
          <span>{expanded ? "Show fewer" : `Show all ${items.length}`}</span>
          <span
            aria-hidden
            className={cn(
              "flex size-8 items-center justify-center rounded-full border transition-transform duration-500 ease-(--ease-expo)",
              dark ? "border-line-dark-strong" : "border-line-strong",
              expanded && "rotate-45",
            )}
          >
            <Plus className="size-3.5" />
          </span>
          <span className="sr-only">{expanded ? "" : `(${hiddenCount} more)`}</span>
        </button>
      ) : null}
    </div>
  );
}
