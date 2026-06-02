# Handoff: No-Tegridy Fantasy Football — League Homepage ("NTSN Dark")

## Overview
This is a redesigned homepage for the **No-Tegridy** fantasy football league site (currently live at no-tegridy.org). It presents the league as a dark, broadcast-style sports network — **"NTSN" (No-Tegridy Sports Network)** — covering the 2025 championship. The design pairs the information architecture of a sports-media portal (ESPN / Bleacher Report) with a dark, neon-accented "broadcast scoreboard" aesthetic.

The homepage is a single scrolling page with anchor-linked sections. The navigation also points to six future pages that are **not yet built**: Standings, Legends, History, Draft, Gallery, and Roast Isaac.

## About the Design Files
The file in this bundle (`No-Tegridy NTSN Dark.html`) is a **design reference created in HTML** — a prototype showing the intended look, layout, and behavior. It is **not** production code to ship directly.

The task is to **recreate this design in the target codebase's environment** using its established patterns and libraries. If no codebase/environment exists yet, choose an appropriate stack (e.g. React + Tailwind, Next.js, Astro, or plain static HTML/CSS — this site is content-light and largely static, so a static-site approach is very reasonable) and implement it there. The HTML/CSS in the file is a faithful spec of the visual design; treat it as the source of truth for tokens, layout, and copy, but rebuild it idiomatically.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all specified. Recreate the UI pixel-accurately using the codebase's libraries and patterns. Exact hex values, fonts, and measurements are documented below and present in the HTML file.

---

## Layout System

- **Max content width:** `1200px`, centered, via a `.wrap` container.
- **Horizontal gutter:** `clamp(12px, 3vw, 30px)`.
- **Page background:** `#0a0b0d` (near-black) with a subtle radial green glow at top-right: `radial-gradient(900px 480px at 82% -8%, rgba(200,255,46,.05), transparent 60%)`.
- **Base font size:** 16px, line-height 1.5.
- **Vertical rhythm:** sections use `.sec` = `padding: 34px 0`.
- The page is a vertical stack of full-width bands; each band has an inner `.wrap`. Some bands have their own background color (footer, video band) that bleeds full-width while content stays within max-width.

### Band order (top → bottom)
1. Ticker (running billboard)
2. Utility bar
3. Scorebug strip
4. Masthead (logo + search)
5. Subnav (sticky)
6. Hero band (featured story + power rankings rail)
7. Top Stories (card grid)
8. Analysis banner
9. Bracket + Standings (two-column split)
10. The Debt Report (wall of shame)
11. The Film Room (video)
12. Footer

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| `--bg` | `#0a0b0d` | Page background (near-black) |
| `--bg-2` | `#101216` | Secondary background (scorebug, panel heads, video band) |
| `--surface` | `#15181d` | Cards, rails, panels |
| `--surface-2` | `#1c2027` | Hover states, raised surfaces |
| `--surface-3` | `#252a33` | Badges (neutral/runner-up) |
| `--line` | `#2b3039` | Default borders/dividers |
| `--line-2` | `#3a414c` | Stronger borders |
| `--text` | `#f3f4f6` | Primary text |
| `--muted` | `#8b919c` | Secondary text |
| `--faint` | `#5b616c` | Tertiary text, labels |
| `--green` | `#c8ff2e` | **Brand accent** — links, active states, winner scores, ticker bg |
| `--green-dim` | `#9fd119` | Darker green (rarely used) |
| `--gold` | `#ffce3a` | Champion / glory — champ badges, hero "Trophy", analysis stat |
| `--gold-dim` | `#c79b1f` | Darker gold (bracket final border) |
| `--red` | `#ff4d4d` | Shame / danger — debt report, "bad" badges, live dot |
| `--red-dim` | `#b8302f` | Darker red (shame card borders) |
| `--blue` | `#4ea8ff` | Neutral accent — 3rd-place badge |

**Semantic color logic:** green = brand/winner, gold = champion, red = shame/loss, blue = third place. Keep this consistent.

