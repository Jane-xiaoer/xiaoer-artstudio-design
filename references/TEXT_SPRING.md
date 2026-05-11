# Text Spring — Per-Character Repulsion

> The bio paragraph in the About section and every title in the News section are not paragraphs of text. They are **clouds of `<span>`s**, one per character, each with its own velocity, displacement, and spring-return force. When the cursor approaches, characters within a radius `R` are pushed away with force proportional to `(1 - d/R) * F`. When the cursor leaves, they spring back to their original position.

This is the layer that makes reading the page feel **gentle and alive**, like rain on still water. Without it, the typography is just typography.

## The Three Phases

```
Phase 1 — Split           : recursively walk text nodes, replace each char with a <span>
Phase 2 — Track            : on mouseenter/mousemove, capture cursor position
Phase 3 — Tick (rAF loop)  : for each char span:
                              if within R px of cursor → add repulsion force
                              always add spring-return force toward origin
                              integrate velocity, write transform
```

## Markup Contract

```html
<section id="about">
  <div class="about-bio">
    <p class="bio-zh">每一件作品都是一次温柔的呼吸…</p>
    <p class="bio-en">Every piece is a gentle breath…</p>
  </div>
  <div class="about-tag">Profile</div>
  <div class="about-role">Artist &amp; Creator</div>
  <div class="about-name-zh">小耳</div>
</section>
```

After `splitToSpans` runs, the DOM looks like:

```html
<p class="bio-zh">
  <span style="display:inline-block">每</span>
  <span style="display:inline-block">一</span>
  <span style="display:inline-block">件</span>
  …
  <span style="display:inline">  </span>   <!-- spaces stay inline so they collapse normally -->
  …
</p>
```

**Spaces matter**: `&nbsp;` and regular spaces are kept as plain inline spans (not inline-block) so they collapse as the browser expects. Inline-block spaces would create gaps that look broken.

## Phase 1 — `splitToSpans`

Recursive walker that preserves nested markup (`<br>`, `<strong>`, etc.) and child elements (e.g., a wavy-line SVG inside a row).

```js
const chars = [];   // collected during split, used by Phase 3

function splitToSpans(srcNode, destParent) {
  if (srcNode.nodeType === Node.TEXT_NODE) {
    [...srcNode.textContent].forEach(ch => {
      const sp = document.createElement('span');
      sp.textContent = ch;
      if (ch === ' ' || ch === ' ') {
        sp.style.display = 'inline';            // don't push
      } else {
        sp.style.display = 'inline-block';      // pushable
        chars.push({ el: sp, vx: 0, vy: 0, ox: 0, oy: 0 });
      }
      destParent.appendChild(sp);
    });
  } else if (srcNode.nodeName === 'BR') {
    destParent.appendChild(document.createElement('br'));
  } else {
    // Clone the element shell (e.g., <p class="bio-zh">), recurse into its children
    const el = document.createElement(srcNode.tagName.toLowerCase());
    [...(srcNode.attributes || [])].forEach(a => el.setAttribute(a.name, a.value));
    destParent.appendChild(el);
    [...srcNode.childNodes].forEach(child => splitToSpans(child, el));
  }
}

// Usage — split each target element in place:
[bioEl, document.querySelector('.about-tag'), …]
  .filter(Boolean)
  .forEach(el => {
    const nodes = [...el.childNodes];
    el.innerHTML = '';
    nodes.forEach(node => splitToSpans(node, el));
  });
```

**Why a snapshot of `childNodes` first**: you can't mutate `el.innerHTML` while iterating its live children. Take the snapshot, clear, re-emit.

**`{ el, vx, vy, ox, oy }`**: per-char state — `el` is the span, `vx/vy` is velocity, `ox/oy` is current offset from origin. Origin = position at split time (browser flow position). The transform is applied as `translate(ox, oy)`, so the char is always at `origin + offset`.

## Phase 2 — Cursor Tracking

```js
const section = document.getElementById('about');
let mx = -999, my = -999;
let rafId = null;

section.addEventListener('mouseenter', () => { if (!rafId) rafId = requestAnimationFrame(tick); });
section.addEventListener('mouseleave', () => {
  mx = my = -999;                           // sentinel: "no cursor"
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
});
section.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
```

