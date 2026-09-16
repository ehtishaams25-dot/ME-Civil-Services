import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: React.ReactNode;
  index?: string;
  className?: string;
  tone?: "light" | "dark";
};

/** Uppercase micro label with a brass tick. On light grounds the text stays ink for contrast. */
export function Eyebrow({ children, index, className, tone = "light" }: EyebrowProps) {
  return (
    <p className={cn("flex items-center gap-3 eyebrow", tone === "dark" ? "text-paper/80" : "text-text/80", className)}>
      <span aria-hidden className="h-px w-7 bg-brass" />
      {index ? <span className={cn("index", tone === "dark" ? "text-brass" : "text-muted")}>{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}
