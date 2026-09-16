/** Shared motion language — long, decelerating eases; nothing bounces. */
export const ease = {
  expo: [0.19, 1, 0.22, 1] as const,
  quart: [0.76, 0, 0.24, 1] as const,
  out: [0.22, 1, 0.36, 1] as const,
};

export const duration = {
  fast: 0.45,
  base: 0.9,
  slow: 1.25,
};
