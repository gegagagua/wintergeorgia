import { listBookings } from "@/lib/booking-store";
import { Table, THead, TR, TH, TD } from "@/components/ui/table";
import { StatusPill } from "@/components/ui/status-pill";
import type { Status } from "@/content/types";
import { EmptyState } from "@/components/ui/empty-state";

export const dynamic = "force-dynamic";

const statusMap: Record<string, Status> = {
  pending: "limited",
  paid: "open",
  assigned: "open",
  completed: "open",
  cancelled: "closed",
  refunded: "limited",
};

export default async function BookingsAdmin() {
  const bookings = await listBookings();
  return (
    <div className="site-container py-10">
      <h1 className="font-serif text-[28px] leading-[36px]">Bookings</h1>
      {bookings.length === 0 ? (
        <div className="mt-6"><EmptyState title="No bookings yet" description="Bookings placed through the site show up here in real time." /></div>
      ) : (
        <div className="mt-6">
          <Table>
            <THead>
              <TR>
                <TH>Ref</TH>
                <TH>Route</TH>
                <TH>Travel</TH>
                <TH>Passenger</TH>
                <TH align="right">Amount</TH>
                <TH>Status</TH>
              </TR>
            </THead>
            <tbody>
              {bookings.map((b) => (
                <TR key={b.ref}>
                  <TD className="font-mono text-small">{b.ref}</TD>
                  <TD>{b.routeSlug}</TD>
                  <TD className="tabular">{b.travelDate} {b.travelTime}</TD>
                  <TD>
                    {b.customerName}
                    <div className="text-small text-ink-muted">{b.email} · {b.phone}</div>
                  </TD>
                  <TD align="right">{b.amountGel} ₾</TD>
                  <TD><StatusPill status={statusMap[b.status] ?? "limited"} label={b.status} /></TD>
                </TR>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
