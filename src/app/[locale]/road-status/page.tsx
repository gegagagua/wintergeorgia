import type { Metadata } from "next";
import { setRequestLocale, getFormatter, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusPill } from "@/components/ui/status-pill";
import { AlertBanner } from "@/components/ui/alert-banner";
import { LinkButton } from "@/components/ui/button";
import { roads } from "@/content/roads";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export const revalidate = 900; // 15 minutes

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = {
    en: { title: "Road status — Jvari, Goderdzi, Mestia, Bakuriani", desc: "Live status for Georgia's mountain roads: Jvari Pass, Goderdzi Pass, Zugdidi → Mestia and Borjomi → Bakuriani. Updated by operators and confirmed by drivers on the pass." },
    ru: { title: "Статус дорог — Крестовый, Годердзи, Местия, Бакуриани", desc: "Живой статус горных дорог Грузии: Крестовый перевал, Годердзи, Зугдиди → Местия и Боржоми → Бакуриани. Обновляют операторы, подтверждают водители на перевале." },
    ka: { title: "გზების სტატუსი — ჯვარი, გოდერძი, მესტია, ბაკურიანი", desc: "საქართველოს მთის გზების პირდაპირი სტატუსი: ჯვრის უღელტეხილი, გოდერძი, ზუგდიდი → მესტია და ბორჯომი → ბაკურიანი. ოპერატორები აახლებენ, უღელტეხილზე მძღოლები ადასტურებენ." },
  }[l];
  return pageMetadata({ locale: l, path: "/road-status", title: t.title, description: t.desc, ogKicker: "Roads" });
}

export default async function RoadStatusPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const ts = await getTranslations("status");
  const fmt = await getFormatter();

  const closed = roads.filter((r) => r.status === "closed");
  const limited = roads.filter((r) => r.status === "limited");

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: "Road status", path: "/road-status" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Road status" }]} />
      <SectionHeader kicker="Live" title="Georgia mountain roads today" action={<span className="text-small text-ink-muted">Auto-refresh · 15 min</span>} />

      {closed.length > 0 ? (
        <AlertBanner tone="danger" title={`${closed.length} road${closed.length > 1 ? "s" : ""} closed`}>
          Bookings on closed roads are automatically rescheduled or refunded in full. No action needed.
        </AlertBanner>
      ) : null}
      {limited.length > 0 ? (
        <div className="mt-3">
          <AlertBanner tone="warning" title={`${limited.length} restriction${limited.length > 1 ? "s" : ""} in effect`}>Check the details for the route you need.</AlertBanner>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4">
        {roads.map((r) => (
          <article key={r.slug} className="rounded-lg border border-line bg-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-small text-ink-muted">Road</p>
                <h2 className="mt-1 font-serif text-[24px] leading-[32px]">{r.name[l]}</h2>
                <p className="mt-2 text-small text-ink-muted">
                  Updated {fmt.dateTime(new Date(r.updatedAt), { hour: "2-digit", minute: "2-digit" })} · source: driver
                </p>
              </div>
              <StatusPill status={r.status} label={ts(r.status)} />
            </div>
            {r.note ? <p className="mt-4 text-ink">{r.note[l]}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              {r.serves.map((s) => (
                <Link key={s} href={`/resorts/${s}` as never} className="rounded-pill border border-line bg-surface-raised px-3 py-1 text-small text-ink hover:border-primary-hover">
                  Serves {s}
                </Link>
              ))}
              <span className="ml-auto">
                <LinkButton href="/transfers" variant="cta" size="sm">Book a transfer</LinkButton>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
