import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { findRoute } from "@/content/routes";
import { EXTRA_CHILD_SEAT_GEL, EXTRA_SKI_RACK_GEL, RETURN_MULTIPLIER, quoteRoute } from "@/lib/pricing";

const querySchema = z.object({
  vehicleClass: z.enum(["shared", "sedan", "minivan", "suv4x4"]),
  pax: z.coerce.number().int().min(1).max(9),
  childSeat: z.coerce.boolean().optional(),
  skiRack: z.coerce.boolean().optional(),
  returnLeg: z.coerce.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const parsed = querySchema.safeParse(Object.fromEntries(url.searchParams));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const route = findRoute(slug);
  if (!route) return NextResponse.json({ error: "route_not_found" }, { status: 404 });

  const { vehicleClass, pax, childSeat, skiRack, returnLeg } = parsed.data;
  const q = quoteRoute(route, vehicleClass, pax, { childSeat, skiRack, returnLeg });
  if (!q.valid) {
    return NextResponse.json({ error: q.reason, maxPax: q.maxPax }, { status: 400 });
  }
  return NextResponse.json({
    slug,
    vehicleClass,
    pax,
    breakdown: {
      base: q.base,
      childSeat: childSeat ? EXTRA_CHILD_SEAT_GEL : 0,
      skiRack: skiRack ? EXTRA_SKI_RACK_GEL : 0,
      return: returnLeg ? Math.round(q.base * (RETURN_MULTIPLIER - 1)) + (childSeat ? Math.round(EXTRA_CHILD_SEAT_GEL * (RETURN_MULTIPLIER - 1)) : 0) : 0,
    },
    amountGel: q.amount,
  });
}
