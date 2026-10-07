import type { Route, RouteRegion } from "@/content/types";
import type { Locale } from "@/i18n/routing";

const ORDER: RouteRegion[] = [
  "from-tbilisi",
  "from-airports",
  "svaneti",
  "adjara",
  "cross-country",
];

const LABELS: Record<RouteRegion, Record<Locale, string>> = {
  "from-tbilisi": {
    en: "From Tbilisi",
    ru: "Из Тбилиси",
    ka: "თბილისიდან",
  },
  "from-airports": {
    en: "From the airports",
    ru: "Из аэропортов",
    ka: "აეროპორტებიდან",
  },
  svaneti: {
    en: "Svaneti",
    ru: "Сванетия",
    ka: "სვანეთი",
  },
  adjara: {
    en: "Adjara",
    ru: "Аджария",
    ka: "აჭარა",
  },
  "cross-country": {
    en: "Across Georgia",
    ru: "Через всю Грузию",
    ka: "საქართველოს გასწვრივ",
  },
};

export function routeRegionLabel(region: RouteRegion, locale: Locale): string {
  return LABELS[region][locale];
}

export type RouteGroup = { id: RouteRegion; routes: Route[] };

export function groupedRoutes(routes: Route[]): RouteGroup[] {
  const buckets = new Map<RouteRegion, Route[]>();
  for (const r of routes) {
    const list = buckets.get(r.region) ?? [];
    list.push(r);
    buckets.set(r.region, list);
  }
  return ORDER
    .map((id) => ({ id, routes: buckets.get(id) ?? [] }))
    .filter((g) => g.routes.length > 0);
}
