# 50 — Landing References & SEO Strategy

Companion to `03-seo.md`, `04-transfers.md`.

---

## Part 1 — Landing references

### 1. Blacklane — `blacklane.com`
Fixed-price chauffeur, premium density, single accent, no gradients.
- **Hero IS the booking widget** — From/To + date/time, not a form below marketing copy.
- **"Price is final. No hidden fees." badge** on every result — counters Bolt/Yandex surge anxiety.
- **"Why Blacklane" 3-icon strip** after search. Ours: child seat / meet-and-greet / flight tracking.

### 2. Welcome Pickups — `welcomepickups.com`
Airport-to-city positioning identical to ours.
- **Driver photo + name in confirmation UI**, screenshotted on homepage as trust panel.
- **City-landing template reused per destination** — replicate for Gudauri, Bakuriani, Mestia, Kazbegi.
- **Per-city testimonial carousel** — reviewers name the actual airport (SEO + conversion).

### 3. GetTransfer — `gettransfer.com`
Georgia-adjacent, Russian-market native, bilingual UX.
- **Three price tiers side-by-side** (Economy / Business / Minibus) with real vehicle photos.
- **URL pattern `/transfer/[from]/[to]/`** ranks in RU + EN — mirror 1:1.
- **Inline FAQPage schema** on every route page (their main long-tail lever).

### 4. Vail Resorts — `vail.com`
Live conditions + commerce on one page without clutter.
- **"Today on the Mountain" strip** under nav: lifts open, snow 24h, temp → `ConditionsStrip`.
- **Sticky bottom "Buy" bar** post-hero on mobile → `StickyBookBar` via `IntersectionObserver(hero, 0.1)`.
- **Date-first commerce** — calendar step 1, product step 2. Date drives availability.

### 5. Visit Norway — `visitnorway.com`
Best-in-class multilingual tourism board (9 languages, mobile-first).
- **Season-aware modules** swap palette/content Dec–Mar auto → `SeasonalHeroSwitch`.
- **Persistent "Plan your trip" dock**: Where / When / How. Ours: Resort / Dates / Transfer.
- **Native-script switcher**, no flags. Mirror `English / Русский / ქართული`.

### 6. Visit Finland — `visitfinland.com`
~40-component library reused across destination pages — the Payload CMS pattern we need.
- **Scrollytelling intro → hard pivot to booking**. Model `/en/resorts/gudauri`.
- **Month-by-month "best time to visit" strip**. Ours: season calendar + snow-depth sparkline.
- **Source citations under weather data** (FMI). Cite NEA Georgia / lift ops — E-E-A-T.

### 7. Zermatt — `zermatt.ch`
Five languages, dense but readable; conditions fused with sales.
- **Webcam tile grid on homepage** — embed resort cams + Georgian Roads cams on Jvari Pass.
- **"How to get here" top-nav** opens train/car/shuttle/taxi matrix. Lift for `/how-to-get-to-gudauri`.
- **Standardized EAWS 1-5 avalanche pictogram** — status-color discipline we must copy.

### 8. Rome2Rio — `rome2rio.com`
Global reference for "A → B" route pages — our transfer template.
- **Static map thumbnail → interactive on click** — MapLibre hydrates on interaction only.
- **Modes comparison table** (price / duration / frequency). Ours: Shuttle / Private / Marshrutka / Rental.
- **Breadcrumb-driven linking** (Country → City → Route) powers deep-link discovery.

---

## Part 2 — SEO content strategy

### Topic clusters
Hub `/en/ski-georgia` →
- Resort pillars `/resorts/{gudauri,bakuriani,tetnuldi,hatsvali,goderdzi,kazbegi}` — 8-12 children each (trail map, lifts, après-ski, kids, access, snow archive).
- Route pillars `/transfers/[from]-to-[to]` — 24 pairs; each spawns price, timetable, FAQ, review subpages.
- Seasonal: `/snow-report/{resort}` (ISR 15m), `/road-status/jvari-pass` (ISR 5m), `/opening-day-2026`, `/christmas-week-georgia-ski`.
- Evergreen Q&A: `/faq/how-far-is-gudauri-from-tbilisi-airport`, `/faq/gudauri-vs-bakuriani`, `/faq/is-georgia-safe-winter`.

### Schema.org per page type
- Homepage: `WebSite` + `SearchAction`, `Organization`.
- Resort: `TouristDestination` + `SkiResort`, `GeoCoordinates`, `AggregateRating`, `ImageObject`.
- Transfer route: `Service` + `TaxiService`, `Trip`, `Offer`, `AggregateRating`, `Review`, `FAQPage`.
- Snow/road: `Dataset` + `temporalCoverage`, `Place`.
- Journal: `Article`/`NewsArticle`, `Person`. Event: `Event` + `SportsEvent`, `Place`, `Offer`.
- Pricing: `PriceSpecification` in `Offer`. FAQ: `FAQPage`.
- All pages: `BreadcrumbList` + localized `inLanguage`.

