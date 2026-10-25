import { Container } from "@/components/layout/Container";

export default function Loading() {
  return (
    <Container className="py-20 min-h-[70vh] flex flex-col items-center justify-center">
      {/* A soft, elegant loading animation */}
      <div className="w-12 h-12 border-4 border-blush-200 border-t-rose-500 rounded-full animate-spin mb-6" />
      <p className="text-ink-muted font-medium tracking-widest text-sm uppercase">
        Loading Denise Sparkle...
      </p>
    </Container>
  );
}