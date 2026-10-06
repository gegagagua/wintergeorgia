/**
 * Reviews collection. Only reviews written here appear on the site, and only
 * ones tied to a real booking (`bookingRef`). Until there are at least 5
 * approved reviews, the AggregateRating block never renders.
 *
 * In production this list is replaced by rows in the `reviews` database
 * table — the shape and the 5-review floor are the same.
 */

import type { Locale } from "@/i18n/routing";
import type { RouteSlug } from "@/content/types";

export type Review = {
  id: string;
  bookingRef: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Review text in the locale the guest wrote it in. */
  body: string;
  locale: Locale;
  authorFirstName: string;
  authorOrigin?: string;
  routeSlug?: RouteSlug;
  travelDate: string;
  publishedAt: string;
  approvedByOwner: true;
};

/**
 * TODO(owner): paste approved post-trip reviews here, each tied to a real
 * booking reference. Nothing is published until an entry exists.
 */
export const reviews: Review[] = [];

export const MINIMUM_REVIEWS_FOR_AGGREGATE = 5;

export function aggregateRating(): { value: number; count: number } | null {
  if (reviews.length < MINIMUM_REVIEWS_FOR_AGGREGATE) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return { value: Math.round((sum / reviews.length) * 10) / 10, count: reviews.length };
}

export function reviewsForRoute(slug: RouteSlug): Review[] {
  return reviews.filter((r) => r.routeSlug === slug);
}

export function latestReviews(n = 6): Review[] {
  return [...reviews]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, n);
}
