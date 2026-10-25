import { listPublishedBundles } from "@/lib/queries";
import { Container } from "@/components/layout/Container";
import { BundleCard } from "@/components/bundle/BundleCard";
import { Suspense } from "react";

export const metadata = {
  title: "Collections & Bundles",
  description: "Discover our curated sets of natural beauty essentials.",
};

// ─── Async data‑fetching component ────────────────────────────────────────
async function CollectionsContent() {
  const bundles = await listPublishedBundles();

  return (
    <>
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl text-ink mb-4 font-display">Our Collections</h1>
        <p className="text-ink-soft">
          Save more when you bundle. Curated sets of our most‑loved products, designed to work perfectly together.
        </p>
      </div>

      {bundles.length > 0 ? (
        <div className="grid grid-cols-1 gap-8">
          {bundles.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-border">
          <h2 className="text-2xl text-ink mb-2">No bundles available yet</h2>
          <p className="text-ink-muted">Check back soon for our curated collections.</p>
        </div>
      )}
    </>
  );
}

// ─── Loading skeleton ───────────────────────────────────────────────────
function CollectionsSkeleton() {
  return (
    <Container>
      <div className="h-8 w-48 rounded bg-blush-50 animate-pulse mb-8" />
      <div className="space-y-4">
        <div className="h-4 w-3/4 rounded bg-blush-50 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-blush-50 animate-pulse" />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-40 rounded bg-blush-50 animate-pulse" />
        ))}
      </div>
    </Container>
  );
}

// ─── Page (sync) ────────────────────────────────────────────────────────
export default function CollectionsPage() {
  return (
    <main className="py-12 md:py-20 bg-surface-soft min-h-screen">
      <Suspense fallback={<CollectionsSkeleton />}>
        <CollectionsContent />
      </Suspense>
    </main>
  );
}