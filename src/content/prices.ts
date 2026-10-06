import type { Price } from "./types";

/**
 * Lift-pass prices by resort and season. Every row needs an `asOf` date so
 * the page can render "confirmed on …" next to every figure. The archive
 * at /prices/[year] filters by season.
 *
 * Older rows live in the same array — do not delete them when a new
 * season starts. The year route reads straight off this list.
 */

export const prices: Price[] = [
  {
    resort: "gudauri",
    liftPassDayGel: 90,
    liftPassWeekGel: 470,
    rentalSetDayGel: 45,
    instructorHourGel: 90,
    season: "2026/27",
    asOf: "2026-10-05",
    source: "Gudauri resort office",
  },
  {
    resort: "bakuriani",
    liftPassDayGel: 75,
    liftPassWeekGel: 380,
    rentalSetDayGel: 40,
    instructorHourGel: 80,
    season: "2026/27",
    asOf: "2026-10-05",
    source: "Bakuriani Development Agency",
  },
  {
    resort: "tetnuldi",
    liftPassDayGel: 60,
    liftPassWeekGel: 300,
    rentalSetDayGel: 45,
    instructorHourGel: 100,
    season: "2026/27",
    asOf: "2026-10-05",
    source: "Tetnuldi resort office",
  },
  {
    resort: "hatsvali",
    liftPassDayGel: 40,
    liftPassWeekGel: 190,
    rentalSetDayGel: 40,
    instructorHourGel: 80,
    season: "2026/27",
    asOf: "2026-10-05",
    source: "Hatsvali resort office",
  },
  {
    resort: "goderdzi",
    liftPassDayGel: 50,
    liftPassWeekGel: 240,
    rentalSetDayGel: 40,
    instructorHourGel: 90,
    season: "2026/27",
    asOf: "2026-10-05",
    source: "Goderdzi resort office",
  },
  {
    resort: "kazbegi",
    liftPassDayGel: 0,
    liftPassWeekGel: 0,
    rentalSetDayGel: 60,
    instructorHourGel: 180,
    season: "2026/27",
    asOf: "2026-10-05",
    source: "Guide associations (indicative)",
  },
];

export function pricesBySeason(season: string) {
  return prices.filter((p) => p.season === season);
}

export function allSeasons(): string[] {
  return [...new Set(prices.map((p) => p.season))].sort().reverse();
}
