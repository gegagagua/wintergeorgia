import { AlertTriangle, Info, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "info" | "warning" | "danger";
const tones: Record<Tone, { border: string; bg: string; icon: string; Icon: typeof Info }> = {
  info: { border: "border-primary/30", bg: "bg-primary/5", icon: "text-primary", Icon: Info },
  warning: {
    border: "border-status-limited/40",
    bg: "bg-status-limited/10",
    icon: "text-status-limited",
    Icon: AlertTriangle,
  },
  danger: {
    border: "border-status-closed/40",
    bg: "bg-status-closed/10",
    icon: "text-status-closed",
    Icon: X,
  },
};

export function AlertBanner({
  tone = "info",
  title,
  children,
  action,
}: {
  tone?: Tone;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  const t = tones[tone];
  const Icon = t.Icon;
  return (
    <div
      role={tone === "info" ? "status" : "alert"}
      className={cn("flex gap-3 rounded-lg border px-4 py-3", t.border, t.bg)}
    >
      <Icon className={cn("mt-0.5 h-5 w-5 shrink-0", t.icon)} strokeWidth={1.75} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-ink">{title}</p>
        {children ? <div className="mt-1 text-small text-ink-muted">{children}</div> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
