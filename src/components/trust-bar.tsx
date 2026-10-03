import { BadgeCheck, MessageCircle, Snowflake, ShieldCheck, Timer, Coins } from "lucide-react";

const items = [
  { Icon: Snowflake, label: "Winter tyres + chains" },
  { Icon: BadgeCheck, label: "Documents vetted, insurance on file" },
  { Icon: ShieldCheck, label: "Refund if the road closes" },
  { Icon: MessageCircle, label: "WhatsApp driver at T-12h" },
  { Icon: Timer, label: "Flight delays never penalised" },
  { Icon: Coins, label: "Fixed price · no dynamic pricing" },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-surface">
      <div className="site-container grid gap-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {items.map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-small text-ink">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-primary">
              <Icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
