import Image from "next/image";
import { Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Price } from "@/components/ui/price";
import { LinkButton } from "@/components/ui/button";
import { fleetImages } from "@/lib/images";
import { cn } from "@/lib/cn";
import type { VehicleClass } from "@/content/types";

type FleetItem = {
  type: VehicleClass;
  name: string;
  kicker: string;
  fromGel: number;
  fromLabel: string;
  paxLine: string;
  features: string[];
  featured?: boolean;
};

const fleet: FleetItem[] = [
  {
    type: "shared",
    name: "Shared seat",
    kicker: "Solo, budget",
    fromGel: 30,
    fromLabel: "per seat",
    paxLine: "1 seat · shared vehicle",
    features: ["Airport meet & greet", "WhatsApp confirmation", "Fixed departure times"],
  },
  {
    type: "sedan",
    name: "Sedan",
    kicker: "Couples, city runs",
    fromGel: 160,
    fromLabel: "flat",
    paxLine: "Up to 3 passengers · 2 bags",
    features: ["Winter tyres + chains", "English-speaking driver", "Child seat on request"],
    featured: true,
  },
  {
    type: "minivan",
    name: "Minivan",
    kicker: "Group, family, gear",
    fromGel: 240,
    fromLabel: "flat",
    paxLine: "Up to 7 passengers · 7 bags",
    features: ["Ski/snowboard rack", "Winter tyres + chains", "Two child seats available"],
  },
  {
    type: "suv4x4",
    name: "4x4 SUV",
    kicker: "Backcountry, storm days",
    fromGel: 300,
    fromLabel: "flat",
    paxLine: "Up to 5 passengers · 5 bags",
    features: ["Full 4x4 with chains", "Guide-driver for Kazbegi", "Insurance on every leg"],
  },
];

export function FleetShowcase() {
  return (
    <section className="site-container py-16">
      <SectionHeader
        kicker="Fleet"
        title="Every vehicle winter-ready"
        action={
          <LinkButton href="/transfers" variant="ghost" size="sm">
            All routes →
          </LinkButton>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {fleet.map((f) => (
          <article
            key={f.type}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-lg border bg-surface transition-shadow duration-150 hover:shadow-[var(--shadow-interactive)]",
              f.featured ? "border-accent/50" : "border-line",
            )}
          >
            {f.featured ? (
              <span className="absolute right-3 top-3 rounded-pill bg-accent/15 px-2 py-0.5 text-small text-accent">
                Most booked
              </span>
            ) : null}

            <div className="relative h-40 overflow-hidden bg-surface-raised">
              <Image
                src={fleetImages[f.type].src}
                alt={fleetImages[f.type].alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="text-small text-primary">{f.kicker}</p>
              <h3 className="mt-1 font-serif text-[22px] leading-[28px]">{f.name}</h3>
              <p className="mt-1 text-small text-ink-muted">{f.paxLine}</p>

              <ul className="mt-4 space-y-2 text-small text-ink">
                {f.features.map((t) => (
                  <li key={t} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-baseline justify-between border-t border-line pt-4">
                <div>
                  <Price gel={f.fromGel} from />
                  <p className="text-small text-ink-muted">{f.fromLabel}</p>
                </div>
                <LinkButton href="/transfers" variant="outline" size="sm">
                  See routes →
                </LinkButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
