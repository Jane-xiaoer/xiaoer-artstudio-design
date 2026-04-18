---
name: xiaoer-artstudio-design
description: Design methodology reproduction kit for 小耳 Art Studio (localhost:8899). Replicate the "Japanese stationery × independent artist portfolio" aesthetic — tender whitespace, dual typography, section-rotated pastel palette, hand-drawn SVG vocabulary, and trilingual poetic copy. Use when a user asks to build an artist portfolio, product showcase, or derivative-goods landing page in this gentle-editorial style. Portable across Claude Code / Hermes / openclaw / any agent framework — all assets are plain MD + JSON + SVG.
version: 1.0.0
author: Jane (小耳)
license: CC-BY-4.0
tags: [design, branding, artist-portfolio, japanese-editorial, handdrawn]
source_reference: http://localhost:8899 (小耳 Art Studio — captured 2026-04-17)
---

# 小耳 Art Studio — Design Methodology Skill

> **Not a CSS copy. A methodology.** Read `references/DESIGN_PRINCIPLES.md` first — the rest of this skill operationalizes those 7 principles.

## What This Skill Reproduces

A trilingual (JA/EN/ZH) artist-portfolio aesthetic that reads like a Muji-meets-Hayao-Miyazaki zine:

- **Tender whitespace**, not clinical minimalism
- **Dual typography**: DM Serif Display (editorial) × Caveat (handwritten) × system-ui (body)
- **Pastel section palette** (薄荷/奶油/樱粉/天青) with **ONE** high-saturation lime accent `#c8ff00`
- **Hand-drawn SVG vocabulary**: floral blobs, botanical vines, wavy underlines, dotted-line dividers
- **Poetic micro-copy** with onomatopoeia (`uki uki` / `doki doki`) and single-kanji product names
- **Idle motion**: 4–7s float / sway / rotate on decorations; hero text slide-in

## When to Use (trigger conditions)

Invoke this skill when the user's request matches any of:

- "做一个艺术家作品集 / 独立品牌站 / 日系风格网站"
- "按小耳 Art Studio 的调性做一个 …"
- "做一个手作品牌 / 衍生品商店 / 策展人主页"
- "日系 / 手帐 / 生活杂志风的着陆页"
- Explicit reference to this captured site, xiaoer-art.com, xiaoerai.xyz, xiaoercamera.xyz

If none of these match → **don't invoke**.

## How to Use (for any model, in any agent)

### Step 0 — Orient (every invocation)

Read in this exact order:

1. `references/DESIGN_PRINCIPLES.md` — the "why"
2. `references/TOKENS.json` — the "what" in machine-readable form
3. Whichever of `TYPOGRAPHY.md / COLOR_SYSTEM.md / LAYOUT_RHYTHM.md / SVG_VOCABULARY.md / MOTION.md / COPYWRITING.md` are relevant to the subtask

### Step 1 — Classify the task

| User says… | Jump to |
|---|---|
| "复刻这个站" / "做一个一样的" | `assets/starter-template.html` + all references |
| "做一个类似风格但主题不同的" | `references/REMIX_GUIDE.md` — swap extension points |
| "帮我写 hero 文案" | `references/COPYWRITING.md` |
| "做一个装饰插画 / 手绘元素" | `references/SVG_VOCABULARY.md` + `assets/svg-primitives.md` |
| "这个 section 用什么颜色" | `references/COLOR_SYSTEM.md` — section rotation rule |
| "加动效" | `references/MOTION.md` — 4 named animations |

### Step 2 — Generate

Follow the references. Do **not** invent colors/fonts outside the token system unless explicitly remixing (and then document what you swapped).

### Step 3 — Verify (required before claiming done)

Run the **Fidelity Checklist** in `references/DESIGN_PRINCIPLES.md#fidelity-checklist`. If the output fails ≥2 checks, regenerate.

## Cross-Agent Portability Notes

This skill uses **only** plain text formats:

- Markdown (`.md`) — any model can read
- JSON (`.json`) — any model can parse
- Inline SVG (in MD) — any model can emit

**No Claude-Code-specific features** in the content. The `SKILL.md` YAML frontmatter follows the Anthropic Skills spec but is also trivially ignorable by other frameworks. To port:

- **Hermes**: drop the folder into your skills directory, reference by name
- **openclaw**: same — the YAML `name` + `description` are the invocation trigger
- **OpenAI / Gemini / Qwen / DeepSeek**: prepend the `SKILL.md` body to your system prompt; load references on demand
- **Raw CLI / no framework**: `cat SKILL.md references/DESIGN_PRINCIPLES.md` and hand it to any LLM

## Extension Points (what you're invited to change)

See `references/REMIX_GUIDE.md` for the full list, but the short version:

- **Palette swap**: keep the 1+4+1 structure (1 cream base + 4 pastel rotations + 1 lime accent), change the hues
- **Font duo swap**: keep the serif+handwritten pairing; swap DM Serif → Playfair / Lora, Caveat → Indie Flower / Caveat Brush
- **SVG vocabulary theme**: swap florals → marine creatures / kitchen herbs / mid-century shapes
- **Language mix**: JA/EN/ZH is not mandatory — any three-language split works if you keep the bilingual-column layout

## What NOT To Change (brand-safe core)

- The **three-role type system** (editorial serif / handwritten cursive / body sans). Dropping to 2 collapses the charm.
- The **dotted-line + wavy-line** section dividers. Swapping these for `<hr>` kills the handcrafted feel.
- The **1 lime accent in a sea of pastels** rule. Adding a second saturated color breaks the tension.
- The **bilingual parallel column** in the brand-intro section. Stripping translations makes it feel like generic e-commerce.

---

**Voice line**: 这个站的秘密是留白会呼吸，不是空。
