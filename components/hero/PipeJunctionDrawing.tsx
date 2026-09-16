import { cn } from "@/lib/cn";

/**
 * Technical line drawing of the hero assembly. Shown while the 3D scene loads,
 * and permanently when WebGL is unavailable.
 */
export function PipeJunctionDrawing({ className }: { className?: string }) {
  const line = "rgb(245 243 238 / 0.42)";
  const faint = "rgb(245 243 238 / 0.16)";
  const brass = "#b79a63";

  return (
    <svg
      viewBox="0 0 720 720"
      fill="none"
      aria-hidden
      className={cn("h-full w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      <g stroke={line} strokeWidth="1.1" vectorEffect="non-scaling-stroke">
        {/* Main run */}
        <path d="M-10 332 H96 M-10 388 H96" />
        <path d="M150 332 H228 M150 388 H228" />
        <path d="M312 332 H366 M312 388 H366" />
        <path d="M562 332 H602 M562 388 H602" />
        {/* Union */}
        <path d="M96 322 H150 V398 H96 Z" />
        <path d="M110 314 H136 V406 H110 Z" />
        {/* Tee */}
        <path d="M228 326 H312 V394 H292 V470 H248 V394 H228 Z" />
        <path d="M252 470 V548 M288 470 V548" />
        {/* Branch elbow toward viewer */}
        <path d="M252 548 Q252 604 308 604 H352 M288 548 Q288 568 308 568 H352" />
        <ellipse cx="360" cy="586" rx="12" ry="46" />
        <ellipse cx="372" cy="586" rx="12" ry="46" />
        {/* Valve flanges and body */}
        <ellipse cx="372" cy="360" rx="10" ry="52" />
        <ellipse cx="556" cy="360" rx="10" ry="52" />
        <path d="M382 336 C420 300, 510 300, 546 336 M382 384 C420 420, 510 420, 546 384" />
        {/* Bonnet + stem */}
        <path d="M444 312 L450 250 H478 L484 312" />
        <path d="M438 250 H490" />
        <path d="M464 250 V184" />
        {/* Elbow rising */}
        <path d="M602 332 Q640 332 640 294 V-10 M602 388 Q696 388 696 294 V-10" />
      </g>
      {/* Handwheel */}
      <g stroke={brass} strokeWidth="1.2">
        <ellipse cx="464" cy="180" rx="72" ry="16" />
        <path d="M392 180 H536 M428 166 L500 194 M500 166 L428 194" />
      </g>
      {/* Drafting annotations */}
      <g stroke={faint} strokeWidth="1">
        <path d="M268 470 V650 M268 650 H200" strokeDasharray="3 5" />
        <path d="M464 120 V60 M464 60 H560" strokeDasharray="3 5" />
        <path d="M123 406 V470 M123 470 H40" strokeDasharray="3 5" />
        <path d="M60 700 H660 M60 694 V706 M660 694 V706" />
      </g>
      <g fill="rgb(245 243 238 / 0.5)" fontFamily="ui-monospace, monospace" fontSize="11" letterSpacing="1.2">
        <text x="120" y="645">
          TEE
        </text>
        <text x="572" y="64">
          GATE VALVE
        </text>
        <text x="40" y="490">
          UNION
        </text>
      </g>
    </svg>
  );
}
