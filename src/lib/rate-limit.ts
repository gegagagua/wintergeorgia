import "server-only";

/**
 * Sliding-window in-memory rate limiter. One instance per process — good
 * enough for a single-node deploy; swap to Upstash Redis when scaling.
 */
type Bucket = { hits: number[]; };
declare global {
  var __gwRate: Map<string, Bucket> | undefined;
}
const buckets: Map<string, Bucket> = globalThis.__gwRate ?? new Map();
globalThis.__gwRate = buckets;

export function rateLimit(
  key: string,
  { max, windowMs }: { max: number; windowMs: number },
): { ok: boolean; remaining: number; resetInMs: number } {
  const now = Date.now();
  const b = buckets.get(key) ?? { hits: [] };
  b.hits = b.hits.filter((t) => now - t < windowMs);
  if (b.hits.length >= max) {
    buckets.set(key, b);
    return { ok: false, remaining: 0, resetInMs: windowMs - (now - (b.hits[0] ?? now)) };
  }
  b.hits.push(now);
  buckets.set(key, b);
  return { ok: true, remaining: max - b.hits.length, resetInMs: windowMs };
}

/**
 * Pull the caller's identity for rate-limit bucketing. Prefer x-forwarded-for
 * (behind the CDN) then x-real-ip. Fall back to a shared bucket — safe because
 * the miss just aggregates.
 */
export function callerKey(request: Request, extra: string): string {
  const h = request.headers;
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "shared";
  return `${extra}:${ip}`;
}
