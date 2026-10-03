import { getFormatter, getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import type { Status, Restriction } from "@/content/types";
import { findRoad, findSnow } from "@/content/roads";
import { findResort } from "@/content/resorts";

type Props = {
  locale: Locale;
  primaryResort?: string;
  primaryRoad?: string;
  tone?: "light" | "dark";
};

const dotColor: Record<Status, string> = {
  open: "bg-status-open",
  limited: "bg-status-limited",
  closed: "bg-status-closed",
};

const statusLabelColor: Record<Status, string> = {
  open: "text-status-open",
  limited: "text-status-limited",
  closed: "text-status-closed",
};

/**
 * Signature component. Four cells: road, snow, temperature, lifts.
 * Values fade+rise 8px staggered 130ms on load (docs/01-brand.md).
 * `tone="dark"` uses dark-surface cells so it reads well on a glacier hero.
 */
export async function StatusBoard({
  locale,
  primaryResort = "gudauri",
  primaryRoad = "jvari-pass",
  tone = "light",
}: Props) {
  const t = await getTranslations("status");
  const fmt = await getFormatter();
  const road = findRoad(primaryRoad);
  const snow = findSnow(primaryResort);
  const resort = findResort(primaryResort);

  if (!road || !snow || !resort) return null;

  const updated = (iso: string) =>
    fmt.dateTime(new Date(iso), { hour: "2-digit", minute: "2-digit" });

  const cells: {
    label: string;
    value: string;
    status: Status;
    meta: string;
    tone?: string;
  }[] = [
    {
      label: t("road"),
      value: t(road.status),
      status: road.status,
      meta: `${road.name[locale]} · ${t("updatedAt", { when: updated(road.updatedAt) })}`,
      tone:
        road.restriction !== "none"
          ? restrictionLabel(road.restriction, locale)
          : undefined,
    },
    {
      label: t("snow"),
      value: `${snow.topCm} cm`,
      status:
        snow.new24hCm >= 5 ? "open" : snow.baseCm < 20 ? "limited" : "open",
      meta: `${resort.name[locale]} · +${snow.new24hCm} cm 24h`,
    },
    {
      label: t("temperature"),
      value: `${snow.tempC > 0 ? "+" : ""}${snow.tempC}°C`,
      status: "open",
      meta: `${resort.name[locale]} · ${snow.visibility[locale]}`,
    },
    {
      label: t("lifts"),
      value: `${snow.liftsOpen}/${snow.liftsTotal}`,
      status:
        snow.liftsOpen === snow.liftsTotal
          ? "open"
          : snow.liftsOpen === 0
            ? "closed"
            : "limited",
      meta: t("updatedAt", { when: updated(snow.measuredAt) }),
    },
  ];

  const isDark = tone === "dark";

  return (
    <section
      aria-label="Live conditions"
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden rounded-lg border md:grid-cols-4",
        isDark ? "border-white/10 bg-white/5" : "border-line bg-line",
      )}
    >
      {cells.map((c, i) => (
        <div
          key={c.label}
          className={cn(
            "gw-rise flex min-h-[152px] flex-col p-5 md:p-6",
            isDark ? "bg-glacier text-snow" : "bg-surface text-ink",
          )}
          style={{ animationDelay: `${i * 130}ms` }}
        >
          <div
            className={cn(
              "text-small",
              isDark ? "text-white/60" : "text-ink-muted",
            )}
          >
            {c.label}
          </div>

          <div className="mt-2 flex items-baseline gap-2.5">
            <span
              aria-hidden="true"
              className={cn(
                "inline-block h-2.5 w-2.5 shrink-0 translate-y-[-4px] rounded-full",
                dotColor[c.status],
              )}
            />
            <span
              className={cn(
                "font-serif text-[32px] leading-[36px] tabular md:text-[36px] md:leading-[40px]",
                statusLabelColor[c.status],
              )}
            >
              {c.value}
            </span>
          </div>

          <div
            className={cn(
              "mt-auto pt-4 text-small",
              isDark ? "text-white/55" : "text-ink-muted",
            )}
          >
            {c.meta}
          </div>

          {c.tone ? (
            <div className="mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-pill border border-status-limited/40 bg-status-limited/10 px-2 py-0.5 text-small tabular text-status-limited">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-status-limited" />
                {c.tone}
              </span>
            </div>
          ) : null}
        </div>
      ))}
    </section>
  );
}

function restrictionLabel(r: Restriction, locale: Locale): string {
  const table: Record<Restriction, Record<Locale, string>> = {
    none: { en: "", ru: "", ka: "" },
    chains: { en: "Chains required", ru: "Нужны цепи", ka: "ჯაჭვები საჭიროა" },
    "4x4_only": { en: "4x4 only", ru: "Только 4x4", ka: "მხოლოდ 4x4" },
    lorries_banned: {
      en: "Lorries banned",
      ru: "Грузовики запрещены",
      ka: "სატვირთოები აკრძალულია",
    },
  };
  return table[r][locale];
}
