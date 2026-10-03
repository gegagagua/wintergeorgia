import { NextResponse } from "next/server";
import { roads, snow } from "@/content/roads";

export const revalidate = 300;

/**
 * GET /api/conditions — current road status + snow per resort, cached 5 min.
 * (docs/09-api-and-integrations.md)
 */
export async function GET() {
  return NextResponse.json(
    { asOf: new Date().toISOString(), roads, snow },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
  );
}
