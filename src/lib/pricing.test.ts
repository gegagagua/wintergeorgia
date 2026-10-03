import { describe, expect, it } from "vitest";
import { quoteRoute, refundForCancellation, EXTRA_CHILD_SEAT_GEL, EXTRA_SKI_RACK_GEL, RETURN_MULTIPLIER } from "./pricing";
import type { Route } from "@/content/types";

const testRoute: Route = {
  slug: "tbilisi-airport-gudauri",
  from: { en: "TBS", ru: "TBS", ka: "TBS" },
  fromSlug: "tbilisi-airport",
  to: { en: "Gudauri", ru: "Gudauri", ka: "Gudauri" },
  toSlug: "gudauri",
  toResort: "gudauri",
  distanceKm: 140,
  durationMin: 150,
  requires4x4: false,
  isScheduled: false,
  description: { en: "", ru: "", ka: "" },
  prices: {
    shared: { priceGel: 40, maxPax: 1 },
    sedan: { priceGel: 180, maxPax: 3 },
    minivan: { priceGel: 260, maxPax: 7 },
  },
};

describe("quoteRoute", () => {
  it("flat-vehicle base for sedan", () => {
    const q = quoteRoute(testRoute, "sedan", 2);
    expect(q.valid).toBe(true);
    if (q.valid) expect(q.amount).toBe(180);
  });

  it("shared multiplies by pax", () => {
    const q = quoteRoute(testRoute, "shared", 1);
    expect(q.valid).toBe(true);
    if (q.valid) expect(q.amount).toBe(40);
  });

  it("adds child-seat + ski-rack extras", () => {
    const q = quoteRoute(testRoute, "sedan", 2, { childSeat: true, skiRack: true });
    expect(q.valid).toBe(true);
    if (q.valid) expect(q.amount).toBe(180 + EXTRA_CHILD_SEAT_GEL + EXTRA_SKI_RACK_GEL);
  });

  it("return leg applies the 1.9 multiplier after extras", () => {
    const q = quoteRoute(testRoute, "sedan", 2, { childSeat: true, returnLeg: true });
    expect(q.valid).toBe(true);
    if (q.valid) expect(q.amount).toBe(Math.round((180 + EXTRA_CHILD_SEAT_GEL) * RETURN_MULTIPLIER));
  });

  it("rejects when vehicle class is not offered on the route", () => {
    const q = quoteRoute(testRoute, "suv4x4", 2);
    expect(q.valid).toBe(false);
    if (!q.valid) expect(q.reason).toBe("class_unavailable");
  });

  it("rejects when pax exceeds capacity", () => {
    const q = quoteRoute(testRoute, "sedan", 5);
    expect(q.valid).toBe(false);
    if (!q.valid) {
      expect(q.reason).toBe("over_capacity");
      expect(q.maxPax).toBe(3);
    }
  });
});

describe("refundForCancellation", () => {
  it("full refund with 24h+ notice", () => {
    expect(refundForCancellation(200, 48, undefined)).toBe(200);
    expect(refundForCancellation(200, 24, undefined)).toBe(200);
  });

  it("50% penalty within 24h", () => {
    expect(refundForCancellation(200, 12, undefined)).toBe(100);
  });

  it("full refund on road closure regardless of notice", () => {
    expect(refundForCancellation(200, 1, "road_closed")).toBe(200);
  });

  it("full refund on flight delay regardless of notice", () => {
    expect(refundForCancellation(300, 0.5, "flight_delay")).toBe(300);
  });

  it("rounds the 50% penalty", () => {
    expect(refundForCancellation(195, 6, undefined)).toBe(98);
  });
});
