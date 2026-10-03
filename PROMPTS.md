# Ready-to-paste prompts for Claude Code

Run these in order from the project root. Each assumes the previous one finished and its
acceptance criteria in `docs/10-build-plan.md` passed.

---

**Phase 0 — scaffold**

> Read CLAUDE.md and docs/00-overview.md, docs/01-brand.md, docs/02-information-architecture.md.
> Scaffold the Next.js 15 App Router project described there: TypeScript strict, Tailwind 4 wired
> to design-tokens.css, shadcn/ui, next-intl with en/ru/ka, Drizzle + Postgres with the schema in
> docs/08-data-model.md, and the seed data listed at the end of that file. Build the base layout
> (header, footer, locale switcher, dark mode, focus styles). Stop when the acceptance criteria
> for Phase 0 in docs/10-build-plan.md are met, then show me the home page in all three locales.

**Phase 1 — design system**

> Read docs/01-brand.md again carefully. Build every component listed in Phase 1 of
> docs/10-build-plan.md on a /dev/components page, using only the tokens from design-tokens.css.
> The status board is the signature component — get it right first. Take screenshots in light and
> dark, review them against the brand doc yourself, and fix what does not match before telling me
> it is done.

**Phase 2 — content pages**

> Implement Phase 2 from docs/10-build-plan.md: Payload CMS collections, resort pages, prices
> page, journal. Follow docs/03-seo.md exactly for metadata, JSON-LD, hreflang and sitemap.
> Use the Gudauri content in content/ as the reference depth for other resorts.

**Phase 3 — transfers**

> Implement the transfers module per docs/04-transfers.md and the endpoints in
> docs/09-api-and-integrations.md. Payment provider first in test mode. Write the Playwright
> test for the full booking flow before you call it done.

**Phase 4 — conditions**

> Implement docs/05-conditions.md. Pay attention to the closed-road rule: it must actually
> reschedule or refund affected bookings, and that behaviour needs a test.

**Phase 5 — catalog, events, news**

> Implement docs/06-news-events.md and docs/07-catalog.md. Validate the event structured data
> against Google's Rich Results requirements.

**Phase 6 — launch prep**

> Run the Phase 6 checklist in docs/10-build-plan.md. Report anything that is not launch-ready
> as a list, do not silently fix scope.

---

## Useful mid-flight prompts

> Review the last screen you built against docs/01-brand.md. List every deviation, then fix them.

> Run pnpm build, pnpm lint, pnpm typecheck and pnpm e2e. Fix everything that fails, then report.

> Audit every public page for: generateMetadata, JSON-LD, hreflang, a booking CTA, and 360px
> layout. Produce a table of what is missing.
