import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
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
import { PhotoGallery } from "@/components/photo-gallery";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Resorts", path: "/resorts" },
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
              { name: "Home", path: "/" },
              { name: "Resorts", path: "/resorts" },
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
                {season.state === "open" ? `Live at ${r.name[l]}` : season.state === "preseason" ? "Preseason" : "Season closed"}
              </p>
              {season.state === "open" && snow ? (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Stat label="Top snow" value={`${snow.topCm} cm`} />
                  <Stat label="Base snow" value={`${snow.baseCm} cm`} />
                  <Stat label="24h new" value={`+${snow.new24hCm} cm`} />
                  <Stat label="Temperature" value={`${snow.tempC > 0 ? "+" : ""}${snow.tempC}°C`} />
                  <Stat label="Lifts" value={`${snow.liftsOpen}/${snow.liftsTotal}`} />
                  <Stat label="Wind" value={`${snow.windMs} m/s`} />
                </div>
              ) : season.state === "preseason" ? (
                <div className="mt-3">
                  <p className="font-serif text-[22px] leading-[28px] text-snow">
                    {season.daysToOpen === 0
                      ? "Opens today"
                      : season.daysToOpen === 1
                        ? "Opens tomorrow"
                        : `Opens in ${season.daysToOpen} days`}
                  </p>
                  <p className="mt-1 text-small text-white/70 tabular">
                    {season.opensOn ? fmt.dateTime(new Date(season.opensOn), { day: "numeric", month: "long" }) : null}
                  </p>
                  <p className="mt-3 text-small text-white/60">Not measured yet. We start the hourly reading once the lifts turn.</p>
                  <div className="mt-4">
                    <SeasonAlertForm resort={r.slug} tone="dark" />
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-small text-white/70">Season closed. Back next winter.</p>
              )}
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <LinkButton href="/transfers" variant="cta" className="flex-1 justify-center">Book a transfer</LinkButton>
                <LinkButton href="/snow-report" variant="outline" className="flex-1 justify-center border-white/20 bg-transparent text-snow hover:border-dawn-soft">
                  Full report
                </LinkButton>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Photo gallery (only when real photos exist) */}
      {r.images && r.images.length > 0 ? (
        <section className="site-container pt-10">
          <PhotoGallery images={r.images} locale={l} heroPriority />
        </section>
      ) : null}

      {/* Highlights + best for */}
      <section className="site-container py-12">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-serif text-[28px] leading-[36px]">What makes it worth the drive</h2>
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
            <p className="text-small text-primary">Best for</p>
            <p className="mt-2 text-ink">{bestFor}</p>
            {resortPrice && resortPrice.liftPassDayGel > 0 ? (
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-small text-ink-muted">Day pass</p>
                <div className="mt-1"><Price gel={resortPrice.liftPassDayGel} size="lg" /></div>
                <p className="mt-2 text-small text-ink-muted tabular">Week: {resortPrice.liftPassWeekGel} ₾</p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {/* Terrain, lifts, longest run — rendered only when data present */}
      {(r.terrain || r.lifts?.length || r.longestRunKm || r.verticalDropM) ? (
        <section className="border-t border-line bg-surface py-12">
          <div className="site-container grid gap-8 md:grid-cols-[1.3fr_1fr]">
            {r.terrain ? (
              <div>
                <h2 className="font-serif text-[24px] leading-[32px]">Terrain split</h2>
                <dl className="mt-4 grid grid-cols-3 gap-3">
                  {r.terrain.beginner !== undefined ? (
                    <TerrainStat label="Beginner" value={`${r.terrain.beginner}%`} tone="open" />
                  ) : null}
                  {r.terrain.intermediate !== undefined ? (
                    <TerrainStat label="Intermediate" value={`${r.terrain.intermediate}%`} tone="limited" />
                  ) : null}
                  {r.terrain.advanced !== undefined ? (
                    <TerrainStat label="Advanced" value={`${r.terrain.advanced}%`} tone="closed" />
                  ) : null}
                </dl>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-small">
                  {r.longestRunKm ? (
                    <div className="rounded-md border border-line bg-surface-raised p-3">
                      <dt className="text-ink-muted">Longest run</dt>
                      <dd className="mt-1 font-serif text-[22px] leading-[28px] tabular">{r.longestRunKm} km</dd>
                    </div>
                  ) : null}
                  {r.verticalDropM ? (
                    <div className="rounded-md border border-line bg-surface-raised p-3">
                      <dt className="text-ink-muted">Vertical drop</dt>
                      <dd className="mt-1 font-serif text-[22px] leading-[28px] tabular">{r.verticalDropM} m</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            ) : null}

            {r.lifts && r.lifts.length > 0 ? (
              <div>
                <h2 className="font-serif text-[24px] leading-[32px]">Lifts</h2>
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

      {/* Map + parking */}
      <section className="site-container py-10">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-4 font-serif text-[24px] leading-[32px]">On the map</h2>
            <ResortMap lat={r.lat} lng={r.lng} label={r.name[l]} />
          </div>
          {r.parkingNote ? (
            <aside className="rounded-lg border border-line bg-surface p-5">
              <p className="text-small text-primary">Parking</p>
              <p className="mt-2 text-ink">{r.parkingNote[l]}</p>
            </aside>
          ) : (
            <aside className="rounded-lg border border-line bg-surface p-5">
              <p className="text-small text-primary">Coordinates</p>
              <p className="mt-2 tabular text-ink">{r.lat.toFixed(4)}, {r.lng.toFixed(4)}</p>
              <p className="mt-2 text-small text-ink-muted">
                Pin shows the base of the main lift. Hotels on the ridge are 300–800 m away.
              </p>
            </aside>
          )}
        </div>
      </section>

      {/* Resort FAQ (owner-supplied in content/resorts.ts, rendered only when present) */}
      {r.faqs && r.faqs.length > 0 ? (
        <section className="site-container py-12">
          <h2 className="font-serif text-[28px] leading-[36px]">Questions people actually ask</h2>
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
            <h2 className="mb-6 font-serif text-[28px] leading-[36px]">How to get to {r.name[l]}</h2>
            <Table>
              <THead>
                <TR><TH>From</TH><TH>Distance</TH><TH>Time</TH><TH align="right">From</TH><TH>{" "}</TH></TR>
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
                              {from.perSeat ? "/seat" : "/vehicle"}
                            </span>
                          </>
                        ) : "—"}
                      </TD>
                      <TD align="right">
                        <Link href={`/transfers/${rt.slug}` as never} className="text-small text-primary hover:underline">Book →</Link>
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
          <h2 className="mb-6 font-serif text-[28px] leading-[36px]">Things to do in {r.name[l]}</h2>
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
            <LinkButton href={`/things-to-do/${r.slug}`} variant="ghost" size="sm">More things to do in {r.name[l]} →</LinkButton>
          </div>
        </section>
      ) : null}

      {/* Events */}
      {resortEvents.length > 0 ? (
        <section className="border-t border-line bg-surface-raised py-12">
          <div className="site-container">
            <h2 className="mb-6 font-serif text-[28px] leading-[36px]">Upcoming at {r.name[l]}</h2>
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

      {/* Journal about the resort */}
      {resortArticles.length > 0 ? (
        <section className="site-container py-12">
          <h2 className="mb-6 font-serif text-[28px] leading-[36px]">From the journal</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {resortArticles.map((a) => (
              <Link key={a.slug} href={`/journal/${a.slug}` as never} className="group">
                <Card interactive className="h-full">
                  <div className="flex items-center gap-2 text-small">
                    <span className="text-primary">{a.category}</span>
                    {a.isAlert ? <StatusPill status="closed" label="Alert" /> : null}
                  </div>
                  <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{a.title[l]}</h3>
                  <p className="mt-2 line-clamp-2 text-small text-ink-muted">{a.excerpt[l]}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Related — auto-generated internal links from the data model */}
      <RelatedStrip items={relatedForResort(r.slug, l)} title={`More for ${r.name[l]}`} />

      {/* CTA */}
      <section className="border-y border-line bg-glacier text-snow">
        <div className="site-container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
          <div>
            <p className="text-small text-dawn-soft">Ready?</p>
            <h2 className="mt-1 font-serif text-[28px] leading-[36px]">Get to {r.name[l]} with a fixed-price transfer.</h2>
          </div>
          <LinkButton href="/transfers" variant="cta" size="lg">Book a transfer</LinkButton>
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
