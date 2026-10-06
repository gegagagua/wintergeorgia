export const dynamic = "force-dynamic";

/**
 * Subscriptions admin stub. In production this reads the `subscriptions`
 * table and exposes export/confirm/unsubscribe. For now it documents the
 * shape and lists the capture surfaces that write to the inbox.
 */
export default function AdminSubscriptions() {
  return (
    <div className="site-container py-10">
      <h1 className="font-serif text-[28px] leading-[36px]">Subscriptions</h1>
      <p className="mt-2 text-small text-ink-muted">
        Double opt-in. All signups write to the <code>subscriptions</code> table
        and emit a confirmation email before <code>confirmedAt</code> is set.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <Card title="Weekly bulletin" topic="bulletin" surface="Home footer, journal articles" />
        <Card title="Season opening alerts" topic="season-opening" surface="Preseason conditions board" />
        <Card title="Seat-available alerts" topic="seat-available" surface="Scheduled shuttle route pages" />
        <Card title="Price-drop alerts" topic="price-drop" surface="/prices page (planned)" />
      </section>

      <section className="mt-10">
        <h2 className="font-serif text-[20px] leading-[28px]">Admin tasks</h2>
        <ul className="mt-3 list-disc pl-5 text-small text-ink-muted">
          <li>Export subscribers by topic / resort / locale as CSV.</li>
          <li>Trigger seat-available broadcast when a scheduled seat frees up.</li>
          <li>Trigger season-opening broadcast when a resort flips to <code>open</code>.</li>
          <li>Handle unsubscribe tokens from email footer links.</li>
        </ul>
      </section>
    </div>
  );
}

function Card({ title, topic, surface }: { title: string; topic: string; surface: string }) {
  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <h3 className="font-medium text-ink">{title}</h3>
      <p className="mt-1 text-small text-ink-muted">
        Topic: <code>{topic}</code>
      </p>
      <p className="mt-1 text-small text-ink-muted">Surface: {surface}</p>
    </div>
  );
}
