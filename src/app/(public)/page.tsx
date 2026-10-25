import { Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { BenefitsStrip } from "@/components/sections/BenefitsStrip";
import { FirstPurchaseBanner } from "@/components/sections/FirstPurchaseBanner";
import { AboutSnippet } from "@/components/sections/AboutSnippet";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import {
  listFeaturedProducts,
  getActiveFirstPurchaseOffer,
} from "@/lib/queries";

// ─── Dynamic sections (use io() internally, must be inside <Suspense>) ───────

async function FeaturedProductsSection() {
  const products = await listFeaturedProducts();
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-3xl md:text-4xl text-ink">Featured Products</h2>
          <p className="text-ink-muted mt-2">Our most loved essentials.</p>
        </div>
        <Button href="/shop" variant="outline" className="hidden sm:flex">
          VIEW ALL
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:hidden">
        <Button href="/shop" variant="outline">
          VIEW ALL
        </Button>
      </div>
    </section>
  );
}

async function FirstPurchaseBannerSection() {
  const offer = await getActiveFirstPurchaseOffer();
  return <FirstPurchaseBanner offer={offer} />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="pb-24">
      {/* Static shell — rendered immediately, no dynamic data */}
      <Hero />
      <BenefitsStrip />

      <div className="container-site space-y-24">

        {/* Dynamic: streams in behind a Suspense boundary */}
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-72 rounded-2xl bg-blush-50 animate-pulse border border-border/30" />
            ))}
          </div>
        }>
          <FeaturedProductsSection />
        </Suspense>

        {/* Dynamic: streams in behind a Suspense boundary */}
        <Suspense fallback={null}>
          <FirstPurchaseBannerSection />
        </Suspense>

        {/* Static: no dynamic data */}
        <AboutSnippet />

      </div>
    </main>
  );
}