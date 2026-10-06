import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/button";
import { partners, findPartner } from "@/content/partners";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbLd } from "@/lib/jsonld";
import { siteUrl } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return partners.filter((p) => p.active).map((p) => ({ code: p.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}): Promise<Metadata> {
  const { locale, code } = await params;
  const l = locale as Locale;
  return pageMetadata({
    locale: l,
    path: `/partners/${code}`,
    title: `Partner dashboard · ${code}`,
    description: "Referral code performance and payout.",
    index: false,
    ogKicker: "Partner",
  });
}

export default async function PartnerDashboard({
  params,
}: {
  params: Promise<{ locale: string; code: string }>;
}) {
  const { locale, code } = await params;
  const l = locale as Locale;
  setRequestLocale(l);

  const partner = findPartner(code);
  if (!partner) notFound();

  const refUrl = `${siteUrl()}/?ref=${partner.code}`;
  const qrUrl = `/api/partners/${partner.code}/qr.pdf`;

  return (
    <div className="site-container py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd(l, [
              { name: "Home", path: "/" },
              { name: "Partners", path: "/partners" },
              { name: partner.name, path: `/partners/${partner.code}` },
            ]),
          ),
        }}
      />
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: "Partners", path: "/partners" },
          { name: partner.name },
        ]}
      />
      <SectionHeader kicker="Partner" title={partner.name} />

      <div className="grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <Card>
          <p className="text-small text-primary">Referral code</p>
          <p className="mt-2 font-serif text-[32px] leading-[36px] tabular">{partner.code}</p>
          <p className="mt-3 text-small text-ink-muted">
            Share this URL — any booking made within 30 days credits you{" "}
            {Number(partner.commissionPct)}%:
          </p>
          <code className="mt-2 block overflow-x-auto rounded-md border border-line bg-surface-raised p-3 text-small">
            {refUrl}
          </code>
          <div className="mt-5 flex flex-wrap gap-3">
            <LinkButton href={qrUrl as never} variant="cta" size="sm">
              Download QR card (A5)
            </LinkButton>
          </div>
        </Card>

        <Card>
          <p className="text-small text-primary">Performance</p>
          <dl className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Clicks (30d)" value={0} />
            <Stat label="Bookings" value={0} />
            <Stat label="GEL earned" value={0} />
            <Stat label="Payout due" value={0} />
          </dl>
          <p className="mt-3 text-small text-ink-muted">
            Live numbers appear once the <code>bookings</code> table is wired to this
            dashboard. The cookie and attribution plumbing is already in place.
          </p>
        </Card>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <dt className="text-small text-ink-muted">{label}</dt>
      <dd className="mt-1 font-serif text-[22px] leading-[28px] tabular">{value.toLocaleString("en-US")}</dd>
    </div>
  );
}
