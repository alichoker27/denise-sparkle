import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* DS Monogram SVG */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-10 h-10 text-blush-500 transition-transform group-hover:scale-105"
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3"
      >
        {/* The "D" */}
        <path d="M 30 20 L 30 80 C 65 80 75 65 75 50 C 75 35 65 20 30 20 Z" strokeLinecap="round" strokeLinejoin="round" />
        {/* The "S" overlapping */}
        <path d="M 65 35 C 60 25 40 25 40 45 C 40 60 60 60 60 75 C 60 90 40 90 35 80" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400" />
        {/* Sparkles */}
        <path d="M 80 20 L 82 28 L 90 30 L 82 32 L 80 40 L 78 32 L 70 30 L 78 28 Z" fill="currentColor" className="text-rose-500" />
        <path d="M 20 60 L 21 64 L 25 65 L 21 66 L 20 70 L 19 66 L 15 65 L 19 64 Z" fill="currentColor" className="text-rose-500" />
      </svg>
      
      <div className="flex flex-col justify-center">
        <span className="font-display text-xl md:text-2xl font-semibold tracking-widest text-ink leading-none">
          DENISE SPARKLE
        </span>
        <span className="text-[0.6rem] md:text-xs uppercase tracking-[0.2em] text-ink-muted mt-1">
          Natural Beauty, Sparkling You
        </span>
      </div>
    </Link>
  );
}