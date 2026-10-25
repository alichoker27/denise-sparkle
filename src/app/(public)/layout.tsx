import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipToContent } from "@/components/layout/SkipToContent";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-soft">
      
      {/* The invisible keyboard navigation button */}
      <SkipToContent />

      <Header />
      
      {/* Added id="main-content" so the Skip button knows where to jump */}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}