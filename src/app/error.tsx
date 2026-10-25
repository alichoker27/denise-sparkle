"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (like Sentry or Vercel logs) in production
    console.error("Storefront Error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-surface-soft">
      <div className="w-20 h-20 bg-blush-100 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-rose-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z" />
        </svg>
      </div>
      <h2 className="text-3xl font-display text-ink mb-4">Oops! Something went wrong.</h2>
      <p className="text-ink-soft max-w-md mx-auto mb-8">
        We are having a little trouble loading this page. Please check your internet connection and try again.
      </p>
      <Button onClick={() => reset()} size="lg">
        TRY AGAIN
      </Button>
    </div>
  );
}