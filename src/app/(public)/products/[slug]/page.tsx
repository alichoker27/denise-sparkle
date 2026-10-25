import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProductBySlug, listPublishedProductsByCategory } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { ScentSelector } from "@/components/product/ScentSelector";
import { ProductCard } from "@/components/product/ProductCard";

// ─── Async data-fetching component (streams behind Suspense) ──────────────────

async function ProductDetailContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch the product
  const product = await getProductBySlug(slug);

  // If no product is found (or it's a DRAFT), trigger the 404 page
  if (!product) {
    notFound();
  }

  // Fetch related products (from the same category)
  const relatedProducts = (
    await listPublishedProductsByCategory(product.category.slug)
  )
    .filter((p) => p.id !== product.id)
    .slice(0, 4); // Show max 4 related products

  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const scentNames = product.scents.map((s) => s.scent.name);

  return (
    <Container>
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-ink-muted mb-8">
        <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/shop?category=${product.category.slug}`} className="hover:text-ink transition-colors">
          {product.category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        
        {/* Left Column: Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-white border border-border shadow-soft">
            {primaryImage ? (
              <Image
                src={primaryImage.url}
                alt={primaryImage.altText || product.name}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-ink-muted">
                No Image Available
              </div>
            )}
          </div>
          
          {/* Thumbnails (if multiple images exist) */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-white">
                  <Image src={img.url} alt="Thumbnail" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-blush-500 tracking-widest uppercase mb-2">
            {product.category.name}
          </span>
          <h1 className="text-4xl md:text-5xl text-ink mb-4 font-display">
            {product.name}
          </h1>
          
          <p className="text-2xl font-semibold text-ink mb-6">
            {formatPrice(product.priceCents)}
          </p>

          {product.description && (
            <p className="text-ink-soft leading-relaxed mb-8">
              {product.description}
            </p>
          )}

          {/* Scent Selector */}
          <ScentSelector scents={scentNames} />

          {/* Add to Cart Placeholder */}
          <div className="mt-10 pt-8 border-t border-border">
            <Button 
              size="lg" 
              className="w-full text-lg shadow-hover opacity-50 cursor-not-allowed"
              disabled
              title="Cart coming in a later phase"
            >
              {product.isAvailable ? "ADD TO CART (Coming Soon)" : "SOLD OUT"}
            </Button>
            <p className="text-xs text-center text-ink-muted mt-4">
              WhatsApp ordering will be available in the next phase.
            </p>
          </div>

          {/* Details Accordion / Lists */}
          <div className="mt-10 space-y-6">
            {product.benefits && (
              <div>
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Benefits</h3>
                <p className="text-sm text-ink-soft">{product.benefits}</p>
              </div>
            )}
            {product.ingredients && (
              <div>
                <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-2">Ingredients</h3>
                <p className="text-sm text-ink-soft">{product.ingredients}</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-border/60">
          <h2 className="text-3xl font-display text-ink mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function ProductDetailSkeleton() {
  return (
    <Container>
      <div className="h-4 w-48 rounded bg-blush-50 animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        <div className="aspect-square rounded-3xl bg-blush-50 animate-pulse border border-border/30" />
        <div className="space-y-4">
          <div className="h-4 w-24 rounded bg-blush-50 animate-pulse" />
          <div className="h-12 w-64 rounded-lg bg-blush-50 animate-pulse" />
          <div className="h-8 w-32 rounded bg-blush-50 animate-pulse" />
          <div className="h-24 w-full rounded-lg bg-blush-50 animate-pulse" />
          <div className="h-14 w-full rounded-pill bg-blush-50 animate-pulse mt-8" />
        </div>
      </div>
    </Container>
  );
}

// ─── Page (synchronous shell — Suspense defers the async work) ────────────────

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="py-12 md:py-20 bg-surface-soft min-h-screen">
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetailContent params={params} />
      </Suspense>
    </main>
  );
}