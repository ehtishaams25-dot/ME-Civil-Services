import { cn } from "@/lib/cn";

/** Static wall-section drawing — used on small screens and without WebGL. */
export function SystemDrawing({ className }: { className?: string }) {
  const line = "rgb(245 243 238 / 0.55)";
  const faint = "rgb(245 243 238 / 0.18)";
  return (
    <svg viewBox="0 0 520 400" fill="none" aria-hidden className={cn("h-auto w-full", className)}>
      {/* Slab */}
      <path d="M20 340 H500 V362 H20 Z" stroke={line} strokeWidth="1" />
      {/* Wall */}
      <path d="M40 60 H480 V340 H40 Z" stroke={line} strokeWidth="1" />
      {[100, 140, 180, 220, 260, 300].map((y) => (
        <path key={y} d={`M40 ${y} H480`} stroke={faint} strokeWidth="1" />
      ))}
      {/* Build-up, stepped */}
      <path d="M40 60 H250 V340 H40" fill="rgb(214 207 193 / 0.14)" stroke={line} />
      <path d="M40 60 H195 V340" fill="rgb(237 232 222 / 0.12)" stroke={line} />
      <path d="M40 60 H145 V340" fill="rgb(251 250 246 / 0.1)" stroke={line} />
      <path d="M40 60 H95 V340" fill="rgb(169 188 204 / 0.35)" stroke={line} />
      {/* Supply */}
      <path d="M430 340 V120 H280 V190 M355 120 V240" stroke="#9fb4c7" strokeWidth="3" />
      <circle cx="430" cy="120" r="5" fill="#d5d9dd" />
      <circle cx="355" cy="120" r="5" fill="#d5d9dd" />
      <circle cx="280" cy="120" r="5" fill="#d5d9dd" />
      {/* Spool under repair */}
      <path d="M378 120 H418" stroke="#b79a63" strokeWidth="5" />
      {/* Drain */}
      <path d="M230 318 H395 V350 M265 262 V318" stroke="#8b939c" strokeWidth="6" />
      {/* Labels */}
      <g fill="rgb(245 243 238 / 0.6)" fontFamily="ui-monospace, monospace" fontSize="15" letterSpacing="1.2">
        <text x="40" y="44">
          FINISH
        </text>
        <text x="280" y="100">
          SUPPLY
        </text>
        <text x="372" y="100" fill="#b79a63">
          REPAIR
        </text>
        <text x="300" y="386">
          DRAINAGE
        </text>
      </g>
    </svg>
  );
}
