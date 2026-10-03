"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const active = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const onChange = (next: Locale) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <label className="relative inline-flex items-center gap-2 text-small text-ink-muted">
      <span className="sr-only">{t("switch")}</span>
      <select
        aria-label={t("switch")}
        className="cursor-pointer rounded-sm border border-line bg-surface px-2 py-1 text-small text-ink"
        value={active}
        onChange={(e) => onChange(e.target.value as Locale)}
        disabled={pending}
      >
        <option value="en">EN</option>
        <option value="ru">RU</option>
        <option value="ka">KA</option>
      </select>
    </label>
  );
}
