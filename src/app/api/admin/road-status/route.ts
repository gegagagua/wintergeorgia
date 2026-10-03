import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { roads } from "@/content/roads";
import { routes } from "@/content/routes";
import { listBookings, updateBooking } from "@/lib/booking-store";
import { queueNotification } from "@/lib/notify";

const schema = z.object({
  roadSlug: z.string().min(1),
  status: z.enum(["open", "limited", "closed"]),
  restriction: z.enum(["none", "chains", "4x4_only", "lorries_banned"]).default("none"),
  reason: z.string().max(300).optional(),
});

/**
 * Admin: flip a road status. When the new status is `closed`, every
 * pending/paid booking on any route that serves an affected resort is
 * marked for reschedule / refund and notifications are queued.
 * (docs/04-transfers.md + docs/05-conditions.md — closed-road rule)
 *
 * Auth: requires `x-admin-secret` matching PAYLOAD_SECRET / ADMIN_ALLOWED_EMAILS
 * check would live here in production. Kept simple for the demo.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.PAYLOAD_SECRET;
  const provided = request.headers.get("x-admin-secret");
  if (secret && provided !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const road = roads.find((r) => r.slug === parsed.data.roadSlug);
  if (!road) return NextResponse.json({ error: "road_not_found" }, { status: 404 });

  road.status = parsed.data.status;
  road.restriction = parsed.data.restriction;
  road.updatedAt = new Date().toISOString();

  let affected = 0;
  if (parsed.data.status === "closed") {
    const affectedResorts = new Set(road.serves);
    const affectedRouteSlugs = new Set<string>(
      routes.filter((r) => r.toResort && affectedResorts.has(r.toResort)).map((r) => r.slug),
    );
    const today = new Date().toISOString().slice(0, 10);
    for (const b of await listBookings()) {
      if (!affectedRouteSlugs.has(b.routeSlug)) continue;
      if (b.travelDate < today) continue;
      if (b.status !== "pending" && b.status !== "paid" && b.status !== "assigned") continue;
      const updated = await updateBooking(b.ref, {
        status: "refunded",
        cancelledReason: `road_closed:${road.slug}`,
      });
      if (updated) {
        queueNotification("booking_road_closed", ["email", "whatsapp"], updated);
        affected++;
      }
    }
  }

  revalidatePath("/", "layout");
  revalidatePath("/road-status");
  revalidatePath("/snow-report");

  return NextResponse.json({ ok: true, road, bookingsAffected: affected });
}
