# 05 — Conditions module (road, snow, weather, lifts)

The reason people open the site every morning in season. This is data, not articles.

## Road status

Roads tracked: Jvari Pass (Tbilisi–Gudauri–Kazbegi), Goderdzi Pass, Mestia road, Bakuriani road.

Fields: status (`open` / `limited` / `closed`), restriction (`chains required`, `4x4 only`,
`lorries banned`), free-text note (3 locales), `updated_at`, source.

Sources: the Roads Department feed, plus manual confirmation from partner drivers via the
admin panel. Automated data always needs local confirmation — show whichever is more recent
and always show the timestamp.

A `closed` status automatically triggers the booking rule in `docs/04-transfers.md`.

## Snow report

Per resort: base depth, top depth, new snow in 24h, temperature, wind, visibility,
lifts open / lifts total, 5-day forecast, measured-at timestamp.

Source: weather API + resort official numbers entered in admin. Keep history — in season two
this becomes content ("last year on this date there was 120 cm").

## Lifts

Which lifts run today, operating hours, lift pass price. Updated daily in season.

## Presentation

- Home page: the status board (four cells).
- `/road-status` and `/snow-report`: full pages, ISR 15 minutes, on-demand revalidation when
  an operator updates a value.
- Inner pages: compact status strip in the header.
- Every status page carries a booking CTA: road status → transfer, snow report → rental/lessons.

## Data freshness rules

- Never show a value without its timestamp.
- If data is older than 24h in season, show it greyed with "not updated today".
- Alerts (closures, avalanche warnings) push to the Telegram channel and to subscribers
  immediately, and also appear as a journal entry.
