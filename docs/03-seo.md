# 03 — SEO architecture

SEO is the main acquisition channel. The transfer module only earns money when the site ranks
top-three for queries like "gudauri transfer from tbilisi".

## Keyword clusters

| Cluster | Example query | Page type |
|---|---|---|
| Transfer | `gudauri transfer from tbilisi airport` | route page with booking |
| Road status | `jvari pass open today` | live status page |
| Resort | `gudauri ski resort guide` | deep resort page |
| Price | `gudauri ski pass price 2027` | prices page, updated yearly |
| Rental | `ski rental gudauri price` | service page |
| Snow | `gudauri snow report` | live data page |
| Comparison | `gudauri or bakuriani` | editorial comparison |
| Event | `new year in gudauri` | event page with schema.org |

Russian mirrors: `трансфер Тбилиси Гудаури`, `Крестовый перевал открыт`, `Гудаури снег`.

## Rendering strategy

| Page | Strategy |
|---|---|
| Resort, route, price, journal, event | SSG, revalidated on CMS publish |
| Road status, snow report | ISR, `revalidate: 900` (15 min) + on-demand revalidation on admin update |
| Booking form, admin | dynamic, `noindex` on admin |

## Technical requirements

- `generateMetadata` on every page: title, description, canonical, Open Graph, Twitter card,
  locale-specific OG image.
- `hreflang` for en / ru / ka plus `x-default` → en on every page.
- **JSON-LD:** `TouristAttraction` (resorts), `Event` (events), `Product` + `Offer`
  (transfer routes), `FAQPage` (FAQ blocks), `BreadcrumbList` (everywhere),
  `NewsArticle` (journal), `Organization` + `WebSite` (root).
- `sitemap.xml` generated per locale from the database, `robots.txt`, IndexNow ping on publish.
- Core Web Vitals: LCP < 2.0s, CLS < 0.1, INP < 200ms. Images via `next/image`, AVIF + WebP.
  Self-host fonts with `next/font`, `display: swap`, preload the two weights actually used.
- No thin pages. If a route does not operate, its page does not exist.

## Programmatic pages

10 live routes × 3 locales = 30 route pages, each with a real price, a real duration, a
driver policy and a booking form. Resort pages and things-to-do pages are hand-written.

## Content calendar

- **June–August:** 30–40 pages — guides, comparisons, prices, how-to-get-there.
- **September–November:** refresh prices for the new season, publish season-opening dates,
  build backlinks with local operators and hotels.
- **December–April:** daily status updates, events, operational warnings.

Starting content work in November misses the first season entirely.

## Measurement

Plausible (or GA4) + Search Console. Track per page: impressions, position, clicks,
booking-form starts, completed bookings. A content page that produces no booking starts
after a season gets rewritten or deleted.
