import { routing, type Locale } from "@/i18n/routing";

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}

export function localePath(locale: Locale, path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === routing.defaultLocale) return clean;
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function localeUrl(locale: Locale, path = "/"): string {
  const p = localePath(locale, path);
  const base = siteUrl().replace(/\/$/, "");
  return `${base}${p}`;
}
