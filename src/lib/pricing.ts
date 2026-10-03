import type { Route, VehicleClass } from "@/content/types";

export const EXTRA_CHILD_SEAT_GEL = 15;
export const EXTRA_SKI_RACK_GEL = 20;
export const RETURN_MULTIPLIER = 1.9;

export type Extras = { childSeat?: boolean; skiRack?: boolean; returnLeg?: boolean };

export type Quote =
  | { valid: true; amount: number; base: number; maxPax: number }
  | { valid: false; reason: "class_unavailable" | "over_capacity"; maxPax: number };

export function quoteRoute(
  route: Route,
  vehicleClass: VehicleClass,
  pax: number,
  extras: Extras = {},
): Quote {
  const price = route.prices[vehicleClass];
  if (!price) return { valid: false, reason: "class_unavailable", maxPax: 0 };
  if (pax > price.maxPax) return { valid: false, reason: "over_capacity", maxPax: price.maxPax };
  const base = vehicleClass === "shared" ? price.priceGel * pax : price.priceGel;
  let amount = base;
  if (extras.childSeat) amount += EXTRA_CHILD_SEAT_GEL;
  if (extras.skiRack) amount += EXTRA_SKI_RACK_GEL;
  if (extras.returnLeg) amount = Math.round(amount * RETURN_MULTIPLIER);
  return { valid: true, amount, base, maxPax: price.maxPax };
}

/**
 * Cancellation refund calculation.
 * - Road closure or ≥24h notice → full refund.
 * - Under 24h → 50% penalty.
 * - Flight delays (caller sets `reason: "flight_delay"`) → full refund.
 */
export function refundForCancellation(
  amountGel: number,
  hoursUntilDeparture: number,
  reason: string | undefined,
): number {
  if (reason === "road_closed" || reason === "flight_delay") return amountGel;
  if (hoursUntilDeparture >= 24) return amountGel;
  return Math.round(amountGel * 0.5);
}
