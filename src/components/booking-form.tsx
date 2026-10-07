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

const strings = {
  en: {
    vehicle: "Vehicle",
    sharedSeat: "Shared seat",
    sedan: "Sedan",
    minivan: "Minivan",
    suv: "4x4 SUV",
    perPerson: "Per person · shared vehicle",
    uptoPax: (p: number, g: number) => `Up to ${p} passengers · ${g} ₾ flat`,
    date: "Date",
    time: "Time",
    passengers: "Passengers",
    luggage: "Luggage pieces",
    ski: "Ski / snowboard bags",
    flight: "Flight number",
    flightHint: "We track delays automatically.",
    extras: "Extras",
    childSeat: (p: number) => `Child seat (+${p} ₾)`,
    skiRack: (p: number) => `Ski rack (+${p} ₾)`,
    returnLeg: "Return leg (-10%)",
    fullName: "Full name",
    phone: "Phone (WhatsApp)",
    phoneHint: "Driver contacts you 12h before pickup.",
    email: "Email",
    pickup: "Pickup address",
    pickupHint: "Hotel, apartment or landmark.",
    fixedPrice: "Fixed price",
    cancellationNote: "Free cancellation ≥24h before departure. Refund if the road closes.",
    cta: "Continue to payment",
    redirecting: "Redirecting…",
    overCapacity: (m: number) => `Max ${m} passengers for this vehicle.`,
    pickClass: "Select an available vehicle class.",
    fail: "Could not create the booking. Try again.",
  },
  ru: {
    vehicle: "Класс машины",
    sharedSeat: "Шеринговое место",
    sedan: "Седан",
    minivan: "Минивэн",
    suv: "Внедорожник 4x4",
    perPerson: "С человека · общий автомобиль",
    uptoPax: (p: number, g: number) => `До ${p} пассажиров · ${g} ₾ фикс`,
    date: "Дата",
    time: "Время",
    passengers: "Пассажиров",
    luggage: "Багаж (мест)",
    ski: "Лыжи / сноуборды",
    flight: "Номер рейса",
    flightHint: "Отслеживаем задержки автоматически.",
    extras: "Доплаты",
    childSeat: (p: number) => `Детское кресло (+${p} ₾)`,
    skiRack: (p: number) => `Лыжный багажник (+${p} ₾)`,
    returnLeg: "Обратно (-10%)",
    fullName: "Имя",
    phone: "Телефон (WhatsApp)",
    phoneHint: "Водитель напишет за 12 часов до подачи.",
    email: "Email",
    pickup: "Адрес подачи",
    pickupHint: "Отель, квартира или ориентир.",
    fixedPrice: "Фиксированная цена",
    cancellationNote: "Бесплатная отмена за 24 часа и ранее. Возврат при закрытии дороги.",
    cta: "Перейти к оплате",
    redirecting: "Переходим…",
    overCapacity: (m: number) => `Максимум ${m} пассажиров для этой машины.`,
    pickClass: "Выберите доступный класс машины.",
    fail: "Не удалось создать бронь. Попробуйте снова.",
  },
  ka: {
    vehicle: "მანქანის კლასი",
    sharedSeat: "გაზიარებული ადგილი",
    sedan: "სედანი",
    minivan: "მინივენი",
    suv: "4x4 ჯიპი",
    perPerson: "ერთ ადამიანზე · საერთო მანქანა",
    uptoPax: (p: number, g: number) => `${p} მგზავრამდე · ${g} ₾ ფიქს.`,
    date: "თარიღი",
    time: "დრო",
    passengers: "მგზავრები",
    luggage: "ბარგი (ცალი)",
    ski: "თხილამურის / სნოუბორდის ჩანთა",
    flight: "ფრენის ნომერი",
    flightHint: "დაგვიანებას ავტომატურად ვთვალთვალებთ.",
    extras: "დანამატები",
    childSeat: (p: number) => `ბავშვის სავარძელი (+${p} ₾)`,
    skiRack: (p: number) => `თხილამურის ჯიხური (+${p} ₾)`,
    returnLeg: "უკან დაბრუნება (-10%)",
    fullName: "სახელი და გვარი",
    phone: "ტელეფონი (WhatsApp)",
    phoneHint: "მძღოლი 12 საათით ადრე დაგიკავშირდებათ.",
    email: "ელ-ფოსტა",
    pickup: "აყვანის მისამართი",
    pickupHint: "სასტუმრო, ბინა ან ორიენტირი.",
    fixedPrice: "ფიქსირებული ფასი",
    cancellationNote: "უფასო გაუქმება გასვლამდე 24 სთ ან მეტი. გზის დახურვისას — სრული დაბრუნება.",
    cta: "გადახდაზე გადასვლა",
    redirecting: "გადასვლა…",
    overCapacity: (m: number) => `მაქს. ${m} მგზავრი ამ მანქანისთვის.`,
    pickClass: "აირჩიეთ ხელმისაწვდომი კლასი.",
    fail: "დაჯავშნა ვერ შექმნა. სცადეთ თავიდან.",
  },
};

