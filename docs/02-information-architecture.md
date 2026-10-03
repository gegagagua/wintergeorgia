# 02 — Information architecture

## Routing

`app/[locale]/...` with locales `en` (default), `ru`, `ka`.
English is served at the root path; `ru` and `ka` are prefixed. Every page has all three
versions and `hreflang` (`x-default` → English).

| Page | Route | Purpose |
|---|---|---|
| Home | `/` | status board, routes, resorts, upcoming events |
| Resort | `/resorts/[slug]` | full resort profile: slopes, prices, map, how to get there |
| Transfers index | `/transfers` | all routes with prices |
| Route | `/transfers/[from]-[to]` | booking page **and** SEO landing page in one |
| Road status | `/road-status` | Jvari pass and other roads, live |
| Snow report | `/snow-report` | snow depth, lifts, forecast per resort |
| Prices | `/prices` | lift pass, rental, instructor, transfer — one page |
| Things to do | `/things-to-do/[resort]` | catalog: paragliding, quad bikes, tubing, bars |
| Place | `/things-to-do/[resort]/[slug]` | single venue or activity |
| Events | `/events` | calendar with filters |
| Event | `/events/[slug]` | single event, schema.org Event, transfer upsell |
| Journal | `/journal` | news and guides |
| Article | `/journal/[slug]` | single article |
| Partners | `/partners` | driver / hotel / rental shop application form |
| Legal | `/terms`, `/privacy`, `/cancellation` | cancellation policy is linked from every booking |

## Resorts

`gudauri`, `bakuriani`, `tetnuldi`, `hatsvali`, `goderdzi`, `kazbegi`.
One deep page each, not five shallow ones. Kazbegi is described honestly as freeride /
ski-touring, not a lift resort.

## Routes in v1

Only routes that actually operate get a page. No empty pages.

| Route slug | Distance | Duration | Vehicle |
|---|---|---|---|
| `tbilisi-airport-gudauri` | ~140 km | 2.5 h | minivan |
| `tbilisi-gudauri` | ~120 km | 2–2.5 h | sedan, minivan |
| `tbilisi-bakuriani` | ~180 km | 3–3.5 h | sedan, minivan |
| `tbilisi-kazbegi` | ~155 km | 3 h | 4x4 preferred |
| `gudauri-kazbegi` | ~35 km | 40 min | 4x4 |
| `kutaisi-airport-mestia` | 240 km | 5–6 h | minivan |
| `zugdidi-mestia` | 140 km | 2.5–3 h | minivan |
| `mestia-tetnuldi` | 15 km | 40–60 min | 4x4 only, daily shuttle |
| `mestia-hatsvali` | ~8 km | 15–20 min | 4x4 |
| `batumi-goderdzi` | ~110 km | 3–4 h | 4x4 only |

Distances and durations are approximate and must be confirmed with drivers before launch.
Tbilisi → Mestia (480 km, 8–9 h) is **not** sold as a transfer; the page recommends the
Natakhtari flight instead.

## Navigation

Header: logo · Transfers · Resorts · Conditions (road + snow) · Things to do · Events ·
Journal · locale switcher · "Book a transfer" (dawn CTA).
On inner pages the header carries a compact status strip (road + snow + temperature).

Footer: routes by popularity, resorts, legal, partner links, one cross-promo link to
lokacia.ge, Telegram and social.

## Internal linking rule

Resort page → transfer route → road status → booking.
Journal article → the resort or route it is about.
Event → the resort and the transfer route that serves it.
Every page moves the visitor one step closer to a booking.
