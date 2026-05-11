# Motion — Breath, Not Attention

> This file covers **ambient motion** — what the page does at rest. For **interactive motion** (physics, text spring, rotors), see `INTERACTION.md`, `PHYSICS_GARDEN.md`, `TEXT_SPRING.md`. The two systems are complementary: ambient = sleeping page; interactive = awake-but-gentle page.

The site has exactly **4 named ambient animations**. All of them are *ambient*: slow, small-amplitude, infinite, staggered. Nothing animates on scroll. Nothing pulses. Nothing demands.

## The Four Animations

### 1. `heroTextIn` — one-shot entrance

Triggered on page load. 800ms. Slides up 24px while fading in. The hero text is the only thing that animates on load.

```css
@keyframes heroTextIn {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0);    }
}
.hero-text {
  animation: heroTextIn 800ms cubic-bezier(0.22, 1, 0.36, 1) 200ms both;
}
```

**Timing**: `cubic-bezier(0.22, 1, 0.36, 1)` — the "out-expo" curve. Starts fast, lands soft. This is the SIGNATURE easing. Use for any one-shot entrance.

### 2. `about-float` — gentle vertical float

5px vertical bob. 3.6–5s per cycle. Used on text blocks in the About section.

```css
@keyframes about-float {
  0%, 100% { transform: translateY(0);     }
  50%      { transform: translateY(-5px);  }
}
.about-tag    { animation: about-float 4.0s ease-in-out  0ms infinite; }
.about-svg    { animation: about-float 3.6s ease-in-out  400ms infinite; }
.about-role   { animation: about-float 4.2s ease-in-out  800ms infinite; }
.about-name   { animation: about-float 5.0s ease-in-out 1300ms infinite; }
```

**Load-bearing**: stagger delays (0 / 400 / 800 / 1300ms) so the group never moves in unison. This is what makes it feel natural.

### 3. `nd-float` — decorative element float with fixed rotation

Same vertical float as `about-float` but preserves a rotation offset. Used on decorative SVGs anchored at corners.

```css
@keyframes nd-float-neg6 {
  0%, 100% { transform: translateY(0)    rotate(-6deg); }
  50%      { transform: translateY(-9px) rotate(-6deg); }
}
.nd-vine-tl { animation: nd-float-neg6 6.4s ease-in-out 0ms infinite; transform: rotate(-6deg); }
```

**Pattern**: one keyframe per rotation angle (since CSS `transform` overrides). Bake the rotation into the keyframes.

### 4. `nd-sway` — 4-keyframe rotation+scale jitter

Slightly more complex: rotation and scale micro-jitter over 4 keyframes. Used on decorative elements that should feel "alive" rather than just floating.

```css
@keyframes nd-sway-12 {
  0%   { transform: translateY(0)    rotate(12deg) scale(1);    }
  33%  { transform: translateY(-6px) rotate(16deg) scale(1.03); }
  66%  { transform: translateY(4px)  rotate(9deg)  scale(0.97); }
  100% { transform: translateY(0)    rotate(12deg) scale(1);    }
}
.nd-squig-tr {
  animation: nd-sway-12 7.0s ease-in-out -1500ms infinite;
  transform: rotate(12deg);
}
```

**Negative delay trick**: `-1500ms` starts the animation mid-cycle, so grouped elements don't "reset" together on the first load.

## Global Motion Rules

| Rule                                   | Value             | Why |
|----------------------------------------|-------------------|-----|
| Minimum idle duration                  | 3500ms            | Anything faster feels twitchy |
| Max amplitude                          | 10px translation  | Bigger draws attention |
| Max rotation jitter                    | ±4deg             | More = element reads as broken |
| Max scale jitter                       | ±0.03             | Subtle breath |
| Easing                                 | `ease-in-out`     | Never `linear` for idle |
| Iterations                             | `infinite`        | Never finite (except heroTextIn) |
| Scroll-triggered animations            | NONE              | The page is alive at rest |
| Hover on **functional** controls       | opacity only      | Buttons, links, cards. No scale/translate. |
| Hover on **decorative** elements       | physics-driven    | Drag, repel, or spin — see § Two Hover Categories below |
| Reduced-motion fallback                | mandatory         | `@media (prefers-reduced-motion: reduce) { animation: none; }` |

## Accessibility

Respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0ms !important;
  }
}
```

## Do Not Add

- Parallax on scroll — breaks the "still zine" feeling
- Entrance animations on scroll (fade-in-on-scroll, etc.) — contradicts the ambient aesthetic
- Any animation that loops under 3 seconds — reads as anxious
- Pulsing CTAs — the design doesn't need to yell
- Hover scale/translate on **functional** controls (product cards, links, buttons) — see § Two Hover Categories

## Two Hover Categories

Every hover-able element on the page falls into one of two strict camps. They have **different rules** and must not mix.

### Category 1 — Functional Controls (opacity only)

Product cards, links, buttons, nav items, CTAs — anything the visitor needs to *click to access content*.

```css
.product-card:hover {
  opacity: 0.92;       /* subtle darkening */
  transition: opacity 240ms ease-out;
}
```

**No scale, no translate, no filter, no shadow, no rotation.** The element must not move under the cursor — moving controls are anti-pattern UX (target evades, click misses).

### Category 2 — Decorative Elements (physics, drag, repulsion, rotation)

Decorative SVGs (floral blobs, stones, leaves, ornament marks) and the typography itself when used poetically — anything that exists to make the page feel *alive*, not to be clicked.

For these, **transform-based hover is not only allowed, it's the signature**:

| Element type             | Hover behavior          | Pattern doc                |
|--------------------------|-------------------------|----------------------------|
| Decorative SVG blobs     | Drag-with-gravity       | `PHYSICS_GARDEN.md`        |
| Per-character text       | Spring repulsion        | `TEXT_SPRING.md`           |
| Small SVG marks (flowers, plus signs) | Tangential spin / idle-spin boost | `INTERACTION.md` |

The rule that holds across both categories: **a hover should never feel like a UI state change.** Category 1 hovers are *imperceptible-but-noticed* (0.08 opacity drop). Category 2 hovers feel like *physical contact* (the element has weight; you touched it; it reacted).

If you can't honestly say "this looks like a real object responding to a cursor," fall back to Category 1 rules.

### Failure modes when mixing categories

- A product card that *scales up* on hover → reads like SaaS marketing, breaks the zine feeling
- A decorative blob that *only changes opacity* → it looks like a broken button, no signal that it's draggable
- A text block where every character moves AND it's also a link → ambiguous click target, frustrating
- Using `cursor: pointer` on a decorative blob → tells the user it's clickable when it isn't (use `cursor: grab` instead, or leave default)
