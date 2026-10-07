import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { articles } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import type { AnswerTopic } from "@/content/types";
import type { Locale } from "@/i18n/routing";

const TOPIC_LABELS: Record<AnswerTopic, Record<Locale, string>> = {
  "getting-there": {
    en: "Getting there",
    ru: "Как добраться",
    ka: "როგორ ჩავიდეთ",
  },
  conditions: {
    en: "Conditions and road",
    ru: "Условия и дорога",
    ka: "პირობები და გზა",
  },
  prices: {
    en: "Prices",
    ru: "Цены",
    ka: "ფასები",
  },
  gear: {
    en: "Gear and preparation",
    ru: "Снаряжение и подготовка",
    ka: "აღჭურვილობა და მომზადება",
  },
};

const ORDER: AnswerTopic[] = ["getting-there", "conditions", "prices", "gear"];

const PAGE_TITLE: Record<Locale, { title: string; desc: string; label: string }> = {
  en: {
    title: "Answers to the questions people ask about skiing in Georgia",
    desc: "Short, honest answers to the top questions about getting to Georgia's ski resorts, winter conditions, prices and what to pack.",
    label: "Answers",
  },
  ru: {
    title: "Ответы на вопросы про горные лыжи в Грузии",
    desc: "Короткие честные ответы на главные вопросы о дороге, зимних условиях, ценах и подготовке к поездке на грузинские курорты.",
    label: "Ответы",
  },
  ka: {
    title: "პასუხები ყველაზე ხშირ კითხვებზე საქართველოში სრიალზე",
    desc: "მოკლე პატიოსანი პასუხები მთავარ კითხვებზე: როგორ ჩავიდეთ კურორტებამდე, ზამთრის პირობები, ფასები და აღჭურვილობა.",
    label: "პასუხები",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const t = PAGE_TITLE[l];
  return pageMetadata({ locale: l, path: "/answers", title: t.title, description: t.desc, ogKicker: t.label });
}

export default async function AnswersIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const l = locale as Locale;
  setRequestLocale(l);
  const t = PAGE_TITLE[l];

  const answers = articles.filter((a) => a.template === "qa");

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd(l, [{ name: "Home", path: "/" }, { name: t.label, path: "/answers" }])),
        }}
      />
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: t.label }]} />
      <SectionHeader kicker={t.label} title={t.title} />

      <div className="space-y-10">
        {ORDER.map((topic) => {
          const inTopic = answers.filter((a) => a.topic === topic);
          if (inTopic.length === 0) return null;
          return (
            <section key={topic}>
              <h2 className="mb-4 font-serif text-[22px] leading-[28px] text-primary">
                {TOPIC_LABELS[topic][l]}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {inTopic.map((a) => (
                  <Link key={a.slug} href={`/answers/${a.slug}` as never} className="group">
                    <Card interactive className="h-full">
                      <h3 className="font-serif text-[20px] leading-[28px] group-hover:text-primary">{a.title[l]}</h3>
                      <p className="mt-2 line-clamp-3 text-small text-ink-muted">
                        {a.oneSentenceAnswer?.[l] ?? a.excerpt[l]}
                      </p>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
