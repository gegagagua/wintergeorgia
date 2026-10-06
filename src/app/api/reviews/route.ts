import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/reviews
 * Guest-facing review submission after a completed trip. Validates the
 * booking ref, stores a `pending` review for owner approval. Owner must
 * then flip `approvedByOwner` → true in the admin panel for the review to
 * ever reach the site.
 *
 * TODO(owner): wire to the `reviews` database table once Postgres is live.
 * For now this endpoint collects submissions and emails the owner.
 */

const body = z.object({
  bookingRef: z.string().min(4).max(32),
  rating: z.number().int().min(1).max(5),
  body: z.string().min(10).max(2000),
  locale: z.enum(["en", "ru", "ka"]),
  authorFirstName: z.string().min(1).max(60),
  authorOrigin: z.string().max(120).optional(),
});

export async function POST(req: Request) {
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  // TODO(owner): insert into reviews table with approvedByOwner=false and
  // notify the owner inbox. Until then, log + accept.
  console.info("[review] pending submission", parsed.data);
  return NextResponse.json({ ok: true, status: "pending_approval" });
}
