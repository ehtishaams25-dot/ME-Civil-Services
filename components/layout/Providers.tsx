"use client";

import Lenis from "lenis";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Smooth wheel scrolling is a desktop refinement. Touch devices keep native
    // momentum scrolling (Lenis would only add a rAF loop there).
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (reduce || touchOnly) return;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      wheelMultiplier: 0.95,
      anchors: { offset: -64 },
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect -- instance is created client-side only
    setLenis(instance);
    if (process.env.NODE_ENV !== "production") {
      (window as Window & { __lenis?: Lenis }).__lenis = instance;
    }

    return () => {
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <MotionConfig reducedMotion="user">
        <LazyMotion features={domAnimation} strict>
          {children}
        </LazyMotion>
      </MotionConfig>
    </LenisContext.Provider>
  );
}
