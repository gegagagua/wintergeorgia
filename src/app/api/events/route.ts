import { NextResponse, type NextRequest } from "next/server";
import { events } from "@/content/events";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const resort = url.searchParams.get("resort");
  const category = url.searchParams.get("category");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");

  let list = events;
  if (resort) list = list.filter((e) => e.resort === resort);
  if (category) list = list.filter((e) => e.category === category);
  if (from) list = list.filter((e) => e.startsAt >= from);
  if (to) list = list.filter((e) => e.startsAt <= to);

  return NextResponse.json({ events: list });
}
