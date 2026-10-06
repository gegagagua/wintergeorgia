import "server-only";
import type { Booking } from "./booking-store";
import { sendBookingConfirmationEmail } from "./email";

/**
 * Notification dispatcher. Email goes through Resend today
 * (src/lib/email.ts); WhatsApp + Telegram are still stubs — they'll be
 * wired to QStash + WhatsApp Business API per docs/09-api-and-integrations.md.
 */

type Channel = "email" | "whatsapp" | "telegram";
type Event =
  | "booking_paid"
  | "booking_t12h"
  | "booking_t2h"
  | "booking_road_closed"
  | "booking_after_trip";

export function queueNotification(event: Event, channels: Channel[], booking: Booking) {
  console.log(
    `[notify] event=${event} channels=${channels.join(",")} ref=${booking.ref} to=${booking.email}`,
  );

  if (channels.includes("email") && event === "booking_paid") {
    // Fire-and-forget so the webhook returns fast. Errors land in logs.
    void sendBookingConfirmationEmail(booking);
  }
}
