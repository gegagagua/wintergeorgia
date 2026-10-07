import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LinkButton } from "@/components/ui/button";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { comparisons, findComparison } from "@/content/comparisons";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const c = findComparison(slug);
  if (!c) return {};
  return pageMetadata({
    locale: l,
    path: `/compare/${slug}`,
    title: c.title[l],
    description: c.intro[l].slice(0, 160),
    ogKicker: "Compare",
    ogTitle: c.title[l],
  });
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const c = findComparison(slug);
  if (!c) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Compare", path: "/compare" },
              { name: c.title[l], path: `/compare/${c.slug}` },
            ]),
          ),
        }}
      />
      <article className="site-container py-10 md:py-14">
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: c.title[l] },
          ]}
        />
        <div className="max-w-3xl">
          <p className="text-small text-primary">Compare</p>
          <h1 className="mt-2 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">
            {c.title[l]}
          </h1>
          <p className="mt-5 text-ink">{c.intro[l]}</p>
          <p className="mt-3 text-small text-ink-muted tabular">
            Updated {c.updatedAt}
          </p>
        </div>

        <section className="mt-10">
          <Table>
            <THead>
              <TR>
                <TH>&nbsp;</TH>
                {c.columns.map((col, i) => (
                  <TH key={i}>{col.label[l]}</TH>
                ))}
              </TR>
            </THead>
            <tbody>
              {c.rows.map((row, i) => (
                <TR key={i}>
                  <TD>{row.label[l]}</TD>
                  {row.values.map((v, j) => (
                    <TD key={j}>{v[l]}</TD>
                  ))}
                </TR>
              ))}
            </tbody>
          </Table>
        </section>

        <section className="mt-12">
          <h2 className="font-serif text-[28px] leading-[36px]">Verdict by reader</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {c.verdictByReader.map((v, i) => (
              <div key={i} className="rounded-lg border border-line bg-surface p-5">
                <p className="text-small text-primary">{v.reader[l]}</p>
                <p className="mt-2 text-ink">{v.verdict[l]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12 flex flex-wrap gap-3">
          {c.columns
            .map((col) => col.cta)
            .filter((cta): cta is NonNullable<typeof cta> => Boolean(cta))
            .map((cta, i) => (
              <LinkButton
                key={i}
                href={cta.route ? `/transfers/${cta.route}` : cta.resort ? `/resorts/${cta.resort}` : "/transfers"}
                variant={i === 0 ? "cta" : "outline"}
              >
                {cta.label[l]}
              </LinkButton>
            ))}
        </section>
      </article>
    </>
  );
}
