"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function ScentSelector({ scents }: { scents: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  if (!scents || scents.length === 0) return null;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-semibold tracking-wider text-ink uppercase mb-3">
        Choose a Scent
      </h3>
      <div className="flex flex-wrap gap-2">
        {scents.map((scent) => (
          <button
            key={scent}
            onClick={() => setSelected(scent)}
            className={cn(
              "px-4 py-2 rounded-pill text-sm transition-all border focus-ring",
              selected === scent
                ? "bg-ink text-white border-ink shadow-soft"
                : "bg-white text-ink-soft border-border-strong hover:border-ink hover:text-ink"
            )}
          >
            {scent}
          </button>
        ))}
      </div>
    </div>
  );
}