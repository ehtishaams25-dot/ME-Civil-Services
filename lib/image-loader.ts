import type { ImageLoader } from "next/image";

/** Unsplash serves imgix — request the exact width and let it negotiate AVIF/WebP. */
const unsplashLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?auto=format&fit=max&w=${width}&q=${quality ?? 72}`;

/** Remote editorial images use the CDN directly; local files go through next/image. */
export function loaderFor(src: string): ImageLoader | undefined {
  return src.startsWith("https://images.unsplash.com/") ? unsplashLoader : undefined;
}
