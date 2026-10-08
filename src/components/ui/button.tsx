"use client";

import NextLink from "next/link";
import { ArrowRight } from "lucide-react";
import MuiButton from "@mui/material/Button";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "cta" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

function muiVariant(v: Variant) {
  return v === "outline" ? "outlined" : v === "ghost" ? "text" : "contained";
}

function muiSize(s: Size) {
  return s === "sm" ? "small" : s === "lg" ? "large" : "medium";
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
};

const arrowIcon = (
  <ArrowRight
    aria-hidden="true"
    strokeWidth={2}
    className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
  />
);

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  type = "button",
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, keyof CommonProps | "color">) {
  return (
    <MuiButton
      type={type}
      variant={muiVariant(variant)}
      color={variant === "cta" ? "secondary" : "primary"}
      size={muiSize(size)}
      endIcon={arrow ? arrowIcon : undefined}
      className={cn("group/btn", className)}
      {...rest}
    >
      {children}
    </MuiButton>
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
}: CommonProps & { href: string } & Omit<ComponentProps<typeof NextLink>, "className" | "href" | "children" | "color">) {
  return (
    <MuiButton
      component={NextLink}
      href={href as never}
      variant={muiVariant(variant)}
      color={variant === "cta" ? "secondary" : "primary"}
      size={muiSize(size)}
      endIcon={arrow ? arrowIcon : undefined}
      className={cn("group/btn", className)}
      {...rest}
    >
      {children}
    </MuiButton>
  );
}
