import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { ProductWithRelations } from "@/types";

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  
  // Format scents (e.g., "Oud, Rose")
  const scentSummary = product.scents.length > 0 
    ? product.scents.map((s) => s.scent.name).slice(0, 2).join(", ") + (product.scents.length > 2 ? "..." : "")
    : null;

  return (
    <Link 
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-card transition-all border border-border/50"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full rounded-xl bg-blush-50 overflow-hidden mb-4">
        {primaryImage ? (
          <Image
            src={primaryImage.url}
            alt={primaryImage.altText || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ink-muted text-sm">
            No Image
          </div>
        )}
        
        {!product.isAvailable && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
            <span className="bg-ink text-white px-4 py-1 rounded-pill text-xs font-semibold tracking-wider">
              SOLD OUT
            </span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1">
        <span className="text-[10px] font-bold text-blush-500 tracking-wider uppercase mb-1">
          {product.category.name}
        </span>
        <h3 className="font-display text-lg text-ink leading-tight mb-1 group-hover:text-rose-500 transition-colors">
          {product.name}
        </h3>
        
        {scentSummary && (
          <p className="text-xs text-ink-muted mb-3">{scentSummary}</p>
        )}
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="font-semibold text-ink">
            {formatPrice(product.priceCents)}
          </span>
          <span className="text-xs text-rose-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}