/*
 * 小耳 Art Studio — Interaction Layer (paste-ready skeleton)
 *
 * Provides 4 self-contained interaction systems, all opt-in:
 *
 *   1. initPhysicsGarden(selector, cfg)   — drag-able SVG decorations w/ gravity
 *   2. initTextSpring(sectionSel, opts)   — per-char repulsion (with optional pencil cursor)
 *   3. initTangentialRotor(el)            — momentum-driven spin from cursor tangent
 *   4. initIdleSpin(els)                  — slow always-on rotation + hover speedup
 *
 * Dependencies:
 *   - Matter.js 0.19+ loaded before this file, for initPhysicsGarden
 *     <script src="https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js"></script>
 *
 * Every function is a no-op if its target doesn't exist — safe to call all four
 * unconditionally on every page.
 *
 * See references/PHYSICS_GARDEN.md, TEXT_SPRING.md, INTERACTION.md for full docs.
 */

/* ───────────────────────────────────────────────────────────────────────────
 * 1. PHYSICS GARDEN — drag-able SVG decorations
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * @param {string} hostSelector  — CSS selector for the host section (e.g. '#hero')
 * @param {object} options
 * @param {string} options.svgContainerSelector  — child selector holding the SVGs
 *                                                 (defaults to `.hero-illustrations`)
 * @param {Array}  options.cfg     — per-shape config, indexed by DOM order:
 *                                   { r, xf, y0, res, fa }
 *                                   r   = collision radius (px)
 *                                   xf  = start X as fraction of host width [0..1]
 *                                   y0  = start Y in px (negative = above viewport)
 *                                   res = restitution (0..1)
 *                                   fa  = frictionAir
 * @param {number} options.gravity — gravity.y (default 0.6)
 * @param {boolean} options.exposeWallControl — set true to return a controller
 *                                              for the right wall (used for nav coupling)
 * @returns {object|null}  null if Matter is missing, or { moveRightWall(x, ms), heroW } if exposed
 */
function initPhysicsGarden(hostSelector, options = {}) {
  if (typeof Matter === 'undefined') return null;

  const {
    svgContainerSelector = '.hero-illustrations',
    cfg = [],
    gravity = 0.6,
    exposeWallControl = false,
  } = options;

  const { Engine, Bodies, Body, Composite, Runner, Mouse, MouseConstraint, Events } = Matter;

  const host  = document.querySelector(hostSelector);
  if (!host) return null;
  const illus = host.querySelector(svgContainerSelector) || host;
  const svgEls = Array.from(illus.querySelectorAll('svg'));
  if (!svgEls.length) return null;

  const W = host.offsetWidth;
  const H = host.offsetHeight;

  const engine = Engine.create({ gravity: { y: gravity } });

  // Static floor + side walls
  const ground = Bodies.rectangle(W / 2, H + 30, W + 400, 60, { isStatic: true, friction: 0.8 });
  const wallL  = Bodies.rectangle(-30,    H / 2, 60, H * 3, { isStatic: true });
  const wallR  = Bodies.rectangle(W + 30, H / 2, 60, H * 3, { isStatic: true });
  Composite.add(engine.world, [ground, wallL, wallR]);

  // One body per SVG
  const items = svgEls.map((el, i) => {
    const c  = cfg[i] || { r: 80, xf: 0.5, y0: -200, res: 0.4, fa: 0.02 };
    const sx = W * c.xf + (Math.random() - 0.5) * 50;
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

  // Mouse drag (attached to host so it works over the whole area)
  const mouse = Mouse.create(host);
  mouse.element.removeEventListener('mousewheel',     mouse.mousewheel);  // don't block page scroll
  mouse.element.removeEventListener('DOMMouseScroll', mouse.mousewheel);

  const mc = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.18, damping: 0.1, render: { visible: false } },
  });
  Composite.add(engine.world, mc);

  Events.on(mc, 'startdrag', () => { host.style.cursor = 'grabbing'; });
  Events.on(mc, 'enddrag',   () => { host.style.cursor = 'grab'; });

  Runner.run(Runner.create(), engine);

  let firstTick = true;
  (function tick() {
    items.forEach(({ el, body, svgW, svgH }) => {
      const { x, y } = body.position;
      el.style.transform = `translate(${x - svgW / 2}px, ${y - svgH / 2}px) rotate(${body.angle}rad)`;
      if (firstTick) el.style.opacity = '1';
    });
    firstTick = false;
    requestAnimationFrame(tick);
  })();

  if (!exposeWallControl) return null;

  return {
    heroW: W,
    moveRightWall(targetX, durationMs) {
      const fromX = wallR.position.x;
      const t0    = performance.now();
      (function step(now) {
        const p    = Math.min((now - t0) / durationMs, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        Body.setPosition(wallR, { x: fromX + (targetX - fromX) * ease, y: H / 2 });
        if (p < 1) requestAnimationFrame(step);
      })(performance.now());
    },
  };
}

