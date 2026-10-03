import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "cta" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex items-center justify-center gap-2 font-medium transition-[filter,box-shadow,background,border-color,color] duration-150 " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-primary-hover " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-[0_6px_20px_-10px_rgba(44,127,168,0.6)]",
  cta:
    "relative overflow-hidden bg-accent text-white gw-glow-cta hover:brightness-105 " +
    // subtle inner light — the "warm dawn" without adding a second color
    "before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_45%)] before:pointer-events-none",
  outline:
    "border border-line bg-surface text-ink hover:border-primary-hover hover:bg-surface-raised",
  ghost: "text-ink hover:bg-surface-raised",
};

const sizes: Record<Size, string> = {
  sm: "h-8 rounded-sm px-3 text-small",
  md: "h-10 rounded-sm px-4 text-small",
  lg: "h-12 rounded-sm px-6",
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
      className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
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
