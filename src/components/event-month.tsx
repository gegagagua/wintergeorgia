import { Link } from "@/i18n/navigation";
import type { EventItem } from "@/content/types";

type Props = {
  events: EventItem[];
  locale: "en" | "ru" | "ka";
};

/**
 * Simple month calendar. Groups events by ISO date and lays them out on the
 * next 12 weeks starting today. Weeks that have no events show as empty rows
 * so the pattern of "when things happen" is legible.
 */
export function EventMonth({ events, locale }: Props) {
  const now = new Date();
  const start = startOfWeek(now);
  const weeks = 12;

  const byDate = new Map<string, EventItem[]>();
  for (const e of events) {
    const d = e.startsAt.slice(0, 10);
    if (!byDate.has(d)) byDate.set(d, []);
    byDate.get(d)!.push(e);
  }

  const cells: { date: Date; iso: string }[] = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    cells.push({ date: d, iso: d.toISOString().slice(0, 10) });
  }

  const dayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const monthFmt = new Intl.DateTimeFormat(locale, { month: "short" });
  const nowIso = now.toISOString().slice(0, 10);

  return (
    <div className="rounded-lg border border-line bg-surface p-4">
      <div className="mb-2 grid grid-cols-7 gap-1 text-small text-ink-muted">
        {dayLabels.map((d) => (
          <div key={d} className="px-2 py-1 text-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map(({ date, iso }, i) => {
          const dayEvents = byDate.get(iso) ?? [];
          const isMonthStart = date.getDate() === 1;
          const isToday = iso === nowIso;
          return (
            <div
              key={i}
              className={
                "min-h-24 rounded-sm border p-2 " +
                (isToday ? "border-primary bg-primary/5" : "border-line/60")
              }
            >
              <div className="flex items-baseline justify-between text-small">
                <span className={"tabular " + (isToday ? "text-primary font-semibold" : "text-ink-muted")}>
                  {date.getDate()}
                </span>
                {isMonthStart ? (
                  <span className="text-small text-ink-muted">{monthFmt.format(date)}</span>
                ) : null}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((e) => (
                  <Link
                    key={e.slug}
                    href={`/events/${e.slug}` as never}
                    className="block truncate rounded-sm bg-accent/15 px-1.5 py-0.5 text-small text-accent hover:bg-accent/25"
                  >
                    {e.title[locale]}
                  </Link>
                ))}
                {dayEvents.length > 2 ? (
                  <div className="text-small text-ink-muted">+{dayEvents.length - 2}</div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function startOfWeek(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  const day = (c.getDay() + 6) % 7; // Mon = 0
  c.setDate(c.getDate() - day);
  return c;
}
