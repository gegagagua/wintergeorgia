import "server-only";

/**
 * Booking store — two backends behind one async interface:
 *
 * - In-memory (default, demo mode). Backed by a `Map` on `globalThis` so
 *   dev workers share it.
 * - Drizzle + Postgres (production). Activated automatically when
 *   `DATABASE_URL` is set. Set `GW_MEMORY_BOOKINGS=1` to force in-memory.
 *
 * The DB backend also mirrors writes to memory so read-after-write remains
 * consistent even if the DB is momentarily unreachable.
 */

import type { VehicleClass } from "@/content/types";

export type BookingStatus =
  | "pending"
  | "paid"
  | "assigned"
  | "completed"
  | "cancelled"
  | "refunded";

export type Booking = {
  ref: string;
  routeSlug: string;
  travelDate: string;
  travelTime: string;
  pax: number;
  luggage: number;
  skiCount: number;
  vehicleClass: VehicleClass;
  customerName: string;
  phone: string;
  email: string;
  locale: "en" | "ru" | "ka";
  pickupAddress?: string;
  flightNo?: string;
  extras: { childSeat?: boolean; skiRack?: boolean; returnLeg?: boolean };
  amountGel: number;
  commissionGel: number;
  status: BookingStatus;
  paymentRef?: string;
  cancelledReason?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateBookingInput = Omit<
  Booking,
  "ref" | "status" | "createdAt" | "updatedAt" | "commissionGel"
> & { commissionPct?: number };

const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ"; // no O/0/1/I/L confusables
export function makeRef(): string {
  let r = "GW-";
  for (let i = 0; i < 6; i++) r += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  return r;
}

declare global {
  var __gwBookings: Map<string, Booking> | undefined;
}
const mem: Map<string, Booking> = globalThis.__gwBookings ?? new Map<string, Booking>();
globalThis.__gwBookings = mem;

const dbEnabled = Boolean(process.env.DATABASE_URL) && process.env.GW_MEMORY_BOOKINGS !== "1";

export async function createBooking(input: CreateBookingInput): Promise<Booking> {
  const commissionPct = input.commissionPct ?? 0.2;
  const commissionGel = Math.round(input.amountGel * commissionPct);
  let ref = makeRef();
  while (mem.has(ref)) ref = makeRef();
  const now = new Date().toISOString();
  const booking: Booking = {
    ...input,
    ref,
    commissionGel,
    status: "pending",
    createdAt: now,
    updatedAt: now,
  };
  mem.set(ref, booking);

  if (dbEnabled) {
    try {
      const [{ db }, schema] = await Promise.all([
        import("@/db/client"),
        import("@/db/schema"),
      ]);
      await db.insert(schema.bookings).values({
        ref,
        routeId: input.routeSlug,
        travelDate: input.travelDate,
        travelTime: input.travelTime,
        pax: input.pax,
        luggage: input.luggage,
        skiCount: input.skiCount,
        vehicleClass: input.vehicleClass,
        customerName: input.customerName,
        phone: input.phone,
        email: input.email,
        locale: input.locale,
        pickupAddress: input.pickupAddress,
        flightNo: input.flightNo,
        extras: input.extras,
        amountTetri: input.amountGel * 100,
        commissionTetri: commissionGel * 100,
        status: "pending",
      });
    } catch (err) {
      console.error("[booking-store] DB insert failed, kept in-memory only", err);
    }
  }

  return booking;
}

export async function getBooking(ref: string): Promise<Booking | undefined> {
  return mem.get(ref);
}

export async function updateBooking(
  ref: string,
  patch: Partial<Booking>,
): Promise<Booking | undefined> {
  const current = mem.get(ref);
  if (!current) return undefined;
  const next: Booking = { ...current, ...patch, updatedAt: new Date().toISOString() };
  mem.set(ref, next);

  if (dbEnabled) {
    try {
      const [{ db }, schema, orm] = await Promise.all([
        import("@/db/client"),
        import("@/db/schema"),
        import("drizzle-orm"),
      ]);
      const dbPatch: Record<string, unknown> = {};
      if (patch.status !== undefined) dbPatch.status = patch.status;
      if (patch.paymentRef !== undefined) dbPatch.paymentRef = patch.paymentRef;
      if (patch.cancelledReason !== undefined) dbPatch.cancelledReason = patch.cancelledReason;
      if (Object.keys(dbPatch).length > 0) {
        await db.update(schema.bookings).set(dbPatch).where(orm.eq(schema.bookings.ref, ref));
      }
    } catch (err) {
      console.error("[booking-store] DB update failed", err);
    }
  }
  return next;
}

export async function listBookings(): Promise<Booking[]> {
  return Array.from(mem.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
