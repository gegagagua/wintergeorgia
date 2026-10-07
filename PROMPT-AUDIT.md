# Prompts for Claude Code — audit fixes

**Band 1 (today)**

> Read AUDIT-FIXES.md. Work through the P0 band only — five tasks, all of them bugs.
> Pay particular attention to P0.1: find where locales are configured and make sure no
> template can emit a locale we do not have. For anything needing data I have not given you,
> add the config entry with a `TODO(owner):` and list those at the end.
> Then run pnpm build, lint and typecheck, and show me a diff summary.

**Band 2**

> P0 is accepted. Work through P1 in AUDIT-FIXES.md. For P1.1 build the JSON-LD from database
> values — no hand-written blocks in components. For P1.2 the 301 redirects are the critical
> part: show me the full redirect map before you move anything.

**Band 3**

> Work through P2. For P2.1 add the structure and leave the written copy as CMS fields —
> do not write fake resort content. For P2.4, first crawl /ru and give me a list of pages
> that fall back to English, then fix them.

**Band 4**

> Work through P3. Before changing the home page, show me the proposed section order and
> what you plan to merge.

**Verification prompts — run these at any point**

> Crawl every public URL and give me a table: page, title length, meta description length,
> JSON-LD types present, hreflang entries, count of internal links, whether a booking CTA
> exists. Flag every row that fails AUDIT-FIXES.md.

> Find every hardcoded number, price, name or piece of review text in the codebase that
> should be coming from the database or config. List file and line.

> Go through AUDIT-FIXES.md and tell me honestly which "Done when" checks do not pass yet.
