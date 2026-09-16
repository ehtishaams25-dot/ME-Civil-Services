/**
 * Site copy. Service information is kept verbatim from the client brief so the
 * complete scope stays accurate; presentation decides how much is shown at once.
 */
import type { MediaKey } from "./media";

export const hero = {
  lines: ["Plumbing &", "Painting,", "Executed With", "Precision."],
  support: "Complete plumbing, painting, repair and maintenance solutions for homes, businesses and properties.",
  city: "Mumbai",
  disciplines: ["Plumbing", "Painting", "Maintenance"],
};

export const intro = {
  eyebrow: "About M.E. Civil Services",
  heading: ["One Service Partner.", "Multiple Property Needs."],
  body: [
    "M.E. Civil Services is a professional service-oriented contracting firm specializing in complete plumbing and painting works for residential, commercial, institutional, industrial and maintenance projects.",
    "Under the leadership of Ishtiaque Ahmed Shaikh, M.E. Civil Services focuses on systematic execution, proper workmanship, suitable materials and timely completion of assigned works.",
    "Our objective is to provide clients with a single-point solution for plumbing and painting requirements, from new installations and alterations to repair, maintenance, leakage rectification and finishing works.",
  ],
  sectors: ["Residential", "Commercial", "Institutional", "Industrial", "Maintenance"],
};

export type ServiceIndexItem = {
  n: string;
  title: string;
  description: string;
  href: string;
  image: MediaKey;
};

export const servicesIndex: ServiceIndexItem[] = [
  {
    n: "01",
    title: "Plumbing",
    description: "Installation, alteration, repair and maintenance of complete plumbing systems.",
    href: "#plumbing",
    image: "plumbingDark",
  },
  {
    n: "02",
    title: "Water Supply & Drainage",
    description: "Supply pipelines, drainage lines, water tanks and pumping connections.",
    href: "#water-systems",
    image: "concealedCopper",
  },
  {
    n: "03",
    title: "Repair & Maintenance",
    description: "Leakage identification and rectification, and plumbing and painting maintenance.",
    href: "#repair",
    image: "leakDrop",
  },
  {
    n: "04",
    title: "Painting",
    description: "Interior and exterior painting, from surface preparation through final finishing.",
    href: "#painting",
    image: "paintRoller",
  },
  {
    n: "05",
    title: "Decorative Finishes",
    description: "Texture, designer and feature-wall finishes, two-tone schemes and accent walls.",
    href: "#finishes",
    image: "textureShadow",
  },
  {
    n: "06",
    title: "Protective Coatings",
    description: "Enamel, metal, wood and waterproof protective painting systems.",
    href: "#protective",
    image: "facadeGrid",
  },
];

/* ------------------------------------------------------------------ */
/* Plumbing                                                            */
/* ------------------------------------------------------------------ */

export const plumbing = {
  eyebrow: "Plumbing",
  heading: "Complete Plumbing Works",
  description:
    "M.E. Civil Services undertakes all types of plumbing installation, alteration, repair and maintenance works.",
  scopes: [
    {
      code: "A",
      title: "Water Supply Pipeline Works",
      groups: [
        {
          items: [
            "Fresh-water pipeline installation",
            "Domestic water supply lines",
            "Hot and cold-water pipeline systems",
            "Internal and external water lines",
            "Replacement of old and damaged pipelines",
            "Pipeline alteration and rerouting",
            "CPVC, UPVC, PVC and GI piping works",
            "Pipe jointing and connection works",
            "Valves, bends, tees and other fittings",
            "Water distribution network installation",
            "Concealed and exposed plumbing",
          ],
        },
      ],
    },
    {
      code: "B",
      title: "Drainage & Wastewater Systems",
      groups: [
        {
          items: [
            "Soil and waste pipe installation",
            "Bathroom drainage systems",
            "Kitchen waste lines",
            "Floor waste connections",
            "Rainwater drainage piping",
            "Replacement of damaged drainage pipes",
            "Drainage line alteration and extension",
            "Trap and waste fitting installation",
            "Choked pipeline identification and rectification",
            "Leakage and seepage-related plumbing repairs",
          ],
        },
      ],
    },
    {
      code: "C",
      title: "Sanitary & Bathroom Plumbing",
      groups: [
        {
          label: "Services for",
          items: ["Toilets", "Bathrooms", "Washrooms", "Kitchens", "Utility areas", "Commercial sanitary facilities"],
        },
        {
          label: "Installation / replacement of",
          items: [
            "Wash basins",
            "WC/commodes",
            "Health faucets",
            "Bib cocks",
            "Pillar cocks",
            "Shower fittings",
            "Flush systems",
            "Floor traps",
            "Bottle traps",
            "Waste couplings",
            "Angle valves",
            "Flexible connections",
            "Other sanitary fittings",
          ],
        },
      ],
    },
  ],
};

