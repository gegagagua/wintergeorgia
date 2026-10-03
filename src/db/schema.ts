import { sql } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  time,
  timestamp,
  uuid,
  customType,
} from "drizzle-orm/pg-core";

/**
 * PostGIS geography(Point) / geography(LineString) columns.
 * Stored as EWKT strings in Drizzle; PostGIS parses on write.
 */
const geographyPoint = customType<{ data: string; driverData: string }>({
  dataType: () => "geography(Point, 4326)",
});

const geographyLine = customType<{ data: string; driverData: string }>({
  dataType: () => "geography(LineString, 4326)",
});

type I18n = { en?: string; ru?: string; ka?: string };

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
};

/* ------------------------------ resorts -------------------------------- */
export const resorts = pgTable("resorts", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  nameI18n: jsonb("name_i18n").$type<I18n>().notNull(),
  region: text("region"),
  altitudeMinM: integer("altitude_min_m"),
  altitudeMaxM: integer("altitude_max_m"),
  slopeKm: numeric("slope_km"),
  liftsTotal: integer("lifts_total"),
  seasonFrom: date("season_from"),
  seasonTo: date("season_to"),
  descriptionI18n: jsonb("description_i18n").$type<I18n>(),
  heroImage: text("hero_image"),
  geom: geographyPoint("geom"),
  published: boolean("published").notNull().default(false),
  ...timestamps,
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

/* ------------------------------ points --------------------------------- */
export const points = pgTable("points", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  nameI18n: jsonb("name_i18n").$type<I18n>().notNull(),
  kind: text("kind", { enum: ["city", "airport", "resort", "station"] }).notNull(),
  resortId: uuid("resort_id").references(() => resorts.id),
  geom: geographyPoint("geom"),
  ...timestamps,
});

/* ------------------------------ routes --------------------------------- */
export const routes = pgTable("routes", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  fromPointId: uuid("from_point_id").notNull().references(() => points.id),
  toPointId: uuid("to_point_id").notNull().references(() => points.id),
  distanceKm: numeric("distance_km"),
  durationMin: integer("duration_min"),
  requires4x4: boolean("requires_4x4").notNull().default(false),
  isScheduled: boolean("is_scheduled").notNull().default(false),
  descriptionI18n: jsonb("description_i18n").$type<I18n>(),
  active: boolean("active").notNull().default(true),
  ...timestamps,
});

export const routePrices = pgTable("route_prices", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  routeId: uuid("route_id").notNull().references(() => routes.id),
  vehicleClass: text("vehicle_class", {
    enum: ["shared", "sedan", "minivan", "suv4x4"],
  }).notNull(),
  priceTetri: integer("price_tetri").notNull(),
  maxPax: integer("max_pax").notNull(),
  validFrom: date("valid_from").notNull(),
  validTo: date("valid_to"),
  ...timestamps,
});

export const schedules = pgTable("schedules", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  routeId: uuid("route_id").notNull().references(() => routes.id),
  departTime: time("depart_time").notNull(),
  daysOfWeek: integer("days_of_week").array().notNull(),
  seatsTotal: integer("seats_total").notNull(),
  active: boolean("active").notNull().default(true),
  ...timestamps,
});

/* ------------------------------ bookings ------------------------------- */
export const bookings = pgTable("bookings", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  ref: text("ref").notNull().unique(),
  routeId: uuid("route_id").notNull().references(() => routes.id),
  scheduleId: uuid("schedule_id").references(() => schedules.id),
  travelDate: date("travel_date").notNull(),
  travelTime: time("travel_time").notNull(),
  pax: integer("pax").notNull(),
  luggage: integer("luggage").notNull().default(0),
  skiCount: integer("ski_count").notNull().default(0),
  vehicleClass: text("vehicle_class", {
    enum: ["shared", "sedan", "minivan", "suv4x4"],
  }).notNull(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  locale: text("locale", { enum: ["en", "ru", "ka"] }).notNull(),
  pickupAddress: text("pickup_address"),
  pickupGeom: geographyPoint("pickup_geom"),
  flightNo: text("flight_no"),
  extras: jsonb("extras").$type<{
    childSeat?: boolean;
    skiRack?: boolean;
    returnLeg?: boolean;
  }>(),
  amountTetri: integer("amount_tetri").notNull(),
  commissionTetri: integer("commission_tetri").notNull(),
  status: text("status", {
    enum: ["pending", "paid", "assigned", "completed", "cancelled", "refunded"],
  })
    .notNull()
    .default("pending"),
  driverId: uuid("driver_id").references(() => drivers.id),
  paymentRef: text("payment_ref"),
  cancelledReason: text("cancelled_reason"),
  ...timestamps,
});

/* ------------------------------ drivers -------------------------------- */
export const drivers = pgTable("drivers", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  vehicle: text("vehicle"),
  plate: text("plate"),
  seats: integer("seats"),
  has4x4: boolean("has_4x4").notNull().default(false),
  hasChains: boolean("has_chains").notNull().default(false),
  hasWinterTyres: boolean("has_winter_tyres").notNull().default(false),
  insuranceUntil: date("insurance_until"),
  licenceRef: text("licence_ref"),
  commissionPct: numeric("commission_pct"),
  rating: numeric("rating"),
  active: boolean("active").notNull().default(true),
  notes: text("notes"),
  ...timestamps,
});

