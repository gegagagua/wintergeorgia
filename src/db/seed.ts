import { sql } from "drizzle-orm";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

/**
 * Seeds the six resorts, the transfer points, the ten operating routes
 * (docs/02-information-architecture.md) and one price row per route/class
 * (docs/08-data-model.md — "seed data").
 * Idempotent: uses INSERT ... ON CONFLICT (slug) DO NOTHING everywhere.
 */
async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to run seeds");
  }
  const client = postgres(connectionString, { max: 1 });
  const db = drizzle(client, { schema });

  // ---------- resorts ----------
  const resortSeeds = [
    {
      slug: "gudauri",
      name: { en: "Gudauri", ru: "Гудаури", ka: "გუდაური" },
      altMin: 1990,
      altMax: 3279,
      lifts: 8,
      lon: 44.4816,
      lat: 42.4794,
    },
    {
      slug: "bakuriani",
      name: { en: "Bakuriani", ru: "Бакуриани", ka: "ბაკურიანი" },
      altMin: 1700,
      altMax: 2702,
      lifts: 6,
      lon: 43.5311,
      lat: 41.7469,
    },
    {
      slug: "tetnuldi",
      name: { en: "Tetnuldi", ru: "Тетнулди", ka: "თეთნულდი" },
      altMin: 2265,
      altMax: 3165,
      lifts: 4,
      lon: 42.9861,
      lat: 43.0292,
    },
    {
      slug: "hatsvali",
      name: { en: "Hatsvali", ru: "Хацвали", ka: "ჰაცვალი" },
      altMin: 1860,
      altMax: 2347,
      lifts: 2,
      lon: 42.6994,
      lat: 43.0272,
    },
    {
      slug: "goderdzi",
      name: { en: "Goderdzi", ru: "Годердзи", ka: "გოდერძი" },
      altMin: 2025,
      altMax: 2390,
      lifts: 2,
      lon: 42.4894,
      lat: 41.6353,
    },
    {
      slug: "kazbegi",
      name: { en: "Kazbegi", ru: "Казбеги", ka: "ყაზბეგი" },
      altMin: 1750,
      altMax: 5033,
      lifts: 0,
      lon: 44.6417,
      lat: 42.6613,
    },
  ] as const;

  for (const r of resortSeeds) {
    await db.execute(sql`
      INSERT INTO resorts (slug, name_i18n, altitude_min_m, altitude_max_m, lifts_total, geom, published)
      VALUES (
        ${r.slug},
        ${sql.raw(`'${JSON.stringify(r.name)}'::jsonb`)},
        ${r.altMin},
        ${r.altMax},
        ${r.lifts},
        ST_SetSRID(ST_MakePoint(${r.lon}, ${r.lat}), 4326)::geography,
        true
      )
      ON CONFLICT (slug) DO NOTHING;
    `);
  }

  // ---------- points ----------
  const pointSeeds = [
    { slug: "tbilisi", name: { en: "Tbilisi", ru: "Тбилиси", ka: "თბილისი" }, kind: "city" as const, lon: 44.7833, lat: 41.7167 },
    { slug: "tbilisi-airport", name: { en: "Tbilisi Airport", ru: "Аэропорт Тбилиси", ka: "თბილისის აეროპორტი" }, kind: "airport" as const, lon: 44.9547, lat: 41.6693 },
    { slug: "kutaisi-airport", name: { en: "Kutaisi Airport", ru: "Аэропорт Кутаиси", ka: "ქუთაისის აეროპორტი" }, kind: "airport" as const, lon: 42.4826, lat: 42.1783 },
    { slug: "batumi", name: { en: "Batumi", ru: "Батуми", ka: "ბათუმი" }, kind: "city" as const, lon: 41.6367, lat: 41.6168 },
    { slug: "zugdidi", name: { en: "Zugdidi", ru: "Зугдиди", ka: "ზუგდიდი" }, kind: "city" as const, lon: 41.8709, lat: 42.5088 },
    { slug: "mestia", name: { en: "Mestia", ru: "Местия", ka: "მესტია" }, kind: "city" as const, lon: 42.7269, lat: 43.0442 },
    { slug: "gudauri", name: { en: "Gudauri", ru: "Гудаури", ka: "გუდაური" }, kind: "resort" as const, lon: 44.4816, lat: 42.4794, resortSlug: "gudauri" },
    { slug: "bakuriani", name: { en: "Bakuriani", ru: "Бакуриани", ka: "ბაკურიანი" }, kind: "resort" as const, lon: 43.5311, lat: 41.7469, resortSlug: "bakuriani" },
    { slug: "tetnuldi", name: { en: "Tetnuldi", ru: "Тетнулди", ka: "თეთნულდი" }, kind: "resort" as const, lon: 42.9861, lat: 43.0292, resortSlug: "tetnuldi" },
    { slug: "hatsvali", name: { en: "Hatsvali", ru: "Хацвали", ka: "ჰაცვალი" }, kind: "resort" as const, lon: 42.6994, lat: 43.0272, resortSlug: "hatsvali" },
    { slug: "goderdzi", name: { en: "Goderdzi", ru: "Годердзи", ka: "გოდერძი" }, kind: "resort" as const, lon: 42.4894, lat: 41.6353, resortSlug: "goderdzi" },
    { slug: "kazbegi", name: { en: "Kazbegi", ru: "Казбеги", ka: "ყაზბეგი" }, kind: "resort" as const, lon: 44.6417, lat: 42.6613, resortSlug: "kazbegi" },
  ];

  for (const p of pointSeeds) {
    const resortSlug = "resortSlug" in p ? p.resortSlug : null;
    await db.execute(sql`
      INSERT INTO points (slug, name_i18n, kind, resort_id, geom)
      VALUES (
        ${p.slug},
        ${sql.raw(`'${JSON.stringify(p.name)}'::jsonb`)},
        ${p.kind},
        ${resortSlug ? sql`(SELECT id FROM resorts WHERE slug = ${resortSlug})` : sql`NULL`},
        ST_SetSRID(ST_MakePoint(${p.lon}, ${p.lat}), 4326)::geography
      )
      ON CONFLICT (slug) DO NOTHING;
    `);
  }

  // ---------- routes ----------
  type RouteSeed = {
    slug: string;
    from: string;
    to: string;
    km: number;
    min: number;
    r4x4?: boolean;
    scheduled?: boolean;
  };
  const routeSeeds: RouteSeed[] = [
    { slug: "tbilisi-airport-gudauri", from: "tbilisi-airport", to: "gudauri", km: 140, min: 150 },
    { slug: "tbilisi-gudauri", from: "tbilisi", to: "gudauri", km: 120, min: 135 },
    { slug: "tbilisi-bakuriani", from: "tbilisi", to: "bakuriani", km: 180, min: 195 },
    { slug: "tbilisi-kazbegi", from: "tbilisi", to: "kazbegi", km: 155, min: 180, r4x4: true },
    { slug: "gudauri-kazbegi", from: "gudauri", to: "kazbegi", km: 35, min: 40, r4x4: true },
    { slug: "kutaisi-airport-mestia", from: "kutaisi-airport", to: "mestia", km: 240, min: 330 },
    { slug: "zugdidi-mestia", from: "zugdidi", to: "mestia", km: 140, min: 165 },
    { slug: "mestia-tetnuldi", from: "mestia", to: "tetnuldi", km: 15, min: 50, r4x4: true, scheduled: true },
    { slug: "mestia-hatsvali", from: "mestia", to: "hatsvali", km: 8, min: 20, r4x4: true },
    { slug: "batumi-goderdzi", from: "batumi", to: "goderdzi", km: 110, min: 210, r4x4: true },
  ];

  for (const r of routeSeeds) {
    await db.execute(sql`
      INSERT INTO routes (slug, from_point_id, to_point_id, distance_km, duration_min, requires_4x4, is_scheduled, active)
      VALUES (
        ${r.slug},
        (SELECT id FROM points WHERE slug = ${r.from}),
        (SELECT id FROM points WHERE slug = ${r.to}),
        ${r.km},
        ${r.min},
        ${r.r4x4 ?? false},
        ${r.scheduled ?? false},
        true
      )
      ON CONFLICT (slug) DO NOTHING;
    `);
  }

  // ---------- route_prices — one row per route/vehicle class ----------
  // Prices in tetri (integer). Placeholder values, must be confirmed with
  // drivers before launch (docs/02-information-architecture.md).
  const priceGrid: Record<string, Partial<Record<"shared" | "sedan" | "minivan" | "suv4x4", { tetri: number; pax: number }>>> = {
    "tbilisi-airport-gudauri": {
      shared: { tetri: 4000, pax: 1 },
      sedan: { tetri: 18000, pax: 3 },
      minivan: { tetri: 26000, pax: 7 },
      suv4x4: { tetri: 30000, pax: 5 },
    },
    "tbilisi-gudauri": {
      shared: { tetri: 3500, pax: 1 },
      sedan: { tetri: 16000, pax: 3 },
      minivan: { tetri: 24000, pax: 7 },
    },
    "tbilisi-bakuriani": {
      sedan: { tetri: 22000, pax: 3 },
      minivan: { tetri: 32000, pax: 7 },
    },
    "tbilisi-kazbegi": {
      suv4x4: { tetri: 35000, pax: 5 },
      minivan: { tetri: 30000, pax: 7 },
    },
    "gudauri-kazbegi": {
      suv4x4: { tetri: 14000, pax: 5 },
    },
    "kutaisi-airport-mestia": {
      minivan: { tetri: 45000, pax: 7 },
    },
    "zugdidi-mestia": {
      minivan: { tetri: 25000, pax: 7 },
    },
    "mestia-tetnuldi": {
      shared: { tetri: 3000, pax: 1 },
      suv4x4: { tetri: 15000, pax: 5 },
    },
    "mestia-hatsvali": {
      suv4x4: { tetri: 8000, pax: 5 },
    },
    "batumi-goderdzi": {
      suv4x4: { tetri: 30000, pax: 5 },
    },
  };

  for (const [slug, prices] of Object.entries(priceGrid)) {
    for (const [vc, meta] of Object.entries(prices)) {
      if (!meta) continue;
      await db.execute(sql`
        INSERT INTO route_prices (route_id, vehicle_class, price_tetri, max_pax, valid_from)
        SELECT id, ${vc}, ${meta.tetri}, ${meta.pax}, DATE '2026-01-01'
        FROM routes WHERE slug = ${slug}
        ON CONFLICT DO NOTHING;
      `);
    }
  }

  // ---------- schedules — mestia-tetnuldi daily shuttle ----------
  await db.execute(sql`
    INSERT INTO schedules (route_id, depart_time, days_of_week, seats_total, active)
    SELECT id, TIME '09:00', ARRAY[1,2,3,4,5,6,7], 12, true
    FROM routes WHERE slug = 'mestia-tetnuldi'
    ON CONFLICT DO NOTHING;
  `);

  await client.end();
  console.log("seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
