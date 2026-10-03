import type { Locale } from "@/i18n/routing";

export type I18n = Record<Locale, string>;
export type VehicleClass = "shared" | "sedan" | "minivan" | "suv4x4";
export type ResortSlug =
  | "gudauri"
  | "bakuriani"
  | "tetnuldi"
  | "hatsvali"
  | "goderdzi"
  | "kazbegi";
export type RouteSlug =
  | "tbilisi-airport-gudauri"
  | "tbilisi-gudauri"
  | "tbilisi-bakuriani"
  | "tbilisi-kazbegi"
  | "gudauri-kazbegi"
  | "kutaisi-airport-mestia"
  | "zugdidi-mestia"
  | "mestia-tetnuldi"
  | "mestia-hatsvali"
  | "batumi-goderdzi"
  | "tbilisi-airport-batumi";
export type RoadSlug = "jvari-pass" | "goderdzi-pass" | "mestia-road" | "bakuriani-road";
export type Status = "open" | "limited" | "closed";
export type Restriction = "none" | "chains" | "4x4_only" | "lorries_banned";

export type Resort = {
  slug: ResortSlug;
  name: I18n;
  region: string;
  altMinM: number;
  altMaxM: number;
  slopeKm?: number;
  liftsTotal: number;
  seasonFrom?: string;
  seasonTo?: string;
  description: I18n;
  highlights: I18n[];
  bestFor: I18n;
  isLiftResort: boolean;
  hero: string;
  lat: number;
  lng: number;
};

export type Route = {
  slug: RouteSlug;
  from: I18n;
  fromSlug: string;
  to: I18n;
  toSlug: string;
  toResort?: ResortSlug;
  distanceKm: number;
  durationMin: number;
  requires4x4: boolean;
  isScheduled: boolean;
  description: I18n;
  prices: Partial<Record<VehicleClass, { priceGel: number; maxPax: number }>>;
};

export type Road = {
  slug: RoadSlug;
  name: I18n;
  status: Status;
  restriction: Restriction;
  updatedAt: string;
  serves: ResortSlug[];
  note?: I18n;
};

export type SnowReport = {
  resort: ResortSlug;
  baseCm: number;
  topCm: number;
  new24hCm: number;
  tempC: number;
  windMs: number;
  visibility: I18n;
  liftsOpen: number;
  liftsTotal: number;
  measuredAt: string;
};

export type Place = {
  slug: string;
  resort: ResortSlug;
  category:
    | "paragliding"
    | "quad"
    | "snowmobile"
    | "tubing"
    | "horse-riding"
    | "heliski"
    | "bar"
    | "restaurant"
    | "apres"
    | "spa"
    | "ski-school"
    | "rental";
  name: I18n;
  description: I18n;
  priceFromGel?: number;
  hours?: I18n;
  phone: string;
  bookingUrl?: string;
  tags: string[];
};

export type EventItem = {
  slug: string;
  resort: ResortSlug;
  place?: string;
  title: I18n;
  body: I18n;
  category: "party" | "competition" | "festival" | "season-opening" | "family";
  startsAt: string;
  endsAt?: string;
  ticketPriceGel?: number;
  ticketUrl?: string;
  transferRoute?: RouteSlug;
  featured?: boolean;
};

export type Article = {
  slug: string;
  locale: Locale | "all";
  title: I18n;
  excerpt: I18n;
  body: I18n;
  category: "news" | "price" | "alert" | "infrastructure" | "event" | "guide";
  author: string;
  publishedAt: string;
  resort?: ResortSlug;
  route?: RouteSlug;
  isAlert?: boolean;
};

export type Price = {
  resort: ResortSlug;
  liftPassDayGel: number;
  liftPassWeekGel: number;
  rentalSetDayGel: number;
  instructorHourGel: number;
  season: string;
};
