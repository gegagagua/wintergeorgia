import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getFormatter } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Price } from "@/components/ui/price";
import { LinkButton } from "@/components/ui/button";
import { events } from "@/content/events";
import { findResort } from "@/content/resorts";
import { findRoute } from "@/content/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd, eventLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const e = events.find((x) => x.slug === slug);
  if (!e) return {};
  return pageMetadata({
    locale: l,
    path: `/events/${slug}`,
    title: e.title[l],
    description: e.body[l].slice(0, 160),
    ogKicker: e.category,
    ogTitle: e.title[l],
  });
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const fmt = await getFormatter();
  const e = events.find((x) => x.slug === slug);
  if (!e) notFound();
  const r = findResort(e.resort);
  const transferRoute = e.transferRoute ? findRoute(e.transferRoute) : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Events", path: "/events" },
              { name: e.title[l], path: `/events/${e.slug}` },
            ]),
            eventLd({
              locale: l,
              slug: e.slug,
              name: e.title[l],
              description: e.body[l],
              startsAt: e.startsAt,
              endsAt: e.endsAt,
              placeName: r?.name.en ?? e.resort,
              addressLocality: r?.name.en ?? e.resort,
              priceGel: e.ticketPriceGel,
              ticketUrl: e.ticketUrl,
            }),
          ]),
        }}
      />
      <div className="site-container py-10 md:py-14">
        <Breadcrumb items={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: e.title[l] },
        ]} />

        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-small tabular text-primary">
              {fmt.dateTime(new Date(e.startsAt), { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              {e.endsAt ? ` — ${fmt.dateTime(new Date(e.endsAt), { day: "numeric", month: "long" })}` : ""}
            </p>
            <h1 className="mt-1 font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">{e.title[l]}</h1>
            <p className="mt-4 text-ink">{e.body[l]}</p>
            {r ? (
              <p className="mt-4 text-small text-ink-muted">At {r.name[l]} · {r.region}</p>
            ) : null}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-line bg-surface-raised p-5">
              <p className="text-small text-ink-muted">Ticket</p>
              {e.ticketPriceGel ? <div className="mt-1"><Price gel={e.ticketPriceGel} size="lg" /></div> : <p className="mt-1 text-ink">Free entry</p>}
              {e.ticketUrl ? (
                <a href={e.ticketUrl} target="_blank" rel="noopener nofollow" className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-sm bg-primary px-5 font-medium text-white hover:bg-primary-hover">
                  Get tickets
                </a>
              ) : null}
              <a href={`/api/events/${e.slug}/ical`} className="mt-3 inline-flex w-full items-center justify-center rounded-sm border border-line px-5 py-2 text-small text-ink hover:border-primary-hover">
                Add to calendar (.ics)
              </a>
            </div>

            {transferRoute ? (
              <div className="rounded-lg border border-line bg-surface p-5">
                <p className="text-small text-primary">Getting there</p>
                <p className="mt-1 text-ink">{transferRoute.from[l]} → {transferRoute.to[l]}</p>
                <div className="mt-4">
                  <LinkButton href={`/transfers/${transferRoute.slug}`} variant="cta" className="w-full justify-center">Book a transfer</LinkButton>
                </div>
              </div>
            ) : (
              <LinkButton href="/transfers" variant="cta" className="w-full justify-center">Book a transfer</LinkButton>
            )}
          </aside>
        </div>
      </div>
    </>
  );
}
