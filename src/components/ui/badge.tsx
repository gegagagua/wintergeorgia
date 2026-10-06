import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "accent" | "muted" | "glass";
type Size = "sm" | "md";

const tones: Record<Tone, string> = {
  neutral: "border border-line bg-surface text-ink",
  primary: "border border-primary/25 bg-primary/[0.08] text-primary",
  accent: "border border-accent/30 bg-accent/[0.10] text-accent",
  muted: "border border-line bg-surface-raised text-ink-muted",
  glass: "border border-white/15 bg-white/10 text-white backdrop-blur",
};

const sizes: Record<Size, string> = {
  sm: "h-6 gap-1.5 px-2.5 text-[12px]",
  md: "h-7 gap-2 px-3 text-small",
};

export function Badge({
  tone = "neutral",
  size = "md",
  children,
  className,
  icon,
  ...rest
}: {
  tone?: Tone;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
} & Omit<ComponentProps<"span">, "children">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill font-medium tabular leading-none whitespace-nowrap",
        tones[tone],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
