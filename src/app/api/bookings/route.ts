import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { findRoute } from "@/content/routes";
import { createBooking } from "@/lib/booking-store";
import { initPayment } from "@/lib/payment";
import { callerKey, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const bookingSchema = z.object({
  routeSlug: z.string().min(1),
  travelDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  travelTime: z.string().regex(/^\d{2}:\d{2}$/),
  pax: z.number().int().min(1).max(9),
  luggage: z.number().int().min(0).max(20).default(0),
  skiCount: z.number().int().min(0).max(20).default(0),
  vehicleClass: z.enum(["shared", "sedan", "minivan", "suv4x4"]),
  customerName: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
  locale: z.enum(["en", "ru", "ka"]),
  pickupAddress: z.string().max(300).optional(),
  flightNo: z.string().max(20).optional(),
  extras: z
    .object({
      childSeat: z.boolean().optional(),
      skiRack: z.boolean().optional(),
      returnLeg: z.boolean().optional(),
    })
    .default({}),
  amountGel: z.number().int().positive(),
  turnstileToken: z.string().optional(),
  attribution: z
    .object({
      utmSource: z.string().max(60).optional(),
      utmMedium: z.string().max(60).optional(),
      utmCampaign: z.string().max(120).optional(),
      utmTerm: z.string().max(120).optional(),
      utmContent: z.string().max(120).optional(),
      referralCode: z.string().max(32).optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  const limit = rateLimit(callerKey(request, "booking"), { max: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json({ error: "rate_limited", resetInMs: limit.resetInMs }, { status: 429 });
  }
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const route = findRoute(parsed.data.routeSlug);
  if (!route) return NextResponse.json({ error: "route_not_found" }, { status: 404 });

  const okTurnstile = await verifyTurnstile(parsed.data.turnstileToken, callerKey(request, "").split(":").pop());
  if (!okTurnstile) return NextResponse.json({ error: "bot_check_failed" }, { status: 400 });

  const { turnstileToken: _tt, ...bookingInput } = parsed.data;
  void _tt;
  const booking = await createBooking(bookingInput);
  const payment = await initPayment(booking);

  return NextResponse.json({ ref: booking.ref, redirectUrl: payment.redirectUrl });
}
