import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { callerKey, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  type: z.enum(["driver", "hotel", "rental", "school", "venue", "organiser"]),
  name: z.string().min(2).max(200),
  contactName: z.string().min(2).max(120),
  phone: z.string().min(6).max(30),
  email: z.string().email(),
  notes: z.string().max(2000).optional(),
});

export async function POST(request: NextRequest) {
  const limit = rateLimit(callerKey(request, "partner_apply"), { max: 3, windowMs: 3_600_000 });
  if (!limit.ok) return NextResponse.json({ error: "rate_limited", resetInMs: limit.resetInMs }, { status: 429 });
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  console.log(`[partner-application] ${parsed.data.type}: ${parsed.data.email} · ${parsed.data.name}`);
  return NextResponse.json({ ok: true, message: "Application received. We reply within two working days." });
}
