import type { Metadata } from "next";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { EventFilters } from "@/components/event-filters";
import { EventMonth } from "@/components/event-month";
import { events } from "@/content/events";
import { findResort } from "@/content/resorts";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: { title: "Events in Georgia's ski season", desc: "Season openings, competitions, festivals, New Year parties and family events at every Georgian resort. Filter by resort, category or month." },
    ru: { title: "События горнолыжного сезона Грузии", desc: "Открытие сезона, соревнования, фестивали, новогодние вечеринки и семейные события на каждом курорте. Фильтры по курорту, категории и месяцу." },
    ka: { title: "საქართველოს სათხილამურო სეზონის ღონისძიებები", desc: "სეზონის გახსნა, შეჯიბრებები, ფესტივალები, საახალწლო ღონისძიებები და საოჯახო შეხვედრები ყველა კურორტზე. ფილტრები კურორტის, კატეგორიის და თვის მიხედვით." },
  }[l];
  return pageMetadata({ locale: l, path: "/events", title: t.title, description: t.desc, ogKicker: "Events" });
}

export default async function EventsIndex({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const sp = await searchParams;

  const resort = str(sp.resort) ?? "all";
  const category = str(sp.category) ?? "all";
  const view = str(sp.view) ?? "list";

  let filtered = [...events];
  if (resort !== "all") filtered = filtered.filter((e) => e.resort === resort);
  if (category !== "all") filtered = filtered.filter((e) => e.category === category);
  filtered.sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: "Events", path: "/events" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Events" }]} />
      <SectionHeader
        kicker="This season"
        title="Events across Georgia"
        action={<LinkButton href="/events/submit" variant="outline" size="sm">Submit an event</LinkButton>}
      />

      <EventFilters current={{ resort, category, view }} />

      {filtered.length === 0 ? (
        <EmptyState title="No events match those filters" description="Try widening the resort or category." />
      ) : view === "month" ? (
        <EventMonth events={filtered} locale={l} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((e) => {
            const r = findResort(e.resort);
            return (
              <Link key={e.slug} href={`/events/${e.slug}` as never} className="group">
                <Card interactive className="h-full">
                  <p className="text-small tabular text-primary">
                    {fmt.dateTime(new Date(e.startsAt), { weekday: "short", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <h2 className="mt-1 font-serif text-[24px] leading-[32px] group-hover:text-primary">{e.title[l]}</h2>
                  <p className="mt-2 line-clamp-3 text-small text-ink-muted">{e.body[l]}</p>
                  <div className="mt-4 flex items-center gap-3 text-small">
                    {r ? <span className="text-ink-muted">{r.name[l]}</span> : null}
                    <span className="text-primary">Event page →</span>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function str(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}
