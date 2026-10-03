import type { Metadata } from "next";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { LinkButton } from "@/components/ui/button";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { snow } from "@/content/roads";
import { findResort } from "@/content/resorts";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
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

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: "Snow report", path: "/snow-report" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Snow report" }]} />
      <SectionHeader kicker="Live" title="Snow across Georgia today" action={<span className="text-small text-ink-muted">ISR · 15 min</span>} />

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
          {snow.map((s) => {
            const r = findResort(s.resort);
            if (!r) return null;
            return (
              <TR key={s.resort}>
                <TD>
                  <Link href={`/resorts/${r.slug}` as never} className="text-ink hover:text-primary">{r.name[l]}</Link>
                </TD>
                <TD align="right">{s.topCm} cm</TD>
                <TD align="right">{s.baseCm} cm</TD>
                <TD align="right">+{s.new24hCm} cm</TD>
                <TD align="right">{s.tempC > 0 ? "+" : ""}{s.tempC}°C</TD>
                <TD align="right">{s.liftsTotal === 0 ? "—" : `${s.liftsOpen}/${s.liftsTotal}`}</TD>
                <TD align="right">{fmt.dateTime(new Date(s.measuredAt), { hour: "2-digit", minute: "2-digit" })}</TD>
              </TR>
            );
          })}
        </tbody>
      </Table>

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
