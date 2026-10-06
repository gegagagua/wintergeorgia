import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { drivers, findDriver } from "@/content/drivers";
import { findRoute } from "@/content/routes";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return drivers.filter((d) => d.published).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const l = locale as Locale;
  const d = findDriver(slug);
  if (!d) return {};
  return pageMetadata({
    locale: l,
    path: `/drivers/${slug}`,
    title: `${d.firstName} — georgiawinter driver`,
    description: `${d.firstName} drives ${d.vehicle.make} ${d.vehicle.model} on ${d.routes.length} routes.`,
    ogKicker: "Driver",
    ogTitle: d.firstName,
  });
}

export default async function DriverPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const d = findDriver(slug);
  if (!d) notFound();

  const label = {
    en: {
      crumb: "Drivers",
      vehicle: "Vehicle",
      plate: "Plate",
      languages: "Languages",
      experience: "Experience",
      years: "years",
      kit: "Winter kit",
      trips: "Completed trips",
      routes: "Routes served",
      kitLabels: {
        winter_tyres: "Winter tyres",
        chains: "Chains",
        "4x4": "4x4 drivetrain",
        ski_rack: "Ski rack",
        child_seat: "Child seat",
      },
    },
    ru: {
      crumb: "Водители",
      vehicle: "Автомобиль",
      plate: "Номер",
      languages: "Языки",
      experience: "Опыт",
      years: "лет",
      kit: "Зимний комплект",
      trips: "Выполненных поездок",
      routes: "Маршруты",
      kitLabels: {
        winter_tyres: "Зимняя резина",
        chains: "Цепи",
        "4x4": "Полный привод",
        ski_rack: "Багажник для лыж",
        child_seat: "Детское кресло",
      },
    },
    ka: {
      crumb: "მძღოლები",
      vehicle: "ავტომობილი",
      plate: "ნომერი",
      languages: "ენები",
      experience: "გამოცდილება",
      years: "წელი",
      kit: "ზამთრის კომპლექტი",
      trips: "დასრულებული მოგზაურობა",
      routes: "მარშრუტები",
      kitLabels: {
        winter_tyres: "ზამთრის საბურავები",
        chains: "ჯაჭვები",
        "4x4": "4x4 ტრანსმისია",
        ski_rack: "ხილამურის სადგამი",
        child_seat: "ბავშვის სავარძელი",
      },
    },
  }[l];

  const trips = d.completedTripsOverride ?? 0;
  const servedRoutes = d.routes.map(findRoute).filter(Boolean);

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: label.crumb, path: "/drivers" },
              { name: d.firstName, path: `/drivers/${d.slug}` },
            ]),
          ),
        }}
      />
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: label.crumb, path: "/drivers" },
          { name: d.firstName },
        ]}
      />

      <div className="mt-6 grid gap-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          {d.photo ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line">
              <Image
                src={d.photo}
                alt={d.firstName}
                fill
                sizes="(min-width:768px) 40vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="aspect-[4/5] rounded-lg border border-line bg-surface-raised" />
          )}
        </div>

        <div>
          <h1 className="font-serif text-[40px] leading-[48px] md:text-[52px] md:leading-[60px]">
            {d.firstName}
          </h1>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <Fact label={label.vehicle} value={`${d.vehicle.make} ${d.vehicle.model}${d.vehicle.year ? ` · ${d.vehicle.year}` : ""}`} />
            <Fact label={label.plate} value={<span className="tabular">{d.vehicle.plate}</span>} />
            <Fact label={label.languages} value={d.languages.join(", ")} />
            {d.yearsDriving ? (
              <Fact
                label={label.experience}
                value={<span className="tabular">{d.yearsDriving} {label.years}</span>}
              />
            ) : null}
            {trips > 0 ? (
              <Fact
                label={label.trips}
                value={<span className="tabular">{trips.toLocaleString("en-US")}</span>}
              />
            ) : null}
          </dl>

          {d.winterKit.length > 0 ? (
            <div className="mt-6">
              <p className="text-small text-primary">{label.kit}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {d.winterKit.map((k) => (
                  <li
                    key={k}
                    className="rounded-pill border border-line bg-surface px-3 py-1 text-small"
                  >
                    {label.kitLabels[k] ?? k}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {servedRoutes.length > 0 ? (
            <section className="mt-8">
              <p className="text-small text-primary">{label.routes}</p>
              <ul className="mt-3 grid gap-2">
                {servedRoutes.map((r) =>
                  r ? (
                    <li key={r.slug}>
                      <Link
                        href={`/transfers/${r.slug}` as never}
                        className="flex items-center justify-between rounded-md border border-line bg-surface p-3 hover:border-primary-hover"
                      >
                        <span>
                          {r.from[l]} → {r.to[l]}
                        </span>
                        <span className="tabular text-small text-ink-muted">
                          {r.distanceKm} km
                        </span>
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
          ) : null}

          <div className="mt-8">
            <LinkButton href="/transfers" variant="cta">
              Book a transfer →
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Card>
      <dt className="text-small text-ink-muted">{label}</dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </Card>
  );
}
