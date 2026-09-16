/**
 * Image library.
 *
 * Every photograph on the site is referenced from here, so imagery can be
 * replaced in one place. The current set is representative editorial
 * photography from Unsplash (free licence, commercial use permitted) and does
 * NOT depict M.E. Civil Services projects.
 *
 * To use the company's own photography: drop files into /public/images and
 * change `src` to a local path, e.g. "/images/bathroom-01.jpg". Local files
 * are optimised by next/image (AVIF/WebP) automatically.
 */
export type Media = {
  src: string;
  alt: string;
  /** Focal point used for object-position. */
  focus?: string;
};

const u = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const media = {
  introBathroom: {
    src: u("1763485955998-a9284d042d50"),
    alt: "Stone-finished washroom with wall-mounted black tapware, a basin counter and a recessed mirror",
    focus: "50% 55%",
  },
  plumbingValves: {
    src: u("1507337272725-eec743fbdc31"),
    alt: "Pipe runs, bends and fittings mounted along a dark concrete service wall",
    focus: "50% 50%",
  },
  plumbingDark: {
    src: u("1646009445351-b8192e095f3a"),
    alt: "Parallel pipe runs with bends fixed neatly to a wall",
    focus: "50% 50%",
  },
  concealedCopper: {
    src: u("1694827893591-af9b80361599"),
    alt: "Two pipelines running vertically through an opened wall chase",
    focus: "50% 40%",
  },
  sanitaryMarble: {
    src: u("1756079664354-34944e001f6d"),
    alt: "Marble vanity with twin basins and concealed wall-mounted mixers",
    focus: "38% 55%",
  },
  industrialPipes: {
    src: u("1538474705339-e87de81450e8"),
    alt: "Monochrome view of vertical pipe risers and flanged bends in a plant room",
    focus: "50% 50%",
  },
  leakDrop: {
    src: u("1596394723269-b2cbca4e6313"),
    alt: "Close view of water escaping from a corroded pipe joint",
    focus: "45% 50%",
  },
  painterLadder: {
    src: u("1717281234297-3def5ae3eee1"),
    alt: "Painter on a step ladder applying a coat to an interior wall, in black and white",
    focus: "50% 40%",
  },
  exteriorRope: {
    src: u("1745665777586-09381ba528d6"),
    alt: "Painter suspended on ropes finishing a tall white exterior wall",
    focus: "35% 40%",
  },
  paintRoller: {
    src: u("1562259949-e8e7689d7828"),
    alt: "Paint roller laying a fresh coat over a prepared white surface",
    focus: "50% 50%",
  },
  trowelConcrete: {
    src: u("1708894462826-ba3fa93b41b7"),
    alt: "Smooth grey plaster surface with subtle trowel marks",
    focus: "50% 50%",
  },
  textureShadow: {
    src: u("1766418678521-581da1b73649"),
    alt: "Textured wall finish meeting a smooth surface under raking daylight",
    focus: "50% 50%",
  },
  textureLight: {
    src: u("1769441439052-5a0000717349"),
    alt: "Diagonal bands of light across a fine grey textured wall",
    focus: "50% 50%",
  },
  textureWarm: {
    src: u("1785850564762-e046c16fbcf9"),
    alt: "Warm-toned textured wall lit by a window-shaped patch of light",
    focus: "50% 45%",
  },
  twoTone: {
    src: u("1780123942992-bb7a449452c4"),
    alt: "Two-tone painted wall divided by a crisp vertical line",
    focus: "50% 50%",
  },
  mirrorPlaster: {
    src: u("1784601680693-dcee08d57fbe"),
    alt: "Backlit round mirror on a layered decorative plaster wall",
    focus: "55% 50%",
  },
  plasterBlue: {
    src: u("1610422218546-42b7f1f84dbd"),
    alt: "Layered blue-grey decorative plaster finish",
    focus: "50% 50%",
  },
  railing: {
    src: u("1599307169204-4176df0cdfe4"),
    alt: "Concrete staircase with a slim black metal handrail against a grey wall",
    focus: "60% 50%",
  },
  woodDoor: {
    src: u("1542020383883-6c6b2a343807"),
    alt: "Close view of a dark timber door with panel joints",
    focus: "50% 50%",
  },
  facadeGrid: {
    src: u("1567505477286-9c7269119db7"),
    alt: "Rhythmic white exterior facade with repeated window openings",
    focus: "50% 50%",
  },
  facadeUp: {
    src: u("1432297984334-707d34c4163a"),
    alt: "Looking up a painted residential building with projecting balconies",
    focus: "50% 50%",
  },
} satisfies Record<string, Media>;

export type MediaKey = keyof typeof media;
