# georgiawinter.net — fix list for Claude Code

Audit date: 2026-10-06. Season opens mid-December — roughly 8 weeks.
Work top to bottom. P0 before P1, P1 before P2. Do not start a new priority band
until every task in the current band passes its "Done when" check.

Rules for this whole file:
- **Never invent facts.** Company registration details, driver counts, trip counts, names,
  licence numbers and reviews must come from the owner. If a value is unknown, render the
  block only when the data exists, or leave `TODO(owner):` in a config file — never ship a
  placeholder number or a made-up quote on a live page.
- Every change keeps: light + dark mode, 360px width, keyboard focus, `prefers-reduced-motion`.
- `pnpm build`, `pnpm lint`, `pnpm typecheck` must pass after each task.

---

## P0 — Trust. Nothing else matters if a stranger won't pay.

### P0.1 Rebuild the About page

Today it says only that this is "a transfer booking service based in Tbilisi". That is not
enough for a foreigner paying ~300 GEL by card on an unknown `.net` domain.

Add, driven by a single `config/company.ts` the owner fills in:
- legal entity name + Georgian identification number (ს/ნ)
- registered address and operating base
- founder name + a real photo, one short paragraph of who runs it
- since when the service operates
- how drivers are vetted (documents, insurance, winter tyres, chains) — the real process
- phone, WhatsApp, email, working hours
- optional: a photo of two or three actual drivers with their vehicles

Render each field only if present in config. No placeholders on the live page.

**Done when:** `/about` states a named legal entity, an ID number and a named human, all
read from config, and the page renders cleanly with any single field missing.

### P0.2 Payment trust signals on every booking surface

On route pages, the quick-book form and the checkout step, add a compact trust row:
accepted card brands, "payments processed by <provider>", 3-D Secure note, a link to the
cancellation policy, and the road-closure refund rule in one sentence.

**Done when:** the trust row is visible without scrolling on `/transfers/[slug]` at 360px,
and provider/brand names come from config, not hardcoded in JSX.

### P0.3 Off-season state for the conditions board

In October the board shows "0 cm" and "+8 °C", which reads as a broken site.
Add a season state machine: `preseason` | `open` | `closed`, derived from each resort's
`season_from` / `season_to` plus a manual override in admin.

- **preseason:** "Season opens in N days", last season's figures for the same calendar day
  (from `snow_reports` history, if any), expected opening date, and a "Notify me when the
  season opens" email/Telegram capture.
- **open:** current behaviour.
- **closed:** season summary and a link to summer content.

Never show `0 cm` as if it were a live measurement; show "not measured yet" instead.

**Done when:** with today's date the home page shows a countdown and a capture form, and
forcing the date past the opening date restores the live board.

### P0.4 Social proof that is real

The invented testimonials are gone — good. Do not replace them with new ones.
Build a `reviews` collection fed only by verified sources:
- a post-trip review request (email + WhatsApp) that writes into `reviews` with the booking ref
- an admin screen to approve before publishing
- schema.org `Review` / `AggregateRating` rendered **only** when at least 5 approved reviews exist

Until then, show verifiable facts instead: number of routes served, driver profiles with
photos, partner logos — each computed from the database, not typed in.

**Done when:** no review text can appear on the site without an approved `reviews` row tied
to a real booking, and the aggregate rating block is hidden below 5 reviews.

### P0.5 Driver profiles

Public page per driver: photo, first name, vehicle and plate, languages, years driving,
winter equipment, completed trips (computed). Linked from route pages and from the booking
confirmation.

**Done when:** `/drivers/[slug]` renders from the database, and route pages link to the
drivers who actually serve that route.

---

## P1 — Content depth. This is what ranks and what converts.

### P1.1 Photography everywhere

No resort page currently has an image. Add:
- `images` on resorts, routes, places and events (Cloudflare R2 + `next/image`)
- a gallery component (6–10 photos per resort, lightbox, lazy, AVIF/WebP)
- one strong hero image per resort page and per route page
- `ImageObject` in the page JSON-LD

Owner supplies real photos. Until a real photo exists for an entity, render the contour
illustration panel rather than a stock image. Do not add Unsplash images.

**Done when:** the gallery works at 360px, LCP stays under 2.0s on `/resorts/gudauri`, and
a resort with zero photos still renders correctly.

### P1.2 Deepen resort pages to 1,800–2,500 words

Current pages are ~800–900 words and lose to `gudauri.com`, `snow-forecast.com` and
`onthesnow.com` on completeness. Add to each resort page, as structured content in the CMS:
- terrain split (% beginner / intermediate / advanced), longest run, vertical drop
- lift list with type, capacity and operating hours
- lift pass prices: day, multi-day, season, child, senior — with an "as of" date
- rental shops and ski schools with price ranges (links to catalog places)
- beginner section: where to start, how many days of lessons, what to rent
- parking, storage, accessibility
- where to eat on the mountain
- getting there: all routes with price and duration, pulled from the routes table
- season dates and historical snow by month
- 8–10 question FAQ block with `FAQPage` JSON-LD
- interactive map with lifts and key places (MapLibre)

**Done when:** `/resorts/gudauri` is over 1,800 words, has a map, a gallery and a valid
FAQPage in Google's Rich Results test.

