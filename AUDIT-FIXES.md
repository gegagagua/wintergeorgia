# georgiawinter.net — audit fixes

Audit date: 2026-10-06. Average score: 5.2 / 10. Season opens mid-December.
Pages checked: `/`, `/transfers/tbilisi-airport-gudauri`, `/resorts/gudauri`, `/journal`,
`/road-status`, `/about`.

Work P0 → P1 → P2 → P3. Do not open a new band until every task in the current one passes
its "Done when" check. After each band: `pnpm build`, `pnpm lint`, `pnpm typecheck`.

**Never invent facts.** Review text, company numbers, driver counts, trip counts and prices
come from the owner or the database. If a value is missing, leave `TODO(owner):` in config
and list it at the end — never ship a plausible-looking number.

---

## P0 — Broken. Fix today.

### P0.1 Wrong alternate locale

`/transfers/tbilisi-airport-gudauri` emits `og:locale:alternate` = `de_DE`. There is no
German version of this site. The i18n config is wrong and is sending a false signal.

- locales are exactly: `en` (default), `ru`, `ka`
- emit `og:locale` for the current locale and `og:locale:alternate` only for the other two
- emit `<link rel="alternate" hreflang>` for `en`, `ru`, `ka` and `x-default` → `en`
- audit every page template, not just this one

**Done when:** no page emits any locale outside `en` / `ru` / `ka`, and hreflang on a route
page lists exactly four entries (three locales + x-default), each resolving with HTTP 200.

### P0.2 Future-dated articles

`/journal` shows "Gudauri opens on 14 December" dated **18 Nov** and "Lift pass prices for
2026/27" dated **5 Nov**, while today is 6 Oct. Future `datePublished` can keep a page out
of the index and reads as a quality problem.

- set `published_at` to the real publication date
- block publishing with a future date in the CMS (validation, not a convention)
- `datePublished` in JSON-LD must equal the visible date

**Done when:** no published article has `published_at > now()`, and the CMS rejects a future
date with a clear message.

### P0.3 Nine articles published on the same day

All nine question-answer pages carry 1 Oct. That is a visible bulk-generation footprint.

- spread `published_at` across the weeks they were actually written, or
- drop the visible date entirely on evergreen answer pages (keep `dateModified` only)

**Done when:** no more than two published items share a `published_at` date, or evergreen
answers render without a published date.

### P0.4 Price expectation mismatch

The route page title promises "from 40 GEL"; the booking block shows "180 ₾". A visitor
arriving from that search result sees a price 4.5× what was promised.

- the shared-seat price must be the first thing in the price block on routes where shared
  seats actually run, labelled per person
- private prices labelled per vehicle, with capacity
- the title's "from" price must equal the lowest live price for that route, computed, not typed

**Done when:** the "from" price in metadata is derived from `route_prices` and matches the
first price shown on the page, verified on all 10 routes.

### P0.5 Off-season conditions board (still open from the previous audit)

On 6 Oct the home page shows "0 cm" and "+8 °C" as if measured. This is the first screen of
the site.

Add a season state: `preseason` | `open` | `closed`.
- **preseason:** "Season opens in N days", expected opening date, same-day figures from last
  season if history exists, and a "Notify me when the season opens" capture
- never render `0 cm` as a measurement — render "not measured yet"
- keep the "last updated" timestamp in all states

**Done when:** today's date renders the preseason board with a countdown and a capture form,
and moving the clock past the opening date restores the live board.

---

## P1 — SEO. Biggest return for the least work.

### P1.1 Structured data is missing everywhere

No JSON-LD was found on the route page or the resort page. The FAQs and prices already on
those pages are invisible to search because of it.

Add per template:
- route page → `Product` + `Offer` (price, currency, availability), `FAQPage`, `BreadcrumbList`
- resort page → `TouristAttraction` (+ `geo`), `FAQPage`, `BreadcrumbList`
- answer page → `FAQPage` or `QAPage`, `BreadcrumbList`
- news article → `NewsArticle` with `datePublished`, `dateModified`, `author`
- event page → `Event` with `startDate`, `location`, `offers`
- root → `Organization` (real NAP from config) + `WebSite` with `SearchAction`

All values come from the database — no hand-written JSON-LD blocks in components.

**Done when:** each template validates in Google's Rich Results test with zero errors, and
changing a price in the database changes the `Offer` without a code edit.

### P1.2 Move the answer pages out of the journal

The nine question-answer pages live under `/journal` with dates, as if they were news.
"Do I need snow chains in Georgia?" is not news — it is a permanent answer.

- new section `/answers/[slug]` with its own template (question as H1, answer in the first
  sentence, `FAQPage` JSON-LD, `dateModified` only)
- **301 redirect** every moved URL from `/journal/...` to `/answers/...` — do not lose the
  indexing already earned
- `/journal` keeps news and guides only
- add `/answers` as an index page grouped by topic (getting there, conditions, prices, gear)

**Done when:** every old URL 301s to its new one, no 404s remain in the sitemap, and the
answers index links to all of them.

### P1.3 Internal linking system

Answer pages currently stand alone. Build automatic related blocks from data:
- route page → its resort, the road status for its pass, the reverse route, 2 nearby routes,
  and the 3 answer pages tagged with that route
- resort page → every route serving it, things-to-do, events, answers tagged with it
- road status → every route using that road
- answer page → the route or resort it is about, plus 2 sibling answers

