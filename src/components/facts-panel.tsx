import { Link } from "@/i18n/navigation";
import { ShieldCheck, Route as RouteIcon, UserCircle2, Snowflake } from "lucide-react";
import { routes } from "@/content/routes";
import { resorts } from "@/content/resorts";
import { drivers } from "@/content/drivers";
import { company } from "@/config/company";
import { reviews, aggregateRating } from "@/config/reviews";
import type { Locale } from "@/i18n/routing";

const strings = {
  en: {
    kicker: "Facts, not slogans",
    title: "Only verifiable numbers appear here",
    body: "No invented testimonials. We publish the number of routes we actually serve, the drivers with public profiles, and the real review count. The average rating appears once we have at least five verified reviews.",
    routes: "routes served",
    resorts: "resorts covered",
    drivers: "driver profiles",
    reviews: "verified reviews",
    seeDrivers: "See the drivers",
    bookNow: "Book a transfer",
  },
  ru: {
    kicker: "Факты, а не лозунги",
    title: "Здесь только проверяемые числа",
    body: "Никаких придуманных отзывов. Публикуем количество реально обслуживаемых маршрутов, водителей с публичными профилями и реальное число отзывов. Средняя оценка появляется, когда проверенных отзывов не меньше пяти.",
    routes: "маршрутов",
    resorts: "курортов",
    drivers: "профилей водителей",
    reviews: "проверенных отзывов",
    seeDrivers: "Посмотреть водителей",
    bookNow: "Забронировать трансфер",
  },
  ka: {
    kicker: "ფაქტები, არა ლოზუნგები",
    title: "აქ მხოლოდ შემოწმებადი რიცხვებია",
    body: "არანაირი მოგონილი შეფასება. ვაქვეყნებთ რეალურად დატვირთული მარშრუტების რიცხვს, საჯარო პროფილის მქონე მძღოლებს და რეალურ შეფასებათა რაოდენობას. საშუალო ქულა გამოჩნდება, როცა მინიმუმ ხუთი შემოწმებული შეფასება გვექნება.",
    routes: "მარშრუტი",
    resorts: "კურორტი",
    drivers: "მძღოლის პროფილი",
    reviews: "შემოწმებული შეფასება",
    seeDrivers: "ვნახოთ მძღოლები",
    bookNow: "ტრანსფერის დაჯავშნა",
  },
};

/**
 * Honest replacement for the fake testimonials carousel. All numbers come
 * from the actual data layer. If a number is 0 (no drivers added, no
 * reviews yet) we show it as 0 — never fudge upward.
 */
export function FactsPanel({ locale }: { locale: Locale }) {
  const t = strings[locale];
  const activeRoutes = routes.length;
  const resortsCount = resorts.length;
  const publishedDrivers = drivers.filter((d) => d.published).length;
  const agg = aggregateRating();
  const reviewCount = reviews.length;

  return (
    <section className="site-container py-16">
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="text-small text-primary">{t.kicker}</p>
          <h2 className="mt-2 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
            {t.title}
          </h2>
          <p className="mt-4 max-w-prose text-ink-muted">{t.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/drivers"
              className="inline-flex h-10 items-center rounded-sm border border-line bg-surface px-4 text-small hover:border-primary-hover"
            >
              {t.seeDrivers} →
            </Link>
            <Link
              href="/transfers"
              className="inline-flex h-10 items-center rounded-sm bg-accent px-4 text-small font-medium text-white hover:brightness-95"
            >
              {t.bookNow} →
            </Link>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3 self-start md:grid-cols-2">
          <Stat Icon={RouteIcon} value={activeRoutes} label={t.routes} />
          <Stat Icon={Snowflake} value={resortsCount} label={t.resorts} />
          <Stat Icon={UserCircle2} value={publishedDrivers} label={t.drivers} />
          <Stat
            Icon={ShieldCheck}
            value={reviewCount}
            label={t.reviews}
            suffix={agg ? ` · ${agg.value}★` : undefined}
          />
          {company.publicStats.tripsLastSeason ? (
            <Stat
              Icon={RouteIcon}
              value={company.publicStats.tripsLastSeason}
              label={locale === "en" ? "trips last season" : locale === "ru" ? "поездок в прошлом сезоне" : "მოგზაურობა გასულ სეზონში"}
              className="col-span-2"
            />
          ) : null}
        </dl>
      </div>
    </section>
  );
}

function Stat({
  Icon,
  value,
  label,
  suffix,
  className,
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  value: number;
  label: string;
  suffix?: string;
  className?: string;
}) {
  return (
    <div
      className={
        "flex items-start gap-4 rounded-lg border border-line bg-surface p-5 " + (className ?? "")
      }
    >
      <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-primary">
        <Icon className="h-4 w-4" strokeWidth={1.75} />
      </span>
      <div>
        <div className="font-serif text-[32px] leading-[36px] tabular">
          {value.toLocaleString("en-US")}
          {suffix ? <span className="ml-1 text-[18px] text-ink-muted">{suffix}</span> : null}
        </div>
        <div className="mt-1 text-small text-ink-muted">{label}</div>
      </div>
    </div>
  );
}