The `-999` sentinel pattern: cleaner than `null` because the tick function can compare numerically (`if (mx > -900)`) without a null-check branch. The sentinel is "off-screen far enough to never accidentally repulse anything."

**RAF lifecycle**: only run the tick loop while the cursor is over the section. Otherwise `getBoundingClientRect()` keeps being called on every char on every frame — wasteful even if nothing visible happens.

## Phase 3 — The Tick

```js
const R = 55;   // repulsion radius (px)
const F = 8;    // peak repulsion force

function tick() {
  rafId = requestAnimationFrame(tick);

  chars.forEach(c => {
    const r  = c.el.getBoundingClientRect();
    if (r.width === 0) return;                 // skip hidden chars
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = cx - mx, dy = cy - my;
    const d  = Math.hypot(dx, dy);

    // Repulsion: only when cursor is within R
    if (mx > -900 && d < R && d > 0.5) {
      const f = (1 - d / R) * F;               // linear falloff
      c.vx += (dx / d) * f;
      c.vy += (dy / d) * f;
    }

    // Spring back to origin (Hooke's law, k = 0.12)
    c.vx += -c.ox * 0.12;
    c.vy += -c.oy * 0.12;

    // Damping (drag coefficient = 0.70)
    c.vx *= 0.70;
    c.vy *= 0.70;

    // Integrate
    c.ox += c.vx;
    c.oy += c.vy;

    // Apply (skip when displacement is negligible — avoids continuous style writes)
    if (Math.abs(c.ox) + Math.abs(c.oy) > 0.05) {
      c.el.style.transform = `translate(${c.ox.toFixed(2)}px, ${c.oy.toFixed(2)}px)`;
    }
  });
}
```

## Two Personality Profiles

The site uses slightly different tunings in two places. The differences matter:

| Param         | About (bio + labels) | News (titles + dates) | Effect when bigger |
|---------------|----------------------|------------------------|--------------------|
| Radius `R`    | `28`                 | `55`                   | Cursor "reach" — bigger feels like a gust, smaller feels like a brush |
| Force  `F`    | `7`                  | `8`                    | How hard chars get pushed |
| Spring k      | `0.15`               | `0.12`                 | How quickly they snap back — bigger = snappier |
| Damping       | `0.68`               | `0.70`                 | How much energy is lost per frame — bigger = floatier |
| Activation threshold | `0.05`         | `0.05`                 | Below this, stop writing styles (perf) |

**About profile** (small radius, snappy return): chars react only when the cursor is *almost touching* them. Reading flows naturally; only the char under the cursor flinches.

**News profile** (large radius, softer return): chars react from further away, and the wave moves through them as the cursor passes. Better for short titles where you *want* the whole title to react together.

Pick by question: "is this text meant to be **read** (small radius) or **glanced at** (large radius)?"

## With Pencil Cursor (the About variant)

The bio section replaces the system cursor with a **custom-drawn SVG pencil** that lerps toward the mouse position and rotates toward the movement direction. Visitors see a pencil tip "writing" through the text while the chars get pushed.

```js
// Create the pencil DOM
const pen = document.createElement('div');
pen.style.cssText =
  'position:fixed;pointer-events:none;z-index:9999;width:36px;height:36px;' +
  'transform-origin:50% 94%;opacity:0;transition:opacity .2s;will-change:transform;';
pen.innerHTML = `<svg width="36" height="36" viewBox="0 0 36 36" fill="none">
  <rect x="14"  y="1"   width="8"  height="5"  rx="1.5" fill="#f4a0a0"/>     <!-- eraser ferrule -->
  <rect x="13.5" y="5.5" width="9"  height="1.5"        fill="#c47070"/>    <!-- metal band -->
  <rect x="14"  y="7"   width="8"  height="20"          fill="#f0dc60"/>    <!-- yellow body -->
  <polygon points="14,27 22,27 18,34"                    fill="#e0c070"/>   <!-- wood -->
  <polygon points="16.2,29.5 19.8,29.5 18,34"           fill="#444"/>      <!-- graphite tip -->
  <rect x="19"  y="7"   width="2"  height="20"          fill="rgba(255,255,255,0.22)"/> <!-- highlight -->
  <rect x="14"  y="5.5" width="8"  height="1.5"         fill="rgba(0,0,0,0.08)"/>      <!-- band shadow -->
