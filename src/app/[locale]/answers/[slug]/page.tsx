import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LinkButton } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { articles } from "@/content/articles";
import { findResort } from "@/content/resorts";
import { findRoute } from "@/content/routes";
import { RelatedStrip } from "@/components/related-strip";
import { relatedForArticle } from "@/lib/related";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, qaPageLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

const ANSWER_LABEL: Record<Locale, string> = {
  en: "Answers",
  ru: "Ответы",
  ka: "პასუხები",
};

function answers() {
  return articles.filter((a) => a.template === "qa");
}

export function generateStaticParams() {
  return answers().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const a = answers().find((x) => x.slug === slug);
  if (!a) return {};
  return pageMetadata({
    locale: l,
    path: `/answers/${slug}`,
    title: a.title[l],
    description: a.oneSentenceAnswer?.[l] ?? a.excerpt[l],
    ogKicker: "Answer",
    ogTitle: a.title[l],
    index: !a.draft,
  });
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const a = answers().find((x) => x.slug === slug);
  if (!a) notFound();

  const resort = a.resort ? findResort(a.resort) : undefined;
  const ctaRoute = a.ctaRoute ? findRoute(a.ctaRoute) : undefined;
  const ctaResort = a.ctaResort ? findResort(a.ctaResort) : resort;
  const siblings = answers()
    .filter((x) => x.slug !== a.slug && x.topic === a.topic)
    .slice(0, 2);

  const dateModified = a.updatedAt ?? a.publishedAt;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: ANSWER_LABEL[l], path: "/answers" },
              { name: a.title[l], path: `/answers/${a.slug}` },
            ]),
            qaPageLd({
              locale: l,
              slug: a.slug,
              headline: a.title[l],
              answer: a.oneSentenceAnswer?.[l] ?? a.excerpt[l],
              faqs: (a.faqs ?? []).map((f) => ({ q: f.q[l], a: f.a[l] })),
              dateModified,
              author: a.author,
            }),
          ]),
        }}
      />

      <article className="site-container py-10 md:py-14">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: ANSWER_LABEL[l], path: "/answers" },
            { name: a.title[l] },
          ]}
        />
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-small">
            <span className="text-primary">Answer</span>
            {a.topic ? (
              <span className="rounded-pill border border-line bg-surface-raised px-2 py-0.5 tabular text-ink-muted">
                {a.topic.replace("-", " ")}
              </span>
            ) : null}
            <span className="ml-auto tabular text-ink-muted">
              <span className="text-ink-muted">Updated </span>
              {fmt.dateTime(new Date(dateModified), {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="mt-3 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">
            {a.title[l]}
          </h1>

          {a.oneSentenceAnswer ? (
            <p className="mt-5 rounded-lg border border-primary/20 bg-primary/5 p-5 font-medium text-ink">
              {a.oneSentenceAnswer[l]}
            </p>
          ) : (
            <p className="mt-5 text-ink-muted">{a.excerpt[l]}</p>
          )}

          {a.body[l] ? (
            <div className="prose prose-neutral mt-6 max-w-none">
              {a.body[l].split("\n\n").map((p, i) => (
                <p key={i} className="mt-4 text-ink">
                  {p}
                </p>
              ))}
            </div>
          ) : null}

          {a.faqs && a.faqs.length > 0 ? (
            <section className="mt-10">
              <h2 className="font-serif text-[24px] leading-[32px]">Follow-up questions</h2>
              <dl className="mt-5 grid gap-3">
                {a.faqs.map((f, i) => (
                  <div key={i} className="rounded-lg border border-line bg-surface p-5">
                    <dt className="font-medium text-ink">{f.q[l]}</dt>
                    <dd className="mt-2 text-small text-ink-muted">{f.a[l]}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
            {ctaResort ? (
              <LinkButton href={`/resorts/${ctaResort.slug}` as never} variant="outline" size="sm">
                Resort: {ctaResort.name[l]} →
              </LinkButton>
            ) : null}
            {ctaRoute ? (
              <LinkButton href={`/transfers/${ctaRoute.slug}` as never} variant="cta" size="sm">
                Book: {ctaRoute.from[l]} → {ctaRoute.to[l]}
              </LinkButton>
            ) : (
              <LinkButton href="/transfers" variant="cta" size="sm">
                Book a transfer
              </LinkButton>
            )}
          </div>
        </div>

        {siblings.length > 0 ? (
          <section className="mt-14 border-t border-line pt-10">
            <h2 className="mb-6 font-serif text-[24px] leading-[32px]">More answers like this</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {siblings.map((x) => (
                <Link key={x.slug} href={`/answers/${x.slug}` as never} className="group">
                  <Card interactive className="h-full">
                    <p className="text-small text-primary">{x.topic?.replace("-", " ") ?? "Answer"}</p>
                    <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{x.title[l]}</h3>
                    <p className="mt-2 line-clamp-2 text-small text-ink-muted">
                      {x.oneSentenceAnswer?.[l] ?? x.excerpt[l]}
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