/* ───────────────────────────────────────────────────────────────────────────
 * 2. TEXT SPRING — per-character repulsion (optional pencil cursor)
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * @param {string} sectionSelector   — CSS selector for the section that triggers/holds the effect
 * @param {object} options
 * @param {string[]} options.targets — selectors (within section) whose text gets split into spans
 * @param {number} options.R         — repulsion radius (px). 28 = brush, 55 = gust.
 * @param {number} options.F         — peak force. 7–8 is the reference range.
 * @param {number} options.spring    — spring-return coefficient (0.12–0.15).
 * @param {number} options.damping   — velocity damping per frame (0.68–0.70).
 * @param {boolean} options.pencil   — overlay a custom pencil cursor; chars repel from pencil tip
 */
function initTextSpring(sectionSelector, options = {}) {
  const section = document.querySelector(sectionSelector);
  if (!section || section.dataset.springInit) return;
  section.dataset.springInit = '1';

  const {
    targets = [':scope > *'],
    R       = 55,
    F       = 8,
    spring  = 0.12,
    damping = 0.70,
    pencil  = false,
  } = options;

  // Respect reduced motion
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // ── Phase 1: split text nodes into per-char spans ─────────────────────
  const chars = [];
  function splitToSpans(srcNode, destParent) {
    if (srcNode.nodeType === Node.TEXT_NODE) {
      [...srcNode.textContent].forEach(ch => {
        const sp = document.createElement('span');
        sp.textContent = ch;
        if (ch === ' ' || ch === ' ') {
          sp.style.display = 'inline';
        } else {
          sp.style.display = 'inline-block';
          chars.push({ el: sp, vx: 0, vy: 0, ox: 0, oy: 0 });
        }
        destParent.appendChild(sp);
      });
    } else if (srcNode.nodeName === 'BR') {
      destParent.appendChild(document.createElement('br'));
    } else {
      const el = document.createElement(srcNode.tagName.toLowerCase());
      [...(srcNode.attributes || [])].forEach(a => el.setAttribute(a.name, a.value));
      destParent.appendChild(el);
      [...srcNode.childNodes].forEach(child => splitToSpans(child, el));
    }
  }

  const targetEls = targets.flatMap(sel => Array.from(section.querySelectorAll(sel)));
  targetEls.forEach(el => {
    const nodes = [...el.childNodes];
    el.innerHTML = '';
    nodes.forEach(node => splitToSpans(node, el));
  });
  if (!chars.length) return;

  // ── Optional: pencil cursor ───────────────────────────────────────────
  let pen = null;
  if (pencil) {
    pen = document.createElement('div');
    pen.style.cssText =
      'position:fixed;pointer-events:none;z-index:9999;width:36px;height:36px;' +
      'transform-origin:50% 94%;opacity:0;transition:opacity .2s;will-change:transform;';
    pen.innerHTML =
      '<svg width="36" height="36" viewBox="0 0 36 36" fill="none">' +
        '<rect x="14"   y="1"   width="8" height="5"  rx="1.5" fill="#f4a0a0"/>' +
        '<rect x="13.5" y="5.5" width="9" height="1.5"          fill="#c47070"/>' +
        '<rect x="14"   y="7"   width="8" height="20"           fill="#f0dc60"/>' +
        '<polygon points="14,27 22,27 18,34"                     fill="#e0c070"/>' +
        '<polygon points="16.2,29.5 19.8,29.5 18,34"             fill="#444"/>' +
        '<rect x="19"   y="7"   width="2" height="20"           fill="rgba(255,255,255,0.22)"/>' +
        '<rect x="14"   y="5.5" width="8" height="1.5"          fill="rgba(0,0,0,0.08)"/>' +
      '</svg>';
    document.body.appendChild(pen);
  }

  // ── Phase 2: cursor tracking ─────────────────────────────────────────
  let mx = -999, my = -999;
  let px = -999, py = -999;            // pencil lerped position (used if pencil enabled)
  let prevMx = -999, prevMy = -999, angle = -0.8;
  let rafId = null;

  function start() {
    if (pen) {
      pen.style.opacity = '1';
      section.style.cursor = 'none';
    }
    if (!rafId) rafId = requestAnimationFrame(tick);
  }
  function stop() {
    if (pen) {
      pen.style.opacity = '0';
      section.style.cursor = '';
    }
    mx = my = -999;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }

  section.addEventListener('mouseenter', start);
  section.addEventListener('mouseleave', stop);
  section.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  // ── Phase 3: tick ────────────────────────────────────────────────────
  function tick() {
    rafId = requestAnimationFrame(tick);

    // Pencil follows cursor with smoothing
    if (pen) {
      if (mx > -900) {
        px += (mx - px) * 0.12;
        py += (my - py) * 0.12;
      }
      if (prevMx > -900 && mx > -900) {
        const dmx = mx - prevMx, dmy = my - prevMy;
        if (Math.hypot(dmx, dmy) > 1.5) {
          let t  = Math.atan2(dmy, dmx) - Math.PI / 4;
          let da = t - angle;
          while (da >  Math.PI) da -= 2 * Math.PI;
          while (da < -Math.PI) da += 2 * Math.PI;
          angle += da * 0.12;
        }
      }
      prevMx = mx; prevMy = my;
      if (px > -900) {
        pen.style.transform =
          `translate(${(px - 18).toFixed(1)}px, ${(py - 34).toFixed(1)}px) rotate(${angle.toFixed(2)}rad)`;
      }
    }

    // Repulsion source: pencil tip if enabled, else raw cursor
    const sx = pen ? px : mx;
    const sy = pen ? py : my;

    chars.forEach(c => {
      const r = c.el.getBoundingClientRect();
      if (r.width === 0) return;
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = cx - sx, dy = cy - sy;
      const d  = Math.hypot(dx, dy);

      if (sx > -900 && d < R && d > 0.5) {
        const f = (1 - d / R) * F;
        c.vx += (dx / d) * f;
        c.vy += (dy / d) * f;
      }

      c.vx += -c.ox * spring;  c.vy += -c.oy * spring;
      c.vx *= damping;          c.vy *= damping;
      c.ox += c.vx;             c.oy += c.vy;

      if (Math.abs(c.ox) + Math.abs(c.oy) > 0.05) {
        c.el.style.transform = `translate(${c.ox.toFixed(2)}px, ${c.oy.toFixed(2)}px)`;
      }
    });
  }
}

