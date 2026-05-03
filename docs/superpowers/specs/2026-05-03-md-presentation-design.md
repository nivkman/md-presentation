# MD Presentation App — Design Spec

**Date:** 2026-05-03  
**Status:** Approved

---

## Overview

A zero-dependency, browser-only markdown presentation app. Two files: `index.html` (the app, never touched by the user) and `slides.js` (the user's markdown content). Open `index.html` in a browser, edit `slides.js`, refresh — that's the entire workflow.

---

## File Structure

```
my-talk/
  index.html   ← complete app (HTML + CSS + JS inline)
  slides.js    ← user content: const SLIDES = `...markdown...`
```

No build step. No server. No dependencies. Works from the filesystem (`file://` protocol).

---

## Visual Design

**Theme:** Cinematic dark  
- Background: `#0a0a0a`  
- Text: `#ffffff` (headings), `#888888` (body/subtitle)  
- Accent: thin gradient line above headings — `linear-gradient(90deg, #4a9eff, #7c5af5)`  
- Slide counter: top-right, monospace, `#333`, format `03 / 09`  
- Nav hint: bottom-center, `← → or click`, `#222`, only visible on hover or always subtle

Each slide is full-viewport (`100vw × 100vh`). Content centered vertically and horizontally. Max content width: `700px` for headings, `560px` for body text.

---

## Markdown Support

Slides are separated by `---` on its own line (standard HR). Each slide's markdown is transformed with regex:

| Syntax | Output |
|--------|--------|
| `# Heading` | `<h1>` |
| `## Heading` | `<h2>` |
| `### Heading` | `<h3>` |
| `**bold**` | `<strong>` |
| `*italic*` | `<em>` |
| `` `code` `` | `<code>` |
| ` ```...``` ` (fenced) | `<pre><code>` |
| `- item` | `<ul><li>` |

No table support — out of scope for slides.

---

## Slide Rendering

- Each slide is a `<div class="slide">` stacked in a `#deck` container
- Only the active slide has `class="active"` (visible, `opacity: 1`, `scale: 1`)
- All other slides: `opacity: 0`, `pointer-events: none`

---

## Transitions

CSS only, ~300ms, `ease-in-out` timing:

- **Outgoing slide:** fades to `opacity: 0`, scales to `0.95`
- **Incoming slide:** fades from `opacity: 0` to `1`, scales from `0.95` to `1`
- Both happen simultaneously via JS toggling `.active` / `.leaving` CSS classes
- Same animation for forward and backward navigation (no directional difference)

---

## Navigation

| Action | Effect |
|--------|--------|
| `ArrowRight` | Next slide |
| `ArrowLeft` | Previous slide |
| Click anywhere on slide | Next slide |

No on-screen navigation buttons. Wrapping behavior: stops at first/last slide (no looping).

---

## slides.js Format

```js
const SLIDES = `
# Welcome

This is my talk.

---

## Second Slide

Some content here.

---

## The End

Thanks!
`;
```

The `index.html` loads `slides.js` via `<script src="slides.js">` and reads `window.SLIDES`.

---

## Out of Scope

- Tables in markdown
- Speaker notes
- Theming / multiple themes
- Export to PDF
- Touch/swipe gestures
- Animations per slide element (only slide-level transitions)
