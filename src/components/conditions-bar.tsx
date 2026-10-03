import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import type { Locale } from "@/i18n/routing";
import { findRoad, findSnow } from "@/content/roads";
import { TbilisiTime } from "./tbilisi-time";

/**
 * Ultra-thin top bar with live conditions on the left and the current
 * Tbilisi time on the right. Data comes from the road / snow content
 * source of truth; the time is a client-side clock so it stays live.
 */
export async function ConditionsBar({ locale }: { locale: Locale }) {
  const t = await getTranslations("status");
  const road = findRoad("jvari-pass");
  const snow = findSnow("gudauri");
  if (!road || !snow) return null;

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

        <TbilisiTime className="ml-auto inline-flex shrink-0 items-center text-small" />
      </div>
    </div>
  );
}
