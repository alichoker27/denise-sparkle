import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { assets } from "@/lib/assets";

export function Hero() {
  return (
    <section className="relative w-full min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* 
        Background Image 
        Note: object-right ensures the product composition stays visible on the right side
      */}
      <div className="absolute inset-0 z-0">
        <Image
          src={assets.hero.background}
          alt="Denise Sparkle natural beauty products"
          fill
          priority
          className="object-cover object-right lg:object-center"
        />
        {/* Optional: Subtle gradient to ensure text is readable over the left side of the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/30 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container-site w-full">
        <div className="max-w-xl flex flex-col gap-4 pt-12 pb-24">
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display text-ink leading-[1.1] tracking-tight">
            NATURAL BEAUTY,
          </h1>
          
          <p className="script-accent text-6xl md:text-7xl lg:text-8xl -mt-4 ml-4">
            Sparkling You
          </p>
          
          <p className="text-lg text-ink-soft mt-4 max-w-sm leading-relaxed">
            Pure. Natural. Effective.
            <br />
            Care that brings out your natural glow.
          </p>

          <div className="mt-8">
            <Button href="/shop" size="lg" className="pr-6">
              SHOP NOW
              {/* Arrow SVG */}
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
}