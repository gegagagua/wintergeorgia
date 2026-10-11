import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";

/**
 * robots.txt rules. We allow Googlebot, Bingbot and Yandex explicitly
 * (Russian traffic is 30-40% of our addressable market and Yandex still
 * respects per-UA rules more than most). We disallow drafts, admin and
 * raw API routes.
 *
 * Localised sitemap entries are added per locale even though Next only
 * emits a single sitemap.xml — Google and Yandex both accept multiple
 * `Sitemap:` lines so we leave hooks for a future split.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  const commonDisallow = ["/admin", "/api", "/draft", "/_next"];

  return {
    rules: [
      { userAgent: "Googlebot", allow: "/", disallow: commonDisallow },
      { userAgent: "Googlebot-Image", allow: "/", disallow: commonDisallow },
      { userAgent: "Bingbot", allow: "/", disallow: commonDisallow },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: commonDisallow,
        // Yandex-specific: lower crawl-delay once site is proven; comment
        // out `crawlDelay` by default so we don't throttle Googlebot via
        // the `*` rule.
      },
      { userAgent: "YandexBot", allow: "/", disallow: commonDisallow },
      { userAgent: "DuckDuckBot", allow: "/", disallow: commonDisallow },
      { userAgent: "Applebot", allow: "/", disallow: commonDisallow },
      // Catch-all fallback — any other crawler.
      { userAgent: "*", allow: "/", disallow: commonDisallow },
    ],
    sitemap: [
      `${base}/sitemap.xml`,
      // Per-locale sitemaps left as explicit entries. Next 15 serves them
      // via generateSitemaps when the shards exist; harmless 404 until then.
      ...routing.locales.map(
        (l) => `${base}/sitemap-${l as Locale}.xml`,
      ),
    ],
    host: base,
  };
}
