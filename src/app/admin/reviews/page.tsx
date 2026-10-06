import { reviews, aggregateRating, MINIMUM_REVIEWS_FOR_AGGREGATE } from "@/config/reviews";

export const dynamic = "force-dynamic";

/**
 * Reviews moderation screen. Once Postgres is live this reads from the
 * `reviews` table (status in: 'pending' | 'approved' | 'rejected').
 * For now it reads the config file + explains the floor rule.
 */
export default function AdminReviews() {
  const agg = aggregateRating();

  return (
    <div className="site-container py-10">
      <h1 className="font-serif text-[28px] leading-[36px]">Reviews</h1>
      <p className="mt-2 text-small text-ink-muted">
        {agg
          ? `Aggregate rating is live: ${agg.value.toFixed(1)} across ${agg.count} reviews.`
          : `Aggregate rating hidden until there are at least ${MINIMUM_REVIEWS_FOR_AGGREGATE} approved reviews.`}
      </p>

      <section className="mt-8">
        <h2 className="mb-4 font-serif text-[20px] leading-[28px]">
          Approved reviews ({reviews.length})
        </h2>
        {reviews.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line px-6 py-10 text-center text-small text-ink-muted">
            No approved reviews yet. The post-trip request flow writes
            new reviews with status <code>pending</code>; approve them from
            this screen once wired to Postgres.
          </div>
        ) : (
          <ul className="grid gap-3">
            {reviews.map((r) => (
              <li key={r.id} className="rounded-lg border border-line bg-surface p-4">
                <div className="flex items-center justify-between text-small">
                  <span className="tabular text-ink-muted">ref {r.bookingRef}</span>
                  <span className="tabular">{r.rating}★</span>
                </div>
                <p className="mt-2 text-ink">&ldquo;{r.body}&rdquo;</p>
                <p className="mt-2 text-small text-ink-muted">
                  {r.authorFirstName}
                  {r.authorOrigin ? ` · ${r.authorOrigin}` : ""} · {r.locale} ·{" "}
                  {new Date(r.travelDate).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