### P1.3 Prices page

A single `/prices` page covering lift passes, rental, instructors, transfers and typical
daily cost per resort, each figure with an "as of" date and a source note. Add a
`/prices/[year]` archive so last season's prices stay indexed.

**Done when:** `/prices` renders from the database (no hardcoded numbers), carries the
as-of dates, and links to booking for every row that is bookable.

### P1.4 Webcams page

`/webcams` aggregating the public resort webcams (embed or link out with attribution —
do not hotlink images where the source forbids it). Group by resort, show last-updated
where available, and put a booking CTA and the conditions board beside them.

**Done when:** the page works with any camera offline, and each camera credits its source.

### P1.5 Journal: 25–30 pages before December

See `CONTENT-PLAN.md` for the exact list of pages, slugs and target queries.
Build the CMS templates these need: question-answer page, comparison page, guide page.

**Done when:** the three templates exist, each with correct metadata and JSON-LD, and at
least the first 10 pages from the plan are published in English.

### P1.6 Internal linking

Only 5 of 10 routes appear in the footer, and pages do not cross-link.
Add automatic related-links blocks:
- route page → its resort, the road status for its pass, the reverse route, two nearby routes
- resort page → all routes serving it, things-to-do, events, journal articles tagged with it
- road status → every route that uses that road
- journal article → the resort/route it is tagged with

**Done when:** every page has at least 3 contextual internal links generated from data, and
no orphan route pages remain.

---

## P2 — Capture and channels.

### P2.1 Capture visitors who are not ready to book

- "Notify me when the season opens" (email + Telegram), in the off-season hero
- weekly bulletin signup in the footer and after journal articles
- price-drop / seat-available alert on scheduled shuttle routes
- double opt-in, unsubscribe, and a `subscriptions` admin view

**Done when:** a subscriber flows end to end, confirmation included, and appears in admin.

### P2.2 Partner and affiliate program

Hotels, apartment hosts, rental shops and bloggers each get a referral code.
- `/partners/apply` form → `partners` table with a generated `referral_code`
- `?ref=CODE` sets a 30-day cookie, stored on the booking, shown in admin
- partner dashboard at `/partners/[code]`: clicks, bookings, commission owed
- printable A5 QR card generator per partner (PDF) for hotel receptions

**Done when:** a booking made through `?ref=` shows its partner and commission in admin, and
the QR PDF renders with the partner's code.

### P2.3 Marketplace readiness

The fastest first-season channel is selling through GetYourGuide, Viator and Daytrip.
They need: a per-route product description, inclusions/exclusions, cancellation terms,
meeting-point text, photos, and an availability rule.
- add `marketplace` fields per route in the CMS (description, inclusions, meeting point)
- an export at `/api/export/marketplace.csv` with one row per route and vehicle class
- a per-route "channel price" field, so marketplace prices can be set above direct prices

**Done when:** the CSV exports every active route with all fields filled for Gudauri and
Bakuriani routes.

### P2.4 Analytics and attribution

- Plausible (or GA4) + Search Console verified
- UTM capture stored on the booking: source, medium, campaign, referral code
- an admin report: bookings by channel, cost per booking (manual spend input), repeat rate
- events: `quote_viewed`, `booking_started`, `booking_paid`, `alert_subscribed`

**Done when:** a booking arriving with UTM parameters shows its source in the admin report.

### P2.5 Hebrew locale

Israel is one of Gudauri's largest inbound markets and almost no local operator serves it.
Add `he` to the locale list with RTL support: `dir="rtl"`, logical CSS properties, mirrored
icons, Hebrew number/date formatting. Translate: home, the three main route pages, Gudauri
resort page, FAQ, booking flow.

**Done when:** `/he` renders correctly RTL at 360px, hreflang includes `he`, and the booking
flow completes in Hebrew.

### P2.6 Google Business Profile and local SEO

Add `LocalBusiness` JSON-LD with the real NAP (name, address, phone) from `config/company.ts`,
matching the Google Business Profile exactly. Add an office/base location page if the owner
has a physical address.

**Done when:** `LocalBusiness` validates and the NAP matches config in every place it appears.

---

## P3 — New products, after December.

- Return-leg offer on the booking confirmation page (one click, pre-filled)
- Live driver tracking page per booking (`/t/[token]`, driver shares location)
- "Fill the car" shared booking: invite link, price drops as seats fill
- Flight-arrival-matched shared departures (night arrivals from TBS)
- Offline voucher / PWA: booking ref, driver contact, pickup address, works with no signal
- Equipment rental and instructor booking with commission
- Day tours (Gudauri → Kazbegi → Gergeti) as a product, not a transfer
- Telegram mini-app booking for the Russian-speaking market

Each of these gets its own spec before it is built. Do not start them before P0–P2 are done.

---

## Order of work

| Week | Focus |
|---|---|
| 1 | P0.1, P0.2, P0.3 |
| 2 | P0.4, P0.5, P1.1 |
| 3–4 | P1.2, P1.3, P1.6 |
| 5 | P1.4, P1.5 (first 10 pages), P2.1 |
| 6 | P2.2, P2.3 |
| 7 | P2.4, P2.6, remaining journal pages |
| 8 | P2.5, QA pass, load check, launch campaign |
