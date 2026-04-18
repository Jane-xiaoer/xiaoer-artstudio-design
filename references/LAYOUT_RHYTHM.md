# Layout Rhythm — 9 Sections in Sequence

The page is a **stack of 9 sections**, each with a defined role, background, and layout. The vertical rhythm works because each section has a specific emotional temperature, and pastels alternate with white rests.

## Section Map (top → bottom)

| # | Name         | Background | Role                                    | Layout               |
|---|--------------|------------|-----------------------------------------|----------------------|
| 1 | hero         | `canvas`   | Tagline + signature decoration          | Full-viewport, text-centered, decoration-bottom |
| 2 | nav-panel    | `mint-2`   | (Off-canvas slide-in) menu drawer       | Side panel, not inline |
| 3 | brand-intro  | `canvas`   | Bilingual poetic manifesto + CTA        | 2-column (JA left / EN right) + centered button |
| 4 | products     | `mint`     | Grid of ~8 products in circle thumbs    | 4×2 grid, circular thumbnails |
| 5 | collections  | `canvas`   | 3 featured series                       | 3-column, large B&W thumbnails above captions |
| 6 | about        | `cream-2`  | Artist profile + external links         | Left text + right portrait circle + link chips |
| 7 | news         | `canvas`   | Date-indexed press/exhibitions          | Date / Title / EN subtitle / tags / excerpt |
| 8 | contact      | `sky`      | Contact channels in 2-column grid       | 2×N grid, each cell = channel + handle |
| 9 | footer       | `canvas`   | Wordmark + legal links + copyright      | Centered, minimal |

## Vertical Spacing

- **Section padding**: 96px top/bottom (desktop), 64px (mobile)
- **Horizontal padding**: `max(48px, 6vw)` — breathing room scales with viewport
- **Between dividers and section label**: 48–64px
- **Between paragraphs (within a section)**: 28px

## Dividers Between Sections

There are **two types** of dividers, used at different positions:

### Dotted-line divider (between sections)

Use below a section, above the next section. Implement as an SVG pattern or `repeating-linear-gradient`:

```html
<div class="section-divider" aria-hidden="true">
  <svg width="100%" height="16" viewBox="0 0 1920 16" preserveAspectRatio="none">
    <g fill="#5a8a38">
      <!-- Generate ~120 circles at 16px intervals across the width -->
      <circle cx="8"  cy="8" r="1.5"/>
      <circle cx="24" cy="8" r="1.5"/>
      <!-- … -->
    </g>
  </svg>
</div>
```

Or via CSS (works when width is known):
```css
.section-divider {
  height: 16px;
  background-image: radial-gradient(circle, #5a8a38 1.5px, transparent 1.5px);
  background-size: 16px 16px;
  background-repeat: repeat-x;
  background-position: center;
}
```

### Wavy-line divider (under section labels)

Used immediately below a handwritten section label like "Products":

```html
<div class="section-label">
  <h2>Products</h2>
  <svg class="wavy" viewBox="0 0 1200 14" preserveAspectRatio="none" width="100%" height="14">
    <path d="M0 7 Q60 3 120 7 Q180 11 240 7 Q300 3 380 7 Q460 11 540 7 Q620 3 700 7 Q780 11 860 7 Q940 3 1020 8 Q1080 11 1140 7 Q1170 4 1200 7"
          stroke="#1a1a1a" stroke-width="1.2" fill="none"/>
  </svg>
</div>
```

**Rule**: NEVER use `<hr>`, `border-top`, or `border-bottom` for section structure. Always drawn dividers.

## Hero Anatomy

The hero is the most methodologically important section. Its structure:

```
┌─────────────────────────────────────────────────┐
│ [小耳 Art Studio]              [flower icon]    │ ← nav bar (64px)
│ [by 小耳]                                       │
├─────────────────────────────────────────────────┤
│                                                 │
│                                                 │
│                                                 │ 45% of viewport
│                                                 │ = blank breath
│                                                 │
│            Everyday uki uki.                    │ ← headline centered
│            Sometimes doki doki.                 │   (handwritten 56px)
│                                                 │
│                                                 │
│                                                 │
│ [SCROLL]                     [CHECK PRODUCTS] → │ ← rotated side labels
│ ┌────┐  ┌──────┐    ┌──────┐  ┌────┐           │
│ │blob│  │ blob │    │ blob │  │blob│           │ ← decoration band
│ │    │  │ blob │    │ blob │  │    │           │   at BOTTOM ONLY
│ └────┘  └──────┘    └──────┘  └────┘           │
└─────────────────────────────────────────────────┘
```

**Load-bearing rules**:
- Text is centered vertically around **60% of the viewport** (NOT 50%)
- Decorative SVG blobs occupy the bottom ~30% and extend beyond the viewport edge (bleed)
- Side labels ("SCROLL" / "CHECK THE PRODUCTS") are rotated 90° at left/right margins in small sans, uppercase, `letter-spacing: 0.15em`

## Products Grid

- 4 columns × 2 rows on desktop
- Circular thumbnail (aspect 1:1, `border-radius: 50%`, overflow:hidden)
- Thumbnail background is a **subtler pastel** than the section background (e.g. sand/beige on mint)
- Below thumb: small status badge pill (`新作 / 仅剩少量 / 含附赠`), product kanji name (16px), price (12px muted)
- Gap between cells: 48px

## Collections Triptych

- 3 equal columns
- Each cell: large B&W generative-art image (aspect ratio free, ~1:1 to 1:1.2)
- Below: ordinal label ("1st Collection" in tiny caps), serif italic title, single-sentence ZH description
- Images carry weight — they're the one "artistic artifact" on the page

## Contact Grid

- 2 columns × N rows (N = number of channels)
- Each cell: tiny uppercase channel label (`微信 / X · TWITTER / 邮箱 / 视频号`) + handle in italic serif or sans
- Separator: fine 1px line in `#ccc` between rows (this is the ONE permitted use of a CSS border)

## Footer

- Centered wordmark (serif italic "小耳 Art Studio" + "by 小耳" sans below)
- 3 inline links separated by pipes: `Legal Notice | Privacy Policy | Refund | Shipping`
- `©YYYY, 小耳 Art Studio` copyright line

Footer is the ONLY place where serif and sans both appear centered with no decoration — it's a restful sign-off.
