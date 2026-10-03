# georgiawinter — specification bundle

Drop these files into an empty repository and point Claude Code at it.

```
CLAUDE.md                  project instructions Claude Code reads automatically
PROMPTS.md                 ready-to-paste prompts, one per build phase
design-tokens.css          the design system as CSS variables — import, never re-invent
docs/
  00-overview.md           what the product is, audience, revenue, what is out of scope
  01-brand.md              brand and design system (priority #1)
  02-information-architecture.md   routes, pages, resorts, transfer routes, navigation
  03-seo.md                keyword clusters, rendering strategy, technical SEO, content calendar
  04-transfers.md          the booking module — flow, rules, pricing, notifications
  05-conditions.md         road status, snow, weather, lifts
  06-news-events.md        news categories, editorial rules, event pages and calendar
  07-catalog.md            things-to-do catalog and partner cabinet
  08-data-model.md         full database schema, indexes, seed data
  09-api-and-integrations.md  endpoints, webhooks, integrations, env vars, security
  10-build-plan.md         seven phases with acceptance criteria
```

Start with:

```bash
git init georgiawinter && cd georgiawinter
# copy this bundle in
claude
```

then paste the Phase 0 prompt from `PROMPTS.md`.

Numbers marked approximate (route distances, durations, prices) must be confirmed with real
drivers and resorts before launch.
