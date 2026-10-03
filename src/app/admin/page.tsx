import { listBookings } from "@/lib/booking-store";
import { roads } from "@/content/roads";
import { StatusPill } from "@/components/ui/status-pill";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  const bookings = await listBookings();
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = bookings.filter((b) => b.travelDate >= today && (b.status === "paid" || b.status === "assigned"));

  return (
    <div className="site-container py-10">
      <h1 className="font-serif text-[28px] leading-[36px]">Overview</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat label="Bookings total" value={String(bookings.length)} />
        <Stat label="Upcoming" value={String(upcoming.length)} />
        <Stat label="Roads open" value={`${roads.filter((r) => r.status === "open").length} / ${roads.length}`} />
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-serif text-[20px] leading-[28px]">Roads</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {roads.map((r) => (
            <Link key={r.slug} href={"/admin/road-status" as never} className="rounded-lg border border-line bg-surface p-4 hover:border-primary-hover">
              <div className="flex items-center justify-between">
                <span>{r.name.en}</span>
                <StatusPill status={r.status} label={r.status} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-5">
      <p className="text-small text-ink-muted">{label}</p>
      <p className="mt-1 font-serif text-[28px] leading-[36px] tabular">{value}</p>
    </div>
  );
}
