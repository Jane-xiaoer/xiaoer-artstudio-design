# Physics Garden — Drag-able SVG Decorations

> The hero and footer decorations are not floated by CSS. They are **circular Matter.js rigid bodies** with the SVGs glued on top by per-frame `transform`. They fall from above the viewport, settle on a floor, and can be grabbed and thrown with the cursor.

This pattern is **what makes the site feel like the visitor walked into a quiet room and the air pressure changed.** Without it, the SVGs are still pretty. With it, they have weight.

## The Two-Layer Model

```
DOM layer  →  inline <svg> elements, no positioning of their own
Physics    →  Matter.js circular Body per SVG, gravity, walls, mouse constraint
Bridge     →  one rAF tick:  el.style.transform = `translate(x-w/2, y-h/2) rotate(angle)`
```

The SVGs themselves are rendered by the browser as usual — they're just `<svg>` tags inside a container. The physics engine has **no idea** there are SVGs. It only knows about circles. The bridge syncs them every frame.

This gives you:

- Real SVG fidelity (no canvas blur, no rasterization)
- Crisp text/strokes at any scale
- Selectable / accessible markup
- Cheap (no rendering — the engine just does math)

## Markup Contract

```html
<section id="hero" class="hero">
  <h1 class="hero-text">Everyday uki uki. <br> Sometimes doki doki.</h1>

  <div class="hero-illustrations">
    <svg width="328" height="308" viewBox="…">…shape 1…</svg>
    <svg width="118" height="289" viewBox="…">…shape 2…</svg>
    <svg width="230" height="238" viewBox="…">…shape 3…</svg>
    …
  </div>
</section>
```

Required rules:

- **The container** (`.hero-illustrations`) must be `position: absolute; inset: 0; pointer-events: none;`
- **Each SVG** must have explicit `width` / `height` attrs (the JS reads them to compute the offset)
- **Each SVG** starts with `position: absolute; opacity: 0;` — physics will set its first transform on tick 1 and reveal it. (If you skip `opacity: 0`, the SVGs flash at `(0, 0)` for one frame.)
- The hero `<section>` itself is `position: relative; overflow: hidden; cursor: grab;`

```css
.hero { position: relative; overflow: hidden; cursor: grab; }
.hero-illustrations { position: absolute; inset: 0; pointer-events: none; }
.hero-illustrations svg { position: absolute; opacity: 0; will-change: transform; }
```

`pointer-events: none` on the **container** is critical: it lets `Mouse.create(hero)` (attached to the parent `<section>`) own all the pointer events, then `MouseConstraint` figures out which body the cursor is over via the physics world. If you put `pointer-events: auto` on the SVGs, drag-handoff breaks.

## Per-Shape Config

Each SVG needs a config row. The shape order in DOM must match the array order:

```js
const cfg = [
  { r: 155, xf: 0.39, y0: -380, res: 0.28, fa: 0.013 },
  { r:  48, xf: 0.54, y0: -550, res: 0.45, fa: 0.022 },
  { r: 115, xf: 0.35, y0: -260, res: 0.32, fa: 0.015 },
  …
];
```

| Field | Meaning                                                    | Tuning notes |
|-------|------------------------------------------------------------|--------------|
| `r`   | Physics circle radius in px                                | ~50–80% of the SVG's bounding box. Smaller = bodies overlap visually but don't intersect physically, which looks correct because SVG silhouettes have holes. |
| `xf`  | Starting X position as a fraction of container width       | Distribute across the row. Avoid 0.5 (dead center). |
| `y0`  | Starting Y in px (negative = above viewport)               | Bigger shapes get more headroom (-300 to -550). |
| `res` | Restitution (bounciness, 0–1)                              | Small/light shapes bounce more (0.45+). Big stones thud (0.28). |
| `fa`  | `frictionAir` (drag in the air)                            | Light shapes = more air drag (0.022+) so they don't fall too fast. |

**The radius rule**: Set `r` to the *visual mass center radius*, not the bounding box. A long stem with leaves should have `r ≈ width/3`, not `r ≈ width/2` — otherwise the empty space around the stem becomes draggable air.

