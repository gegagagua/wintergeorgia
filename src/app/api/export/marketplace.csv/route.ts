import { NextResponse } from "next/server";
import { routes } from "@/content/routes";
import { findResort } from "@/content/resorts";
import type { VehicleClass } from "@/content/types";

/**
 * Marketplace CSV export. One row per (route, vehicle class) pair with all
 * fields a channel like GetYourGuide / Viator / Daytrip needs:
 *   - product name
 *   - description (channel-specific override, else the public description)
 *   - inclusions / exclusions
 *   - meeting point text
 *   - cancellation policy
 *   - channel price in GEL (direct price × multiplier when configured)
 *
 * The channel-price multiplier lets the operator mark marketplace prices
 * above the direct website price to protect their best-rate guarantee.
 */

const VEHICLE_LABEL: Record<VehicleClass, string> = {
  shared: "Shared seat",
  sedan: "Private sedan",
  minivan: "Private minivan",
  suv4x4: "Private 4x4 SUV",
};

function escapeCell(s: string | number | undefined | null): string {
  if (s === undefined || s === null) return "";
  const str = String(s).replace(/"/g, '""').replace(/\r?\n/g, " ");
  // Wrap in quotes if the cell contains any CSV-special characters.
  return /[",\n]/.test(str) ? `"${str}"` : str;
}

export async function GET() {
  const headers = [
    "route_slug",
    "vehicle_class",
    "product_name",
    "resort",
    "distance_km",
    "duration_min",
    "requires_4x4",
    "is_scheduled",
    "price_gel_direct",
    "price_gel_channel",
    "max_pax",
    "currency",
    "description_en",
    "inclusions_en",
    "exclusions_en",
    "meeting_point_en",
    "cancellation_policy_en",
  ];

  const rows: string[] = [headers.join(",")];

  for (const r of routes) {
    const resort = r.toResort ? findResort(r.toResort) : undefined;
    for (const vc of ["shared", "sedan", "minivan", "suv4x4"] as const) {
      const p = r.prices[vc];
      if (!p) continue;
      const multiplier = r.marketplace?.channelPriceMultiplier ?? 1;
      const channelPrice = Math.round(p.priceGel * multiplier);
      const row = [
        r.slug,
        vc,
        `${r.from.en} → ${r.to.en} — ${VEHICLE_LABEL[vc]}`,
        resort?.name.en ?? "",
        r.distanceKm,
        r.durationMin,
        r.requires4x4 ? "true" : "false",
        r.isScheduled ? "true" : "false",
        p.priceGel,
        channelPrice,
        p.maxPax,
        "GEL",
        r.marketplace?.description?.en ?? r.description.en,
        (r.marketplace?.inclusions ?? [])
          .map((x) => x.en)
          .join("; ") ||
          "Pickup from stated address · Vetted driver · Winter tyres · Chains · Fuel · Tolls",
        (r.marketplace?.exclusions ?? []).map((x) => x.en).join("; ") || "Gratuities",
        r.marketplace?.meetingPoint?.en ??
          (r.fromSlug.includes("airport")
            ? "Arrivals exit — driver with a name sign"
            : "Your hotel or address inside the city"),
        r.marketplace?.cancellationPolicy?.en ??
          "Free cancellation up to 24h before departure. 50% within 24h. Flight delays never penalised. Full refund if the road closes.",
      ].map(escapeCell);
      rows.push(row.join(","));
    }
  }

  const csv = rows.join("\n") + "\n";

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="georgiawinter-marketplace.csv"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
