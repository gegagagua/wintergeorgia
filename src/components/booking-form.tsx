"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import type { Route, VehicleClass } from "@/content/types";
import { Field, Input, Checkbox, RadioGroup } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import {
  EXTRA_CHILD_SEAT_GEL,
  EXTRA_SKI_RACK_GEL,
  quoteRoute,
  type Extras,
} from "@/lib/pricing";
import { readAttribution, track } from "@/lib/analytics";

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

export function BookingForm({ route }: { route: Route }) {
  const router = useRouter();
  const locale = useLocale() as "en" | "ru" | "ka";
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const classes = Object.entries(route.prices).filter(([, v]) => v) as [VehicleClass, { priceGel: number; maxPax: number }][];
  const [vc, setVc] = useState<VehicleClass>(classes[0]?.[0] ?? "sedan");
  const [pax, setPax] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [skiCount, setSkiCount] = useState(0);
  const [extras, setExtras] = useState<Extras>({});
  const [travelDate, setTravelDate] = useState(tomorrow());
  const [travelTime, setTravelTime] = useState("09:00");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [flightNo, setFlightNo] = useState("");

  const isAirport = route.fromSlug.includes("airport");
  const quote = useMemo(() => quoteRoute(route, vc, pax, extras), [route, vc, pax, extras]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!quote.valid) {
      setError(quote.reason === "over_capacity" ? `Max ${quote.maxPax} passengers for this vehicle.` : "Select an available vehicle class.");
      return;
    }
    startTransition(async () => {
      const attribution = readAttribution();
      track("booking_started", { routeSlug: route.slug, vehicleClass: vc, pax });
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          routeSlug: route.slug,
          travelDate,
          travelTime,
          pax,
          luggage,
          skiCount,
          vehicleClass: vc,
          customerName,
          phone,
          email,
          locale,
          pickupAddress: pickupAddress || undefined,
          flightNo: isAirport ? flightNo || undefined : undefined,
          extras,
          amountGel: quote.valid ? quote.amount : 0,
          attribution,
        }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: unknown };
        setError(typeof body.error === "string" ? body.error : "Could not create the booking. Try again.");
        return;
      }
      const body = (await res.json()) as { ref: string; redirectUrl: string };
      // Immediately follow the mock payment redirect.
      window.location.href = body.redirectUrl;
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <p className="mb-3 text-small font-medium text-ink">Vehicle</p>
        <RadioGroup
          name="vehicleClass"
          value={vc}
          onChange={(v) => setVc(v as VehicleClass)}
          options={classes.map(([k, v]) => ({
            value: k,
            label:
              k === "shared" ? "Shared seat" : k === "sedan" ? "Sedan" : k === "minivan" ? "Minivan" : "4x4 SUV",
            hint:
              k === "shared"
                ? `Per person · shared vehicle`
                : `Up to ${v.maxPax} passengers · ${v.priceGel} ₾ flat`,
          }))}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Date" htmlFor="travelDate"><Input id="travelDate" type="date" min={tomorrow()} value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required /></Field>
        <Field label="Time" htmlFor="travelTime"><Input id="travelTime" type="time" value={travelTime} onChange={(e) => setTravelTime(e.target.value)} required /></Field>
        <Field label="Passengers" htmlFor="pax"><Input id="pax" type="number" min={1} max={9} value={pax} onChange={(e) => setPax(Number(e.target.value))} required /></Field>
        <Field label="Luggage pieces" htmlFor="luggage"><Input id="luggage" type="number" min={0} max={20} value={luggage} onChange={(e) => setLuggage(Number(e.target.value))} /></Field>
        <Field label="Ski / snowboard bags" htmlFor="ski"><Input id="ski" type="number" min={0} max={20} value={skiCount} onChange={(e) => setSkiCount(Number(e.target.value))} /></Field>
        {isAirport ? (
          <Field label="Flight number" htmlFor="flight" hint="We track delays automatically."><Input id="flight" value={flightNo} onChange={(e) => setFlightNo(e.target.value.toUpperCase())} placeholder="A9 123" /></Field>
        ) : null}
      </div>

      <Field label="Extras">
        <div className="grid gap-2 md:grid-cols-3">
          <Checkbox label={`Child seat (+${EXTRA_CHILD_SEAT_GEL} ₾)`} checked={!!extras.childSeat} onChange={(e) => setExtras((x) => ({ ...x, childSeat: e.target.checked }))} />
          <Checkbox label={`Ski rack (+${EXTRA_SKI_RACK_GEL} ₾)`} checked={!!extras.skiRack} onChange={(e) => setExtras((x) => ({ ...x, skiRack: e.target.checked }))} />
          <Checkbox label={`Return leg (-10%)`} checked={!!extras.returnLeg} onChange={(e) => setExtras((x) => ({ ...x, returnLeg: e.target.checked }))} />
        </div>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Full name" htmlFor="name"><Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required /></Field>
        <Field label="Phone (WhatsApp)" htmlFor="phone" hint="Driver contacts you 12h before pickup."><Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Field>
        <Field label="Email" htmlFor="email"><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
        <Field label="Pickup address" htmlFor="pickup" hint="Hotel, apartment or landmark."><Input id="pickup" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} /></Field>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-line bg-surface-raised p-5 sm:flex-row sm:items-center">
        <div>
          <div className="text-small text-ink-muted">Fixed price</div>
          <div className="mt-1"><Price gel={quote.valid ? quote.amount : 0} size="lg" /></div>
          <div className="mt-1 text-small text-ink-muted">
            Free cancellation ≥24h before departure. Refund if the road closes.
          </div>
        </div>
        <Button type="submit" variant="cta" size="lg" disabled={pending || !quote.valid}>
          {pending ? "Redirecting…" : "Continue to payment"}
        </Button>
      </div>

      {error ? (
        <p className="text-small text-status-closed" role="alert">{error}</p>
      ) : null}
      {router && classes.length > 0 ? null : null}
    </form>
  );
}
