/**
 * Season state machine. Derived per resort from the `seasonFrom`/`seasonTo`
 * dates in content/resorts.ts, plus a manual override here for the owner to
 * force a state (e.g. force "closed" after an avalanche shuts the mountain
 * for the year).
 */

import { resorts } from "@/content/resorts";
import { snow } from "@/content/roads";
import type { Resort, ResortSlug } from "@/content/types";

export type SeasonState = "preseason" | "open" | "closed";

export type SeasonSnapshot = {
  state: SeasonState;
  /** Opening date (ISO) if known. */
  opensOn?: string;
  /** Closing date (ISO) if known. */
  closesOn?: string;
  /** Days to open; only meaningful when state === 'preseason'. */
  daysToOpen?: number;
  /** Reason to override, when present (admin message). */
  reason?: string;
};

/**
 * Admin overrides. Add an entry here to force a state. Keyed by resort slug.
 * Leave the file empty-object for a pure date-driven state.
 */
export const seasonOverrides: Partial<
  Record<ResortSlug, { state: SeasonState; reason?: string }>
> = {
  // TODO(owner): e.g. { gudauri: { state: "closed", reason: "Lift inspection extended to 20 Dec" } }
};

function parseIsoDate(d: string): Date | undefined {
  const t = new Date(d);
  return Number.isNaN(t.getTime()) ? undefined : t;
}

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / 86_400_000);
}

export function seasonStateFor(resort: Resort, now: Date = new Date()): SeasonSnapshot {
  const override = seasonOverrides[resort.slug as ResortSlug];
  const from = resort.seasonFrom ? parseIsoDate(resort.seasonFrom) : undefined;
  const to = resort.seasonTo ? parseIsoDate(resort.seasonTo) : undefined;

  if (override) {
    return {
      state: override.state,
      opensOn: resort.seasonFrom,
      closesOn: resort.seasonTo,
      daysToOpen: from && override.state === "preseason" ? Math.max(0, daysBetween(now, from)) : undefined,
      reason: override.reason,
    };
  }

  if (from && now < from) {
    return {
      state: "preseason",
      opensOn: resort.seasonFrom,
      closesOn: resort.seasonTo,
      daysToOpen: Math.max(0, daysBetween(now, from)),
    };
  }

  if (to && now > to) {
    return { state: "closed", opensOn: resort.seasonFrom, closesOn: resort.seasonTo };
  }

  return { state: "open", opensOn: resort.seasonFrom, closesOn: resort.seasonTo };
}

/**
 * Return a snow report only when the resort is in-season. In preseason we
 * NEVER show "0 cm" — the UI shows "not measured yet" instead.
 */
export function liveSnowFor(resort: Resort, now: Date = new Date()) {
  const snap = seasonStateFor(resort, now);
  if (snap.state !== "open") return null;
  return snow.find((s) => s.resort === resort.slug) ?? null;
}

/** Convenience: the aggregate state across all lift-served resorts. */
export function anyResortOpen(now: Date = new Date()): boolean {
  return resorts.some((r) => r.isLiftResort && seasonStateFor(r, now).state === "open");
}

/** Convenience: the next opening date across the resort list. */
export function nextOpeningDate(now: Date = new Date()): { date: string; resort: Resort } | null {
  const upcoming = resorts
    .filter((r) => r.isLiftResort && r.seasonFrom)
    .map((r) => ({ r, d: parseIsoDate(r.seasonFrom!) }))
    .filter((x): x is { r: Resort; d: Date } => x.d instanceof Date && x.d >= now)
    .sort((a, b) => a.d.getTime() - b.d.getTime());
  const first = upcoming[0];
  if (!first) return null;
  return { date: first.r.seasonFrom!, resort: first.r };
}
