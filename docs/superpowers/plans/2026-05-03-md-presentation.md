# MD Presentation App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a zero-dependency, browser-only markdown presentation app in two files — `index.html` (the app) and `slides.js` (the user's content).

**Architecture:** `slides.js` exports `const SLIDES` (a markdown string); `index.html` loads it via `<script src="slides.js">`, splits on `---`, parses each slide with regex, renders full-viewport `<div class="slide">` elements, and drives navigation with keyboard + click events. All CSS is inline in `index.html`.

**Tech Stack:** Vanilla HTML, CSS, JS. No dependencies. No build step. Works on `file://` protocol.

---

## File Map

| File | Role |
|------|------|
| `slides.js` | User content — markdown string in `const SLIDES` |
| `index.html` | Complete app — HTML structure, all CSS, all JS |

---

### Task 1: Create slides.js with sample content

**Files:**
- Create: `slides.js`

- [ ] **Step 1: Create slides.js**

```js
const SLIDES = `
# Hello, World

This is your first slide.

---

## Code Example

Inline \`code\` looks great.

\`\`\`
function greet(name) {
  return "Hello, " + name;
}
\`\`\`

---

## A List

- First item
- Second item
- Third item

---

## *Italic* and **Bold**

Use emphasis to **highlight** what *matters*.

---

## The End

Thanks for watching.
`;
```

- [ ] **Step 2: Commit**

```bash
git add slides.js
git commit -m "feat: add sample slides.js content"
```

---

### Task 2: HTML shell and dark theme CSS

**Files:**
- Create: `index.html`

- [ ] **Step 1: Create index.html with structure and full CSS**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentation</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #0a0a0a;
      color: #fff;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      overflow: hidden;
      height: 100vh;
      width: 100vw;
      cursor: pointer;
    }

    #deck {
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    .slide {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 40px;
      opacity: 0;
      transform: scale(0.95);
      transition: opacity 300ms ease-in-out, transform 300ms ease-in-out;
      pointer-events: none;
    }

    .slide.active {
      opacity: 1;
      transform: scale(1);
      pointer-events: auto;
    }

    .slide.leaving {
      opacity: 0;
      transform: scale(0.95);
      pointer-events: none;
    }

    /* Slide content */
    .slide-content {
      max-width: 700px;
      width: 100%;
      text-align: center;
    }

    .accent-line {
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, #4a9eff, #7c5af5);
      border-radius: 1px;
      margin: 0 auto 32px;
    }

    .slide-content h1 {
      font-size: clamp(32px, 6vw, 64px);
      font-weight: 900;
      letter-spacing: -2px;
      line-height: 1.1;
      color: #fff;
      margin-bottom: 20px;
    }

    .slide-content h2 {
      font-size: clamp(24px, 4vw, 48px);
      font-weight: 800;
      letter-spacing: -1.5px;
      line-height: 1.15;
      color: #fff;
      margin-bottom: 16px;
    }

    .slide-content h3 {
      font-size: clamp(18px, 3vw, 32px);
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #ccc;
      margin-bottom: 12px;
    }

    .slide-content p {
      font-size: clamp(14px, 2vw, 20px);
      color: #888;
      line-height: 1.7;
      max-width: 560px;
      margin: 0 auto 12px;
    }

    .slide-content ul {
      list-style: none;
      text-align: left;
      display: inline-block;
      margin: 8px auto;
    }

    .slide-content ul li {
      font-size: clamp(14px, 1.8vw, 18px);
      color: #888;
      line-height: 1.8;
      padding-left: 20px;
      position: relative;
    }

    .slide-content ul li::before {
      content: '—';
      position: absolute;
      left: 0;
      color: #4a9eff;
    }

    .slide-content code {
      font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
      font-size: 0.9em;
      background: #1a1a1a;
      color: #7c5af5;
      padding: 2px 6px;
      border-radius: 4px;
    }

    .slide-content pre {
      background: #111;
      border: 1px solid #222;
      border-radius: 8px;
      padding: 20px 24px;
      text-align: left;
      overflow-x: auto;
      margin: 16px auto;
      max-width: 560px;
    }

    .slide-content pre code {
      background: none;
      color: #ccc;
      padding: 0;
      font-size: clamp(12px, 1.4vw, 14px);
      line-height: 1.6;
    }

    .slide-content strong { color: #fff; font-weight: 700; }
    .slide-content em { color: #aaa; font-style: italic; }

    /* Counter */
    #counter {
      position: fixed;
      top: 24px;
      right: 32px;
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 11px;
      letter-spacing: 3px;
      color: #333;
      z-index: 10;
      pointer-events: none;
    }

    /* Nav hint */
    #nav-hint {
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      font-family: 'SF Mono', 'Fira Code', monospace;
      font-size: 11px;
      letter-spacing: 2px;
      color: #222;
      z-index: 10;
      pointer-events: none;
      transition: color 200ms;
    }

    body:hover #nav-hint { color: #444; }
  </style>
</head>
<body>
  <div id="counter"></div>
  <div id="deck"></div>
  <div id="nav-hint">← → or click</div>

  <script src="slides.js"></script>
  <script>
    // JS goes here in Task 3
  </script>
</body>
</html>
```

