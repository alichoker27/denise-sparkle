export const siteConfig = {
  name: "Denise Sparkle",
  tagline: "Natural beauty, sparkling you",
  description:
    "Natural, effective beauty care created to bring out your natural glow.",
  email: "donizkhatib55@gmail.com",
  currency: "USD",
  currencySymbol: "$",
  hero: {
    src: "/hero/hero-background.png",
    alt: "Denise Sparkle beauty products arranged on a soft pink background",
  },
} as const;

/**
 * Shared public asset path for the approved landing-page hero artwork.
 * Keep this name stable so the hero component does not depend on a local
 * Windows path or duplicate the asset URL.
 */
export const HeroBackground = siteConfig.hero.src;

export const storefrontNavigation = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
