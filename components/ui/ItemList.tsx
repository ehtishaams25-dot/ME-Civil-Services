import { cn } from "@/lib/cn";
import { Stagger, StaggerItem } from "./Reveal";

type ItemListProps = {
  items: readonly string[];
  columns?: 1 | 2 | 3;
  tone?: "light" | "dark";
  numbered?: boolean;
  start?: number;
  className?: string;
};

/** Hairline-ruled schedule of items — the site's basic unit for service scope. */
export function ItemList({ items, columns = 2, tone = "light", numbered = true, start = 1, className }: ItemListProps) {
  const dark = tone === "dark";
  return (
    <Stagger
      stagger={0.035}
      className={cn(
        "grid gap-x-[calc(var(--gutter)*2)]",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item, i) => (
        <StaggerItem
          key={item}
          className={cn(
            "flex items-baseline gap-4 border-b py-3.5 text-body",
            dark ? "border-line-dark text-paper/90" : "border-line text-text",
          )}
        >
          {numbered ? (
            <span className={cn("w-6 shrink-0 index", dark ? "text-muted-dark" : "text-muted")}>
              {String(i + start).padStart(2, "0")}
            </span>
          ) : (
            <span aria-hidden className="mb-[0.3em] h-px w-3 shrink-0 self-center bg-brass" />
          )}
          <span>{item}</span>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
