import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Section headers use serif and never all-caps. */
export function SectionHeader({
  kicker,
  title,
  action,
  className,
}: {
  kicker?: string;
  title: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div>
        {kicker ? (
          <p className="text-small text-primary tabular">{kicker}</p>
        ) : null}
        <h2 className="mt-1 font-serif text-[28px] leading-[36px] md:text-[32px] md:leading-[40px]">
          {title}
        </h2>
      </div>
      {action}
    </header>
  );
}
