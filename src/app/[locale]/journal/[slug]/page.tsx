import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { StatusPill } from "@/components/ui/status-pill";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { articles } from "@/content/articles";
import { findResort } from "@/content/resorts";
import { findRoute } from "@/content/routes";
import { RelatedStrip } from "@/components/related-strip";
import { relatedForArticle } from "@/lib/related";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, newsArticleLd, faqLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";
import type { Article } from "@/content/types";

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
    // Drafts are noindex; still browsable with the URL.
    index: !a.draft,
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
  const ctaRoute = a.ctaRoute ? findRoute(a.ctaRoute) : route;
  const ctaResort = a.ctaResort ? findResort(a.ctaResort) : resort;

  const related = articles
    .filter((x) => x.slug !== a.slug && x.template === a.template)
    .slice(0, 2);

  const template = a.template ?? "news";

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
            ...(a.faqs && a.faqs.length > 0
              ? [faqLd(a.faqs.map((f) => ({ q: f.q[l], a: f.a[l] })))]
              : []),
          ]),
        }}
      />

      <article className="site-container py-10 md:py-14">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: a.title[l] },
          ]}
        />
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-small">
            <span className="text-primary">{template === "qa" ? "Q&A" : template}</span>
            {a.isAlert ? <StatusPill status="closed" label="Alert" /> : null}
            {a.draft ? (
              <span className="rounded-pill border border-status-limited/40 bg-status-limited/10 px-2 py-0.5 text-status-limited">
                Draft
              </span>
            ) : null}
            <span className="ml-auto tabular text-ink-muted">
              {fmt.dateTime(new Date(a.publishedAt), {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-[40px] leading-[48px] md:text-[60px] md:leading-[64px]">
            {a.title[l]}
          </h1>

          {/* QA pages must answer in the first sentence. */}
          {template === "qa" && a.oneSentenceAnswer ? (
            <p className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-5 font-medium text-ink">
              {a.oneSentenceAnswer[l]}
            </p>
          ) : (
            <p className="mt-5 text-ink-muted">{a.excerpt[l]}</p>
          )}

          {a.targetQuery ? (
            <p className="mt-3 text-small text-ink-muted">
              <span className="text-primary">Target query:</span>{" "}
              <span className="tabular">{a.targetQuery}</span>
            </p>
          ) : null}

          {a.body[l] ? (
            <div className="prose prose-neutral mt-6 max-w-none">
              {a.body[l].split("\n\n").map((p, i) => (
                <p key={i} className="mt-4 text-ink">
                  {p}
                </p>
              ))}
            </div>
          ) : null}

          {template === "comparison" && a.comparison ? (
            <section className="mt-8">
              <Table>
                <THead>
                  <TR>
                    {a.comparison.headers.map((h, i) => (
                      <TH key={i} align={i === 0 ? "left" : "right"}>
                        {h[l]}
                      </TH>
                    ))}
                  </TR>
                </THead>
                <tbody>
                  {a.comparison.rows.map((row, i) => (
                    <TR key={i}>
                      <TD>{row.label[l]}</TD>
                      {row.values.map((v, j) => (
                        <TD key={j} align="right">
                          {v[l]}
                        </TD>
                      ))}
                    </TR>
                  ))}
                </tbody>
              </Table>
              {a.comparison.verdict ? (
                <p className="mt-5 rounded-lg border border-line bg-surface p-5 font-medium text-ink">
                  {a.comparison.verdict[l]}
                </p>
              ) : null}
            </section>
          ) : null}

          {a.faqs && a.faqs.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-serif text-[24px] leading-[32px]">
                {template === "qa" ? "Follow-up questions" : "Common questions"}
              </h2>
              <dl className="mt-5 grid gap-3">
                {a.faqs.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-line bg-surface p-5"
                  >
                    <dt className="font-medium text-ink">{f.q[l]}</dt>
                    <dd className="mt-2 text-small text-ink-muted">
                      {f.a[l]}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <div className="mt-10 border-t border-line pt-6 text-small text-ink-muted">
            <p>By {a.author}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {ctaResort ? (
              <LinkButton
                href={`/resorts/${ctaResort.slug}` as never}
                variant="outline"
                size="sm"
              >
                Resort: {ctaResort.name[l]} →
              </LinkButton>
            ) : null}
            {ctaRoute ? (
              <LinkButton
                href={`/transfers/${ctaRoute.slug}` as never}
                variant="cta"
                size="sm"
              >
                Book: {ctaRoute.from[l]} → {ctaRoute.to[l]}
              </LinkButton>
            ) : (
              <LinkButton href="/transfers" variant="cta" size="sm">
                Book a transfer
              </LinkButton>
            )}
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mt-14 border-t border-line pt-10">
            <h2 className="mb-6 font-serif text-[28px] leading-[36px]">
              More from the journal
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((x) => (
                <Link
                  key={x.slug}
                  href={`/journal/${x.slug}` as never}
                  className="group"
                >
                  <Card interactive className="h-full">
                    <p className="text-small text-primary">
                      {x.template ?? x.category}
                    </p>
                    <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">
                      {x.title[l]}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-small text-ink-muted">
                      {x.excerpt[l]}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </article>

      <RelatedStrip items={relatedForArticle(a.slug, l)} title="Related" />
    </>
  );
}

// Keep the Article import linter-friendly for authors reading the file.
void (null as unknown as Article);