### Typography
Three Google Fonts:
- **`Anton`** (`--display`) — display/headlines. Always `text-transform: uppercase`, `line-height: ~0.86–0.92`, `letter-spacing: ~0.01em`. Used for all big headlines, team names, section titles, rank numbers, logo.
- **`Space Grotesk`** (`--body`, weights 400/500/700) — body copy, decks, card paragraphs.
- **`Space Mono`** (`--mono`, weights 400/700) — all stats, labels, eyebrows, scores, ticker text, metadata. Typically uppercase with wide letter-spacing (`0.06em–0.1em`).

Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

### Type scale (key sizes)
- Hero `h1`: `clamp(44px, 6.6vw, 84px)`, Anton
- Section `h2`: `30px`, Anton
- Analysis stat number: `92px`, Anton
- Card `h3`: `21px`, Anton
- Subnav links: `16px`, Anton
- Body deck: `17px`, Space Grotesk
- Card paragraph: `13.5px`, Space Grotesk
- Stat/label/mono text: `9–12px`, Space Mono, uppercase, letter-spacing `0.06–0.1em`

### Spacing / radius / shadow
- Border radius: `3px` (inputs, small chips), `4px` (bracket matchups), `5px` (cards, panels), `100px` (pill badges)
- Card hover lift: `transform: translateY(-2px)`, `transition: .15s`
- Panel shadow (subnav): `0 6px 18px rgba(0,0,0,.4)`
- Video frame shadow: `0 40px 90px -50px rgba(0,0,0,.9)`

---

## Sections / Components (detailed)

### 1. Ticker (running billboard)
- Full-width bar, background `--green` (`#c8ff2e`), text `#0a0b0d`, `border-bottom: 2px solid #0a0b0d`.
- Inner `.ticker-track` is an `inline-flex` of `.ticker-item`s that scrolls right→left infinitely via `@keyframes scroll-ticker { from { translateX(0) } to { translateX(-50%) } }`, `34s linear infinite`.
- **Seamless loop technique:** the track's innerHTML is duplicated once via JS on load, then animated to `-50%` so the second copy lines up exactly. Replicate this (or duplicate the items server-side / in markup).
- **Pause on hover:** `.ticker:hover .ticker-track { animation-play-state: paused }`.
- Each item: Space Mono, 700, 12px, uppercase, letter-spacing `0.1em`, padding `9px 0`. Separator: a `✦` (`\2726`) glyph at `padding: 0 22px; opacity: .5` via `::after`.
- Content (order): `🏆 Logan Alderson wins the 2025 chip` · `Logan STILL owes an ass tattoo from 2022 — pay up` · `5 years of chaos` · `5 champions` · `Tyler owes 24 hrs at Waffle House` · `Donavon rage-quit in Round 1` · `Garrett dropped 188.3 in the playoffs` · `Sponsored by Jerk Riley's` · `Est. 2021`
- `aria-hidden="true"` on the ticker (decorative).

### 2. Utility bar
- Background `#000`, `border-bottom: 1px solid --line`, height `34px`.
- Left: inline mono links (11px, 700, uppercase, letter-spacing `0.1em`), color `--muted`, hover `--text`. Active link `NTSN` is `--green` with a 2px green bottom-border.
- Links: `NTSN` (active), `Scores`, `Standings`, `Analysis`, `Shame`.
- Right: a "live" indicator — a `7px` red dot with `pulse` animation (opacity 1↔.35, 1.4s) + text `FINAL · WEEK 17`, then `SUN, JAN 4` in `--faint`. Mono, 11px.

### 3. Scorebug strip
- Horizontal scroll ribbon (ESPN-style), background `--bg-2`, `border-bottom: 1px solid --line`. Scrollbar hidden.
- Starts with a `.sb-label` ("Playoffs", green mono, 11px, with right border divider).
- Each `.sb` cell: `min-width: 158px`, padding `9px 16px 9px 12px`, right border.
  - `.rnd` — round label, mono 9.5px, `--faint`, uppercase, letter-spacing `0.1em`, margin-bottom 5px.
  - Two `.tm` rows (team name + score), 13px. Winner row `.tm.w`: name `--text`, score `--green`, and a `▸` prepended to the name (green, via `::before`).
