import type { ReactNode } from "react";

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-line px-6 py-14 text-center">
      <h3 className="font-serif text-[20px] leading-[28px]">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-small text-ink-muted">{description}</p>
      ) : null}
      {action ? <div className="mt-5 inline-block">{action}</div> : null}
    </div>
  );
}