</svg>`;
document.body.appendChild(pen);

// In start/stop handlers:
function start() {
  pen.style.opacity = '1';
  section.style.cursor = 'none';                    // hide system cursor
  if (!rafId) rafId = requestAnimationFrame(tick);
}
function stop() {
  pen.style.opacity = '0';
  section.style.cursor = '';
  /* reset mx/my as before, cancel RAF */
}

// Inside tick, before the char loop:
let px = -999, py = -999;        // pencil lerped position
let prevMx = -999, prevMy = -999, angle = -0.8;

if (mx > -900) {
  px += (mx - px) * 0.12;        // lerp toward cursor (smooth pen motion)
  py += (my - py) * 0.12;
}

if (prevMx > -900 && mx > -900) {
  const dmx = mx - prevMx, dmy = my - prevMy;
  if (Math.hypot(dmx, dmy) > 1.5) {                 // ignore micro-jitter
    let t  = Math.atan2(dmy, dmx) - Math.PI / 4;    // 45° offset so tip leads
    let da = t - angle;
    while (da >  Math.PI) da -= 2 * Math.PI;        // shortest-path rotation
    while (da < -Math.PI) da += 2 * Math.PI;
    angle += da * 0.12;
  }
}
prevMx = mx; prevMy = my;

if (px > -900) {
  pen.style.transform =
    `translate(${(px - 18).toFixed(1)}px, ${(py - 34).toFixed(1)}px) rotate(${angle.toFixed(2)}rad)`;
}

// Then in the char loop, use px/py (not mx/my) as the repulsion source:
const dx = cx - px, dy = cy - py;
```

The pencil **lerps** (smooths) the cursor position so the pencil tip never jitters, even if the mouse moves erratically. The chars are repulsed by the *pencil tip position*, not the raw cursor — so the pen tip is what physically "writes" through the text.

**When to use the pencil**: brand involves writing, art, journaling, handicraft. The pencil is a brand signifier as much as an interaction.
**When to skip the pencil**: brand is technical / clinical / electronic. A pencil would feel like cosplay.

## Edge Cases

| Case                                              | Handling                                                      |
|---------------------------------------------------|---------------------------------------------------------------|
| Section contains nested SVG (e.g., wavy line)     | `splitToSpans` recurses into children, leaves non-text nodes (like SVG) untouched |
| Resize / reflow during interaction                | Each tick re-reads `getBoundingClientRect()` so reflow is automatically respected |
| Touch device, no hover                            | `mouseenter` doesn't fire on touch. Either add `pointerdown`/`pointermove` handlers, or accept this as a desktop-only enhancement |
| `prefers-reduced-motion: reduce`                  | Wrap `start()` in `if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;` |
| Section taller than viewport                      | `mouseenter` still fires when cursor enters the bounding box, even if the user is reading the bottom — works fine |

## Common Failure Modes

| Symptom                                              | Cause                                                         |
|------------------------------------------------------|---------------------------------------------------------------|
| Chars jitter even when cursor isn't moving           | Forgot the `> 0.05` activation threshold — every frame writes a new transform |
| Spaces between words look too wide                   | Spaces became `inline-block` — keep them as plain `inline`    |
| Chars don't return to origin                         | Forgot the spring-back term (`c.vx += -c.ox * 0.12`)          |
| Chars fly off and never return                       | Damping `>= 1` — set to < 1 (0.65–0.75 is the sweet spot)     |
| Cursor "drags" the whole word as a chunk             | Used `wordwise` split instead of charwise — split per char    |
| First mouseenter has a snap-to-cursor jump           | Use the `-999` sentinel + `mx > -900` guard so the first frame after entering doesn't compute against stale coords |

## Performance

Each tick reads `getBoundingClientRect()` on every char span. For a typical paragraph of ~80 chars, that's 80 layout reads per frame = ~0.3ms on a modern laptop. Fine.

If you split a 5000-char section (don't), you'll force layout thrashing. **Hard limit: ~500 chars per spring section.** Beyond that:

- Split only titles & captions, not body paragraphs
- OR pre-compute origin rects once on mount and update only on resize
- OR use `IntersectionObserver` to throttle when offscreen

The reference site doesn't do any of these. It assumes you won't split a 5000-char paragraph.

---

## Voice line

> 字会让一让,但还是会回来。像被人轻轻喊过一声名字。
