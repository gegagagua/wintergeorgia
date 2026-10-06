import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { LinkButton } from "@/components/ui/button";
import { drivers } from "@/content/drivers";
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
      title: "The drivers you will meet",
      desc: "Named driver profiles — vehicle, plate, winter equipment and languages. No anonymous dispatch.",
    },
    ru: {
      title: "Водители, которых вы встретите",
      desc: "Личные профили водителей — машина, номер, зимнее оснащение, языки. Без анонимного диспетчера.",
    },
    ka: {
      title: "მძღოლები, რომლებსაც შეხვდებით",
      desc: "მძღოლის პერსონალური პროფილები — ავტომობილი, ნომერი, ზამთრის აღჭურვილობა, ენები. ანონიმური დისპეჩერი — არა.",
    },
  }[l];
  return pageMetadata({
    locale: l,
    path: "/drivers",
    title: t.title,
    description: t.desc,
    ogKicker: "Drivers",
  });
}

export default async function DriversPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const list = drivers.filter((d) => d.published);

  const label = {
    en: {
      crumb: "Drivers",
      kicker: "Transparent",
      title: "Drivers you will meet",
      empty: "Driver profiles are being added for the 2026/27 season.",
      emptyBody: "Each profile ships only when the driver has consented to a public photo, plate and vehicle details.",
      emptyAction: "Browse routes meanwhile",
      years: "years driving",
    },
    ru: {
      crumb: "Водители",
      kicker: "Прозрачно",
      title: "Водители, которых вы встретите",
      empty: "Профили водителей добавляются к сезону 2026/27.",
      emptyBody: "Каждый профиль публикуется только после согласия водителя на фото, номер и данные автомобиля.",
      emptyAction: "Пока посмотреть маршруты",
      years: "лет за рулём",
    },
    ka: {
      crumb: "მძღოლები",
      kicker: "გამჭვირვალედ",
      title: "მძღოლები, რომლებსაც შეხვდებით",
      empty: "მძღოლების პროფილები ემატება 2026/27 სეზონისთვის.",
      emptyBody: "ყველა პროფილი ქვეყნდება მხოლოდ მძღოლის თანხმობის შემდეგ ფოტოზე, ნომერზე და ავტომობილის დეტალებზე.",
      emptyAction: "ჯერჯერობით ვნახოთ მარშრუტები",
      years: "წელი მართვის",
    },
  }[l];

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: label.crumb, path: "/drivers" },
            ]),
          ),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: label.crumb }]} />
      <SectionHeader kicker={label.kicker} title={label.title} />

      {list.length === 0 ? (
        <EmptyState
          title={label.empty}
          description={label.emptyBody}
          action={
            <LinkButton href="/transfers" variant="outline" size="sm">
              {label.emptyAction} →
            </LinkButton>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <Link key={d.slug} href={`/drivers/${d.slug}` as never} className="group">
              <Card interactive className="h-full">
                {d.photo ? (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={d.photo}
                      alt={d.firstName}
                      fill
                      sizes="(min-width:1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-md bg-surface-raised" />
                )}
                <h3 className="mt-4 font-serif text-[20px] leading-[28px] group-hover:text-primary">
                  {d.firstName}
                </h3>
                <p className="mt-1 text-small text-ink-muted tabular">
                  {d.vehicle.make} {d.vehicle.model} · {d.vehicle.plate}
                </p>
                <p className="mt-2 text-small text-ink-muted">{d.languages.join(" · ")}</p>
                {d.yearsDriving ? (
                  <p className="mt-1 text-small text-ink-muted tabular">
                    {d.yearsDriving} {label.years}
                  </p>
                ) : null}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