/* ------------------------------ roads ---------------------------------- */
export const roads = pgTable("roads", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  nameI18n: jsonb("name_i18n").$type<I18n>().notNull(),
  geom: geographyLine("geom"),
  ...timestamps,
});

export const roadStatus = pgTable("road_status", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  roadId: uuid("road_id").notNull().references(() => roads.id),
  status: text("status", { enum: ["open", "limited", "closed"] }).notNull(),
  restriction: text("restriction", {
    enum: ["none", "chains", "4x4_only", "lorries_banned"],
  })
    .notNull()
    .default("none"),
  noteI18n: jsonb("note_i18n").$type<I18n>(),
  source: text("source", { enum: ["api", "operator", "driver"] }).notNull(),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ------------------------------ snow ----------------------------------- */
export const snowReports = pgTable("snow_reports", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  resortId: uuid("resort_id").notNull().references(() => resorts.id),
  baseCm: integer("base_cm"),
  topCm: integer("top_cm"),
  new24hCm: integer("new_24h_cm"),
  tempC: numeric("temp_c"),
  windMs: numeric("wind_ms"),
  visibility: text("visibility"),
  liftsOpen: integer("lifts_open"),
  liftsTotal: integer("lifts_total"),
  measuredAt: timestamp("measured_at", { withTimezone: true }).notNull().defaultNow(),
  source: text("source"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ------------------------------ places --------------------------------- */
export const places = pgTable("places", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  resortId: uuid("resort_id").references(() => resorts.id),
  category: text("category").notNull(),
  nameI18n: jsonb("name_i18n").$type<I18n>().notNull(),
  descriptionI18n: jsonb("description_i18n").$type<I18n>(),
  priceFromTetri: integer("price_from_tetri"),
  hours: jsonb("hours"),
  phone: text("phone"),
  bookingUrl: text("booking_url"),
  images: jsonb("images").$type<string[]>(),
  geom: geographyPoint("geom"),
  tags: text("tags").array(),
  partnerId: uuid("partner_id").references(() => partners.id),
  featuredUntil: timestamp("featured_until", { withTimezone: true }),
  published: boolean("published").notNull().default(false),
  ...timestamps,
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
});

/* ------------------------------ events --------------------------------- */
export const events = pgTable("events", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  resortId: uuid("resort_id").references(() => resorts.id),
  placeId: uuid("place_id").references(() => places.id),
  titleI18n: jsonb("title_i18n").$type<I18n>().notNull(),
  bodyI18n: jsonb("body_i18n").$type<I18n>(),
  category: text("category").notNull(),
  startsAt: timestamp("starts_at", { withTimezone: true }).notNull(),
  endsAt: timestamp("ends_at", { withTimezone: true }),
  recurrence: jsonb("recurrence"),
  ticketPriceTetri: integer("ticket_price_tetri"),
  ticketUrl: text("ticket_url"),
  organiserPartnerId: uuid("organiser_partner_id").references(() => partners.id),
  routeId: uuid("route_id").references(() => routes.id),
  images: jsonb("images").$type<string[]>(),
  featured: boolean("featured").notNull().default(false),
  status: text("status", {
    enum: ["draft", "pending", "published", "past"],
  })
    .notNull()
    .default("draft"),
  ...timestamps,
});

/* ------------------------------ articles ------------------------------- */
export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: text("slug").notNull().unique(),
  locale: text("locale", { enum: ["en", "ru", "ka"] }).notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  cover: text("cover"),
  category: text("category"),
  sourceUrl: text("source_url"),
  sourceName: text("source_name"),
  author: text("author"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  resortId: uuid("resort_id").references(() => resorts.id),
  routeId: uuid("route_id").references(() => routes.id),
  isAlert: boolean("is_alert").notNull().default(false),
  ...timestamps,
});

/* ------------------------------ partners ------------------------------- */
export const partners = pgTable("partners", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type", {
    enum: ["driver", "hotel", "rental", "school", "venue", "organiser"],
  }).notNull(),
  name: text("name").notNull(),
  contactName: text("contact_name"),
  phone: text("phone"),
  email: text("email"),
  commissionPct: numeric("commission_pct"),
  referralCode: text("referral_code").unique(),
  status: text("status", { enum: ["applied", "active", "paused"] })
    .notNull()
    .default("applied"),
  notes: text("notes"),
  ...timestamps,
});

/* ------------------------------ subscriptions ------------------------- */
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  channel: text("channel", { enum: ["email", "telegram"] }).notNull(),
  address: text("address").notNull(),
  locales: text("locales").array(),
  resorts: uuid("resorts").array(),
  topics: text("topics").array(),
  confirmedAt: timestamp("confirmed_at", { withTimezone: true }),
  unsubscribedAt: timestamp("unsubscribed_at", { withTimezone: true }),
  ...timestamps,
});

/* ------------------------------ leads ---------------------------------- */
export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  kind: text("kind", {
    enum: ["rental", "car_rental", "accommodation", "ticket"],
  }).notNull(),
  partnerId: uuid("partner_id").references(() => partners.id),
  targetUrl: text("target_url").notNull(),
  sourcePage: text("source_page"),
  bookingId: uuid("booking_id").references(() => bookings.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ------------------------------ audit ---------------------------------- */
export const auditLog = pgTable("audit_log", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  actorId: uuid("actor_id"),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: uuid("entity_id"),
  diff: jsonb("diff"),
  ip: text("ip"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
