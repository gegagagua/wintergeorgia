import type { MetadataRoute } from "next";
import { routing, type Locale } from "@/i18n/routing";
import { localeUrl } from "@/lib/site";
import { resorts } from "@/content/resorts";
import { routes as transferRoutes } from "@/content/routes";
import { events } from "@/content/events";
import { articles } from "@/content/articles";
import { places } from "@/content/places";
import { roads } from "@/content/roads";
import { comparisons } from "@/content/comparisons";

const paths: string[] = [
  "/",
  "/transfers",
  "/resorts",
  "/road-status",
  "/snow-report",
  "/prices",
  "/things-to-do",
  "/events",
  "/journal",
  "/answers",
  "/compare",
  "/partners",
  "/terms",
  "/privacy",
  "/cancellation",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  const pushForAllLocales = (
    path: string,
    priority = 0.7,
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
  ) => {
    for (const locale of routing.locales) {
      entries.push({
        url: localeUrl(locale as Locale, path),
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, localeUrl(l as Locale, path)]),
          ),
        },
      });
    }
  };

  paths.forEach((p) =>
    pushForAllLocales(p, p === "/" ? 1 : 0.7, p === "/" ? "daily" : "weekly"),
  );

  resorts.forEach((r) => pushForAllLocales(`/resorts/${r.slug}`, 0.9));
  transferRoutes.forEach((r) => pushForAllLocales(`/transfers/${r.slug}`, 0.95));
  roads.forEach((r) => pushForAllLocales(`/road-status/${r.slug}`, 0.85, "daily"));
  events.forEach((e) => pushForAllLocales(`/events/${e.slug}`, 0.7));
  articles.forEach((a) => {
    const base = a.template === "qa" ? "/answers" : "/journal";
    pushForAllLocales(`${base}/${a.slug}`, 0.6);
  });
  comparisons.forEach((c) => pushForAllLocales(`/compare/${c.slug}`, 0.7));
  places.forEach((p) =>
    pushForAllLocales(`/things-to-do/${p.resort}/${p.slug}`, 0.5),
  );

  // Things-to-do per resort index pages
  resorts.forEach((r) => pushForAllLocales(`/things-to-do/${r.slug}`, 0.7));

  return entries;
}
