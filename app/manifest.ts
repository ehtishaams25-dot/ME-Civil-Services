import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "M.E. Civil",
    description: site.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#f5f3ee",
    theme_color: "#0b1624",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