- Cells (in order): **Final** Mr Pfizer 138.1 ▸ / RubNTug 85.0 · **3rd Place** Nobody's Hurt 104.2 ▸ / 3rd Beer 100.4 · **Semi** Mr Pfizer 112.3 ▸ / Nobody's Hurt 87.9 · **Semi** RubNTug 138.9 ▸ / 3rd Beer 119.3 · **R1 · High** 3rd Beer 188.3 ▸ / 4th n Long 115.5 · **R1 · Upset** Nobody's Hurt 109.7 ▸ / Gut Check 100.7

### 4. Masthead
- Background `--bg`, height `74px`, flex space-between.
- **Logo** (`.logo`, links to `#top`): three parts inline —
  - `.mark` — "NT" in Anton 30px, background `--green`, text `#0a0b0d`, padding `5px 12px`, clipped with `clip-path: polygon(0 0, 100% 0, 90% 100%, 0 100%)` (angled right edge).
  - `.word` — "N**S**N" in Anton 30px, the middle **S** colored `--green`. Padding-left 11px.
  - `.tag` — "No-Tegridy / Sports Network" (two lines via `<br>`), mono 10px, `--faint`, uppercase, letter-spacing `0.18em`, left border + padding-left 13px.
- **Search** (`.mh-search`): `250px` wide, background `--surface`, `1px solid --line`, radius 3px, padding `8px 12px`. A `🔍` glyph + text input placeholder "Search players, teams, debts...". Hidden below 900px. (Non-functional in mock; wire up or stub as needed.)

### 5. Subnav (sticky)
- `position: sticky; top: 0; z-index: 40`. Background `--surface`, `border-top: 2px solid --green`, `border-bottom: 1px solid --line`, shadow `0 6px 18px rgba(0,0,0,.4)`. Horizontal scroll, scrollbar hidden.
- Links: Anton 16px, uppercase, `--muted`; padding `13px 16px`; hover → `--text` + `--surface-2` bg. Active link `--green` with 3px green bottom-border.
- Links: `Home` (active, → `#top`), `Standings` (→ `#standings`), `Legends` (→ `#legends`), `History` (→ `#history`), `Draft` (→ `#draft`), `Film` (→ `#gallery`), and `Roast Isaac` (→ `#shame`) which is pushed right via `margin-left:auto`, colored `--red`, hover bg `rgba(255,77,77,.1)`.

### 6. Hero band
- Two-column grid `1.62fr 1fr`, gap `18px`. Collapses to single column below 900px.
- **Feature card** (`.feature`): min-height `440px`, `1px solid --line`, radius 5px, flex aligned to bottom. Background `linear-gradient(135deg, #191d24, #0c0e12)`.
  - `::before` overlay: radial green glow at 78% 16% (`rgba(200,255,46,.22)`) plus a faint diagonal hatch (`repeating-linear-gradient(118deg, rgba(255,255,255,.022) 0 2px, transparent 2px 11px)`).
  - `::after`: a giant `🏆` emoji, 210px, opacity .08, rotated -10deg, top-right (decorative texture).
  - Content (`.fc`, padding 32px): a gold tag chip `🏆 2025 Champion` (mono 11px, 700, bg `--gold`, text `#1a1205`); then `h1` "Toilet Bowl to **Trophy**" (Anton, clamp 44–84px, "Trophy" in `--gold` via `<em>`); a `.dek` paragraph (`--muted`, 17px); a `.byline` "By **NTSN Staff** · Championship Report" (mono 11px, `--faint`).
