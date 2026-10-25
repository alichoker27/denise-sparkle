import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "About Us",
  description: "Discover the story behind Denise Sparkle and our handcrafted natural beauty products.",
};

export default function AboutPage() {
  return (
    <main className="bg-surface-soft min-h-screen pb-24">
      
      {/* Hero Section */}
      <section className="bg-blush-100 py-24 md:py-32 text-center px-4">
        <Container className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-display text-ink mb-6">
            Our Story
          </h1>
          <p className="script-accent text-4xl md:text-5xl">
            Handcrafted with Love
          </p>
        </Container>
      </section>

      <Container className="mt-16 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          {/* Text Side */}
          <div className="space-y-6 text-lg text-ink-soft leading-relaxed">
            <h2 className="text-3xl md:text-4xl text-ink font-display mb-6">
              Pure. Natural. Effective.
            </h2>
            <p>
              Denise Sparkle was born from a simple belief: that true beauty comes from nature. 
              We believe that caring for your skin and hair shouldn &apos;t require harsh chemicals or 
              complicated routines. It should be a moment of joy, a spark of confidence in your everyday life.
            </p>
            <p>
              Every product in our collection is carefully handcrafted in Lebanon. From our soothing 
              Hair Mists to our deeply nourishing Body Butters, we source only the highest quality 
              natural ingredients. We take the time to blend each batch with intention, ensuring that 
              every bottle, jar, and bar delivers exactly what your skin needs.
            </p>
            <p>
              Whether you are looking to restore your natural glow, pamper yourself after a long day, 
              or find the perfect gift for a loved one, Denise Sparkle is here to remind you that you 
              are beautiful, powerful, and naturally sparkling.
            </p>
          </div>

          {/* Image Side */}
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card bg-blush-200">
            {/* Replace with an actual image of Denise or her workspace later */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0c0-2.5-2-5-5-5-1.5 0-2.5.5-3 1 0 4 2 8 8 12Zm0 0c0-2.5 2-5 5-5 1.5 0 2.5.5 3 1 0 4-2 8-8 12Z" />
              </svg>
              <p>Denise &apos;s Workshop<br/>Image Coming Soon</p>
            </div>
          </div>

        </div>
      </Container>

      {/* Values Section */}
      <Container className="mt-24 md:mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
            <h3 className="text-xl font-display text-ink mb-3">100% Natural</h3>
            <p className="text-sm text-ink-muted">We use plant-based ingredients that are gentle on your skin and the planet.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
            <h3 className="text-xl font-display text-ink mb-3">Cruelty Free</h3>
            <p className="text-sm text-ink-muted">We never test our products on animals. Beauty should be kind to all living things.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-border/50">
            <h3 className="text-xl font-display text-ink mb-3">Handmade</h3>
            <p className="text-sm text-ink-muted">Every batch is crafted by hand with love, ensuring premium quality in every jar.</p>
          </div>
        </div>
      </Container>

      {/* CTA Section */}
      <Container className="mt-24 text-center">
        <h2 className="text-3xl font-display text-ink mb-6">Ready to Sparkle?</h2>
        <Button href="/shop" size="lg">
          EXPLORE THE COLLECTION
        </Button>
      </Container>

    </main>
  );
}