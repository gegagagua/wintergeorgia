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
import { findResort } from "@/content/resorts";
import { driversForRoute } from "@/content/drivers";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, faqLd, productWithOfferLd } from "@/lib/jsonld";
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
  return pageMetadata({
    locale: l,
    path: `/transfers/${slug}`,
    title: `${r.from[l]} → ${r.to[l]} transfer — fixed price`,
    description: r.description[l].slice(0, 160),
    ogKicker: `${r.distanceKm} km · ${Math.round(r.durationMin / 60 * 10) / 10}h`,
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

  const cheapest = Object.values(r.prices)
    .filter((p): p is { priceGel: number; maxPax: number } => Boolean(p))
    .sort((a, b) => a.priceGel - b.priceGel)[0];
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
              priceGel: cheapest?.priceGel ?? 0,
              ratingCount: 48,
            }),
            faqLd([
              { q: "Is this price the final price?", a: "Yes. No dynamic pricing. Extras and return leg are shown before payment." },
              { q: "What if the road closes?", a: "Your booking is automatically rescheduled or refunded in full, no fee." },
              { q: "When do I get the driver's details?", a: "Twelve hours before pickup by WhatsApp: name, phone, vehicle and plate." },
              { q: "Cancellation policy?", a: "Free ≥24h before departure. 50% within 24h. Flight delays are never penalised." },
            ]),
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
              <div className="mt-1">{cheapest ? <Price gel={cheapest.priceGel} size="lg" className="text-dawn-soft" /> : null}</div>
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
                    {Object.entries(r.prices).map(([vc, meta]) => {
                      if (!meta) return null;
                      const label = vc === "shared" ? "Shared seat" : vc === "sedan" ? "Sedan" : vc === "minivan" ? "Minivan" : "4x4 SUV";
                      return (
                        <TR key={vc}>
                          <TD>{label}</TD>
                          <TD align="right">{meta.maxPax}</TD>
                          <TD align="right">{meta.priceGel} ₾{vc === "shared" ? " / seat" : ""}</TD>
                        </TR>
                      );
                    })}
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

      <RelatedStrip items={relatedForRoute(r.slug, l)} title="Related for this route" />
    </>
  );
}