- **Power Rankings rail** (`.rail`): `--surface` card, `1px solid --line`, radius 5px.
  - `.rail-head`: "Power Rankings" (Anton 17px) + "FINAL · 2025" (mono 10px, `--faint`), bg `--surface-2`, `border-bottom: 2px solid --green`.
  - Four `.item` rows (link to `#standings`): a big rank number (`.rk`, Anton 26px, `--green`; the **3rd** item's rank is `--gold` per `:nth-child(3)`) + team name (Anton 18px) + a mono detail line (`--faint`, 11px).
  - Rows: 1 Mr Pfizer + Swifties (Logan Alderson · 9–5 · Champion), 2 Blevins' RubNTug (Jacob Johnson · 11–3 · Runner-Up), 3 Nobody's Hurt (Eli Hurt · 6–8 · 3rd Place), 4 3rd Beer Hits Blake (Garrett Burton · 8–6 · 188-pt game).

### 7. Section header pattern (`.sec-head`)
Reused across Top Stories, Debt Report, Film Room:
- Flex row: a `5px × 26px` accent bar (`--green`, or `--red` for Debt Report) + `h2` (Anton 30px) + a flex-1 `1px` rule line (`--line`) + an "all" link (mono 11px, 700, `--green`, or `--red` for Debt Report).

### 8. Top Stories (card grid)
- `.cards`: CSS grid, `repeat(auto-fill, minmax(264px, 1fr))`, gap 16px.
- `.card`: `--surface`, `1px solid --line`, radius 5px. Hover: border `--line-2` + `translateY(-2px)`.
  - `.thumb`: 118px tall gradient header (variants `.g2` blue-ish, `.g3` red-ish, `.g4` default, `.g5` green-ish, `.g6` gold-ish) with a category chip bottom-left. Chip: mono 10px, 700, uppercase; default bg `--green`/text dark; for `.g3` and `.g6` thumbs the chip is `--red`/white.
  - `.cbody` (padding `14px 16px 17px`): `h3` (Anton 21px; link hover → `--green`), `p` (`--muted`, 13.5px), `.meta` (mono 10px, `--faint`, uppercase).
- Six cards: **Records** "The 188-Point Explosion" (Film Room · 4 min read); **Upsets** "Cinderella Crashes the Party" (Bracketology · 3 min read); **Drama** "Donavon's Round 1 Meltdown" (Hot Takes · 2 min read); **Tragedy** "Barnwell's Seven-Game Skid" (Analytics · 3 min read); **Power Rankings** "The Champ Gets Dethroned" (Rankings · 2 min read); **Investigation** "The Tattoo That Won't Die" (Investigations · 5 min read). Copy is in the HTML file verbatim.

### 9. Analysis banner (`.analysis`)
- Grid `auto 1fr`, gap 28px, padding `28px 30px`. Background `linear-gradient(135deg, --surface, --bg-2)`, `1px solid --line`, **`border-left: 4px solid --gold`**, radius 5px. Collapses to one column / centered below 900px.
- Left: big "1" (Anton 92px, `--gold`) with a small label "TATTOO OWED" beneath (mono 11px, `--faint`, 700).
- Right: `h3` "Championship Asterisk In Effect" (Anton 28px), a `--muted` paragraph (15px, full copy in file), and a `.quote` line in `--gold` italic.

### 10. Bracket + Standings split (`.split`)
- Grid `1.05fr 1fr`, gap 20px, `align-items: start`. Single column below 900px.
- Both are `.panel-card` (`--surface`, `1px solid --line`, radius 5px) with a `.pc-head` (bg `--bg-2`, Anton 17px title + mono caption, `border-bottom: 2px solid --green`).
- **Bracket** (`.bk`): 3-column grid (Round 1 / Semifinals / Final), gap 10px, vertically centered. Each `.bm` matchup: `--bg-2`, `1px solid --line`, radius 4px, with two `.br` rows (`grid: 18px 1fr auto` = seed / name / score). Winner row `.br.w`: name `--text`, score `--green`. The Final matchup `.bm.champ` has a gold border + `box-shadow: 0 0 0 1px rgba(255,206,58,.25)` and its winner score is `--gold`. A `🏆 Logan wins` note sits below the final. Mobile (<560px): only the Round 1 column shows; columns c2/c3 hidden. Full scores in file.
- **Standings table** (`table.stand`): 12 rows. Columns: rank (`.rk` Anton 17px; #1 gold, #2–3 white, rest faint), team (`.team` Anton 16px + `.own` owner mono 10px), status (a `.tg` pill), record (`.rec` mono 700, right-aligned). Header row mono 10px on `--bg-2`. Row hover `--surface-2`. Last-place row `.last` tinted `rgba(255,77,77,.05)`.
  - Pill variants: `.tg.champ` gold bg/dark text; `.tg.run` `--surface-3`/white; `.tg.third` `rgba(78,168,255,.16)`/blue; `.tg.bad` `rgba(255,77,77,.14)`/red; `.tg.neu` `--surface-3`/muted.
  - Full standings (rank · team · owner · status · record):
    1. Mr Pfizer + Swifties · Logan Alderson · Champ · 9–5
    2. Blevins' RubNTug · Jacob Johnson · Runner-Up · 11–3
    3. Nobody's Hurt · Eli Hurt · 3rd · 6–8
    4. 3rd Beer Hits Blake · Garrett Burton · 188 Pts · 8–6
    5. I chase brown kids · jacob barnwell · 7L Skid · 6–8
    6. 4th n Long to Deanna · Cain Cooksey · — · 8–6
    7. Gut Check · Donavon Alderson · Crybaby · 10–4
    8. CeeDees Blue Balls · Isaac Puzey · — · 6–8
    9. Beatin Sandy's Cheeks · Tyler Blevins · Consol. · 6–8
    10. Room 40's Nuts · CJ Tackett (def. champ) · Dethroned · 6–8
    11. Naber, What?! · Blake Howell · — · 4–10
    12. Waffle House Bound · Rylan Thomas · 🚽 Toilet · 4–10

  > Note: standings are sorted by final placement, not by win-loss record (e.g. the 11–3 and 10–4 teams finished 2nd and 7th because this is a playoff-bracket league). Preserve the given order; don't re-sort by record.

### 11. The Debt Report (wall of shame)
- `.sec-head` here uses the **red** accent bar + red "Full Ledger →" link.
- `.shame-strip`: 3-column grid (1 col below 900px), gap 16px.
- `.shame-c`: `border: 1px solid --red-dim`, **`border-top: 4px solid --red`**, background `linear-gradient(180deg, rgba(255,77,77,.06), transparent)`, radius 5px, padding 20px, flex with a big emoji.
  - Emoji 38px; `h4` name (Anton 21px); `.crime` (mono 11px, `--faint`); an `.owes` block (top border) with label (mono 10px) + value (Anton 18px, `--red`); a status line.
  - Three cards: **🍑 Logan Alderson** — Last place · 2022 — Owes **Ass Tattoo** — UNPAID, legitimacy in question. **🍔 Tyler Blevins** — Last place · 2024 — **24 Hrs @ Waffle House** — UNPAID. **😭 Donavon Alderson** — Round 1 rage quit · 2025 — **Eternal Shame** — GHOSTED.

### 12. The Film Room (video)
- Band background `--bg-2`, `border-top: 1px solid --line`.
- `.vframe`: 16:9 aspect, `1px solid --line-2`, radius 5px, black bg, big soft drop shadow. Contains an `<iframe>` embedding a Google Drive video (`https://drive.google.com/file/d/1FqCwbtJNPTwEOCV17knB-RjSnwwdlxJz/preview`). Swap for the league's real hosting as needed.

### 13. Footer
- Background `#000`, `border-top: 2px solid --green`, padding `36px 0 30px`.
- Top row: the NTSN logo (smaller, 24px) + a right-aligned meta block (mono 11px, uppercase) — "2025 Champion: **Logan Alderson**" (champion name in `--gold`), "Est. 2021 · Sponsored by Jerk Riley's", "5 Years of Chaos · 5 Champions · 1 Ass Tattoo Owed".
- Bottom row (top border): two mono 10.5px `--faint` lines — "© 2025 No-Tegridy Sports Network. Not affiliated with anything reputable." and "Built on chaos. Run on trash talk."

---

## Interactions & Behavior
- **Ticker:** infinite horizontal scroll, 34s linear; pauses on hover. Content is duplicated once on load for a seamless loop.
- **Live dot:** `pulse` keyframe, opacity 1↔.35 over 1.4s, infinite.
- **Scroll reveal:** elements with `.reveal` start at `opacity:0; translateY(16px)` and transition to visible (`opacity .5s, transform .5s`) when they enter the viewport. Implemented with an `IntersectionObserver` (threshold 0.1) that adds `.in` and unobserves. Falls back to immediately-visible if `IntersectionObserver` is unavailable. Respect `prefers-reduced-motion` in the rebuild (the mock doesn't, but you should: show content immediately and skip the translate).
- **Card hover:** border lightens + 2px lift.
- **Nav/links hover:** color and background shifts as specified per component.
- **Sticky subnav:** sticks to top on scroll (z-index 40).
- **Anchor navigation:** subnav + utility links are in-page anchors (`#standings`, `#shame`, etc.) with `scroll-behavior: smooth` on `html`. In a real multi-page build these should become routes to the future pages where applicable.
- **Horizontal scroll:** scorebug strip and subnav scroll horizontally on overflow; scrollbars are visually hidden.

## State Management
This homepage is **static / presentational** — no client state beyond the ticker duplication and IntersectionObserver. If wired to live league data later, the data shapes are:
- **Standings row:** `{ rank, teamName, owner, status, wins, losses }`
- **Scorebug / bracket matchup:** `{ round, teamA: {name, score, seed}, teamB: {name, score, seed}, winner }`
- **Power ranking item:** `{ rank, teamName, owner, record, note }`
- **Story card:** `{ category, title, excerpt, section, readTime, thumbVariant }`
- **Debt card:** `{ emoji, name, crime, owesLabel, owesValue, status }`

If/when these come from a fantasy platform (ESPN/Sleeper/Yahoo) API or a CMS, map the API response into these shapes. For now they can be hardcoded data arrays the components render over.

## Responsive Behavior
- **≤900px:** hero collapses to one column; bracket+standings split to one column; analysis banner to one column/centered; debt strip to one column; masthead search hidden.
- **≤560px:** feature min-height drops to 340px; standings owner shown on its own line; bracket shows only Round 1 column (semis/final hidden); analysis stat number shrinks to 64px; ticker text/gap tighten.
- Mobile nav: the subnav and utility bar simply scroll horizontally (there is no hamburger menu in this version). If the target platform needs a hamburger pattern, add one consistent with the codebase.

## Assets
- **No image files.** All "imagery" is CSS gradients + emoji (🏆 🍑 🍔 😭 🔍 🚽 ▸ ✦). In production, replace gradient thumbnails and the trophy texture with real league photos where available, and consider replacing emoji with an icon set that matches the codebase.
- **Fonts:** Anton, Space Grotesk, Space Mono — via Google Fonts (link above). Self-host if the codebase prefers.
- **Video:** a Google Drive embed (URL above) — swap for the league's actual video hosting.
- **Logo:** the "NT / NSN" wordmark is pure CSS/type (no SVG). Can stay as-is or be turned into a proper SVG logo.

## Files
- `No-Tegridy NTSN Dark.html` — the complete, self-contained homepage design (HTML + inline `<style>` + small inline `<script>`). This is the single source of truth. All tokens live in the `:root` block; all copy is inline.

## Future pages (not yet designed)
The nav links to six pages that still need designing/building in this same style: **Standings** (expanded stats table — PF/PA, streaks, the 188 game), **Legends** (all 12 teams as profile cards), **History** (5 seasons / 5 champions timeline), **Draft** (draft recap board), **Gallery** (photo wall), **Roast Isaac** (a dedicated humor page). They currently resolve to in-page anchors. Build the homepage first; these can follow.
