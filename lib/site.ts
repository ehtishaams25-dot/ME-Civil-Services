/**
 * Business identity — the single source of truth for company and contact details.
 * Only information supplied by the client belongs here. Do not add hours,
 * registration numbers, emails or social handles unless they are provided.
 */
export const site = {
  name: "M.E. Civil Services",
  legalName: "M.E. Civil Services",
  positioning: "Complete Plumbing & Painting Solutions Under One Roof",
  tagline: "Your Home & Business – Our Responsibility.",
  proprietor: "Ishtiaque Ahmed Shaikh",
  phone: {
    display: "9892199235",
    /** E.164 form for tel: / sms: links (India country code). */
    e164: "+919892199235",
  },
  address: {
    lines: ["Pearl Oasis One,", "A/2105, Pathan Wadi,", "Malad (E), Mumbai – 400097"],
    street: "Pearl Oasis One, A/2105, Pathan Wadi",
    locality: "Malad (E), Mumbai",
    region: "Maharashtra",
    postalCode: "400097",
    country: "IN",
  },
  city: "Mumbai",
  /**
   * Canonical origin. Replace with the production domain via NEXT_PUBLIC_SITE_URL.
   * The fallback is a placeholder, not a real domain.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com",
  seo: {
    title: "M.E. Civil Services | Plumbing & Painting Services in Mumbai",
    description:
      "M.E. Civil Services provides complete plumbing, painting, repair and maintenance solutions for residential, commercial and institutional properties in Mumbai.",
  },
} as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Plumbing", href: "#plumbing" },
  { label: "Painting", href: "#painting" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const telHref = `tel:${site.phone.e164}`;
