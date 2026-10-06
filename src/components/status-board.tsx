import { getFormatter, getTranslations } from "next-intl/server";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import type { Status, Restriction } from "@/content/types";
import { findRoad } from "@/content/roads";
import { findResort } from "@/content/resorts";
import { liveSnowFor, seasonStateFor } from "@/config/season";
import { SeasonAlertForm } from "@/components/season-alert-form";

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

const seasonCopy = {
  en: {
    opensIn: (d: number) =>
      d <= 0 ? "Opening today" : d === 1 ? "Opens tomorrow" : `Opens in ${d} days`,
    openingDate: "Expected opening",
    notMeasured: "Not measured yet",
    seasonOver: "Season closed",
    seasonSummary: "Season closed — back in December",
    kicker: "Preseason",
    notify: "Email me when the lifts turn",
    openingAt: "Lifts spin at",
  },
  ru: {
    opensIn: (d: number) =>
      d <= 0 ? "Открытие сегодня" : d === 1 ? "Открытие завтра" : `Открытие через ${d} дн.`,
    openingDate: "Планируемое открытие",
    notMeasured: "Пока не замеряем",
    seasonOver: "Сезон закрыт",
    seasonSummary: "Сезон закрыт — возвращаемся в декабре",
    kicker: "Межсезонье",
    notify: "Напишите, когда подъёмники заработают",
    openingAt: "Подъёмники — с",
  },
  ka: {
    opensIn: (d: number) =>
      d <= 0 ? "დღეს იხსნება" : d === 1 ? "ხვალ იხსნება" : `იხსნება ${d} დღეში`,
    openingDate: "სავარაუდო გახსნა",
    notMeasured: "ჯერ არ იზომება",
    seasonOver: "სეზონი დახურულია",
    seasonSummary: "სეზონი დახურულია — ვბრუნდებით დეკემბერში",
    kicker: "სეზონგარე",
    notify: "შემატყობინეთ, როცა საბაგიროები ჩაირთვება",
    openingAt: "საბაგიროები — ",
  },
};

/**
 * Signature component. In-season: four live cells (road, snow, temp, lifts).
 * Preseason: countdown + capture form, never a fake zero.
 * Closed: a short summary panel.
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
  const resort = findResort(primaryResort);
  if (!road || !resort) return null;

  const season = seasonStateFor(resort);
  const snowReport = liveSnowFor(resort);
  const sc = seasonCopy[locale];
  const isDark = tone === "dark";

  const updated = (iso: string) =>
    fmt.dateTime(new Date(iso), { hour: "2-digit", minute: "2-digit" });
  const dateShort = (iso: string) =>
    fmt.dateTime(new Date(iso), { month: "short", day: "numeric" });

  if (season.state !== "open") {
    return (
      <section
        aria-label="Conditions board"
        className={cn(
          "overflow-hidden rounded-lg border",
          isDark ? "border-white/10 bg-white/5" : "border-line bg-surface",
        )}
      >
        <div className={cn("grid gap-6 p-6 md:grid-cols-[1.3fr_1fr] md:p-8")}>
          <div>
            <p
              className={cn(
                "text-small tabular",
                isDark ? "text-dawn-soft" : "text-primary",
              )}
            >
              {season.state === "preseason" ? sc.kicker : sc.seasonOver}
            </p>
            <h3
              className={cn(
                "mt-2 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]",
                isDark ? "text-snow" : "text-ink",
              )}
            >
              {season.state === "preseason" && season.daysToOpen !== undefined
                ? sc.opensIn(season.daysToOpen)
                : sc.seasonSummary}
            </h3>
            {season.state === "preseason" && season.opensOn ? (
              <p className={cn("mt-3 text-small", isDark ? "text-white/70" : "text-ink-muted")}>
                {sc.openingAt} <span className="tabular">{dateShort(season.opensOn)}</span>
                {season.reason ? ` · ${season.reason}` : ""}
              </p>
            ) : null}

            {road ? (
              <div className={cn("mt-5 flex items-center gap-2 text-small")}>
                <span
                  aria-hidden="true"
                  className={cn("inline-block h-2 w-2 rounded-full", dotColor[road.status])}
                />
                <span className={isDark ? "text-white/85" : "text-ink"}>
                  {road.name[locale]} · {t(road.status)}
                </span>
                <span className={isDark ? "text-white/50" : "text-ink-muted"}>
                  · {t("updatedAt", { when: updated(road.updatedAt) })}
                </span>
              </div>
            ) : null}
          </div>

          {season.state === "preseason" ? (
            <div
              className={cn(
                "rounded-md border p-4",
                isDark ? "border-white/10 bg-glacier/60" : "border-line bg-surface-raised",
              )}
            >
              <p className={cn("text-small", isDark ? "text-white/70" : "text-ink-muted")}>
                {sc.notify}
              </p>
              <div className="mt-3">
                <SeasonAlertForm resort={resort.slug} tone={tone} />
              </div>
            </div>
          ) : null}
        </div>
      </section>
    );
  }

  // In-season board.
  const snowCell = snowReport
    ? {
        label: t("snow"),
        value: `${snowReport.topCm} cm`,
        status: (snowReport.new24hCm >= 5 ? "open" : snowReport.baseCm < 20 ? "limited" : "open") as Status,
        meta: `${resort.name[locale]} · +${snowReport.new24hCm} cm 24h`,
      }
    : {
        label: t("snow"),
        value: sc.notMeasured,
        status: "limited" as Status,
        meta: resort.name[locale],
      };

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
      tone: road.restriction !== "none" ? restrictionLabel(road.restriction, locale) : undefined,
    },
    snowCell,
    snowReport
      ? {
          label: t("temperature"),
          value: `${snowReport.tempC > 0 ? "+" : ""}${snowReport.tempC}°C`,
          status: "open",
          meta: `${resort.name[locale]} · ${snowReport.visibility[locale]}`,
        }
      : {
          label: t("temperature"),
          value: sc.notMeasured,
          status: "limited",
          meta: resort.name[locale],
        },
    snowReport
      ? {
          label: t("lifts"),
          value: `${snowReport.liftsOpen}/${snowReport.liftsTotal}`,
          status:
            snowReport.liftsOpen === snowReport.liftsTotal
              ? "open"
              : snowReport.liftsOpen === 0
                ? "closed"
                : "limited",
          meta: t("updatedAt", { when: updated(snowReport.measuredAt) }),
        }
      : {
          label: t("lifts"),
          value: sc.notMeasured,
          status: "limited",
          meta: resort.name[locale],
        },
  ];

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
