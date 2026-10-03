import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { pingIndexNow } from "@/lib/indexnow";
import { siteUrl } from "@/lib/site";

const secret = process.env.PAYMENT_WEBHOOK_SECRET ?? process.env.PAYLOAD_SECRET;

export async function POST(request: NextRequest) {
  const provided = request.headers.get("x-revalidate-secret");
  if (secret && provided !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as {
    paths?: string[];
    tags?: string[];
  };

  const paths = body.paths ?? [];
  const tags = body.tags ?? [];

  paths.forEach((p) => revalidatePath(p));
  tags.forEach((t) => revalidateTag(t));

  const urls = paths.map((p) => `${siteUrl().replace(/\/$/, "")}${p.startsWith("/") ? p : `/${p}`}`);
  const indexnow = await pingIndexNow(urls);

  return NextResponse.json({ ok: true, revalidated: { paths, tags }, indexnow });
}
