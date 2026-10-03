import { describe, expect, it } from "vitest";
import { createBooking, getBooking, updateBooking, listBookings, makeRef } from "./booking-store";

describe("makeRef", () => {
  it("has the GW- prefix and 6 additional chars", () => {
    const r = makeRef();
    expect(r).toMatch(/^GW-[A-Z2-9]{6}$/);
  });

  it("uses only unambiguous characters (no O/0/1/I/L)", () => {
    for (let i = 0; i < 200; i++) {
      const r = makeRef().slice(3);
      expect(r).not.toMatch(/[O01IL]/);
    }
  });
});

describe("booking store", () => {
  it("creates, reads, and updates a booking end to end", async () => {
    const created = await createBooking({
      routeSlug: "tbilisi-gudauri",
      travelDate: "2027-01-10",
      travelTime: "09:30",
      pax: 2,
      luggage: 2,
      skiCount: 2,
      vehicleClass: "sedan",
      customerName: "Ana Test",
      phone: "+995555000111",
      email: "ana@test.com",
      locale: "en",
      extras: {},
      amountGel: 160,
    });
    expect(created.status).toBe("pending");
    expect(created.commissionGel).toBe(Math.round(160 * 0.2));

    const fetched = await getBooking(created.ref);
    expect(fetched?.ref).toBe(created.ref);

    const updated = await updateBooking(created.ref, { status: "paid", paymentRef: "mock_x" });
    expect(updated?.status).toBe("paid");
    expect(updated?.paymentRef).toBe("mock_x");

    const list = await listBookings();
    expect(list.map((b) => b.ref)).toContain(created.ref);
  });

  it("returns undefined when a ref does not exist", async () => {
    const b = await getBooking("GW-NOPE00");
    expect(b).toBeUndefined();
  });
});
