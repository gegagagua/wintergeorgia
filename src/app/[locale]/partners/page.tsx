import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { PartnerApplicationForm } from "@/components/partner-application-form";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/partners", title: "Partner with georgiawinter", description: "Drivers, hotels, rental shops and ski schools: earn commission, get listed, sell to your guests.", ogKicker: "Partners" });
}

export default async function Partners({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Partners" }]} />
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div>
          <SectionHeader kicker="For operators" title="Partner with georgiawinter" />
          <div className="prose max-w-none text-ink">
            <p>georgiawinter runs the acquisition, marketing and payments; you run your operation.</p>
            <h2 className="mt-6 font-serif text-[24px] leading-[32px]">Drivers</h2>
            <p>15–25% commission, weekly settlement, public profile page with photo, vehicle and reviews. Winter tyres, chains and valid insurance required.</p>
            <h2 className="mt-6 font-serif text-[24px] leading-[32px]">Hotels and apartment hosts</h2>
            <p>QR code at reception. Every transfer, rental or ski lesson booked through your code pays commission back monthly.</p>
            <h2 className="mt-6 font-serif text-[24px] leading-[32px]">Rental shops, ski schools, venues</h2>
            <p>Listed on your resort page and things-to-do catalog. Verified partner badge after moderation. Featured placement from season two.</p>
          </div>
        </div>
        <div className="rounded-lg border border-line bg-surface-raised p-6">
          <h2 className="font-serif text-[20px] leading-[28px]">Apply</h2>
          <p className="mt-2 text-small text-ink-muted">We reply within two working days.</p>
          <div className="mt-4"><PartnerApplicationForm /></div>
        </div>
      </div>
    </div>
  );
}
