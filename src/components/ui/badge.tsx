"use client";

import Chip, { type ChipProps } from "@mui/material/Chip";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "accent" | "muted" | "glass";
type Size = "sm" | "md";

const toneClass: Record<Tone, string> = {
  neutral: "!border !border-line !bg-surface !text-ink",
  primary: "!border !border-primary/25 !bg-primary/[0.08] !text-primary",
  accent: "!border !border-accent/30 !bg-accent/[0.10] !text-accent",
  muted: "!border !border-line !bg-surface-raised !text-ink-muted",
  glass: "!border !border-white/15 !bg-white/10 !text-white backdrop-blur",
};

const sizeClass: Record<Size, string> = {
  sm: "!h-6 !text-[12px] [&_.MuiChip-label]:!px-2.5 [&_.MuiChip-icon]:!ml-1.5",
  md: "!h-7 !text-[13px] [&_.MuiChip-label]:!px-3 [&_.MuiChip-icon]:!ml-1.5",
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
  icon?: ReactElement;
} & Omit<ComponentProps<"span">, "children">) {
  return (
    <Chip
      label={children}
      icon={icon}
      className={cn(
        "!rounded-full !font-medium !tracking-normal whitespace-nowrap",
        toneClass[tone],
        sizeClass[size],
        className,
      )}
      {...(rest as Omit<ChipProps, "label" | "icon">)}
    />
  );
}
