import { cn } from "@/lib/cn";

/**
 * Colorful but muted category tag. Palette uses hue tints on white
 * (light) / dark surfaces — never garish, but adds visual variety to
 * lists of otherwise-uniform cards.
 */

type Tone =
  | "news"
  | "price"
  | "alert"
  | "infrastructure"
  | "event"
  | "guide"
  | "party"
  | "competition"
  | "festival"
  | "season-opening"
  | "family";

const tones: Record<Tone, string> = {
  news:            "border-primary/25 bg-primary/8 text-primary",
  price:           "border-accent/30 bg-accent/8 text-accent",
  alert:           "border-status-closed/30 bg-status-closed/10 text-status-closed",
  infrastructure:  "border-fog/40 bg-fog/10 text-fog",
  event:           "border-[#7B2CBF]/30 bg-[#7B2CBF]/8 text-[#7B2CBF] dark:text-[#B78CE0]",
  guide:           "border-status-open/30 bg-status-open/10 text-status-open",
  party:           "border-[#C13584]/30 bg-[#C13584]/8 text-[#C13584] dark:text-[#E56AAF]",
  competition:     "border-status-open/30 bg-status-open/10 text-status-open",
  festival:        "border-[#7B2CBF]/30 bg-[#7B2CBF]/8 text-[#7B2CBF] dark:text-[#B78CE0]",
  "season-opening":"border-accent/30 bg-accent/10 text-accent",
  family:          "border-primary/25 bg-primary/8 text-primary",
};

export function CategoryTag({ tone, children, className }: { tone: string; children: React.ReactNode; className?: string }) {
  const cls = (tones as Record<string, string>)[tone] ?? "border-line bg-surface-raised text-ink";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-2 py-0.5 text-small tabular",
        cls,
        className,
      )}
    >
      <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-current opacity-60" />
      {children}
    </span>
  );
}
