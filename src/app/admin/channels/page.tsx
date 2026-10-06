import { listBookings } from "@/lib/booking-store";

export const dynamic = "force-dynamic";

type Row = {
  key: string;
  count: number;
  gelGross: number;
};

export default async function AdminChannels() {
  const bookings = await listBookings();

  const byChannel: Record<string, Row> = {};
  const byReferral: Record<string, Row> = {};

  for (const b of bookings) {
    const source = b.attribution?.utmSource ?? "direct";
    const medium = b.attribution?.utmMedium ?? "none";
    const key = `${source} / ${medium}`;
    byChannel[key] ??= { key, count: 0, gelGross: 0 };
    byChannel[key].count += 1;
    byChannel[key].gelGross += b.amountGel;

    const ref = b.attribution?.referralCode;
    if (ref) {
      byReferral[ref] ??= { key: ref, count: 0, gelGross: 0 };
      byReferral[ref].count += 1;
      byReferral[ref].gelGross += b.amountGel;
    }
  }

  const channels = Object.values(byChannel).sort((a, b) => b.gelGross - a.gelGross);
  const refs = Object.values(byReferral).sort((a, b) => b.gelGross - a.gelGross);

  return (
    <div className="site-container py-10">
      <h1 className="font-serif text-[28px] leading-[36px]">Channels</h1>
      <p className="mt-2 text-small text-ink-muted">
        Bookings grouped by their attribution. Capture happens at booking submit.
      </p>

      <section className="mt-6">
        <h2 className="mb-3 font-serif text-[20px] leading-[28px]">By source / medium</h2>
        <Table rows={channels} emptyMessage="No bookings yet." />
      </section>

      <section className="mt-10">
        <h2 className="mb-3 font-serif text-[20px] leading-[28px]">By referral code</h2>
        <Table rows={refs} emptyMessage="No referrals yet." />
      </section>
    </div>
  );
}

function Table({ rows, emptyMessage }: { rows: Row[]; emptyMessage: string }) {
  if (rows.length === 0)
    return (
      <div className="rounded-lg border border-dashed border-line px-6 py-10 text-center text-small text-ink-muted">
        {emptyMessage}
      </div>
    );
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-surface">
      <table className="w-full text-small">
        <thead>
          <tr className="border-b border-line text-left text-ink-muted">
            <th className="p-3 font-medium">Key</th>
            <th className="p-3 text-right font-medium">Bookings</th>
            <th className="p-3 text-right font-medium">Gross GEL</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-line">
              <td className="p-3">{r.key}</td>
              <td className="p-3 text-right tabular">{r.count}</td>
              <td className="p-3 text-right tabular">{r.gelGross.toLocaleString("en-US")} ₾</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
