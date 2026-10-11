"use client";

import { useMemo, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Repeat } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import type { Route, VehicleClass } from "@/content/types";
import { quoteRoute } from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

type Props = { routes: Route[] };

const tomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
};

const swapMap: Record<string, string> = {
  "tbilisi-airport-gudauri": "gudauri",
  "tbilisi-gudauri": "tbilisi",
  "tbilisi-bakuriani": "tbilisi",
  "tbilisi-kazbegi": "tbilisi",
  "gudauri-kazbegi": "gudauri",
  "kutaisi-airport-mestia": "kutaisi-airport",
  "zugdidi-mestia": "zugdidi",
  "mestia-tetnuldi": "mestia",
  "mestia-hatsvali": "mestia",
  "batumi-goderdzi": "batumi",
};

/**
 * Inline quick-book widget for the hero. Live quote, feels like a booking
 * counter. Submits to the route page with pre-filled state.
 */
export function QuickBookWidget({ routes }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("quickBook");
  const router = useRouter();
  const [routeSlug, setRouteSlug] = useState(routes[0]?.slug ?? "tbilisi-airport-gudauri");
  const activeRoute = routes.find((r) => r.slug === routeSlug) ?? routes[0]!;
  const [vc, setVc] = useState<VehicleClass>(pickDefaultClass(activeRoute));
  const [pax, setPax] = useState(2);
  const [travelDate, setTravelDate] = useState(tomorrow());
  const [pending, startTransition] = useTransition();

  const quote = useMemo(() => quoteRoute(activeRoute, vc, pax), [activeRoute, vc, pax]);

  const onRouteChange = (slug: string) => {
    const next = routes.find((r) => r.slug === slug);
    if (!next) return;
    setRouteSlug(next.slug);
    setVc(pickDefaultClass(next));
  };

  const goBook = () => {
    startTransition(() => {
      router.push(`/transfers/${routeSlug}` as never);
    });
  };

  const classes = Object.entries(activeRoute.prices).filter(([, v]) => v) as [
    VehicleClass,
    { priceGel: number; maxPax: number },
  ][];

  const vehicleLabel = (c: "shared" | "sedan" | "minivan" | "suv4x4") => t(c);

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-surface p-5 shadow-[0_20px_60px_-30px_rgba(14,22,32,0.7)] md:p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-small font-medium text-primary">{t("title")}</p>
        <span className="inline-flex items-center gap-1.5 text-small tabular text-ink-muted">
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-status-open opacity-70" />
            <span className="relative inline-block h-2 w-2 rounded-full bg-status-open" />
          </span>
          {t("livePrices")}
        </span>
      </div>

      <label className="mb-3 block text-small">
        <span className="mb-1 block text-ink-muted">{t("route")}</span>
        <div className="flex items-center gap-2 rounded-sm border border-line bg-surface-raised px-3 py-2">
          <select
            value={routeSlug}
            onChange={(e) => onRouteChange(e.target.value)}
            className="flex-1 bg-transparent text-ink outline-none"
          >
            {routes.map((r) => (
              <option key={r.slug} value={r.slug}>
                {r.from[locale]} → {r.to[locale]}
              </option>
            ))}
          </select>
          <Repeat aria-hidden="true" className="h-4 w-4 text-ink-muted" strokeWidth={1.75} />
        </div>
        <p className="mt-1 text-small text-ink-muted tabular">
          {activeRoute.distanceKm} km · {(activeRoute.durationMin / 60).toFixed(activeRoute.durationMin % 60 === 0 ? 0 : 1)}h
          {activeRoute.requires4x4 ? ` · ${t("need4x4")}` : ""}
        </p>
      </label>

      <div className="mb-3 grid grid-cols-2 gap-3">
        <label className="text-small">
          <span className="mb-1 block text-ink-muted">{t("date")}</span>
          <input
            type="date"
            value={travelDate}
            min={tomorrow()}
            onChange={(e) => setTravelDate(e.target.value)}
            className="block w-full rounded-sm border border-line bg-surface-raised px-3 py-2 text-ink"
          />
        </label>
        <label className="text-small">
          <span className="mb-1 block text-ink-muted">{t("passengers")}</span>
          <input
            type="number"
            min={1}
            max={9}
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            className="block w-full rounded-sm border border-line bg-surface-raised px-3 py-2 text-ink tabular"
          />
        </label>
      </div>

      <div className="mb-4">
        <span className="mb-1.5 block text-small text-ink-muted">{t("vehicle")}</span>
        <div className="grid grid-cols-4 gap-1.5">
          {(["shared", "sedan", "minivan", "suv4x4"] as const).map((c) => {
            const avail = classes.find(([k]) => k === c);
            const active = vc === c;
            return (
              <button
                key={c}
                type="button"
                disabled={!avail}
                onClick={() => setVc(c)}
                className={
                  "rounded-sm border px-2 py-1.5 text-small transition-colors duration-150 tabular " +
                  (active
                    ? "border-primary bg-primary/10 text-primary"
                    : avail
                      ? "border-line bg-surface text-ink hover:border-primary-hover"
                      : "border-line bg-surface text-ink-muted opacity-40")
                }
              >
                {vehicleLabel(c)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-4 flex items-baseline justify-between border-t border-line pt-4">
        <div>
          <p className="text-small text-ink-muted">{t("fixedPrice")}</p>
          <p className="tabular text-[28px] leading-[32px] font-semibold text-accent">
            {quote.valid ? `${quote.amount.toLocaleString("en-US")} ₾` : "—"}
          </p>
        </div>
        <div className="text-right text-small text-ink-muted">
          {quote.valid ? (
            <>
              {vc === "shared" ? t("perGroup") : t("flatAllIn")}
              <br />
              {t("cancelFree")}
            </>
          ) : (
            <span className="text-status-limited">{t("maxPaxForClass", { n: quote.maxPax })}</span>
          )}
        </div>
      </div>

      <Button
        variant="cta"
        size="md"
        arrow
        onClick={goBook}
        disabled={pending || !quote.valid}
        className="!w-full"
      >
        {pending ? t("opening") : t("continueBooking")}
      </Button>

      <ul className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-small text-ink-muted">
        <li className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1 w-1 rounded-full bg-status-open" /> {t("trustFixedPrice")}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1 w-1 rounded-full bg-status-open" /> {t("trustRefund")}
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span className="inline-block h-1 w-1 rounded-full bg-status-open" /> {t("trustDriver")}
        </li>
      </ul>
      {swapMap[routeSlug] ? null : null}
    </div>
  );
}

function pickDefaultClass(route: Route): VehicleClass {
  if (route.prices.sedan) return "sedan";
  if (route.prices.minivan) return "minivan";
  if (route.prices.suv4x4) return "suv4x4";
  return "shared";
}
