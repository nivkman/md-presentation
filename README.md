# md-presentation

A zero-dependency markdown presentation tool that runs in the browser.

Write slides as `.md` files. Open `index.html`. Present.

**Live demo:** https://nivkman.github.io/md-presentation/

## How to use

1. Write slides as `.md` files in `slides/`
2. Run `node build.js` to compile them into `slides.js`
3. Open `index.html` in a browser

No server. No dependencies. No build tools for the viewer.

Navigate with arrow keys or click left/right to advance.

## How slides work

- Each file in `slides/` is one slide
- Files are sorted alphabetically — use numeric prefixes to control order (`01-`, `02-`, `10b-`, etc.)
- Slides are separated by `\n---\n` when compiled
- Supported markdown: headings, bullet lists, bold, italic, inline code, fenced code blocks

## Demo content

The slides in this repo present Claude Code's `.claude` folder system — agents, skills, hooks, commands, MCPs, and real-world session walkthroughs.

It's a real use case, built with the tool it demonstrates.