## The Init Function (full)

```js
function initHeroPhysics() {
  if (typeof Matter === 'undefined') return;
  const { Engine, Bodies, Body, Composite, Runner, Mouse, MouseConstraint, Events } = Matter;

  const hero   = document.getElementById('hero');
  const illus  = hero.querySelector('.hero-illustrations');
  const svgEls = Array.from(illus.querySelectorAll('svg'));
  const heroW  = hero.offsetWidth;
  const heroH  = hero.offsetHeight;

  const cfg = [ /* … one entry per SVG … */ ];

  const engine = Engine.create({ gravity: { y: 0.6 } });

  // Static walls — ground + left + right
  const ground = Bodies.rectangle(heroW/2, heroH + 30, heroW + 400, 60, { isStatic: true, friction: 0.8 });
  const wallL  = Bodies.rectangle(-30,       heroH/2, 60, heroH * 3, { isStatic: true });
  const wallR  = Bodies.rectangle(heroW + 30, heroH/2, 60, heroH * 3, { isStatic: true });
  Composite.add(engine.world, [ground, wallL, wallR]);

  // Expose wall control for nav coupling (see § Nav Coupling)
  physicsCtrl = {
    moveRightWall(targetX, durationMs) { /* ease-out animation, see below */ },
    heroW,
    wallR,
  };

  // One body per SVG
  const items = svgEls.map((el, i) => {
    const c  = cfg[i] || { r: 80, xf: 0.5, y0: -200, res: 0.4, fa: 0.02 };
    const sx = heroW * c.xf + (Math.random() - 0.5) * 50;   // jitter so reload looks different
    const body = Bodies.circle(sx, c.y0, c.r, {
      restitution: c.res,
      friction:    0.6,
      frictionAir: c.fa,
      angle:       (Math.random() - 0.5) * 0.7,
    });
    Composite.add(engine.world, body);

    const svgW = parseFloat(el.getAttribute('width'))  || 100;
    const svgH = parseFloat(el.getAttribute('height')) || 100;
    el.style.top = el.style.left = el.style.margin = '0';
    el.style.animation = 'none';
    el.style.transformOrigin = '50% 50%';
    return { el, body, svgW, svgH };
  });

  // Mouse → drag (attached to hero, not to illus — illus has pointer-events: none)
  const mouse = Mouse.create(hero);
  mouse.element.removeEventListener('mousewheel',    mouse.mousewheel);     // don't block scroll
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);
  const mc = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } },
  });
  Composite.add(engine.world, mc);
  Events.on(mc, 'startdrag', () => { hero.style.cursor = 'grabbing'; });
  Events.on(mc, 'enddrag',   () => { hero.style.cursor = 'grab'; });

  Runner.run(Runner.create(), engine);

  // The bridge — sync DOM to physics every frame
  let firstTick = true;
  (function tick() {
    items.forEach(({ el, body, svgW, svgH }) => {
      const { x, y } = body.position;
      el.style.transform = `translate(${x - svgW/2}px, ${y - svgH/2}px) rotate(${body.angle}rad)`;
      if (firstTick) el.style.opacity = '1';
    });
    firstTick = false;
    requestAnimationFrame(tick);
  })();
}
```

## Tuning the Feel

The reference site uses these globals — change them deliberately:

| Setting                              | Value     | What it controls                          |
|--------------------------------------|-----------|-------------------------------------------|
| `gravity.y`                          | `0.6`     | Fall speed. `1.0` = real gravity (too fast for this aesthetic). `0.3` = moon. |
| `friction` (bodies)                  | `0.6`     | How much shapes grip each other & walls   |
| `friction` (ground)                  | `0.8`     | How fast shapes stop rolling              |
| `MouseConstraint.stiffness`          | `0.18`    | "Springiness" of the grab — low = elastic |
| `MouseConstraint.damping`            | `0.1`     | How quickly the grab settles              |
| Body `restitution`                   | `0.28–0.55` | Per-shape bounciness                    |
| Body `frictionAir`                   | `0.013–0.026` | Per-shape air drag (light = more)   |

