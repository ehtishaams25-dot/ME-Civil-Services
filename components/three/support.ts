"use client";

import { useEffect, useState, type RefObject } from "react";

export type Quality = "high" | "low";

let webglCache: boolean | null = null;

export function hasWebGL() {
  if (webglCache !== null) return webglCache;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglCache = !!gl;
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglCache = false;
  }
  return webglCache;
}

/**
 * Decides whether a 3D scene should mount and at what fidelity.
 * `null` while undecided (SSR / first paint) so the static drawing shows.
 * Phones (< 768px) never mount WebGL — they get pre-rendered or drawn fallbacks,
 * so Three.js is not downloaded at all.
 */
export function useSceneSupport() {
  const [state, setState] = useState<{ enabled: boolean; quality: Quality; reducedMotion: boolean } | null>(null);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;

    const enabled = !small && !saveData && hasWebGL();
    const quality: Quality = small || coarse || lowCores ? "low" : "high";

    // Defer past first paint so the scene never competes with LCP.
    const decide = () => setState({ enabled, quality, reducedMotion });
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle ? window.requestIdleCallback(decide, { timeout: 1200 }) : setTimeout(decide, 300);

    return () => {
      if (hasIdle) window.cancelIdleCallback(handle as number);
      else clearTimeout(handle);
    };
  }, []);

  return state;
}

/** True while the element is near the viewport and the tab is visible — drives the render loop. */
export function useActiveRender(ref: RefObject<HTMLElement | null>, rootMargin = "120px") {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    const update = () => setActive(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        update();
      },
      { rootMargin },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [ref, rootMargin]);

  return active;
}
