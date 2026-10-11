import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StatusPill } from "@/components/ui/status-pill";
import { Price } from "@/components/ui/price";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { PeakArt } from "@/components/peaks";
import { Link } from "@/i18n/navigation";
import { findResort, resorts } from "@/content/resorts";
import { routes } from "@/content/routes";
import { routeFromPrice } from "@/lib/route-pricing";
import { events } from "@/content/events";
import { articles } from "@/content/articles";
import { places } from "@/content/places";
import { findSnow } from "@/content/roads";
import { prices } from "@/content/prices";
import { seasonStateFor } from "@/config/season";
import { SeasonAlertForm } from "@/components/season-alert-form";
import { GallerySlider } from "@/components/gallery-slider";
import { ResortVideos } from "@/components/resort-videos";
import { ResortMap } from "@/components/resort-map";
import { RelatedStrip } from "@/components/related-strip";
import { relatedForResort } from "@/lib/related";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, touristAttractionLd, faqLd, imageObjectLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return resorts.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const r = findResort(slug);
  if (!r) return {};
  return pageMetadata({
    locale: l,
    path: `/resorts/${slug}`,
    title: `${r.name[l]} — ski resort guide`,
    description: r.description[l].slice(0, 160),
    ogKicker: r.region,
    ogTitle: r.name[l],
  });
}

