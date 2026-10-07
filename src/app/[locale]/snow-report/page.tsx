import type { Metadata } from "next";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { LinkButton } from "@/components/ui/button";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { snow } from "@/content/roads";
import { resorts } from "@/content/resorts";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import { seasonStateFor, anyResortOpen, nextOpeningDate } from "@/config/season";
import { SeasonAlertForm } from "@/components/season-alert-form";
import type { Locale } from "@/i18n/routing";

export const revalidate = 900;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: { title: "Snow report — every Georgian resort", desc: "Snow depth, temperature, wind and lifts open at Gudauri, Bakuriani, Tetnuldi, Hatsvali, Goderdzi and Kazbegi. Updated hourly in season." },
    ru: { title: "Снежная сводка — все курорты Грузии", desc: "Глубина снега, температура, ветер и открытые подъёмники в Гудаури, Бакуриани, Тетнулди, Хацвали, Годердзи и Казбеги. Обновление ежечасно в сезон." },
    ka: { title: "თოვლის ანგარიში — საქართველოს ყველა კურორტი", desc: "თოვლის საფარი, ტემპერატურა, ქარი და გახსნილი საბაგიროები გუდაურში, ბაკურიანში, თეთნულდში, ჰაცვალში, გოდერძში და ყაზბეგში. სეზონში ყოველ საათში განახლება." },
  }[l];
  return pageMetadata({ locale: l, path: "/snow-report", title: t.title, description: t.desc, ogKicker: "Snow" });
}

export default async function SnowReport({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const seasonOn = anyResortOpen();
  const nextOpening = nextOpeningDate();

  const preseasonCopy = {
    en: { kicker: "Preseason", title: "Snow is not being measured yet", body: "The patrol starts hourly readings when the first resort opens its lifts. Expected opening date:", notify: "Email me the day measurements start" },
    ru: { kicker: "Межсезонье", title: "Снег пока не замеряем", body: "Патрули начинают почасовые замеры с открытия первого курорта. Ожидаемая дата открытия:", notify: "Напишите мне в день старта замеров" },
    ka: { kicker: "სეზონგარე", title: "თოვლი ჯერ არ იზომება", body: "საპატრულო ჯგუფები ყოველ საათში დაიწყებენ ზომვებს პირველივე კურორტის გახსნისთანავე. სავარაუდო გახსნა:", notify: "შემატყობინეთ გაზომვების დაწყების დღეს" },
  }[l];

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: "Snow report", path: "/snow-report" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Snow report" }]} />
      <SectionHeader
        kicker={seasonOn ? "Live" : preseasonCopy.kicker}
        title={seasonOn ? "Snow across Georgia today" : preseasonCopy.title}
        action={seasonOn ? <span className="text-small text-ink-muted">ISR · 15 min</span> : null}
      />

      {seasonOn ? (
        <Table>
          <THead>
            <TR>
              <TH>Resort</TH>
              <TH align="right">Top</TH>
              <TH align="right">Base</TH>
              <TH align="right">24h new</TH>
              <TH align="right">Temp</TH>
              <TH align="right">Lifts</TH>
              <TH align="right">Updated</TH>
            </TR>
          </THead>
          <tbody>
            {resorts.map((r) => {
              const season = seasonStateFor(r);
              const s = season.state === "open" ? snow.find((row) => row.resort === r.slug) : undefined;
              return (
                <TR key={r.slug}>
                  <TD>
                    <Link href={`/resorts/${r.slug}` as never} className="text-ink hover:text-primary">{r.name[l]}</Link>
                  </TD>
                  <TD align="right">{s ? `${s.topCm} cm` : "—"}</TD>
                  <TD align="right">{s ? `${s.baseCm} cm` : "—"}</TD>
                  <TD align="right">{s ? `+${s.new24hCm} cm` : "—"}</TD>
                  <TD align="right">{s ? `${s.tempC > 0 ? "+" : ""}${s.tempC}°C` : "—"}</TD>
                  <TD align="right">{s ? (s.liftsTotal === 0 ? "—" : `${s.liftsOpen}/${s.liftsTotal}`) : "—"}</TD>
                  <TD align="right">{s ? fmt.dateTime(new Date(s.measuredAt), { hour: "2-digit", minute: "2-digit" }) : "—"}</TD>
                </TR>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="rounded-lg border border-line bg-surface-raised p-8">
          <p className="text-ink">{preseasonCopy.body}</p>
          {nextOpening ? (
            <p className="mt-3 font-serif text-[28px] leading-[36px] tabular text-ink">
              {fmt.dateTime(new Date(nextOpening.date), { day: "numeric", month: "long", year: "numeric" })}
              <span className="ml-2 text-small text-ink-muted">· {nextOpening.resort.name[l]}</span>
            </p>
          ) : null}
          <div className="mt-6">
            <p className="text-small text-ink-muted">{preseasonCopy.notify}</p>
            <div className="mt-3 max-w-md">
              <SeasonAlertForm />
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 rounded-lg border border-line bg-surface-raised p-6">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-small text-primary">Fresh snow?</p>
            <h2 className="mt-1 font-serif text-[20px] leading-[28px]">Book gear rental and lessons for tomorrow</h2>
          </div>
          <div className="flex gap-3">
            <LinkButton href="/things-to-do" variant="outline">Rentals & schools</LinkButton>
            <LinkButton href="/transfers" variant="cta">Book a transfer</LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}
