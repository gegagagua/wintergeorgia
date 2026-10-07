import type { Route, VehicleClass } from "@/content/types";

const DISPLAY_ORDER: VehicleClass[] = ["shared", "sedan", "minivan", "suv4x4"];

export type RouteFromPrice = {
  priceGel: number;
  vehicleClass: VehicleClass;
  perSeat: boolean;
  maxPax: number;
};

/**
 * The single source of truth for the "from" price we promise in metadata,
 * hero asides and SERP titles. For routes with a shared seat we lead with
 * the per-seat price; otherwise we lead with the cheapest whole-vehicle.
 *
 * Returns `null` only if the route has no priced classes at all — that is a
 * data bug.
 */
export function routeFromPrice(route: Route): RouteFromPrice | null {
  const shared = route.prices.shared;
  if (shared) {
    return {
      priceGel: shared.priceGel,
      vehicleClass: "shared",
      perSeat: true,
      maxPax: shared.maxPax,
    };
  }
  type WholePair = { k: VehicleClass; v: { priceGel: number; maxPax: number } };
  const whole: WholePair[] = [];
  for (const k of DISPLAY_ORDER) {
    if (k === "shared") continue;
    const v = route.prices[k];
    if (v) whole.push({ k, v });
  }
  whole.sort((a, b) => a.v.priceGel - b.v.priceGel);
  const first = whole[0];
  if (!first) return null;
  return {
    priceGel: first.v.priceGel,
    vehicleClass: first.k,
    perSeat: false,
    maxPax: first.v.maxPax,
  };
}

/**
 * Vehicle classes available on a route, in a stable display order:
 * shared first (so the cheapest seat is always the first row), then
 * sedan → minivan → 4x4. The order never comes from JS object insertion.
 */
export function sortedVehicleClasses(route: Route): Array<[VehicleClass, { priceGel: number; maxPax: number }]> {
  return DISPLAY_ORDER
    .map((k) => [k, route.prices[k]] as const)
    .filter((x): x is [VehicleClass, { priceGel: number; maxPax: number }] => Boolean(x[1]));
}

export function vehicleClassLabel(vc: VehicleClass): string {
  return vc === "shared" ? "Shared seat" : vc === "sedan" ? "Sedan" : vc === "minivan" ? "Minivan" : "4x4 SUV";
}
