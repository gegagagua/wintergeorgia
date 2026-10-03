import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ru", "ka"],
  defaultLocale: "en",
  localePrefix: {
    mode: "as-needed",
  },
});

export type Locale = (typeof routing.locales)[number];
