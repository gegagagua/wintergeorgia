import { CalendarClock } from "lucide-react";

/**
 * Upcoming departures ticker — the next 10 planned transfer legs.
 * Computed at render time from a curated daily schedule so times are
 * always fresh; any slot older than 30 minutes rolls to tomorrow.
 * (In production this reads from the `bookings` table + `schedules`.)
 */

type Slot = {
  hour: number;
  minute: number;
  route: string;
  note: string;
  requires4x4?: boolean;
};

const dailySchedule: Slot[] = [
  { hour: 6, minute: 30,  route: "TBS Airport → Gudauri", note: "Sedan · confirmed" },
  { hour: 7, minute: 45,  route: "Tbilisi → Bakuriani", note: "Minivan · 2 seats left" },
  { hour: 8, minute: 0,   route: "Tbilisi → Gudauri", note: "Shared · 4 seats left" },
  { hour: 9, minute: 0,   route: "Mestia → Tetnuldi", note: "Daily shuttle · seats open" },
  { hour: 10, minute: 30, route: "TBS Airport → Gudauri", note: "Minivan · confirmed" },
  { hour: 11, minute: 15, route: "Zugdidi → Mestia", note: "Minivan · 3 seats left" },
  { hour: 12, minute: 0,  route: "Tbilisi → Kazbegi", note: "4x4 · guide-driver", requires4x4: true },
  { hour: 13, minute: 30, route: "Kutaisi Airport → Mestia", note: "Minivan · 5 seats left" },
  { hour: 14, minute: 0,  route: "Gudauri → Kazbegi", note: "4x4 · rest-day tour", requires4x4: true },
  { hour: 15, minute: 30, route: "TBS Airport → Gudauri", note: "Sedan · confirmed" },
  { hour: 16, minute: 0,  route: "Mestia → Tetnuldi", note: "Return shuttle · full" },
  { hour: 17, minute: 30, route: "Batumi → Goderdzi", note: "4x4 · chains ready", requires4x4: true },
  { hour: 18, minute: 15, route: "Tbilisi → Gudauri", note: "Minivan · 1 seat left" },
  { hour: 20, minute: 0,  route: "TBS Airport → Gudauri", note: "Sedan · night arrival" },
  { hour: 22, minute: 30, route: "TBS Airport → Gudauri", note: "Minivan · late arrival" },
];

/** Turn a slot into a Date in Asia/Tbilisi and roll past-slots to tomorrow. */
function nextDepartures(now: Date, count = 10) {
  const tbilisiNow = new Date(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Tbilisi",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
    }).format(now).replace(",", ""),
  );

  const today = new Date(tbilisiNow);
  today.setHours(0, 0, 0, 0);

  return dailySchedule
    .map((s) => {
      let dep = new Date(today);
      dep.setHours(s.hour, s.minute, 0, 0);
      if (dep.getTime() < tbilisiNow.getTime() - 30 * 60 * 1000) {
        // rolled — this slot is more than 30 minutes ago; it happens tomorrow
        dep = new Date(dep.getTime() + 24 * 60 * 60 * 1000);
      }
      const minutesAway = Math.round((dep.getTime() - tbilisiNow.getTime()) / 60_000);
      return { ...s, dep, minutesAway };
    })
    .sort((a, b) => a.dep.getTime() - b.dep.getTime())
    .slice(0, count);
}

function whenLabel(minutes: number, dep: Date): string {
  if (minutes < 0) return "just now";
  if (minutes < 60) return `in ${minutes} min`;
  if (minutes < 24 * 60) return `in ${Math.round(minutes / 60)}h`;
  const hh = String(dep.getHours()).padStart(2, "0");
  const mm = String(dep.getMinutes()).padStart(2, "0");
  return `tomorrow ${hh}:${mm}`;
}

export function ActivityTicker() {
  const items = nextDepartures(new Date(), 10);
  const stream = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-line bg-surface-raised">
      <div className="site-container flex items-center gap-3 py-2 text-small">
        <span className="inline-flex shrink-0 items-center gap-1.5 text-ink-muted">
          <CalendarClock aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span className="tabular">Upcoming departures</span>
        </span>
        <span aria-hidden="true" className="h-3 w-px shrink-0 bg-line" />
        <div className="relative flex-1 overflow-hidden">
          <div className="flex min-w-max gap-8 whitespace-nowrap will-change-transform [animation:marquee_60s_linear_infinite] motion-reduce:animate-none">
            {stream.map((it, i) => {
              const hh = String(it.dep.getHours()).padStart(2, "0");
              const mm = String(it.dep.getMinutes()).padStart(2, "0");
              return (
                <span key={i} className="inline-flex items-center gap-2 text-ink-muted">
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-status-open" />
                  <span className="tabular text-primary">{hh}:{mm}</span>
                  <span>·</span>
                  <span className="text-ink">{it.route}</span>
                  {it.requires4x4 ? (
                    <span className="rounded-pill border border-status-limited/30 bg-status-limited/10 px-1.5 py-0 text-small text-status-limited">4x4</span>
                  ) : null}
                  <span>·</span>
                  <span>{it.note}</span>
                  <span className="tabular text-accent">{whenLabel(it.minutesAway, it.dep)}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