- [ ] **Step 2: Open index.html in browser and verify**

Open `index.html` from the filesystem (`file://`). You should see a black screen with `← → or click` barely visible at the bottom and a counter in the top-right. No slides yet — that's expected.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add index.html shell with cinematic dark CSS"
```

---

### Task 3: Markdown parser

**Files:**
- Modify: `index.html` (replace `// JS goes here in Task 3` comment with the parser + test assertions)

- [ ] **Step 1: Add parseMarkdown function and inline tests inside the `<script>` tag**

Replace the `// JS goes here in Task 3` comment with:

```js
function parseMarkdown(text) {
  let html = text.trim();

  // Fenced code blocks (must run before inline code)
  html = html.replace(/```[\w]*\n?([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${escapeHtml(code.trim())}</code></pre>`
  );

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Unordered lists (group consecutive - lines)
  html = html.replace(/(^- .+(\n|$))+/gm, match => {
    const items = match.trim().split('\n').map(line =>
      `<li>${line.replace(/^- /, '').trim()}</li>`
    ).join('');
    return `<ul>${items}</ul>`;
  });

  // Inline: bold, italic, inline code
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/`(.+?)`/g, '<code>$1</code>');

  // Paragraphs: non-empty lines not already wrapped in a tag
  html = html.replace(/^(?!<[a-z]).+$/gm, line =>
    line.trim() ? `<p>${line.trim()}</p>` : ''
  );

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Inline tests — open browser console to verify
(function runTests() {
  const assert = (label, got, expected) => {
    if (got !== expected) {
      console.error(`FAIL [${label}]\n  got:      ${got}\n  expected: ${expected}`);
    } else {
      console.log(`PASS [${label}]`);
    }
  };

  assert('h1', parseMarkdown('# Hello'), '<h1>Hello</h1>');
  assert('h2', parseMarkdown('## World'), '<h2>World</h2>');
  assert('h3', parseMarkdown('### Sub'), '<h3>Sub</h3>');
  assert('bold', parseMarkdown('**bold**'), '<p><strong>bold</strong></p>');
  assert('italic', parseMarkdown('*em*'), '<p><em>em</em></p>');
  assert('inline code', parseMarkdown('`x`'), '<p><code>x</code></p>');
  assert('ul', parseMarkdown('- a\n- b'), '<ul><li>a</li><li>b</li></ul>');
  assert('fenced code', parseMarkdown('```\nfoo()\n```'), '<pre><code>foo()</code></pre>');
  assert('paragraph', parseMarkdown('hello world'), '<p>hello world</p>');
})();
```

- [ ] **Step 2: Open index.html in browser, open DevTools console (F12)**

All lines should read `PASS [...]`. If any fail, fix `parseMarkdown` before continuing.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add vanilla markdown parser with inline tests"
```

---

### Task 4: Render slides into the DOM

**Files:**
- Modify: `index.html` (add render logic after the test block)

- [ ] **Step 1: Add slide rendering after the test IIFE**

Append after the `})();` closing of `runTests`:

```js
const deck = document.getElementById('deck');
const counter = document.getElementById('counter');
let current = 0;
let slides = [];

