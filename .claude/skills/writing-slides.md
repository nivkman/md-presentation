# Writing Slides for This Presentation

## The rule: one concept, one slide

If you can describe what a slide is about using "and" — split it.

"This slide covers hooks and what hooks can do" → two slides.

## Headings are statements, not labels

Weak: `# Hooks`
Strong: `# Hooks Run Without Being Asked`

The heading should tell the audience what to think, not just what the topic is.

## Less is more

Each slide should have negative space. If it feels full — remove something.
The audience reads fast. If they finish before you speak, you lost them.

## Code blocks

- Max 8 lines
- Remove all lines that aren't essential to the point
- Strip comments, whitespace, and boilerplate
- If the code still doesn't fit — describe it in words instead

## The last line

Every slide should end with one punchy line — the takeaway.
Make it a complete thought the audience can remember when they leave the room.

## File creation steps

1. Pick the concept
2. Choose position in deck — check `slides/` filenames
3. Name the file: `NN-kebab-case.md`
4. Write heading, content, closing line
5. Run `node build.js`
6. Check it renders correctly in the browser
