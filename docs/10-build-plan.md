# 10 — Build plan

Seven phases. Do not start a phase before the previous one passes its acceptance criteria.
Each phase ends with `pnpm build`, `pnpm lint`, `pnpm typecheck` green.

---

## Phase 0 — Scaffold (2–3 days)

- Next.js 15 App Router + TypeScript strict, pnpm, Tailwind 4, shadcn/ui.
- Import `design-tokens.css` into `app/globals.css`. Wire the tokens into the Tailwind theme.
- `next-intl` with `en` / `ru` / `ka`, `messages/{locale}.json`, locale switcher.
- Drizzle + Postgres connection, first migration, `pnpm db:seed` from `docs/08-data-model.md`.
- Base layout: header, footer, dark mode, focus styles, `prefers-reduced-motion`.

**Done when:** a themed empty home page renders in all three locales, light and dark, at 360px.

---

## Phase 1 — Design system in code (1 week)

Build these before any feature, as a `/dev/components` page:
status board, status pill, card, button set, price, table, form controls, map container,
breadcrumb, section header, empty state, alert banner.

**Done when:** every component matches `docs/01-brand.md`, is keyboard-accessible,
and looks right in both themes. Take screenshots and check them against the spec.

---

## Phase 2 — Content pages (1.5 weeks)

- Payload CMS mounted in the app; collections: resorts, places, events, articles.
- Resort pages, prices page, journal index and article pages.
- `generateMetadata`, JSON-LD, hreflang, sitemap, robots.
- Real content for Gudauri and Bakuriani; the rest can be placeholder until launch.

**Done when:** Lighthouse SEO 100 and performance ≥ 90 on a resort page; sitemap lists all
locales.

---

## Phase 3 — Transfers and payments (2.5 weeks)

- Route index and route pages from the database.
- Booking flow exactly as `docs/04-transfers.md` — quote, form, payment, confirmation.
- Payment provider integration + webhook, idempotent, with refund support.
- Notifications through QStash: confirmation, T-12h driver details, T-2h, post-trip.
- Admin: bookings list, driver assignment, refund, price editor.
- Playwright test covering the whole booking flow, kept green from here on.

**Done when:** a real card payment in the provider's test mode produces a paid booking, a
confirmation message and an admin row.

---

## Phase 4 — Conditions (1 week)

- Road status and snow report pages, ISR 15 min + on-demand revalidation.
- Status board on the home page and the compact strip in the header.
- Admin entry for operators; weather API for forecast.
- The `closed` road rule: bookings on that route auto-reschedule or refund.
- Telegram alert channel push.

**Done when:** flipping a road to `closed` in admin updates the site within a minute and
triggers the booking rule.

---

## Phase 5 — Catalog, events, news (1.5 weeks)

- Things-to-do catalog and place pages.
- Event calendar, event pages, `schema.org/Event`, iCal export, organiser submission form
  with moderation.
- Journal alerts that post to Telegram and appear on the status board.
- Subscriptions: double opt-in email + Telegram, weekly bulletin job.

**Done when:** an event submitted through the public form appears after moderation, with valid
structured data in Google's Rich Results test.

---

## Phase 6 — Launch (2 weeks)

- Content: 30+ SEO pages live, three locales, prices confirmed with partners.
- Driver network onboarded, real prices in `route_prices`, driver profiles filled.
- Analytics, Search Console, IndexNow, sitemap submitted.
- Load check for the December peak; error alerting live.
- Partner QR codes for hotels and apartment hosts.

**Done when:** a booking placed by a real customer completes end to end, and the first ten
SEO pages are indexed.

---

## Timeline

Design and Phase 0–1 run in parallel with content writing. Calendar: start in **June**,
launch by **mid-November**, first full season December–April.

## Priorities if time runs short

Cut in this order: catalog → events → news → conditions detail.
**Never cut:** design quality, the booking flow, road status, SEO fundamentals.
