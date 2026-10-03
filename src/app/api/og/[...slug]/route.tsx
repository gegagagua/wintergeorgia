import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const width = 1200;
const height = 630;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) {
  const { slug } = await params;
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "en";
  const title =
    url.searchParams.get("title") ??
    (slug[0] === "home"
      ? "georgiawinter"
      : slug.join(" / ").replaceAll("-", " "));
  const kicker = url.searchParams.get("kicker") ?? "georgiawinter";

  const strapline =
    locale === "ru"
      ? "Трансферы · Дороги · Снег · События"
      : locale === "ka"
        ? "ტრანსფერები · გზები · თოვლი · ღონისძიებები"
        : "Transfers · Roads · Snow · Events";

  return new ImageResponse(
    (
      <div
        style={{
          width,
          height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#14323F",
          color: "#F2F5F7",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 12, height: 12, background: "#D98436", borderRadius: 999 }} />
          <div style={{ fontSize: 26, color: "#F2A65A", letterSpacing: 1 }}>{kicker}</div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.05,
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "auto",
          }}
        >
          <div style={{ display: "flex", fontSize: 24, opacity: 0.75 }}>{strapline}</div>
          <div style={{ display: "flex", fontSize: 30, alignItems: "baseline" }}>
            <span style={{ fontWeight: 700 }}>georgia</span>
            <span style={{ fontWeight: 300 }}>winter</span>
          </div>
        </div>
      </div>
    ),
    { width, height },
  );
}
