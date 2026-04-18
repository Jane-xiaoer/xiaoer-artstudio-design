# Typography — Three Voices, Three Jobs

## The Stack

```css
--serif:  'DM Serif Display', Georgia, 'Songti SC', serif;
--hand:   'Caveat', 'Dancing Script', cursive;
--sans:   system-ui, -apple-system, 'Helvetica Neue',
          'PingFang SC', 'Hiragino Kaku Gothic ProN', sans-serif;
```

Load via Google Fonts (or self-host for performance):

```html
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

## Role Matrix (DO NOT VIOLATE)

| Role                    | Font        | Size    | Weight | Italic | Notes |
|-------------------------|-------------|---------|--------|--------|-------|
| Brand wordmark (nav)    | serif       | 20px    | 400    | ✓      | "小耳 Art Studio" |
| Brand subtitle (nav)    | sans        | 13px    | 400    | ✗      | "by 小耳" in muted gray |
| Hero headline           | handwritten | 56px    | 400    | ✗      | Two short lines max |
| Section label           | handwritten | 32px    | 400    | ✗      | One word: Products / About / News / Contact |
| Work/collection title   | serif       | 20px    | 400    | ✓      | "Daily Flowers" |
| Work subtitle (EN small)| sans        | 13px    | 400    | ✗      | Translation or descriptor |
| Body paragraph          | sans        | 15px    | 400    | ✗      | line-height 1.9 |
| Caption / small label   | sans        | 12px    | 400    | ✗      | uppercase, letter-spacing 0.08em |
| Product code/price      | sans        | 12–14px | 400    | ✗      | "¥399" |
| Product name (kanji)    | sans        | 16px    | 400    | ✗      | Single ideogram, centered |

## The Three Voices

**1. Editorial Serif** (DM Serif Display italic)
- Job: "this is curated, museum-worthy"
- Used for: collection titles, work names, brand wordmark
- Never used for: body text, metadata, UI chrome

**2. Handwritten Cursive** (Caveat)
- Job: "the artist's own hand left a bookmark"
- Used for: section labels (Products/About/etc), hero headline
- Never used for: body text, prices, multi-line paragraphs

**3. Neutral Sans** (system-ui)
- Job: "deliver information without personality"
- Used for: body text, product names, prices, captions, nav links
- Never used for: hero headline, section labels, collection titles

## Why No 4th Font

Every additional font introduces a voice that needs a job. Four voices = one of them is decorative = the system cracks. The three-role structure is load-bearing.

## Localization Fallbacks

For ZH/JA text rendered in `sans`:

```css
font-family: system-ui, -apple-system,
  'PingFang SC',           /* macOS Chinese */
  'Hiragino Kaku Gothic ProN', /* macOS Japanese */
  'Microsoft YaHei',       /* Windows Chinese */
  'Yu Gothic',             /* Windows Japanese */
  sans-serif;
```

For ZH in `serif` (rare — only for brand wordmark):

```css
font-family: 'DM Serif Display', 'Songti SC', 'Songti TC', 'STSong', Georgia, serif;
```

Caveat has **no Chinese glyphs**. If a section label must be in Chinese, either:
- (a) use a Chinese handwritten font like "LXGW WenKai", or
- (b) keep the label in English even if rest is Chinese (common on Japanese sites)

Option (b) is more brand-consistent.

## Line Rhythm

- Body paragraphs: `line-height: 1.9` (generous — don't go below 1.7)
- Hero headline: `line-height: 1.3`
- Between paragraphs: 28px margin (about 2× line-height)
- Bilingual columns: match line count in both columns, one idea per line
