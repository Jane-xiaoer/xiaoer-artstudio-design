# Design Principles — The "Why" Behind 小耳 Art Studio

Eight principles. Each one explains a decision on the site so you can make the same decision in a new context.

> Principles 1–7 are *visual* (what the page looks like at rest). Principle 8 is *behavioral* (what the page does when the visitor arrives). A reproduction that ships only 1–7 looks like the site but doesn't *feel* like it — see `INTERACTION.md`.

---

## Principle 1 — Whitespace Is Inhabited, Not Empty

**Observation**: The hero shows the headline ("Everyday uki uki. Sometimes doki doki.") centered mid-viewport with ~60% of the fold blank. But the bottom edge of the fold is **crammed** with organic floral blobs.

**Why it works**: The blankness above creates the *pause*. The density below gives the eye somewhere to land. This is the Japanese concept of *ma* (間) — negative space as a compositional actor, not a deficiency.

**How to apply**:
- Every hero-like section: top half is breath, bottom edge is decoration.
- Never fill the middle of a section with decorative SVGs. Anchor them to edges/corners.
- Text columns should have > 50% empty vertical margin above/below.

**Failure mode**: Distributing decorations evenly across a section → it reads like a stock-photo pattern, not a handcrafted page.

---

## Principle 2 — Three Typographic Voices, Never Two, Never Four

**Observation**: The stack is `DM Serif Display` (editorial serif, used for collection titles & hero logo), `Caveat` (handwritten cursive, used for section labels like "Products", "About", "Contact", "News"), `system-ui` (sans, used for all body & data).

**Why it works**: Each voice has a job:
- **Serif** = curated, museum-like, collections & work titles
- **Handwritten** = the artist's own hand, section bookmarks
- **Sans** = neutral delivery of information

Dropping to 2 voices collapses the tension. Adding a 4th (e.g. a display font) introduces noise.

**How to apply**:
- Pick exactly three fonts with these three roles.
- Section headings in cursive ("Products", "About"), work titles in serif ("Daily Flowers", "The Garden of Reverie"), everything else in sans.
- Cursive is NEVER used for body paragraphs. Serif is NEVER used for prices/metadata.

---

## Principle 3 — The 1+4+1 Palette

**Observation**: The site has 20 detected colors, but the pattern is:
- **1 neutral base**: `#ffffff` (canvas) + `#111111`/`#1a1a1a` (ink)
- **4 pastel section tints**: `#CCE8B0` (mint), `#FFF8BE` / `#FEFCE0` (cream), `#FFE5E5` (cherry), `#C2EEF7` (sky)
- **1 high-saturation accent**: `#c8ff00` (lime) — used in only 2–3 places total

Section backgrounds **rotate** through the pastels (hero white → intro white → products mint → collections white → about cream → news white → contact sky). White acts as the "rest" between tints.

**Why it works**: The rotation gives each section an identity without genre-switching. The lime accent is high-stakes because it's rare — two uses maximum per page.

**How to apply**:
- Pick 4 pastel tints with near-equal luminance.
- Alternate `white → pastel_n → white → pastel_n+1 → …`.
- Reserve exactly ONE saturated accent color for 1–3 total uses.

**Failure mode**: Using a 5th pastel → rotation loses rhythm. Using lime in 5+ places → it stops feeling like a spark.

---

## Principle 4 — Hand-Drawn SVG Is a Language, Not Decoration

**Observation**: The decorative SVGs (floral blobs, vines, wavy lines, leafy squiggles) share a consistent grammar:
- `stroke` always `#1a1a1a` (near-black, never pure `#000`)
- `stroke-width` between `1.2` and `2.5`
- `stroke-linecap="round"`
- Paths use **quadratic Bézier** (`Q` command) to produce organic wobble — never pure `L` lines or perfect arcs
- Multiple overlapping paths at low opacity (`0.55–0.93`) for depth
- Fills are pastel with visible stroke (so the "drawn" line is always seen)
- Decorations are rotated at **irregular angles** (`rotate(0.12rad)`, `rotate(-0.59rad)` — not 0°/45°/90°)

