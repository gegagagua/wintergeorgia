# 06 — News and events

Two jobs: bring people back daily in season, and win search terms nobody else covers.

## News categories

| Category | Example | Frequency |
|---|---|---|
| Season news | "Gudauri opens on 14 December" | 2–3 per season |
| Price change | "Lift pass up by 5 GEL" | on every change |
| Alert | "Jvari Pass closed — avalanche risk" | same-day, operational |
| Infrastructure | "New lift running at Kudebi" | 3–5 per season |
| Event announcement | "New Year in Gudauri: programme" | 1–2 per week |
| Guide | "First time on skis: where to start" | summer, for SEO |

## Editorial rules

- **Sources:** resort official channels, Roads Department, partner drivers, venue partners.
  Every item carries a source and a timestamp.
- **Alerts are not articles.** They also appear on the status board and go to the Telegram
  channel automatically.
- **Languages:** English first. Russian and Georgian versions immediately — machine
  translation is allowed only after human review; unreviewed translation hurts rankings.
- `NewsArticle` JSON-LD on every item, `datePublished` and `author` required.
- **Every item ends in an action:** road news → transfer booking; price news → prices page;
  event announcement → event page.

## Event page fields

| Field | Content |
|---|---|
| Title, description | three locales, in CMS |
| Start, end | plus a recurrence rule for repeating events |
| Resort and venue | a catalog place, or an address with a map pin |
| Category | party, competition, festival, season opening, family |
| Ticket | price, external link (season 1), internal sale (season 2) |
| Organiser | partner profile from the catalog |
| Media | photos, poster, Open Graph image |
| Transfer | linked route: "getting there — book a transfer" |

## Event rules

- **Organiser submission form.** Venues submit their own events; moderation within 24h,
  confirmation by email.
- **Calendar:** filter by resort, date and category. Month view and list view.
- **Full `schema.org/Event`** — Google surfaces events individually, which is direct traffic.
- **iCal export** and reminders: 3 days before, by email or Telegram.
- **The page survives the event:** afterwards it keeps photos, attendance and a link to the
  next edition. It works again next year.
- **Monetisation from season 2:** featured placement in the calendar, ticket commission,
  home-page banner.

## Subscriptions

Weekly bulletin (snow, road, events in one email) and a Telegram channel per resort. This is
the only way to keep an audience through the off-season.
