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

export type ResortImage = {
  src: string;
  caption?: I18n;
  credit?: string;
  width?: number;
  height?: number;
};

export type LiftInfo = {
  name: string;
  kind: "chair" | "gondola" | "surface" | "conveyor" | "cable_car";
  capacity?: number;
  hours?: string;
};

export type TerrainSplit = {
  beginner?: number;
  intermediate?: number;
  advanced?: number;
};

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
  /** Owner-supplied photos. Empty array → contour illustration fallback. */
  images?: ResortImage[];
  /** Terrain breakdown (percentages). All optional. */
  terrain?: TerrainSplit;
  longestRunKm?: number;
  verticalDropM?: number;
  lifts?: LiftInfo[];
  webcams?: Array<{ name: string; url: string; attribution?: string }>;
  parkingNote?: I18n;
  faqs?: Array<{ q: I18n; a: I18n }>;
};

export type RouteRegion =
  | "from-tbilisi"
  | "from-airports"
  | "svaneti"
  | "adjara"
  | "cross-country";

export type Route = {
  slug: RouteSlug;
  from: I18n;
  fromSlug: string;
  to: I18n;
  toSlug: string;
  toResort?: ResortSlug;
  /** The grouping shown in /transfers, nav and footer. */
  region: RouteRegion;
  distanceKm: number;
  durationMin: number;
  requires4x4: boolean;
  isScheduled: boolean;
  description: I18n;
  prices: Partial<Record<VehicleClass, { priceGel: number; maxPax: number }>>;
  /** Optional schedule rows for routes with daily departures. */
  schedule?: Array<{
    departTime: string;
    returnTime?: string;
    runsDaily?: boolean;
    note?: I18n;
  }>;
  images?: ResortImage[];
  /** Marketplace / channel fields — rendered when exporting the CSV. */
  marketplace?: {
    description?: I18n;
    inclusions?: I18n[];
    exclusions?: I18n[];
    meetingPoint?: I18n;
    cancellationPolicy?: I18n;
    channelPriceMultiplier?: number;
  };
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
  images?: ResortImage[];
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
  images?: ResortImage[];
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

export type ArticleTemplate = "news" | "qa" | "comparison" | "guide";

export type AnswerTopic = "getting-there" | "conditions" | "prices" | "gear";

export type ArticleFaq = { q: I18n; a: I18n };

export type ArticleComparisonRow = {
  label: I18n;
  values: I18n[];
};

export type Article = {
  slug: string;
  locale: Locale | "all";
  title: I18n;
  excerpt: I18n;
  /** Rendered as paragraphs split by \n\n. For `qa`/`comparison`/`guide`
   *  it is the long-form body in addition to the structured fields. Can be
   *  empty while the writer drafts. */
  body: I18n;
  category: "news" | "price" | "alert" | "infrastructure" | "event" | "guide";
  template?: ArticleTemplate;
  /** Required for template === "qa"; drives /answers index grouping. */
  topic?: AnswerTopic;
  author: string;
  publishedAt: string;
  /** Last meaningful edit. Required on evergreen Q&A so the UI can show
   *  dateModified without a stale publishedAt. Falls back to publishedAt. */
  updatedAt?: string;
  resort?: ResortSlug;
  route?: RouteSlug;
  isAlert?: boolean;
  /** Target query line, shown in editor + used for `about` schema. */
  targetQuery?: string;
  /** The one-sentence answer that must open a qa page. */
  oneSentenceAnswer?: I18n;
  faqs?: ArticleFaq[];
  comparison?: {
    headers: I18n[];
    rows: ArticleComparisonRow[];
    verdict?: I18n;
  };
  /** Explicit CTA slug (route or resort) to override the default. */
  ctaRoute?: RouteSlug;
  ctaResort?: ResortSlug;
  cover?: string;
  /** True until the writer approves. Drafts render but with noindex. */
  draft?: boolean;
};

export type Price = {
  resort: ResortSlug;
  liftPassDayGel: number;
  liftPassWeekGel: number;
  rentalSetDayGel: number;
  instructorHourGel: number;
  season: string;
  /** ISO date confirming when the figure was last verified. */
  asOf: string;
  /** Where the number came from. */
  source?: string;
};
