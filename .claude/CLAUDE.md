# Markdown Presentation App

A zero-dependency browser presentation tool. Slides are written as individual `.md` files, compiled into `slides.js` by `build.js`, and rendered by `index.html`.

## How it works

- Each file in `slides/` is one slide
- Files are sorted alphabetically — numbering controls order (`01-`, `02-`, etc.)
- Slides are separated by `\n---\n` when compiled
- Run `node build.js` to regenerate `slides.js` after any change
- Open `index.html` in a browser to present — no server needed

## Slide rules

- One concept per slide — if a slide has two sections, split it
- Code blocks must be short — max 8 lines or they overflow the screen
- No markdown tables — the parser does not support them, use bullet lists
- Headings: `#` for title, `##` for subtitle, `###` for section labels
- No emojis in headings — they break the cinematic style

## File naming

- Always prefix with two-digit number: `01-`, `02-`, `10-`, `10b-`
- Use kebab-case descriptive names: `07-agents-builtin.md`
- To insert between existing slides use letter suffix: `10b-`, `10c-`

## What NOT to touch

- `index.html` — the entire app lives here, do not edit unless changing the app itself
- `slides.js` — this is generated, never edit by hand
- `.superpowers/` — brainstorm session files, ignore completely
