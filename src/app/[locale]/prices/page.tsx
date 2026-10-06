import type { Metadata } from "next";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { LinkButton } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert-banner";
import { Link } from "@/i18n/navigation";
import { pricesBySeason, allSeasons } from "@/content/prices";
import { resorts, findResort } from "@/content/resorts";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

const CURRENT_SEASON = "2026/27";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: { title: `Prices ${CURRENT_SEASON} — lift, rental, instructor, transfer`, desc: `Confirmed ${CURRENT_SEASON} prices for every Georgian ski resort, each with the date it was last verified.` },
    ru: { title: `Цены ${CURRENT_SEASON} — подъёмник, прокат, инструктор, трансфер`, desc: `Подтверждённые цены сезона ${CURRENT_SEASON} по каждому курорту Грузии; у каждой — дата последней проверки.` },
    ka: { title: `ფასები ${CURRENT_SEASON} — საბაგირო, ქირავნობა, ინსტრუქტორი, ტრანსფერი`, desc: `დადასტურებული ${CURRENT_SEASON} ფასები საქართველოს ყველა კურორტისთვის — თითოეულს დადასტურების თარიღი აქვს.` },
  }[l];
  return pageMetadata({ locale: l, path: "/prices", title: t.title, description: t.desc, ogKicker: "Prices" });
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();

  const label = {
    en: {
      crumb: "Prices",
      title: `Prices for the ${CURRENT_SEASON} season`,
      liftHead: "Lift passes and gear",
      transferHead: "Transfers from Tbilisi",
      day: "Day",
      week: "Week",
      rental: "Rental (day)",
      instructor: "Instructor (hr)",
      resort: "Resort",
      route: "Route",
      distance: "Distance",
      sedan: "Sedan",
      minivan: "Minivan",
      suv: "4x4",
      shared: "Shared seat",
      asOf: "as of",
      source: "Source",
      note: "Prices confirmed with resort offices. Figures carry the date they were last verified.",
      archive: "Price archive",
      bookRow: "Book",
    },
    ru: {
      crumb: "Цены",
      title: `Цены на сезон ${CURRENT_SEASON}`,
      liftHead: "Подъёмники и снаряжение",
      transferHead: "Трансферы из Тбилиси",
      day: "День",
      week: "Неделя",
      rental: "Прокат (день)",
      instructor: "Инструктор (час)",
      resort: "Курорт",
      route: "Маршрут",
      distance: "Расстояние",
      sedan: "Седан",
      minivan: "Минивэн",
      suv: "4x4",
      shared: "Место",
      asOf: "на дату",
      source: "Источник",
      note: "Цены подтверждены с офисами курортов. У каждой цифры — дата последней проверки.",
      archive: "Архив цен",
      bookRow: "Заказать",
    },
    ka: {
      crumb: "ფასები",
      title: `ფასები ${CURRENT_SEASON} სეზონისთვის`,
      liftHead: "საბაგირო და აღჭურვილობა",
      transferHead: "ტრანსფერები თბილისიდან",
      day: "დღე",
      week: "კვირა",
      rental: "ქირავნობა (დღე)",
      instructor: "ინსტრუქტორი (სთ)",
      resort: "კურორტი",
      route: "მარშრუტი",
      distance: "მანძილი",
      sedan: "სედანი",
      minivan: "მინივენი",
      suv: "4x4",
      shared: "ადგილი",
      asOf: "მდგომარეობით",
      source: "წყარო",
      note: "ფასები კურორტების ოფისებთან დადასტურებულია. ყველა რიცხვს აქვს დადასტურების თარიღი.",
      archive: "ფასების არქივი",
      bookRow: "დაჯავშნა",
    },
  }[l];

  const current = pricesBySeason(CURRENT_SEASON);
  const seasons = allSeasons().filter((s) => s !== CURRENT_SEASON);
  const tbilisiRoutes = routes.filter((r) => r.fromSlug === "tbilisi" || r.fromSlug === "tbilisi-airport");

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [
            { name: "Home", path: "/" },
            { name: label.crumb, path: "/prices" },
          ])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label.crumb }]} />
      <SectionHeader kicker={CURRENT_SEASON} title={label.title} />

      <AlertBanner tone="info" title={label.note} />

      <div className="mt-8">
        <h2 className="mb-4 font-serif text-[28px] leading-[36px]">{label.liftHead}</h2>
        <Table>
          <THead>
            <TR>
              <TH>{label.resort}</TH>
              <TH align="right">{label.day}</TH>
              <TH align="right">{label.week}</TH>
              <TH align="right">{label.rental}</TH>
              <TH align="right">{label.instructor}</TH>
              <TH align="right">{label.asOf}</TH>
            </TR>
          </THead>
          <tbody>
            {current.map((p) => {
              const r = findResort(p.resort);
              if (!r) return null;
              return (
                <TR key={p.resort}>
                  <TD>
                    <Link
                      href={`/resorts/${r.slug}` as never}
                      className="hover:text-primary"
                    >
                      {r.name[l]}
                    </Link>
                  </TD>
                  <TD align="right">{p.liftPassDayGel > 0 ? `${p.liftPassDayGel} ₾` : "—"}</TD>
                  <TD align="right">{p.liftPassWeekGel > 0 ? `${p.liftPassWeekGel} ₾` : "—"}</TD>
                  <TD align="right">{p.rentalSetDayGel} ₾</TD>
                  <TD align="right">{p.instructorHourGel} ₾</TD>
                  <TD align="right" className="tabular text-small text-ink-muted">
                    {fmt.dateTime(new Date(p.asOf), { month: "short", day: "numeric", year: "numeric" })}
                  </TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 font-serif text-[28px] leading-[36px]">{label.transferHead}</h2>
        <Table>
          <THead>
            <TR>
              <TH>{label.route}</TH>
              <TH align="right">{label.distance}</TH>
              <TH align="right">{label.shared}</TH>
              <TH align="right">{label.sedan}</TH>
              <TH align="right">{label.minivan}</TH>
              <TH align="right">{label.suv}</TH>
              <TH align="right">{label.bookRow}</TH>
            </TR>
          </THead>
          <tbody>
            {tbilisiRoutes.map((r) => (
              <TR key={r.slug}>
                <TD>{r.from[l]} → {r.to[l]}</TD>
                <TD align="right">{r.distanceKm} km</TD>
                <TD align="right">{r.prices.shared ? `${r.prices.shared.priceGel} ₾` : "—"}</TD>
                <TD align="right">{r.prices.sedan ? `${r.prices.sedan.priceGel} ₾` : "—"}</TD>
                <TD align="right">{r.prices.minivan ? `${r.prices.minivan.priceGel} ₾` : "—"}</TD>
                <TD align="right">{r.prices.suv4x4 ? `${r.prices.suv4x4.priceGel} ₾` : "—"}</TD>
                <TD align="right">
                  <Link
                    href={`/transfers/${r.slug}` as never}
                    className="text-small text-primary hover:underline"
                  >
                    {label.bookRow} →
                  </Link>
                </TD>
              </TR>
            ))}
          </tbody>
        </Table>
      </div>

      {seasons.length > 0 ? (
        <div className="mt-10 rounded-lg border border-line bg-surface p-5">
          <p className="text-small text-primary">{label.archive}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {seasons.map((s) => (
              <li key={s}>
                <Link
                  href={`/prices/${s.replace("/", "-")}` as never}
                  className="rounded-pill border border-line bg-surface-raised px-3 py-1 text-small tabular hover:border-primary-hover"
                >
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-10 rounded-lg border border-line bg-surface-raised p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-serif text-[20px] leading-[28px]">Book the transfer with these prices</h2>
            <p className="mt-1 text-small text-ink-muted">Fixed price at booking. Refund if the road closes.</p>
          </div>
          <LinkButton href="/transfers" variant="cta">Book a transfer</LinkButton>
        </div>
      </div>
      {resorts.length > 0 ? null : null}
    </div>
  );
}
