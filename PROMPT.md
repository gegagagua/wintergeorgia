# Paste this into Claude Code

Run from the project root, one priority band at a time.

---

**Start here**

> Read FIXES.md and CONTENT-PLAN.md. Then read CLAUDE.md and the docs/ folder for the
> project conventions. Work through the P0 band in FIXES.md only — do not touch P1 or later.
> For anything that needs real-world data I have not given you (company registration, driver
> names, photos), create the config entry and leave a `TODO(owner):` there rather than
> inventing a value, and list those TODOs for me at the end.
> When every P0 task passes its "Done when" check, run pnpm build, lint and typecheck,
> then stop and show me what changed.

**Then, one message per band**

> P0 is accepted. Work through P1 in FIXES.md the same way. For P1.2 use the structure
> listed there and leave the written content as CMS-editable fields — do not write fake
> resort copy. Stop after P1 and report.

> P1 is accepted. Work through P2 in FIXES.md. For P2.3, make sure the CSV export is
> complete for the Gudauri and Bakuriani routes.

**Content build**

> Using CONTENT-PLAN.md, build the three page templates (qa, comparison, guide) with the
> metadata and JSON-LD each one needs. Then scaffold the first 10 pages in section A as
> drafts in the CMS with correct slugs, titles, target queries and internal links — leave
> the body for me to write or review.

**Review prompts, useful at any point**

> Audit every public page for: generateMetadata, JSON-LD, hreflang, at least 3 internal
> links, a booking CTA, and a correct 360px layout. Give me a table of what is missing.

> Check the whole site for any hardcoded number, name, price or review text that should be
> coming from the database or config. List each one with its file and line.

> Run through FIXES.md and tell me honestly which "Done when" checks do not actually pass.
