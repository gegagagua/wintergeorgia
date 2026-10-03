# 01 — Brand and design system

**Design is priority #1 on this project.** The target: a foreign tourist opens the site and
assumes a serious operator is behind it. Not a local classifieds board.

## Concept: the mountain bulletin

The visual language comes from the real language of winter mountains — avalanche bulletins,
slope difficulty markings, road status boards, topographic contour lines. The site reads as a
**live status board**, not a travel brochure.

Deliberately avoided: cream/terracotta editorial look, hero photo with a headline on top,
identical rounded cards with soft grey shadows, all-caps eyebrow labels, gradient washes.

## Three principles

1. **Status first.** Road, snow, temperature and lifts are on the home page above the fold.
   That is the reason people come back every morning.
2. **Cold and light.** A cold dark base with a single warm accent — mountain dawn light.
   No second accent color.
3. **One motion.** One orchestrated animation: the status board figures rise on page load.
   Everything else is a 150–200ms response to a user action.

## Logo

- **Mark:** contour of three peaks, which simultaneously reads as three slopes; one line runs
  through them as the road.
- **Wordmark:** `georgia` (700) + `winter` (300) on one line, no space between them.
- **Variants:** full lockup, mark only (favicon, app icon), horizontal for the header.
- **Minimum size:** 24px on screen. The mark is always one flat color. No gradients, ever.
- **Clear space:** half the mark's height on all sides.

## Color

Use `design-tokens.css`. Proportion on any screen: 65% base, 25% glacier, 7% ice, 3% dawn.

| Token | Hex | Use |
|---|---|---|
| `--gw-night` | `#0E1620` | dark base, primary text on light |
| `--gw-glacier` | `#14323F` | hero, footer, dark sections |
| `--gw-snow` | `#F2F5F7` | light background |
| `--gw-ice` | `#2C7FA8` | links, primary buttons |
| `--gw-dawn` | `#D98436` | booking CTA, price, featured item |
| `--gw-fog` | `#6B7C89` | secondary text, borders |

**Status colors** (`--gw-open` / `--gw-limited` / `--gw-closed`) appear only on status
elements — road status, lift status, booking state — and always next to a text label.

## Typography

| Role | Face | Notes |
|---|---|---|
| Display, H1, H2 | Noto Serif Georgian 600 | the serif is what sets this apart from every other Georgian tourism site |
| H3, UI, body, tables | Noto Sans Georgian 300–700 | |
| All figures | `tabular-nums` | prices, temperature, snow depth, distances must align |

Scale: 60/64 · 40/48 · 28/36 · 20/28 · 17/28 · 13/20.
Georgian body text: line-height 1.65, max line length 70 characters.
**Never use all-caps** — Georgian has no uppercase and Latin all-caps labels are a template tell.

## Components

- **Status board** — the signature component. Four cells: road, snow, temperature, lifts.
  Each cell: label, large serif value with a status dot, and an "updated at" timestamp.
  This component also appears compact in the header on inner pages.
- **Cards** — radius 14px, 1px border, no shadow unless interactive. Images 4:3, radius 10px.
- **Buttons** — primary is ice; the booking CTA is dawn. Button text says what will happen
  ("Book the transfer"), never "Submit".
- **Price** — always in the dawn accent, always tabular figures, currency after the number (`120 ₾`).
- **Icons** — Lucide, 1.75px stroke.
- **Maps** — MapLibre with a custom winter style: white relief, dark water, ice-blue roads,
  dawn pins.
- **Photography** — natural light, a person in frame, real locations. No stock photos, no
  oversaturated edits. If a real photo does not exist, use an illustrated contour panel instead.

## Motion

One orchestrated moment: status board values fade and rise 8px, staggered 130ms, on load.
Everything else 150–200ms. Respect `prefers-reduced-motion` — this is not optional.

## Accessibility

WCAG 2.2 AA. Contrast ≥ 4.5:1 for text. Visible focus ring (`--primary-hover`, 2px, 3px offset).
Status never communicated by color alone. Every interactive element reachable by keyboard.
Touch targets ≥ 44px.

## Deliverables from the designer

Figma library (tokens, components, 30+ screens desktop and mobile), logo SVG set, brand
guide, Open Graph templates for all three locales.
