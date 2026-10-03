import { setRequestLocale } from "next-intl/server";
import { StatusBoard } from "@/components/status-board";
import { StatusPill } from "@/components/ui/status-pill";
import { Card } from "@/components/ui/card";
import { Button, LinkButton } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { SectionHeader } from "@/components/ui/section-header";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { AlertBanner } from "@/components/ui/alert-banner";
import { EmptyState } from "@/components/ui/empty-state";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { Field, Input, Select, RadioGroup, Checkbox, Textarea } from "@/components/ui/form";
import type { Locale } from "@/i18n/routing";

export const metadata = { robots: { index: false, follow: false } };

export default async function Components({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <div className="site-container py-10 md:py-14">
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Dev" }, { name: "Components" }]} />
      <h1 className="mb-8 font-serif text-[40px] leading-[48px]">Design system</h1>

      <Group title="Status board" note="The signature. Values fade+rise 8px staggered 130ms on load. Reduced-motion friendly.">
        <StatusBoard locale={locale as Locale} />
      </Group>

      <Group title="Status pill">
        <div className="flex flex-wrap gap-3">
          <StatusPill status="open" label="Open" />
          <StatusPill status="limited" label="Chains required" />
          <StatusPill status="closed" label="Closed" />
        </div>
      </Group>

      <Group title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="cta" size="lg">Book the transfer</Button>
          <Button variant="primary">Primary action</Button>
          <Button variant="outline">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <LinkButton href="/transfers" variant="cta" size="sm">Compact CTA</LinkButton>
        </div>
      </Group>

      <Group title="Price">
        <div className="flex flex-wrap items-baseline gap-6">
          <Price gel={180} size="lg" />
          <Price gel={45} size="md" from />
          <Price gel={3500} size="sm" />
        </div>
      </Group>

      <Group title="Card">
        <div className="grid gap-4 md:grid-cols-3">
          <Card interactive>
            <p className="text-small text-primary">Route</p>
            <h3 className="mt-1 font-serif text-[20px] leading-[28px]">Tbilisi → Gudauri</h3>
            <p className="mt-2 text-small text-ink-muted">2h 15m · Sedan or minivan</p>
            <div className="mt-4"><Price gel={160} /></div>
          </Card>
          <Card interactive>
            <p className="text-small text-primary">Resort</p>
            <h3 className="mt-1 font-serif text-[20px] leading-[28px]">Bakuriani</h3>
            <p className="mt-2 text-small text-ink-muted">Beginner-friendly, four zones, real village.</p>
          </Card>
          <Card interactive>
            <p className="text-small text-primary">Event</p>
            <h3 className="mt-1 font-serif text-[20px] leading-[28px]">New Year in Gudauri</h3>
            <p className="mt-2 text-small text-ink-muted">Fireworks at midnight, torchlit descent 23:30.</p>
          </Card>
        </div>
      </Group>

      <Group title="Section header">
        <SectionHeader kicker="Live from Gudauri" title="Snow and lifts today" action={<LinkButton href="/snow-report" variant="ghost" size="sm">See all resorts →</LinkButton>} />
      </Group>

      <Group title="Table">
        <Table>
          <THead>
            <TR><TH>Route</TH><TH>Distance</TH><TH align="right">Sedan</TH><TH align="right">Minivan</TH></TR>
          </THead>
          <tbody>
            <TR><TD>Tbilisi Airport → Gudauri</TD><TD>140 km</TD><TD align="right">180 ₾</TD><TD align="right">260 ₾</TD></TR>
            <TR><TD>Tbilisi → Bakuriani</TD><TD>180 km</TD><TD align="right">220 ₾</TD><TD align="right">320 ₾</TD></TR>
            <TR><TD>Zugdidi → Mestia</TD><TD>140 km</TD><TD align="right">—</TD><TD align="right">250 ₾</TD></TR>
          </tbody>
        </Table>
      </Group>

      <Group title="Alert banner">
        <div className="grid gap-3">
          <AlertBanner tone="info" title="Update">Fresh snow overnight — 8 cm at Gudauri top station.</AlertBanner>
          <AlertBanner tone="warning" title="Chains required">Jvari Pass is open with chain restriction above Kobi.</AlertBanner>
          <AlertBanner tone="danger" title="Pass closed">Goderdzi Pass is closed until the morning inspection. Bookings will be rescheduled automatically.</AlertBanner>
        </div>
      </Group>

      <Group title="Form controls">
        <div className="grid max-w-lg gap-4">
          <Field label="Email"><Input type="email" placeholder="you@example.com" /></Field>
          <Field label="Vehicle class"><Select defaultValue="sedan"><option value="shared">Shared seat</option><option value="sedan">Sedan</option><option value="minivan">Minivan</option><option value="suv4x4">4x4 SUV</option></Select></Field>
          <Field label="Pickup notes" hint="Landmarks, gate codes, driver instructions."><Textarea placeholder="Hotel entrance next to the bakery…" /></Field>
          <Field label="Extras">
            <div className="grid gap-2">
              <Checkbox label="Child seat" hint="+15 GEL per seat" />
              <Checkbox label="Ski / snowboard rack" hint="+20 GEL flat" />
            </div>
          </Field>
          <Field label="Trip type">
            <RadioGroup name="trip" options={[
              { value: "one", label: "One way" },
              { value: "return", label: "Return", hint: "Save 10% on the return leg" },
            ]} value="one" />
          </Field>
        </div>
      </Group>

      <Group title="Empty state">
        <EmptyState title="No events this week" description="The next season-opening events are already scheduled — check back or subscribe." action={<LinkButton href="/events" variant="outline">See calendar</LinkButton>} />
      </Group>
    </div>
  );
}

function Group({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="mb-10 border-t border-line pt-6 first:mt-0 first:border-none first:pt-0">
      <h2 className="mb-2 font-serif text-[20px] leading-[28px]">{title}</h2>
      {note ? <p className="mb-4 text-small text-ink-muted">{note}</p> : null}
      {children}
    </section>
  );
}
