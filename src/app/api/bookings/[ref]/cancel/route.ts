import { NextResponse, type NextRequest } from "next/server";
import { getBooking, updateBooking } from "@/lib/booking-store";
import { queueNotification } from "@/lib/notify";
import { refundForCancellation } from "@/lib/pricing";

/**
 * Cancellation policy: free ≥24h before departure, 50% penalty within 24h,
 * always free if a road closure caused the cancellation.
 * (docs/04-transfers.md — rules that create trust)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ref: string }> },
) {
  const { ref } = await params;
  const b = await getBooking(ref);
  if (!b) return NextResponse.json({ error: "not_found" }, { status: 404 });
  if (b.status !== "paid" && b.status !== "pending" && b.status !== "assigned") {
    return NextResponse.json({ error: "not_cancellable", status: b.status }, { status: 409 });
  }

  const body = (await request.json().catch(() => ({}))) as { reason?: string };
  const departure = new Date(`${b.travelDate}T${b.travelTime}:00`);
  const hoursUntil = (departure.getTime() - Date.now()) / (1000 * 60 * 60);
  const refundGel = refundForCancellation(b.amountGel, hoursUntil, body.reason);

  const updated = await updateBooking(ref, {
    status: refundGel > 0 ? "refunded" : "cancelled",
    cancelledReason: body.reason ?? "customer_request",
  });

  if (updated) queueNotification("booking_after_trip", ["email"], updated);

  return NextResponse.json({ ref, refundGel, status: updated?.status });
}
