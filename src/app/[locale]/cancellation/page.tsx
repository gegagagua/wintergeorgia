import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AlertBanner } from "@/components/ui/alert-banner";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/cancellation", title: "Cancellation policy", description: "Free cancellation ≥24h, 50% within 24h, always full refund if the road closes.", ogKicker: "Legal" });
}

export default async function Cancellation({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <article className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Cancellation" }]} />
      <div className="max-w-2xl">
        <h1 className="font-serif text-[40px] leading-[48px]">Cancellation policy</h1>
        <div className="mt-6"><AlertBanner tone="info" title="Short version">Free ≥24h before departure · 50% within 24h · always full refund if the road closes · flight delays never penalised.</AlertBanner></div>

        <div className="prose mt-8 max-w-none text-ink">
          <h2 className="font-serif text-[24px] leading-[32px]">Free cancellation window</h2>
          <p>Cancel any booking 24 hours or more before the scheduled departure and receive a full refund to the original payment method within 5 business days.</p>
          <h2 className="mt-6 font-serif text-[24px] leading-[32px]">Late cancellation</h2>
          <p>Cancellations made less than 24 hours before departure incur a 50% penalty — the driver has already blocked the slot.</p>
          <h2 className="mt-6 font-serif text-[24px] leading-[32px]">Road closures</h2>
          <p>If the road on your route closes, we automatically offer two options: reschedule at no cost, or a full refund. You do not need to contact us.</p>
          <h2 className="mt-6 font-serif text-[24px] leading-[32px]">Flight delays and cancellations</h2>
          <p>If your inbound flight is delayed or cancelled, we track the flight and reschedule the pickup at no cost. You are never charged a penalty for a flight issue.</p>
        </div>
      </div>
    </article>
  );
}
