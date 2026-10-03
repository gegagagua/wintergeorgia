import Script from "next/script";

/**
 * Plausible analytics: cookieless, no consent banner required (see
 * docs/09-api-and-integrations.md security section). No-op unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.outbound-links.js"
      strategy="afterInteractive"
    />
  );
}
