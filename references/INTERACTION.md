# Interaction — The Living Layer

> Read this **after** `MOTION.md`. Motion is what the page does *at rest*. Interaction is what the page does *when the visitor arrives*. They are two layers of the same philosophy: **the page is alive but asleep — the cursor wakes it gently.**

## The Five Interaction Layers

The reference site (xiaoerai.xyz / uki-clone.vercel.app) runs **five** independent interaction systems. None of them are decorative-only-CSS — every one of them needs a small amount of JS to feel right. They are the difference between "looks like the site" and "is the site."

| # | Layer                       | Anchored to       | Reference impl                       |
|---|-----------------------------|-------------------|--------------------------------------|
| 1 | **Hero physics garden**     | `#hero`           | `PHYSICS_GARDEN.md`                  |
| 2 | **Footer physics garden**   | `<footer>`        | `PHYSICS_GARDEN.md`                  |
| 3 | **Text spring (with pen)**  | `#about`          | `TEXT_SPRING.md`                     |
| 4 | **Text spring (plain)**     | `#news`           | `TEXT_SPRING.md`                     |
| 5 | **Tangential rotor**        | `.nav-menu-btn`   | this file (§ Tangential Rotor)       |
| 6 | **Idle-spin + hover-boost** | `.contact-plus`   | this file (§ Idle-Spin Hover-Boost)  |
| 7 | **Nav ↔ physics coupling**  | `#nav-panel`      | `PHYSICS_GARDEN.md` § Nav Coupling   |

(7 systems in 2 patterns + a few small standalones — but you can ship a complete reproduction with just layers 1, 3, and 5.)

---

## Principle: Three Cursor Contracts

Every cursor-driven effect on the site fits one of three contracts. Pick consciously per element. Mixing them inside one section is fine; mixing them **inside one element** is the failure mode.

### Contract A — Drag (cursor *is* a hand)

Cursor grabs the element, the element follows. Used on physics bodies (the decorative SVGs in hero & footer). Visual signal: `cursor: grab` → `cursor: grabbing`. Element has weight, gravity, restitution.

**When to use**: decorative objects that look like physical things (stones, leaves, paper scraps, beads). Never on text. Never on functional controls.

**See**: `PHYSICS_GARDEN.md`.

### Contract B — Repulse (cursor *is* a wind)

Cursor approaches, the affected sub-elements *move away* via spring physics, then settle back. Used on per-character text spans in the bio and news sections. The cursor never "touches" anything; proximity is the input.

**When to use**: long paragraphs of poetic copy, titles, dates — anywhere you want reading to feel *alive*. Never on controls (the text moves when you try to click it = anti-pattern).

**See**: `TEXT_SPRING.md`.

### Contract C — Inertia (cursor *transfers momentum*)

Cursor moves *across* a small element, transferring its tangential motion as rotational velocity. The element keeps spinning after the cursor leaves, slowly damping. Used on the sakura nav button.

**When to use**: small SVG marks that look like they *could* spin — pinwheels, flowers, gears, stars. Never on rectangular or square shapes (looks broken).

**See**: § Tangential Rotor below.

---

## Tangential Rotor — pattern

```js
function initTangentialRotor(btn) {
  const svg = btn.querySelector('svg');
  let angle = 0, velocity = 0, lastX = null, lastY = null, hovering = false;

  (function loop() {
    velocity *= hovering ? 0.97 : 0.94;   // slower damping while hovering
    if (Math.abs(velocity) > 0.01) {
      angle += velocity;
      svg.style.transform = `rotate(${angle}deg)`;
    }
    requestAnimationFrame(loop);
  })();

  btn.addEventListener('mouseenter', e => { hovering = true; lastX = e.clientX; lastY = e.clientY; });
  btn.addEventListener('mouseleave', ()  => { hovering = false; lastX = lastY = null; });
  btn.addEventListener('mousemove', e => {
    if (lastX === null) { lastX = e.clientX; lastY = e.clientY; return; }
    const r  = btn.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const d  = Math.hypot(dx, dy) + 0.001;
    const mx = e.clientX - lastX, my = e.clientY - lastY;
    const tangential = (-dy * mx + dx * my) / d;   // cross-product tangent component
    velocity += tangential * 0.18;
    velocity  = Math.max(-18, Math.min(18, velocity));
    lastX = e.clientX; lastY = e.clientY;
  });
}
```

