import { routes } from "@/content/routes";
import { resorts } from "@/content/resorts";
import { roads } from "@/content/roads";
import { articles } from "@/content/articles";
import type { Locale } from "@/i18n/routing";
import type { ResortSlug, RouteSlug, RoadSlug } from "@/content/types";

export type Related = {
  href: string;
  title: string;
  kicker?: string;
};

/**
 * All related-links logic lives here so a change to the rules updates every
 * page uniformly. Each helper returns the 2–5 strongest contextual links.
 */

export function relatedForResort(slug: ResortSlug, locale: Locale, limit = 6): Related[] {
  const r = resorts.find((x) => x.slug === slug);
  if (!r) return [];
  const list: Related[] = [];

  // All routes serving this resort.
  for (const rt of routes.filter((rt) => rt.toResort === slug)) {
    list.push({
      href: `/transfers/${rt.slug}`,
      title: `${rt.from[locale]} → ${rt.to[locale]}`,
      kicker: "Transfer",
    });
  }

  // Road status for every road that serves this resort.
  for (const road of roads.filter((rd) => rd.serves.includes(slug))) {
    list.push({
      href: `/road-status`,
      title: road.name[locale],
      kicker: "Road status",
    });
  }

  // Journal entries tagged with this resort.
  for (const a of articles.filter((x) => x.resort === slug).slice(0, 3)) {
    list.push({
      href: `/journal/${a.slug}`,
      title: a.title[locale],
      kicker: a.template === "qa" ? "Q&A" : a.template ?? a.category,
    });
  }

  return dedupe(list).slice(0, limit);
}

export function relatedForRoute(slug: RouteSlug, locale: Locale, limit = 6): Related[] {
  const r = routes.find((x) => x.slug === slug);
  if (!r) return [];
  const list: Related[] = [];

  // Destination resort.
  if (r.toResort) {
    const resort = resorts.find((x) => x.slug === r.toResort);
    if (resort) {
      list.push({
        href: `/resorts/${resort.slug}`,
        title: resort.name[locale],
        kicker: "Resort",
      });
    }
  }

  // Reverse route (if one exists).
  const reverse = routes.find(
    (x) => x.fromSlug === r.toSlug && x.toSlug === r.fromSlug,
  );
  if (reverse) {
    list.push({
      href: `/transfers/${reverse.slug}`,
      title: `${reverse.from[locale]} → ${reverse.to[locale]}`,
      kicker: "Return leg",
    });
  }

  // Nearby routes (sharing an endpoint).
  for (const near of routes
    .filter(
      (x) =>
        x.slug !== r.slug &&
        (x.fromSlug === r.fromSlug ||
          x.toSlug === r.toSlug ||
          x.fromSlug === r.toSlug ||
          x.toSlug === r.fromSlug),
    )
    .slice(0, 2)) {
    list.push({
      href: `/transfers/${near.slug}`,
      title: `${near.from[locale]} → ${near.to[locale]}`,
      kicker: "Nearby route",
    });
  }

  // Roads this route uses — the Jvari/Goderdzi pass pages matter.
  if (r.toResort) {
    for (const road of roads.filter((rd) => rd.serves.includes(r.toResort!))) {
      list.push({
        href: `/road-status`,
        title: road.name[locale],
        kicker: "Road status",
      });
    }
  }

  return dedupe(list).slice(0, limit);
}

export function relatedForRoad(slug: RoadSlug, locale: Locale, limit = 6): Related[] {
  const road = roads.find((x) => x.slug === slug);
  if (!road) return [];
  const list: Related[] = [];

  // Every route touching a resort this road serves.
  for (const resortSlug of road.serves) {
    for (const rt of routes.filter((r) => r.toResort === resortSlug)) {
      list.push({
        href: `/transfers/${rt.slug}`,
        title: `${rt.from[locale]} → ${rt.to[locale]}`,
        kicker: "Route via this road",
      });
    }
    const resort = resorts.find((x) => x.slug === resortSlug);
    if (resort) {
      list.push({
        href: `/resorts/${resort.slug}`,
        title: resort.name[locale],
        kicker: "Resort",
      });
    }
  }

  return dedupe(list).slice(0, limit);
}

export function relatedForArticle(slug: string, locale: Locale, limit = 6): Related[] {
  const a = articles.find((x) => x.slug === slug);
  if (!a) return [];
  const list: Related[] = [];

  if (a.resort) {
    const resort = resorts.find((x) => x.slug === a.resort);
    if (resort)
      list.push({
        href: `/resorts/${resort.slug}`,
        title: resort.name[locale],
        kicker: "Resort",
      });
  }
  if (a.route || a.ctaRoute) {
    const route = routes.find((x) => x.slug === (a.ctaRoute ?? a.route));
    if (route)
      list.push({
        href: `/transfers/${route.slug}`,
        title: `${route.from[locale]} → ${route.to[locale]}`,
        kicker: "Transfer",
      });
  }

  for (const other of articles
    .filter(
      (x) =>
        x.slug !== a.slug &&
        (x.resort === a.resort || x.route === a.route || x.template === a.template),
    )
    .slice(0, 3)) {
    list.push({
      href: `/journal/${other.slug}`,
      title: other.title[locale],
      kicker: other.template === "qa" ? "Q&A" : other.template ?? other.category,
    });
  }

  return dedupe(list).slice(0, limit);
}

function dedupe(items: Related[]) {
  const seen = new Set<string>();
  return items.filter((i) => {
    if (seen.has(i.href)) return false;
    seen.add(i.href);
    return true;
  });
}
