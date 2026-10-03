import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { localePath, siteUrl } from "./site";

/**
 * Build a Metadata object with locale-aware canonical + hreflang alternates.
 * Every public page should go through this helper.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  ogTitle,
  ogKicker,
  index = true,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  ogTitle?: string;
  ogKicker?: string;
  index?: boolean;
}): Metadata {
  const canonical = localePath(locale, path);
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localePath(l as Locale, path)]),
  ) as Record<string, string>;
  languages["x-default"] = localePath(routing.defaultLocale, path);

  const ogSlug = path === "/" ? "home" : path.split("/").filter(Boolean).join("/");
  const ogUrl = `/api/og/${ogSlug}?locale=${locale}${ogTitle ? `&title=${encodeURIComponent(ogTitle)}` : ""}${ogKicker ? `&kicker=${encodeURIComponent(ogKicker)}` : ""}`;

  return {
    metadataBase: new URL(siteUrl()),
    title,
    description,
    alternates: { canonical, languages },
    robots: index ? undefined : { index: false, follow: false },
    openGraph: {
      title: ogTitle ?? title,
      description,
      url: canonical,
      siteName: "georgiawinter",
      locale,
      type: "website",
      images: [ogUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle ?? title,
      description,
      images: [ogUrl],
    },
  };
}
