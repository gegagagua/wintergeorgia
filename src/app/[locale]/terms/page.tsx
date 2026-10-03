import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/terms", title: "Terms of service", description: "Terms of service for georgiawinter.", ogKicker: "Legal" });
}

export default async function Terms({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <article className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Terms" }]} />
      <div className="max-w-2xl">
        <h1 className="font-serif text-[40px] leading-[48px]">Terms of service</h1>
        <div className="prose mt-6 max-w-none text-ink">
          <p>These are the terms under which georgiawinter (the platform) provides transfer booking, road status, and other information services in the Republic of Georgia.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Bookings</h2>
          <p>Prices shown at booking are final. Drivers are independent contractors, vetted by georgiawinter, who provide the transport service. The platform is the merchant of record for payments made on the platform.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Refunds and cancellations</h2>
          <p>See the <Link className="text-primary" href={"/cancellation" as never}>cancellation policy</Link>. Free cancellation ≥24h before departure. 50% penalty within 24h. Flight delays are never penalised. Road closures always result in a full refund or free reschedule.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Content</h2>
          <p>Road status, snow depth and event information are provided on a best-effort basis. Never plan a trip on a single data point — always confirm with the operator on the ground before departure.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Contact</h2>
          <p>Written notice may be sent to hello@georgiawinter.example.</p>
        </div>
      </div>
    </article>
  );
}