**Why it works**: This grammar makes every decoration feel like it came from the same sketchbook. Absence of perfect geometry is the signal for "made by a person."

**How to apply**: When you emit ANY decorative SVG in this style, check all 5 properties above. If a shape has `stroke="#000"`, straight lines, or a right-angle rotation, it's outside the language.

See `SVG_VOCABULARY.md` for canonical primitives.

---

## Principle 5 — Dividers Are Drawn, Not Drawn By Browser

**Observation**: The site **never** uses a horizontal `<hr>` or `border-top`. Section dividers are always:
- **Dotted-line divider**: a row of 1.5px circles in `#5a8a38` (olive) at 16px spacing — implemented as SVG or pseudo-element, never a `dashed` border
- **Wavy-line divider**: a single hand-drawn quadratic curve (`<path d="M0 7 Q60 3 120 7 Q180 11 240 7 …">`) used below section labels ("Products", "About", "Contact")

**Why it works**: Browser-rendered rules look mechanical. A drawn divider carries the same artisanal signal as the floral SVGs — it keeps the visual language coherent top-to-bottom.

**How to apply**: Every time you want to separate content, ask "is this a structural boundary (section) or a decorative softener (label underline)?" Use dotted-line for sections, wavy-line for labels. Never `<hr>`.

---

## Principle 6 — Trilingual Copy Is The Texture

**Observation**: The brand-intro section displays Japanese poetic lines on the left column and English translations on the right column, set in identical rhythmic breaks:

```
お気に入りの歌をハミングするように     | Like when humming your favorite tune,
思わずステップを踏んでいきたいように。  | Like when inadvertently moving to the rhythm.
```

Product names are **single kanji**: `于 / 知 / 风 / 果 / 色 / 常 / 在 / 舞`. Collection descriptions in Chinese. Contact labels in JA terms (`微信 / 邮箱 / 视频号`).

**Why it works**: Three languages create a cosmopolitan-studio feeling without needing to actually ship internationally. Single-kanji product names function as **Zen anchors** — the user stops to read one character, which is itself an art object.

**How to apply**:
- For any "poetic statement" block, use 2 columns, 2 languages, matched line-breaks.
- For product names, default to a single meaningful ideogram (not a phrase).
- For UI/nav labels, don't over-translate — a JA or ZH term with a small EN gloss reads more curated than full localization.

**If the artist doesn't speak 3 languages**: use 1 primary + 1 secondary (e.g. EN + JA terms for section labels only).

---

## Principle 7 — Motion Is Breath, Not Attention

**Observation**: The site has 4 named animations, all of them *ambient*:

- `heroTextIn`: 800ms slide-up + fade once on load (`cubic-bezier(0.22, 1, 0.36, 1)`)
- `about-float`: 3.6–5s vertical 5px float, infinite, staggered delays 0/400/800/1300ms on tag/svg/role/name
- `nd-float`: 5.2–6.4s rise 9px while holding a rotation offset, infinite, on decorative SVGs
- `nd-sway`: 6.8–7s 3-keyframe sway with rotation+scale jitter (±3° and ±0.03 scale), infinite

**Why it works**: Every animation is slow (≥3.6s), small amplitude (≤9px / ±3°), infinite, and staggered. Nothing demands attention. They create a feeling that **the page is alive but asleep** — perfect for a gentle brand.

**How to apply**:
- Default duration ≥ 3500ms, amplitude ≤ 10px.
- `ease-in-out`, never `linear` for ambient motion.
- Stagger delays on any grouped element (400ms intervals work well).
- Zero scroll-triggered animations — the site gets all its "life" from idle motion.

**Failure mode**: Fast / large-amplitude / zoom / pulse motion on decorative elements → site reads like a SaaS marketing page.

