import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/section-header";
import { stepImages } from "@/lib/images";

/**
 * Three-step flow with real photography and a subtle image zoom on hover.
 */
export async function HowItWorks() {
  const t = await getTranslations("howItWorks");

  const steps = [
    {
      n: "01",
      title: t("step1Title"),
      body: t("step1Body"),
      img: stepImages.route,
    },
    {
      n: "02",
      title: t("step2Title"),
      body: t("step2Body"),
      img: stepImages.vehicle,
    },
    {
      n: "03",
      title: t("step3Title"),
      body: t("step3Body"),
      img: stepImages.driver,
    },
  ];

  return (
    <section className="site-container py-12">
      <SectionHeader kicker={t("kicker")} title={t("title")} />

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <article
            key={s.n}
            className="group gw-lift relative flex flex-col overflow-hidden rounded-lg border border-line bg-surface"
          >
            <div className="relative h-56 overflow-hidden">
              <Image
                src={s.img.src}
                alt={s.img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="gw-zoom object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25" />
              <span className="absolute left-4 top-4 rounded-pill border border-white/25 bg-black/45 px-2.5 py-0.5 text-small tabular text-snow backdrop-blur">
                {s.n}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-[22px] leading-[28px]">{s.title}</h3>
              <p className="mt-2 text-small text-ink-muted">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
