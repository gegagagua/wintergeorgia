import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Card } from "@/components/ui/card";
import { Price } from "@/components/ui/price";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import { routeFromPrice } from "@/lib/route-pricing";
import { groupedRoutes, routeRegionLabel } from "@/lib/route-grouping";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: { title: "Transfers to every Georgian ski resort", desc: "Ten operating routes, fixed prices, vetted drivers with winter tyres and chains. Book online with WhatsApp confirmation." },
    ru: { title: "Трансферы ко всем горнолыжным курортам Грузии", desc: "Десять действующих маршрутов, фиксированные цены, проверенные водители с зимней резиной и цепями. Бронирование онлайн с подтверждением в WhatsApp." },
    ka: { title: "ტრანსფერები საქართველოს ყველა კურორტამდე", desc: "ათი მოქმედი მარშრუტი, ფიქსირებული ფასები, შემოწმებული მძღოლები ზამთრის საბურავებით და ჯაჭვებით. ონლაინ დაჯავშნა WhatsApp-ის დადასტურებით." },
  }[l];
  return pageMetadata({ locale: l, path: "/transfers", title: t.title, description: t.desc, ogKicker: "Transfers" });
}

export default async function TransfersIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: "Transfers", path: "/transfers" }])),
        }}
      />

      <section className="border-b border-line contour text-snow">
        <div className="site-container py-10 md:py-14">
          <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Transfers" }]} />
          <p className="text-small text-dawn-soft">Ten operating routes</p>
          <h1 className="mt-2 max-w-3xl font-serif text-[40px] leading-[48px] md:text-[60px] md:leading-[64px]">
            Transfers to every Georgian ski resort
          </h1>
          <p className="mt-6 max-w-2xl text-white/85">
            Fixed price at booking. Refund in full if the road closes. Every driver runs winter tyres, carries chains, and their profile is public.
          </p>
        </div>
      </section>

      <section className="site-container py-12">
        <AlertBanner
          tone="warning"
          title="Chains required on Jvari Pass above Kobi"
        >
          Gudauri and Kazbegi routes are running normally with the chain restriction. 4x4 recommended after 15:00.
        </AlertBanner>
      </section>

      <section className="site-container pb-14">
        <SectionHeader kicker="All routes" title="Pick a route" />
        <div className="space-y-10">
          {groupedRoutes(routes).map((group) => (
            <div key={group.id}>
              <h2 className="mb-4 font-serif text-[22px] leading-[28px] text-primary">
                {routeRegionLabel(group.id, l)}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {group.routes.map((r) => {
                  const from = routeFromPrice(r);
                  return (
                    <Link key={r.slug} href={`/transfers/${r.slug}` as never} className="group">
                      <Card interactive className="h-full">
                        <div className="flex items-center gap-2 text-small text-primary">
                          <span className="tabular">{r.distanceKm} km</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular">{Math.round(r.durationMin / 15) * 15 / 60}h</span>
                          {r.requires4x4 ? (
                            <span className="ml-2 rounded-pill border border-status-limited/30 bg-status-limited/10 px-2 py-0.5 text-status-limited">4x4</span>
                          ) : null}
                          {r.isScheduled ? (
                            <span className="rounded-pill border border-primary/30 bg-primary/5 px-2 py-0.5 text-primary">Daily shuttle</span>
                          ) : null}
                        </div>
                        <h3 className="mt-2 font-serif text-[20px] leading-[28px] group-hover:text-primary">
                          {r.from[l]} → {r.to[l]}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-small text-ink-muted">{r.description[l]}</p>
                        <div className="mt-4 flex items-end justify-between">
                          {from ? (
                            <div className="flex items-baseline gap-2">
                              <Price gel={from.priceGel} from />
                              <span className="text-small text-ink-muted">
                                {from.perSeat ? "/seat" : "/vehicle"}
                              </span>
                            </div>
                          ) : null}
                          <span className="text-small text-primary">Book →</span>
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
