/**
 * Thin wrapper around whatever analytics provider is wired on this build.
 * - Reads `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` for Plausible
 * - Falls back to a window hook (`window.__gw_event`) that tests + the
 *   admin dashboard can intercept
 *
 * All call sites use the typed `track(event, props)` helper so new events
 * (quote_viewed, booking_started, booking_paid, alert_subscribed) are
 * discoverable by grep.
 */

export type AnalyticsEvent =
  | "quote_viewed"
  | "booking_started"
  | "booking_paid"
  | "alert_subscribed"
  | "partner_card_opened"
  | "review_submitted";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props: Props }) => void;
    __gw_event?: (event: AnalyticsEvent, props?: Props) => void;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, { props });
    window.__gw_event?.(event, props);
  } catch {
    // Analytics must never break the UI.
  }
}

/** Grab UTM + ref parameters once per session and keep them for attribution. */
export function captureAttribution(): Record<string, string | undefined> {
  if (typeof window === "undefined") return {};
  const url = new URL(window.location.href);
  const utm = {
    utmSource: url.searchParams.get("utm_source") ?? undefined,
    utmMedium: url.searchParams.get("utm_medium") ?? undefined,
    utmCampaign: url.searchParams.get("utm_campaign") ?? undefined,
    utmTerm: url.searchParams.get("utm_term") ?? undefined,
    utmContent: url.searchParams.get("utm_content") ?? undefined,
    referralCode:
      url.searchParams.get("ref") ??
      document.cookie
        .split("; ")
        .find((c) => c.startsWith("gw_ref="))
        ?.split("=")[1],
  };
  // Persist for the booking flow — session only, no cross-site tracking.
  try {
    const existing = JSON.parse(sessionStorage.getItem("gw_attr") ?? "{}");
    const merged = { ...existing, ...stripUndef(utm) };
    sessionStorage.setItem("gw_attr", JSON.stringify(merged));
    return merged;
  } catch {
    return stripUndef(utm);
  }
}

export function readAttribution(): Record<string, string | undefined> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("gw_attr") ?? "{}");
  } catch {
    return {};
  }
}

function stripUndef<T extends Record<string, unknown>>(obj: T): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "string" && v) out[k] = v;
  }
  return out;
}
