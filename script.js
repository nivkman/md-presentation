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

  // Paragraphs: non-empty lines not already wrapped in a block-level tag
  html = html.replace(/^(?!<(?:h[1-6]|ul|ol|p|pre|blockquote|li)).+$/gm, line =>
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
  if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
});

document.addEventListener('click', next);
