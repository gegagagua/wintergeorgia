import { roads } from "@/content/roads";
import { RoadStatusEditor } from "@/components/road-status-editor";

export const dynamic = "force-dynamic";

export default function RoadStatusAdmin() {
  return (
    <div className="site-container py-10">
      <h1 className="font-serif text-[28px] leading-[36px]">Road status</h1>
      <p className="mt-2 text-small text-ink-muted">Flipping a road to closed automatically reschedules or refunds affected bookings.</p>
      <div className="mt-6 grid gap-3">
        {roads.map((r) => (
          <RoadStatusEditor
            key={r.slug}
            slug={r.slug}
            name={r.name.en}
            status={r.status}
            restriction={r.restriction}
            updatedAt={r.updatedAt}
          />
        ))}
      </div>
    </div>
  );
}
