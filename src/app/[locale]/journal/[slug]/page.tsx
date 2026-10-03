import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StatusPill } from "@/components/ui/status-pill";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { articles } from "@/content/articles";
import { findResort } from "@/content/resorts";
import { findRoute } from "@/content/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, newsArticleLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const a = articles.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({
    locale: l,
    path: `/journal/${slug}`,
    title: a.title[l],
    description: a.excerpt[l],
    ogKicker: a.category,
    ogTitle: a.title[l],
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const a = articles.find((x) => x.slug === slug);
  if (!a) notFound();

  const resort = a.resort ? findResort(a.resort) : undefined;
  const route = a.route ? findRoute(a.route) : undefined;

  const related = articles.filter((x) => x.slug !== a.slug).slice(0, 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Journal", path: "/journal" },
              { name: a.title[l], path: `/journal/${a.slug}` },
            ]),
            newsArticleLd({
              locale: l,
              slug: a.slug,
              headline: a.title[l],
              description: a.excerpt[l],
              datePublished: a.publishedAt,
              author: a.author,
            }),
          ]),
        }}
      />

      <article className="site-container py-10 md:py-14">
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Journal", path: "/journal" }, { name: a.title[l] }]} />
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-small">
            <span className="text-primary">{a.category}</span>
            {a.isAlert ? <StatusPill status="closed" label="Alert" /> : null}
            <span className="ml-auto tabular text-ink-muted">
              {fmt.dateTime(new Date(a.publishedAt), { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-[40px] leading-[48px] md:text-[60px] md:leading-[64px]">{a.title[l]}</h1>
          <p className="mt-5 text-ink-muted">{a.excerpt[l]}</p>
          <div className="prose prose-neutral mt-6 max-w-none">
            {a.body[l].split("\n\n").map((p, i) => (
              <p key={i} className="mt-4 text-ink">{p}</p>
            ))}
          </div>

          <div className="mt-8 border-t border-line pt-6 text-small text-ink-muted">
            <p>By {a.author}</p>
          </div>

          {(resort || route) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {resort ? <LinkButton href={`/resorts/${resort.slug}`} variant="outline" size="sm">Resort: {resort.name[l]} →</LinkButton> : null}
              {route ? <LinkButton href={`/transfers/${route.slug}`} variant="cta" size="sm">Book: {route.from[l]} → {route.to[l]}</LinkButton> : null}
              {!route ? <LinkButton href="/transfers" variant="cta" size="sm">Book a transfer</LinkButton> : null}
            </div>
          )}
        </div>

        {related.length > 0 ? (
          <section className="mt-14 border-t border-line pt-10">
            <h2 className="mb-6 font-serif text-[28px] leading-[36px]">More from the journal</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((x) => (
                <Link key={x.slug} href={`/journal/${x.slug}` as never} className="group">
                  <Card interactive className="h-full">
                    <p className="text-small text-primary">{x.category}</p>
                    <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{x.title[l]}</h3>
                    <p className="mt-2 line-clamp-2 text-small text-ink-muted">{x.excerpt[l]}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </>
  );
}
