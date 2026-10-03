# 09 — API, integrations, environment

Route handlers under `app/api/`. Server Actions for forms in the same app. Zod at every
boundary. Rate-limit every public POST.

## Public endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/conditions` | current road status + snow per resort (cached 5 min) |
| GET | `/api/routes/[slug]/quote` | price for a route + class + pax + extras |
| POST | `/api/bookings` | create booking → returns payment redirect |
| POST | `/api/bookings/[ref]/cancel` | cancel with policy applied |
| GET | `/api/events` | filtered event list (resort, date, category) |
| POST | `/api/events/submit` | organiser submission → moderation queue |
| POST | `/api/partners/apply` | driver / venue / hotel application |
| POST | `/api/subscribe` | email or Telegram subscription (double opt-in) |
| GET | `/api/og/[...slug]` | dynamic Open Graph image |

## Webhooks

| Source | Path | Notes |
|---|---|---|
| Bank (BOG/TBC) | `/api/webhooks/payment` | verify signature, idempotent by payment ref |
| QStash | `/api/webhooks/queue/[job]` | verify QStash signature |
| CMS publish | `/api/webhooks/revalidate` | on-demand ISR + IndexNow ping |

## Integrations

- **Payments:** BOG or TBC e-commerce, plus Apple Pay / Google Pay. Charge in GEL. Refunds
  must be callable from admin. Store only the provider reference, never card data.
- **WhatsApp Business API** for confirmations and driver details; email fallback (Resend or
  SendGrid) always sent too.
- **Telegram Bot** for the alert channel and for driver dispatch notifications.
- **Weather API** for forecast; resort-reported numbers entered in admin override it.
- **MapTiler** for map tiles with a custom winter style.
- **Cloudflare R2** for images via `next/image` loader.

## Environment variables

```
DATABASE_URL=
REDIS_URL=
QSTASH_TOKEN=
QSTASH_SIGNING_KEY=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_MAPTILER_KEY=
PAYMENT_PROVIDER=            # bog | tbc
PAYMENT_CLIENT_ID=
PAYMENT_SECRET=
PAYMENT_WEBHOOK_SECRET=
WHATSAPP_TOKEN=
WHATSAPP_PHONE_ID=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ALERT_CHANNEL=
RESEND_API_KEY=
WEATHER_API_KEY=
R2_ACCOUNT_ID=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET=
PAYLOAD_SECRET=
ADMIN_ALLOWED_EMAILS=
INDEXNOW_KEY=
```

## Security and compliance

- Georgian personal data law: show a customer's phone number only to the assigned driver, and
  only from 24h before the trip.
- Bot protection on every public form (Turnstile) and rate limiting per IP and per phone.
- Row-level access in admin by role: `operator`, `editor`, `owner`.
- Daily backups, 14-day point-in-time recovery.
- Sentry for errors; alert the owner when a payment webhook fails twice.
