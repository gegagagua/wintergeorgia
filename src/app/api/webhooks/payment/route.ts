import { NextResponse, type NextRequest } from "next/server";
import { getBooking } from "@/lib/booking-store";
import { applyPaymentResult } from "@/lib/payment";
import { queueNotification } from "@/lib/notify";

/**
 * Payment webhook. The mock provider redirects the user here after payment;
 * a real BOG/TBC integration would sign the request — we verify a shared
 * secret when PAYMENT_WEBHOOK_SECRET is set, and idempotently apply the
 * result. Redirects the browser back to the confirmation page.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const ref = url.searchParams.get("ref");
  const paymentRef = url.searchParams.get("payment");
  const outcome = url.searchParams.get("outcome");

  if (!ref || !paymentRef || (outcome !== "success" && outcome !== "fail")) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const secret = process.env.PAYMENT_WEBHOOK_SECRET;
  const provided = url.searchParams.get("secret");
  if (secret && provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const before = await getBooking(ref);
  if (!before) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (before.status !== "pending") {
    return NextResponse.redirect(new URL(`/${before.locale === "en" ? "" : `${before.locale}/`}transfers/confirmation/${ref}`, url.origin));
  }

  const b = await applyPaymentResult(ref, paymentRef, outcome);
  if (b?.status === "paid") queueNotification("booking_paid", ["email", "whatsapp"], b);

  const localePrefix = before.locale === "en" ? "" : `${before.locale}/`;
  return NextResponse.redirect(new URL(`/${localePrefix}transfers/confirmation/${ref}`, url.origin));
}
