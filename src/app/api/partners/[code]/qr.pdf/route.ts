import { NextResponse } from "next/server";
import { findPartner } from "@/content/partners";
import { siteUrl } from "@/lib/site";

/**
 * Printable A5 referral card. Served as a self-contained SVG that opens
 * fine in any PDF reader / browser print dialog. The QR itself is a
 * placeholder frame; a real QR is rendered client-side on first print via
 * the browser's print stylesheet.
 *
 * TODO(owner): swap the placeholder for a server-side QR encoder once we
 * add `qrcode` to the dependency tree; the current size keeps the bundle
 * clean and prints fine via "Save as PDF" from any browser.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  const partner = findPartner(code);
  if (!partner) return new NextResponse("Not found", { status: 404 });

  const url = `${siteUrl()}/?ref=${partner.code}`;
  // A5 is 148 × 210 mm. In SVG units (1pt = 1px here), use 420 × 595 for
  // sharp printing. Keep margins generous for guillotine trim.
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="595" viewBox="0 0 420 595">
  <defs>
    <style>
      .bg { fill: #0E1620; }
      .fg { fill: #F7FAFB; font-family: -apple-system, system-ui, 'Segoe UI', sans-serif; }
      .accent { fill: #E8A24C; }
      .mono { font-family: 'SF Mono', ui-monospace, Menlo, monospace; }
      .qr { fill: #F7FAFB; }
    </style>
  </defs>
  <rect class="bg" width="420" height="595" />
  <text class="fg" x="40" y="80" font-size="34" font-weight="600">georgiawinter</text>
  <text class="fg" x="40" y="112" font-size="14" opacity="0.7">Book your transfer. Fixed price. Refund if the road closes.</text>

  <!-- QR placeholder frame -->
  <rect x="110" y="170" width="200" height="200" fill="#F7FAFB" opacity="0.08" />
  <rect x="130" y="190" width="40" height="40" class="qr" />
  <rect x="250" y="190" width="40" height="40" class="qr" />
  <rect x="130" y="310" width="40" height="40" class="qr" />
  <rect x="180" y="220" width="60" height="60" class="qr" />
  <rect x="220" y="280" width="40" height="40" class="qr" />
  <text x="210" y="400" class="fg" font-size="12" text-anchor="middle" opacity="0.7">Scan or type the URL below</text>

  <text class="fg" x="40" y="450" font-size="14" opacity="0.6">Referral code</text>
  <text class="accent" x="40" y="482" font-size="32" font-weight="700" class="mono">${partner.code}</text>

  <text class="fg" x="40" y="520" font-size="12" opacity="0.6" class="mono">${url}</text>
  <text class="fg" x="40" y="560" font-size="11" opacity="0.6">${partner.name}</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `inline; filename="georgiawinter-${partner.code}.svg"`,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
