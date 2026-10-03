import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({ locale: locale as Locale, path: "/privacy", title: "Privacy policy", description: "How georgiawinter handles personal data.", ogKicker: "Legal" });
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <article className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Privacy" }]} />
      <div className="max-w-2xl">
        <h1 className="font-serif text-[40px] leading-[48px]">Privacy policy</h1>
        <div className="prose mt-6 max-w-none text-ink">
          <p>georgiawinter complies with the Georgian personal data protection law. This page summarises how we handle your data.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">What we store</h2>
          <p>For a booking: your name, phone number, email, pickup address and (if the route is an airport transfer) flight number. Payment details are never seen or stored by georgiawinter — only the provider reference is kept.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Who sees your phone number</h2>
          <p>Only your assigned driver, and only from 24 hours before your trip. Support staff can see it when investigating an issue.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Analytics</h2>
          <p>We use privacy-preserving analytics (Plausible) — no cookies, no cross-site tracking, no personal identifiers.</p>
          <h2 className="mt-8 font-serif text-[24px] leading-[32px]">Rights</h2>
          <p>Request a copy of your data, deletion or correction by writing to privacy@georgiawinter.example.</p>
        </div>
      </div>
    </article>
  );
}