function renderSlides() {
  const rawSlides = SLIDES.split(/\n---\n/).map(s => s.trim()).filter(Boolean);
  slides = rawSlides;

  deck.innerHTML = '';
  rawSlides.forEach((raw, i) => {
    const div = document.createElement('div');
    div.className = 'slide' + (i === 0 ? ' active' : '');
    div.innerHTML = `<div class="accent-line"></div><div class="slide-content">${parseMarkdown(raw)}</div>`;
    deck.appendChild(div);
  });

  updateCounter();
}

function updateCounter() {
  const pad = n => String(n).padStart(2, '0');
  counter.textContent = `${pad(current + 1)} / ${pad(slides.length)}`;
}

renderSlides();
```

- [ ] **Step 2: Refresh index.html in browser**

You should see the first sample slide rendered — big white heading, accent line, counter top-right showing `01 / 05`. No navigation yet.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: render slides from SLIDES markdown string"
```

---

### Task 5: Navigation (keyboard + click)

**Files:**
- Modify: `index.html` (add navigation logic after `renderSlides()` call)

- [ ] **Step 1: Add goTo, next, prev functions and event listeners**

Append after `renderSlides();`:

```js
function goTo(index) {
  if (index < 0 || index >= slides.length) return;

  const allSlides = deck.querySelectorAll('.slide');

  // Mark current as leaving
  allSlides[current].classList.remove('active');
  allSlides[current].classList.add('leaving');

  // After transition, remove leaving class
  const leaving = allSlides[current];
  leaving.addEventListener('transitionend', () => {
    leaving.classList.remove('leaving');
  }, { once: true });

  current = index;
  allSlides[current].classList.add('active');
  updateCounter();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

document.addEventListener('click', next);
```

- [ ] **Step 2: Refresh and verify all navigation**

- Press `→` — slides advance with fade+scale transition
- Press `←` — slides go back
- Click anywhere — advances to next slide
- At first slide, `←` does nothing
- At last slide, `→` does nothing
- Counter updates correctly on every navigation

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add keyboard and click navigation with CSS transitions"
```

---

### Task 6: Final polish and cleanup

**Files:**
- Modify: `index.html` (remove test assertions from production build)

- [ ] **Step 1: Remove the inline test IIFE from index.html**

Delete the `(function runTests() { ... })();` block entirely. The `parseMarkdown` and `escapeHtml` functions stay.

- [ ] **Step 2: Verify the app still works after removing tests**

Refresh `index.html`. Navigate through all slides. Counter correct, transitions smooth, no console errors.

- [ ] **Step 3: Add .gitignore**

```bash
echo ".superpowers/" > .gitignore
```

- [ ] **Step 4: Final commit**

```bash
git add index.html .gitignore
git commit -m "chore: remove test assertions, add .gitignore"
```

---

## Self-Review

**Spec coverage:**
- ✅ Cinematic dark theme — all colors, typography, accent line specified in Task 2 CSS
- ✅ Two-file structure (`index.html` + `slides.js`) — Task 1 + Task 2
- ✅ `---` slide separator — Task 4 `split(/\n---\n/)`
- ✅ All markdown syntax (h1–h3, bold, italic, inline code, fenced code, ul) — Task 3
- ✅ Full-viewport slides, centered content, max-width 700px/560px — Task 2 CSS
- ✅ Counter top-right `03 / 09` format — Task 2 CSS + Task 4 `updateCounter()`
- ✅ Nav hint bottom-center, subtle — Task 2 CSS with hover reveal
- ✅ CSS transitions 300ms ease-in-out, `.active`/`.leaving` classes — Task 2 CSS + Task 5
- ✅ `ArrowRight`, `ArrowLeft`, click navigation — Task 5
- ✅ No looping — `goTo` returns early if `index < 0 || index >= slides.length`
- ✅ No tables — not in parser
- ✅ `window.SLIDES` loaded via `<script src="slides.js">` — Task 2 HTML

**Placeholder scan:** None found.

**Type consistency:**
- `parseMarkdown(text)` defined in Task 3, used in Task 4 — consistent
- `escapeHtml(str)` defined in Task 3, called inside `parseMarkdown` — consistent
- `goTo(index)` defined and called in Task 5 — consistent
- `updateCounter()` defined in Task 4, called in Task 4 and Task 5 — consistent
- `.active` / `.leaving` CSS classes defined in Task 2, toggled in Task 5 — consistent
