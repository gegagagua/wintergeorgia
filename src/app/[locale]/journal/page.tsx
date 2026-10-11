import type { Metadata } from "next";
import Image from "next/image";
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
    en: { title: "News — season updates, alerts and guides", desc: "Season news, price updates, road alerts and long-form guides for Georgia's ski season." },
    ru: { title: "Новости — сезонные обновления, оповещения, гиды", desc: "Новости сезона, изменения цен, дорожные оповещения и подробные гиды по горнолыжному сезону Грузии." },
    ka: { title: "სიახლეები — სეზონის ახალი ამბები, გაფრთხილებები, გზამკვლევები", desc: "სეზონის სიახლეები, ფასების ცვლილებები, გზების გაფრთხილებები და გრძელი გზამკვლევები საქართველოს სათხილამურო სეზონისთვის." },
  }[l];
  return pageMetadata({ locale: l, path: "/journal", title: t.title, description: t.desc, ogKicker: "News" });
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

  const label = { en: "News", ru: "Новости", ka: "სიახლეები" }[l];
  const latestLabel = { en: "Latest", ru: "Последние", ka: "უახლესი" }[l];
  const allLabel = { en: "All", ru: "Все", ka: "ყველა" }[l];
  const homeLabel = { en: "Home", ru: "Главная", ka: "მთავარი" }[l];
  const draftLabel = { en: "Draft", ru: "Черновик", ka: "მონახაზი" }[l];
  const alertLabel = { en: "Alert", ru: "Оповещение", ka: "გაფრთხილება" }[l];
  const updatedLabel = { en: "Updated", ru: "Обновлено", ka: "განახლდა" }[l];
  // News keeps news and guides. Q&A pages live under /answers.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd(l, [{ name: homeLabel, path: "/" }, { name: label, path: "/journal" }])) }}
      />
      <Breadcrumb items={[{ name: homeLabel, path: "/" }, { name: label }]} />
      <SectionHeader kicker={latestLabel} title={label} />

      <nav aria-label={label} className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/journal"
          className={`rounded-pill border px-3 py-1 text-small ${activeCategory === "" ? "border-primary bg-primary/10 text-primary" : "border-line bg-surface text-ink-muted hover:text-ink"}`}
        >
          {allLabel}
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
            <Card interactive className="flex h-full flex-col overflow-hidden !p-0">
              {a.cover ? (
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={a.cover}
                    alt={a.title[l]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-small">
                  <span className="text-primary">{a.template === "qa" ? "Q&A" : a.template ?? a.category}</span>
                  {a.isAlert ? <StatusPill status="closed" label={alertLabel} /> : null}
                  {a.draft ? (
                    <span className="rounded-pill border border-status-limited/40 bg-status-limited/10 px-2 py-0.5 text-small text-status-limited">
                      {draftLabel}
                    </span>
                  ) : null}
                  <span className="ml-auto tabular text-ink-muted">
                    {a.template === "qa"
                      ? `${updatedLabel} ${fmt.dateTime(new Date(a.updatedAt ?? a.publishedAt), { day: "numeric", month: "short" })}`
                      : fmt.dateTime(new Date(a.publishedAt), { day: "numeric", month: "short" })}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-[20px] leading-[28px] group-hover:text-primary">{a.title[l]}</h2>
                <p className="mt-2 line-clamp-3 flex-1 text-small leading-[1.5] text-ink-muted">{a.excerpt[l]}</p>
                {a.targetQuery ? (
                  <p className="mt-3 border-t border-line pt-3 text-small text-ink-muted tabular">{a.targetQuery}</p>
                ) : null}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
