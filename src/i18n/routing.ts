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

// None of our active locales are RTL; the helper stays for future use.
export const RTL_LOCALES: readonly string[] = [];
export function isRtl(locale: string): boolean {
  return RTL_LOCALES.includes(locale);
}
