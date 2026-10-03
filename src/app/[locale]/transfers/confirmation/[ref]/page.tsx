import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Price } from "@/components/ui/price";
import { LinkButton } from "@/components/ui/button";
import { getBooking } from "@/lib/booking-store";
import { findRoute } from "@/content/routes";
import type { Locale } from "@/i18n/routing";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string; ref: string }>;
}) {
  const { locale, ref } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const b = await getBooking(ref);
  if (!b) notFound();
  const route = findRoute(b.routeSlug);

  const isPaid = b.status === "paid" || b.status === "assigned" || b.status === "completed";

  return (
    <div className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Transfers", path: "/transfers" }, { name: `Booking ${b.ref}` }]} />

      {isPaid ? (
        <AlertBanner tone="info" title={`Booking confirmed · ${b.ref}`}>
          A confirmation was sent to {b.email} and WhatsApp {b.phone}. Driver details arrive 12 hours before pickup.
        </AlertBanner>
      ) : (
        <AlertBanner tone="danger" title={`Booking not completed · ${b.ref}`}>
          Payment did not go through. No charge was made. Try again or contact us.
        </AlertBanner>
      )}

      <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-lg border border-line bg-surface p-6">
            <h1 className="font-serif text-[28px] leading-[36px]">
              {route ? `${route.from[l]} → ${route.to[l]}` : b.routeSlug}
            </h1>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-small">
              <Item label="When">{fmt.dateTime(new Date(`${b.travelDate}T${b.travelTime}:00`), { dateStyle: "full", timeStyle: "short" })}</Item>
              <Item label="Passengers">{b.pax}</Item>
              <Item label="Vehicle">{b.vehicleClass}</Item>
              <Item label="Luggage / ski">{b.luggage} bags · {b.skiCount} sets</Item>
              {b.pickupAddress ? <Item label="Pickup">{b.pickupAddress}</Item> : null}
              {b.flightNo ? <Item label="Flight">{b.flightNo}</Item> : null}
            </dl>
          </section>

          <section className="rounded-lg border border-line bg-surface p-6">
            <h2 className="font-serif text-[20px] leading-[28px]">What happens next</h2>
            <ol className="mt-4 space-y-3 text-small text-ink-muted">
              <Step n={1}>Confirmation just sent to {b.email} and WhatsApp.</Step>
              <Step n={2}>Driver assigned within 24 hours; profile visible in your booking link.</Step>
              <Step n={3}>Driver name, phone, vehicle and plate arrive 12 hours before pickup.</Step>
              <Step n={4}>On the day: driver texts on arrival at your pickup address.</Step>
              <Step n={5}>After the trip: receipt and a review request by email.</Step>
            </ol>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-lg border border-line bg-surface-raised p-6">
            <p className="text-small text-ink-muted">Total charged</p>
            <div className="mt-1"><Price gel={b.amountGel} size="lg" /></div>
            <p className="mt-2 text-small text-ink-muted">Cancellation: free ≥24h before departure.</p>
          </section>
          <LinkButton href="/road-status" variant="outline" className="w-full justify-center">Live road status</LinkButton>
          <LinkButton href="/things-to-do" variant="ghost" className="w-full justify-center">Plan the rest of your day →</LinkButton>
        </aside>
      </div>
    </div>
  );
}

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-ink-muted">{label}</dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-small tabular text-primary">{n}</span>
      <span>{children}</span>
    </li>
  );
}
