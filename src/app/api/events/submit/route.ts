import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { callerKey, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  title: z.string().min(4).max(140),
  body: z.string().min(20).max(4000),
  resort: z.enum(["gudauri", "bakuriani", "tetnuldi", "hatsvali", "goderdzi", "kazbegi"]),
  category: z.enum(["party", "competition", "festival", "season-opening", "family"]),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime().optional(),
  ticketUrl: z.string().url().optional(),
  ticketPriceGel: z.number().int().nonnegative().optional(),
  organiserName: z.string().min(2).max(120),
  organiserEmail: z.string().email(),
  organiserPhone: z.string().max(30).optional(),
});

/**
 * Organiser submission → moderation queue. In production this writes to
 * `events` with status = 'pending' and an email to the ops address.
 */
export async function POST(request: NextRequest) {
  const limit = rateLimit(callerKey(request, "event_submit"), { max: 3, windowMs: 3_600_000 });
  if (!limit.ok) return NextResponse.json({ error: "rate_limited", resetInMs: limit.resetInMs }, { status: 429 });
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  console.log(`[event-submission] ${parsed.data.organiserEmail} · ${parsed.data.title}`);
  return NextResponse.json({ ok: true, message: "Received. You'll get a moderation decision within 24 hours." });
}