export const waterSystems = {
  eyebrow: "Water Tanks & Pumping",
  heading: ["Water Systems", "That Work Reliably."],
  columns: [
    {
      title: "Water Tank Works",
      items: [
        "Overhead water tank plumbing",
        "Underground water tank connections",
        "Tank inlet and outlet connections",
        "Overflow and drain connections",
        "Float valve installation",
        "Tank-to-building water connections",
        "Replacement of defective fittings",
        "Tank pipeline alteration and maintenance",
      ],
    },
    {
      title: "Pumping Works",
      items: [
        "Water pump installation",
        "Pump inlet/outlet connections",
        "Pump replacement",
        "Pump pipeline connections",
        "Delivery-line installation",
        "Suction-line installation",
        "Valve and NRV installation",
        "Pump-related leakage rectification",
        "Routine plumbing maintenance",
      ],
    },
  ],
};

export const repair = {
  eyebrow: "Repair & Leakage",
  heading: ["Find the Problem.", "Fix It Properly."],
  intro: "Water leakage can damage walls, ceilings, flooring and structural elements if left unattended.",
  issues: [
    "Concealed pipe leakage",
    "Visible pipe leakage",
    "Joint leakage",
    "Bathroom leakage related to plumbing",
    "Kitchen pipeline leakage",
    "Drainage leakage",
    "Overflow problems",
    "Water tank leakage associated with plumbing connections",
    "Damaged pipe replacement",
    "Loose or defective plumbing fittings",
    "Blocked drainage lines",
    "Seepage caused by defective plumbing connections",
  ],
  method: [
    "Site Inspection",
    "Identify Suspected Source",
    "Expose Affected Section",
    "Remove Defective Components",
    "Repair / Replace",
    "Proper Jointing",
    "Testing",
    "Final Finishing",
  ],
};

/* ------------------------------------------------------------------ */
/* Painting                                                            */
/* ------------------------------------------------------------------ */

export const painting = {
  eyebrow: "Painting",
  heading: ["Painting With a", "Proper Finish."],
  body: [
    "M.E. Civil Services provides complete interior and exterior painting solutions for residential, commercial and institutional properties.",
    "Painting services can cover the project from surface preparation through final finishing.",
  ],
  interiorSpaces: [
    "Residential interior painting",
    "Office painting",
    "Commercial premises",
    "Shops and showrooms",
    "Corridors and common areas",
    "Staircases",
    "Lobbies",
    "Bedrooms",
    "Living areas",
    "Kitchens and utility areas",
    "Institutional premises",
  ],
  interiorFinishes: [
    { name: "Cement paint", swatch: "cement" },
    { name: "Distemper", swatch: "distemper" },
    { name: "Emulsion paint", swatch: "emulsion" },
    { name: "Acrylic paint", swatch: "acrylic" },
    { name: "Enamel paint", swatch: "enamel" },
    { name: "Premium decorative finishes", swatch: "decorative" },
    { name: "Texture finishes", swatch: "texture" },
    { name: "Designer finishes", swatch: "designer" },
    { name: "Protective coatings", swatch: "protective" },
  ],
} as const;

export const exterior = {
  eyebrow: "Exterior Painting",
  heading: ["Built to Look Good.", "Prepared to Last."],
  surfaces: [
    "Building external walls",
    "Residential buildings",
    "Commercial buildings",
    "Compound walls",
    "Parapets",
    "Staircase exteriors",
    "Water tank exteriors",
    "Service areas",
    "Lift machine room exteriors",
    "Other external surfaces",
  ],
  process: [
    "Surface Inspection",
    "Cleaning",
    "Loose Material Removal",
    "Crack/Patch Treatment",
    "Surface Preparation",
    "Primer",
    "Putty / Levelling",
    "Final Coating",
  ],
};

export const surfacePrep = {
  eyebrow: "Surface Preparation",
  heading: ["The Finish Starts", "Before the Paint."],
  items: [
    "Removal of loose paint",
    "Scraping of damaged coatings",
    "Cleaning of surfaces",
    "Removal of dust and dirt",
    "Treatment of minor cracks",
    "Filling of surface imperfections",
    "Patch repairs",
    "Putty application",
    "Sanding",
    "Primer application",
    "Preparation of previously painted surfaces",
    "Preparation of new plastered surfaces",
  ],
  statement:
    "Where extensive dampness, leakage or structural deterioration is observed, the underlying cause should be rectified before final painting.",
};

