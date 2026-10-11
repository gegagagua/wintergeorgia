import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { localePath, siteUrl } from "./site";

/**
 * Social / verification configuration pulled from env. Each is optional; the
 * helper simply omits the field if the env var is unset so Vercel can
 * provision them without a code change.
 */
const TWITTER_SITE = process.env.GW_TWITTER_SITE ?? undefined; // e.g. "@georgiawinter"
const TWITTER_CREATOR = process.env.GW_TWITTER_CREATOR ?? undefined;
const FB_PUBLISHER = process.env.GW_FACEBOOK_PUBLISHER ?? undefined; // facebook page URL

/**
 * Build a Metadata object with locale-aware canonical + hreflang alternates.
 * Every public page should go through this helper.
 *
 * Backwards-compatible with the previous signature. New knobs:
 *  - keywords: emits <meta name="keywords">
 *  - ogImage: pass a real photo URL to override the auto `/api/og/...` route
 *  - publishedTime / modifiedTime / author / section: emits `openGraph.type: article`
 *  - noindex: alias for `index: false` (we keep `index` for backwards compat)
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  ogKicker,
  ogImage,
  index = true,
  noindex,
  keywords,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogKicker?: string;
  /** Real image URL to replace the auto-generated OG route. Must be absolute
   *  or a site-root relative path; passed through to <meta> as-is. */
  ogImage?: string;
  index?: boolean;
  /** Alias for `index: false`. If both set, `noindex` wins. */
  noindex?: boolean;
  /** Comma-combined keywords for `<meta name="keywords">`. Low SEO weight on
   *  Google but still used by Yandex and some aggregators — cheap to emit. */
  keywords?: string[];
  /** ISO date — when set, OG type becomes `article`. */
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}): Metadata {
  const canonical = localePath(locale, path);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l as Locale, path)]),
  ) as Record<string, string>;
  languages["x-default"] = localePath(routing.defaultLocale, path);

  const ogSlug = path === "/" ? "home" : path.split("/").filter(Boolean).join("/");
  const autoOg = `/api/og/${ogSlug}?locale=${locale}${ogTitle ? `&title=${encodeURIComponent(ogTitle)}` : ""}${ogKicker ? `&kicker=${encodeURIComponent(ogKicker)}` : ""}`;
  const image = ogImage ?? autoOg;

  const shouldIndex = noindex === true ? false : index;

  const isArticle = Boolean(publishedTime);

  const ogBase = {
    title: ogTitle ?? title,
    description,
    url: canonical,
    siteName: "georgiawinter",
    locale,
    alternateLocale: routing.locales.filter((l) => l !== locale),
    images: [image],
  };

  const openGraph: Metadata["openGraph"] = isArticle
    ? {
        ...ogBase,
        type: "article",
        publishedTime,
        modifiedTime: modifiedTime ?? publishedTime,
        ...(author ? { authors: [author] } : {}),
        ...(section ? { section } : {}),
        ...(tags && tags.length ? { tags } : {}),
      }
    : {
        ...ogBase,
        type: "website",
      };

  const twitter: Metadata["twitter"] = {
    card: "summary_large_image",
    title: ogTitle ?? title,
    description,
    images: [image],
    ...(TWITTER_SITE ? { site: TWITTER_SITE } : {}),
    ...(TWITTER_CREATOR ? { creator: TWITTER_CREATOR } : {}),
  };

  // Facebook `article:publisher` lives in `other` since Next's typed
  // Metadata.openGraph.article doesn't expose it directly.
  const other: Record<string, string | string[]> = {};
  if (FB_PUBLISHER && isArticle) {
    other["article:publisher"] = FB_PUBLISHER;
  }

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    ...(keywords && keywords.length ? { keywords } : {}),
    alternates: { canonical, languages },
    robots: shouldIndex ? undefined : { index: false, follow: false },
    openGraph,
    twitter,
    ...(Object.keys(other).length ? { other } : {}),
  };
}
