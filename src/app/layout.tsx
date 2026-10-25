import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// 1. Playfair Display (Headings)
const playfair = localFont({
  src: "./fonts/PlayfairDisplay.woff2.ttf",
  variable: "--font-playfair",
  display: "swap",
});

// 2. Inter (Body)
const inter = localFont({
  src: "./fonts/Inter.woff2.ttf",
  variable: "--font-inter",
  display: "swap",
});

// 3. Great Vibes (Script Accent)
const greatVibes = localFont({
  src: "./fonts/GreatVibes.woff2.ttf",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Denise Sparkle — Natural Beauty",
  description: "Pure. Natural. Effective. Handcrafted beauty care.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}