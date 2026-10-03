import type { Metadata } from "next";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { articles } from "@/content/articles";
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
    en: { title: "Journal — season news, alerts and guides", desc: "Season news, price updates, road alerts and long-form guides for Georgia's ski season." },
    ru: { title: "Журнал — новости сезона, оповещения и гиды", desc: "Новости сезона, изменения цен, дорожные оповещения и подробные гиды по горнолыжному сезону Грузии." },
    ka: { title: "ჟურნალი — სეზონის ახალი ამბები, გაფრთხილებები, გზამკვლევები", desc: "სეზონის სიახლეები, ფასების ცვლილებები, გზების გაფრთხილებები და გრძელი გზამკვლევები საქართველოს სათხილამურო სეზონისთვის." },
  }[l];
  return pageMetadata({ locale: l, path: "/journal", title: t.title, description: t.desc, ogKicker: "Journal" });
}

export default async function JournalIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();

  const label = { en: "Journal", ru: "Журнал", ka: "ჟურნალი" }[l];
  const sorted = [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: label, path: "/journal" }])) }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label }]} />
      <SectionHeader kicker="Latest" title={label} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((a) => (
          <Link key={a.slug} href={`/journal/${a.slug}` as never} className="group">
            <Card interactive className="h-full">
              <div className="flex items-center gap-2 text-small">
                <span className="text-primary">{a.category}</span>
                {a.isAlert ? <StatusPill status="closed" label="Alert" /> : null}
                <span className="ml-auto tabular text-ink-muted">{fmt.dateTime(new Date(a.publishedAt), { day: "numeric", month: "short" })}</span>
              </div>
              <h2 className="mt-2 font-serif text-[20px] leading-[28px] group-hover:text-primary">{a.title[l]}</h2>
              <p className="mt-2 line-clamp-3 text-small text-ink-muted">{a.excerpt[l]}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