export const decorative = {
  eyebrow: "Decorative Finishes",
  heading: ["Details That", "Change a Space."],
  services: [
    "Wall texture finishes",
    "Decorative wall finishes",
    "Feature walls",
    "Designer finishes",
    "Smooth premium finishes",
    "Two-tone colour schemes",
    "Accent walls",
    "Decorative coating applications",
  ],
  plates: [
    { image: "textureShadow", caption: "Wall texture finish" },
    { image: "plasterBlue", caption: "Decorative coating application" },
    { image: "mirrorPlaster", caption: "Decorative wall finish" },
    { image: "textureLight", caption: "Smooth premium finish" },
    { image: "textureWarm", caption: "Feature wall" },
  ] satisfies { image: MediaKey; caption: string }[],
};

export const metalWood = {
  metal: {
    title: "Metal Painting",
    items: [
      "MS railings",
      "Gates",
      "Grills",
      "Handrails",
      "Metal frames",
      "Pipes",
      "Structural/utility metal surfaces",
      "Doors and shutters",
      "Other paintable metal components",
    ],
    process: [
      "Cleaning",
      "Rust / Loose Paint Removal",
      "Surface Preparation",
      "Suitable Primer",
      "Intermediate Coat Where Required",
      "Enamel / Finish Coat",
    ],
  },
  wood: {
    title: "Wooden Surface Painting",
    items: [
      "Wooden doors",
      "Window frames",
      "Wooden partitions",
      "Furniture-related surfaces",
      "Wooden panels",
      "Other paintable wooden components",
    ],
  },
};

export const protective = {
  eyebrow: "Waterproof & Protective Systems",
  heading: ["Protection Beyond", "the Surface."],
  applications: [
    "External walls",
    "Parapets",
    "Water tank external surfaces",
    "Damp-prone areas",
    "Service areas",
    "Utility rooms",
    "Selected wet-area surfaces",
  ],
  note: "Painting is not a substitute for correcting an active water-source or plumbing defect. Where leakage originates from a plumbing system, the source should first be repaired.",
};

/* ------------------------------------------------------------------ */
/* Combined solutions                                                  */
/* ------------------------------------------------------------------ */

export type Trade = "plumbing" | "finishing";

export const combined = {
  eyebrow: "Combined Solutions",
  heading: ["Two Trades.", "One Coordinated Service."],
  body: "One of the key advantages of M.E. Civil Services is the ability to coordinate both plumbing and painting requirements under one service arrangement.",
  lanes: { plumbing: "Plumbing", finishing: "Surface & Painting" } as Record<Trade, string>,
  scenarios: [
    {
      id: "bathroom",
      title: "Bathroom Renovation",
      steps: [
        { label: "Plumbing Repair", trade: "plumbing" },
        { label: "Sanitary Fittings", trade: "plumbing" },
        { label: "Leakage Rectification", trade: "plumbing" },
        { label: "Wall/Floor Restoration", trade: "finishing" },
        { label: "Painting", trade: "finishing" },
      ],
    },
    {
      id: "building",
      title: "Building Maintenance",
      steps: [
        { label: "Plumbing Inspection", trade: "plumbing" },
        { label: "Repair / Replacement", trade: "plumbing" },
        { label: "Surface Repair", trade: "finishing" },
        { label: "Primer", trade: "finishing" },
        { label: "Painting", trade: "finishing" },
      ],
    },
    {
      id: "tank",
      title: "Water Tank Area",
      steps: [
        { label: "Pipeline / Fitting Repair", trade: "plumbing" },
        { label: "Leakage Rectification", trade: "plumbing" },
        { label: "Surface Preparation", trade: "finishing" },
        { label: "Protective Painting", trade: "finishing" },
      ],
    },
    {
      id: "commercial",
      title: "Commercial Property",
      steps: [
        { label: "Plumbing Alteration", trade: "plumbing" },
        { label: "Utility Modification", trade: "plumbing" },
        { label: "Surface Restoration", trade: "finishing" },
        { label: "Interior / Exterior Painting", trade: "finishing" },
      ],
    },
  ] as { id: string; title: string; steps: { label: string; trade: Trade }[] }[],
};

