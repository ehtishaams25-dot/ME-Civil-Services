type IconProps = { className?: string };

export function ArrowRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function ArrowUpRight({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path
        d="M5.5 4h3l1.5 4-2 1.25a9.5 9.5 0 0 0 5.25 5.25L14.5 12.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3.5 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** House-gable monogram, a restrained take on the existing M.E. mark. */
export function Mark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden className={className}>
      <path d="M4 14.5 16 5l12 9.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M7.5 12v15h17V12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
      <path d="M11.5 27v-8h9v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}
