import "server-only";
import { updateBooking, type Booking } from "./booking-store";

/**
 * Mock payment provider. Replace with BOG/TBC e-commerce integration.
 * The interface (initPayment + webhook) matches the shape both providers need.
 */
export async function initPayment(booking: Booking): Promise<{ redirectUrl: string; paymentRef: string }> {
  const paymentRef = `mock_${booking.ref}_${Date.now()}`;
  await updateBooking(booking.ref, { paymentRef });
  const redirectUrl = `/api/webhooks/payment?ref=${booking.ref}&payment=${paymentRef}&outcome=success`;
  return { redirectUrl, paymentRef };
}

export async function applyPaymentResult(
  ref: string,
  paymentRef: string,
  outcome: "success" | "fail",
): Promise<Booking | undefined> {
  return updateBooking(ref, {
    status: outcome === "success" ? "paid" : "cancelled",
    paymentRef,
    cancelledReason: outcome === "fail" ? "payment_declined" : undefined,
  });
}
