# SVG Primitives — Paste-Ready Assembly

Eight ready-to-paste SVG primitives following the hand-drawn grammar from `../references/SVG_VOCABULARY.md`. Drop them into any HTML or JSX. Mix fills from `../references/COLOR_SYSTEM.md#svg-palette`.

> Strokes are always `#1a1a1a`. Fills are drawn from the SVG palette. Rotate each instance at an **irregular radian** so multiples don't snap to a grid.

---

## 1. Organic Blob (floral rock / island / cell)

```xml
<svg width="280" height="240" viewBox="0 0 420 370" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 220 Q42 92 178 52 Q292 18 362 98 Q402 158 387 262 Q368 332 272 358 Q172 382 100 332 Q28 292 30 220Z"
        fill="#f0b0c0" stroke="#1a1a1a" stroke-width="2.5"/>
  <path d="M30 220 Q48 132 140 92 Q222 65 294 88 Q272 142 232 166 Q182 186 132 186 Q68 186 30 220Z"
        fill="#98b8d8" stroke="#1a1a1a" stroke-width="1.5"/>
  <path d="M294 88 Q362 98 387 192 Q362 222 322 232 Q282 236 252 210 Q272 170 294 88Z"
        fill="#b0b8c8" stroke="#1a1a1a" stroke-width="1.5"/>
  <path d="M76 228 Q128 208 188 224 Q248 238 302 218" fill="none" stroke="#d8d820" stroke-width="4" stroke-linecap="round"/>
  <path d="M66 258 Q122 238 186 255 Q248 270 308 250" fill="none" stroke="#d8d820" stroke-width="4" stroke-linecap="round"/>
  <path d="M72 288 Q128 268 194 285 Q255 302 314 282" fill="none" stroke="#d8d820" stroke-width="4" stroke-linecap="round"/>
</svg>
```

**Palette variants** — swap the 3 main fills:
- Pink/blue (default): `#f0b0c0 / #98b8d8 / #b0b8c8`
- Sage/blue:           `#60b8a0 / #98d870 / #78b8c0`
- Muted gray:          `#9098a8 / #e87878 / #78b8c0`

---

## 2. Stem with Berries (vertical vine)

```xml
<svg width="86" height="232" viewBox="0 0 130 350" xmlns="http://www.w3.org/2000/svg">
  <path d="M63 342 Q58 262 65 182 Q68 122 63 28" stroke="#4a9855" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M63 182 Q38 155 13 162" stroke="#4a9855" stroke-width="3.5" fill="none"/>
  <path d="M63 162 Q88 134 112 142" stroke="#4a9855" stroke-width="3.5" fill="none"/>
  <path d="M63 102 Q36 80 10 88"   stroke="#4a9855" stroke-width="3.5" fill="none"/>
  <circle cx="12"  cy="160" r="18" fill="#d8d825" stroke="#5a6018" stroke-width="2"/>
  <circle cx="114" cy="140" r="18" fill="#d8d825" stroke="#5a6018" stroke-width="2"/>
  <circle cx="9"   cy="86"  r="16" fill="#d8d825" stroke="#5a6018" stroke-width="2"/>
  <circle cx="63"  cy="24"  r="20" fill="#d8d825" stroke="#5a6018" stroke-width="2"/>
</svg>
```

---

## 3. Small Wavy Underline (section label accent)

```xml
<svg class="wavy" viewBox="0 0 108 10" width="108" height="10" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 7 Q13 2 27 7 Q40 12 54 7 Q67 2 81 7 Q94 12 108 7"
        stroke="#1a1a1a" stroke-width="1.5" fill="none"/>
</svg>
```

## 3b. Long Wavy Divider (full-width under section labels)

```xml
<svg viewBox="0 0 1200 14" preserveAspectRatio="none" width="100%" height="14" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 7 Q60 3 120 7 Q180 11 240 7 Q300 3 380 7 Q460 11 540 7 Q620 3 700 7 Q780 11 860 7 Q940 3 1020 8 Q1080 11 1140 7 Q1170 4 1200 7"
        stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
</svg>
```

---

## 4. Petal Logo (5-fold floral nav mark)