export const systemStages = [
  {
    key: "planning",
    title: "Planning",
    text: "The existing condition, the requirement and the sequence of work are understood before anything is opened up.",
  },
  {
    key: "installation",
    title: "Installation",
    text: "Supply and drainage lines, fittings and connections are installed along a planned route.",
  },
  {
    key: "repair",
    title: "Repair",
    text: "Affected sections are exposed, defective components removed, and joints repaired or replaced and tested.",
  },
  {
    key: "finish",
    title: "Finish",
    text: "Once the source is rectified, surfaces are restored, prepared, primed and painted.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Process, categories, reasons, quality                               */
/* ------------------------------------------------------------------ */

export const execution = {
  eyebrow: "Execution Methodology",
  heading: "How We Execute",
  steps: [
    {
      title: "Site Inspection",
      text: "Understanding the existing condition and client's requirement.",
    },
    {
      title: "Scope Identification",
      text: "Determining the plumbing, repair, preparation and painting activities required.",
    },
    {
      title: "Work Planning",
      text: "Planning manpower, materials, tools and sequence of work.",
    },
    {
      title: "Execution",
      text: "Carrying out the work with appropriate workmanship and safety practices.",
    },
    {
      title: "Testing & Inspection",
      text: "Plumbing installations are checked for proper functioning and leakage wherever applicable.",
    },
    {
      title: "Finishing",
      text: "Painting and associated finishing works are completed after necessary surface preparation.",
    },
    {
      title: "Final Handover",
      text: "The completed work area is inspected and handed over to the client.",
    },
  ],
};

export const categories = {
  eyebrow: "Service Categories",
  heading: "Service Categories",
  groups: [
    {
      title: "Plumbing",
      prefix: "P",
      rows: [
        { name: "Plumbing", scope: "New installation, alteration, repair & maintenance" },
        { name: "Water Supply", scope: "CPVC, UPVC, PVC, GI and related piping" },
        { name: "Drainage", scope: "Soil, waste, rainwater and drainage lines" },
        { name: "Sanitary", scope: "Bathroom, toilet and kitchen fittings" },
        { name: "Water Tanks", scope: "Tank plumbing, inlet/outlet, overflow & fittings" },
        { name: "Pumps", scope: "Installation, connections, replacement & maintenance" },
        { name: "Leakage", scope: "Plumbing leakage identification & rectification" },
      ],
    },
    {
      title: "Painting & Maintenance",
      prefix: "F",
      rows: [
        { name: "Interior Painting", scope: "Residential, commercial & institutional" },
        { name: "Exterior Painting", scope: "Buildings, walls, parapets & service areas" },
        { name: "Decorative Painting", scope: "Texture & designer finishes" },
        { name: "Metal Painting", scope: "Gates, grills, railings, pipes & metal surfaces" },
        { name: "Wood Painting", scope: "Doors, frames, panels & suitable wooden surfaces" },
        { name: "Maintenance", scope: "Plumbing & painting maintenance requirements" },
      ],
    },
  ],
};

export const reasons = {
  eyebrow: "Why Choose Us",
  heading: ["Why Work With", "M.E. Civil Services"],
  items: [
    {
      title: "Comprehensive Services",
      text: "Plumbing and painting requirements handled through one service provider.",
    },
    {
      title: "Practical Site Execution",
      text: "Focus on proper preparation and systematic execution.",
    },
    {
      title: "Quality Workmanship",
      text: "Attention to installation, repair and finishing details.",
    },
    {
      title: "Suitable Materials",
      text: "Material selection based on application and site requirements.",
    },
    {
      title: "Timely Coordination",
      text: "Planned execution to minimize unnecessary disruption to occupants or operations.",
    },
    {
      title: "Repair-Oriented Approach",
      text: "Focus on identifying and addressing the underlying issue rather than only treating visible symptoms.",
    },
    {
      title: "Residential to Commercial",
      text: "Services adaptable to homes, offices, shops, buildings, institutions and other properties.",
    },
    {
      title: "Client-Focused Service",
      text: "Clear scope understanding and coordination with the client before execution.",
    },
  ],
};

export const quality = {
  eyebrow: "Quality Approach",
  heading: "Quality Approach",
  stages: [
    "Inspection",
    "Correct Diagnosis",
    "Proper Material Selection",
    "Skilled Execution",
    "Testing / Inspection",
    "Finishing",
    "Client Handover",
  ],
  closing:
    "The objective is not merely to complete the work, but to deliver a service that is functional, neat, durable and suitable for the intended application.",
};

export const cta = {
  heading: ["Have a Property That", "Needs Attention?"],
  body: "From plumbing installation and leakage repair to complete painting and finishing works, M.E. Civil Services provides coordinated solutions for residential, commercial and maintenance requirements.",
};

/** Options for the service request composer (drawn from the service scope above). */
export const requestOptions = {
  services: [
    "Plumbing",
    "Water Supply",
    "Drainage",
    "Sanitary",
    "Water Tanks",
    "Pumps",
    "Leakage",
    "Interior Painting",
    "Exterior Painting",
    "Decorative Painting",
    "Metal Painting",
    "Wood Painting",
    "Maintenance",
  ],
  property: ["Residential", "Commercial", "Institutional", "Industrial", "Maintenance"],
};