/* ───────────────────────────────────────────────────────────────────────────
 * 3. TANGENTIAL ROTOR — cursor tangent transfers momentum
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * Attach to a small SVG mark (pinwheel, flower, etc.). Cursor's tangential
 * motion around the element transfers as angular velocity; rotation damps
 * after the cursor leaves.
 *
 * @param {Element} btn  — the host element containing a child <svg>
 */
function initTangentialRotor(btn) {
  if (!btn) return;
  const svg = btn.querySelector('svg');
  if (!svg) return;

  let angle = 0, velocity = 0, lastX = null, lastY = null, hovering = false;

  (function loop() {
    velocity *= hovering ? 0.97 : 0.94;
    if (Math.abs(velocity) > 0.01) {
      angle += velocity;
      svg.style.transform = `rotate(${angle}deg)`;
    }
    requestAnimationFrame(loop);
  })();

  btn.addEventListener('mouseenter', e => {
    hovering = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });
  btn.addEventListener('mouseleave', () => {
    hovering = false;
    lastX = lastY = null;
  });
  btn.addEventListener('mousemove', e => {
    if (lastX === null) { lastX = e.clientX; lastY = e.clientY; return; }
    const r  = btn.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = e.clientX - cx, dy = e.clientY - cy;
    const d  = Math.hypot(dx, dy) + 0.001;
    const mx = e.clientX - lastX, my = e.clientY - lastY;
    const tangential = (-dy * mx + dx * my) / d;
    velocity += tangential * 0.18;
    velocity  = Math.max(-18, Math.min(18, velocity));
    lastX = e.clientX; lastY = e.clientY;
  });
}

/* ───────────────────────────────────────────────────────────────────────────
 * 4. IDLE SPIN with HOVER BOOST — always-on slow rotation, accelerate on hover
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * For decorations that should always be slowly turning.
 * Markup: <svg class="contact-plus" data-speed="4" data-rev="1">…
 *   data-speed = seconds per full revolution (default 4)
 *   data-rev   = "1" to spin counter-clockwise
 *
 * @param {NodeList|Element[]} els  — collection of elements to animate
 * @param {number} hoverBoost       — multiplier when hovered (default 6)
 */
function initIdleSpin(els, hoverBoost = 6) {
  const list = Array.from(els);
  if (!list.length) return;

  const items = list.map(el => ({
    el,
    angle:       Math.random() * 360,
    degPerFrame: 360 / ((parseFloat(el.dataset.speed) || 4) * 60),
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
      const dpf = s.hovered ? s.degPerFrame * hoverBoost : s.degPerFrame;
      s.angle += s.dir * dpf;
      s.el.style.transform = `rotate(${s.angle.toFixed(2)}deg)`;
    });
  })();
}

/* ───────────────────────────────────────────────────────────────────────────
 * Expose
 * ─────────────────────────────────────────────────────────────────────────── */

window.xiaoerInteractive = {
  initPhysicsGarden,
  initTextSpring,
  initTangentialRotor,
  initIdleSpin,
};
