import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "cta" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";
type Tone = "default" | "dark";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold tracking-[-0.005em] " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:pointer-events-none disabled:opacity-55 select-none active:translate-y-px motion-reduce:transform-none motion-reduce:transition-none";

const sizeStyles: Record<Size, string> = {
  sm: "h-10 px-4 text-[13px]",
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-7 text-[16px]",
};

function variantStyles(variant: Variant, tone: Tone): string {
  if (tone === "dark") {
    if (variant === "outline") {
      return (
        "border border-white/40 bg-white/10 text-white backdrop-blur-md " +
        "shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_8px_24px_-12px_rgba(0,0,0,0.6)] " +
        "hover:border-white hover:bg-white/[0.18] hover:text-white"
      );
    }
    if (variant === "ghost") {
      return "text-white hover:bg-white/10";
    }
  }
  switch (variant) {
    case "cta":
      return (
        "bg-accent text-white shadow-[0_8px_20px_-8px_rgba(217,132,54,0.55),0_1px_0_rgba(255,255,255,0.25)_inset] " +
        "hover:bg-accent-hover hover:shadow-[0_12px_28px_-8px_rgba(217,132,54,0.7),0_1px_0_rgba(255,255,255,0.3)_inset]"
      );
    case "primary":
      return (
        "bg-primary text-white shadow-[0_6px_16px_-8px_rgba(44,127,168,0.55),0_1px_0_rgba(255,255,255,0.2)_inset] " +
        "hover:bg-primary-hover hover:shadow-[0_10px_24px_-8px_rgba(44,127,168,0.7),0_1px_0_rgba(255,255,255,0.25)_inset]"
      );
    case "outline":
      return (
        "border border-line bg-surface text-ink shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] " +
        "hover:border-primary hover:bg-surface-raised hover:text-primary"
      );
    case "ghost":
      return "text-ink hover:bg-surface-raised hover:text-primary";
  }
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
};

const arrowIcon = (
  <ArrowRight
    aria-hidden="true"
    strokeWidth={2.25}
    className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5"
  />
);

export function Button({
  variant = "primary",
  size = "md",
  tone = "default",
  className,
  children,
  arrow,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, keyof CommonProps>) {
  return (
    <button
      type={type}
      className={cn(base, sizeStyles[size], variantStyles(variant, tone), className)}
      {...rest}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        {arrow ? arrowIcon : null}
      </span>
    </button>
  );
}

export function LinkButton({
  variant = "primary",
  size = "md",
  tone = "default",
  className,
  href,
  children,
  arrow,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentProps<typeof NextLink>, "className" | "href" | "children">) {
  return (
    <NextLink
      href={href as never}
      className={cn(base, sizeStyles[size], variantStyles(variant, tone), className)}
      {...rest}
    >
      <span className="inline-flex items-center gap-2">
        {children}
        {arrow ? arrowIcon : null}
      </span>
    </NextLink>
  );
}
