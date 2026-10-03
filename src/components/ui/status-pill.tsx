import { cn } from "@/lib/cn";
import type { Status } from "@/content/types";

const styles: Record<Status, { dot: string; text: string; bg: string; border: string }> = {
  open: {
    dot: "bg-status-open",
    text: "text-status-open",
    bg: "bg-status-open/10",
    border: "border-status-open/30",
  },
  limited: {
    dot: "bg-status-limited",
    text: "text-status-limited",
    bg: "bg-status-limited/10",
    border: "border-status-limited/30",
  },
  closed: {
    dot: "bg-status-closed",
    text: "text-status-closed",
    bg: "bg-status-closed/10",
    border: "border-status-closed/30",
  },
};

/** Status is never communicated by color alone — always paired with a text label. */
export function StatusPill({
  status,
  label,
  className,
}: {
  status: Status;
  label: string;
  className?: string;
}) {
  const s = styles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-2.5 py-0.5 text-small tabular",
        s.bg,
        s.border,
        s.text,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} aria-hidden="true" />
      {label}
    </span>
  );
}