**Done when:** every public page has at least 3 contextual internal links generated from
tags/relations, and a crawl finds no orphan page.

### P1.4 Expand route FAQs

Four questions is a start. Take each route page to 8–10, driven by what people actually ask:
child seats, ski and board carriage, luggage pieces, delayed flights, waiting time at the
airport, stops on the way, card payment on the spot, what happens in a snowstorm, how the
driver is identified, what if fewer passengers turn up.

**Done when:** every active route has at least 8 FAQ entries in all three locales and valid
`FAQPage` markup.

### P1.5 Comparison pages

None exist. These convert well because the reader is still choosing.
Build at minimum: `gudauri-vs-bakuriani`, `best-georgian-resort-for-beginners`,
`tetnuldi-vs-gudauri`, `when-to-ski-in-georgia`. Template: intro, comparison table,
honest verdict per reader type, transfer CTA for each resort.

**Done when:** four comparison pages are live in English with tables built from resort data.

---

## P2 — Content depth.

### P2.1 Resort pages to ~2,000 words

`/resorts/gudauri` is ~1,200 words with no map, no gallery, no FAQ, no rental or ski-school
information. Competing pages carry more on every axis.

Add as CMS-editable structured fields:
- terrain split (% beginner / intermediate / advanced), longest run, vertical drop
- lift table: name, type, capacity, operating hours
- lift pass prices with an "as of" date (day, multi-day, season, child)
- rental shops and ski schools with price ranges, linked to catalog places
- beginner section, parking, storage, where to eat on the mountain
- getting there: every route with live price and duration from the database
- 8–10 question FAQ
- interactive map (MapLibre) with lifts and key places
- gallery, 8–10 real photos

**Done when:** `/resorts/gudauri` passes 1,800 words, has a map and a gallery, valid
`FAQPage` + `TouristAttraction`, and LCP stays under 2.0s.

### P2.2 Route pages: schedule and map

The shared-departure board only exists on the home page, and route pages have no map.
- per-route departure schedule with seat availability, for routes where shared seats run
- a two-point map with distance, duration and the pass crossed
- "what the road is like in winter" paragraph per route, with the live status widget

**Done when:** both components render on all 10 route pages, driven by `schedules` and
`routes` data.

### P2.3 Journal structure

11 items in one flat list, no categories, no tags, no pagination.
- categories: news, guides (answers now live separately)
- tags linked to resorts and routes, used by the internal-link system
- pagination or infinite list, with `rel=prev/next` handled correctly

**Done when:** category and tag pages exist, are linked, and are in the sitemap.

### P2.4 Russian content must actually exist

A locale switcher is not a translation. Verify every page type has real Russian content:
home, the 10 route pages, 6 resort pages, all answer pages, FAQ and the booking flow.
Russian is the second-largest segment for this product.

**Done when:** a crawl of `/ru` returns no page that falls back to English text, and the
booking flow completes in Russian.

---

## P3 — Structure and UX.

### P3.1 Home page has 14 sections

hero, booking, departures, conditions, how it works, fleet, routes, resorts, moments,
events, journal, FAQ, newsletter, footer. Too long, hierarchy unclear.
- merge "moments" into journal
- move "fleet" into the booking block as vehicle-class detail
- target 8–9 sections, with the booking path reachable without scrolling past three screens

**Done when:** the home page has 9 sections or fewer and the primary CTA is visible in the
first viewport at 360px.

### P3.2 Credibility in the hero

Best-in-class operators put proof in the first screen (`mountaindropoffs.com` leads with
"5★ Google & TripAdvisor" and years of experience). This site has nothing there.
Until real reviews exist, show computed facts: routes served, drivers in the network, years
operating — each read from the database or config, with no hardcoded numbers.

**Done when:** the hero shows at least two proof figures, every one of them computed.

### P3.3 Group routes by region

Ten routes in one flat list. Group as: from Tbilisi · from airports · Svaneti · Adjara.
Apply the same grouping in navigation, footer and the `/transfers` index.

**Done when:** the grouping is driven by a field on the route, not hardcoded in the view.

### P3.4 Turn events into sales pages

Season opening and New Year are calendar entries. They should be landing pages that sell the
transfer to that event: what happens, dates, where, how to get there, the exact route and
price, and a booking form on the page.

**Done when:** `/events/[slug]` carries a route-specific booking block and valid `Event` markup.

### P3.5 Make the shared seat visible

The cheapest and most sellable product (40 ₾) is buried under the 180 ₾ private price.
On routes where shared seats run, show the shared option first, with departure times.

**Done when:** shared-seat pricing is the first price on every route that has an active
schedule.

---

## Order

| Week | Band |
|---|---|
| this week | P0 entirely, then P1.1 and P1.2 |
| week 2 | P1.3, P1.4, P1.5 |
| weeks 3–4 | P2.1, P2.2 |
| week 5 | P2.3, P2.4 |
| week 6 | P3 entirely |
| weeks 7–8 | real reviews, marketplace listings, launch campaign |

## References to study before building

| Source | Take |
|---|---|
| mountaindropoffs.com | hero proof, region grouping, event landing pages, named testimonials |
| alpinbus.com | route page structure and price presentation |
| bergfex.com | conditions board logic, snow archive, data-freshness display |
| onthesnow.com / snow-forecast.com | full anatomy of a resort page |
| skiresort.com | terrain breakdown and comparison tables |
| getyourguide.com | product description, inclusions/exclusions, meeting-point copy |
