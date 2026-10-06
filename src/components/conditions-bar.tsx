import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import { findRoad } from "@/content/roads";
import { findResort } from "@/content/resorts";
import { liveSnowFor, seasonStateFor } from "@/config/season";
import { TbilisiTime } from "./tbilisi-time";

const preseasonCopy: Record<Locale, (days: number) => string> = {
  en: (d) => (d <= 0 ? "Season opens today" : d === 1 ? "Season opens tomorrow" : `Season opens in ${d} days`),
  ru: (d) => (d <= 0 ? "Открытие сегодня" : d === 1 ? "Открытие завтра" : `Открытие через ${d} дн.`),
  ka: (d) => (d <= 0 ? "დღეს იხსნება" : d === 1 ? "ხვალ იხსნება" : `იხსნება ${d} დღეში`),
};

const closedCopy: Record<Locale, string> = {
  en: "Season closed — back in December",
  ru: "Сезон закрыт — возвращаемся в декабре",
  ka: "სეზონი დახურულია — ვბრუნდებით დეკემბერში",
};

/**
 * Thin top bar. In-season: live conditions. Preseason: countdown pill.
 * Never shows a 0 cm reading.
 */
export async function ConditionsBar({ locale }: { locale: Locale }) {
  const t = await getTranslations("status");
  const road = findRoad("jvari-pass");
  const resort = findResort("gudauri");
  if (!road || !resort) return null;

  const season = seasonStateFor(resort);
  const snow = liveSnowFor(resort);

  const statusDot =
    road.status === "open"
      ? "bg-status-open"
      : road.status === "limited"
        ? "bg-status-limited"
        : "bg-status-closed";

  return (
    <div className="border-b border-white/10 bg-night text-snow">
      <div className="site-container flex h-8 items-center gap-4 overflow-x-auto text-small text-white/75">
        <Link href="/road-status" className="inline-flex shrink-0 items-center gap-2 hover:text-snow">
          <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", statusDot)} />
          <span className="text-white/60">{road.name[locale]}</span>
          <span className="tabular">{t(road.status)}</span>
        </Link>

        <span aria-hidden="true" className="h-3 w-px shrink-0 bg-white/15" />

        {season.state === "open" && snow ? (
          <>
            <Link href="/snow-report" className="inline-flex shrink-0 items-center gap-2 hover:text-snow">
              <span className="text-white/60">{t("snow")}</span>
              <span className="tabular">
                {snow.topCm} cm · +{snow.new24hCm} cm 24h
              </span>
            </Link>
            <span aria-hidden="true" className="h-3 w-px shrink-0 bg-white/15" />
            <span className="hidden shrink-0 items-center gap-2 sm:inline-flex">
              <span className="text-white/60">{t("temperature")}</span>
              <span className="tabular">
                {snow.tempC > 0 ? "+" : ""}
                {snow.tempC}°C
              </span>
            </span>
            <span aria-hidden="true" className="hidden shrink-0 sm:block h-3 w-px bg-white/15" />
            <span className="hidden shrink-0 items-center gap-2 md:inline-flex">
              <span className="text-white/60">{t("lifts")}</span>
              <span className="tabular">
                {snow.liftsOpen}/{snow.liftsTotal}
              </span>
            </span>
          </>
        ) : season.state === "preseason" ? (
          <Link href="/snow-report" className="inline-flex shrink-0 items-center gap-2 hover:text-snow">
            <span className="text-dawn-soft">{preseasonCopy[locale](season.daysToOpen ?? 0)}</span>
          </Link>
        ) : (
          <span className="shrink-0 text-white/70">{closedCopy[locale]}</span>
        )}

        <TbilisiTime className="ml-auto inline-flex shrink-0 items-center text-small" />
      </div>
    </div>
  );
}
