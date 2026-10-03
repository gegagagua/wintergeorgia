import { NextResponse } from "next/server";
import { events } from "@/content/events";
import { findResort } from "@/content/resorts";
import { siteUrl } from "@/lib/site";

function toIcalDate(iso: string) {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function esc(v: string) {
  return v.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const e = events.find((x) => x.slug === slug);
  if (!e) return new NextResponse("Not found", { status: 404 });
  const r = findResort(e.resort);
  const url = `${siteUrl().replace(/\/$/, "")}/events/${e.slug}`;

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//georgiawinter//events//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${e.slug}@georgiawinter`,
    `DTSTAMP:${toIcalDate(new Date().toISOString())}`,
    `DTSTART:${toIcalDate(e.startsAt)}`,
    `DTEND:${toIcalDate(e.endsAt ?? e.startsAt)}`,
    `SUMMARY:${esc(e.title.en)}`,
    `DESCRIPTION:${esc(e.body.en)}`,
    r ? `LOCATION:${esc(`${r.name.en}, Georgia`)}` : "",
    `URL:${url}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  return new NextResponse(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="${e.slug}.ics"`,
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
