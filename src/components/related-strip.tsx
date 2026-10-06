import { Link } from "@/i18n/navigation";
import type { Related } from "@/lib/related";

/**
 * Related-links strip. Always renders at least a header + grid. If `items`
 * is empty, nothing renders (callers rely on the engine to always return
 * at least 3 contextual links on pages that have data).
 */
export function RelatedStrip({
  items,
  title = "Related",
}: {
  items: Related[];
  title?: string;
}) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line bg-surface py-10">
      <div className="site-container">
        <h2 className="mb-5 font-serif text-[22px] leading-[30px]">{title}</h2>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i) => (
            <li key={i.href + i.title}>
              <Link
                href={i.href as never}
                className="group block rounded-lg border border-line bg-surface-raised p-4 hover:border-primary-hover"
              >
                {i.kicker ? (
                  <p className="text-small text-primary">{i.kicker}</p>
                ) : null}
                <p className="mt-1 font-serif text-[18px] leading-[26px] group-hover:text-primary">
                  {i.title}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
