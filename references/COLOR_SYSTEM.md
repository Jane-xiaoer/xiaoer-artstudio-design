# Color System — The 1+4+1 Rule

## The Structure

```
1 neutral base    — white canvas + near-black ink
4 pastel tints    — rotated through sections
1 saturated accent — used ≤3 times per page
```

## Neutral Base

| Token          | Value     | Use |
|----------------|-----------|-----|
| canvas         | `#ffffff` | Default section background |
| wash           | `#f5f5f5` | Very-light hover / pressed states |
| ink-primary    | `#111111` | Headline text |
| ink-drawn-line | `#1a1a1a` | ALL SVG strokes (never pure #000) |
| ink-secondary  | `#444444` | Body text |
| ink-muted      | `#888888` | Captions, timestamps |

**Rule**: SVG strokes **never** use `#000`. Always `#1a1a1a`. The 5% softening reads as "ink, not pixels."

## The Four Pastels

Equal-luminance tints for section rotation:

| Name   | Hex       | Feeling                    | Section examples       |
|--------|-----------|----------------------------|------------------------|
| mint   | `#CCE8B0` | fresh, grass-morning       | Products               |
| cream  | `#FFF8BE` / `#FEFCE0` | warm, letterpaper | About / Studio         |
| cherry | `#FFE5E5` | soft, blushing             | New-arrivals / Seasonal|
| sky    | `#C2EEF7` | cool, rest                 | Contact / Newsletter   |

Secondary pastels available for remix (use sparingly):
- sage `#B8D8B0`, mint-2 `#DDECC8`, peach `#C8A898`, teal `#8AADA8`, olive `#D8D870`

## Rotation Pattern

The site alternates `white → pastel → white → pastel` so white acts as rest between tints:

```
Hero:        #FFFFFF
Brand intro: #FFFFFF
Products:    #CCE8B0  (mint)
Collections: #FFFFFF
About:       #FEFCE0  (cream)
News:        #FFFFFF
Contact:     #C2EEF7  (sky)
Footer:      #FFFFFF
```

**Rule**: Never place two pastel sections back-to-back. Always a white rest between them.

## The Lime Accent

`#c8ff00` — chartreuse, very high saturation.

Used on the site in exactly 2 visible places:
1. A small `+` cross icon near the hero (decorative spark)
2. A larger `+` cross in the mid-page decoration band

**Quota**: **≤ 3 total uses per page.** If you want a 4th, redesign instead.

**Never**:
- Use lime as a CTA button fill (too aggressive)
- Use lime as a link color
- Pair lime with any other saturated color (red / blue / pink) — they fight
- Use lime on a pastel background without black outline (contrast fails)

## SVG Palette (for decorative illustrations)

When emitting botanical/floral SVGs, draw from this set:

```
Petals/blobs:  #f0b0c0  #f5bec8  #a8d4e0  #b8d8c8  #e879a0
Stamen:        #ffe066
Stems:         #4a9855  #5aab60  #78c068  #88c890
Berries:       #d8d825 (fill) + #5a6018 (outline)
Shadow fills:  #98b8d8  #9098a8  #b0b8c8
Red bloom:     #e06868  #e87878
Sage/teal:     #60b8a0  #98d870  #78b8c0
Dot-divider:   #5a8a38  (olive-green, 1.5px circles)
```

All of these pair with `#1a1a1a` strokes.

## Failure Modes

- **Too many pastels** (≥5) → rotation loses rhythm, feels like a candy store
- **Two pastels adjacent** → viewer can't register where section ends
- **Lime used ≥4 times** → stops feeling like a spark, becomes the brand color
- **Pure black `#000` strokes** → decoration reads as mechanical clipart
- **Pastel as nav/header background** → violates the "white as canvas" assumption
