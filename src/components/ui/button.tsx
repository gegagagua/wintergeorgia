import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "cta" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 font-medium tracking-[-0.005em] " +
  "transition-[transform,box-shadow,background-color,border-color,color,filter] duration-200 ease-[cubic-bezier(.2,.7,.3,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-hover " +
  "active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:active:translate-y-0";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_1px_2px_rgba(14,22,32,0.08),0_8px_20px_-14px_rgba(44,127,168,0.55)] " +
    "hover:bg-primary-hover hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_1px_2px_rgba(14,22,32,0.08),0_14px_28px_-16px_rgba(44,127,168,0.65)]",
  cta:
    "bg-accent text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_1px_2px_rgba(14,22,32,0.1),0_10px_26px_-14px_rgba(217,132,54,0.55)] " +
    "hover:brightness-[1.04] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22),0_1px_2px_rgba(14,22,32,0.1),0_16px_34px_-14px_rgba(217,132,54,0.7)] " +
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_55%)]",
  outline:
    "border border-line bg-surface text-ink shadow-[0_1px_0_rgba(14,22,32,0.03)] " +
    "hover:border-primary-hover hover:bg-surface-raised hover:text-primary",
  ghost: "text-ink hover:bg-surface-raised hover:text-primary",
};

const sizes: Record<Size, string> = {
  sm: "h-9 rounded-md px-3.5 text-[13px]",
  md: "h-11 rounded-md px-5 text-[14px]",
  lg: "h-12 rounded-lg px-6 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
};

function ArrowIcon({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={2}
      className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, keyof CommonProps>) {
  return (
    <button
      type="button"
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span className="relative inline-flex items-center gap-2">
        {children}
        <ArrowIcon visible={!!arrow} />
      </span>
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  arrow,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "className" | "href" | "children">) {
  return (
    <Link
      href={href as never}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span className="relative inline-flex items-center gap-2">
        {children}
        <ArrowIcon visible={!!arrow} />
      </span>
    </Link>
  );
}
