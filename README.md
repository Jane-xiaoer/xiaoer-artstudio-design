# xiaoer-artstudio-design

**A design methodology reproduction kit** — open-sourced from [小耳 Art Studio](https://xiaoerai.xyz), a Japanese-editorial-meets-independent-artist portfolio aesthetic.

> 留白会呼吸，不是空。 *(Whitespace breathes, it's not emptiness.)*

Not a template. A **methodology**. Any model, in any agent framework (Claude Code / Hermes / openclaw / raw LLM API), can read this kit and reproduce the aesthetic — or remix it into their own brand.

## What It Reproduces

### Visual layer

- **Tender whitespace**, not clinical minimalism
- **Dual typography**: DM Serif Display (editorial) × Caveat (handwritten) × system-ui (body)
- **Pastel section palette** (薄荷 / 奶油 / 樱粉 / 天青) with **ONE** high-saturation lime `#c8ff00` accent
- **Hand-drawn SVG vocabulary**: floral blobs, botanical vines, wavy underlines, dotted-line dividers
- **Poetic micro-copy** with onomatopoeia (`uki uki` / `doki doki`) and single-kanji product names
- **Ambient motion**: 4–7s float / sway on decorations, never scroll-triggered

### Interaction layer ⭐ new in v2.0

- **Physics garden** — decorative SVGs become Matter.js rigid bodies. They fall with gravity, settle on a floor, and can be **grabbed and thrown** with the cursor.
- **Text spring** — paragraphs and titles are split into per-character `<span>`s. Characters **lean away from the cursor** via spring forces and return to rest.
- **Pencil cursor** (optional, About-section variant) — replaces the system cursor with a hand-drawn pencil SVG that lerps toward the mouse and rotates to its movement direction. Chars are repelled by the pencil tip.
- **Tangential rotor** — small SVG marks (sakura, pinwheel) spin from the cursor's tangential momentum; coast and damp after the cursor leaves.
- **Idle-spin** — ornament plus-marks slowly rotate at all times; hover boosts speed 6×.
- **Nav ↔ physics coupling** (optional) — opening the menu panel pushes the physics world's right wall inward, compressing the decorations.

> Without the interaction layer, a reproduction *looks* like the site but doesn't *feel* like it. v1.0 of this skill only shipped the visual layer; v2.0 adds the missing half.

## Install

### As a Claude Code / Anthropic Skill

```bash
git clone https://github.com/Jane-xiaoer/xiaoer-artstudio-design.git ~/.claude/skills/xiaoer-artstudio-design
```

Then trigger it in conversation:

> "帮我做一个类似小耳 Art Studio 风格的艺术家作品集"

### In Hermes / openclaw / Other Agent Frameworks

Drop the folder into the framework's skills directory. `SKILL.md` uses standard YAML frontmatter (`name`, `description`) that most frameworks auto-discover.

### With Any LLM (GPT / Gemini / Qwen / DeepSeek / Claude API)

```bash
cat SKILL.md references/DESIGN_PRINCIPLES.md
```

Paste into your system prompt. Load other references on demand based on the user's subtask.

## Structure

```
xiaoer-artstudio-design/
├── SKILL.md                          ← Main entrypoint (YAML frontmatter)
├── references/
│   ├── DESIGN_PRINCIPLES.md          ← 8 core principles + fidelity checklist
│   ├── TOKENS.json                   ← Machine-readable exact values
│   ├── TYPOGRAPHY.md                 ← Three-voice font system
│   ├── COLOR_SYSTEM.md               ← 1+4+1 palette rule
│   ├── LAYOUT_RHYTHM.md              ← 9-section page structure
│   ├── SVG_VOCABULARY.md             ← Hand-drawn SVG grammar
│   ├── MOTION.md                     ← 4 named ambient animations + hover rules
│   ├── COPYWRITING.md                ← Trilingual poetic copy strategy
│   ├── REMIX_GUIDE.md                ← Extension points + 3 brand recipes
│   ├── INTERACTION.md                ← ⭐ 5-layer interaction system map
│   ├── PHYSICS_GARDEN.md             ← ⭐ Matter.js + SVG drag-able decorations
│   └── TEXT_SPRING.md                ← ⭐ Per-char split + spring repulsion (+ optional pencil cursor)
└── assets/
    ├── starter-template.html         ← Minimal runnable HTML (visual only)
    ├── interactive-template.html     ← ⭐ Full template with all interactions wired up
    ├── js/
    │   └── interactive.js            ← ⭐ Paste-ready interaction skeleton (4 functions)
    └── svg-primitives.md             ← 8 paste-ready SVG primitives
```

All content is plain **Markdown / JSON / SVG / HTML / JS**. Only runtime dependency is Matter.js (loaded from CDN). Zero build tooling.

## The 8 Core Principles (tl;dr)

1. **Whitespace is inhabited, not empty** — hero has ≥45% blank above the decoration band
2. **Three typographic voices, never two, never four** — editorial serif / handwritten cursive / neutral sans, each with a strict role
3. **1+4+1 palette** — 1 neutral base + 4 pastels that rotate between sections + 1 saturated accent used ≤3 times
4. **Hand-drawn SVG is a language** — `#1a1a1a` strokes, `round` linecaps, Q-curves, irregular radian rotations
5. **Dividers are drawn, not rendered** — dotted-line between sections, wavy-line under section labels; never `<hr>`
6. **Trilingual copy is texture** — JA/EN/ZH coexist in parallel columns; product names are single ideograms
7. **Motion is breath, not attention** — ≥3500ms, ≤10px, infinite, ease-in-out, no scroll-triggered
8. **The cursor is a visitor, not a tool** ⭐ — decorations respond physically (drag, repel, spin), controls respond invisibly (opacity only). Two strict hover contracts, never mixed.

Full explanations in [`references/DESIGN_PRINCIPLES.md`](references/DESIGN_PRINCIPLES.md).

## Remix

The `REMIX_GUIDE.md` includes 3 worked recipes:
- **Coffee Roaster** variant (espresso-orange accent, bean/leaf SVG theme)
- **Ceramics Studio** variant (cobalt accent, pot/coil/smoke vocabulary)
- **Herbalist Apothecary** variant (saffron accent, herb/vial/drop shapes)

Plus swap tables for palette, fonts, SVG themes, and language mixes.

## Philosophy

The site was designed as if it were the back cover of a poetry book — not a product page. Every decision — the generous whitespace, the hand-drawn decorations, the ambient float animations, the single-kanji product names — serves one purpose: to make the page feel *alive but asleep*.

If a reader's first instinct when scrolling is to slow down, the methodology is working.

## Credits

- **Original aesthetic**: [小耳 (Jane)](https://xiaoerai.xyz)
- **Methodology extraction & skill packaging**: Jane, with Claude (PAI)
- **Source site**: localhost:8899 (private, captured 2026-04-17)

## License

Methodology, documentation, and primitives are released under **Creative Commons Attribution 4.0 International (CC-BY-4.0)**. See [`LICENSE`](LICENSE).

The **specific artwork, product names, photography, and Japanese/Chinese copy** of 小耳 Art Studio are © Jane and are **not licensed** for reuse — please do not copy them verbatim. The methodology teaches you how to make your own.

If you publish a remix, credit this repo:

```
Design methodology adapted from "小耳 Art Studio" by Jane.
https://github.com/Jane-xiaoer/xiaoer-artstudio-design
```

## Links

- 小耳 Art Studio (artist site): [xiaoerai.xyz](https://xiaoerai.xyz)
- Jane on X / Twitter: [@xiaoerzhan](https://x.com/xiaoerzhan)

---

*"Everyday uki uki. Sometimes doki doki."*

---

## 📱 关注作者 / Follow Me

如果这个仓库对你有帮助，欢迎关注我。后面我会持续更新更多 AI Skill、网站设计、审美拆解和创意项目。

If this repo helped you, follow me for more AI skills, design remixes, beautiful websites, and creative projects.

- X (Twitter): [@xiaoerzhan](https://x.com/xiaoerzhan)
- 微信公众号 / WeChat Official Account: 扫码关注 / Scan to follow

<p align="center">
  <img src="./follow-wechat-qrcode.jpg" alt="Jane WeChat Official Account QR code" width="300" />
</p>

<p align="center"><strong>中文：</strong>欢迎关注我的公众号，一起研究 AI Skill、网站设计、视觉风格和创意实验。</p>

<p align="center"><strong>English:</strong> Follow my WeChat Official Account for more AI skills, website design, visual inspiration, and creative experiments.</p>