```xml
<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
  <g transform="rotate(0 22 22)">
    <path d="M22 21 C19 20 15 17 14 13 C13 9 15 5 18 4 C20 3 22 4 23 6 C25 4 27 3 29 5 C31 7 31 11 29 14 C27 17 24 20 22 21Z" fill="#f0b0c0" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M22 19 C20 18 18 16 17 13 C16 11 17 8 19 7 C20 6 21 7 22 8 C23 7 24 7 25 8 C26 10 26 13 25 15 C24 17 23 18 22 19Z" fill="#a8d4e0" stroke="#1a1a1a" stroke-width="0.7"/>
  </g>
  <g transform="rotate(72 22 22)">
    <path d="M22 21 C19 20 15 17 14 13 C13 9 15 5 18 4 C20 3 22 4 23 6 C25 4 27 3 29 5 C31 7 31 11 29 14 C27 17 24 20 22 21Z" fill="#f5bec8" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M22 19 C20 18 18 16 17 13 C16 11 17 8 19 7 C20 6 21 7 22 8 C23 7 24 7 25 8 C26 10 26 13 25 15 C24 17 23 18 22 19Z" fill="#b8d8c8" stroke="#1a1a1a" stroke-width="0.7"/>
  </g>
  <g transform="rotate(144 22 22)">
    <path d="M22 21 C19 20 15 17 14 13 C13 9 15 5 18 4 C20 3 22 4 23 6 C25 4 27 3 29 5 C31 7 31 11 29 14 C27 17 24 20 22 21Z" fill="#f0b0c0" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M22 19 C20 18 18 16 17 13 C16 11 17 8 19 7 C20 6 21 7 22 8 C23 7 24 7 25 8 C26 10 26 13 25 15 C24 17 23 18 22 19Z" fill="#a8d4e0" stroke="#1a1a1a" stroke-width="0.7"/>
  </g>
  <g transform="rotate(216 22 22)">
    <path d="M22 21 C19 20 15 17 14 13 C13 9 15 5 18 4 C20 3 22 4 23 6 C25 4 27 3 29 5 C31 7 31 11 29 14 C27 17 24 20 22 21Z" fill="#f5bec8" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M22 19 C20 18 18 16 17 13 C16 11 17 8 19 7 C20 6 21 7 22 8 C23 7 24 7 25 8 C26 10 26 13 25 15 C24 17 23 18 22 19Z" fill="#b8d8c8" stroke="#1a1a1a" stroke-width="0.7"/>
  </g>
  <g transform="rotate(288 22 22)">
    <path d="M22 21 C19 20 15 17 14 13 C13 9 15 5 18 4 C20 3 22 4 23 6 C25 4 27 3 29 5 C31 7 31 11 29 14 C27 17 24 20 22 21Z" fill="#f0b0c0" stroke="#1a1a1a" stroke-width="1.2"/>
    <path d="M22 19 C20 18 18 16 17 13 C16 11 17 8 19 7 C20 6 21 7 22 8 C23 7 24 7 25 8 C26 10 26 13 25 15 C24 17 23 18 22 19Z" fill="#a8d4e0" stroke="#1a1a1a" stroke-width="0.7"/>
  </g>
  <circle cx="22" cy="22" r="4" fill="#e879a0" stroke="#1a1a1a" stroke-width="1"/>
  <circle cx="22" cy="17" r="1" fill="#ffe066" transform="rotate(36 22 22)"/>
  <circle cx="22" cy="17" r="1" fill="#ffe066" transform="rotate(108 22 22)"/>
  <circle cx="22" cy="17" r="1" fill="#ffe066" transform="rotate(180 22 22)"/>
  <circle cx="22" cy="17" r="1" fill="#ffe066" transform="rotate(252 22 22)"/>
  <circle cx="22" cy="17" r="1" fill="#ffe066" transform="rotate(324 22 22)"/>
</svg>
```

---

## 5. Loose Squiggle (corner decoration)

```xml
<svg width="90" height="64" viewBox="0 0 90 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M4 54 C12 40 8 24 20 16 C30 8 36 24 44 18 C52 12 54 -2 66 4 C76 10 74 28 88 24"
        stroke="#5aab60" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.78"/>
  <path d="M4 64 C14 52 12 38 24 32 C34 26 38 40 48 34"
        stroke="#78c068" stroke-width="1.6" stroke-linecap="round" fill="none" opacity="0.55"/>
</svg>
```

---

## 6. Tiny Lime Cross (the spark — use ≤3 per page)

```xml
<svg width="52" height="52" viewBox="0 0 52 52" style="transform: rotate(2.44289rad);" xmlns="http://www.w3.org/2000/svg">
  <line x1="26" y1="2"  x2="26" y2="50" stroke="#c8ff00" stroke-width="4" stroke-linecap="round"/>
  <line x1="2"  y1="26" x2="50" y2="26" stroke="#c8ff00" stroke-width="4" stroke-linecap="round"/>
</svg>
```

---

## 7. Tulip Trio (spring/summer band)

```xml
<svg width="160" height="200" viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M35 195 Q32 140 40 88" stroke="#88c890" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M80 198 Q83 138 75 82" stroke="#88c890" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M125 195 Q128 142 120 90" stroke="#78b880" stroke-width="3" fill="none" stroke-linecap="round"/>
  <polygon points="40,88 28,68 40,50 52,68" fill="#e06868" opacity="0.9"/>
  <polygon points="75,82 63,62 75,44 87,62" fill="#e06868" opacity="0.9"/>
  <polygon points="120,90 108,70 120,52 132,70" fill="#e06868" opacity="0.9"/>
</svg>
```

---

## 8. Dotted-Line Section Divider

```xml
<svg width="100%" height="16" viewBox="0 0 1920 16" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <g fill="#5a8a38">
    <!-- Render 120 circles at 16px spacing; below shows the pattern, generate programmatically: -->
    <circle cx="8"  cy="8" r="1.5"/>
    <circle cx="24" cy="8" r="1.5"/>
    <circle cx="40" cy="8" r="1.5"/>
    <!-- … repeat through cx="1912" cy="8" r="1.5" … -->
  </g>
</svg>
```

Or with pure CSS (works on any element):

```css
.divider {
  height: 16px;
  background-image: radial-gradient(circle, #5a8a38 1.5px, transparent 1.5px);
  background-size: 16px 16px;
  background-repeat: repeat-x;
  background-position: center;
}
```

---

## How To Use These Together

A typical hero decoration band uses **4–6 primitives** combined:

1. 1× Organic Blob (large, left-center, rotated `-0.2rad`)
2. 1× Organic Blob (different palette variant, center-right, rotated `+0.6rad`)
3. 1× Stem with Berries (far right, rotated `+1.3rad`)
4. 1× Tulip Trio (far left, rotated `-1.0rad`)
5. 1× Tiny Lime Cross (small, somewhere between them, rotated `+2.4rad`)
6. 1× Loose Squiggle (corner filler)

Use CSS `position: absolute` with `translate(x, y)` to place them along the bottom edge, letting them bleed off-screen.

When composing: pick rotations from odd-looking radians (e.g. `0.125`, `-0.59`, `1.34`, `2.44`) — never `0`, `π/4`, `π/2`, etc.
