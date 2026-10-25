import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/layout/Container";
import { listPublishedProducts, listActiveCategories } from "@/lib/queries";
import { cn } from "@/lib/cn";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  // Await searchParams for Next.js 15/16
  const params = await searchParams;
  const activeCategory = params.category;
  const searchQuery = params.q;

  // Fetch data in parallel
  const [categories, allProducts] = await Promise.all([
    listActiveCategories(),
    listPublishedProducts(),
  ]);

  // Filter products based on URL params (Server-Side filtering)
  let filteredProducts = allProducts;

  if (activeCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category.slug === activeCategory
    );
  }

  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
    );
  }

  return (
    <main className="py-12 bg-surface-soft min-h-screen">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl text-ink mb-4">Shop All</h1>
            <p className="text-ink-soft max-w-xl">
              Discover our full collection of natural, handcrafted beauty essentials.
            </p>
          </div>
          
          {/* Search Bar */}
          <form className="w-full md:w-72 relative" action="/shop" method="GET">
            {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
            <input
              type="search"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search products..."
              className="w-full rounded-pill border border-border-strong bg-white px-5 py-3 text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 transition-colors"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted hover:text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Categories Navigation */}
        <div className="flex overflow-x-auto pb-4 mb-8 -mx-4 px-4 md:mx-0 md:px-0 hide-scrollbar gap-2">
          <Link
            href="/shop"
            className={cn(
              "whitespace-nowrap px-6 py-2.5 rounded-pill text-sm font-medium transition-colors border",
              !activeCategory
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink-soft border-border-strong hover:border-ink hover:text-ink"
            )}
          >
            All Products
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}${searchQuery ? `&q=${searchQuery}` : ""}`}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-pill text-sm font-medium transition-colors border",
                activeCategory === cat.slug
                  ? "bg-ink text-white border-ink"
                  : "bg-white text-ink-soft border-border-strong hover:border-ink hover:text-ink"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-white rounded-3xl border border-border">
            <h2 className="text-2xl text-ink mb-2">No products found</h2>
            <p className="text-ink-muted mb-6">
              We could not find any products matching your search.
            </p>
            <Link href="/shop" className="text-rose-500 font-medium hover:underline">
              Clear all filters
            </Link>
          </div>
        )}
      </Container>
    </main>
  );
}