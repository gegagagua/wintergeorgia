# 08 — Data model

PostgreSQL 16 + PostGIS, Drizzle ORM. Every table has `id uuid v7`, `created_at`,
`updated_at`, and soft-deletable tables add `deleted_at`.
Money: integers in tetri (`price_tetri`), never floats. Timestamps: `timestamptz`, UTC.
Translated text: `jsonb` keyed by locale (`{"en": "...", "ru": "...", "ka": "..."}`).

## Core tables

```
resorts
  slug unique, name_i18n jsonb, region, altitude_min_m, altitude_max_m,
  slope_km, lifts_total, season_from, season_to, description_i18n jsonb,
  hero_image, geom geography(Point), published boolean

points                      -- anything a route can start or end at
  slug unique, name_i18n jsonb, kind ('city'|'airport'|'resort'|'station'),
  resort_id nullable, geom geography(Point)

routes
  slug unique,               -- e.g. 'tbilisi-airport-gudauri'
  from_point_id, to_point_id, distance_km, duration_min,
  requires_4x4 boolean, is_scheduled boolean,   -- true for mestia-tetnuldi
  description_i18n jsonb, active boolean

route_prices
  route_id, vehicle_class ('shared'|'sedan'|'minivan'|'suv4x4'),
  price_tetri int, max_pax int, valid_from, valid_to

schedules                   -- only for is_scheduled routes
  route_id, depart_time time, days_of_week int[], seats_total int, active boolean

bookings
  ref text unique,          -- human-readable, e.g. GW-7QX2M9  (ASCII only)
  route_id, schedule_id nullable, travel_date date, travel_time time,
  pax int, luggage int, ski_count int, vehicle_class,
  customer_name, phone, email, locale,
  pickup_address text, pickup_geom geography(Point), flight_no text,
  extras jsonb,             -- child_seat, ski_rack, return_leg
  amount_tetri int, commission_tetri int,
  status ('pending'|'paid'|'assigned'|'completed'|'cancelled'|'refunded'),
  driver_id nullable, payment_ref, cancelled_reason

drivers
  name, phone, vehicle, plate, seats, has_4x4, has_chains, has_winter_tyres,
  insurance_until date, licence_ref, commission_pct numeric,
  rating numeric, active boolean, notes

roads
  slug unique, name_i18n jsonb, geom geography(LineString)

road_status
  road_id, status ('open'|'limited'|'closed'),
  restriction ('none'|'chains'|'4x4_only'|'lorries_banned'),
  note_i18n jsonb, source ('api'|'operator'|'driver'), recorded_at
  -- append-only: the current status is the latest row per road

snow_reports
  resort_id, base_cm, top_cm, new_24h_cm, temp_c, wind_ms, visibility,
  lifts_open, lifts_total, measured_at, source
  -- append-only: history becomes content in season two

places                      -- things-to-do catalog
  slug unique, resort_id, category, name_i18n jsonb, description_i18n jsonb,
  price_from_tetri, hours jsonb, phone, booking_url, images jsonb,
  geom geography(Point), tags text[], partner_id nullable,
  featured_until timestamptz, published boolean

events
  slug unique, resort_id, place_id nullable, title_i18n jsonb, body_i18n jsonb,
  category, starts_at, ends_at, recurrence jsonb nullable,
  ticket_price_tetri nullable, ticket_url, organiser_partner_id nullable,
  route_id nullable,        -- the transfer upsell
  images jsonb, featured boolean, status ('draft'|'pending'|'published'|'past')

articles
  slug unique, locale, title, excerpt, body, cover, category,
  source_url, source_name, author, published_at, resort_id nullable,
  route_id nullable, is_alert boolean

partners
  type ('driver'|'hotel'|'rental'|'school'|'venue'|'organiser'),
  name, contact_name, phone, email, commission_pct, referral_code unique,
  status ('applied'|'active'|'paused'), notes

subscriptions
  channel ('email'|'telegram'), address, locales text[], resorts uuid[],
  topics text[], confirmed_at, unsubscribed_at

leads                       -- affiliate / commission click-outs
  kind ('rental'|'car_rental'|'accommodation'|'ticket'),
  partner_id nullable, target_url, source_page, booking_id nullable, created_at

audit_log
  actor_id, action, entity, entity_id, diff jsonb, ip, created_at
```

## Indexes

- `routes(slug)`, `route_prices(route_id, vehicle_class, valid_from)`
- `bookings(travel_date, status)`, `bookings(driver_id, travel_date)`, `bookings(ref)`
- `road_status(road_id, recorded_at desc)`, `snow_reports(resort_id, measured_at desc)`
- `events(starts_at)` partial where `status = 'published'`
- GIST on every `geom`
- `places(resort_id, category)` partial where `published`

## Seed data

Seed the six resorts, the points, the ten routes from `docs/02-information-architecture.md`
with their distances and durations, and one price row per route/class so the booking flow is
testable end to end from day one.
