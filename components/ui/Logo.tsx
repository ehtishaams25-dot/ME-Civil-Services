import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Official M.E. Civil Services logo, vectorised from the supplied artwork so it
 * stays sharp at every size. `tone="dark"` is the reverse version for navy grounds.
 */
const logos = {
  horizontal: { light: "/brand/me-logo-horizontal.svg", dark: "/brand/me-logo-horizontal-reverse.svg", w: 2584, h: 605 },
  stacked: { light: "/brand/me-logo-stacked.svg", dark: "/brand/me-logo-stacked-reverse.svg", w: 1201, h: 839 },
  mark: { light: "/brand/me-mark.svg", dark: "/brand/me-mark-reverse.svg", w: 652, h: 605 },
} as const;

type LogoProps = {
  variant?: keyof typeof logos;
  tone?: "light" | "dark";
  className?: string;
  /** Pass an empty string when the logo sits inside a link that already has a label. */
  alt?: string;
  preload?: boolean;
};

export function Logo({ variant = "horizontal", tone = "light", className, alt = "M.E. Civil Services", preload }: LogoProps) {
  const logo = logos[variant];
  return (
    <Image
      src={tone === "dark" ? logo.dark : logo.light}
      width={logo.w}
      height={logo.h}
      alt={alt}
      unoptimized
      preload={preload}
      draggable={false}
      className={cn("block w-auto select-none", className)}
    />
  );
}
