import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { BundleWithItems } from "@/types";

interface BundleCardProps {
  bundle: BundleWithItems;
}

export function BundleCard({ bundle }: BundleCardProps) {
  return (
    <Link 
      href={`/bundles/${bundle.slug}`}
      className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-card transition-all border border-border/50"
    >
      {/* Image Side */}
      <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto md:h-full bg-blush-50">
        {bundle.imageUrl ? (
          <Image
            src={bundle.imageUrl}
            alt={bundle.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted bg-blush-100">
            {/* Placeholder icon if no image */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mb-2 opacity-50">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
            <span className="text-sm">Image Coming Soon</span>
          </div>
        )}
      </div>

      {/* Details Side */}
      <div className="flex flex-col p-8 md:w-1/2 justify-center">
        <span className="text-xs font-bold text-blush-500 tracking-widest uppercase mb-2">
          Exclusive Bundle
        </span>
        <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight mb-3 group-hover:text-rose-500 transition-colors">
          {bundle.name}
        </h3>
        
        {bundle.description && (
          <p className="text-ink-soft text-sm mb-6 line-clamp-2">
            {bundle.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <span className="font-semibold text-ink text-xl">
            {formatPrice(bundle.priceCents)}
          </span>
          <span className="text-xs text-rose-500 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Bundle <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </div>
    </Link>
  );
}