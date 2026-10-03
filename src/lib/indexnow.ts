import "server-only";

/**
 * IndexNow: notify Bing (and others) of new/updated URLs. Uses the key set
 * in INDEXNOW_KEY. Fails silently in dev when the key is absent — this is
 * a best-effort signal, never critical path.
 */
export async function pingIndexNow(urls: string[]): Promise<{ ok: boolean; status?: number }> {
  const key = process.env.INDEXNOW_KEY;
  const host = process.env.NEXT_PUBLIC_SITE_URL?.replace(/^https?:\/\//, "").replace(/\/$/, "");
  if (!key || !host || urls.length === 0) return { ok: false };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList: urls,
      }),
    });
    return { ok: res.ok, status: res.status };
  } catch {
    return { ok: false };
  }
}