export function BookingForm({ route }: { route: Route }) {
  const router = useRouter();
  const locale = useLocale() as "en" | "ru" | "ka";
  const t = strings[locale] ?? strings.en;
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
      setError(quote.reason === "over_capacity" ? t.overCapacity(quote.maxPax) : t.pickClass);
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
        setError(typeof body.error === "string" ? body.error : t.fail);
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
        <p className="mb-3 text-small font-medium text-ink">{t.vehicle}</p>
        <RadioGroup
          name="vehicleClass"
          value={vc}
          onChange={(v) => setVc(v as VehicleClass)}
          options={classes.map(([k, v]) => ({
            value: k,
            label:
              k === "shared" ? t.sharedSeat : k === "sedan" ? t.sedan : k === "minivan" ? t.minivan : t.suv,
            hint: k === "shared" ? t.perPerson : t.uptoPax(v.maxPax, v.priceGel),
          }))}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.date} htmlFor="travelDate"><Input id="travelDate" type="date" min={tomorrow()} value={travelDate} onChange={(e) => setTravelDate(e.target.value)} required /></Field>
        <Field label={t.time} htmlFor="travelTime"><Input id="travelTime" type="time" value={travelTime} onChange={(e) => setTravelTime(e.target.value)} required /></Field>
        <Field label={t.passengers} htmlFor="pax"><Input id="pax" type="number" min={1} max={9} value={pax} onChange={(e) => setPax(Number(e.target.value))} required /></Field>
        <Field label={t.luggage} htmlFor="luggage"><Input id="luggage" type="number" min={0} max={20} value={luggage} onChange={(e) => setLuggage(Number(e.target.value))} /></Field>
        <Field label={t.ski} htmlFor="ski"><Input id="ski" type="number" min={0} max={20} value={skiCount} onChange={(e) => setSkiCount(Number(e.target.value))} /></Field>
        {isAirport ? (
          <Field label={t.flight} htmlFor="flight" hint={t.flightHint}><Input id="flight" value={flightNo} onChange={(e) => setFlightNo(e.target.value.toUpperCase())} placeholder="A9 123" /></Field>
        ) : null}
      </div>

      <Field label={t.extras}>
        <div className="grid gap-2 md:grid-cols-3">
          <Checkbox label={t.childSeat(EXTRA_CHILD_SEAT_GEL)} checked={!!extras.childSeat} onChange={(e) => setExtras((x) => ({ ...x, childSeat: e.target.checked }))} />
          <Checkbox label={t.skiRack(EXTRA_SKI_RACK_GEL)} checked={!!extras.skiRack} onChange={(e) => setExtras((x) => ({ ...x, skiRack: e.target.checked }))} />
          <Checkbox label={t.returnLeg} checked={!!extras.returnLeg} onChange={(e) => setExtras((x) => ({ ...x, returnLeg: e.target.checked }))} />
        </div>
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label={t.fullName} htmlFor="name"><Input id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required /></Field>
        <Field label={t.phone} htmlFor="phone" hint={t.phoneHint}><Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required /></Field>
        <Field label={t.email} htmlFor="email"><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
        <Field label={t.pickup} htmlFor="pickup" hint={t.pickupHint}><Input id="pickup" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} /></Field>
      </div>

      <div className="flex flex-col items-start justify-between gap-4 rounded-lg border border-line bg-surface-raised p-5 sm:flex-row sm:items-center">
        <div>
          <div className="text-small text-ink-muted">{t.fixedPrice}</div>
          <div className="mt-1"><Price gel={quote.valid ? quote.amount : 0} size="lg" /></div>
          <div className="mt-1 text-small text-ink-muted">{t.cancellationNote}</div>
        </div>
        <Button type="submit" variant="cta" size="lg" disabled={pending || !quote.valid}>
          {pending ? t.redirecting : t.cta}
        </Button>
      </div>

      {error ? (
        <p className="text-small text-status-closed" role="alert">{error}</p>
      ) : null}
      {router && classes.length > 0 ? null : null}
    </form>
  );
}
