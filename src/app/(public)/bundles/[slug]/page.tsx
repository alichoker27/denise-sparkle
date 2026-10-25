import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getBundleBySlug } from "@/lib/queries";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

// 1. This is the main page component. It renders the static shell instantly.
export default function BundleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="py-12 md:py-20 bg-surface-soft min-h-screen">
      <Container>
        {/* Breadcrumbs (Static, loads instantly) */}
        <nav className="flex text-sm text-ink-muted mb-8">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:text-ink transition-colors">Collections</Link>
          <span className="mx-2">/</span>
          <span className="text-ink font-medium">Bundle Details</span>
        </nav>

        {/* 2. The Suspense boundary catches the dynamic data access */}
        <Suspense fallback={<BundleSkeleton />}>
          <BundleContent params={params} />
        </Suspense>
      </Container>
    </main>
  );
}

// 3. The actual data-fetching component
async function BundleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const bundle = await getBundleBySlug(slug);

  if (!bundle) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      {/* Left Column: Image */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-blush-100 border border-border shadow-soft">
        {bundle.imageUrl ? (
          <Image
            src={bundle.imageUrl}
            alt={bundle.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted">
            Image Coming Soon
          </div>
        )}
      </div>

      {/* Right Column: Details */}
      <div className="flex flex-col">
        <span className="text-xs font-bold text-blush-500 tracking-widest uppercase mb-2">
          Exclusive Bundle
        </span>
        <h1 className="text-4xl md:text-5xl text-ink mb-4 font-display">
          {bundle.name}
        </h1>
        <p className="text-2xl font-semibold text-ink mb-6">
          {formatPrice(bundle.priceCents)}
        </p>

        {bundle.description && (
          <p className="text-ink-soft leading-relaxed mb-8">
            {bundle.description}
          </p>
        )}

        {/* What's Inside */}
        <div className="bg-white rounded-2xl p-6 border border-border mb-8 shadow-sm">
          <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-4">
            What is Inside
          </h3>
          <ul className="space-y-4">
            {bundle.items.map((item) => (
              <li key={item.id} className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-blush-50 flex-shrink-0 border border-border/50">
                  {item.product.images[0] ? (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.product.slug}`} className="font-medium text-ink hover:text-rose-500 transition-colors">
                    {item.product.name}
                  </Link>
                  <p className="text-sm text-ink-muted">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-semibold text-ink">
                  {formatPrice(item.product.priceCents)}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Add to Cart Placeholder */}
        <div className="mt-auto pt-6 border-t border-border">
          <Button
            size="lg"
            className="w-full text-lg shadow-hover opacity-50 cursor-not-allowed"
            disabled
          >
            ADD BUNDLE TO CART (Coming Soon)
          </Button>
          <p className="text-xs text-center text-ink-muted mt-4">
            WhatsApp ordering will be available in the next phase.
          </p>
        </div>
      </div>
    </div>
  );
}

// 4. A simple loading skeleton
function BundleSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 animate-pulse">
      <div className="aspect-square w-full rounded-3xl bg-blush-100" />
      <div className="space-y-4 pt-4">
        <div className="h-4 w-1/4 bg-blush-100 rounded" />
        <div className="h-10 w-3/4 bg-blush-100 rounded" />
        <div className="h-6 w-1/4 bg-blush-100 rounded" />
        <div className="h-20 w-full bg-blush-100 rounded mt-6" />
      </div>
    </div>
  );
}