### Trilingual specifics
**hreflang** every page (HTML + sitemap): `en→/<path>`, `ru→/ru/<path>`, `ka→/ka/<path>`, `x-default→/<path>`. Reciprocal links. Untranslated stubs: emit hreflang but `noindex` until copy ships.

**Russian / Yandex**: register Yandex.Webmaster, submit sitemap, add `yandex-verification` meta. Yandex still weights exact-match title/H1 heavily — write "Трансфер Тбилиси – Гудаури | фиксированная цена". Skip Turbo. Track in Yandex.Metrica, not just GA4.

**Georgian script**: native Mkhedruli, don't transliterate. `lang="ka"`. Keep Georgian URLs in Latin (`/ka/gudauri`) — reliable crawl + shareable. Low volume, high-intent (resident searches).

### 20-week calendar (Oct 2026 – Mar 2027)
Cadence: 1 journal + automated snow refresh + Events 3wks ahead.

1. Season opening dates → "when does gudauri open 2026"
2. Pricing + early-bird transfers → "gudauri transfer price"
3. Gudauri trail map → "gudauri piste map"
4. Bakuriani family guide → "bakuriani with kids"
5. Gudauri vs Bakuriani refresh → "gudauri vs bakuriani"
6. Jvari Pass driving guide → "jvari pass winter drive"
7. Snow report ISR launch → "gudauri snow report"
8. Opening-day news → "gudauri opening day"
9. Mestia/Tetnuldi access → "how to get to mestia winter"
10. Christmas-week packages → "georgia ski christmas"
11. Lift-pass comparison → "gudauri lift pass price"
12. New Year transfer schedule → "tbilisi gudauri new year transfer"
13. Après-ski Gudauri → "gudauri nightlife"
14. Beginner itinerary → "ski georgia for beginners"
15. Freeride + avalanche → "gudauri freeride"
16. Kutaisi-airport routes → "kutaisi airport to bakuriani"
17. Food on a ski trip → "what to eat gudauri"
18. Goderdzi + Bakhmaro → "goderdzi ski resort"
19. March conditions preview → "skiing georgia march"
20. Spring + closing-week deals → "gudauri closing date 2027"

### Next.js 15 technical SEO
- **ISR**: `revalidate` = 300 snow/road, 3600 route pricing, 86400 resort guides, 604800 FAQ. `revalidateTag` on CMS webhook.
- **Dynamic OG**: `opengraph-image.tsx` at resort + route levels — "Tbilisi → Gudauri · from ₾120 · 2h". Cache 24h.
- **Sitemap**: `sitemap.ts` + `generateSitemaps()` sharded by bucket (resorts, routes, journal, events, faq). Under 10k URLs per shard.
- **robots.txt**: disallow `/api/`, `/admin/`, `/draft/`, `/_next/`. Separate `Sitemap:` line per locale index.
- **301 strategy**: all slug changes via `redirects.ts`; never break `/transfers/*` URLs. Self-referencing canonicals on every page.
- **CWV**: hero image `priority` + `sizes`; MapLibre lazy on interaction; booking widget `use client` only below fold on resort pages.

---

## Part 3 — Prioritized recommendations

1. **`QuickBookWidget` IS the homepage hero** (Blacklane / Welcome Pickups) — route + date, not below marketing copy.
2. **`StickyBookBar` after hero** (Vail) — collapsed widget, mobile-first; +15-30% lift on travel sites.
3. **24 `/transfers/[from]-to-[to]` pages** with Service + Trip + FAQPage + Review JSON-LD — primary SEO assets.
4. **`ConditionsStrip` under global nav** (lift / road / snow) — fuses commerce with utility, drives repeat visits.
5. **Dynamic OG per resort + route** — "Tbilisi → Gudauri · ₾120 · 2h" beats stock photos on social CTR.
6. **Yandex.Webmaster + Yandex.Metrica day one** — RU is 30-40% of addressable traffic; GA alone hides it.
7. **Hreflang via `generateMetadata` on every page**, x-default→en. Validate with Ahrefs Site Audit.
8. **Native-script switcher `English / Русский / ქართული`** (Visit Norway) — no flags, top-right + footer.
9. **`FAQPage` schema on every route and resort page** — 6-10 Q&As. Drives PAA + Yandex snippets.
10. **`SeasonalHeroSwitch`** swaps hero by date (pre-season / open / peak / closing / off-season).
11. **"How to get there" matrix on every resort page** (Zermatt) — row per mode, deep-link to transfer page.
12. **Snow-report routes with `Dataset` schema** — publishable to Google Dataset Search; feeds `ConditionsStrip`.
13. **Driver-photo proof panel on homepage** (Welcome Pickups) — real trust block, not "reliable service" copy.
14. **`ArticleToBookingCta` mandatory in journal articles** — enforces CLAUDE.md §3 (no dead ends).
15. **Sitemap sharded by bucket + per-locale index**, registered in Search Console AND Yandex.Webmaster.
