import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ExternalLink, Video } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Link } from "@/i18n/navigation";
import { StatusBoard } from "@/components/status-board";
import { webcams } from "@/content/webcams";
import { resorts } from "@/content/resorts";
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
    en: {
      title: "Georgia ski webcams — live views from Gudauri, Bakuriani, Tetnuldi",
      desc: "Live and recent webcam views from every lift-served Georgian ski resort. Attribution to the source operator.",
    },
    ru: {
      title: "Веб-камеры Грузии — живые виды с Гудаури, Бакуриани, Тетнулди",
      desc: "Живые и недавние кадры с веб-камер каждого курорта Грузии. Атрибуция источнику-оператору.",
    },
    ka: {
      title: "საქართველოს ვებკამერები — Gudauri, Bakuriani, Tetnuldi",
      desc: "ცოცხალი და ბოლო კადრები საქართველოს ყველა საბაგირო კურორტის ვებკამერიდან. წყარო მფლობელი ოპერატორი.",
    },
  }[l];
  return pageMetadata({
    locale: l,
    path: "/webcams",
    title: t.title,
    description: t.desc,
    ogKicker: "Webcams",
  });
}

export default async function WebcamsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);

  const label = {
    en: {
      crumb: "Webcams",
      kicker: "Live view",
      title: "Georgia ski webcams",
      body: "Links out to the operator feed so you always see the real-time frame. Credit sits under every tile.",
      viewLink: "View live",
      offline: "Camera offline",
      bookCta: "Book a transfer",
      conditions: "Live conditions",
    },
    ru: {
      crumb: "Веб-камеры",
      kicker: "Прямой эфир",
      title: "Веб-камеры грузинских курортов",
      body: "Ссылки на поток оператора — вы видите кадр в реальном времени. Атрибуция под каждой камерой.",
      viewLink: "Смотреть",
      offline: "Камера оффлайн",
      bookCta: "Забронировать трансфер",
      conditions: "Живая обстановка",
    },
    ka: {
      crumb: "ვებკამერები",
      kicker: "პირდაპირ ეთერში",
      title: "საქართველოს კურორტების ვებკამერები",
      body: "ბმულები ოპერატორის სტრიმზე — ხედავთ რეალური დროის კადრს. ატრიბუცია თითოეული კამერის ქვეშ.",
      viewLink: "ნახვა",
      offline: "კამერა გათიშულია",
      bookCta: "ტრანსფერის დაჯავშნა",
      conditions: "ცოცხალი მდგომარეობა",
    },
  }[l];

  const grouped = resorts.map((r) => ({
    resort: r,
    cams: webcams.filter((w) => w.resort === r.slug),
  }));

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: label.crumb, path: "/webcams" },
            ]),
          ),
        }}
      />

      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label.crumb }]} />
      <SectionHeader kicker={label.kicker} title={label.title} />

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-ink-muted">{label.body}</p>

          {grouped.every((g) => g.cams.length === 0) ? (
            <div className="mt-6">
              <EmptyState
                title={label.offline}
                description="Webcam URLs are being confirmed with each resort operator."
              />
            </div>
          ) : (
            <div className="mt-8 space-y-10">
              {grouped
                .filter((g) => g.cams.length > 0)
                .map((g) => (
                  <section key={g.resort.slug}>
                    <h2 className="font-serif text-[24px] leading-[32px]">
                      <Link href={`/resorts/${g.resort.slug}` as never} className="hover:text-primary">
                        {g.resort.name[l]}
                      </Link>
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      {g.cams.map((cam) => (
                        <Card key={cam.slug}>
                          <div className="aspect-[16/9] overflow-hidden rounded-md border border-line bg-surface-raised">
                            {cam.canEmbed ? (
                              <iframe
                                src={cam.url}
                                title={cam.name}
                                className="h-full w-full"
                                loading="lazy"
                                sandbox="allow-scripts allow-same-origin"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-ink-muted">
                                <Video className="h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
                              </div>
                            )}
                          </div>
                          <div className="mt-3 flex items-start justify-between gap-3">
                            <div>
                              <h3 className="font-medium text-ink">{cam.name}</h3>
                              {cam.elevationM ? (
                                <p className="text-small text-ink-muted tabular">
                                  {cam.elevationM} m
                                </p>
                              ) : null}
                            </div>
                            <a
                              href={cam.url}
                              target="_blank"
                              rel="noopener"
                              className="inline-flex items-center gap-1 text-small text-primary hover:underline"
                            >
                              {label.viewLink}
                              <ExternalLink className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                            </a>
                          </div>
                          <p className="mt-2 text-small text-ink-muted">
                            {cam.attributionUrl ? (
                              <a
                                href={cam.attributionUrl}
                                target="_blank"
                                rel="noopener"
                                className="hover:underline"
                              >
                                © {cam.attribution}
                              </a>
                            ) : (
                              <>© {cam.attribution}</>
                            )}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </section>
                ))}
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div>
            <p className="text-small text-primary">{label.conditions}</p>
            <div className="mt-3">
              <StatusBoard locale={l} />
            </div>
          </div>
          <div className="rounded-lg border border-line bg-surface-raised p-5">
            <p className="font-serif text-[20px] leading-[28px]">{label.bookCta}</p>
            <p className="mt-2 text-small text-ink-muted">Fixed price. Refund if the road closes.</p>
            <div className="mt-4">
              <LinkButton href="/transfers" variant="cta" className="w-full justify-center">
                {label.bookCta} →
              </LinkButton>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
