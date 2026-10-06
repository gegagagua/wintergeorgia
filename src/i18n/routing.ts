import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "ka"],
  defaultLocale: "en",
  localePrefix: {
    mode: "as-needed",
  },
});

export type Locale = (typeof routing.locales)[number];
export type ContentLocale = Locale;

/**
 * Right-to-left locales. `he` is scaffolded (messages + hreflang + dir="rtl"
 * in the HTML tag) but not yet wired into `routing.locales` — the content
 * tables (resorts, routes, articles) do not yet have Hebrew copy. Enabling
 * requires a sweep to make `I18n` support Hebrew with a graceful fallback
 * to `en` on untranslated keys.
 *
 * TODO(owner): translate hero copy for Gudauri, tbilisi-airport-gudauri,
 * tbilisi-gudauri and tbilisi-bakuriani before flipping on.
 */
export const RTL_LOCALES = ["he"] as const;
export function isRtl(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}
