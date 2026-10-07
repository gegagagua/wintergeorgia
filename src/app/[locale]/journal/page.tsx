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

export default async function JournalIndex({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ category?: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const resolved = (await (searchParams ?? Promise.resolve({}))) as { category?: string };
  const q = resolved.category;

  const label = { en: "Journal", ru: "Журнал", ka: "ჟურნალი" }[l];
  // Journal keeps news and guides. Q&A pages live under /answers.
  const nonQa = articles.filter((a) => a.template !== "qa");
  const categoryLabels: Record<string, { en: string; ru: string; ka: string }> = {
    news: { en: "News", ru: "Новости", ka: "ახალი ამბები" },
    price: { en: "Prices", ru: "Цены", ka: "ფასები" },
    alert: { en: "Alerts", ru: "Оповещения", ka: "გაფრთხილებები" },
    infrastructure: { en: "Infrastructure", ru: "Инфраструктура", ka: "ინფრასტრუქტურა" },
    event: { en: "Events", ru: "События", ka: "ღონისძიებები" },
    guide: { en: "Guides", ru: "Гиды", ka: "გზამკვლევები" },
  };
  const activeCategory = typeof q === "string" ? q : "";
  const categories = Array.from(new Set(nonQa.map((a) => a.category)));
  const sorted = nonQa
    .filter((a) => (activeCategory ? a.category === activeCategory : true))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: label, path: "/journal" }])) }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label }]} />
      <SectionHeader kicker="Latest" title={label} />

      <nav aria-label="Journal categories" className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/journal"
          className={`rounded-pill border px-3 py-1 text-small ${activeCategory === "" ? "border-primary bg-primary/10 text-primary" : "border-line bg-surface text-ink-muted hover:text-ink"}`}
        >
          {{ en: "All", ru: "Все", ka: "ყველა" }[l]}
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={{ pathname: "/journal", query: { category: c } }}
            className={`rounded-pill border px-3 py-1 text-small ${activeCategory === c ? "border-primary bg-primary/10 text-primary" : "border-line bg-surface text-ink-muted hover:text-ink"}`}
          >
            {categoryLabels[c]?.[l] ?? c}
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((a) => (
          <Link key={a.slug} href={`/journal/${a.slug}` as never} className="group">
            <Card interactive className="h-full">
              <div className="flex items-center gap-2 text-small">
                <span className="text-primary">{a.template === "qa" ? "Q&A" : a.template ?? a.category}</span>
                {a.isAlert ? <StatusPill status="closed" label="Alert" /> : null}
                {a.draft ? (
                  <span className="rounded-pill border border-status-limited/40 bg-status-limited/10 px-2 py-0.5 text-small text-status-limited">
                    Draft
                  </span>
                ) : null}
                <span className="ml-auto tabular text-ink-muted">
                  {a.template === "qa"
                    ? `Updated ${fmt.dateTime(new Date(a.updatedAt ?? a.publishedAt), { day: "numeric", month: "short" })}`
                    : fmt.dateTime(new Date(a.publishedAt), { day: "numeric", month: "short" })}
                </span>
              </div>
              <h2 className="mt-2 font-serif text-[20px] leading-[28px] group-hover:text-primary">{a.title[l]}</h2>
              <p className="mt-2 line-clamp-3 text-small text-ink-muted">{a.excerpt[l]}</p>
              {a.targetQuery ? (
                <p className="mt-3 border-t border-line pt-3 text-small text-ink-muted tabular">{a.targetQuery}</p>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
