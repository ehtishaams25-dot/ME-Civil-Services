import { categories } from "./content";
import { site } from "./site";

/**
 * LocalBusiness data restricted to what the client supplied.
 * Deliberately omitted: opening hours, geo coordinates, price range, ratings,
 * email and social profiles — none were provided.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Plumber", "HousePainter"],
    "@id": `${site.url}/#business`,
    name: site.name,
    slogan: site.tagline,
    description: site.seo.description,
    url: site.url,
    telephone: site.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "City", name: site.city },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing & Painting Services",
      itemListElement: categories.groups.flatMap((g) =>
        g.rows.map((row) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: row.name, description: row.scope },
        })),
      ),
    },
  };
}
