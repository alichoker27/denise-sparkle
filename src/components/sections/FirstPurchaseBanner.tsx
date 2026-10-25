import { FirstPurchaseOffer } from "@/generated/prisma/client";

export function FirstPurchaseBanner({ offer }: { offer: FirstPurchaseOffer | null }) {
  if (!offer || !offer.isEnabled) return null;

  return (
    <div className="bg-blush-100 rounded-3xl p-8 md:p-12 text-center border border-blush-200 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blush-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-50" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 opacity-50" />
      
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl text-ink mb-4">
          {offer.message}
        </h2>
        <p className="text-ink-soft">
          Select your favorites and order via WhatsApp. Denise will manually confirm your eligibility before payment.
        </p>
      </div>
    </div>
  );
}