import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { EventSubmissionForm } from "@/components/event-submission-form";
import { pageMetadata } from "@/lib/metadata";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  return pageMetadata({
    locale: l,
    path: "/events/submit",
    title: "Submit an event",
    description: "Organisers, submit your event for the georgiawinter calendar. Moderation within 24 hours.",
    ogKicker: "Organisers",
    index: false,
  });
}

export default async function SubmitEvent({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  return (
    <div className="site-container py-10 md:py-14">
      <Breadcrumb items={[
        { name: "Home", path: "/" },
        { name: "Events", path: "/events" },
        { name: "Submit" },
      ]} />
      <div className="max-w-2xl">
        <SectionHeader kicker="Organisers" title="Submit an event" />
        <p className="mb-6 text-ink-muted">
          Free listing. We moderate within 24 hours and email the organiser once the event is live. Featured placement, ticket commission and home-page banners are available from season two.
        </p>
        <EventSubmissionForm />
      </div>
    </div>
  );
}
