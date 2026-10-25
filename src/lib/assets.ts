/**
 * Central asset map.
 * Every public image used in the app must be referenced from here.
 * Never hardcode image paths inline in components.
 */
export const assets = {
  hero: {
    background: "/hero/hero-background.png",
  },
  brand: {
    // DS monogram is rendered as inline SVG in Block 3 — no file needed
    monogramSvg: true,
  },
} as const;

export type Assets = typeof assets;