---

## Principle 8 — The Cursor Is a Visitor, Not a Tool

**Observation**: The page has **five independent interaction systems**, none of which exist to "use" the site:

- **Hero / footer physics garden** — decorative SVGs are Matter.js rigid bodies with gravity. The cursor can grab and throw them.
- **Text spring (with pencil)** — the bio paragraph is split into per-character spans; a custom pencil cursor pushes them aside via spring forces.
- **Text spring (plain)** — news titles use the same per-character repulsion without the pencil.
- **Tangential rotor** — the sakura nav mark spins by transferring the cursor's tangential momentum.
- **Idle-spin with hover boost** — small plus-mark ornaments rotate slowly, accelerate 6× on hover.

None of these are required for the site to function (it's fully usable with JS disabled). Their purpose is to communicate that **the visitor's presence affects the page** — gently, without alarm.

**Why it works**: A static design is a *picture*. A design with click-and-scroll behavior is a *brochure*. A design where the room responds to the visitor's presence is a *space*. The site sells the third experience because that's what an artist's studio actually feels like.

**How to apply**: Every interactive layer must follow these rules.

- **The cursor is wind, not a sword** — proximity & momentum are the inputs; clicks are reserved for navigation.
- **Decorative responses use transforms** (drag, repel, rotate). **Functional responses use opacity only** (see `MOTION.md` § Two Hover Categories).
- **Spring/physics return** — anything pushed must return to rest. No bistable states.
- **Never block reading** — text spring on body paragraphs is allowed only if chars return fast (spring k ≥ 0.12, damping ≤ 0.7). If reading feels like wading through water, the spring is too strong.
- **`cursor: grab` on physics areas. `cursor: pointer` only on real links.** Never confuse these.
- **Minimum viable build**: 1 physics garden (hero) + 1 text-spring section. Two layers carry 80% of the feeling.

**Failure mode**: Adding interaction to "show off" — hover scales on product cards, parallax scroll, pulsing CTAs. These signal *SaaS dashboard*, not *artist studio*. The interaction must always be *quieter* than the static design, never louder.

See `INTERACTION.md` for the system map, then `PHYSICS_GARDEN.md` and `TEXT_SPRING.md` for the two main patterns.

---

## Fidelity Checklist

Before claiming a reproduction is done, verify **each**:

### Visual (Principles 1–7)

- [ ] Three font voices, with body=sans, labels=cursive, titles=serif
- [ ] Section backgrounds rotate `white → pastel → white → pastel`
- [ ] Exactly 1 saturated accent color, used ≤3 times
- [ ] All decorative SVGs use `#1a1a1a` strokes, `round` linecaps, `Q` curves, irregular rotation
- [ ] Zero `<hr>` tags; dividers are dotted-line SVG or wavy-line SVG
- [ ] Hero has ≥50% vertical blank space above decoration
- [ ] At least one bilingual-column poetic block
- [ ] All idle animations ≥3500ms, amplitude ≤10px, `ease-in-out`, infinite
- [ ] At least one single-kanji / single-character product or work name
- [ ] Hero headline uses onomatopoeia or mood-word (not a value prop)

10/10 visual = visual fidelity target.

### Behavioral (Principle 8)

- [ ] At least one physics garden (drag-able SVG decorations with gravity)
- [ ] At least one text-spring section (per-character repulsion, returns to rest)
- [ ] No `transform` hover effects on functional controls (product cards, links, buttons)
- [ ] `cursor: grab` on physics areas, `cursor: pointer` only on real links
- [ ] Site is fully readable & navigable with JS disabled
- [ ] `prefers-reduced-motion: reduce` disables physics + spring (not just CSS)

6/6 behavioral = "feels like the site" target.

**A reproduction can score 10/10 visual and 0/6 behavioral and still feel dead.** The interaction layer is not optional polish — it's half the methodology.
