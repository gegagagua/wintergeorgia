import "server-only";
import type { Booking } from "./booking-store";

/**
 * Notification stubs. Prod: enqueue through QStash and deliver via
 * WhatsApp Business API + Resend/SendGrid + Telegram bot
 * (docs/09-api-and-integrations.md). We log the intent so the flow is
 * visible in development.
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
}