export default async function ResortPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const t = await getTranslations("resort");

  const r = findResort(slug);
  if (!r) notFound();

  const season = seasonStateFor(r);
  const snow = season.state === "open" ? findSnow(r.slug) : null;
  const resortRoutes = routes.filter((rt) => rt.toResort === r.slug);
  const resortEvents = events.filter((e) => e.resort === r.slug);
  const resortArticles = articles.filter((a) => a.resort === r.slug);
  const resortPlaces = places.filter((p) => p.resort === r.slug);
  const resortPrice = prices.find((p) => p.resort === r.slug);

  const bestFor = r.bestFor[l];
  const infoBlocks = [
    r.bestTime ? { key: "bestTime", title: t("bestTime"), body: r.bestTime[l] } : null,
    r.apresSki ? { key: "apresSki", title: t("apresSki"), body: r.apresSki[l] } : null,
    r.gearTips ? { key: "gearTips", title: t("gearTips"), body: r.gearTips[l] } : null,
    r.nearbyTowns ? { key: "nearbyTowns", title: t("nearbyTowns"), body: r.nearbyTowns[l] } : null,
  ].filter((x): x is { key: string; title: string; body: string } => x !== null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [
              { name: t("home"), path: "/" },
              { name: t("resorts"), path: "/resorts" },
              { name: r.name[l], path: `/resorts/${r.slug}` },
            ]),
            touristAttractionLd({
              locale: l,
              slug: r.slug,
              name: r.name[l],
              description: r.description[l],
              lat: r.lat,
              lng: r.lng,
            }),
            faqLd([
              { q: `How do I get to ${r.name.en}?`, a: `Book a transfer from Tbilisi, Kutaisi Airport, or the nearest major city. Fixed price, refunded if the road closes.` },
              { q: `When does ${r.name.en} open?`, a: r.seasonFrom ? `Season runs from ${r.seasonFrom} to ${r.seasonTo}. Dates depend on snowfall.` : `Season timing depends on snowfall each year.` },
              { q: `Is ${r.name.en} good for beginners?`, a: bestFor },
              ...(r.faqs ?? []).map((f) => ({ q: f.q[l], a: f.a[l] })),
            ]),
            ...(r.images && r.images.length > 0
              ? r.images.slice(0, 3).map((img) =>
                  imageObjectLd({
                    url: img.src,
                    caption: img.caption?.[l],
                    width: img.width,
                    height: img.height,
                  }),
                )
              : []),
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line contour text-snow">
        <PeakArt slug={r.slug} className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full text-dawn-soft opacity-80" />
        <div className="relative site-container py-10 md:py-16">
          <Breadcrumb
            items={[
              { name: t("home"), path: "/" },
              { name: t("resorts"), path: "/resorts" },
              { name: r.name[l] },
            ]}
          />
          <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-small text-dawn-soft">{r.region}</p>
              <h1 className="mt-2 font-serif text-[40px] leading-[48px] md:text-[60px] md:leading-[64px]">
                {r.name[l]}
              </h1>
              <p className="mt-6 max-w-[62ch] text-white/85">{r.description[l]}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-small">
                <span className="rounded-pill border border-white/20 bg-white/5 px-3 py-1">
                  {r.altMinM}–{r.altMaxM} m
                </span>
                {r.slopeKm ? (
                  <span className="rounded-pill border border-white/20 bg-white/5 px-3 py-1">
                    {r.slopeKm} km slopes
                  </span>
                ) : null}
                <span className="rounded-pill border border-white/20 bg-white/5 px-3 py-1">
                  {r.liftsTotal} lifts
                </span>
                {r.seasonFrom ? (
                  <span className="rounded-pill border border-white/20 bg-white/5 px-3 py-1 tabular">
                    {fmt.dateTime(new Date(r.seasonFrom), { month: "short", day: "numeric" })} –{" "}
                    {r.seasonTo ? fmt.dateTime(new Date(r.seasonTo), { month: "short", day: "numeric" }) : ""}
                  </span>
                ) : null}
              </div>
            </div>

            <aside className="rounded-lg border border-white/10 bg-glacier/60 p-5">
              <p className="text-small text-white/70">
                {season.state === "open" ? t("liveAt", { name: r.name[l] }) : season.state === "preseason" ? t("preseason") : t("seasonClosed")}
              </p>
              {season.state === "open" && snow ? (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Stat label={t("topSnow")} value={`${snow.topCm} cm`} />
                  <Stat label={t("baseSnow")} value={`${snow.baseCm} cm`} />
                  <Stat label={t("new24h")} value={`+${snow.new24hCm} cm`} />
                  <Stat label={t("temperature")} value={`${snow.tempC > 0 ? "+" : ""}${snow.tempC}°C`} />
                  <Stat label={t("liftsHeading")} value={`${snow.liftsOpen}/${snow.liftsTotal}`} />
                  <Stat label={t("wind")} value={`${snow.windMs} m/s`} />
                </div>
              ) : season.state === "preseason" ? (
                <div className="mt-3">
                  <p className="font-serif text-[22px] leading-[28px] text-snow">
                    {season.daysToOpen === 0
                      ? t("opensToday")
                      : season.daysToOpen === 1
                        ? t("opensTomorrow")
                        : t("opensInDays", { n: season.daysToOpen })}
                  </p>
                  <p className="mt-1 text-small text-white/70 tabular">
                    {season.opensOn ? fmt.dateTime(new Date(season.opensOn), { day: "numeric", month: "long" }) : null}
                  </p>
                  <p className="mt-3 text-small text-white/60">{t("notMeasuredYet")}</p>
                  <div className="mt-4">
                    <SeasonAlertForm resort={r.slug} tone="dark" />
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-small text-white/70">{t("backNextWinter")}</p>
              )}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <LinkButton href="/transfers" variant="cta" size="sm" className="flex-1">
                  {t("bookTransfer")}
                </LinkButton>
                <LinkButton href="/snow-report" variant="outline" size="sm" tone="dark" className="flex-1">
                  {t("fullReport")}
                </LinkButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Gallery slider */}
      {r.images && r.images.length > 0 ? (
        <section className="site-container pt-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-small text-primary">{t("gallery")}</p>
              <h2 className="mt-1 font-serif text-[28px] leading-[36px]">{r.name[l]}</h2>
            </div>
            <p className="hidden text-small text-ink-muted sm:block">{t("gallerySubtitle")}</p>
          </div>
          <GallerySlider images={r.images} locale={l} heroPriority />
        </section>
      ) : null}

      {/* Highlights + best for */}
      <section className="site-container py-12">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-serif text-[28px] leading-[36px]">{t("whatMakesItWorth")}</h2>
            <ul className="mt-5 grid gap-3">
              {r.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 rounded-lg border border-line bg-surface p-4">
                  <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span>{h[l]}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="rounded-lg border border-line bg-surface-raised p-5">
            <p className="text-small text-primary">{t("bestFor")}</p>
            <p className="mt-2 text-ink">{bestFor}</p>
            {resortPrice && resortPrice.liftPassDayGel > 0 ? (
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-small text-ink-muted">{t("dayPass")}</p>
                <div className="mt-1"><Price gel={resortPrice.liftPassDayGel} size="lg" /></div>
                <p className="mt-2 text-small text-ink-muted tabular">{t("weekPass", { price: resortPrice.liftPassWeekGel })}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* Terrain, lifts */}
      {(r.terrain || r.lifts?.length || r.longestRunKm || r.verticalDropM) ? (
        <section className="border-t border-line bg-surface py-12">
          <div className="site-container grid gap-8 md:grid-cols-[1.3fr_1fr]">
            {r.terrain ? (
              <div>
                <h2 className="font-serif text-[24px] leading-[32px]">{t("terrainSplit")}</h2>
                <dl className="mt-4 grid grid-cols-3 gap-3">
                  {r.terrain.beginner !== undefined ? (
                    <TerrainStat label={t("beginner")} value={`${r.terrain.beginner}%`} tone="open" />
                  ) : null}
                  {r.terrain.intermediate !== undefined ? (
                    <TerrainStat label={t("intermediate")} value={`${r.terrain.intermediate}%`} tone="limited" />
                  ) : null}
                  {r.terrain.advanced !== undefined ? (
                    <TerrainStat label={t("advanced")} value={`${r.terrain.advanced}%`} tone="closed" />
                  ) : null}
                </dl>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-small">
                  {r.longestRunKm ? (
                    <div className="rounded-md border border-line bg-surface-raised p-3">
                      <dt className="text-ink-muted">{t("longestRun")}</dt>
                      <dd className="mt-1 font-serif text-[22px] leading-[28px] tabular">{r.longestRunKm} km</dd>
                    </div>
                  ) : null}
                  {r.verticalDropM ? (
                    <div className="rounded-md border border-line bg-surface-raised p-3">
                      <dt className="text-ink-muted">{t("verticalDrop")}</dt>
                      <dd className="mt-1 font-serif text-[22px] leading-[28px] tabular">{r.verticalDropM} m</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ) : null}

            {r.lifts && r.lifts.length > 0 ? (
              <div>
                <h2 className="font-serif text-[24px] leading-[32px]">{t("liftsHeading")}</h2>
                <ul className="mt-4 grid gap-2 text-small">
                  {r.lifts.map((lift) => (
                    <li
                      key={lift.name}
                      className="flex items-center justify-between rounded-md border border-line bg-surface-raised p-3"
                    >
                      <span>
                        {lift.name}
                        <span className="ml-2 text-ink-muted">
                          · {lift.kind.replace("_", " ")}
                        </span>
                      </span>
                      <span className="tabular text-ink-muted">
                        {lift.capacity ? `${lift.capacity}/h` : ""}
                        {lift.hours ? ` · ${lift.hours}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Rich info blocks (bestTime, après-ski, gear, nearby) */}
      {infoBlocks.length > 0 ? (
        <section className="site-container py-12">
          <div className="grid gap-4 md:grid-cols-2">
            {infoBlocks.map((b) => (
              <article
                key={b.key}
                className="rounded-xl border border-line bg-surface p-6"
              >
                <p className="text-small text-primary">{b.title}</p>
                <p className="mt-2 text-ink leading-[1.65]">{b.body}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* YouTube videos */}
      {r.videos && r.videos.length > 0 ? (
        <section className="border-t border-line bg-surface-raised py-12">
          <div className="site-container">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-small text-primary">{t("videos")}</p>
                <h2 className="mt-1 font-serif text-[28px] leading-[36px]">{t("videosSubtitle", { name: r.name[l] })}</h2>
              </div>
            </div>
            <ResortVideos videos={r.videos} locale={l} />
          </div>
        </section>
      ) : null}

      {/* Map + parking */}
      <section className="site-container py-10">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-4 font-serif text-[24px] leading-[32px]">{t("onTheMap")}</h2>
            <ResortMap lat={r.lat} lng={r.lng} label={r.name[l]} />
          </div>
          {r.parkingNote ? (
            <aside className="rounded-lg border border-line bg-surface p-5">
              <p className="text-small text-primary">{t("parking")}</p>
              <p className="mt-2 text-ink">{r.parkingNote[l]}</p>
            </aside>
          ) : (
            <aside className="rounded-lg border border-line bg-surface p-5">
              <p className="text-small text-primary">{t("coordinates")}</p>
              <p className="mt-2 tabular text-ink">{r.lat.toFixed(4)}, {r.lng.toFixed(4)}</p>
              <p className="mt-2 text-small text-ink-muted">{t("pinNote")}</p>
            </aside>
          )}
        </div>
      </section>

      {/* Resort FAQ */}
      {r.faqs && r.faqs.length > 0 ? (
        <section className="site-container py-12">
          <h2 className="font-serif text-[28px] leading-[36px]">{t("questionsPeopleAsk")}</h2>
          <dl className="mt-6 grid gap-3">
            {r.faqs.map((f, i) => (
              <div key={i} className="rounded-lg border border-line bg-surface p-5">
                <dt className="font-medium text-ink">{f.q[l]}</dt>
                <dd className="mt-2 text-small text-ink-muted">{f.a[l]}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      {/* Transfers */}
      {resortRoutes.length > 0 ? (
        <section className="border-t border-line bg-surface-raised py-12">
          <div className="site-container">
            <h2 className="mb-6 font-serif text-[28px] leading-[36px]">{t("howToGet", { name: r.name[l] })}</h2>
            <Table>
              <THead>
                <TR>
                  <TH>{t("fromCol")}</TH>
                  <TH>{t("distance")}</TH>
                  <TH>{t("time")}</TH>
                  <TH align="right">{t("fromCol")}</TH>
                  <TH>{" "}</TH>
                </TR>
              </THead>
              <tbody>
                {resortRoutes.map((rt) => {
                  const from = routeFromPrice(rt);
                  return (
                    <TR key={rt.slug}>
                      <TD>{rt.from[l]}</TD>
                      <TD align="right">{rt.distanceKm} km</TD>
                      <TD align="right">{Math.round(rt.durationMin / 15) * 15}m</TD>
                      <TD align="right">
                        {from ? (
                          <>
                            <Price gel={from.priceGel} size="sm" />
                            <span className="ml-1 text-small text-ink-muted">
                              {from.perSeat ? t("perSeat") : t("perVehicle")}
                            </span>
                          </>
                        ) : "—"}
                      </TD>
                      <TD align="right">
                        <Link href={`/transfers/${rt.slug}` as never} className="text-small text-primary hover:underline">
                          {t("book")}
                        </Link>
                      </TD>
                    </TR>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </section>
      ) : null}

      {/* Places */}
      {resortPlaces.length > 0 ? (
        <section className="site-container py-12">
          <h2 className="mb-6 font-serif text-[28px] leading-[36px]">{t("thingsToDo", { name: r.name[l] })}</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {resortPlaces.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/things-to-do/${r.slug}/${p.slug}` as never} className="group">
                <Card interactive className="h-full">
                  <p className="text-small text-primary">{p.category}</p>
                  <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{p.name[l]}</h3>
                  <p className="mt-2 line-clamp-2 text-small text-ink-muted">{p.description[l]}</p>
                  {p.priceFromGel ? <div className="mt-4"><Price gel={p.priceFromGel} from /></div> : null}
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-4">
            <LinkButton href={`/things-to-do/${r.slug}`} variant="ghost" size="sm">
              {t("moreThingsToDo", { name: r.name[l] })}
            </LinkButton>
          </div>
        </section>
      ) : null}

      {/* Events */}
      {resortEvents.length > 0 ? (
        <section className="border-t border-line bg-surface-raised py-12">
          <div className="site-container">
            <h2 className="mb-6 font-serif text-[28px] leading-[36px]">{t("upcoming", { name: r.name[l] })}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {resortEvents.map((e) => (
                <Link key={e.slug} href={`/events/${e.slug}` as never} className="group">
                  <Card interactive className="h-full">
                    <p className="text-small text-primary tabular">
                      {fmt.dateTime(new Date(e.startsAt), { day: "numeric", month: "long", weekday: "short" })}
                    </p>
                    <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{e.title[l]}</h3>
                    <p className="mt-2 line-clamp-2 text-small text-ink-muted">{e.body[l]}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* News about the resort — with covers */}
      {resortArticles.length > 0 ? (
        <section className="site-container py-12">
          <h2 className="mb-6 font-serif text-[28px] leading-[36px]">{t("fromNews")}</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resortArticles.slice(0, 6).map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}` as never} className="group">
                <Card interactive className="flex h-full flex-col overflow-hidden !p-0">
                  {a.cover ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <Image
                        src={a.cover}
                        alt={a.title[l]}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-small">
                      <span className="text-primary">{a.category}</span>
                      {a.isAlert ? <StatusPill status="closed" label={t("alert")} /> : null}
                      <span className="ml-auto tabular text-ink-muted">
                        {fmt.dateTime(new Date(a.publishedAt), { day: "numeric", month: "short" })}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-[20px] leading-[28px] group-hover:text-primary">{a.title[l]}</h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-small leading-[1.5] text-ink-muted">{a.excerpt[l]}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related */}
      <RelatedStrip items={relatedForResort(r.slug, l)} title={`More for ${r.name[l]}`} />

      {/* CTA */}
      <section className="border-y border-line bg-glacier text-snow">
        <div className="site-container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-small text-dawn-soft">{t("readyKicker")}</p>
            <h2 className="mt-1 font-serif text-[28px] leading-[36px]">{t("readyTitle", { name: r.name[l] })}</h2>
          </div>
          <LinkButton href="/transfers" variant="cta" size="lg" arrow>
            {t("bookTransfer")}
          </LinkButton>
        </div>
      </section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-small text-white/60">{label}</div>
      <div className="mt-0.5 font-serif text-[20px] leading-[28px] tabular text-snow">{value}</div>
    </div>
  );
}

function TerrainStat({ label, value, tone }: { label: string; value: string; tone: "open" | "limited" | "closed" }) {
  const bar = tone === "open" ? "bg-status-open" : tone === "limited" ? "bg-status-limited" : "bg-status-closed";
  return (
    <div className="rounded-md border border-line bg-surface-raised p-3">
      <div className="flex items-center justify-between">
        <span className="text-small text-ink-muted">{label}</span>
        <span className="font-serif text-[20px] leading-[26px] tabular">{value}</span>
      </div>
      <div className={`mt-2 h-1 rounded-full ${bar}`} style={{ width: value }} />
    </div>
  );
}
