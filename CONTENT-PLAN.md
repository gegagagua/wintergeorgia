# Content plan — 30 pages before December

Build order is top to bottom: the question-answer pages first, because they rank fastest and
they are where the booking intent already is.

Rules:
- English first. Russian translation for every page marked `ru`. Georgian for the local set.
- Every page answers its question in the **first sentence**, then explains.
- Every page ends in a booking action matched to its topic.
- Every price carries an "as of" date. Every claim about roads or snow carries a source.
- Never publish a page that repeats another page's answer — merge instead.

## A. Question-answer pages (template: `qa`)

These target queries people type the week they travel. Short pages, 400–700 words, one
`FAQPage` block each, a conditions widget where relevant.

| Slug | Target query | Locales | CTA |
|---|---|---|---|
| `is-jvari-pass-open` | is jvari pass open today | en, ru | road status + transfer |
| `do-i-need-snow-chains-georgia` | do i need snow chains in georgia | en, ru | 4x4 transfer |
| `tbilisi-to-gudauri-how-to-get-there` | how to get from tbilisi to gudauri | en, ru, ka | route page |
| `how-much-is-taxi-tbilisi-gudauri` | taxi tbilisi to gudauri price | en, ru | fixed-price transfer |
| `is-gudauri-open-today` | is gudauri open / lifts working | en, ru | snow report |
| `gudauri-lift-pass-price` | gudauri ski pass price | en, ru | prices page |
| `how-long-tbilisi-to-gudauri` | how long does it take to gudauri | en, ru | route page |
| `tbilisi-airport-night-arrival` | arriving at tbilisi airport at night, how to get to gudauri | en, ru | airport route |
| `can-you-drive-to-gudauri-yourself` | driving to gudauri in winter, is it safe | en, ru | transfer |
| `how-to-get-to-mestia-in-winter` | how to get to mestia / tetnuldi in winter | en, ru | kutaisi–mestia |
| `is-goderdzi-pass-open` | goderdzi pass open / road condition | en, ru | batumi–goderdzi |
| `getting-to-tetnuldi-from-mestia` | mestia to tetnuldi transport | en | shuttle |

## B. Comparison pages (template: `comparison`)

1,000–1,500 words, honest, with a table. These convert because the reader is still choosing.

| Slug | Target query | Locales |
|---|---|---|
| `gudauri-vs-bakuriani` | gudauri or bakuriani | en, ru |
| `best-ski-resort-georgia-beginners` | best georgian resort for beginners | en, ru |
| `gudauri-vs-european-resorts-cost` | is skiing in georgia cheap | en |
| `svaneti-vs-gudauri` | tetnuldi vs gudauri, is svaneti worth it | en |
| `georgia-ski-season-when-to-go` | best time to ski in georgia | en, ru |

## C. Guides (template: `guide`)

1,500–2,500 words, the pages that earn links.

| Slug | Target query | Locales |
|---|---|---|
| `skiing-in-georgia-complete-guide` | skiing in georgia | en, ru |
| `gudauri-first-timer-guide` | gudauri for beginners / first time | en, ru |
| `what-to-pack-ski-trip-georgia` | what to pack skiing georgia | en |
| `georgia-ski-trip-cost-breakdown` | how much does a ski trip to georgia cost | en, ru |
| `freeride-and-heliski-georgia` | heliski georgia, freeride gudauri | en, ru |
| `family-ski-holiday-georgia` | skiing in georgia with kids | en, ru |
| `georgia-ski-trip-7-day-itinerary` | georgia ski itinerary | en |
| `apres-ski-gudauri` | gudauri nightlife, apres ski | en, ru |

## D. Seasonal and operational (published as they happen)

| Slug pattern | When |
|---|---|
| `season-opening-2026-27` | as soon as resorts confirm dates |
| `lift-pass-prices-2026-27` | on every price change |
| `new-year-in-gudauri-2027` | by 1 November |
| `road-closed-<date>` | same day, when a pass closes |
| `snow-report-weekly` | weekly through the season |

## E. Local market (Georgian)

| Slug | Audience |
|---|---|
| `ka/gudauri-shabat-kviris-shatli` | weekend shuttle from Tbilisi |
| `ka/gudauri-pasebi` | local price guide |
| `ka/bakuriani-ojaxuri-dasveneba` | family trips to Bakuriani |

## Per-page checklist

- [ ] answer in the first sentence
- [ ] `generateMetadata` with locale-specific OG image
- [ ] JSON-LD: `FAQPage` (qa), `Article` (guides), `BreadcrumbList` everywhere
- [ ] at least 3 internal links: resort, route, conditions
- [ ] booking CTA matched to the topic
- [ ] "as of" date on every figure
- [ ] real photo or contour illustration — never stock
- [ ] `ru` version queued for translation and human review before publishing
