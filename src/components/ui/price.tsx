import { cn } from "@/lib/cn";

/** Price: dawn accent, tabular figures, currency after the number. */
export function Price({
  gel,
  className,
  size = "md",
  from,
}: {
  gel: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  from?: boolean;
}) {
  const sizes = {
    sm: "text-small",
    md: "text-[20px] leading-[28px]",
    lg: "text-[28px] leading-[36px]",
  } as const;
  return (
    <span className={cn("tabular font-semibold text-accent", sizes[size], className)}>
      {from ? <span className="mr-1 text-ink-muted font-normal">from</span> : null}
      {gel.toLocaleString("en-US")} ₾
    </span>
  );
}