**The aesthetic target**: shapes should *settle slowly* after a throw. If they immediately stop dead, raise restitution. If they bounce forever, lower it.

## Nav Coupling (Optional Magic)

In the reference site, opening the nav panel **physically pushes the right wall left**, compressing the world. The shapes slide aside. Closing the nav releases the wall, the shapes flow back.

```js
function toggleNav() {
  const panel  = document.getElementById('nav-panel');
  const isOpen = panel.classList.toggle('open');

  if (physicsCtrl) {
    const panelW = window.innerWidth * 0.42;
    if (isOpen) physicsCtrl.moveRightWall(physicsCtrl.heroW - panelW - 20, 480);
    else        physicsCtrl.moveRightWall(physicsCtrl.heroW + 30,         480);
  }
}

// Inside physicsCtrl:
moveRightWall(targetX, durationMs) {
  const fromX = wallR.position.x;
  const t0    = performance.now();
  (function step(now) {
    const p    = Math.min((now - t0) / durationMs, 1);
    const ease = 1 - Math.pow(1 - p, 3);     // ease-out cubic
    Body.setPosition(wallR, { x: fromX + (targetX - fromX) * ease, y: heroH / 2 });
    if (p < 1) requestAnimationFrame(step);
  })(performance.now());
}
```

**Why it's worth doing**: most "slide-in panel" interactions feel like a UI menu. This one feels like the room itself reshaped. Visitors notice and don't know why.

## Footer Garden — Same Pattern, Different Scope

The footer reuses `initHeroPhysics` almost verbatim. Differences:

- Container is `<footer>` itself (so the world fills the whole footer)
- `cfg` distribution biased to the bottom band (decoration belongs at the bottom edge — see Principle 1)
- No `physicsCtrl` exposure (footer doesn't couple to nav)

Keep both functions in your build, even if they're 95% duplicated. The duplication is honest; abstracting them prematurely makes the cfg + DOM-selector mapping confusing.

## Common Failure Modes

| Symptom                                    | Cause                                                                |
|--------------------------------------------|----------------------------------------------------------------------|
| SVGs flash at `(0, 0)` on load             | Forgot `opacity: 0` initial state                                     |
| Page can't scroll while cursor is in hero  | Forgot the two `removeEventListener('mousewheel', …)` lines           |
| Drag works but cursor stays as default     | Forgot `startdrag` / `enddrag` event handlers                         |
| Shapes fall through the floor              | `ground` is positioned at `heroH` but `y0` starts negative — bigger shapes overshoot. Make ground 60px thick and at `heroH + 30`. |
| Shapes pile up in one corner               | All `xf` values too close together. Spread them across [0.1, 0.9].   |
| Two shapes get stuck overlapping forever   | Their `r` values are too large relative to `xf` spacing. Shrink `r`. |
| Mobile: no interaction at all              | Matter.js needs `touchstart` polyfilled or use the v0.20+ build with built-in touch support. |

## When You Have More / Fewer SVGs

The cfg array indexes by DOM order. If your remix has 5 shapes instead of 7, just write 5 cfg entries. If you have 12, write 12. The pattern scales freely.

Practical upper bound: ~15 bodies per garden. Beyond that the engine still runs fine but the visual density violates Principle 1 (whitespace).

## Library Choice

The reference site uses **Matter.js 0.19+** (`js/matter.min.js`, ~80KB minified). CDN equivalent:

```html
<script src="https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js"></script>
```

Alternatives evaluated and **not** chosen:

- **Cannon.js** — overkill (3D physics for a 2D problem)
- **Planck.js** — port of Box2D, harder API, larger
- **CSS only** — impossible, you can't draggable-with-momentum a DOM element without physics math

If you must avoid Matter.js entirely (size budget), the minimum custom implementation is ~150 lines: gravity, ground collision, mouse drag with velocity transfer on release. Doable but tedious. Not recommended unless shipping to a constrained env.

---

## Voice line

> 一阵风把石头吹到地上,你想搬开看看,你能搬。
