import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { resorts } from "@/content/resorts";
import { places } from "@/content/places";
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
    en: { title: "Things to do at every Georgian resort", desc: "Paragliding, quad bikes, tubing, spa, bars, rental shops and ski schools. Vetted partners for every ski area." },
    ru: { title: "Чем заняться на курортах Грузии", desc: "Парапланы, квадроциклы, тюбинг, спа, бары, прокаты и школы. Проверенные партнёры для каждой зоны." },
    ka: { title: "რის კეთება ღირს საქართველოს კურორტებზე", desc: "პარაპლანი, კვადრო, ტუბინგი, სპა, ბარები, ქირავნობა და სასწავლო სკოლები. შემოწმებული პარტნიორები ყველა ზონისთვის." },
  }[l];
  return pageMetadata({ locale: l, path: "/things-to-do", title: t.title, description: t.desc, ogKicker: "Things to do" });
}

export default async function ThingsIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: "Things to do", path: "/things-to-do" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Things to do" }]} />
      <SectionHeader kicker="By resort" title="Pick your mountain" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resorts.map((r) => {
          const count = places.filter((p) => p.resort === r.slug).length;
          return (
            <Link key={r.slug} href={`/things-to-do/${r.slug}` as never} className="group">
              <Card interactive className="h-full">
                <p className="text-small text-primary">{r.region}</p>
                <h2 className="mt-1 font-serif text-[20px] leading-[28px] group-hover:text-primary">{r.name[l]}</h2>
                <p className="mt-2 text-small text-ink-muted">{count} {count === 1 ? "listing" : "listings"}</p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
