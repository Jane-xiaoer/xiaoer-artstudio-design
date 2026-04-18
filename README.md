# xiaoer-artstudio-design

**A design methodology reproduction kit** — open-sourced from [小耳 Art Studio](https://xiaoerai.xyz), a Japanese-editorial-meets-independent-artist portfolio aesthetic.

> 留白会呼吸，不是空。 *(Whitespace breathes, it's not emptiness.)*

Not a template. A **methodology**. Any model, in any agent framework (Claude Code / Hermes / openclaw / raw LLM API), can read this kit and reproduce the aesthetic — or remix it into their own brand.

## What It Reproduces

- **Tender whitespace**, not clinical minimalism
- **Dual typography**: DM Serif Display (editorial) × Caveat (handwritten) × system-ui (body)
- **Pastel section palette** (薄荷 / 奶油 / 樱粉 / 天青) with **ONE** high-saturation lime `#c8ff00` accent
- **Hand-drawn SVG vocabulary**: floral blobs, botanical vines, wavy underlines, dotted-line dividers
- **Poetic micro-copy** with onomatopoeia (`uki uki` / `doki doki`) and single-kanji product names
- **Ambient motion only**: 4–7s float / sway, never scroll-triggered

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
├── SKILL.md                      ← Main entrypoint (YAML frontmatter)
├── references/
│   ├── DESIGN_PRINCIPLES.md      ← 7 core principles + fidelity checklist
│   ├── TOKENS.json               ← Machine-readable exact values
│   ├── TYPOGRAPHY.md             ← Three-voice font system
│   ├── COLOR_SYSTEM.md           ← 1+4+1 palette rule
│   ├── LAYOUT_RHYTHM.md          ← 9-section page structure
│   ├── SVG_VOCABULARY.md         ← Hand-drawn SVG grammar
│   ├── MOTION.md                 ← 4 named animations
│   ├── COPYWRITING.md            ← Trilingual poetic copy strategy
│   └── REMIX_GUIDE.md            ← Extension points + 3 brand recipes
└── assets/
    ├── starter-template.html     ← Minimal runnable HTML template
    └── svg-primitives.md         ← 8 paste-ready SVG primitives
```

All content is plain **Markdown / JSON / SVG / HTML**. Zero framework-specific dependencies.

## The 7 Core Principles (tl;dr)

1. **Whitespace is inhabited, not empty** — hero has ≥45% blank above the decoration band
2. **Three typographic voices, never two, never four** — editorial serif / handwritten cursive / neutral sans, each with a strict role
3. **1+4+1 palette** — 1 neutral base + 4 pastels that rotate between sections + 1 saturated accent used ≤3 times
4. **Hand-drawn SVG is a language** — `#1a1a1a` strokes, `round` linecaps, Q-curves, irregular radian rotations
5. **Dividers are drawn, not rendered** — dotted-line between sections, wavy-line under section labels; never `<hr>`
6. **Trilingual copy is texture** — JA/EN/ZH coexist in parallel columns; product names are single ideograms
7. **Motion is breath, not attention** — ≥3500ms, ≤10px, infinite, ease-in-out, no scroll-triggered

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
