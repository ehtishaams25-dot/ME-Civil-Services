import { cn } from "@/lib/cn";
import { ArrowRight } from "./Icons";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid-light" | "solid-dark" | "outline-light" | "outline-dark";
  size?: "md" | "lg";
  icon?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};

const variants = {
  "solid-light": "bg-paper text-ink hover:bg-white",
  "solid-dark": "bg-ink text-paper hover:bg-navy",
  "outline-light": "border border-paper/30 text-paper hover:border-paper/70",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink/70",
};

/** Square-cornered CTA. The arrow slides through on hover rather than bouncing. */
export function ButtonLink({
  href,
  children,
  variant = "solid-dark",
  size = "md",
  icon,
  className,
  ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={cn(
        "group relative inline-flex items-center justify-between gap-6 rounded-xs font-medium tracking-[-0.005em] transition-colors duration-500",
        size === "lg" ? "h-16 px-7 text-[1.0625rem]" : "h-13 px-5 text-[0.9375rem]",
        variants[variant],
        className,
      )}
    >
      <span>{children}</span>
      <span aria-hidden className="relative block size-5 overflow-hidden">
        {icon ?? (
          <>
            <ArrowRight className="absolute inset-0 size-5 transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-[120%]" />
            <ArrowRight className="absolute inset-0 size-5 -translate-x-[120%] transition-transform duration-500 ease-(--ease-expo) group-hover:translate-x-0" />
          </>
        )}
      </span>
    </a>
  );
}
