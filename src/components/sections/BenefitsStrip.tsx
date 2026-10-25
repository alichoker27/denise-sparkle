import { LeafIcon, RabbitIcon, ShieldIcon, TruckIcon, GiftIcon } from "@/components/icons/Icons";
import { Container } from "@/components/layout/Container";

const benefits = [
  { icon: LeafIcon, title: "NATURAL & ORGANIC", subtitle: "Ingredients" },
  { icon: RabbitIcon, title: "CRUELTY FREE", subtitle: "Not tested on animals" },
  { icon: ShieldIcon, title: "SAFE & EFFECTIVE", subtitle: "For all skin types" },
  { icon: TruckIcon, title: "FAST DELIVERY", subtitle: "Across Lebanon" },
  { icon: GiftIcon, title: "CUSTOMER CARE", subtitle: "We're here for you" },
];

export function BenefitsStrip() {
  return (
    <section className="relative z-20 -mt-10 md:-mt-14 mb-16">
      <Container>
        <div className="bg-white/95 backdrop-blur-md rounded-[2rem] shadow-soft border border-border/50 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-8 gap-x-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="flex items-center gap-3 justify-center md:justify-start lg:justify-center"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center text-rose-500">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-wider text-ink leading-tight">
                      {benefit.title}
                    </span>
                    <span className="text-xs text-ink-muted mt-0.5">
                      {benefit.subtitle}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}