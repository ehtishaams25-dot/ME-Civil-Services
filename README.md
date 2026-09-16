# M.E. Civil Services — Website

Single-page marketing site for **M.E. Civil Services**, Mumbai — complete plumbing, painting, repair and maintenance.

Built with Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS 4, Motion (Framer Motion),
Three.js / React Three Fiber / drei, and Lenis smooth scrolling.

## Scripts

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
npm run start      # serve the production build
npm run lint
npm run typecheck
npm run format
```

## Before going live

1. **Set the domain.** Create `.env.production` with
   `NEXT_PUBLIC_SITE_URL=https://your-domain.com`. It drives the canonical URL, Open Graph URLs, `sitemap.xml`,
   `robots.txt` and the structured data. The fallback (`https://www.example.com`) is a placeholder.
2. **Replace the photography** (see below) with the company's own project photos when available.

## Where things live

| Path                     | Purpose                                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `lib/site.ts`            | Business identity: name, proprietor, phone, address, SEO title/description. Single source of truth. |
| `lib/content.ts`         | All page copy and service lists (kept verbatim from the brief).                                     |
| `lib/media.ts`           | Every photograph, with alt text and focal point.                                                    |
| `lib/structured-data.ts` | `Plumber` / `HousePainter` LocalBusiness JSON-LD — only supplied information.                       |
| `app/`                   | Layout, page, metadata, icon, OG image, sitemap, robots, manifest.                                  |
| `components/hero`        | Hero, 3D pipe-junction visual and its SVG fallback drawing.                                         |
| `components/three`       | The two WebGL scenes and support/visibility hooks.                                                  |
| `components/sections`    | One component per page section.                                                                     |
| `components/ui`          | Design-system primitives (Photo, Reveal, SplitLines, Accordion, ItemList, Button…).                 |

## Imagery

The current photographs are representative editorial images served from Unsplash (free licence, commercial use
permitted). **They do not show M.E. Civil Services projects.** To use your own:

1. Put optimised JPG/PNG/WebP files in `public/images/`.
2. In `lib/media.ts`, change the `src` of the relevant entry to e.g. `"/images/bathroom-01.jpg"` and update `alt`.

Local images are automatically served as AVIF/WebP by `next/image`.

## 3D and performance

- Two WebGL scenes only: the hero pipe junction (cursor-reactive) and the scroll-driven wall section.
- Both load via dynamic import after first paint, render only while on screen, and cap device pixel ratio.
- Phones get a lighter hero model; the wall section is replaced by a static drawing below 768px.
- Without WebGL, or with Save-Data enabled, both fall back to SVG technical drawings.
- `prefers-reduced-motion` disables smooth scrolling, parallax and animated reveals.

## Contact form

"Request a Service" composes a text message to the listed phone number (and can copy the details). No data is
sent to, or stored by, the website. No email address or WhatsApp link has been added because none was supplied.