### Tuning

| Param            | Default | Effect                                                |
|------------------|---------|-------------------------------------------------------|
| Damping hover    | `0.97`  | How long it keeps spinning while cursor is over it    |
| Damping idle     | `0.94`  | How fast it stops after cursor leaves                 |
| Tangent gain     | `0.18`  | How "grippy" the cursor feels — higher = more spin    |
| Velocity clamp   | `±18`   | Top angular speed, prevents motion-sickness blur      |

**Why tangential and not just `mouseX % 360`**: pure tangential momentum preserves the *intent* of the cursor's motion. Moving the cursor in a circle around the element spins it; moving the cursor straight across does nothing. This is what makes it feel like a real spinning object instead of a value-coupled gimmick.

---

## Idle-Spin Hover-Boost — pattern

For decorations that should *always* be slowly turning (logo plus marks, geometric ornaments) and accelerate on hover:

```js
function initIdleSpin(els) {
  const items = Array.from(els).map(el => ({
    el,
    angle:       Math.random() * 360,                                  // randomize start
    degPerFrame: 360 / ((parseFloat(el.dataset.speed) || 4) * 60),     // data-speed = sec/rev
    dir:         el.dataset.rev === '1' ? -1 : 1,
    hovered:     false,
  }));
  items.forEach(s => {
    s.el.addEventListener('mouseenter', () => s.hovered = true);
    s.el.addEventListener('mouseleave', () => s.hovered = false);
  });
  (function tick() {
    requestAnimationFrame(tick);
    items.forEach(s => {
      const dpf = s.hovered ? s.degPerFrame * 6 : s.degPerFrame;   // 6× speedup
      s.angle += s.dir * dpf;
      s.el.style.transform = `rotate(${s.angle.toFixed(2)}deg)`;
    });
  })();
}
```

Usage in markup: `<svg class="contact-plus" data-speed="4" data-rev="1">…`

This is the **one place** the site allows a `transform` change on hover. The reason it doesn't break the "no hover scale" rule (see `MOTION.md`): the element is *already moving idly* — hover just changes a rate, not a state. There's no on/off snap.

---

## When to NOT Add Interaction

Just because the reference site has 5 layers doesn't mean every remix needs all 5. The interaction system serves the *page's tempo*. Too much, and the page feels nervous.

Skip a layer if:

- **Hero physics**: the brand sells digital goods only (no "objects"). Replace with a single floating SVG cluster.
- **Text spring**: the page is dense with copy (>400 words per section). Spring on long paragraphs makes reading literally painful — characters move while the eye tracks. Restrict spring to titles & captions instead.
- **Tangential rotor**: there's no obvious "spinnable" element. Don't force it onto a square logo.
- **Pencil cursor** (`TEXT_SPRING.md` § With Pencil): the brand isn't writing/art/handcraft. A pencil on a coffee shop site is cosplay.

**The minimum viable interactive build**: layer 1 (hero physics) + layer 3 (text spring on one section). Those two carry 80% of the "alive" feeling.

---

## Performance Notes

All interactions on the reference site run **one `requestAnimationFrame` loop per system** (5 loops total at full build). This is fine on any device made after 2018.

If you must support older hardware:

- Combine all `tick()` functions into one master RAF loop (shared frame budget).
- Disable physics on `(prefers-reduced-motion: reduce)` — return early in `initHeroPhysics`/`initFooterPhysics` and leave SVGs in their static CSS positions.
- Use `IntersectionObserver` to pause text-spring RAF when the section is offscreen.

The reference site does **none** of this. It assumes desktop / modern mobile and trusts the GPU.

---

## Accessibility

All interactions are **decorative augmentations** of static content. The site is fully readable and clickable with JS disabled. To verify:

1. Disable JS in DevTools → page still shows all text, products, links.
2. Tab through the page → focus order is sane.
3. `prefers-reduced-motion: reduce` → respect it (see `MOTION.md` global CSS rule).

The physics garden and text spring **must not** be the only way to access any content. They are mood, not information.

---

## Voice line

> 鼠标是风。文字是叶子。石头是石头。一阵风过来,叶子动一下,石头被推开,但页面没有大喊"你来啦"。
