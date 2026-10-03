import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Cards: radius 14px (var --radius-lg), 1px border. Interactive cards lift
 * on hover, tint the border to primary and get a soft depth shadow via
 * the shared `.gw-lift` utility in globals.css.
 */
export function Card({
  children,
  className,
  interactive,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  as?: "div" | "article" | "section";
}) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-line bg-surface p-5",
        interactive && "gw-lift cursor-pointer",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardImage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md", className)}>{children}</div>
  );
}
