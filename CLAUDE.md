# georgiawinter — project instructions for Claude Code

Read `docs/00-overview.md` first, then the doc for whatever phase you are on.
Build order and acceptance criteria live in `docs/10-build-plan.md`. Follow it phase by phase.
Do not start a later phase before the current one passes its acceptance criteria.

## What this is

A multilingual (en / ru / ka) site for Georgia's winter resorts. The site sells
**transfers** and local **shuttles**; everything else (road status, snow reports, prices,
things-to-do catalog, news, events) exists to bring organic traffic to those booking pages.

There is **no hotel inventory and no hotel booking**. Hotels appear only as affiliate links
and as a partner sales channel (QR code at reception → commission).

## Non-negotiables

1. **Design is priority #1.** Every screen must look like a professional designer made it.
   `docs/01-brand.md` is binding: use the tokens in `design-tokens.css` verbatim, never invent
   colors, never add gradients, never add a second accent color.
2. **SEO is the main channel, not an afterthought.** Every public page is statically generated
   or ISR, has `generateMetadata`, JSON-LD, and hreflang. See `docs/03-seo.md`.
3. **Every content page ends in a booking action.** A page with no next step is a bug.
4. **Status colors** (open / limited / closed) are only used for status, never as decoration,
   and are always paired with text (colorblind users).
5. **Accessibility:** WCAG 2.2 AA, visible keyboard focus, `prefers-reduced-motion` respected.
6. **Georgian text:** line-height 1.65, never all-caps (Georgian has no uppercase).

## Stack

- Next.js 15, App Router, TypeScript strict
- Tailwind CSS 4 + shadcn/ui (tokens from `design-tokens.css`)
- PostgreSQL 16 + PostGIS, Drizzle ORM
- Payload CMS (self-hosted, inside the Next app) for journal / catalog / events
- Upstash Redis + QStash for caching and queued notifications
- MapLibre GL + MapTiler for maps
- BOG or TBC e-commerce for payments; WhatsApp Business API + email for confirmations
- Deployed on Vercel (or Cloudflare) + Neon, EU region

## Conventions

- `app/[locale]/...` routing; locales `en` (default), `ru`, `ka`. `en` has no redirect penalty:
  `/` serves `en`.
- Server Components by default. Client Components only for interactive widgets
  (booking form, calendar, map, filters).
- All user-facing strings come from `messages/{locale}.json` — never hardcode copy in components.
- Money is stored in minor units (tetri) as integers. Never floats.
- All timestamps stored UTC; displayed in `Asia/Tbilisi`.
- Validation with Zod at every boundary (form, API route, webhook).
- No `any`. No `@ts-ignore` without a comment explaining why.

## Commands

```bash
pnpm dev            # local dev
pnpm build          # production build — must pass before any phase is "done"
pnpm lint           # eslint + prettier
pnpm typecheck      # tsc --noEmit
pnpm db:generate    # drizzle-kit generate
pnpm db:migrate     # apply migrations
pnpm db:seed        # seed resorts, routes, prices from docs/08-data-model.md
pnpm test           # vitest
pnpm e2e            # playwright — booking flow must stay green
```

## Definition of done for any feature

- `pnpm build`, `pnpm lint`, `pnpm typecheck` pass
- Renders correctly in light and dark mode
- Works at 360px width
- Keyboard-navigable, focus visible
- Has metadata + JSON-LD if it is a public page
- Copy exists in all three locales (ru/ka may be draft, but the keys exist)
