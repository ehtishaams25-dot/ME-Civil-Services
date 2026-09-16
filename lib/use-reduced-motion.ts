"use client";

import { useSyncExternalStore } from "react";

/**
 * Hydration-safe media query: renders `serverValue` on the server and during
 * hydration, then follows the real match.
 */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (callback) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", callback);
      return () => mq.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/** Phones: below the `md` breakpoint (48rem). */
export function useIsPhone() {
  return useMediaQuery("(max-width: 47.99rem)");
}
