import "server-only";

/**
 * Cloudflare Turnstile verification. No-op if TURNSTILE_SECRET is not set
 * — this keeps local dev and open-source clones frictionless.
 */
export async function verifyTurnstile(token: string | null | undefined, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
    });
    if (!res.ok) return false;
    const body = (await res.json()) as { success?: boolean };
    return Boolean(body.success);
  } catch {
    return false;
  }
}
