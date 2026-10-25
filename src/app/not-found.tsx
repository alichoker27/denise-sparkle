import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-surface-soft">
      <h1 className="text-8xl font-display text-blush-300 mb-4">404</h1>
      <h2 className="text-3xl text-ink mb-4">Page Not Found</h2>
      <p className="text-ink-soft mb-8 max-w-md">
        The product or page you are looking for does not exist or has been moved.
      </p>
      <Link href="/shop">
        <Button size="lg">Back to Shop</Button>
      </Link>
    </main>
  );
}