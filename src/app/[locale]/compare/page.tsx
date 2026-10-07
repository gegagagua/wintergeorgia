import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { comparisons } from "@/content/comparisons";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

const PAGE = {
  en: {
    title: "Compare — pick the right Georgian resort for your trip",
    desc: "Side-by-side comparisons for Georgia's ski resorts: altitude, terrain, transfer time and the honest verdict by reader type.",
    label: "Compare",
  },
  ru: {
    title: "Сравнения — выбрать курорт Грузии под поездку",
    desc: "Сравнения курортов Грузии: высота, рельеф, время трансфера и честный вердикт по типу гостя.",
    label: "Сравнения",
  },
  ka: {
    title: "შედარებები — როგორ ავირჩიოთ ქართული კურორტი",
    desc: "საქართველოს კურორტების გვერდი-გვერდ შედარება: სიმაღლე, რელიეფი, ტრანსფერის დრო და პატიოსანი დასკვნა მკითხველის ტიპის მიხედვით.",
    label: "შედარებები",
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = PAGE[l];
  return pageMetadata({ locale: l, path: "/compare", title: t.title, description: t.desc, ogKicker: t.label });
}

export default async function CompareIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const t = PAGE[l];

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: t.label, path: "/compare" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: t.label }]} />
      <SectionHeader kicker={t.label} title={t.title} />

      <div className="grid gap-4 md:grid-cols-2">
        {comparisons.map((c) => (
          <Link key={c.slug} href={`/compare/${c.slug}` as never} className="group">
            <Card interactive className="h-full">
              <p className="text-small text-primary">{c.topic.replace("-", " ")}</p>
              <h2 className="mt-1 font-serif text-[22px] leading-[28px] group-hover:text-primary">{c.title[l]}</h2>
              <p className="mt-2 line-clamp-3 text-small text-ink-muted">{c.intro[l]}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
