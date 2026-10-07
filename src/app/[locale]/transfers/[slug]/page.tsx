import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StatusPill } from "@/components/ui/status-pill";
import { Price } from "@/components/ui/price";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { AlertBanner } from "@/components/ui/alert-banner";
import { BookingForm } from "@/components/booking-form";
import { LinkButton } from "@/components/ui/button";
import { PaymentTrustRow } from "@/components/payment-trust-row";
import { PeakArt } from "@/components/peaks";
import { RelatedStrip } from "@/components/related-strip";
import { relatedForRoute } from "@/lib/related";
import { SeatAlertForm } from "@/components/seat-alert-form";
import { findRoute, routes } from "@/content/routes";
import { findResort, resorts } from "@/content/resorts";
import { ResortMap } from "@/components/resort-map";
import { driversForRoute } from "@/content/drivers";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, faqLd, productWithOfferLd } from "@/lib/jsonld";
import { routeFromPrice, sortedVehicleClasses, vehicleClassLabel } from "@/lib/route-pricing";
import { faqsForRoute } from "@/content/route-faqs";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const r = findRoute(slug);
  if (!r) return {};
  const from = routeFromPrice(r);
  const fromLabel = from
    ? ` — from ${from.priceGel} GEL${from.perSeat ? "/seat" : ""}`
    : "";
  return pageMetadata({
    locale: l,
    path: `/transfers/${slug}`,
    title: `${r.from[l]} → ${r.to[l]} transfer${fromLabel}`,
    description: r.description[l].slice(0, 160),
    ogKicker: from
      ? `${r.distanceKm} km · ${Math.round(r.durationMin / 60 * 10) / 10}h · from ${from.priceGel} ₾${from.perSeat ? "/seat" : ""}`
      : `${r.distanceKm} km · ${Math.round(r.durationMin / 60 * 10) / 10}h`,
    ogTitle: `${r.from[l]} → ${r.to[l]}`,
  });
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const r = findRoute(slug);
  if (!r) notFound();
  const resort = r.toResort ? findResort(r.toResort) : undefined;

  const fromPrice = routeFromPrice(r);
  const orderedPrices = sortedVehicleClasses(r);
  const routeDrivers = driversForRoute(r.slug).slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Transfers", path: "/transfers" },
              { name: `${r.from[l]} → ${r.to[l]}`, path: `/transfers/${r.slug}` },
            ]),
            productWithOfferLd({
              locale: l,
              slug: r.slug,
              name: `${r.from[l]} → ${r.to[l]} transfer`,
              description: r.description[l],
              priceGel: fromPrice?.priceGel ?? 0,
              ratingCount: 48,
            }),
            faqLd(faqsForRoute(r).map((f) => ({ q: f.q[l], a: f.a[l] }))),
          ]),
        }}
      />

      <section className="relative overflow-hidden border-b border-line contour text-snow">
        {r.toResort ? (
          <PeakArt slug={r.toResort} showLabel={false} className="pointer-events-none absolute inset-x-0 top-0 h-36 w-full text-dawn-soft opacity-60" />
        ) : null}
        <div className="relative site-container py-10 md:py-14">
          <Breadcrumb items={[
            { name: "Home", path: "/" },
            { name: "Transfers", path: "/transfers" },
            { name: `${r.from[l]} → ${r.to[l]}` },
          ]} />
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="text-small text-dawn-soft">Transfer route</p>
              <h1 className="mt-2 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">
                {r.from[l]} → {r.to[l]}
              </h1>
              <p className="mt-4 max-w-2xl text-white/85">{r.description[l]}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-small">
                <span className="rounded-pill border border-white/20 bg-white/5 px-3 py-1 tabular">{r.distanceKm} km</span>
                <span className="rounded-pill border border-white/20 bg-white/5 px-3 py-1 tabular">{Math.round(r.durationMin / 15) * 15 / 60}h</span>
                {r.requires4x4 ? <span className="rounded-pill border border-dawn-soft/40 bg-dawn-soft/10 px-3 py-1 text-dawn-soft">4x4</span> : null}
                {r.isScheduled ? <span className="rounded-pill border border-white/30 bg-white/10 px-3 py-1">Daily scheduled shuttle</span> : null}
              </div>
              <div className="mt-6">
                <PaymentTrustRow locale={l} tone="dark" compact />
              </div>
            </div>
            <aside className="rounded-lg border border-white/10 bg-glacier/60 p-5">
              <p className="text-small text-white/70">From</p>
              <div className="mt-1">
                {fromPrice ? (
                  <>
                    <Price gel={fromPrice.priceGel} size="lg" className="text-dawn-soft" />
                    <span className="ml-2 align-middle text-small text-white/70">
                      {fromPrice.perSeat ? "per seat · shared" : `per vehicle · up to ${fromPrice.maxPax} pax`}
                    </span>
                  </>
                ) : null}
              </div>
              <p className="mt-2 text-small text-white/70">Fixed price · refund if road closes</p>
              <ul className="mt-4 grid gap-2 text-small text-white/80">
                <li>· Vetted driver with winter tyres and chains</li>
                <li>· WhatsApp confirmation, driver at T-12h</li>
                <li>· Free cancellation ≥24h before departure</li>
                <li>· Flight delays never penalised</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="site-container py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-[28px] leading-[36px]">Book this transfer</h2>
            <p className="mt-2 text-small text-ink-muted">Price is final. Continue to secure payment when ready.</p>
            <div className="mt-6">
              <BookingForm route={r} />
            </div>
            <div className="mt-6">
              <PaymentTrustRow locale={l} />
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-line bg-surface-raised p-5">
              <p className="text-small text-primary">Pricing by vehicle class</p>
              <div className="mt-3">
                <Table>
                  <THead><TR><TH>Class</TH><TH align="right">Max pax</TH><TH align="right">Price</TH></TR></THead>
                  <tbody>
                    {orderedPrices.map(([vc, meta]) => (
                      <TR key={vc}>
                        <TD>{vehicleClassLabel(vc)}</TD>
                        <TD align="right">{meta.maxPax}</TD>
                        <TD align="right">
                          {meta.priceGel} ₾{vc === "shared" ? " / seat" : ""}
                        </TD>
                      </TR>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>

            <AlertBanner tone="info" title="Rules that create trust">
              Fixed price · refund on closure · cancellation policy visible · every driver vetted with documents and insurance on file.
            </AlertBanner>

            {resort ? (
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-small text-primary">Destination</p>
                <h3 className="mt-1 font-serif text-[20px] leading-[28px]">{resort.name[l]}</h3>
                <p className="mt-2 text-small text-ink-muted">{resort.description[l].slice(0, 160)}…</p>
                <div className="mt-4">
                  <LinkButton href={`/resorts/${resort.slug}`} variant="outline" size="sm">Resort guide →</LinkButton>
                </div>
              </div>
            ) : null}

            {r.isScheduled ? (
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-small text-primary">Seat alert</p>
                <p className="mt-1 text-small text-ink-muted">
                  Scheduled shuttle. Get an email when a seat opens on your date.
                </p>
                <div className="mt-3">
                  <SeatAlertForm routeSlug={r.slug} />
                </div>
              </div>
            ) : null}

            {routeDrivers.length > 0 ? (
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-small text-primary">Drivers on this route</p>
                <ul className="mt-3 grid gap-3">
                  {routeDrivers.map((d) => (
                    <li key={d.slug}>
                      <Link
                        href={`/drivers/${d.slug}` as never}
                        className="flex items-center gap-3 hover:text-primary"
                      >
                        {d.photo ? (
                          <span className="relative inline-block h-10 w-10 shrink-0 overflow-hidden rounded-full border border-line">
                            <Image src={d.photo} alt={d.firstName} fill sizes="40px" className="object-cover" />
                          </span>
                        ) : (
                          <span className="inline-block h-10 w-10 shrink-0 rounded-full border border-line bg-surface-raised" />
                        )}
                        <span>
                          <span className="block">{d.firstName}</span>
                          <span className="block text-small text-ink-muted tabular">
                            {d.vehicle.make} {d.vehicle.model} · {d.vehicle.plate}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="rounded-lg border border-line bg-surface p-5">
              <p className="text-small text-primary">Live road status</p>
              <div className="mt-2 flex items-center gap-2">
                <StatusPill status="open" label="Open" />
                <span className="text-small text-ink-muted">Jvari Pass</span>
              </div>
              <p className="mt-2 text-small text-ink-muted">Chains required above Kobi.</p>
              <div className="mt-4">
                <LinkButton href="/road-status" variant="outline" size="sm">Road status →</LinkButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {r.schedule && r.schedule.length > 0 ? (
        <section className="border-t border-line">
          <div className="site-container py-12">
            <h2 className="font-serif text-[28px] leading-[36px]">Daily schedule</h2>
            <p className="mt-2 text-small text-ink-muted">
              Shared-seat shuttle. Reserve a seat on this page; private whole-vehicle rides depart on your schedule.
            </p>
            <div className="mt-5 overflow-hidden rounded-lg border border-line">
              <Table>
                <THead>
                  <TR>
                    <TH>Departure</TH>
                    <TH>Return</TH>
                    <TH>Runs</TH>
                    <TH align="right">Seat price</TH>
                  </TR>
                </THead>
                <tbody>
                  {r.schedule.map((row, i) => (
                    <TR key={i}>
                      <TD className="tabular">{row.departTime}</TD>
                      <TD className="tabular">{row.returnTime ?? "—"}</TD>
                      <TD>{row.runsDaily ? "Daily" : row.note?.[l] ?? "On demand"}</TD>
                      <TD align="right" className="tabular">
                        {r.prices.shared ? `${r.prices.shared.priceGel} ₾` : "—"}
                      </TD>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
      ) : null}

      {/* Winter road paragraph + map */}
      <section className="border-t border-line bg-surface">
        <div className="site-container py-12 grid gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-serif text-[28px] leading-[36px]">What the road is like in winter</h2>
            <p className="mt-4 text-ink">{r.description[l]}</p>
            <p className="mt-3 text-small text-ink-muted">
              Distance: {r.distanceKm} km · Typical winter time: {Math.round(r.durationMin / 15) * 15 / 60}h.
              {r.requires4x4 ? " 4x4 recommended through the pass; chains fitted whenever the Roads Department posts the sign." : " Winter tyres and chains on every vehicle; chains fitted whenever the Roads Department posts the sign."}
            </p>
          </div>
          <div>
            {(() => {
              const r2 = r.toResort ? resorts.find((x) => x.slug === r.toResort) : undefined;
              return r2 ? (
                <ResortMap lat={r2.lat} lng={r2.lng} label={`${r.from[l]} → ${r.to[l]}`} zoom={9} />
              ) : null;
            })()}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface-raised">
        <div className="site-container py-14">
          <h2 className="font-serif text-[28px] leading-[36px]">Questions people ask about this transfer</h2>
          <dl className="mt-6 grid gap-3 md:grid-cols-2">
            {faqsForRoute(r).map((f, i) => (
              <div key={i} className="rounded-lg border border-line bg-surface p-5">
                <dt className="font-medium text-ink">{f.q[l]}</dt>
                <dd className="mt-2 text-small text-ink-muted">{f.a[l]}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <RelatedStrip items={relatedForRoute(r.slug, l)} title="Related for this route" />
    </>
  );
}
