import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Price } from "@/components/ui/price";
import { LinkButton } from "@/components/ui/button";
import { findResort } from "@/content/resorts";
import { places } from "@/content/places";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return places.map((p) => ({ resort: p.resort, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; resort: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, resort, slug } = await params;
  const l = locale as Locale;
  const p = places.find((x) => x.slug === slug && x.resort === resort);
  const r = findResort(resort);
  if (!p || !r) return {};
  return pageMetadata({
    locale: l,
    path: `/things-to-do/${resort}/${slug}`,
    title: `${p.name[l]} — ${r.name[l]}`,
    description: p.description[l].slice(0, 160),
    ogKicker: p.category,
    ogTitle: p.name[l],
  });
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ locale: string; resort: string; slug: string }>;
}) {
  const { locale, resort, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const p = places.find((x) => x.slug === slug && x.resort === resort);
  const r = findResort(resort);
  if (!p || !r) notFound();

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [
            { name: "Home", path: "/" },
            { name: "Things to do", path: "/things-to-do" },
            { name: r.name[l], path: `/things-to-do/${r.slug}` },
            { name: p.name[l], path: `/things-to-do/${r.slug}/${p.slug}` },
          ])),
        }}
      />
      <Breadcrumb items={[
        { name: "Home", path: "/" },
        { name: "Things to do", path: "/things-to-do" },
        { name: r.name[l], path: `/things-to-do/${r.slug}` },
        { name: p.name[l] },
      ]} />
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-small text-primary">{p.category}</p>
          <h1 className="mt-1 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">{p.name[l]}</h1>
          <p className="mt-4 text-ink">{p.description[l]}</p>
          <dl className="mt-6 grid gap-3 text-small">
            {p.hours ? <div><dt className="text-ink-muted">Hours</dt><dd className="mt-0.5">{p.hours[l]}</dd></div> : null}
            <div><dt className="text-ink-muted">Phone</dt><dd className="mt-0.5"><a href={`tel:${p.phone}`} className="text-primary">{p.phone}</a></dd></div>
            {p.tags.length > 0 ? (
              <div>
                <dt className="text-ink-muted">Notes</dt>
                <dd className="mt-1 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-pill border border-line bg-surface-raised px-2.5 py-0.5 text-small text-ink">{t}</span>
                  ))}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        <aside className="rounded-lg border border-line bg-surface-raised p-6">
          {p.priceFromGel ? (
            <>
              <p className="text-small text-ink-muted">From</p>
              <div className="mt-1"><Price gel={p.priceFromGel} size="lg" /></div>
            </>
          ) : (
            <p className="text-small text-ink-muted">Contact for pricing</p>
          )}
          {p.bookingUrl ? (
            <a href={p.bookingUrl} target="_blank" rel="noopener nofollow" className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-sm bg-accent px-5 font-medium text-white transition-colors hover:brightness-95">
              Book with partner
            </a>
          ) : null}
          <div className="mt-3">
            <LinkButton href="/transfers" variant="outline" className="w-full justify-center">Book a transfer to {r.name[l]}</LinkButton>
          </div>
        </aside>
      </div>
    </div>
  );
}
