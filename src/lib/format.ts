/** Convert integer cents to "$X.XX" */
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/** Percentage label: 20 → "20% off" */
export function formatDiscountPercent(percentage: number): string {
  return `${percentage}% off`;
}

/** Apply a discount in cents, return the final price in cents */
export function applyPercentage(cents: number, percentage: number): number {
  return Math.round(cents * (1 - percentage / 100));
}

/** Convert a string to a URL-safe slug */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}