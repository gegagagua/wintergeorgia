import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { LinkButton } from "@/components/ui/button";
import { AlertBanner } from "@/components/ui/alert-banner";
import { prices } from "@/content/prices";
import { resorts, findResort } from "@/content/resorts";
import { routes } from "@/content/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: { title: "Prices 2026/27 — lift, rental, instructor, transfer", desc: "Confirmed 2026/27 prices for every Georgian ski resort: lift pass, gear rental, instructor, transfer from Tbilisi." },
    ru: { title: "Цены 2026/27 — подъёмник, прокат, инструктор, трансфер", desc: "Подтверждённые цены сезона 2026/27 по каждому курорту Грузии: ски-пасс, прокат, инструктор, трансфер из Тбилиси." },
    ka: { title: "ფასები 2026/27 — საბაგირო, ქირავნობა, ინსტრუქტორი, ტრანსფერი", desc: "დადასტურებული 2026/27 ფასები საქართველოს ყველა კურორტისთვის: საბაგირო, აღჭურვილობის ქირავნობა, ინსტრუქტორი, ტრანსფერი თბილისიდან." },
  }[l];
  return pageMetadata({ locale: l, path: "/prices", title: t.title, description: t.desc, ogKicker: "Prices" });
}

export default async function PricesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);

  const label = {
    en: {
      crumb: "Prices",
      title: "Prices for the 2026/27 season",
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
      note: "Prices confirmed with resort offices for the 2026/27 season. Kazbegi is not a lift resort — costs are for guide services.",
    },
    ru: {
      crumb: "Цены",
      title: "Цены на сезон 2026/27",
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
      note: "Цены подтверждены с офисами курортов на сезон 2026/27. Казбеги — не подъёмный курорт; указана стоимость услуг гида.",
    },
    ka: {
      crumb: "ფასები",
      title: "ფასები 2026/27 სეზონისთვის",
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
      note: "ფასები კურორტების ოფისებთან დადასტურებულია 2026/27 სეზონისთვის. ყაზბეგი — არაა საბაგირო კურორტი; ფასი გიდის მომსახურებისთვისაა.",
    },
  }[l];

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
      <SectionHeader kicker="2026 / 27" title={label.title} />

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
            </TR>
          </THead>
          <tbody>
            {prices.map((p) => {
              const r = findResort(p.resort);
              if (!r) return null;
              return (
                <TR key={p.resort}>
                  <TD>{r.name[l]}</TD>
                  <TD align="right">{p.liftPassDayGel > 0 ? `${p.liftPassDayGel} ₾` : "—"}</TD>
                  <TD align="right">{p.liftPassWeekGel > 0 ? `${p.liftPassWeekGel} ₾` : "—"}</TD>
                  <TD align="right">{p.rentalSetDayGel} ₾</TD>
                  <TD align="right">{p.instructorHourGel} ₾</TD>
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
              </TR>
            ))}
          </tbody>
        </Table>
      </div>

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
