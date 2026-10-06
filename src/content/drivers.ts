import type { RouteSlug } from "./types";

export type DriverSlug = string;

export type Driver = {
  slug: DriverSlug;
  firstName: string;
  photo?: string;
  vehicle: {
    make: string;
    model: string;
    plate: string;
    year?: number;
    seats: number;
    is4x4: boolean;
  };
  languages: string[];
  yearsDriving?: number;
  routes: RouteSlug[];
  winterKit: Array<"winter_tyres" | "chains" | "4x4" | "ski_rack" | "child_seat">;
  completedTripsOverride?: number;
  base: "tbilisi" | "kutaisi" | "mestia" | "batumi" | "gudauri";
  published: boolean;
};

/**
 * TODO(owner): add real driver profiles. Nothing is published while this
 * array is empty — the /drivers page and the resort-page driver strip will
 * both render an empty-state card instead.
 */
export const drivers: Driver[] = [];

export function findDriver(slug: string) {
  return drivers.find((d) => d.slug === slug && d.published);
}

export function driversForRoute(routeSlug: RouteSlug) {
  return drivers.filter((d) => d.published && d.routes.includes(routeSlug));
}
