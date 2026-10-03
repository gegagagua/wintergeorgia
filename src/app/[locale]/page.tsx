import { getFormatter, getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { StatusBoard } from "@/components/status-board";
import { HeroScene } from "@/components/hero-scene";
import { Snowflakes } from "@/components/snowflakes";
import { MountainScape } from "@/components/mountain-scape";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { SectionHeader } from "@/components/ui/section-header";
import { CategoryTag } from "@/components/category-tag";
import { StatusPill } from "@/components/ui/status-pill";
import { SubscribeForm } from "@/components/subscribe-form";
import { QuickBookWidget } from "@/components/quick-book";
import { FleetShowcase } from "@/components/fleet-showcase";
import { HowItWorks } from "@/components/how-it-works";
import { TrustBar } from "@/components/trust-bar";
import { ActivityTicker } from "@/components/activity-ticker";
import { Testimonials } from "@/components/testimonials";
import { ResortThumb } from "@/components/resort-thumb";
import { RouteThumb } from "@/components/route-thumb";
import { Gallery } from "@/components/gallery";
import { AnimatedCounter } from "@/components/animated-counter";
import { resorts } from "@/content/resorts";
import { routes } from "@/content/routes";
import { events } from "@/content/events";
import { articles } from "@/content/articles";
import { breadcrumbLd, faqLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = locale as Locale;
  const t = await getTranslations("home");
  const tn = await getTranslations("nav");
  const fmt = await getFormatter();

  const featured = events.filter((e) => e.featured).slice(0, 2);
  const latest = articles.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd(l, [{ name: "Home", path: "/" }]),
            faqLd([
              {
                q: "Are transfers refunded if the road closes?",
                a: "Yes. Any booking on a closed road is either automatically rescheduled or fully refunded, no fee.",
              },
              {
                q: "Are prices fixed?",
                a: "Yes. Every price shown at booking is the final price. There is no dynamic pricing in season one.",
              },
              {
                q: "How far in advance should I book?",
                a: "New Year and Christmas weeks: at least four weeks. Any other time: 48 hours is comfortable.",
              },
            ]),
          ]),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-glacier text-snow">
        <HeroScene className="pointer-events-none absolute inset-0 h-full w-full text-snow" />
        <Snowflakes count={28} />
        <div className="relative site-container grid gap-10 py-16 md:grid-cols-[1.15fr_1fr] md:py-24 lg:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-3 py-1 text-small tabular text-dawn-soft backdrop-blur">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-dawn-soft opacity-70" />
                <span className="relative inline-block h-2 w-2 rounded-full bg-dawn" />
              </span>
              {t("heroKicker")}
            </p>
            <h1 className="mt-4 max-w-[16ch] font-serif text-[46px] leading-[1.03] md:text-[68px] md:leading-[1.02] lg:text-[80px]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.65] text-white/80">
              {t("heroBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/transfers" variant="cta" size="lg" arrow>
                {t("ctaBook")}
              </LinkButton>
              <LinkButton
                href="/road-status"
                variant="outline"
                size="lg"
                className="border-white/25 bg-white/5 text-snow backdrop-blur hover:border-dawn-soft hover:bg-white/10"
              >
                {t("ctaConditions")}
              </LinkButton>
            </div>
            <dl className="mt-10 grid w-full max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6 text-small">
              <Stat number={140} suffix="+" label="Vetted drivers" />
              <Stat number={10} label="Operating routes" />
              <Stat number={6} label="Resorts covered" />
            </dl>
          </div>

          <div className="lg:mt-4">
            <QuickBookWidget routes={routes} />
          </div>
        </div>
      </section>

      {/* Live activity ticker */}
      <ActivityTicker />

      {/* Status board */}
      <section className="relative overflow-hidden border-b border-line bg-glacier py-14 text-snow">
        <MountainScape variant="compact" className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%] w-full text-snow opacity-70" />
        <div className="relative site-container">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-small text-dawn-soft">Live board</p>
              <h2 className="mt-1 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
                Right now on the mountains
              </h2>
            </div>
            <div className="hidden text-small text-white/50 sm:block">
              4 roads · 6 resorts · auto-refresh 15 min
            </div>
          </div>
          <StatusBoard locale={l} tone="dark" />
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* How it works */}
      <HowItWorks />

      {/* Fleet */}
      <div className="border-t border-line bg-surface-raised">
        <FleetShowcase />
      </div>

      {/* Popular routes */}
      <section className="border-t border-line py-16">
        <div className="site-container">
          <SectionHeader
            kicker="Bookings"
            title="Popular transfer routes"
            action={
              <LinkButton href="/transfers" variant="ghost" size="sm" arrow>
                All routes
              </LinkButton>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routes.slice(0, 6).map((r, i) => {
              const cheapest = Object.values(r.prices)
                .filter((p): p is { priceGel: number; maxPax: number } => Boolean(p))
                .sort((a, b) => a.priceGel - b.priceGel)[0];
              return (
                <Link key={r.slug} href={`/transfers/${r.slug}` as never} className="gw-reveal group" style={{ animationDelay: `${i * 40}ms` }}>
                  <Card interactive className="flex h-full flex-col">
                    <RouteThumb slug={r.slug} />
                    <p className="mt-4 flex items-center gap-2 text-small text-primary tabular">
                      <span>{r.distanceKm} km · {(r.durationMin / 60).toFixed(r.durationMin % 60 === 0 ? 0 : 1)}h</span>
                      {r.requires4x4 ? (
                        <span className="rounded-pill border border-status-limited/30 bg-status-limited/10 px-2 py-0.5 text-status-limited">4x4</span>
                      ) : null}
                    </p>
                    <h3 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">
                      {r.from[l]} → {r.to[l]}
                    </h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-small text-ink-muted">
                      {r.description[l]}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                      {cheapest ? <Price gel={cheapest.priceGel} from /> : <span />}
                      <span className="inline-flex items-center gap-1 text-small font-medium text-primary">
                        Book
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resorts */}
      <section className="border-t border-line bg-surface-raised py-16">
        <div className="site-container">
          <SectionHeader
            kicker="Six resorts"
            title="Where to ski in Georgia"
            action={
              <LinkButton href="/resorts" variant="ghost" size="sm" arrow>
                {tn("resorts")}
              </LinkButton>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resorts.map((r, i) => (
              <Link key={r.slug} href={`/resorts/${r.slug}` as never} className="gw-reveal group" style={{ animationDelay: `${i * 40}ms` }}>
                <Card interactive className="flex h-full flex-col">
                  <ResortThumb slug={r.slug} />
                  <div className="mt-4 flex items-center gap-2 text-small">
                    <span className="text-primary">{r.region}</span>
                    {!r.isLiftResort ? <CategoryTag tone="alert">Backcountry</CategoryTag> : null}
                  </div>
                  <h3 className="mt-1 font-serif text-[24px] leading-[30px] group-hover:text-primary">
                    {r.name[l]}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-small text-ink-muted">
                    {r.description[l]}
                  </p>
                  <dl className="mt-4 flex items-center gap-5 border-t border-line pt-4 text-small text-ink-muted">
                    <div>
                      <dt className="sr-only">Altitude</dt>
                      <dd className="tabular">{r.altMinM}–{r.altMaxM} m</dd>
                    </div>
                    <span aria-hidden="true" className="text-line">|</span>
                    <div>
                      <dt className="sr-only">Lifts</dt>
                      <dd className="tabular">{r.liftsTotal} lifts</dd>
                    </div>
                  </dl>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — real photography */}
      <div className="border-t border-line">
        <Gallery />
      </div>

      {/* Testimonials */}
      <div className="border-y border-line bg-surface-raised">
        <Testimonials />
      </div>

      {/* Events */}
      <section className="site-container py-16">
        <SectionHeader
          kicker="This season"
          title="Featured events"
          action={
            <LinkButton href="/events" variant="ghost" size="sm" arrow>
              {tn("events")}
            </LinkButton>
          }
        />
        <div className="grid gap-4 md:grid-cols-2">
          {featured.map((e, i) => (
            <Link key={e.slug} href={`/events/${e.slug}` as never} className="gw-reveal group" style={{ animationDelay: `${i * 60}ms` }}>
              <Card interactive className="flex h-full flex-col">
                <div className="flex items-center gap-2">
                  <CategoryTag tone={e.category}>{e.category.replace("-", " ")}</CategoryTag>
                  <p className="text-small tabular text-ink-muted">
                    {fmt.dateTime(new Date(e.startsAt), {
                      day: "numeric",
                      month: "long",
                      weekday: "short",
                    })}
                  </p>
                </div>
                <h3 className="mt-2 font-serif text-[24px] leading-[30px] group-hover:text-primary">
                  {e.title[l]}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-small text-ink-muted">
                  {e.body[l]}
                </p>
                <div className="mt-4 border-t border-line pt-4 text-small font-medium text-primary">
                  Event page →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Journal */}
      <section className="border-t border-line bg-surface-raised py-16">
        <div className="site-container">
          <SectionHeader
            kicker="Latest"
            title="From the journal"
            action={
              <LinkButton href="/journal" variant="ghost" size="sm" arrow>
                {tn("journal")}
              </LinkButton>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {latest.map((a, i) => (
              <Link key={a.slug} href={`/journal/${a.slug}` as never} className="gw-reveal group" style={{ animationDelay: `${i * 40}ms` }}>
                <Card interactive className="flex h-full flex-col">
                  <div className="flex items-center gap-2 text-small">
                    <CategoryTag tone={a.category}>{a.category}</CategoryTag>
                    {a.isAlert ? <StatusPill status="closed" label="Alert" /> : null}
                  </div>
                  <h3 className="mt-2 font-serif text-[20px] leading-[28px] group-hover:text-primary">
                    {a.title[l]}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-small text-ink-muted">
                    {a.excerpt[l]}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing dark section: CTA + subscribe */}
      <section className="relative overflow-hidden bg-night text-snow">
        <MountainScape
          variant="compact"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] w-full text-snow"
        />
        <div className="relative site-container grid gap-10 py-16 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-small text-dawn-soft">Ready?</p>
            <h2 className="mt-2 font-serif text-[32px] leading-[1.1] md:text-[44px]">
              Book the transfer. Fixed price. Refund if the road closes.
            </h2>
            <div className="mt-6">
              <LinkButton href="/transfers" variant="cta" size="lg" arrow>
                {t("ctaBook")}
              </LinkButton>
            </div>
          </div>
          <div>
            <p className="text-small text-dawn-soft">Weekly bulletin</p>
            <h2 className="mt-2 font-serif text-[24px] leading-[1.2] md:text-[28px]">
              One email each Friday. Snow, roads, and what is on this weekend.
            </h2>
            <div className="mt-5">
              <SubscribeForm />
            </div>
            <p className="mt-3 text-small text-white/55">
              No cookies. No cross-tracking. Unsubscribe any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label, suffix }: { number: number; label: string; suffix?: string }) {
  return (
    <div>
      <dt className="font-serif text-[28px] leading-[32px] tabular text-snow md:text-[32px]">
        <AnimatedCounter value={number} suffix={suffix} />
      </dt>
      <dd className="mt-1 text-small text-white/60">{label}</dd>
    </div>
  );
}
