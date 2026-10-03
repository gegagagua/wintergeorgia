import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { stepImages } from "@/lib/images";

const steps = [
  {
    n: "01",
    title: "Pick your route",
    body: "Ten operating routes to every Georgian ski area. Fixed price shown before you enter card details.",
    img: stepImages.route,
  },
  {
    n: "02",
    title: "Choose the vehicle",
    body: "Shared seat, sedan, minivan or 4x4 SUV — winter tyres and chains on every vehicle, ski rack on request.",
    img: stepImages.vehicle,
  },
  {
    n: "03",
    title: "Meet your driver",
    body: "Driver name, phone, vehicle and plate arrive by WhatsApp 12 hours before pickup. Meet-and-greet at arrivals.",
    img: stepImages.driver,
  },
];

/**
 * Three-step flow with real photography and a subtle image zoom on hover.
 */
export function HowItWorks() {
  return (
    <section className="site-container py-16">
      <SectionHeader kicker="How it works" title="From booking to the base station" />

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <article
            key={s.n}
            className="group gw-lift relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={s.img.src}
                alt={s.img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="gw-zoom object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25" />
              <span className="absolute left-4 top-4 rounded-pill border border-white/25 bg-black/45 px-2.5 py-0.5 text-small tabular text-snow backdrop-blur">
                {s.n}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-[22px] leading-[28px]">{s.title}</h3>
              <p className="mt-2 text-small text-ink-muted">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
