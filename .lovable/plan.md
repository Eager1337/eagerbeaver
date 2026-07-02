# Ship List

This is a large batch. I'll build it in one pass, grouped so nothing gets left behind.

## 1. Investor Analytics — CSV + PDF export
- Add "Export CSV" and "Export PDF" buttons on the analytics tab in `InvestorSuite.tsx`.
- CSV: sessions, project views, feature clicks, comparison summary. Pure client-side blob download.
- PDF: use `jspdf` (add via `bun add jspdf`) to render a branded one-pager with the same metrics + the current comparison summary.

## 2. Quote Estimator — PDF alongside Markdown
- Keep the existing `.md` download.
- Add "Download PDF" button that renders the same proposal via `jspdf`.

## 3. ToonHub carousel — fix framing + stop glitching
- Rewrite the ToonHub section in `src/routes/index.tsx`:
  - Fixed aspect-ratio stage (`aspect-[4/5]` mobile, `aspect-[16/10]` desktop).
  - `object-contain` on every character image, no dynamic `scale` transforms per slide.
  - Snap to slide with `AnimatePresence` cross-fade only — no layout jitter.
- Include the 3 existing toon renders and 2 new uploads (One Piece cast, Saitama) as slides — no cropping at any breakpoint.

## 4. Remove roaming critters
- Delete `RoamingCritters` mount from `__root.tsx`.

## 5. Portfolio — pricing + CV download
In `src/routes/portfolio.tsx`:
- New "Investment" section with 3 tiers (Starter / Growth / Signature) and per-service add-ons.
- "Download CV (PDF)" + "Download Rate Card (PDF)" buttons, both generated with `jspdf` on click.

## 6. New premium landing pages (looping hero animations)
One route per upload, each SEO'd and premium — hero, story, stack, CTA back to home:

| Route | Image | Loop animation |
|---|---|---|
| `/legends/deadpool-vs-wolverine` | deadpool-wolverine | Two-image clash rocking left↔right in infinite loop |
| `/legends/superman` | david-corenswet superman | Slow zoom + subtle grin shimmer loop |
| `/legends/one-punch-man` | saitama | Walking-forward parallax loop (scale + fog) |
| `/legends/one-piece` | one-piece cast | Reflected mirror shimmer loop |
| `/legends/luffy-fire` | luffy fire fist | Ember/flame flicker loop |
| `/legends/spider-verse` | spider silhouette | Web-swing sway loop |
| `/legends/nba-2k25` | 2k25 cover | Eye-glow pulse loop |
| `/legends/hoop-dreams` | basketball ring | Ball arc-shot into net, infinite loop (SVG ball animated) |
| `/legends/wooden-love` | LOVE train | Train chug across loop |
| `/legends/audi-nuvolari` | audi | Slow orbit reflection loop |
- Grid index at `/legends` linking all 10.
- Add "Legends" link in root nav + a section on `/` under ToonHub linking into the grid.

## 7. Explore — richer per-site landing
- Extend `explore.$slug.tsx` with: hero screenshot placeholder, problem/solution, tech stack chips, metrics, related sites, CTA. (Data already in `PROJECTS`; just render more.)

## Tech notes
- Add deps: `jspdf`.
- All PDFs client-side, no server calls.
- Uploads registered via `lovable-assets` → `src/assets/*.asset.json`.
- No changes to auth, DB, or server functions.

Approve and I'll execute the whole batch.