import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-line", className)}>
      <table className="w-full border-collapse text-small">
        {children}
      </table>
    </div>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return <thead className="bg-surface-raised text-ink-muted">{children}</thead>;
}

export function TH({ children, align = "left" }: { children: ReactNode; align?: "left" | "right" | "center" }) {
  return (
    <th
      scope="col"
      className={cn("px-4 py-2.5 font-medium", align === "right" && "text-right", align === "center" && "text-center")}
    >
      {children}
    </th>
  );
}

export function TR({ children }: { children: ReactNode }) {
  return <tr className="border-t border-line first:border-t-0">{children}</tr>;
}

export function TD({
  children,
  align = "left",
  className,
}: {
  children: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}) {
  return (
    <td
      className={cn(
        "px-4 py-3 text-ink",
        align === "right" && "text-right tabular",
        align === "center" && "text-center",
        className,
      )}
    >
      {children}
    </td>
  );
}
