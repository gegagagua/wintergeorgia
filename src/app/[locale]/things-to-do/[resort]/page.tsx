import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Price } from "@/components/ui/price";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { PlacesFilters } from "@/components/places-filters";
import { findResort, resorts } from "@/content/resorts";
import { places } from "@/content/places";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return resorts.map((r) => ({ resort: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; resort: string }>;
}): Promise<Metadata> {
  const { locale, resort } = await params;
  const l = locale as Locale;
  const r = findResort(resort);
  if (!r) return {};
  return pageMetadata({
    locale: l,
    path: `/things-to-do/${resort}`,
    title: `Things to do in ${r.name[l]}`,
    description: `Vetted rental shops, ski schools, restaurants, bars, tubing, paragliding and more at ${r.name[l]}.`,
    ogKicker: r.region,
    ogTitle: `Things to do in ${r.name[l]}`,
  });
}

export default async function ThingsResort({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; resort: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale, resort } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const r = findResort(resort);
  if (!r) notFound();

  const sp = await searchParams;
  const category = str(sp.category) ?? "all";
  const q = str(sp.q) ?? "";
  const qLower = q.trim().toLowerCase();

  let list = places.filter((p) => p.resort === r.slug);
  if (category !== "all") list = list.filter((p) => p.category === category);
  if (qLower)
    list = list.filter((p) => {
      const hay = [p.name.en, p.name.ru, p.name.ka, p.phone, ...(p.tags ?? [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(qLower);
    });

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [
            { name: "Home", path: "/" },
            { name: "Things to do", path: "/things-to-do" },
            { name: r.name[l], path: `/things-to-do/${r.slug}` },
          ])),
        }}
      />
      <Breadcrumb items={[
        { name: "Home", path: "/" },
        { name: "Things to do", path: "/things-to-do" },
        { name: r.name[l] },
      ]} />
      <SectionHeader kicker={r.region} title={`Things to do in ${r.name[l]}`} action={<LinkButton href={`/transfers`} variant="cta" size="sm">Book a transfer</LinkButton>} />

      <PlacesFilters category={category} q={q} />

      {list.length === 0 ? (
        <EmptyState title="No matches" description="Try clearing the search or picking another category." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.slug} href={`/things-to-do/${r.slug}/${p.slug}` as never} className="group">
              <Card interactive className="h-full">
                <p className="text-small text-primary">{p.category}</p>
                <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{p.name[l]}</h3>
                <p className="mt-2 line-clamp-2 text-small text-ink-muted">{p.description[l]}</p>
                <div className="mt-4 flex items-end justify-between">
                  {p.priceFromGel ? <Price gel={p.priceFromGel} from /> : <span className="text-small text-ink-muted">Contact for price</span>}
                  <span className="text-small text-primary">Details →</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function str(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}
