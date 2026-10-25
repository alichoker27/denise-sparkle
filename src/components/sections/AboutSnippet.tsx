import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function AboutSnippet() {
  return (
    <section className="py-16 md:py-24 bg-surface-cream rounded-3xl mx-4 md:mx-0">
      <div className="container-site max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl text-ink mb-6">
          Handcrafted with Love
        </h2>
        <p className="text-lg text-ink-soft mb-8 leading-relaxed max-w-2xl mx-auto">
          At Denise Sparkle, we believe that true beauty comes from nature. 
          Every product is carefully handcrafted in Lebanon with pure, effective 
          ingredients designed to bring out your natural glow.
        </p>
        <Button href="/about" variant="outline">
          OUR STORY
        </Button>
      </div>
    </section>
  );
}