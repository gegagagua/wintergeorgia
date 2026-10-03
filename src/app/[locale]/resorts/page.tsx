import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { resorts } from "@/content/resorts";
import { snow, findSnow } from "@/content/roads";
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
    en: {
      title: "Ski resorts in Georgia",
      desc: "Six ski areas from Gudauri to Goderdzi. Deep resort profiles: terrain, altitude, prices, how to get there and honest recommendations.",
    },
    ru: {
      title: "Горнолыжные курорты Грузии",
      desc: "Шесть зон катания — от Гудаури до Годердзи. Глубокие обзоры: рельеф, высоты, цены, как добраться и честные рекомендации.",
    },
    ka: {
      title: "საქართველოს სათხილამურო კურორტები",
      desc: "ექვსი კურორტი გუდაურიდან გოდერძამდე. სრული პროფილები: რელიეფი, სიმაღლე, ფასები, როგორ მიხვიდე და გულახდილი რჩევები.",
    },
  }[l];
  return pageMetadata({ locale: l, path: "/resorts", title: t.title, description: t.desc, ogKicker: "Resorts" });
}

export default async function ResortsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const label = {
    en: { crumb: "Resorts", title: "Six ski areas, one country" },
    ru: { crumb: "Курорты", title: "Шесть зон катания, одна страна" },
    ka: { crumb: "კურორტები", title: "ექვსი კურორტი, ერთი ქვეყანა" },
  }[l];

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: label.crumb, path: "/resorts" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label.crumb }]} />
      <SectionHeader kicker="Georgia" title={label.title} />

      <div className="grid gap-4 md:grid-cols-2">
        {resorts.map((r) => {
          const s = findSnow(r.slug);
          return (
            <Link key={r.slug} href={`/resorts/${r.slug}` as never} className="group">
              <Card interactive className="h-full">
                <div className="flex items-center gap-2 text-small text-primary">
                  <span>{r.region}</span>
                  {!r.isLiftResort ? (
                    <span className="rounded-pill border border-status-limited/30 bg-status-limited/10 px-2 py-0.5 text-status-limited">
                      Backcountry
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-1 font-serif text-[28px] leading-[36px] group-hover:text-primary">
                  {r.name[l]}
                </h2>
                <p className="mt-2 line-clamp-3 text-ink-muted">{r.description[l]}</p>
                <dl className="mt-4 grid grid-cols-3 gap-4 border-t border-line pt-4 text-small">
                  <div><dt className="text-ink-muted">Altitude</dt><dd className="mt-0.5 tabular">{r.altMinM}–{r.altMaxM} m</dd></div>
                  <div><dt className="text-ink-muted">Lifts</dt><dd className="mt-0.5 tabular">{r.liftsTotal}</dd></div>
                  <div><dt className="text-ink-muted">Today</dt><dd className="mt-0.5 tabular">{s ? `${s.topCm} cm` : "—"}</dd></div>
                </dl>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 rounded-lg border border-line bg-surface-raised p-6">
        <SectionHeader kicker="Getting there" title="Every resort has a transfer route" />
        <p className="text-ink-muted">Fixed price, refunded if the road closes, driver details sent 12 hours before departure.</p>
        <div className="mt-4"><LinkButton href="/transfers" variant="cta">Book a transfer</LinkButton></div>
      </div>
      {snow.length > 0 ? null : null}
    </div>
  );
}
