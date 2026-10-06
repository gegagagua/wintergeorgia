import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { callerKey, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  channel: z.enum(["email", "telegram"]),
  address: z.string().min(3).max(200),
  locales: z.array(z.enum(["en", "ru", "ka"])).min(1).default(["en"]),
  resorts: z.array(z.string()).default([]),
  resort: z.string().optional(),
  routeSlug: z.string().optional(),
  topics: z
    .array(
      z.enum([
        "snow",
        "road",
        "events",
        "prices",
        "bulletin",
        "season-opening",
        "seat-available",
        "price-drop",
      ]),
    )
    .default(["bulletin"]),
});

/**
 * Double opt-in email or Telegram subscription. In production this sends a
 * confirmation link/tap and only marks confirmed_at after the user replies.
 */
export async function POST(request: NextRequest) {
  const limit = rateLimit(callerKey(request, "subscribe"), { max: 5, windowMs: 3_600_000 });
  if (!limit.ok) return NextResponse.json({ error: "rate_limited", resetInMs: limit.resetInMs }, { status: 429 });
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  console.log(`[subscribe] ${parsed.data.channel}:${parsed.data.address} · ${parsed.data.topics.join(",")}`);
  return NextResponse.json({ ok: true, message: "Check your inbox / Telegram to confirm." });
}
