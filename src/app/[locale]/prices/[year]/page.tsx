import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { LinkButton } from "@/components/ui/button";
import { pricesBySeason, allSeasons } from "@/content/prices";
import { findResort } from "@/content/resorts";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return allSeasons().map((s) => ({ year: s.replace("/", "-") }));
}

function seasonFromParam(year: string) {
  return year.replace("-", "/");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}): Promise<Metadata> {
  const { locale, year } = await params;
  const l = locale as Locale;
  const season = seasonFromParam(year);
  return pageMetadata({
    locale: l,
    path: `/prices/${year}`,
    title: `Price archive — Georgian ski resorts ${season}`,
    description: `Lift pass, rental and instructor prices for Georgian ski resorts in the ${season} season.`,
    ogKicker: season,
    index: false, // archive pages do not need to compete with the live page
  });
}

export default async function PriceArchive({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();

  const season = seasonFromParam(year);
  const rows = pricesBySeason(season);
  if (rows.length === 0) notFound();

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Prices", path: "/prices" },
              { name: season, path: `/prices/${year}` },
            ]),
          ),
        }}
      />
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: "Prices", path: "/prices" },
          { name: season },
        ]}
      />
      <SectionHeader kicker="Archive" title={`Prices for the ${season} season`} />

      <Table>
        <THead>
          <TR>
            <TH>Resort</TH>
            <TH align="right">Day</TH>
            <TH align="right">Week</TH>
            <TH align="right">Rental</TH>
            <TH align="right">Instructor</TH>
            <TH align="right">as of</TH>
          </TR>
        </THead>
        <tbody>
          {rows.map((p) => {
            const r = findResort(p.resort);
            if (!r) return null;
            return (
              <TR key={p.resort}>
                <TD>{r.name[l]}</TD>
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

      <div className="mt-8">
        <LinkButton href="/prices" variant="outline" size="sm">
          Back to current prices →
        </LinkButton>
      </div>
    </div>
  );
}
