# Remix Guide — What to Change, What to Keep

This skill is a methodology, not a template. You're invited — expected — to adapt it. Here's the map of what flexes and what doesn't.

## The Core (DO NOT touch — changes break the aesthetic)

These are the load-bearing identity markers. If you remove any, it stops being "in this family" and becomes something else.

1. **Three-role type system** (editorial serif / handwritten cursive / neutral sans)
2. **1+4+1 color structure** (1 neutral base + 4 pastels rotation + 1 saturated accent)
3. **Alternating white↔pastel sections** (never two pastels adjacent)
4. **Hand-drawn SVG grammar** (`#1a1a1a` strokes, round linecaps, Q-curves, irregular rotation)
5. **Drawn dividers only** (dotted-line between sections, wavy-line under labels; never `<hr>`)
6. **Ambient motion only** (≥3500ms, ≤10px, infinite, ease-in-out; no scroll-triggered)
7. **Bilingual parallel column** in at least one poetic block

## The Flex Zone (swap freely)

Everything below is an extension point. Change any or all to make a new brand in this family.

### Palette Swap

Keep the structure, change the hues. Examples:

**"Seaside Studio" variant**
```json
{
  "pastels": {
    "pale-coral": "#FFD9D0",
    "sand":       "#F7EDD7",
    "sea-foam":   "#D0E8DC",
    "ink-wash":   "#CFD9E2"
  },
  "accent": "#ff6a3d"   // burnt-orange instead of lime
}
```

**"Mountain Cabin" variant**
```json
{
  "pastels": {
    "oatmeal":    "#EFE6D4",
    "moss":       "#C5D2B0",
    "ashwood":    "#D9CFC0",
    "slate":      "#C7CED4"
  },
  "accent": "#d7263d"   // persimmon red
}
```

### Font Duo Swap

Keep the three-role pattern. Swap families:

| Role          | Original          | Alternative 1     | Alternative 2      |
|---------------|-------------------|-------------------|--------------------|
| Editorial     | DM Serif Display  | Playfair Display  | Lora               |
| Handwritten   | Caveat            | Indie Flower      | Shadows Into Light |
| Neutral Sans  | system-ui         | Inter             | IBM Plex Sans      |

### SVG Vocabulary Theme Swap

The grammar stays (strokes, curves, rotation). The subject changes.

| Theme             | Primitives to draw                                           |
|-------------------|--------------------------------------------------------------|
| Florals (default) | blobs, vines-with-berries, petal-logo, squiggles, wavy-lines |
| Marine            | shells, seaweed-strands, fish-silhouettes, wave-marks        |
| Mid-century       | boomerangs, atoms, starbursts, tilted-stripes                |
| Herbs/Kitchen     | leaves, peppercorns, whisk-curls, citrus-wedges              |
| Space/Cosmic      | moons, comet-trails, constellation-dots, orbits              |

Whatever you pick, enforce: `stroke="#1a1a1a"`, `stroke-width: 1.2–2.5`, `linecap=round`, `Q`-curves, irregular rotation, overlapping opacity layers.

### Copy Language Mix

JA/EN/ZH is not mandatory. Any three-language mix works if you keep the bilingual-column structure in the intro block.

Valid alternatives:
- EN + FR (European-indie feel)
- EN + KO (K-artist feel)
- EN + ES (Latin-American indie feel)
- EN only — but then the intro must be poetic enjambed lines in one language

**If EN only**: split the intro block into two *emotional registers* (e.g. one column physical sensations, other column emotions) to keep the parallel structure.

### Product/Work Naming Convention

Single-kanji is one stylization. Alternatives that preserve the "one art object per name" feel:

- **Single ideogram** (default): 于 / 舞 / 风
- **Single lowercase word**: dream / root / pulse / wander
- **Two-character portmanteau**: lumo / shift / clay
- **Astronomical shortcut**: m17 / ngc-2 / sol-b

### Hero Tagline Alternatives

Pattern: `Everyday <X>. Sometimes <Y>.` (contrast mood-words)

- "Quiet most days. Loud on Sundays."
- "Slow mornings. Fast wishes."
- "Usually ink. Sometimes fire."

Avoid formulaic replacements that don't preserve the rhythm or the contrast.

### Section Count and Order

The 9-section rhythm is strong but not rigid:

- **Minimum**: hero → intro → products → about → contact (5 sections)
- **Extensions**: add journal, workshops, press kit — always with drawn dividers and pastel/white alternation
- **Products → Collections → News** can be reordered, but the overall "intro (poetic) → catalog (products) → archive (collections) → maker (about) → signal (news) → touch (contact)" arc is a strong default

## Brand Remix Recipes

### Recipe A — "Coffee Roaster" Remix

- Pastels: oat `#F2E7D5`, moss `#C3D0B4`, cream `#FFF4E0`, stone `#D4CFC6`
- Accent: espresso-orange `#BF5B2F`
- Fonts: Playfair Display (serif) + Kalam (handwritten) + Inter (sans)
- SVG theme: beans, leaves, steam-curls, wavy cup outlines
- Hero: "Everyday pour over. Sometimes slow drip."
- Products named after coffee regions as single words: `Yirg / Huila / Kona`

### Recipe B — "Ceramics Studio" Remix

- Pastels: kiln-cream `#EDE2CC`, glaze-blue `#C2D4E0`, raku-pink `#E0C6C0`, shino-tan `#D4C2A6`
- Accent: cobalt `#1E3A8A` (saturated deep blue)
- Fonts: Cormorant Garamond + Caveat Brush + Source Sans 3
- SVG theme: pot silhouettes, clay-coil spirals, smoke-wisps, kiln-flame marks
- Hero: "Mostly hands. Sometimes fire."

### Recipe C — "Herbalist Apothecary" Remix

- Pastels: linen `#F1EBE0`, sage `#CBD6BD`, rose-hip `#E8C8BC`, lavender `#D6D0DF`
- Accent: saffron `#E5A100`
- Fonts: Cormorant SC + Homemade Apple + IBM Plex Serif (as "sans" role — typewriter-ish)
- SVG theme: herb leaves, mortar-pestle, vial outlines, drop-shapes
- Hero: "Daily bitter. Occasional bloom."

## Checklist Before Shipping Your Remix

- [ ] Still has three font voices in three distinct roles
- [ ] Still 1 neutral + 4 pastels + 1 saturated accent, alternating sections
- [ ] All decorative SVGs use `#1a1a1a` strokes and Q-curves
- [ ] Drawn dividers (not `<hr>`) everywhere
- [ ] Ambient motion only (≥3500ms, ≤10px, no scroll-triggered)
- [ ] At least one bilingual-or-parallel poetic block
- [ ] Single-word/single-ideogram naming for at least one catalog section
- [ ] Hero uses a contrast-pair line ("Everyday X. Sometimes Y.")

If you hit 8/8 you've made a remix that belongs in the same family.
If you hit <5/8 you've made something else — which is fine, just don't call it "小耳-style."

## Attribution (for ethical remixing)

If you publish a remix publicly, credit the methodology:

```
Design methodology adapted from "小耳 Art Studio" (localhost:8899 / xiaoerai.xyz).
Original aesthetic by 小耳 (Jane). Methodology extracted & open-sourced CC-BY-4.0.
```

Do NOT copy the specific SVG illustrations, product names, or Japanese copy verbatim — those are 小耳's original work. The **methodology** is what this skill teaches; the **specific content** is Jane's.
