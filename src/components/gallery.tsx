import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/section-header";
import { LinkButton } from "@/components/ui/button";
import {
  SunsetRunScene,
  PowderMorningScene,
  NightLiftsScene,
  ChaletVillageScene,
  GondolaAerialScene,
  ApresSkiScene,
} from "./gallery-scenes";

/**
 * Bento gallery of moments from the season. Fully illustrated (no stock
 * photography), colour-rich, aspirational — the "why come here" surface.
 */

type Item = {
  title: string;
  meta: string;
  Scene: React.FC<{ className?: string }>;
  href: string;
  colSpan?: string;
  rowSpan?: string;
};

const items: Item[] = [
  {
    title: "Sunset run at Sadzele",
    meta: "Gudauri · March",
    Scene: SunsetRunScene,
    href: "/resorts/gudauri",
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Powder morning · Kudebi",
    meta: "Gudauri · February",
    Scene: PowderMorningScene,
    href: "/snow-report",
    colSpan: "md:col-span-1",
  },
  {
    title: "Night lifts at 25",
    meta: "Bakuriani · January",
    Scene: NightLiftsScene,
    href: "/resorts/bakuriani",
    colSpan: "md:col-span-1",
  },
  {
    title: "Chalet village · Mestia",
    meta: "Upper Svaneti",
    Scene: ChaletVillageScene,
    href: "/resorts/tetnuldi",
    colSpan: "md:col-span-1",
  },
  {
    title: "Gondola view · Tetnuldi",
    meta: "3,165 m top",
    Scene: GondolaAerialScene,
    href: "/resorts/tetnuldi",
    colSpan: "md:col-span-1",
  },
  {
    title: "Après at Black Bar",
    meta: "Gudauri base",
    Scene: ApresSkiScene,
    href: "/things-to-do/gudauri/gudauri-black-bar",
    colSpan: "md:col-span-2",
  },
];

export function Gallery() {
  return (
    <section className="site-container py-16">
      <SectionHeader
        kicker="Moments"
        title="What a day here looks like"
        action={
          <LinkButton href="/journal" variant="ghost" size="sm" arrow>
            Journal
          </LinkButton>
        }
      />

      <div className="grid auto-rows-[220px] grid-cols-1 gap-3 md:grid-cols-3">
        {items.map(({ title, meta, Scene, href, colSpan }) => (
          <Link
            key={title}
            href={href as never}
            className={`group relative overflow-hidden rounded-lg border border-line ${colSpan ?? ""}`}
          >
            <Scene className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-105" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-snow">
              <p className="text-small tabular text-white/70">{meta}</p>
              <h3 className="mt-1 font-serif text-[20px] leading-[26px]">
                {title}
              </h3>
              <span className="mt-2 inline-flex items-center gap-1 text-small font-medium text-dawn-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Open
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
