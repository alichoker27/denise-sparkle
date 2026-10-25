export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-ink text-white px-4 py-2 rounded-md shadow-lg focus-ring"
    >
      Skip to main content
    </a>
  );
}