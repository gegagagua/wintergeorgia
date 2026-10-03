import { Link } from "@/i18n/navigation";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; path?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-small text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${c.name}-${i}`} className="inline-flex items-center gap-1.5">
              {c.path && !isLast ? (
                <Link href={c.path as never} className="hover:text-primary">
                  {c.name}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-ink" : ""}>
                  {c.name}
                </span>
              )}
              {!isLast ? (
                <ChevronRight className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
